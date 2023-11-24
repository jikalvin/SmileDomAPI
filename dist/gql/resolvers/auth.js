import { UserInputError } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import { environmentVariablesConfig } from '../../config/appConfig.js';
import twilio from 'twilio';
const client = twilio(environmentVariablesConfig.accountSid, environmentVariablesConfig.authToken);
import { isValidEmail, isStrongPassword } from '../../helpers/validations.js';

/**
 * All resolvers related to auth
 * @typedef {Object}
 */
export default {
  Query: {},
  Mutation: {
    /**
     * It allows to users to register as long as the limit of allowed users has not been reached
     */
    registerUser: async (parent, {
      email,
      phone,
      password,
      isDoctor
    }, context) => {
      if (!email || !password) {
        if (!phone || !password) {
          throw new UserInputError('Data provided is not valid');
        }
      }
      if (email && !isValidEmail(email)) {
        throw new UserInputError('The email is not valid');
      }
      if (!isStrongPassword(password)) {
        throw new UserInputError('The password is not secure enough');
      }
      const registeredUsersCount = await context.di.model.Users.find().estimatedDocumentCount();
      context.di.authValidation.ensureLimitOfUsersIsNotReached(registeredUsersCount);
      let isAnEmailAlreadyRegistered = null;
      if (email) {
        isAnEmailAlreadyRegistered = await context.di.model.Users.findOne({
          email
        }).lean();
      }
      let isAnPhoneAlreadyRegistered = null;
      if (phone) {
        let user = await context.di.model.Users.findOne({
          phone
        }).lean();
        console.log(user);
        if (user === null) {
          isAnPhoneAlreadyRegistered = null;
        }
      }
      if (isAnEmailAlreadyRegistered) {
        throw new UserInputError('Data provided is not valid');
      }
      if (isAnPhoneAlreadyRegistered) {
        throw new UserInputError('Data provided is not valid');
      }
      if (email) {
        await new context.di.model.Users({
          email,
          password,
          isDoctor
        }).save();
      }
      if (phone) {
        await new context.di.model.Users({
          phone,
          password,
          isDoctor
        }).save();
      }
      let user = null;
      if (email) {
        user = await context.di.model.Users.findOne({
          email
        }).lean();
      }
      if (phone) {
        user = await context.di.model.Users.findOne({
          phone
        }).lean();
      }
      if (!user.isDoctor) {
        await new context.di.model.Patients({
          uuid: user.uuid
        }).save();
      }
      if (user.isDoctor) {
        await new context.di.model.Doctors({
          uuid: user.uuid
        }).save();
      }
      return {
        token: context.di.jwt.createAuthToken(user.email, user.isAdmin, user.isActive, user.uuid)
      };
    },
    /**
     * It allows users to authenticate. Users with property isActive with value false are not allowed to authenticate. When an user authenticates the value of lastLogin will be updated
     */
    authUser: async (parent, {
      email,
      password,
      phone
    }, context) => {
      if (!email || !password) {
        if (!phone || !password) {
          throw new UserInputError('Invalid credentials');
        }
      }
      let user = null;
      if (email) {
        user = await context.di.model.Users.findOne({
          email,
          isActive: true
        }).lean();
      }
      if (phone) {
        user = await context.di.model.Users.findOne({
          phone,
          isActive: true
        }).lean();
      }
      if (!user) {
        throw new UserInputError('User not found or login not allowed');
      }
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) {
        throw new UserInputError('Invalid credentials');
      }
      await context.di.model.Users.findOneAndUpdate({
        email
      }, {
        lastLogin: new Date().toISOString()
      }, {
        new: true
      }).lean();
      return {
        token: context.di.jwt.createAuthToken(user.email, user.isAdmin, user.isActive, user.uuid)
      };
    },
    /**
     * It allows to user to delete their account permanently (this action does not delete the records associated with the user, it only deletes their user account)
     */
    deleteMyUserAccount: async (parent, args, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);
      const user = await context.di.authValidation.getUser(context);
      return context.di.model.Users.deleteOne({
        uuid: user.uuid
      });
    },
    sendVerificationCode: async (_, {
      phone
    }, context) => {
      // Generate a random 6-digit code
      const verificationCode = Math.floor(100000 + Math.random() * 900000);

      // Save the verification code to the user's record
      const user = await context.di.model.Users.findOneAndUpdate({
        phone
      }, {
        verificationCode
      }, {
        new: true
      });

      // Send the verification code via SMS using Twilio
      try {
        await client.messages.create({
          body: `Your verification code is ${verificationCode}`,
          from: "+12563054784",
          to: "+237671769301"
        });
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    verifyCode: async (_, {
      phone,
      code
    }, context) => {
      // Find the user by phone number
      const user = await context.di.model.Users.findOne({
        phone
      });

      // Check if the user exists and the verification code matches
      if (!user || user.verificationCode !== code) {
        throw new Error('Invalid verification code');
      }
      await context.di.model.Users.findOneAndUpdate({
        email
      }, {
        lastLogin: new Date().toISOString()
      }, {
        new: true
      }).lean();
      return {
        token: context.di.jwt.createAuthToken(user.email, user.isAdmin, user.isActive, user.uuid)
      };
    }
  }
};
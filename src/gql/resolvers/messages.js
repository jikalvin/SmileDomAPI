import mongoose from "mongoose";
/**
 * All resolvers related to users
 * @typedef {Object}
 */
export default {
	ChatMessage: {
		sender: async (parent, args, context) => {
			try {
				// console.log("Parent: ", parent)
				// console.log(context.di.model.Users)
				const user = await context.di.model.Users.findById(parent.sender);
				console.log(user)
				if (!user) {
					throw new Error('user not found');
				}
				return user;
			} catch (error) {
				throw new Error(error);
			}
		},
		receiver: async (parent, args, context) => {
			try {
				const user = await context.di.model.Users.findById(parent.receiver.toString());
				if (!user) {
					throw new Error('user not found');
				}
				return user;
			} catch (error) {
				throw new Error(error);
			}
		},
	},
	Call: {
		caller: async (parent, args, context) => {
			try {
				const user = await context.di.model.Users.findById(parent.caller);
				if (!user) {
					throw new Error('user not found');
				}
				return user;
			} catch (error) {
				throw new Error(error);
			}
		},
		receiver: async (parent, args, context) => {
			try {
				const user = await context.di.model.Users.findById(parent.receiver);
				if (!user) {
					throw new Error('user not found');
				}
				return user;
			} catch (error) {
				throw new Error(error);
			}
		},
	},
	Query: {
		getUser: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			return await context.di.model.Users.findById(args.uuid);
		},
		getChatMessages: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			const sender = await context.di.model.Users.findOne({ uuid: args.senderId })
			const receiver = await context.di.model.Users.findOne({ uuid: args.receiverId })
			return await context.di.model.Messages.find({ sender: sender._id, receiver: receiver._id });
		},
		getCalls: async (parent, args, context) => {
			return await context.di.model.Calls.find({ $or: [{ caller: args.userId }, { receiver: args.userId }] });
		},
		getAllChats: async (parent, args, context) => {
			return await context.di.model.Messages.find().lean();
		},
	},
	Mutation: {
		sendMessage: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			const sender = await context.di.model.Users.findOne({uuid: args.senderId})
			const receiver = await context.di.model.Users.findOne({uuid: args.receiverId})
			console.log(sender.id, receiver.id)


			return await new context.di.model.Messages(
				{
					message: args.message,
					sender: mongoose.Types.ObjectId(sender.id),
					receiver: mongoose.Types.ObjectId(receiver.id)
				}).save();
		},
		makeCall: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);
			return await new context.di.model.Calls(
				{
					callType: args.callType,
					caller: mongoose.Types.ObjectId(args.callerId),
					receiver: mongoose.Types.ObjectId(args.receiverId),
				}).save();
		},
		endCall: async (parent, args, context) => {
			context.di.authValidation.ensureThatUserIsLogged(context);

			return await context.di.model.Calls.findByIdAndUpdate(args.callId, { endTime: new Date() }, { new: true });
		},
	}
};

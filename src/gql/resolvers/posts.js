import mongoose from "mongoose";
/**
 * All resolvers related to history
 * @typedef {Object}
 */
export default {
  Post: {
    author: async (parent, args, context) => {
      try {
        const user = await context.di.model.Users.findOne({ puid: parent.author });
        console.log(parent.author)
        console.log(context)
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Like: {
    post: async (parent, args, context) => {
      try {
        const post = await context.di.model.Posts.findById(parent.post);
        if (!post) {
          throw new Error('post not found');
        }
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
    user: async (parent, args, context) => {
      try {
        const user = await context.di.model.Users.findById(parent.user);
        if (!user) {
          throw new Error('user not found');
        }
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Comment: {
    post: async (parent, args, context) => {
      try {
        const post = await context.di.model.Posts.findById(parent.post);
        if (!post) {
          throw new Error('post not found');
        }
        return post;
      } catch (error) {
        throw new Error(error);
      }
    },
    user: async (parent, args, context) => {
      try {
        const user = await context.di.model.Users.findById(parent.user);
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
    getPost: async (parent, { puid }, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);
      const sortCriteria = { puid: puid };
      return context.di.model.Posts.findOne(sortCriteria);
    },
    getAllPosts: async (parent, args, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);

      // const sortCriteria = { createdAt: 'asc' };
      return context.di.model.Posts.find().lean();
    },
    getLikes: async (parent, { puid }, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);
      const pst = await context.di.model.Posts.findOne({ puid })

      const sortCriteria = { post: pst };
      return context.di.model.Likes.find({ sortCriteria }).lean();
    },
    getComments: async (parent, { puid }, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);
      const pst = await context.di.model.Posts.findOne({ puid })

      const sortCriteria = { post: pst };
      return context.di.model.Comments.find({ sortCriteria }).lean();
    },
  },
  Mutation: {
    createPost: async (parent, { title, content, image }, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);

      const user = await context.di.authValidation.getUser(context);

      return await new context.di.model.Posts(
        {
          content,
          title,
          author: mongoose.Types.ObjectId(user.id),
          image
        }).save();
    },
    updatePost: async (parent, { puid, title, content }, context) => {
      return await context.di.model.Posts.findByIdAndUpdate(puid, { title, content }, { new: true });
    },
    deletePost: async (parent, { puid }, context) => {
      await context.di.model.Posts.findByIdAndDelete(puid);
      return true;
    },
    createLike: async (parent, { puid }, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);

      const user = await context.di.authValidation.getUser(context);
      const post = await context.di.model.Posts.findOne({ puid })

      return await new context.di.model.Likes(
        {
          post: post,
          user: user,
        }).save();
    },
    deleteLike: async (parent, { id }, context) => {
      await context.di.model.Likes.findByIdAndDelete(id);
      return true;
    },
    createComment: async (parent, { puid, content }, context) => {
      context.di.authValidation.ensureThatUserIsLogged(context);

      const user = await context.di.authValidation.getUser(context);
      const post = await context.di.model.Posts.findOne({ puid })

      return await new context.di.model.Comments(
        {
          post: post,
          user: user,
          content: content,
        }).save();
    },
    deleteComment: async (parent, { id }, context) => {
      await context.di.model.Comments.findByIdAndDelete(id);
      return true;
    },
  },
};

/**
 * All resolvers related to history
 * @typedef {Object}
 */
export default {
	Query: {
        getPost: async (parent, { puid }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);

			const sortCriteria = { author: puid };
			return context.di.model.Posts.findOne(sortCriteria);
        },
        getAllPosts: async (parent, args, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);

			// const sortCriteria = { createdAt: 'asc' };
			return context.di.model.Posts.find().lean();
        },
        getLikes: async (parent, { puid }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);

			const sortCriteria = { puid: puid };
			return context.di.model.Posts.find({sortCriteria}).lean();
        },
        getComments: async (parent, { puid }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);

			const sortCriteria = { puid: puid };
			return context.di.model.Posts.find({sortCriteria}).lean();
        },
      },
      Mutation: {
        createPost: async (parent, { title, content, image }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
			
			const user = await context.di.authValidation.getUser(context);
            
            await new context.di.model.Posts(
                { 
                    content,
                    title,
                    author: user.uuid,
                    image
                }).save();
			
			return await context.di.model.Posts.find({puid: user.uuid}).lean();
        },
        updatePost: async (parent, { puid, title, content }, context) => {
          return await context.di.model.Posts.findByIdAndUpdate(puid, { title, content }, { new: true });
        },
        deletePost: async (parent, { puid }, context) => {
          await context.di.model.Posts.findByIdAndDelete(puid);
          return true;
        },
        createLike: async (parent, { puid, userId }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
			
			const user = await context.di.authValidation.getUser(context);
            
            await new context.di.model.Likes(
                { 
                    post: puid,
                    user: user.uuid,
                }).save();
			
			return await context.di.model.Posts.find({puid: user.uuid}).lean();
        },
        deleteLike: async (parent, { id }, context) => {
          await context.di.model.Likes.findByIdAndDelete(id);
          return true;
        },
        createComment: async (parent, { puid, userId, content }, context) => {
            context.di.authValidation.ensureThatUserIsLogged(context);
			
			const user = await context.di.authValidation.getUser(context);
            
            await new context.di.model.Comments(
                { 
                    post: puid,
                    user: user.uuid,
                    content: content,
                }).save();
			
			return await context.di.model.Posts.find({puid: user.uuid}).lean();
        },
        deleteComment: async (parent, { id }, context) => {
          await context.di.model.Comments.findByIdAndDelete(id);
          return true;
        },
    },
};

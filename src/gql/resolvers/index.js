import merge from 'lodash.merge';

import users from './users.js';
import auth from './auth.js';
import patients from './patients.js';
import doctors from './doctors.js';
import history from './history.js';
import messages from './messages.js';
import posts from './posts.js';
import consultation from './consultation.js';

export const resolvers = merge(
	users,
	auth,
	patients,
	doctors,
	history,
	messages,
	posts,
	consultation
);

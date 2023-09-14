import merge from 'lodash.merge';

import users from './users.js';
import auth from './auth.js';
import patients from './patients.js';
import doctors from './doctors.js';
import history from '../types/history.js';

export const resolvers = merge(
	users,
	auth,
	patients,
	doctors,
	history
);

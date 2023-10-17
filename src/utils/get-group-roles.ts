import { User } from '../modules/user/models/user.model';

export const getGroupRoles = (user: User) => {
  return user.roles.map((role) => role.name);
};

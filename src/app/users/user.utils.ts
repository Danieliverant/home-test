import { User } from './users.models';

export function getFullName(user: User): string {
  return [user.firstName, user.maidenName, user.lastName].filter(Boolean).join(' ');
}

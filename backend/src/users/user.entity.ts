import { Role } from '../auth/role.enum';

export class User {
  id: string;
  username: string;
  email: string;
  roles: Role[];
}

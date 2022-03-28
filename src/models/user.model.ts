export interface UserWithRole {
  username: string;
  email: string;
  id: number;
  roles: UserRole[];
}

export interface UserRole {
  createdAt: string;
  name: string;
  updatedAt: string;
  user_roles: {
    createdAt: string;
    updatedAt: string;
    roleId: number;
    userId: number;
  }
}

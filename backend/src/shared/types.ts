export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string | string[];
  isAdmin: boolean;
  logCount: number;
  createdAt: string;
};

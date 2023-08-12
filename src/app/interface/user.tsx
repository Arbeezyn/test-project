interface User {
  username: string;
  password?: string;
  isAuth?: boolean;
  token?: string;
}

export default User;

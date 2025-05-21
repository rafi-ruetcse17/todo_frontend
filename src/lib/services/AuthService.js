import { verify } from "jsonwebtoken";

export const verifyUserSignIn = ({ accessToken }) => {
  const user = verify(accessToken, process.env.JWT_SECRET);
  return user;
};

import { logIn, signUp } from "@/api-routes/ApiRoutes";
import { signIn } from "next-auth/react";

export const UserActions = {
  USER_LOGIN: async (payload) => {
    try {
      const { data } = await logIn(payload);
      const { accessToken } = data;
      await signIn("credentials", {
        ...payload,
        accessToken,
      });
    } catch (error) {
      return error.response;
    }
  },

  USER_SIGNUP: async (payload) => {
    try {
      const { data } = await signUp(payload);
      const { accessToken } = data;
      await signIn("credentials", {
        ...payload,
        accessToken,
      });
    } catch (error) {
      return error.response;
    }
  },
};

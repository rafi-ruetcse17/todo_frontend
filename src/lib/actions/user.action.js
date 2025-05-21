import { logIn } from "@/api-routes/ApiRoutes";

export const UserActions = {
  USER_LOGIN: async (payload) => {
    try {
      await logIn(payload);
    } catch (error) {
      return error.response;
    }
  },
};

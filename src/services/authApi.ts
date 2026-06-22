import { API_ENDPOINTS } from "../constants/api";
import { store } from "../store";
import type { MagicLinkResponse, UpdateProfileResponse, VerifyOTPResponse } from "../types/interface";
import api from "./api";



export const authAPI = {
  sendMagicLink: async (email: string): Promise<MagicLinkResponse> => {
    const res = await api.post(API_ENDPOINTS.AUTH.MAGIC_LINK, { email });
    console.log(res);

    return res.data;
  },

  verifyOTP: async (email: string, otp: string): Promise<VerifyOTPResponse> => {
    const res = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { email, otp });
    return res.data;
  },

  updateProfile: async (payload: {
    fullName: string;
    avatarUrl?: string;
  }): Promise<UpdateProfileResponse> => {
    const res = await api.patch(API_ENDPOINTS.WORK_SPACE.UPDATE_PROFILE, payload);
    return res.data;
  },

  logout: async (): Promise<void> => {
    const refreshToken = store.getState().auth.refreshToken
    await api.post(API_ENDPOINTS.AUTH.LOGOUT,{ refreshToken });
  },

  // Called after Google/GitHub OAuth redirect
  // Backend exchanges the code for a JWT
  // oauthCallback: async (token: string): Promise<VerifyOTPResponse> => {
  //   const res = await api.post("/auth/oauth/callback", { token });
  //   return res.data;
  // },

  googleAuthCallBack:async (): Promise<void> => {
    const res = await api.get(API_ENDPOINTS.AUTH.GOOGLE_CALLBACK,)
  },

  gitHubCallBack: async (): Promise<void> => {
    const res = await api.get(API_ENDPOINTS.AUTH.GITHUB_CALLBACK,)
  }

};

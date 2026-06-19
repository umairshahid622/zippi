import { store } from "../store";
import api from "./api";

interface MagicLinkResponse {
  message: string;
}

interface VerifyOTPResponse {
  token: string;
  refreshToken: string;
  isNewUser: boolean;
  user: {
    id: string;
    email: string;
    fullName: string | null;
    avatarUrl: string | null;
    createdAt: string;
  };
}

interface UpdateProfileResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    avatarUrl: string | null;
    createdAt: string;
  };
}

export const authAPI = {
  sendMagicLink: async (email: string): Promise<MagicLinkResponse> => {
    const res = await api.post("/auth/magic-link", { email });
    console.log(res);

    return res.data;
  },

  verifyOTP: async (email: string, otp: string): Promise<VerifyOTPResponse> => {
    const res = await api.post("/auth/verify", { email, otp });
    return res.data;
  },

  updateProfile: async (payload: {
    fullName: string;
    avatarUrl?: string;
  }): Promise<UpdateProfileResponse> => {
    const res = await api.patch("/auth/profile", payload);
    return res.data;
  },

  logout: async (): Promise<void> => {
    const refreshToken = store.getState().auth.refreshToken
    await api.post("/auth/logout",{ refreshToken });
  },

  // Called after Google/GitHub OAuth redirect
  // Backend exchanges the code for a JWT
  oauthCallback: async (token: string): Promise<VerifyOTPResponse> => {
    const res = await api.post("/auth/oauth/callback", { token });
    return res.data;
  },
};

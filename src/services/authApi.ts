import api from "./api";

interface MagicLinkResponse {
  message: string;
}

interface VerifyOTPResponse {
  token: string;
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
    //   return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({ message: 'Success! Magic link sent to your inbox.' });
    //   }, 1000);
    // });
    // throw { response: { data: { message: 'Too many login attempts. Try again in an hour.' } } };
    const res = await api.post("/auth/magic-link", { email });
    console.log(res);

    return res.data;
  },

  verifyOTP: async (email: string, otp: string): Promise<VerifyOTPResponse> => {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       isNewUser: true,
    //       token:
    //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30",
    //       user: {
    //         id: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    //         email: "Testmail@gmail.com",
    //         fullName: "Umair Shahid",
    //         avatarUrl: "",
    //         createdAt: ""
    //       },
    //     });
    //   }, 5000);
    // });
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
    await api.post("/auth/logout");
  },

  // Called after Google/GitHub OAuth redirect
  // Backend exchanges the code for a JWT
  oauthCallback: async (token: string): Promise<VerifyOTPResponse> => {
    const res = await api.post("/auth/oauth/callback", { token });
    return res.data;
  },
};

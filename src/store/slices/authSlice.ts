import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { authAPI } from "../../services/authApi";
import type { RootState } from "..";
import type { AuthLoadingProvider, InputStatus } from "../../types/types";
import { API_ENDPOINTS } from "../../constants/api";

// ── Types ─────────────────────────────────────
interface User {
  id: string;
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;

  pendingCredentials: {
    user: User;
    token: string;
    refreshToken: string;
  } | null;
  isLoading: boolean;
  loadingProvider: AuthLoadingProvider;
  emailStatus: InputStatus;
  userNameStatus: InputStatus;
  otpStatus: Omit<InputStatus, "focus">;
  lastSentTimestamp: number | null;
  pendingEmail: string | null;
  isOtpScreen: boolean;
  isOtpDisabled: boolean;

  emailStatusMessage: string | null;
  otpStatusMessage: string | null;
  userNameStatusMessage: string | null;
}

// ── Initial state ─────────────────────────────
const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,

  pendingCredentials: null,
  isLoading: false,
  loadingProvider: null,

  emailStatus: "idle",
  otpStatus: "idle",
  userNameStatus: "idle",

  lastSentTimestamp: null,
  pendingEmail: null,
  isOtpScreen: false,
  isOtpDisabled: false,

  emailStatusMessage: null,
  otpStatusMessage: null,
  userNameStatusMessage: null,
};

// ── Async thunks ──────────────────────────────
export const sendMagicLink = createAsyncThunk(
  API_ENDPOINTS.AUTH.MAGIC_LINK,
  async (email: string, { rejectWithValue }) => {
    try {
      return await authAPI.sendMagicLink(email);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ?? "Failed to send link",
      );
    }
  },
);

export const verifyOTP = createAsyncThunk(
  API_ENDPOINTS.AUTH.VERIFY_OTP,
  async (payload: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      return await authAPI.verifyOTP(payload.email, payload.otp);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? "Invalid code");
    }
  },
);

export const updateProfile = createAsyncThunk(
  API_ENDPOINTS.WORK_SPACE.UPDATE_PROFILE,
  async (
    payload: { fullName: string; avatarUrl?: string },
    { rejectWithValue },
  ) => {
    try {
      return await authAPI.updateProfile(payload);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? "Failed to update");
    }
  },
);

export const logout = createAsyncThunk(
  API_ENDPOINTS.AUTH.LOGOUT,
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? "Logout failed");
    }
  },
);


// ── Slice ─────────────────────────────────────
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set credentials directly (used after OAuth redirect)
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        token: string;
        refreshToken: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.pendingCredentials = null;
    },

    setEmailStatusMessage: (
      state,
      action: PayloadAction<AuthState["emailStatusMessage"]>,
    ) => {
      state.emailStatusMessage = action.payload;
    },

    setOtpStatusMessage: (
      state,
      action: PayloadAction<AuthState["otpStatusMessage"]>,
    ) => {
      state.otpStatusMessage = action.payload;
    },

    setUserNameStatusMessage: (
      state,
      action: PayloadAction<AuthState["userNameStatusMessage"]>,
    ) => {
      state.userNameStatusMessage = action.payload;
    },

    setEmailStatus: (
      state,
      action: PayloadAction<AuthState["emailStatus"]>,
    ) => {
      state.emailStatus = action.payload;
    },
    setUserNameStatus: (
      state,
      action: PayloadAction<AuthState["userNameStatus"]>,
    ) => {
      state.userNameStatus = action.payload;
    },

    clearMagicLinkState: (state) => {
      state.lastSentTimestamp = null;
      state.emailStatus = "idle";
      state.emailStatusMessage = null;
      state.pendingEmail = null;
    },

    setPendingEmail: (state, action: PayloadAction<string | null>) => {
      state.pendingEmail = action.payload;
    },

    // Hard reset — called on logout
    resetAuth: () => initialState,
    setLoadingProvider: (
      state,
      action: PayloadAction<AuthState["loadingProvider"]>,
    ) => {
      state.loadingProvider = action.payload;
    },
  },
  extraReducers: (builder) => {
    // ── sendMagicLink ──
    builder
      .addCase(sendMagicLink.pending, (state, action) => {
        state.isLoading = true;
        state.loadingProvider = "magic-link";
        state.emailStatus = "focus";
        state.emailStatusMessage = "Sending OTP";
        state.pendingEmail = action.meta.arg;
      })
      .addCase(sendMagicLink.fulfilled, (state) => {
        state.isLoading = false;
        state.loadingProvider = null;
        state.emailStatus = "success";
        state.emailStatusMessage = "OTP sent! Check your inbox.";
        state.lastSentTimestamp = Date.now();
        state.isOtpScreen = true;
      })
      .addCase(sendMagicLink.rejected, (state, action) => {
        state.isLoading = false;
        state.emailStatus = "error";
        state.emailStatusMessage = action.payload as string;
        state.loadingProvider = null;
        state.isOtpScreen = false;
      });

    // ── verifyOTP ──
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.emailStatusMessage = null;
        state.isLoading = true;
        state.otpStatus = "focus";
        state.isOtpDisabled = true;
        state.otpStatusMessage = "Verifying Otp";
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingCredentials = {
          user: action.payload.user,
          token: action.payload.token,
          refreshToken: action.payload.refreshToken,
        };

        state.pendingEmail = action.meta.arg.email;

        state.emailStatus = "idle";
        state.otpStatus = "success";
        state.isOtpDisabled = true;
        state.otpStatusMessage = "Otp verified!";
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.otpStatusMessage = action.payload as string;
        state.isOtpDisabled = false;
        state.otpStatus = "error";
      });

    // ── updateProfile ──
    builder
      .addCase(updateProfile.pending, (state) => {
        state.otpStatusMessage = null;
        state.isLoading = true;
        state.userNameStatusMessage = "Saving";
        state.userNameStatus = "idle";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userNameStatus = "success";
        state.userNameStatusMessage = "Saved successfully";

        if (action.payload?.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.userNameStatus = "error";
        state.userNameStatusMessage =
          (action.payload as string) ||
          action.error.message ||
          "Failed to update";
      });

    // ── logout ──
    builder
      .addCase(logout.pending, () => {})
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => {});
  },
});

export const {
  setCredentials,
  resetAuth,
  setLoadingProvider,
  setEmailStatusMessage,
  setOtpStatusMessage,
  setUserNameStatusMessage,
  clearMagicLinkState,
  setEmailStatus,
  setPendingEmail,
  setUserNameStatus,
} = authSlice.actions;
export default authSlice.reducer;

// ── Selectors ─────────────────────────────────
// Define once here — import in components
// export const selectUser = (state: RootState) => state.auth.user;
// export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.token !== null;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;

export const selectEmailStatusMessage = (state: RootState) =>
  state.auth.emailStatusMessage;
export const selectOtpStatusMessage = (state: RootState) =>
  state.auth.otpStatusMessage;
export const selectUserNameStatusMessage = (state: RootState) =>
  state.auth.userNameStatusMessage;

export const selectOtpStatus = (state: RootState) => state.auth.otpStatus;
export const selectUserNameStatus = (state: RootState) =>
  state.auth.userNameStatus;
export const selectEmailStatus = (state: RootState) => state.auth.emailStatus;

export const selectIsNewUser = (state: RootState) =>
  !!state.auth.token && !!state.auth.user && !state.auth.user.fullName;

export const selectLoadingProvider = (state: RootState) =>
  state.auth.loadingProvider;
export const selectMagicLinkTimestamp = (state: RootState) =>
  state.auth.lastSentTimestamp;
export const selectIsOtpScreen = (state: RootState) => state.auth.isOtpScreen;
export const selectPendingEmail = (state: RootState) => state.auth.pendingEmail;

export const selectIsOtpDisabled = (state: RootState) =>
  state.auth.isOtpDisabled;

export const selectPendingCredentials = (state: RootState) =>
  state.auth.pendingCredentials;

export const selectUser = (state: RootState) => state.auth.user;

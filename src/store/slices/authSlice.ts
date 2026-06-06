import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { authAPI } from "../../services/authApi";
import type { RootState } from "..";
import type { authLoadingProvider, InputStatus } from "../../types/types";

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
  isAuthenticated: boolean;
  isLoading: boolean;
  loadingProvider: authLoadingProvider;
  emailStatus: InputStatus;
  statusMessage: string | null;
  lastSentTimestamp: number | null;
  pendingEmail: string | null;
  isOtpScreen: boolean;
}

// ── Initial state ─────────────────────────────
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  loadingProvider: null,
  emailStatus: "idle",
  statusMessage: null,
  lastSentTimestamp: null,
  isOtpScreen: false,
  pendingEmail: null,
};

// ── Async thunks ──────────────────────────────
export const sendMagicLink = createAsyncThunk(
  "auth/sendMagicLink",
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
  "auth/verifyOTP",
  async (payload: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      return await authAPI.verifyOTP(payload.email, payload.otp);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? "Invalid code");
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
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
  "auth/logout",
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
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearStatus: (state) => {
      state.statusMessage = null;
    },

    setStatusMessage: (
      state,
      action: PayloadAction<AuthState["statusMessage"]>,
    ) => {
      state.statusMessage = action.payload;
    },

    setEmailStatus: (
      state,
      action: PayloadAction<AuthState["emailStatus"]>,
    ) => {
      state.emailStatus = action.payload;
    },

    clearMagicLinkState: (state) => {
      state.lastSentTimestamp = null;
      state.emailStatus = "idle";
      state.statusMessage = null;
      state.pendingEmail = null;
    },

    setPendingEmail: (state, action: PayloadAction<string | null>) => {
      state.pendingEmail = action.payload;
    },

    backToSignIn: (state) => {
      state.isOtpScreen = false;
      state.emailStatus = "idle";
      state.statusMessage = null;
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
        state.statusMessage = "Sending Magic Link";
        state.pendingEmail = action.meta.arg;
      })
      .addCase(sendMagicLink.fulfilled, (state) => {
        state.isLoading = false;
        state.loadingProvider = null;
        state.emailStatus = "success";
        state.statusMessage = "Magic link sent! Check your inbox.";
        state.lastSentTimestamp = Date.now();
        state.isOtpScreen = true;
      })
      .addCase(sendMagicLink.rejected, (state, action) => {
        state.isLoading = false;
        state.emailStatus = "error";
        state.statusMessage = action.payload as string;
        state.loadingProvider = null;
        state.isOtpScreen = false;
      });

    // ── verifyOTP ──
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.emailStatus = "focus";
        state.statusMessage = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isOtpScreen = false;
        state.pendingEmail = null;
        state.emailStatus = "idle";
        state.statusMessage = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.statusMessage = action.payload as string;
        state.emailStatus = "error";
      });

    // ── updateProfile ──
    builder
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.statusMessage = action.payload as string;
      });

    // ── logout ──
    builder
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => initialState); // reset even if API fails
  },
});

export const {
  setCredentials,
  resetAuth,
  setLoadingProvider,
  setStatusMessage,
  clearMagicLinkState,
  setEmailStatus,
  setPendingEmail,
  backToSignIn,
} = authSlice.actions;
export default authSlice.reducer;

// ── Selectors ─────────────────────────────────
// Define once here — import in components
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectEmailStatus = (state: RootState) => state.auth.emailStatus;

export const selectAuthStatusMessage = (state: RootState) =>
  state.auth.statusMessage;

export const selectIsNewUser = (state: RootState) => state.auth.isAuthenticated && !state.auth.user?.fullName;
export const selectLoadingProvider = (state: RootState) => state.auth.loadingProvider;
export const selectMagicLinkTimestamp = (state: RootState) => state.auth.lastSentTimestamp;
export const selectIsOtpScreen = (state: RootState) => state.auth.isOtpScreen;
export const selectPendingEmail    = (state: RootState) => state.auth.pendingEmail

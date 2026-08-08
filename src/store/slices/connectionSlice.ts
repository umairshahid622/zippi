import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";

export type ConnectionStatus = "online" | "connecting" | "offline";

interface ConnectionState {
  status: ConnectionStatus;
}

const initialState: ConnectionState = {
  status: "online",
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setConnectionStatus: (state: ConnectionState, action: PayloadAction<ConnectionStatus>) => {
      state.status = action.payload;
    },
  },
});

export const { setConnectionStatus } = connectionSlice.actions;
export default connectionSlice.reducer;

// ── Selectors ──
export const selectConnectionStatus = (state: RootState) => state.connection?.status;

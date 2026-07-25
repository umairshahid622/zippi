// src/store/slices/messageSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "..";
import { messageAPI } from "../../services/messageApi";

interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string | null;
  createdAt: string;
  sender: { id: string; fullName: string | null; avatarUrl: string | null };
  reactions: Array<{ id: string; emoji: string; userId: string }>;
  files: any[];
}

interface MessageState {
  byChannel: Record<string, Message[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: MessageState = {
  byChannel: {},
  isLoading: false,
  error: null,
};

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (
    payload: { workspaceId: string; channelId: string },
    { rejectWithValue },
  ) => {
    try {
      return await messageAPI.getAll(payload.workspaceId, payload.channelId);
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ?? "Failed to load messages",
      );
    }
  },
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    // ✅ Called when a socket event delivers a new message
    receiveMessage: (state, action: PayloadAction<Message>) => {
      const msg = action.payload;
      if (!state.byChannel[msg.channelId]) {
        state.byChannel[msg.channelId] = [];
      }
      // Avoid duplicates (e.g. if optimistic update already added it)
      const exists = state.byChannel[msg.channelId].some(
        (m) => m.id === msg.id,
      );
      if (!exists) {
        state.byChannel[msg.channelId].push(msg);
      }
    },
    messageUpdated: (state, action: PayloadAction<Message>) => {
      const msg = action.payload;
      const list = state.byChannel[msg.channelId];
      if (list) {
        const idx = list.findIndex((m) => m.id === msg.id);
        if (idx !== -1) list[idx] = msg;
      }
    },
    messageDeleted: (
      state,
      action: PayloadAction<{ messageId: string; channelId: string }>,
    ) => {
      const list = state.byChannel[action.payload.channelId];
      if (list) {
        state.byChannel[action.payload.channelId] = list.filter(
          (m) => m.id !== action.payload.messageId,
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        const channelId = action.meta.arg.channelId;
        state.byChannel[channelId] = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { receiveMessage, messageUpdated, messageDeleted } =
  messageSlice.actions;
export default messageSlice.reducer;

export const selectMessagesForChannel =
  (channelId: string) => (state: RootState) =>
    state.message.byChannel[channelId] ?? [];

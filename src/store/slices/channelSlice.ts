// src/store/slices/channelSlice.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { channelAPI } from '../../services/channelApi'
import type { RootState } from '..'

// ── Types ─────────────────────────────────────
interface ChannelMemberUser {
  id:        string
  fullName:  string | null
  avatarUrl: string | null
  handle:    string | null
  isOnline:  boolean
  lastSeenAt: string | null
}

interface ChannelMember {
  id:        string
  userId:    string
  channelId: string
  lastReadAt: string | null
  isMuted:   boolean
  user:      ChannelMemberUser
}

export interface Channel {
  id:          string
  workspaceId: string
  name:        string | null
  description: string | null
  isPrivate:   boolean
  isDm:        boolean
  isArchived:  boolean
  createdAt:   string
  members:     ChannelMember[]
}

interface ChannelState {
  // Keyed by workspaceId — so switching workspaces doesn't wipe
  // other workspaces' already-fetched channel lists
  byWorkspace: Record<string, { channels: Channel[]; fetchedAt: number }>

  activeChannelId: string | null
  isLoading:       boolean
  error:           string | null
}

const CACHE_TTL = 30 * 1000

const initialState: ChannelState = {
  byWorkspace:     {},
  activeChannelId: null,
  isLoading:       false,
  error:           null,
}

// ── Thunks ────────────────────────────────────
export const fetchChannels = createAsyncThunk(
  'channel/fetchChannels',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      return await channelAPI.getAll(workspaceId)   // { channels: [...] }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? 'Failed to load channels')
    }
  },
  {
    condition: (workspaceId, { getState }) => {
      const state  = getState() as RootState
      const cached = state.channel.byWorkspace[workspaceId]

      if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) return false
      if (state.channel.isLoading) return false
      return true
    },
  }
)

export const createChannel = createAsyncThunk(
  'channel/createChannel',
  async (
    payload: { workspaceId: string; name: string; description?: string; isPrivate?: boolean },
    { rejectWithValue }
  ) => {
    try {
      const result = await channelAPI.create(payload.workspaceId, {
        name:        payload.name,
        description: payload.description,
        isPrivate:   payload.isPrivate,
      })
      return { workspaceId: payload.workspaceId, channel: result.channel }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? 'Failed to create channel')
    }
  }
)

export const getOrCreateDm = createAsyncThunk(
  'channel/getOrCreateDm',
  async (
    payload: { workspaceId: string; targetUserId: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await channelAPI.createDm(payload.workspaceId, payload.targetUserId)
      return { workspaceId: payload.workspaceId, channel: result.channel }
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? 'Failed to open DM')
    }
  }
)

// ── Slice ─────────────────────────────────────
const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {
    setActiveChannelId: (state, action: PayloadAction<string>) => {
      state.activeChannelId = action.payload
    },
    invalidateChannelsCache: (state, action: PayloadAction<string>) => {
      delete state.byWorkspace[action.payload]
    },
    resetChannelState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.isLoading = false
        // Note: workspaceId is the thunk arg — action.meta.arg gives it to us
        state.byWorkspace[action.meta.arg] = {
          channels:  action.payload.channels,
          fetchedAt: Date.now(),
        }

        // Auto-select "general" if nothing active yet
        if (!state.activeChannelId) {
          const general = action.payload.channels.find((c: Channel) => c.name === 'general')
          state.activeChannelId = general?.id ?? action.payload.channels[0]?.id ?? null
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.isLoading = false
        if (action.payload) state.error = action.payload as string
      })

    builder
      .addCase(createChannel.fulfilled, (state, action) => {
        const { workspaceId, channel } = action.payload
        if (!state.byWorkspace[workspaceId]) {
          state.byWorkspace[workspaceId] = { channels: [], fetchedAt: Date.now() }
        }
        state.byWorkspace[workspaceId].channels.push(channel)
        state.activeChannelId = channel.id   // jump straight into the new channel
      })

    builder
      .addCase(getOrCreateDm.fulfilled, (state, action) => {
        const { workspaceId, channel } = action.payload
        const existing = state.byWorkspace[workspaceId]?.channels.find(c => c.id === channel.id)
        if (!existing && state.byWorkspace[workspaceId]) {
          state.byWorkspace[workspaceId].channels.push(channel)
        }
        state.activeChannelId = channel.id
      })
  },
})

export const {
  setActiveChannelId,
  invalidateChannelsCache,
  resetChannelState,
} = channelSlice.actions

export default channelSlice.reducer

// ── Selectors ─────────────────────────────────
export const selectChannelsForWorkspace = (workspaceId: string | null) => (state: RootState): Channel[] =>
  workspaceId ? state.channel.byWorkspace[workspaceId]?.channels ?? [] : []

export const selectActiveChannelId = (state: RootState) => state.channel.activeChannelId
export const selectChannelsLoading = (state: RootState) => state.channel.isLoading
export const selectChannelError    = (state: RootState) => state.channel.error

export const selectActiveChannel = (workspaceId: string | null) => (state: RootState): Channel | null => {
  const channels = selectChannelsForWorkspace(workspaceId)(state)
  return channels.find(c => c.id === state.channel.activeChannelId) ?? null
}
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '..'
import { workspaceAPI } from '../../services/workSpaceApi'

// ── Types ─────────────────────────────────────
interface Member {
  id:        string
  fullName:  string | null
  avatarUrl: string | null
  handle:    string | null
  isOnline:  boolean
}

interface Channel {
  id:          string
  name:        string | null
  description: string | null
  isPrivate:   boolean
  isDm:        boolean
  isArchived:  boolean
}

interface WorkspaceListItem {
  id:           string
  name:         string
  slug:         string
  logoUrl:      string | null
  role:         'owner' | 'admin' | 'member' | 'guest'
  memberCount:  number
  channelCount: number
}

interface WorkspaceDetail {
  id:       string
  name:     string
  slug:     string
  logoUrl:  string | null
  members:  Array<{ role: string; user: Member }>
  channels: Channel[]
}

interface WorkspaceState {
  // List of all workspaces the user belongs to (for the switcher)
  list:              WorkspaceListItem[]
  isLoadingList:     boolean

  // Currently active workspace — full detail
  activeWorkspaceId: string | null
  activeWorkspace:   WorkspaceDetail | null
  isLoadingActive:   boolean

  // Currently active channel within the workspace
  activeChannelId:   string | null

  error: string | null
}

const initialState: WorkspaceState = {
  list:              [],
  isLoadingList:     false,
  activeWorkspaceId: null,
  activeWorkspace:   null,
  isLoadingActive:   false,
  activeChannelId:   null,
  error:             null,
}

// ── Async thunks ──────────────────────────────

// Fetch all workspaces user belongs to (for the switcher)
export const fetchWorkspaces = createAsyncThunk(
  'workspace/fetchWorkspaces',
  async (_, { rejectWithValue }) => {
    try {
      return await workspaceAPI.getAll()
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? 'Failed to load workspaces')
    }
  }
)

// Fetch one workspace with full detail (members + channels)
export const fetchWorkspace = createAsyncThunk(
  'workspace/fetchWorkspace',
  async (workspaceId: string, { rejectWithValue }) => {
    try {
      return await workspaceAPI.getOne(workspaceId)
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? 'Failed to load workspace')
    }
  }
)

// Create a new workspace
export const createWorkspace = createAsyncThunk(
  'workspace/createWorkspace',
  async (name: string, { rejectWithValue }) => {
    try {
      return await workspaceAPI.create(name)
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message ?? 'Failed to create workspace')
    }
  }
)

// ── Slice ─────────────────────────────────────

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setActiveWorkspaceId: (state, action: PayloadAction<string>) => {
      state.activeWorkspaceId = action.payload
      state.activeWorkspace   = null   // clear stale data while new one loads
      state.activeChannelId   = null
    },
    setActiveChannelId: (state, action: PayloadAction<string>) => {
      state.activeChannelId = action.payload
    },
    clearWorkspaceError: (state) => {
      state.error = null
    },
    resetWorkspaceState: () => initialState,
  },
  extraReducers: (builder) => {
    // ── fetchWorkspaces ──
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.isLoadingList = true
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.isLoadingList = false
        state.list = action.payload.workspaces

        // Auto-select first workspace if none is active yet
        if (!state.activeWorkspaceId && state.list.length > 0) {
          state.activeWorkspaceId = state.list[0].id
        }
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.isLoadingList = false
        state.error = action.payload as string
      })

    // ── fetchWorkspace (single) ──
    builder
      .addCase(fetchWorkspace.pending, (state) => {
        state.isLoadingActive = true
      })
      .addCase(fetchWorkspace.fulfilled, (state, action) => {
        state.isLoadingActive = false
        state.activeWorkspace = action.payload.workspace

        // Auto-select "general" channel if none active yet
        if (!state.activeChannelId) {
          const general = action.payload.workspace.channels.find(
            (c: Channel) => c.name === 'general'
          )
          state.activeChannelId = general?.id ?? action.payload.workspace.channels[0]?.id ?? null
        }
      })
      .addCase(fetchWorkspace.rejected, (state, action) => {
        state.isLoadingActive = false
        state.error = action.payload as string
      })

    // ── createWorkspace ──
    builder
      .addCase(createWorkspace.fulfilled, (state, action) => {
        // Immediately switch to the newly created workspace
        state.activeWorkspaceId = action.payload.workspace.id
        state.activeWorkspace   = action.payload.workspace
        // Also add to the list so switcher shows it without refetching
        state.list.push({
          id:           action.payload.workspace.id,
          name:         action.payload.workspace.name,
          slug:         action.payload.workspace.slug,
          logoUrl:      action.payload.workspace.logoUrl,
          role:         'owner',
          memberCount:  1,
          channelCount: 1,
        })
      })
      .addCase(createWorkspace.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const {
  setActiveWorkspaceId,
  setActiveChannelId,
  clearWorkspaceError,
  resetWorkspaceState,
} = workspaceSlice.actions

export default workspaceSlice.reducer

// ── Selectors ─────────────────────────────────
export const selectWorkspaceList        = (state: RootState) => state.workspace.list
export const selectIsLoadingList        = (state: RootState) => state.workspace.isLoadingList
export const selectActiveWorkspaceId    = (state: RootState) => state.workspace.activeWorkspaceId
export const selectActiveWorkspace      = (state: RootState) => state.workspace.activeWorkspace
export const selectIsLoadingActive      = (state: RootState) => state.workspace.isLoadingActive
export const selectActiveChannelId      = (state: RootState) => state.workspace.activeChannelId
export const selectWorkspaceError       = (state: RootState) => state.workspace.error

export const selectHasNoWorkspaces = (state: RootState) =>
  !state.workspace.isLoadingList && state.workspace.list.length === 0
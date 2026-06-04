import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface UIState {
  sidebarOpen:     boolean
  activePanel:     'chat' | 'tasks' | 'files' | null
  focusMode:       boolean
  theme:           'dark' | 'light'
  activeModal:     string | null
}

const initialState: UIState = {
  sidebarOpen:  true,
  activePanel:  'chat',
  focusMode:    false,
  theme:        'dark',
  activeModal:  null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar:  (state) => { state.sidebarOpen = !state.sidebarOpen },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    setActivePanel: (state, action: PayloadAction<UIState['activePanel']>) => {
      state.activePanel = action.payload
    },
    toggleFocusMode: (state) => { state.focusMode = !state.focusMode },
    setTheme:       (state, action: PayloadAction<UIState['theme']>) => {
      state.theme = action.payload
    },
    openModal:      (state, action: PayloadAction<string>) => {
      state.activeModal = action.payload
    },
    closeModal:     (state) => { state.activeModal = null },
  },
})

export const {
  toggleSidebar,
  setSidebarOpen,
  setActivePanel,
  toggleFocusMode,
  setTheme,
  openModal,
  closeModal,
} = uiSlice.actions
export default uiSlice.reducer

// ── Selectors ──
export const selectSidebarOpen = (state: RootState) => state.ui?.sidebarOpen
export const selectActivePanel = (state: RootState) => state.ui?.activePanel
export const selectFocusMode   = (state: RootState) => state.ui?.focusMode
export const selectActiveModal = (state: RootState) => state.ui?.activeModal
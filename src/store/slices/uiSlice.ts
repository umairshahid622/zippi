import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { ModalType } from "../../types/types";

interface UIState {
  sidebarOpen: boolean;
  activePanel: "chat" | "tasks" | "files" | null;
  focusMode: boolean;
  theme: "dark" | "light";
  activeModal: ModalType | null;
  activeModalHeading: string | null;
}

const initialState: UIState = {
  sidebarOpen: true,
  activePanel: "chat",
  focusMode: false,
  theme: "dark",
  activeModal: null,
  activeModalHeading: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setActivePanel: (state, action: PayloadAction<UIState["activePanel"]>) => {
      state.activePanel = action.payload;
    },
    toggleFocusMode: (state) => {
      state.focusMode = !state.focusMode;
    },
    setTheme: (state, action: PayloadAction<UIState["theme"]>) => {
      state.theme = action.payload;
    },
    openModal: (state, action: PayloadAction<ModalType>) => {
      state.activeModal = action.payload;
    },
    setActiveModalHeading: (state, action: PayloadAction<UIState['activeModalHeading']>) => {
      state.activeModalHeading = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setActivePanel,
  toggleFocusMode,
  setTheme,
  openModal,
  setActiveModalHeading,
  closeModal,
} = uiSlice.actions;
export default uiSlice.reducer;

// ── Selectors ──
export const selectSidebarOpen = (state: RootState) => state.ui?.sidebarOpen;
export const selectActivePanel = (state: RootState) => state.ui?.activePanel;
export const selectFocusMode = (state: RootState) => state.ui?.focusMode;
export const selectActiveModal = (state: RootState) => state.ui?.activeModal;
export const selectActiveModalHeading = (state: RootState) => state.ui?.activeModalHeading;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
// import workspaceReducer     from './slices/workspaceSlice'
// import chatReducer          from './slices/chatSlice'
// import tasksReducer         from './slices/tasksSlice'
// import notificationsReducer from './slices/notificationsSlice'

// ── Root reducer ──────────────────────────────
const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  //   workspace:     workspaceReducer,
  //   chat:          chatReducer,
  //   tasks:         tasksReducer,
  //   notifications: notificationsReducer,
});


const storage = {
  getItem: (key: string): Promise<string | null> => {
    return Promise.resolve(localStorage.getItem(key))
  },
  setItem: (key: string, value: string): Promise<void> => {
    localStorage.setItem(key, value)
    return Promise.resolve()
  },
  removeItem: (key: string): Promise<void> => {
    localStorage.removeItem(key)
    return Promise.resolve()
  },
}

// ── Persist config ────────────────────────────
// Only persist auth — everything else reloads from API

const persistConfig = {
  key: "zippi-root",
  version: 1,
  storage,
  whitelist: ["auth"], // ← only auth survives page refresh
  blacklist: ["ui"], // ← ui state always resets
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ── Store ─────────────────────────────────────
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist fires these actions — ignore them
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.DEV, // ← only enable in development
});

export const persistor = persistStore(store);

// ── Types ─────────────────────────────────────
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

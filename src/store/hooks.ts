import { useDispatch, useSelector, useStore } from 'react-redux'
import type { RootState, AppDispatch }         from './index'

// ✅ Always use these instead of raw useDispatch / useSelector
// They are fully typed — no need to type RootState every time

export const useAppDispatch  = () => useDispatch<AppDispatch>()
export const useAppSelector  = <T>(selector: (state: RootState) => T): T =>
  useSelector(selector)
export const useAppStore     = () => useStore<RootState>()
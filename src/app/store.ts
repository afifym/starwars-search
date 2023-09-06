import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit"
import characterSlice from "./characterSlice"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
  characters: characterSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

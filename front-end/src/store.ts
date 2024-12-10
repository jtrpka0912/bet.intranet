import { configureStore } from "@reduxjs/toolkit";
import BetsReducer from './reducers/bets';

export const store = configureStore({
  reducer: {
    bets: BetsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
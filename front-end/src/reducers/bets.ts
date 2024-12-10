import { createSlice } from "@reduxjs/toolkit";
import BetResponseDTO from "../dto/bet-response";

import type { PayloadAction } from "@reduxjs/toolkit";

export type BetsState = {
  bets: BetResponseDTO[];
  isLoading: boolean;
  error: string;
}

const initialState: BetsState = {
  bets: [],
  isLoading: false,
  error: ''
};

export const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    processRetrievingBets: (state) => {
      state.bets = [];
      state.isLoading = true;
      state.error = '';
    },
    successRetrievingBets: (state, action: PayloadAction<BetResponseDTO[]>) => {
      state.bets = action.payload;
      state.isLoading = false;
      state.error = '';
    },
    failedRetrievingBets: (state, action: PayloadAction<string>) => {
      state.bets = [];
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export const {processRetrievingBets, successRetrievingBets, failedRetrievingBets} = betsSlice.actions;

export default betsSlice.reducer;
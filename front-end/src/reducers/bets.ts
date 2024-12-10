import { createSlice } from "@reduxjs/toolkit";
import BetResponseDTO from "../dto/bet-response";

import type { PayloadAction } from "@reduxjs/toolkit";

export type BetsState = {
  bets: BetResponseDTO[];
  isRetrieving: boolean;
  retrievingError: string;
  isCreating: boolean;
  creatingError: string;
}

const initialState: BetsState = {
  bets: [],
  isRetrieving: false,
  retrievingError: '',
  isCreating: false,
  creatingError: ''
};

export const betsSlice = createSlice({
  name: 'bets',
  initialState,
  reducers: {
    // Retrieving Bets
    processRetrievingBets: (state) => {
      state.bets = [];
      state.isRetrieving = true;
      state.retrievingError = '';
    },
    successRetrievingBets: (state, action: PayloadAction<BetResponseDTO[]>) => {
      state.bets = action.payload;
      state.isRetrieving = false;
      state.retrievingError = '';
    },
    failedRetrievingBets: (state, action: PayloadAction<string>) => {
      state.bets = [];
      state.isRetrieving = false;
      state.retrievingError = action.payload;
    },

    // Creating a Bet
    processCreatingBet: (state) => {
      state.isCreating = true;
      state.creatingError = '';
    },
    successCreatingBet: (state, action: PayloadAction<BetResponseDTO>) => {
      const bets = state.bets;
      bets.push(action.payload);

      state.bets = bets;
      state.isCreating = false;
      state.creatingError = '';
    },
    failedCreatingBet: (state, action: PayloadAction<string>) => {
      state.isCreating = false;
      state.creatingError = action.payload;
    }
  }
});

export const {
  processRetrievingBets, 
  successRetrievingBets, 
  failedRetrievingBets,
  processCreatingBet,
  successCreatingBet,
  failedCreatingBet
} = betsSlice.actions;

export default betsSlice.reducer;
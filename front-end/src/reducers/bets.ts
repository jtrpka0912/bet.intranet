import { createSlice } from "@reduxjs/toolkit";
import BetResponseDTO from "../dto/bet-response";

import type { PayloadAction } from "@reduxjs/toolkit";
import { PaginatePayloadAction } from "../components/panels/list/List.types";

export type BetsState = {
  bets: BetResponseDTO[];
  isRetrieving: boolean;
  retrievingError: string;
  isCreating: boolean;
  creatingError: string;
  detail: BetResponseDTO | null;
  completing: BetResponseDTO | null;
  isCompleting: boolean;
  completingError: string;
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

const initialState: BetsState = {
  bets: [],
  isRetrieving: false,
  retrievingError: '',
  isCreating: false,
  creatingError: '',
  detail: null,
  completing: null,
  isCompleting: false,
  completingError: '',
  currentPage: 0,
  totalPages: 0,
  limit: 10,
  totalItems: 0
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
    },

    // Get Bet Detail
    selectBetDetail: (state, action: PayloadAction<BetResponseDTO>) => {
      state.detail = action.payload;
      state.completing = null;
    },
    unselectBetDetail: (state) => {
      state.detail = null;
      state.completing = null;
    },

    // Selecting a bet to complete
    selectBetCompletion: (state, action: PayloadAction<BetResponseDTO>) => {
      state.detail = null;
      state.completing = action.payload;
    },
    unselectBetCompletion: (state) => {
      state.detail = null;
      state.completing = null;
    },

    // Completing a bet
    processCompletingBet: (state) => {
      state.isCompleting = true;
      state.completingError = '';
    },
    successCompletingBet: (state, action: PayloadAction<BetResponseDTO>) => {
      // Swap the old data for new data of updated bet
      const bets = state.bets.map((bet: BetResponseDTO) => {
        if(bet.id === action.payload.id) {
          return action.payload;
        }

        return bet;
      });
      
      state.bets = bets;
      state.isCompleting = false;
      state.completingError = '';
    },
    failedCompletingBet: (state, action: PayloadAction<string>) => {
      state.isCompleting = false;
      state.completingError = action.payload
    },

    // Pagination
    paginate: (state, action: PayloadAction<PaginatePayloadAction>) => {
      const payload: PaginatePayloadAction = action.payload;

      state.currentPage = payload.currentPage;
      state.totalPages = payload.totalPages;
      state.limit = payload.limit;
      state.totalItems = payload.totalItems;
    }
  }
});

export const {
  processRetrievingBets, 
  successRetrievingBets, 
  failedRetrievingBets,
  processCreatingBet,
  successCreatingBet,
  failedCreatingBet,
  selectBetDetail,
  unselectBetDetail,
  selectBetCompletion,
  unselectBetCompletion,
  processCompletingBet,
  successCompletingBet,
  failedCompletingBet,
  paginate
} = betsSlice.actions;

export default betsSlice.reducer;
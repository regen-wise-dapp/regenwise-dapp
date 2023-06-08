'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  modalContent: '',
  modalTitle: 'Attention!',
};

const gameModalSlice = createSlice({
  name: 'gameModal',
  initialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.isModalOpen = true;
      state.modalTitle = action.payload;
      state.modalContent = action.payload;
    },
    setModalClose: (state) => {
      state.isModalOpen = false;
      state.modalContent = '';
    },
  },
});

export const { setModalOpen, setModalClose } = gameModalSlice.actions;
export const selectIsModalOpen = (state: any) => state.gameModal.isModalOpen;
export const selectModalContent = (state: any) => state.gameModal.modalContent;

export default gameModalSlice.reducer;


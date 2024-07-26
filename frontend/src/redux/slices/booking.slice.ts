import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface BookingState {
  bookingItemList: { [key: number]: number }
}

const initialState: BookingState = {
  bookingItemList: {},
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addCount: (state, action: PayloadAction<number>) => {
      const itemId = action.payload
      state.bookingItemList[itemId] = (state.bookingItemList[itemId] || 0) + 1
    },
    minusCount: (state, action) => {
      const itemId = action.payload
      if (!state.bookingItemList[itemId]) return
      if (state.bookingItemList[itemId] === 1) {
        delete state.bookingItemList[itemId]
      } else {
        state.bookingItemList[itemId] -= 1
      }
    },
  },
})

export const { addCount, minusCount } = bookingSlice.actions
export const { reducer: bookingReducer } = bookingSlice

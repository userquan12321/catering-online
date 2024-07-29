import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Catering } from '@/types/caterer.type'

type CateringPayload = Omit<Catering, 'description' | 'servesCount' | 'image'>

interface BookingState {
  bookingItemList: (CateringPayload & {
    quantity: number
  })[]
}

const initialState: BookingState = {
  bookingItemList: [],
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CateringPayload>) => {
      const itemIndex = state.bookingItemList.findIndex(
        (item) => item.id === action.payload.id,
      )
      if (itemIndex !== -1) {
        state.bookingItemList[itemIndex].quantity += 1
        return
      }
      state.bookingItemList.push({ ...action.payload, quantity: 1 })
    },
    removeItem: (state, action: PayloadAction<CateringPayload>) => {
      const itemIndex = state.bookingItemList.findIndex(
        (item) => item.id === action.payload.id,
      )
      if (itemIndex !== -1) {
        state.bookingItemList[itemIndex].quantity -= 1
        if (state.bookingItemList[itemIndex].quantity === 0) {
          state.bookingItemList.splice(itemIndex, 1)
        }
      }
    },
    deleteBookingItem: (state, action: PayloadAction<number>) => {
      const itemIndex = state.bookingItemList.findIndex(
        (item) => item.id === action.payload,
      )
      if (itemIndex !== -1) {
        state.bookingItemList.splice(itemIndex, 1)
      }
    },
    resetBooking: (state) => {
      state.bookingItemList = []
    },
  },
})

export const { addItem, removeItem, deleteBookingItem, resetBooking } =
  bookingSlice.actions
export const { reducer: bookingReducer } = bookingSlice

import * as yup from 'yup'

export const bookingValidation = yup.object().shape({
  numberOfPeople: yup
    .number()
    .required('Number of guests is required')
    .min(50, 'Number of guests must be at least 50'),
  occasion: yup.string().required('Occasion is required'),
  venue: yup.string().required('Venue is required'),
  eventDate: yup.date().required('Event date is required'),
  paymentMethod: yup.number().required('Payment method is required'),
  // menuItemIds: yup
  //   .array()
  //   .of(yup.number())
  //   .min(3, 'Select at least 3 menu items')
  //   .required('Menu items are required'),
})

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '@/constants/api.constant';
import { CuisineDTO } from '@/types/cuisine.type';

export const cuisineApi = createApi({
    reducerPath: 'cuisineApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ['Cuisine'],
    endpoints: (builder) => ({
        getCuisines: builder.query<CuisineDTO[], void>({
        query: () => 'admin/cuisines',
        providesTags: ['Cuisine'],
        }),
        addCuisine: builder.mutation<void, CuisineDTO>({
        query: (newCuisine) => ({
            url: 'admin/cuisines',
            method: 'POST',
            body: newCuisine,
        }),
        invalidatesTags: ['Cuisine'],
        }),
    }),
});

export const { useGetCuisinesQuery, useAddCuisineMutation } = cuisineApi;

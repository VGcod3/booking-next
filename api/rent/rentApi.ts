import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const BASE_URL = process.env.API_BASE || 'http://localhost:8000/api/v1/'

import { RentCreatePayload, RentGetPayload, RentUpdatePayload, RentPartialUpdatePayload } from './rentTypes';

// Create the API
const rentApi = createApi({
    reducerPath: 'rentApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        rentCreate: builder.mutation<void, RentCreatePayload>({
            query: (payload) => ({
                url: '/rent',
                method: 'POST',
                body: payload,
            }),
        }),
        rentRead: builder.query<RentGetPayload, string>({
            query: (room) => `/rent/${room}`,
        }),
        rentUpdate: builder.mutation<void, RentUpdatePayload>({
            query: ({ room, ...payload }) => ({
                url: `/rent/${room}`,
                method: 'PUT',
                body: payload,
            }),
        }),
        rentPartialUpdate: builder.mutation<void, RentPartialUpdatePayload>({
            query: ({ room, ...payload }) => ({
                url: `/rent/${room}`,
                method: 'PATCH',
                body: payload,
            }),
        }),
        rentDelete: builder.mutation<void, string>({
            query: (room) => ({
                url: `/rent/${room}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export hooks for usage
export const {
    useRentCreateMutation,
    useRentReadQuery,
    usePutReadMutation,
    usePatchReadMutation,
    useRentDeleteMutation } = rentApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

const BASE_URL = process.env.API_BASE || 'http://localhost:8000/api/v1/'

import { RentListResponse, Room } from './roomTypes'

import { Rent } from '@/api/rent/rentTypes'

interface RoomListQueryParams {
    limit?: number;
    offset?: number;
}

// Create the API
const roomApi = createApi({
    reducerPath: 'roomApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        roomList: builder.query<RentListResponse, RoomListQueryParams>({
            query: (params) => ({
                url: `/room?limit=${params.limit}&offset=${params.offset}`,
                params,
            }),
        }),
        roomCreate: builder.mutation<Room, Room>({
            query: (payload) => ({
                url: '/room/create',
                method: 'POST',
                body: payload,
            }),
        }),
        roomSearchRead: builder.query<Room, void>({
            query: (uuid) => `/room/search/${uuid}`,
        }),
        roomSearchDelete: builder.mutation<void, void>({
            query: (uuid) => ({
                url: `/room/search/${uuid}/delete`,
                method: 'DELETE',
            }),
        }),
        roomSearchRentsList: builder.query<Rent[], void>({
            query: (uuid) => `/room/search/${uuid}/rents`,
        }),
        roomSearchUpdate: builder.mutation<Room, Room>({
            query: ({ uuid, ...payload }) => ({
                url: `/room/search/${uuid}/update`,
                method: 'PUT',
                body: payload,
            }),
        }),
        roomSearchPartialUpdate: builder.mutation<Room, Room>({
            query: ({ uuid, ...payload }) => ({
                url: `/room/search/${uuid}/update`,
                method: 'PATCH',
                body: payload,
            }),
        }),
    }),
});

// Export hooks for usage
export const {
    useRoomListQuery,
    useRoomCreateMutation,
    useRoomSearchRead,
    useRoomSearchDelete,
    useRoomSearchRentList,
    useRoomSearchUpdate,
    useRoomSearchPartialUpdate
} = roomApi

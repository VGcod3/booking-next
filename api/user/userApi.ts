import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.API_BASE || 'http://localhost:8000/api/v1/'

import { User, SignUpRequest, SignInRequest, PatchRequest, PutRequest, UserSearchRentsListResponse } from './userTypes'

function getHeaders(username: string, password: string) {
    const credentials = btoa(`${username}:${password}`);
    return {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json'
    };
};

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL
    }),
    endpoints: (builder) => ({
        signUp: builder.mutation<User, SignUpRequest>({
            query: (signUpData) => ({
                url: '/user/register/',
                method: 'POST',
                body: signUpData,
            }),
        }),
        signIn: builder.mutation<User, SignInRequest>({
            query: (patchData) => ({
                url: '/user/',
                method: 'GET',
                headers: getHeaders(patchData.username, patchData.password)
            }),
        }),
        patchUser: builder.mutation<User, PatchRequest>({
            query: (patchData) => ({
                url: '/user/',
                method: 'PATCH',
                headers: getHeaders(patchData.username, patchData.password),
                body: patchData,
            }),
        }),
        putUser: builder.mutation<User, PutRequest>({
            query: (putData) => ({
                url: '/user/',
                method: 'PUT',
                headers: getHeaders(putData.username, putData.password),
                body: putData,
            }),
        }),
        deleteUser: builder.mutation<void, SignInRequest>({
            query: (deleteData) => ({
                url: '/user/',
                method: 'DELETE',
                headers: getHeaders(deleteData.username, deleteData.password),
            }),
        }),
        getUserSearchRents: builder.mutation<UserSearchRentsListResponse, SignInRequest>({
            query: (getRentsData) => ({
                url: `/user/search/${getRentsData.username}/rents/`,
                method: 'GET',
                headers: getHeaders(getRentsData.username, getRentsData.password)
            })

        }),
    }),
});

export const {
    useSignUpMutation,
    useSignInMutation,
    usePatchUserMutation,
    usePutUserMutation,
    useDeleteUserMutation,
    useGetUserSearchRentsMutation,
} = userApi;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PatchRequest, User } from '@/api/user/userTypes';

interface UserState {
    data: PatchRequest | null;
    isLogged: boolean;
}

const initialState: UserState = {
    data: null,
    isLogged: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<PatchRequest>) => {
            state.data = action.payload;
            state.isLogged = true;
        },
        clearUser: (state) => {
            state.data = null;
            state.isLogged = false;
        },
    }
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Room } from '@/api/room/roomTypes';

type RoomState = {
    rooms: Room[];
};

const initialState: RoomState = {
    rooms: []
};

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<Room[]>) => {
            state.rooms = action.payload;
        },
        addRoom: (state, action: PayloadAction<Room>) => {
            state.rooms.push(action.payload);
        },
        // more reducers as per your requirements...
    },
});

export const { setRooms, addRoom } = roomSlice.actions;

export default roomSlice.reducer;

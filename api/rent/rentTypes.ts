import { User } from '@/api/user/userTypes'
import { Room } from '@/api/room/roomTypes'

export interface Rent {
    uuid?: string
    user?: User
    time_start: string
    time_end: string
    room: Room
}
export interface RentUpdatePayload extends Rent { }
export interface RentPartialUpdatePayload extends Rent { }
export interface RentGetPayload extends Rent { }
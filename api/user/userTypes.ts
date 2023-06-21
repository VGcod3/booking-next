import { Room } from '@/api/room/roomTypes'
import { Rent } from '@/api/rent/rentTypes'

export interface User {
    username: string
    email: string
    firstName: string
    lastName: string
    phone?: string
    userStatus?: string
}

export interface SignInRequest {
    username: string;
    password: string;
}

export interface PatchRequest extends User {
    password: string;
}

export interface PutRequest extends User {
    password: string;
}

export interface SignUpRequest extends User {
    password: string;
}

export interface UserSearchRentsListResponse {
    count: number
    next: any
    previous: any
    results: Rent[]
}

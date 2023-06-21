import { Rent } from '@/api/rent/rentTypes'

export interface Rooms {
    count: number;
    next: string | null;
    previous: string | null;
    results: Room[];
}

export interface Room {
    uuid?: string;
    name: string;
    numƷOfSeats: number; //зеберем
    // adults: string; //дорослі
    // children?: string; //діти не обов'язкове поле
    // images: string[];

}
export interface RentListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Rent[];
}

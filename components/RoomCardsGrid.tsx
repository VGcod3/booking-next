'use client'
import rooms from "../rooms";
import RoomCard from "@/components/ui/RoomCard";
import AnimatedWrapper from "@/components/AnimatedWrapper";

export default function RoomsCardGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room, index) => (
                <AnimatedWrapper delay={0.2} key={index}>
                    <RoomCard
                        imageUrl={room.image}
                        title={room.title}
                        occupancy={room.capacity}
                        index={index}
                        description={room.description}
                    />
                </AnimatedWrapper>
            ))}
        </div>
    )
}
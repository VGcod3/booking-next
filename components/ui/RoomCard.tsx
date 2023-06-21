import Image from "next/image";
import Link from "next/link";

interface RoomCardProps {
    imageUrl: string;
    title: string;
    occupancy: string;
    description: string;
    index: number;
}

const RoomCard = ({ imageUrl, title, occupancy, description, index }: RoomCardProps) => {

    return (
        <div className="block overflow-hidden rounded-lg shadow-lg">
            <Image height={48} width={330} src={imageUrl} alt={title} className="object-cover w-full  h-48" />
            <div className="bg-gray-100 w-full h-auto p-4">
                <h3 className="text-indigo-500 font-semibold text-lg mb-2">{title}</h3>
                <span className="bg-gray-300 rounded text-sm text-black px-2 py-1 font-semibold">{occupancy}</span>
                <p className="text-gray-700 text-sm my-2">{description}</p>
                <Link href={`room/${index}`}>
                    <button className="w-full justify-center inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Book Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RoomCard;

import rooms from "../rooms";
import Image from "next/image";
import Link from "next/link";

export default function GoodsGrid() {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room, index) => (
                <Link href={`/room/${index}`} key={index} className="rounded-lg  transition-all hover:shadow-2xl focus:outline-indigo-500 active:shadow-indigo-500 focus:outline-offset-4" >
                    <div className="block overflow-hidden rounded-lg shadow-lg ">
                        <Image height={48} width={330} src={room.image} alt={room.title} className="object-cover w-full  h-48" />
                        <div className="bg-gray-100 w-full h-auto p-4">
                            <h3 className="text-indigo-500 font-semibold text-lg mb-2">{room.title}</h3>
                            <div className="flex justify-between">

                                <span className="bg-gray-300 rounded text-sm text-gray-900 px-2 py-1 font-semibold">{room.capacity}</span>
                                <span className="bg-gray-200 rounded text-sm text-indigo-500 px-2 py-1 font-light">
                                    {`$${(index + 1) * 23}`}
                                </span>
                            </div>
                            <p className="text-gray-700 text-sm my-2">{room.description}</p>
                        </div>
                    </div>
                </Link>
            ))
            }
        </div >
    )

}

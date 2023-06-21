import rooms from "../rooms";
import Link from "next/link";

export default function GoodsLIst() {

    return (

        <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Title
                    </th>
                    <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                        Price
                    </th>
                    <th scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                        Visistors
                    </th>
                    <th scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 table-cell">
                    </th>

                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
                {rooms.map((room, index) => (
                    <tr key={index}>

                        <td className="py-4 pl-4 pr-3 text-sm font-normal text-gray-900 sm:hidden none sm:pl-6">
                            <dl>
                                <dd className="mt-1 truncate text-gray-700 font-bold">{room.title}</dd>
                            </dl>
                            <dl>
                                <dd className="mt-1 truncate text-gray-700">{room.capacity}</dd>
                            </dl>
                            <dl>
                                <dd className="mt-1  text-gray-700">
                                    <span className="bg-gray-200 rounded text-indigo-500 px-2 py-1 font-light">
                                        {`$${(index + 1) * 23}`}
                                    </span>
                                </dd>
                            </dl>
                        </td>


                        <td className="px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">
                            {room.title}
                        </td>
                        <td className="px-3 py-4 text-sm hidden sm:table-cell">
                            <span className="bg-gray-200 rounded  text-indigo-500 px-2 py-1 font-light">
                                {`$${(index + 1) * 23}`}
                            </span>
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">
                            {room.capacity}
                        </td>
                        <td className="text-center text-sm font-medium">
                            <Link href={`/room/${index}`} className="min-w-8 text-white rounded-md hover:shadow-md transition-all hover:scale-125 hover:shadow-indigo-300 bg-indigo-500 px-3 py-2 focus:ring-indigo-500active:shadow-indigo-500 focus:outline-offset-4">
                                Book Now
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )

}

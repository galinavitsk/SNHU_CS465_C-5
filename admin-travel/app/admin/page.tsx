"use client";

import { GetTrips } from "@/api/tripsService";
import Image from "next/image";
import { Trip } from "@/types/trip";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Admin() {
    const router = useRouter();
    const [trips, setTrips] = useState<Trip[]>([]);
    const [message, setMessage] = useState<string>("");
    useEffect(() => {
        GetTrips().then((res) => {
            if (res == 400) {
                setMessage("There has been an error fetching trips. Please refresh the page.");
                return;
            }
            if (typeof res == "string") {
                setMessage(res);
                return;
            }
            setTrips(res);
        });
    }, [])

    const TripCard = (trip: Trip) => {
        return (
            <div className="p-5 border-2 border-gray-200 rounded-2xl flex-auto w-96 max-w-[33%] flex flex-col" key={trip._id}>
                <p className="text-xl font-semibold">{trip.name}</p>
                <Image
                    src={`/images/${trip.image}`}
                    alt={trip.name}
                    width={300}
                    height={200}
                    className="my-2 rounded-md mx-auto"
                />
                <p className="text-gray-600 font-light mt-1">{trip.resort}</p>
                <p className="text-gray-600 font-light mt-1">{trip.length} only</p>
                <p className="text-gray-600 font-light mt-1">${trip.perPerson} per person</p>
                <p className="mt-2">
                    {trip.description.map((d, i) => {
                        return <span key={`${trip._id}-${i}`}>{d}<br /></span>
                    })}
                </p>
                <div className="flex flex-wrap pt-2 gap-y-2 gap-x-5 mt-auto mr-auto self-end">
                    <Button
                        onClick={() => {
                            router.push("/admin/editTrip?id=" + trip.code);
                        }}
                        classNames={{ wrapper: "px-5" }}
                        label="Edit" />
                    <Button
                        onClick={() => { }}
                        classNames={{ wrapper: "px-5 bg-red-400" }}
                        label="Delete" /></div>
            </div>
        );
    };
    return (
        <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
            <Button
                onClick={() => {
                    router.push("/admin/editTrip");
                }}
                classNames={{ wrapper: "m-10 p-5 bg-green-600" }}
                label="Add New Trip" />
            {message != "" && <p className="text-xl text-red-500 font-bold">{message}</p>}
            <div className="flex flex-wrap gap-5 m-10">
                {trips.sort((a, b) => a.name.localeCompare(b.name)).map((trip) => { return TripCard(trip); })}
            </div>
        </div>
    );
}

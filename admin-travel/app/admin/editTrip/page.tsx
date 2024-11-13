"use client";

import { AddTrip, GetTrip, UpdateTrip } from "@/api/tripsService";
import Image from "next/image";
import { Trip } from "@/types/trip";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditTrip() {


    const router = useRouter();
    const searchParams = useSearchParams();
    const tripCode = searchParams.get("id");
    const [trip, setTrip] = useState<Trip | null>(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [message, setMessage] = useState<string>("");
    const [saveEnabled, setSaveEnabled] = useState(false);
    useEffect(function GetTripForEditing() {
        if (tripCode == null) return;
        GetTrip(tripCode).then((res) => {
            if (res == 400) {
                setMessage("There has been an error fetching trips. Please refresh the page.");
                return;
            }
            if (typeof res == "string") {
                setMessage(res);
                return;
            }
            setTrip(res[0]);
            setDate(res[0].start.split('T')[0]);
        });
    }, [tripCode])
    useEffect(function EnableSaveButton() {
        if (trip == null || !trip.code || !trip.name || !trip.length || !trip.resort || !trip.image || !trip.perPerson || !trip.description?.join("") || !date) {
            console.log(trip);
            setSaveEnabled(false);
            return;
        }
        setSaveEnabled(true);
    }, [trip, date, trip?.code, trip?.name, trip?.length, trip?.resort, trip?.image, trip?.perPerson, trip?.description?.join(",")])

    const TripCard = (trip: Trip) => {
        return (
            <div className="p-5 border-2 border-gray-200 rounded-2xl flex-initial min-w-60 w-96" key={trip._id} >
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
                <Button
                    onClick={() => {

                    }}
                    classNames={{ wrapper: "mt-2 px-5" }}
                    label="Edit" />
            </div>
        );
    };
    return (
        <div className="flex flex-col items-center max-w-xl gap-y-5 mx-auto mt-20">
            <p className="text-2xl">{tripCode ? "EDIT" : "CREATE A"} TRIP</p>
            <div className="grid grid-cols-[auto_1fr] gap-5">
                Code: <input
                    className={`input input-outline`}
                    value={trip?.code ?? ""}
                    onChange={(e) => { setTrip({ ...trip!, code: e.target.value.toUpperCase() }) }}
                />
                Name: <input
                    className={`input input-outline`}
                    value={trip?.name ?? ""}
                    onChange={(e) => { setTrip({ ...trip!, name: e.target.value }) }}
                    type="text"
                />
                Length: <input
                    className={`input input-outline`}
                    value={trip?.length ?? ""}
                    onChange={(e) => { setTrip({ ...trip!, length: e.target.value }) }}
                />
                Start: <input
                    className={`input input-outline`}
                    value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                    type="date"
                />
                Resort: <input
                    className={`input input-outline`}
                    value={trip?.resort ?? ""}
                    onChange={(e) => { setTrip({ ...trip!, resort: e.target.value }) }}
                />
                Per Person: <input
                    className={`input input-outline`}
                    value={trip?.perPerson ?? ""}
                    onKeyDown={(event) => {
                        if (!/[0-9]|[.]/.test(event.key) &&
                            event.key !== "Backspace" &&
                            event.key !== "Delete" &&
                            event.key !== "Tab" &&
                            event.key !== "ArrowLeft" &&
                            event.key !== "ArrowRight") {
                            event.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        setTrip({ ...trip!, perPerson: e.target.value })
                    }}
                />
                Image Name: <input
                    className={`input input-outline`}
                    value={trip?.image ?? ""}
                    onChange={(e) => { setTrip({ ...trip!, image: e.target.value }) }}
                />
                Description: <textarea
                    className={`input input-outline max-h-60 min-h-28`}
                    value={trip?.description?.join('\n') ?? ""}
                    onChange={(e) => { setTrip({ ...trip!, description: e.target.value.split('\n') }) }}
                    cols={40}
                    rows={5}
                />
                <Button
                    disabled={!saveEnabled}
                    onClick={() => {
                        if (trip == null) return;
                        setTrip({ ...trip, start: new Date(date) });
                        if (tripCode == null) {
                            AddTrip({ ...trip, start: new Date(date) }).then((res) => {
                                if (res == 200) {
                                    router.push("/admin");
                                }
                                setMessage(res);
                            })
                            return;
                        }
                        UpdateTrip(tripCode!, trip).then((res) => {
                            if (res == 200) {
                                router.push("/admin");
                            }
                            setMessage(res);
                        })
                    }}
                    classNames={{ wrapper: "col-start-2 w-1/2 bg-green-700" }}
                    label="Save" />
                <p className="text-red-500">{message}</p>
            </div>

        </div>
    );
}

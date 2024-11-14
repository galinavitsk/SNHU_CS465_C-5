"use client";

import { AddTrip, GetTrip, GetTrips, UpdateTrip } from "@/api/tripsService";
import Image from "next/image";
import { Trip } from "@/types/trip";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckToken } from "@/api/authService";
import { set } from "mongoose";

export default function EditTrip() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tripId = searchParams.get("id");
    const [trip, setTrip] = useState<Trip | null>(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [message, setMessage] = useState<string>("");
    const [saveEnabled, setSaveEnabled] = useState(false);
    const [tripCodes, setTripCodes] = useState<string[]>([]);
    const [codeDupeError, setCodeDupeError] = useState(false);
    const [validImageFormat, setValidImageFormat] = useState(true);
    useEffect(function GetTripForEditing() {
        CheckToken().then((valid) => {
            if (!valid) {
                router.push("/");
                return;
            }
            else {
                if (tripId == null) return;
                GetTrip(tripId).then((res) => {
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
                    GetTrips().then((code) => {
                        const codes: string[] = [];
                        code.forEach((t: Trip) => {
                            codes.push(t.code);
                        });
                        setTripCodes([...codes.filter((c) => c != res[0].code)]);
                    })
                })

            }
        });
    }, [tripId])

    useEffect(function EnableSaveButton() {
        setValidImageFormat(true);
        setCodeDupeError(false);
        setSaveEnabled(true);
        if (trip == null || !trip.code || !trip.name || !trip.length || !trip.resort
            || !trip.image || !trip.perPerson || !trip.description?.join("") || !date) {
            setSaveEnabled(false);
        }
        if ((tripId == null || tripId != trip?.code) && tripCodes.includes(trip?.code ?? "")) {
            setCodeDupeError(true);
        }
        if (trip?.image && !/\.png|\.jpg|.jpeg/.test(trip.image)) {
            setValidImageFormat(false);
        }
    }, [trip, date, trip?.code, trip?.name,
        trip?.length, trip?.resort, trip?.image,
        trip?.perPerson, trip?.description?.join(","), tripCodes])

    return (
        <div className="flex flex-col items-center max-w-xl gap-y-5 mx-auto mt-20">
            <p className="text-2xl">{tripId ? "EDIT" : "CREATE A"} TRIP</p>
            <div className="grid grid-cols-[auto_1fr] gap-5">
                Code: <input
                    className={`input input-outline`}
                    value={trip?.code ?? ""}
                    onChange={(e) => { setTrip({ ...trip!, code: e.target.value.toUpperCase() }) }}
                />
                <span className={`text-red-500 col-start-2 ${codeDupeError ? "visible" : "hidden"} `}>Trip code already exists</span>
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
                        if ((!/[0-9]|[.]/.test(event.key) &&
                            event.key !== "Backspace" &&
                            event.key !== "Delete" &&
                            event.key !== "Tab" &&
                            event.key !== "ArrowLeft" &&
                            event.key !== "ArrowRight")
                            || (event.key == "." && trip?.perPerson?.includes("."))
                        ) {
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
                <span className={`text-red-500 col-start-2 ${!validImageFormat ? "visible" : "hidden"} `}>Trip image is not in valid format.</span>
                Description: <textarea
                    className={`input input-outline max-h-60 min-h-28`}
                    value={trip?.description?.join('\n') ?? ""}
                    onChange={(e) => { setTrip({ ...trip!, description: e.target.value.split('\n') }) }}
                    cols={40}
                    rows={5}
                />
                <Button
                    disabled={!saveEnabled || codeDupeError}
                    onClick={() => {
                        if (trip == null) return;
                        setTrip({ ...trip, start: new Date(date) });
                        if (tripId == null) {
                            AddTrip({ ...trip, start: new Date(date) }).then((res) => {
                                if (res == 200) {
                                    router.push("/admin/trips");
                                    return;
                                }
                                setMessage(res);
                            })
                            return;
                        }
                        UpdateTrip(trip._id, trip).then((res) => {
                            if (res == 200) {
                                router.push("/admin/trips");
                                return;
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

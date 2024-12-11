"use client";

import { AddRoom, GetRoom, GetRooms, UpdateRoom } from "@/api/roomsService";
import { Room } from "@/types/room";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckToken } from "@/api/authService";

export default function EditRoom() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const roomId = searchParams.get("id");
    const [room, setRoom] = useState<Room | null>(null);
    const [message, setMessage] = useState<string>("");
    const [saveEnabled, setSaveEnabled] = useState(false);
    const [roomCodes, setRoomCodes] = useState<string[]>([]);
    const [roomNames, setRoomNames] = useState<string[]>([]);
    const [codeDupeError, setCodeDupeError] = useState(false);
    const [nameDupeError, setNameDupeError] = useState(false);
    const [validImageFormat, setValidImageFormat] = useState(true);
    useEffect(function GetRoomForEditing() {
        CheckToken().then((valid) => {
            if (!valid) {
                router.push("/");
                return;
            }
            else {
                if (roomId == null) return;
                GetRoom(roomId).then((res) => {
                    if (res == 400) {
                        setMessage("There has been an error fetching rooms. Please refresh the page.");
                        return;
                    }
                    if (typeof res == "string") {
                        setMessage(res);
                        return;
                    }
                    setRoom(res[0]);
                    GetRooms().then((rooms) => {
                        const codes: string[] = [];
                        const names: string[] = [];
                        rooms.forEach((t: Room) => {
                            codes.push(t.code);
                            names.push(t.name);
                        });
                        setRoomCodes([...codes.filter((c) => c != res[0].code)]);
                        setRoomNames([...names.filter((c) => c != res[0].name)]);
                    })
                })

            }
        });
    }, [router, roomId])

    useEffect(function EnableSaveButton() {
        setValidImageFormat(true);
        setCodeDupeError(false);
        setNameDupeError(false);
        setSaveEnabled(true);
        if (room == null || !room.code || !room.name || !room.image || !room.capacity || !room.rate || !room.description?.join("")) {
            setSaveEnabled(false);
        }
        if (roomCodes.includes(room?.code ?? "")) {
            setCodeDupeError(true);
        }
        if (roomNames.includes(room?.name ?? "")) {
            setNameDupeError(true);
        }
        if (room?.image && !/\.png|\.jpg|.jpeg/.test(room.image)) {
            setValidImageFormat(false);
        }
    }, [room, roomId, room?.code, room?.name,
        room?.rate, room?.capacity, room?.image, room?.description?.length, roomCodes, roomNames])

    return (
        <div className="flex flex-col items-center max-w-xl gap-y-5 mx-auto mt-20">
            <p className="text-2xl">{roomId ? "EDIT" : "CREATE A"} ROOM</p>
            <div className="grid grid-cols-[auto_1fr] gap-5">
                Code: <input
                    className={`input input-outline`}
                    value={room?.code ?? ""}
                    onChange={(e) => { setRoom({ ...room!, code: e.target.value.toUpperCase() }) }}
                />
                <span className={`text-red-500 col-start-2 ${codeDupeError ? "visible" : "hidden"} `}>Room code already exists</span>
                Name: <input
                    className={`input input-outline`}
                    value={room?.name ?? ""}
                    onChange={(e) => { setRoom({ ...room!, name: e.target.value }) }}
                    type="text"
                />
                <span className={`text-red-500 col-start-2 ${nameDupeError ? "visible" : "hidden"} `}>Room name already exists</span>
                Rate: <input
                    className={`input input-outline`}
                    value={room?.rate ?? ""}
                    onKeyDown={(event) => {
                        if ((!/[0-9]|[.]/.test(event.key) &&
                            event.key !== "Backspace" &&
                            event.key !== "Delete" &&
                            event.key !== "Tab" &&
                            event.key !== "ArrowLeft" &&
                            event.key !== "ArrowRight")
                            || (event.key == "." && room?.rate?.includes("."))
                        ) {
                            event.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        setRoom({ ...room!, rate: e.target.value })
                    }}
                />
                Capacity: <input
                    className={`input input-outline`}
                    value={room?.capacity ?? 0}
                    onKeyDown={(event) => {
                        if ((!/[0-9]|[.]/.test(event.key) &&
                            event.key !== "Backspace" &&
                            event.key !== "Delete" &&
                            event.key !== "Tab" &&
                            event.key !== "ArrowLeft" &&
                            event.key !== "ArrowRight")
                        ) {
                            event.preventDefault();
                        }
                    }}
                    onChange={(e) => {
                        setRoom({ ...room!, capacity: parseInt(e.target.value) || 0 })
                    }}
                />
                Image Name: <input
                    className={`input input-outline`}
                    value={room?.image ?? ""}
                    onChange={(e) => { setRoom({ ...room!, image: e.target.value }) }}
                />
                <span className={`text-red-500 col-start-2 ${!validImageFormat ? "visible" : "hidden"} `}>Room image is not in valid format. (.png, .jpg, .jpeg)</span>
                Description: <textarea
                    className={`input input-outline max-h-60 min-h-28`}
                    value={room?.description?.join('\n') ?? ""}
                    onChange={(e) => { setRoom({ ...room!, description: e.target.value.split('\n') }) }}
                    cols={40}
                    rows={5}
                />
                <Button
                    disabled={!saveEnabled || codeDupeError || nameDupeError || !validImageFormat}
                    onClick={() => {
                        if (room == null) return;
                        setRoom({ ...room });
                        if (roomId == null) {
                            AddRoom({ ...room }).then((res) => {
                                if (res == 200) {
                                    router.push("/admin/rooms");
                                    return;
                                }
                                setMessage(res);
                            })
                            return;
                        }
                        UpdateRoom(room._id, room).then((res) => {
                            if (res == 200) {
                                router.push("/admin/rooms");
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

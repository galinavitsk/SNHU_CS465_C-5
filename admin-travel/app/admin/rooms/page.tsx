"use client";

import { DeleteRoom, GetRooms } from "@/api/roomsService";
import Image from "next/image";
import { Room } from "@/types/room";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { CheckToken } from "@/api/authService";

export default function RoomsPage() {
    const router = useRouter();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [message, setMessage] = useState<string>("");
    function UpdateRoomsList() {
        GetRooms().then((res) => {
            if (res == 401) {
                router.push("/");
                return;
            }
            if (res == 400) {
                setMessage("There has been an error fetching rooms. Please refresh the page.");
                return;
            }
            if (typeof res == "string") {
                setMessage(res);
                return;
            }
            setRooms(res);
        });
    }
    useEffect(function getRooms() {
        CheckToken().then((valid) => {
            if (!valid) {
                router.push("/");
                return;
            }
            else {
                UpdateRoomsList();
            }
        });
    }, [])

    const RoomCard = (room: Room) => {
        return (
            <div className="p-5 border-2 border-gray-200 rounded-2xl flex-auto w-96 max-w-[33%] flex flex-col" key={room._id}>
                <p className="text-xl font-semibold">{room.name}<span className="text-gray-600 font-light ml-2">{room.code}</span></p>
                <Image
                    src={`/images/${room.image}`}
                    alt={room.name}
                    width={300}
                    height={200}
                    className="my-2 rounded-md mx-auto"
                />
                <p className="text-gray-600 font-light mt-1">{room.rate} per day</p>
                <p className="text-gray-600 font-light mt-1">{room.capacity} person capacity</p>
                <p className="mt-2">
                    {room.description.map((d, i) => {
                        return <span key={`${room._id}-${i}`}>{d}<br /></span>
                    })}
                </p>
                <div className="flex flex-wrap pt-2 gap-y-2 gap-x-5 mt-auto mr-auto self-end">
                    <Button
                        onClick={() => {
                            router.push("/admin/rooms/editRoom?id=" + room._id);
                        }}
                        classNames={{ wrapper: "px-5" }}
                        label="Edit" />
                    <Button
                        onClick={() => {
                            DeleteRoom(room._id).then((res) => {
                                if (res == 200) {
                                    UpdateRoomsList();
                                } else { setMessage(res); }
                            })
                        }}
                        classNames={{ wrapper: "px-5 bg-red-400" }}
                        label="Delete" /></div>
            </div>
        );
    };
    return (
        <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
            <Button
                onClick={() => {
                    router.push("/admin/rooms/editRoom");
                }}
                classNames={{ wrapper: "m-10 p-5 bg-green-600" }}
                label="Add New Room" />
            {message != "" && <p className="text-xl text-red-500 font-bold">{message}</p>}
            <div className="flex flex-wrap gap-5 m-10">
                {rooms.sort((a, b) => a.name.localeCompare(b.name)).map((room) => { return RoomCard(room); })}
            </div>
        </div>
    );
}

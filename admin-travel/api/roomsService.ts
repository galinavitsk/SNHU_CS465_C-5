import { Room } from "@/types/room";
import { GetToken } from "./authService";
import { BASE_URL } from "./utils";

export const GetRooms = async () => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/rooms`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const res = await authRes.json();
        if (!authRes.ok) {
            return res.message;
        }
        return res as Room[];
    } catch {
        return 400;
    }
};

export const GetRoom = async (roomId: string) => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/rooms/${roomId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        if (authRes.status == 401) { return 401; }
        const res = await authRes.json();

        if (!authRes.ok) {
            return res.message;
        }
        return res as Room;
    } catch {
        return 400;
    }
};

export const UpdateRoom = async (roomId: string, room: Room) => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/rooms/${roomId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(room),
        });
        if (authRes.status == 401) { return 401; }
        const res = await authRes.json();
        if (!authRes.ok) {
            return res.message;
        }
        return 200;
    } catch {
        return 400;
    }
};

export const AddRoom = async (room: Room) => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/rooms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(room),
        });
        if (authRes.status == 401) { return 401; }
        const res = await authRes.json();
        if (!authRes.ok) {
            return res.message;
        }
        return 200;
    } catch {
        return 400;
    }
};

export const DeleteRoom = async (roomId: string) => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/rooms/${roomId}`, {
            method: "Delete",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (authRes.status == 401) { return 401; }
        const res = await authRes.json();
        if (!authRes.ok) {
            return res.message;
        }
        return 200;
    } catch {
        return 400;
    }
};
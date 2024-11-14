import { Trip } from "@/types/trip";
import { GetToken } from "./authService";
import { BASE_URL } from "./utils";

export const GetTrips = async () => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/trips`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const res = await authRes.json();
        if (!authRes.ok) {
            return res.message;
        }
        return res as Trip[];
    } catch {
        return 400;
    }
};

export const GetTrip = async (tripId: string) => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/trips/${tripId}`, {
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
        return res as Trip;
    } catch {
        return 400;
    }
};

export const UpdateTrip = async (tripId: string, trip: Trip) => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/trips/${tripId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(trip),
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

export const AddTrip = async (trip: Trip) => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/trips`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(trip),
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
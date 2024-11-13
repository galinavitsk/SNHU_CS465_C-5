import { Trip } from "@/types/trip";
import { GetToken } from "./authService";
import { BASE_URL } from "./utils";

/**
 * Fetches a list of trips from the backend API.
 * 
 * This function sends a GET request to the /trips endpoint using an authorization
 * token retrieved from the GetToken function. If the token is null, it returns
 * a status code of 400. The response is parsed as JSON and returned as an array
 * of Trip objects if the request is successful. If the request fails, the error
 * message from the response is returned. In the event of an exception, a status
 * code of 400 is returned.
 * 
 * @returns {Promise<Trip[] | number | string>} A promise that resolves to an array
 * of Trip objects on success, or an error message or status code 400 on failure.
 */
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

/**
 * Fetches a trip by its code from the backend API.
 * 
 * This function sends a GET request to the /trips/:tripCode endpoint using an authorization
 * token retrieved from the GetToken function. If the token is null, it returns
 * a status code of 400. The response is parsed as JSON and returned as a Trip object
 * if the request is successful. If the request fails, the error message from the response
 * is returned. In the event of an exception, a status code of 400 is returned.
 * 
 * @param {string} tripCode - The code of the trip to fetch.
 * @returns {Promise<Trip | number | string>} A promise that resolves to a Trip object
 * on success, or an error message or status code 400 on failure.
 */
export const GetTrip = async (tripCode: string) => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/trips/${tripCode}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        const res = await authRes.json();
        if (!authRes.ok) {
            return res.message;
        }
        return res as Trip;
    } catch {
        return 400;
    }
};


/**
 * Updates a trip in the backend API using its code.
 * 
 * This function sends a PUT request to the /trips/:tripCode endpoint with the trip data
 * in the request body, using an authorization token retrieved from the GetToken function.
 * If the token is null, it returns a status code of 400. The response is parsed as JSON and
 * returns a status code of 200 if the request is successful. If the request fails, the error
 * message from the response is returned. In the event of an exception, a status code of 400
 * is returned.
 * 
 * @param {string} tripCode - The code of the trip to update.
 * @param {Trip} trip - The updated trip data to send to the backend.
 * @returns {Promise<number | string>} A promise that resolves to a status code 200 on success,
 * or an error message or status code 400 on failure.
 */
export const UpdateTrip = async (tripCode: string, trip: Trip) => {
    try {
        const token = GetToken();
        if (token == null) {
            return 400;
        }
        const authRes = await fetch(`${BASE_URL}/trips/${tripCode}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(trip),
        });
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

        const res = await authRes.json();
        if (!authRes.ok) {
            return res.message;
        }
        return 200;
    } catch {
        return 400;
    }
};
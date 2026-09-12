import api from "./api";

export const searchAccounts = async (keyword) => {

    const response = await api.get("/search", {
        params: {
            q: keyword
        }
    });

    return response.data;
};
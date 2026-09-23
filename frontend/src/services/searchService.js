import api from "./api";

export const searchAccounts = async (keyword) => {

    const response = await api.get("/search", {
        params: {
            q: keyword
        }
    });

    return response.data;
};

export const updateTick = async ({
    Name1,
    Name2,
    Village,
    Tick,
    secretCode
}) => {

    const response = await api.put("/update-tick", {
        Name1,
        Name2,
        Village,
        Tick,
        secretCode
    });

    return response.data;
};
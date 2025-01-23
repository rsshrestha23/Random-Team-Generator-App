import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const addPlayer = async (data) => {
    return await axios.post(`${API_URL}/players`, data);
};

export const editPlayer = async (id, data) => {
    return await axios.put(`${API_URL}/players/${id}`, data);
};

export const deletePlayer = async (id) => {
    return await axios.delete(`${API_URL}/players/${id}`);
};

export const addTeam = async (data) => {
    return await axios.post(`${API_URL}/teams`, data);
};

export const editTeam = async (id, data) => {
    return await axios.put(`${API_URL}/teams/${id}`, data);
};

export const deleteTeam = async (id) => {
    return await axios.delete(`${API_URL}/teams/${id}`);
};

export const generateTeams = async (data) => {
    return await axios.post(`${API_URL}/generate-teams`, data);
};

export const getPlayers = async () => {
    return await axios.get(`${API_URL}/players`);
};

export const getTeams = async () => {
    return await axios.get(`${API_URL}/teams`);
};
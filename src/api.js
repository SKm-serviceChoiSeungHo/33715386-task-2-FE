import axios from 'axios';

const API_BASE = 'https://flow.madras.p-e.kr/api/people'; // 백엔드 주소

export const searchPeople = async (query) => {
    const res = await axios.get(`${API_BASE}/search`, {
        params: { query }
    });
    return res.data;
};

export const getPeopleDetails = async (name) => {
    const res = await axios.get(`${API_BASE}/detail`, {
        params: { name }
    });
    return res.data;
};

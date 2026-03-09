import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;
const TOKEN = process.env.EXPO_PUBLIC_SUPERHERO_TOKEN;

export const getHeroById = async (id: number | string) => {
  const res = await axios.get(`${BASE_URL}/${TOKEN}/${id}`);
  return res.data;
};

export const getAllHeroes = async (ids: number[]) => {
  const requests = ids.map((id) => getHeroById(id));
  return Promise.all(requests);
};

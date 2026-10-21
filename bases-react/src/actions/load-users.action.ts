import axios from 'axios';
import type { UserListResponse } from '../interfaces/reqres.response';

const reqresApiUrl = 'https://reqres.in/api/users';
const reqresApiKey = import.meta.env.VITE_REQRES_API_KEY;
const reqresHeaders = {
  'x-api-key': reqresApiKey,
  'X-Reqres-Env': 'prod',
};

// Funcion sencilla para consultar la API de Reqres y obtener usuarios.
export const loadUsersAction = async (page: number) => {
  if (!reqresApiKey) {
    console.error('Falta configurar VITE_REQRES_API_KEY en .env.local');
    return [];
  }

  try {
    const { data } = await axios.get<UserListResponse>(reqresApiUrl, {
      params: { page },
      headers: reqresHeaders,
    });

    return data.data;
  } catch (error) {
    console.error('Error al cargar usuarios desde ReqRes:', error);
    return [];
  }
};

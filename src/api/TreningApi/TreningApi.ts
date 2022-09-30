import axios, { AxiosRequestConfig } from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/context';
import { Trening } from '../../helpers/types';

export const TreningApi = () => {
  const { appState } = useContext(Context);

  const post = async (data: Trening) => {
    try {
      const response = await axios.post(
        appState.apiUrl + '/trening/',
        { ...data, userId: appState.user.id },
        { ...options }
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const list = async () => {
    try {
      const response = await axios.get(appState.apiUrl + '/trening/', {
        ...options
      });
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const options: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      Authorization: appState?.user?.token
    }
  };

  return { post, list };
};

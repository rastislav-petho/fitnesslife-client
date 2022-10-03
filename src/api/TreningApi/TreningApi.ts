import axios, { AxiosRequestConfig } from 'axios';
import { useContext } from 'react';
import { config } from '../../config';
import { Context } from '../../context/context';
import { TreningType } from '../../helpers/types';

export const TreningApi = () => {
  const { appState } = useContext(Context);

  const post = async (data: TreningType) => {
    try {
      const response = await axios.post(
        config.apiUrl + '/trening/',
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
      const response = await axios.get(config.apiUrl + '/trening/', {
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

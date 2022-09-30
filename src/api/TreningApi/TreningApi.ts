import axios, { AxiosRequestConfig } from 'axios';
import { useContext } from 'react';
import { Context } from '../../context/context';
import { Trening } from '../../helpers/types';

export const TreningApi = () => {
  const { state } = useContext(Context);

  const post = async (data: Trening) => {
    try {
      const response = await axios.post(
        state.apiUrl + '/trening/',
        { ...data, userId: state.user.id },
        { ...options }
      );
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const list = async () => {
    try {
      const response = await axios.get(state.apiUrl + '/trening/', {
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
      Authorization: state?.user?.token
    }
  };

  return { post, list };
};

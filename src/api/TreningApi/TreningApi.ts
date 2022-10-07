import axios, { AxiosRequestConfig } from 'axios';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { TreningFilter } from '../../components/Trening/useTrening';
import { config } from '../../config';
import { Context } from '../../context/context';
import { TreningExerciseType, TreningType } from '../../helpers/types';
import { fromApi } from './TreningMapper';

type TreningPostType = {
  trening: TreningType;
  treningExercise: TreningExerciseType[];
};

export const TreningApi = () => {
  const { appState } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const post = async (data: TreningPostType) => {
    try {
      const response = await axios.post(
        config.apiUrl + '/trening',
        { ...data, userId: appState.user.id },
        { ...options }
      );
      return response;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      return Promise.reject(error);
    }
  };

  const update = async (data: TreningPostType) => {
    try {
      const response = await axios.patch(config.apiUrl + '/trening', { ...data }, { ...options });
      return response;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      return Promise.reject(error);
    }
  };

  const remove = async (id: number) => {
    try {
      const response = await axios.delete(`${config.apiUrl}/trening/${id}`, { ...options });
      return response;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      return Promise.reject(error);
    }
  };

  const filter = async (filter: TreningFilter): Promise<any> => {
    try {
      const response = await axios.get(`${config.apiUrl}/trening/filter`, {
        ...options,
        params: {
          id: appState.user.id,
          dateFrom: filter.dateFrom,
          dateTo: filter.dateTo
        }
      });
      const data = {
        ...response,
        data: response.data.map((item: any) => fromApi(item))
      };
      return data;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      return Promise.reject(error);
    }
  };

  const list = async (page: number = 1) => {
    try {
      const response = await axios.get(`${config.apiUrl}/trening/${appState.user.id}`, {
        ...options,
        params: {
          page: page
        }
      });

      const data = {
        ...response,
        data: response.data.data.map((item: any) => fromApi(item)),
        pagination: {
          total: response.data.total,
          perPage: response.data.per_page,
          currentPage: response.data.current_page
        }
      };
      return data;
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

  return { post, list, update, remove, filter };
};

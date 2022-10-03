import axios, { AxiosRequestConfig } from 'axios';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { CalorieFilter } from '../../components/Calorie/useCalorie';
import { config } from '../../config';
import { Context } from '../../context/context';
import { Calorie, CalorieApi } from '../../helpers/types';
import { fromApi, toApi } from './CaloriesMapper';

export const CaloriesApi = () => {
  const { appState } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const post = async (data: Calorie) => {
    const formatData = toApi(data);
    try {
      const response = await axios.post(
        config.apiUrl + '/calorie',
        {
          ...formatData,
          user_id: appState.user.id
        },
        { ...options }
      );
      return response;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      return Promise.reject(error);
    }
  };

  const update = async (data: Calorie) => {
    const formatData = toApi(data);
    try {
      const response = await axios.patch(
        config.apiUrl + '/calorie',
        { ...formatData },
        { ...options }
      );
      return response;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      return Promise.reject(error);
    }
  };

  const list = async (page: number = 1): Promise<any> => {
    try {
      const response = await axios.get(`${config.apiUrl}/calorie/${appState.user.id}`, {
        ...options,
        params: {
          page: page
        }
      });
      const data = {
        ...response,
        data: response.data.data.map((item: CalorieApi) => fromApi(item)),
        pagination: {
          total: response.data.total,
          perPage: response.data.per_page,
          currentPage: response.data.current_page
        }
      };
      return data;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      return Promise.reject(error);
    }
  };

  const filter = async (filter: CalorieFilter): Promise<any> => {
    try {
      const response = await axios.get(`${config.apiUrl}/calorie/filter`, {
        ...options,
        params: {
          id: appState.user.id,
          dateFrom: filter.dateFrom,
          dateTo: filter.dateTo
        }
      });
      const data = {
        ...response,
        data: response.data.map((item: CalorieApi) => fromApi(item))
      };
      return data;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      return Promise.reject(error);
    }
  };

  const options: AxiosRequestConfig = {
    headers: {
      Accept: 'application/json',
      Authorization: appState?.user?.token
    }
  };

  return { post, list, update, filter };
};

import axios, { AxiosRequestConfig } from 'axios';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { CalorieFilter } from '../../components/Calorie/useCalorie';
import { Context } from '../../context/context';
import { Calorie, CalorieApi } from '../../helpers/types';
import { fromApi, toApi } from './CaloriesMapper';

export const CaloriesApi = () => {
  const { state } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const post = async (data: Calorie) => {
    const formatData = toApi(data);
    try {
      const response = await axios.post(
        state.apiUrl + '/calorie',
        {
          ...formatData,
          user_id: state.user.id
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
        state.apiUrl + '/calorie',
        {
          ...formatData,
          user_id: state.user.id
        },
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
      const response = await axios.get(`${state.apiUrl}/calorie/${state.user.id}`, {
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
      const response = await axios.get(`${state.apiUrl}/calorie/filter`, {
        ...options,
        params: {
          id: state.user.id,
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
      Authorization: state?.user?.token
    }
  };

  return { post, list, update, filter };
};

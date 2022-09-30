import axios, { AxiosRequestConfig } from 'axios';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { BodyFilter } from '../../components/Body/useBody';
import { Context } from '../../context/context';
import { Body } from '../../helpers/types';

export const BodyApi = () => {
  const { state } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const post = async (data: Body) => {
    try {
      const response = await axios.post(
        state.apiUrl + '/body',
        {
          ...data,
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

  const update = async (data: Body) => {
    try {
      const response = await axios.patch(state.apiUrl + '/body', { ...data }, { ...options });
      return response;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      return Promise.reject(error);
    }
  };

  const list = async (page: number = 1): Promise<any> => {
    try {
      const response = await axios.get(`${state.apiUrl}/body/${state.user.id}`, {
        ...options,
        params: {
          page: page
        }
      });
      const data = {
        ...response,
        data: response.data.data,
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

  const filter = async (filter: BodyFilter): Promise<any> => {
    try {
      const response = await axios.get(`${state.apiUrl}/body/filter`, {
        ...options,
        params: {
          id: state.user.id,
          dateFrom: filter.dateFrom,
          dateTo: filter.dateTo
        }
      });
      return response;
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

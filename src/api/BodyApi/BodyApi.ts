import axios, { AxiosRequestConfig } from 'axios';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { BodyFilter } from '../../components/Body/useBody';
import { Context } from '../../context/context';
import { Body } from '../../helpers/types';

export const BodyApi = () => {
  const { appState, dispatch } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const post = async (data: Body) => {
    try {
      const response = await axios.post(
        appState.apiUrl + '/body',
        {
          ...data,
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

  const update = async (data: Body) => {
    try {
      const response = await axios.patch(appState.apiUrl + '/body', { ...data }, { ...options });
      return response;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      return Promise.reject(error);
    }
  };

  const list = async (page: number = 1): Promise<any> => {
    try {
      const response = await axios.get(`${appState.apiUrl}/body/${appState.user.id}`, {
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
      const response = await axios.get(`${appState.apiUrl}/body/filter`, {
        ...options,
        params: {
          id: appState.user.id,
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
      Authorization: appState?.user?.token
    }
  };

  return { post, list, update, filter };
};

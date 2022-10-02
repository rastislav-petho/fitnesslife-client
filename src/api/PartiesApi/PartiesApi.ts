import { useContext } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import { PartiesVariantApi } from './PartiesVariantApi';
import { Context } from '../../context/context';
import { PartiesApiType, PartiesType } from '../../helpers/types';

export const PartiesApi = () => {
  const { appState } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const list = async (): Promise<AxiosResponse<PartiesType>> => {
    try {
      const response: AxiosResponse<PartiesApiType> = await axios.get(
        `${appState.apiUrl}/parties`,
        { ...options }
      );
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

  return { list, relations: { partiesVariant: PartiesVariantApi() } };
};

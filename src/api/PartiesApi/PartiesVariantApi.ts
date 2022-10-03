import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { config } from '../../config';
import { Context } from '../../context/context';
import { PartiesVariantType, PartiesVariantApiType } from '../../helpers/types';
import { fromApi } from './PartiesVariantMapper';

export const PartiesVariantApi = () => {
  const { appState } = useContext(Context);
  const { enqueueSnackbar } = useSnackbar();

  const findByPartieId = async (partieId: number): Promise<AxiosResponse<PartiesVariantType[]>> => {
    try {
      const response: AxiosResponse<PartiesVariantApiType[]> = await axios.get(
        `${config.apiUrl}/parties-variant/${partieId}`,
        { ...options }
      );

      const data = {
        ...response,
        data: response.data.map((item: PartiesVariantApiType) => fromApi(item))
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

  return { findByPartieId };
};

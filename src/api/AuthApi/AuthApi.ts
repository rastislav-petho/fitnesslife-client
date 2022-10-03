import axios from 'axios';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { config } from '../../config';
import { Context } from '../../context/context';
import { Login, Register } from '../../helpers/types';

export const AuthApi = () => {
  const { dispatch } = useContext(Context);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const login = async (data: Login) => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const response = await axios.post(config.apiUrl + '/login', {
        ...data
      });

      if (response.status === 200) {
        Cookies.set('user', response.data, { expires: 365 });
        dispatch({ type: 'LOGIN', user: response.data });
        dispatch({ type: 'SET_LOADING', loading: false });
        history.push('/');
      } else if (response.status === 203) {
        enqueueSnackbar('Nesprávne prihlasovacie údaje.', { variant: 'warning' });
        dispatch({ type: 'SET_LOADING', loading: false });
      }
      return response;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      dispatch({ type: 'SET_LOADING', loading: false });
      return Promise.reject(error);
    }
  };

  const register = async (data: Register): Promise<any> => {
    try {
      dispatch({ type: 'SET_LOADING', loading: true });
      const response = await axios.post(config.apiUrl + '/register', {
        ...data
      });
      if (response.status === 200) {
        history.push('/login');
      } else if (response.status === 203) {
        enqueueSnackbar('Emailová adresa sa už používa.', { variant: 'warning' });
        dispatch({ type: 'SET_LOADING', loading: false });
      }
      return response;
    } catch (error) {
      enqueueSnackbar('Upss, niečo sa pokazilo', { variant: 'error' });
      dispatch({ type: 'SET_LOADING', loading: false });
      return Promise.reject(error);
    }
  };

  const logout = () => {
    Cookies.remove('user');
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
  };

  return { login, register, logout };
};

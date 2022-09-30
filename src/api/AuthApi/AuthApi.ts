import axios from 'axios';
import Cookies from 'js-cookie';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/context';
import { Login, Register } from '../../helpers/types';

export const AuthApi = () => {
  const { state, dispatch } = useContext(Context);
  const history = useHistory();

  const login = async (data: Login) => {
    try {
      const response = await axios.post(state.apiUrl + '/login', {
        ...data
      });

      if (response.status === 200) {
        Cookies.set('user', response.data);
        dispatch({ type: 'LOGIN', user: response.data });
        history.push('/');
      }
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const register = async (data: Register): Promise<any> => {
    try {
      const response = await axios.post(state.apiUrl + '/register', {
        ...data
      });
      if (response.status === 200) {
        history.push('/login');
      }
      return response;
    } catch (error) {
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

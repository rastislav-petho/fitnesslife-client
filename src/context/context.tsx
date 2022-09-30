import { useReducer, createContext, FC, Dispatch } from 'react';
import Cookies from 'js-cookie';
import reducer from '../reducer/reducer';
import { User } from '../helpers/types';

type State = {
  user: User;
  loading: boolean;
  apiUrl: string;
};

interface IStateContext {
  appState: State;
  dispatch: Dispatch<any>;
}

export const Context = createContext({} as IStateContext);

type ContextProviderProps = {
  children: any;
};

export const ContextProvider: FC<ContextProviderProps> = (props) => {
  const user: User = Cookies.getJSON('user');

  const initialState: State = {
    user: user,
    //apiUrl: 'http://localhost/api',
    apiUrl: 'http://fitnesslife.sk/api/api',
    loading: false
  };

  const [appState, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ appState, dispatch }}>{props.children}</Context.Provider>;
};

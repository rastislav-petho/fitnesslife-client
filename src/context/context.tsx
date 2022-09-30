import { useReducer, createContext, FC, Dispatch } from 'react';
import Cookies from 'js-cookie';
import reducer from '../reducer/reducer';
import { Message, User } from '../helpers/types';

type State = {
  user: User;
  message: Message;
  apiUrl: string;
};

interface IStateContext {
  state: State;
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
    apiUrl: 'http://fitnesslife.sk/api/api',
    message: {
      type: null,
      message: null
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>;
};

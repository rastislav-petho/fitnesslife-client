import { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Context } from '../context/context';

export const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
  const { appState } = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        appState?.user?.token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

import { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Context } from '../context/context';

export const PrivateRoute: FC<any> = ({ component: Component, ...rest }) => {
  const { state } = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        state?.user?.token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

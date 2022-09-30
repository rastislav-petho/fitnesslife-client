import React, { FC, useContext, useEffect, useState } from "react";
import { Layout, Loading } from "../components";
import { Grid, makeStyles } from "@material-ui/core";

export const TreningPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const classes = useStyles();

  //   const fetchData = async () => {
  //     const response = await fetch(
  //       `localhost:80/api/api/client/start/${id}/${Cookies.get(
  //         'token'
  //       )}/${category}`
  //     );
  //     const body = await response.json();
  //     if (response.status !== 200) throw Error(body.message);

  //     console.log(category);

  //     const data = {
  //       menu: body.menu,
  //       category: body.category,
  //       partner: body.partner[0],
  //       token: body.token,
  //       tableToken: id,
  //     };

  //     dispatch({ type: 'SET_STATE', state: data });
  //     Cookies.set('token', body.token, { expires: 1 });
  //     setLoading(false);
  //   };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Layout
      title="Tréning"
      handleDialogOpen={() => {}}
      hadleFilterOpen={() => {}}
    >
      <div className={classes.root}>{loading ? <Loading /> : "ahoj"}</div>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
}));

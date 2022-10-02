import React, { FC, useContext, useEffect, useState } from 'react';
import { Layout, Loading } from '../components';
import { Grid, makeStyles } from '@material-ui/core';

export const TreningPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const classes = useStyles();

  return (
    <Layout title="Tréning" handleDialogOpen={() => {}} hadleFilterOpen={() => {}}>
      <div className={classes.root}>{loading ? <Loading /> : 'ahoj'}</div>
    </Layout>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%'
  }
}));

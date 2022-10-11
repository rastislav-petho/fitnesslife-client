import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const MobileWrapper = (props: any) => {
  const classes = useStyles();
  return <div className={classes.mobileWrapper}>{props.children}</div>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mobileWrapper: {
      display: 'block',

      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    }
  })
);

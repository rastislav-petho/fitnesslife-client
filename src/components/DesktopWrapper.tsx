import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const DesktopWrapper = (props: any) => {
  const classes = useStyles();
  return <div className={classes.warapper}>{props.children}</div>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    warapper: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'block'
      }
    }
  })
);

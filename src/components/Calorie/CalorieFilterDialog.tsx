import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { Container, Grid, TextField } from '@material-ui/core';
import { useApi } from '../../api/useApi';
import { Calorie } from '../../helpers/types';
import { CalorieFilter } from './useCalorie';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type CalorieFilterDialogProps = {
  filter: CalorieFilter;
  setFilter: React.Dispatch<React.SetStateAction<CalorieFilter>>;
  setData: (data: Calorie[]) => void;
};

export const CalorieFilterDialog = (props: CalorieFilterDialogProps) => {
  const classes = useStyles();
  const { caloriesApi } = useApi();
  const { filter, setFilter, setData } = props;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const result = await caloriesApi.filter(filter);
    if (result.status === 200) {
      setData(result.data);
      setFilter({ ...filter, open: false });
    }
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={filter.open}
        onClose={() => setFilter({ ...filter, open: false })}
        TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color="secondary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setFilter({ ...filter, open: false })}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Filter
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              Hľadať
            </Button>
          </Toolbar>
        </AppBar>
        <div className={classes.root}>
          <Container maxWidth={false}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="dateFrom"
                  label="Dátum Od"
                  variant="outlined"
                  type="date"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  className={classes.input}
                  defaultValue={filter.dateFrom}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dateTo"
                  label="Dátum Do"
                  variant="outlined"
                  type="date"
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  className={classes.input}
                  defaultValue={filter.dateTo}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1
    },
    root: {
      flexGrow: 1,
      marginTop: theme.spacing(2)
    },
    input: {
      width: '100%'
    }
  })
);

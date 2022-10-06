import {
  Grid,
  TextField,
  Typography,
  Slider,
  makeStyles,
  Theme,
  createStyles
} from '@material-ui/core';
import { TreningExerciseType } from '../../helpers/types';

type TreningVariantExerciseProps = {
  index: number;
  setTreningExercise: React.Dispatch<React.SetStateAction<TreningExerciseType[]>>;
  treningExercise: TreningExerciseType[];
};

export const TreningVariantExercise = (props: TreningVariantExerciseProps) => {
  const classes = useStyles();
  const { index, treningExercise, setTreningExercise } = props;

  const handleSeriesChange = (event: any, value: number | number[]) => {
    setTreningExercise((prevState) => {
      const newState = prevState.map((obj, key) => {
        if (key === index) {
          return { ...obj, series: value as number };
        }
        return obj;
      });

      return newState;
    });
  };

  const handleRepsChange = (event: any, value: number | number[]) => {
    setTreningExercise((prevState) => {
      const newState = prevState.map((obj, key) => {
        if (key === index) {
          return { ...obj, reps: value as number };
        }
        return obj;
      });

      return newState;
    });
  };

  const handleChange = (event: any) => {
    setTreningExercise((prevState) => {
      const newState = prevState.map((obj, key) => {
        if (key === index) {
          return { ...obj, [event.target.name]: event.target.value };
        }
        return obj;
      });

      return newState;
    });
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={2}>
      <TextField
        name="name"
        label={`${index + 1}. cvik`}
        variant="outlined"
        type="text"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        className={classes.exerciseInput}
        defaultValue={treningExercise[index].name}
      />
      <Typography variant="subtitle2">Počet sérií: {treningExercise[index].series}</Typography>
      <Slider
        step={1}
        min={0}
        max={10}
        value={treningExercise[index].series}
        onChange={handleSeriesChange}
        aria-labelledby="continuous-slider"
        color="secondary"
      />
      <Typography variant="subtitle2" className={classes.sliderLabel}>
        Počet opakovaní: {treningExercise[index].reps}
      </Typography>
      <Slider
        step={1}
        min={0}
        max={50}
        value={treningExercise[index].reps}
        onChange={handleRepsChange}
        aria-labelledby="continuous-slider"
        color="secondary"
      />
      <TextField
        name="weight"
        label="Váha"
        variant="outlined"
        type="number"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        className={classes.exerciseInput}
        defaultValue={treningExercise[index].weight}
      />
      <TextField
        name="notes"
        label="Poznámky"
        variant="outlined"
        type="text"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        className={classes.exerciseInput}
        defaultValue={treningExercise[index].notes}
      />
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    exerciseInput: {
      width: '100%',
      marginBottom: theme.spacing(2)
    },
    sliderLabel: {
      marginTop: theme.spacing(2)
    }
  })
);

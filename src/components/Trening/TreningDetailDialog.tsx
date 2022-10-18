import React, { FC } from 'react';
import {
  Dialog,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Slide,
  makeStyles,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableContainer,
  Chip,
  Typography,
  Grid
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { PartiesCodeType, PartiesType, TreningType } from '../../helpers/types';
import { formatDate, formatDecimal, getPartiesColor, getTreningIntensity } from '../../helpers/helpers';
import { MobileWrapper } from '../MobileWrapper';
import { DesktopWrapper } from '../DesktopWrapper';
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type TreningDetailDialogProps = {
  open: boolean;
  onClose: () => void;
  trening: TreningType;
};

export const TreningDetailDialog: FC<TreningDetailDialogProps> = (props) => {
  const classes = useStyles();
  const { trening, open, onClose } = props;
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      maxWidth="lg"
      onClose={onClose}>
      <DialogTitle>Detail tréningu</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DesktopWrapper>
          <TableContainer className={classes.container}>
            <Table>
              <TableHead>
                <TableRow>
                  <>
                    <TableCell className={classes.heading}>Trénované partie</TableCell>
                    <TableCell className={classes.heading}>Dátum</TableCell>
                    <TableCell className={classes.heading}>Spálené kalórie</TableCell>
                    <TableCell className={classes.heading}>Intenzita tréningu</TableCell>
                    <TableCell className={classes.heading}>Trvanie tréningu</TableCell>
                    <TableCell className={classes.heading}>Poznámky</TableCell>
                  </>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className={classes.chipWrapper}>
                      {trening.parties.map((item: PartiesType) => (
                        <Chip
                          key={item.id}
                          label={item.name}
                          style={{
                            backgroundColor: getPartiesColor(item.code),
                            color: '#ffffff',
                            marginRight: 4
                          }}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(trening.date)}</TableCell>
                  <TableCell>{trening.caloriesBurned} kcal</TableCell>
                  <TableCell>{getTreningIntensity(trening.treningExercise)} kg</TableCell>
                  <TableCell>{trening.time}</TableCell>
                  <TableCell>{trening.notes}</TableCell>
                </TableRow>
              </TableBody>
              <TableHead>
                <TableRow>
                  <>
                    <TableCell className={classes.heading}>Cviky</TableCell>
                    <TableCell className={classes.heading}>Počet opakovaní</TableCell>
                    <TableCell className={classes.heading}>Počet sérií</TableCell>
                    <TableCell className={classes.heading}>Váha</TableCell>
                    <TableCell className={classes.heading}>Intenzita</TableCell>
                    <TableCell className={classes.heading}>Poznámky</TableCell>
                  </>
                </TableRow>
              </TableHead>
              <TableBody>
                {trening.treningExercise.map((exercise, key) => (
                  <TableRow key={key}>
                    <TableCell
                      style={{
                        color: '#ffffff',
                        backgroundColor: getPartiesColor(
                          trening.parties.find((item: PartiesType) => item.id === exercise.partieId)
                            ?.code as PartiesCodeType
                        )
                      }}>
                      {exercise.name}
                    </TableCell>
                    <TableCell>{exercise.reps}</TableCell>
                    <TableCell>{exercise.series}</TableCell>
                    <TableCell>{formatDecimal(exercise.weight)} kg</TableCell>
                    <TableCell>{exercise.intensity} kg</TableCell>
                    <TableCell>{exercise.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DesktopWrapper>
        <MobileWrapper>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography className={classes.heading}>Trénované partie</Typography>
              {trening.parties.map((item: PartiesType) => (
                <Chip
                  key={item.id}
                  label={item.name}
                  style={{
                    backgroundColor: getPartiesColor(item.code),
                    color: '#ffffff',
                    marginRight: 4
                  }}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.heading}>Dátum</Typography>
              {formatDate(trening.date)}
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.heading}>Spálené kalórie</Typography>
              {trening.caloriesBurned} kcal
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.heading}>Intenzita tréningu</Typography>
              {getTreningIntensity(trening.treningExercise)} kg
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.heading}>Trvanie tréningu</Typography>
              {trening.time}
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.heading}>Poznámky</Typography>
              {trening.notes}
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography className={classes.heading}>Cviky</Typography>
                </Grid>
                {trening.treningExercise.map((exercise, key) => (
                  <div
                    className={classes.exerciseContainer}
                    style={{
                      backgroundColor: getPartiesColor(
                        trening.parties.find((item: PartiesType) => item.id === exercise.partieId)
                          ?.code as PartiesCodeType
                      )
                    }}>
                    <Grid item xs={12} className={classes.heading}>
                      {exercise.name}
                    </Grid>
                    <Grid container>
                      <Grid item xs={9}>
                        Série
                      </Grid>
                      <Grid item xs={3}>
                        {exercise.series}
                      </Grid>

                      <Grid item xs={9}>
                        Počet opakovaní
                      </Grid>
                      <Grid item xs={3}>
                        {exercise.reps}
                      </Grid>

                      <Grid item xs={9}>
                        Váha
                      </Grid>
                      <Grid item xs={3}>
                        {exercise.weight} kg
                      </Grid>

                      <Grid item xs={9}>
                        Intenzita
                      </Grid>
                      <Grid item xs={3}>
                        {exercise.intensity} kg
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="body2">Poznámky</Typography>
                      {exercise.notes}
                    </Grid>
                  </div>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </MobileWrapper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          Zavrieť
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles((theme: any) => ({
  dialogContent: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  },
  container: {
    minWidth: 800
  },
  chipWrapper: {
    display: 'flex'
  },
  exerciseContainer: {
    width: '100%',
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    borderRadius: 8,
    color: '#ffffff'
  }
}));

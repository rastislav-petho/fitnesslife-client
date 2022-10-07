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
  Chip
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { PartiesType, TreningType } from '../../helpers/types';
import { formatDate, getPartiesColor } from '../../helpers/helpers';
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
        <TableContainer className={classes.container}>
          <Table>
            <TableHead>
              <TableRow>
                <>
                  <TableCell className={classes.heading}>Trénované partie</TableCell>
                  <TableCell className={classes.heading}>Dátum</TableCell>
                  <TableCell className={classes.heading}>Spálené kalórie</TableCell>
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
                  <TableCell className={classes.heading}>Poznámky</TableCell>
                </>
              </TableRow>
            </TableHead>
            <TableBody>
              {trening.treningExercise.map((exercise, key) => (
                <TableRow key={key}>
                  <TableCell>{exercise.name}</TableCell>
                  <TableCell>{exercise.reps}</TableCell>
                  <TableCell>{exercise.series}</TableCell>
                  <TableCell>{exercise.weight} kg</TableCell>
                  <TableCell>{exercise.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
  }
}));

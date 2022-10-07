import React, { ChangeEvent, FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type TreningDialogProps = {
  handleCopyDialogClose: () => void;
  open: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => Promise<void>;
};

export const TreningCopyDialog: FC<TreningDialogProps> = (props) => {
  const classes = useStyles();
  const { open, handleCopyDialogClose, handleChange, onSubmit } = props;

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCopyDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">Kopírovať tréning</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <TextField
            name="date"
            label="Dátum"
            variant="outlined"
            type="date"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            className={classes.input}
            defaultValue=""
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCopyDialogClose} variant="text">
            Zavrieť
          </Button>
          <Button onClick={onSubmit} color="secondary" variant="contained">
            Uložiť
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogContent: {
      width: 300
    },
    input: {
      width: '100%'
    }
  })
);

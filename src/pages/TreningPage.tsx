import { FC } from 'react';
import { Layout, Loading, TreningAddDialog, useTrening } from '../components';
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';
import { formatDecimal } from '../helpers/helpers';

export const TreningPage: FC = () => {
  const classes = useStyles();

  const { loading, columns, handleDialog, handleFilterOpen, fetchData, dialog } = useTrening();

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout title="Tréning" handleDialogOpen={handleDialog} hadleFilterOpen={handleFilterOpen}>
      <div>
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table aria-label="sticky pagination table" stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column, key) => (
                    <TableCell key={key} className={classes.heading}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {state.data.map((row: any) => (
                  <TableRow
                    key={row.id}
                    onClick={() => handleDialog(true, 'EDIT', row)}
                    className={row.deficit < 0 ? classes.deficit : classes.surplus}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell align="left">{row.caloriesConsumed}</TableCell>
                    <TableCell align="left">{row.caloriesBurned}</TableCell>
                    <TableCell align="left">{row.deficit}</TableCell>
                    <TableCell align="left">{formatDecimal(row.weight)}</TableCell>
                    <TableCell align="left">{row.notes}</TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
      <TreningAddDialog dialog={dialog} setDialog={handleDialog} fetchData={fetchData} />
    </Layout>
  );
};

const useStyles = makeStyles((theme: any) => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  container: {
    maxHeight: '87vh',
    minWidth: 800
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold
  },
  pagination: {
    width: '100%',
    justifyContent: 'flex-end',
    position: 'fixed',
    bottom: 0,
    left: 0,
    backgroundColor: '#ffffff'
  }
}));

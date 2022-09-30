import { FC } from 'react';
import { Layout, Loading } from '../components';
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { BodyAddDialog, BodyFilterDialog, useBody } from '../components/Body';
import { formatDate } from '../helpers/helpers';

export const BodyPage: FC = () => {
  const classes = useStyles();

  const {
    handleDialog,
    handleFilterOpen,
    loading,
    state,
    handleSetState,
    handleChangePage,
    dialog,
    fetchData,
    filter,
    setFilter
  } = useBody();

  return (
    <Layout
      title="Veľkosti tela"
      handleDialogOpen={handleDialog}
      hadleFilterOpen={handleFilterOpen}>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table aria-label="sticky pagination table" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.heading}>Dátum</TableCell>
                      <TableCell className={classes.heading} align="left">
                        Krk (cm)
                      </TableCell>
                      <TableCell className={classes.heading} align="left">
                        Hrudník (cm)
                      </TableCell>
                      <TableCell className={classes.heading} align="left">
                        Ruky (cm)
                      </TableCell>
                      <TableCell className={classes.heading} align="left">
                        Predlaktia (cm)
                      </TableCell>
                      <TableCell className={classes.heading} align="left">
                        Brucho (cm)
                      </TableCell>
                      <TableCell className={classes.heading} align="left">
                        Pás (cm)
                      </TableCell>
                      <TableCell className={classes.heading} align="left">
                        Stehná (cm)
                      </TableCell>
                      <TableCell className={classes.heading} align="left">
                        Lýtka (cm)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.data.map((row: any) => (
                      <TableRow
                        key={row.id}
                        onClick={() => handleDialog(true, 'EDIT', row)}
                        className={classes.row}>
                        <TableCell component="th" scope="row">
                          {formatDate(row.date)}
                        </TableCell>
                        <TableCell align="left">{row.neck}</TableCell>
                        <TableCell align="left">{row.chest}</TableCell>
                        <TableCell align="left">{row.arm}</TableCell>
                        <TableCell align="left">{row.forearm}</TableCell>
                        <TableCell align="left">{row.belly}</TableCell>
                        <TableCell align="left">{row.belt}</TableCell>
                        <TableCell align="left">{row.thigh}</TableCell>
                        <TableCell align="left">{row.calf}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            {/* @ts-ignore */}
            {!filter.dateFrom && !filter.dateTo && (
              <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={state.pagination.total}
                rowsPerPage={state.pagination.perPage}
                page={state.pagination.currentPage - 1}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true
                }}
                onChangePage={handleChangePage}
                ActionsComponent={TablePaginationActions}
                className={classes.pagination}
              />
            )}
          </>
        )}
      </div>
      <BodyAddDialog dialog={dialog} setDialog={handleDialog} fetchData={fetchData} />
      <BodyFilterDialog filter={filter} setFilter={setFilter} setData={handleSetState} />
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
  row: {
    cursor: 'pointer'
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

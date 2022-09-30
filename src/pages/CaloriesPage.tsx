import { FC } from 'react';
import {
  CalorieAddDialog,
  CalorieFilterDetail,
  CalorieFilterDialog,
  Layout,
  Loading,
  useCalorie
} from '../components';
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

export const CaloriesPage: FC = () => {
  const classes = useStyles();
  const {
    handleDialog,
    handleFilterOpen,
    loading,
    filter,
    state,
    handleChangePage,
    fetchData,
    dialog,
    setFilter,
    handleSetState
  } = useCalorie();

  return (
    <Layout title="Kalórie" handleDialogOpen={handleDialog} hadleFilterOpen={handleFilterOpen}>
      <div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Paper className={classes.root}>
              {filter.dateFrom && filter.dateTo && (
                <CalorieFilterDetail data={state.data} filter={filter} />
              )}
              <TableContainer className={classes.container}>
                <Table aria-label="sticky pagination table" stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell>Dátum</TableCell>
                      <TableCell align="left">Prijaté kalórie (kcal)</TableCell>
                      <TableCell align="left">Spálené kalórie (kcal)</TableCell>
                      <TableCell align="left">Deficit (kcal)</TableCell>
                      <TableCell align="left">Hmotnosť (kg)</TableCell>
                      <TableCell align="left">Poznámky</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.data.map((row: any) => (
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
                        <TableCell align="left">{row.weight}</TableCell>
                        <TableCell align="left">{row.notes}</TableCell>
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
      <CalorieAddDialog dialog={dialog} setDialog={handleDialog} fetchData={fetchData} />
      <CalorieFilterDialog filter={filter} setFilter={setFilter} setData={handleSetState} />
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
    fontWeight: theme.typography.fontWeightRegular
  },
  deficit: {
    backgroundColor: '#1bfa0713',
    cursor: 'pointer'
  },
  surplus: {
    backgroundColor: '#fd020213',
    cursor: 'pointer'
  },
  pagination: {
    width: '100%',
    justifyContent: 'flex-end',
    position: 'fixed',
    bottom: 0,
    left: 0
  }
}));

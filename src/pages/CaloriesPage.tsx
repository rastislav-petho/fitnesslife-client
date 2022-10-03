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
import { formatDecimal } from '../helpers/helpers';

export const CaloriesPage: FC = () => {
  const classes = useStyles();
  const {
    handleDialog,
    handleFilterOpen,
    filter,
    state,
    handleChangePage,
    fetchData,
    dialog,
    loading,
    setFilter,
    handleSetState,
    columns
  } = useCalorie();

  const showCaloriesDetail = !!filter.dateFrom && !!filter.dateTo;

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout title="Kalórie" handleDialogOpen={handleDialog} hadleFilterOpen={handleFilterOpen}>
      <div>
        {showCaloriesDetail && <CalorieFilterDetail data={state.data} filter={filter} />}
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
                    <TableCell align="left">{formatDecimal(row.weight)}</TableCell>
                    <TableCell align="left">{row.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        {/* @ts-ignore */}
        {!showCaloriesDetail && (
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
    fontWeight: theme.typography.fontWeightBold
  },
  deficit: {
    backgroundColor: '#0167B117',
    cursor: 'pointer'
  },
  surplus: {
    backgroundColor: '#7E56AC24',
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

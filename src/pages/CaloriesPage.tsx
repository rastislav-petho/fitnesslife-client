import { FC } from 'react';
import {
  CalorieAddDialog,
  CalorieFilterDetail,
  CalorieFilterDialog,
  DesktopWrapper,
  Layout,
  MobileWrapper,
  useCalorie
} from '../components';
import {
  Card,
  Container,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
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
    setFilter,
    handleSetState,
    columns
  } = useCalorie();

  const showCaloriesDetail = !!filter.dateFrom && !!filter.dateTo;

  return (
    <Layout title="Kalórie" handleDialogOpen={handleDialog} hadleFilterOpen={handleFilterOpen}>
      <div>
        {showCaloriesDetail && <CalorieFilterDetail data={state.data} filter={filter} />}
        <DesktopWrapper>
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
        </DesktopWrapper>
        <MobileWrapper>
          <Container maxWidth="md">
            <Grid container className={classes.mobileContainer}>
              {state.data.map((row: any) => (
                <Card className={classes.card} onClick={() => handleDialog(true, 'EDIT', row)}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} className={classes.heading}>
                      Dátum:
                    </Grid>
                    <Grid item xs={6}>
                      {row.date}
                    </Grid>
                    <Grid item xs={6} className={classes.heading}>
                      Prijaté kalórie:
                    </Grid>
                    <Grid item xs={6}>
                      {row.caloriesConsumed} kcal
                    </Grid>

                    <Grid item xs={6} className={classes.heading}>
                      Spálené kalórie:
                    </Grid>
                    <Grid item xs={6}>
                      {row.caloriesBurned} kcal
                    </Grid>

                    <Grid item xs={6} className={classes.heading}>
                      Deficit:
                    </Grid>
                    <Grid item xs={6}>
                      {row.deficit} kcal
                    </Grid>

                    <Grid item xs={6} className={classes.heading}>
                      Hmotnosť:
                    </Grid>
                    <Grid item xs={6}>
                      {formatDecimal(row.weight)} kg
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="body2" className={classes.heading}>
                        Poznámky:
                      </Typography>
                      {row.notes}
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Grid>
          </Container>
        </MobileWrapper>
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
  },
  mobileContainer: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(2)
  },
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

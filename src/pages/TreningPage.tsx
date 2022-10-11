import { FC } from 'react';
import { DesktopWrapper, Layout, MobileWrapper, TreningAddDialog, useTrening } from '../components';
import {
  Card,
  Chip,
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
import { PartiesType, TreningType } from '../helpers/types';
import { formatDate, getPartiesColor } from '../helpers/helpers';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { TreningFilterDialog } from '../components/Trening/TreningFilterDialog';

export const TreningPage: FC = () => {
  const classes = useStyles();

  const {
    columns,
    handleDialog,
    handleFilterOpen,
    fetchData,
    dialog,
    state,
    filter,
    setFilter,
    handleSetState,
    handleChangePage
  } = useTrening();

  const showCaloriesDetail = !!filter.dateFrom && !!filter.dateTo;

  return (
    <Layout title="Tréning" handleDialogOpen={handleDialog} hadleFilterOpen={handleFilterOpen}>
      <div>
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
                  {state.data.map((row: TreningType) => (
                    <>
                      <TableRow
                        key={row.id}
                        onClick={() => handleDialog(true, 'EDIT', row)}
                        className={classes.tableRow}>
                        <TableCell component="th" scope="row" style={{ minWidth: 110 }}>
                          {formatDate(row.date)}
                        </TableCell>
                        <TableCell align="left">
                          <div className={classes.chipWrapper}>
                            {row.parties.map((item: PartiesType) => (
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
                        <TableCell align="left">{row.caloriesBurned}</TableCell>
                        <TableCell align="left">{row.time}</TableCell>
                        <TableCell align="left">{row.notes}</TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </DesktopWrapper>
        <MobileWrapper>
          <Container maxWidth="md">
            <Grid container className={classes.mobileContainer}>
              {state.data.map((row: TreningType) => (
                <Card className={classes.card} onClick={() => handleDialog(true, 'EDIT', row)}>
                  <Grid container spacing={2}>
                    <Grid item xs={6} className={classes.heading}>
                      Dátum:
                    </Grid>
                    <Grid item xs={6}>
                      {formatDate(row.date)}
                    </Grid>
                    <Grid item xs={6} className={classes.heading}>
                      Trénované partie:
                    </Grid>
                    <Grid item xs={6}>
                      <div>
                        {row.parties.map((item: PartiesType) => (
                          <Chip
                            key={item.id}
                            label={item.name}
                            style={{
                              backgroundColor: getPartiesColor(item.code),
                              color: '#ffffff',
                              marginRight: 4,
                              marginBottom: 4
                            }}
                          />
                        ))}
                      </div>
                    </Grid>
                    <Grid item xs={6} className={classes.heading}>
                      Spálené kalórie:
                    </Grid>
                    <Grid item xs={6}>
                      {row.caloriesBurned} kcal
                    </Grid>
                    <Grid item xs={6} className={classes.heading}>
                      Trvanie tréningu:
                    </Grid>
                    <Grid item xs={6}>
                      {row.time}
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
      <TreningAddDialog dialog={dialog} setDialog={handleDialog} fetchData={fetchData} />
      <TreningFilterDialog filter={filter} setFilter={setFilter} setData={handleSetState} />
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
  tableRow: {
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
  chipWrapper: {
    display: 'flex'
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

import { FC } from 'react';
import { DesktopWrapper, Layout, MobileWrapper } from '../components';
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
  TableRow
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { BodyAddDialog, BodyFilterDialog, useBody } from '../components/Body';
import { formatDate, formatDecimal } from '../helpers/helpers';

export const BodyPage: FC = () => {
  const classes = useStyles();

  const { state, handleSetState, handleChangePage, dialog, filter, fetchData, columns } = useBody();

  const length = state.data.length;
  return (
    <Layout
      title="Veľkosti tela"
      handleDialogOpen={dialog.handleDialog}
      hadleFilterOpen={filter.handleFilterOpen}>
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
                  {state.data.map((row: any, key) => {
                    // TODO presunut do useBody
                    let arm;
                    let belt;
                    let belly;
                    let ass;
                    let chest;
                    let thigh;
                    let calf;
                    let forearm;
                    let neck;
                    if (key + 1 < state.data.length) {
                      if (row.arm < state.data[key + 1].arm) arm = true;
                      else arm = false;

                      if (row.belt < state.data[key + 1].belt) belt = true;
                      else belt = false;

                      if (row.belly < state.data[key + 1].belly) belly = true;
                      else belly = false;

                      if (row.ass < state.data[key + 1].ass) ass = true;
                      else ass = false;

                      if (row.chest < state.data[key + 1].chest) chest = true;
                      else chest = false;

                      if (row.thigh < state.data[key + 1].thigh) thigh = true;
                      else thigh = false;

                      if (row.calf < state.data[key + 1].calf) calf = true;
                      else calf = false;

                      if (row.forearm < state.data[key + 1].forearm) forearm = true;
                      else forearm = false;

                      if (row.neck < state.data[key + 1].neck) neck = true;
                      else neck = false;
                    }

                    return (
                      <TableRow
                        key={row.id}
                        onClick={() => dialog.handleDialog(true, 'EDIT', row)}
                        className={classes.row}>
                        <TableCell component="th" scope="row">
                          {formatDate(row.date)}
                        </TableCell>
                        <TableCell align="left">
                          {row.belt && (
                            <div className={classes.column}>
                              {formatDecimal(row.belt)}
                              {key + 1 < length ? (
                                belt ? (
                                  <ArrowDropDownIcon style={{ color: 'green' }} />
                                ) : (
                                  <ArrowDropUpIcon style={{ color: 'red' }} />
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {row.belly && (
                            <div className={classes.column}>
                              {formatDecimal(row.belly)}
                              {key + 1 < length ? (
                                belly ? (
                                  <ArrowDropDownIcon style={{ color: 'green' }} />
                                ) : (
                                  <ArrowDropUpIcon style={{ color: 'red' }} />
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {row.ass && (
                            <div className={classes.column}>
                              {formatDecimal(row.ass)}{' '}
                              {key + 1 < length ? (
                                ass ? (
                                  <ArrowDropDownIcon style={{ color: 'green' }} />
                                ) : (
                                  <ArrowDropUpIcon style={{ color: 'red' }} />
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {row.chest && (
                            <div className={classes.column}>
                              {formatDecimal(row.chest)}{' '}
                              {key + 1 < length ? (
                                chest ? (
                                  <ArrowDropDownIcon style={{ color: 'green' }} />
                                ) : (
                                  <ArrowDropUpIcon style={{ color: 'red' }} />
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {row.arm && (
                            <div className={classes.column}>
                              {formatDecimal(row.arm)}{' '}
                              {key + 1 < length ? (
                                arm ? (
                                  <ArrowDropDownIcon style={{ color: 'green' }} />
                                ) : (
                                  <ArrowDropUpIcon style={{ color: 'red' }} />
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {row.thigh && (
                            <div className={classes.column}>
                              {formatDecimal(row.thigh)}{' '}
                              {key + 1 < length ? (
                                thigh ? (
                                  <ArrowDropDownIcon style={{ color: 'green' }} />
                                ) : (
                                  <ArrowDropUpIcon style={{ color: 'red' }} />
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {row.calf && (
                            <div className={classes.column}>
                              {formatDecimal(row.calf)}{' '}
                              {key + 1 < length ? (
                                calf ? (
                                  <ArrowDropDownIcon style={{ color: 'green' }} />
                                ) : (
                                  <ArrowDropUpIcon style={{ color: 'red' }} />
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {row.forearm && (
                            <div className={classes.column}>
                              {formatDecimal(row.forearm)}{' '}
                              {key + 1 < length ? (
                                forearm ? (
                                  <ArrowDropDownIcon style={{ color: 'green' }} />
                                ) : (
                                  <ArrowDropUpIcon style={{ color: 'red' }} />
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {row.neck && (
                            <div className={classes.column}>
                              {formatDecimal(row.neck)}{' '}
                              {key + 1 < length ? (
                                neck ? (
                                  <ArrowDropDownIcon style={{ color: 'green' }} />
                                ) : (
                                  <ArrowDropUpIcon style={{ color: 'red' }} />
                                )
                              ) : (
                                ''
                              )}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </DesktopWrapper>
        <MobileWrapper>
          <Container maxWidth="md">
            <Grid container className={classes.mobileContainer}>
              {state.data.map((row: any, key) => {
                // TODO presunut do useBody
                let arm;
                let belt;
                let belly;
                let ass;
                let chest;
                let thigh;
                let calf;
                let forearm;
                let neck;
                if (key + 1 < state.data.length) {
                  if (row.arm < state.data[key + 1].arm) arm = true;
                  else arm = false;

                  if (row.belt < state.data[key + 1].belt) belt = true;
                  else belt = false;

                  if (row.belly < state.data[key + 1].belly) belly = true;
                  else belly = false;

                  if (row.ass < state.data[key + 1].ass) ass = true;
                  else ass = false;

                  if (row.chest < state.data[key + 1].chest) chest = true;
                  else chest = false;

                  if (row.thigh < state.data[key + 1].thigh) thigh = true;
                  else thigh = false;

                  if (row.calf < state.data[key + 1].calf) calf = true;
                  else calf = false;

                  if (row.forearm < state.data[key + 1].forearm) forearm = true;
                  else forearm = false;

                  if (row.neck < state.data[key + 1].neck) neck = true;
                  else neck = false;
                }

                return (
                  <Card
                    className={classes.card}
                    onClick={() => dialog.handleDialog(true, 'EDIT', row)}>
                    <Grid container spacing={2}>
                      <Grid item xs={6} className={classes.heading}>
                        Dátum:
                      </Grid>
                      <Grid item xs={6}>
                        {formatDate(row.date)}
                      </Grid>
                      <Grid item xs={6}>
                        Pás
                      </Grid>
                      <Grid item xs={6}>
                        {row.belt && (
                          <div className={classes.column}>
                            {formatDecimal(row.belt)}
                            {key + 1 < length ? (
                              belt ? (
                                <ArrowDropDownIcon style={{ color: 'green' }} />
                              ) : (
                                <ArrowDropUpIcon style={{ color: 'red' }} />
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        Boky
                      </Grid>
                      <Grid item xs={6}>
                        {row.belly && (
                          <div className={classes.column}>
                            {formatDecimal(row.belly)}
                            {key + 1 < length ? (
                              belly ? (
                                <ArrowDropDownIcon style={{ color: 'green' }} />
                              ) : (
                                <ArrowDropUpIcon style={{ color: 'red' }} />
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        Zadok
                      </Grid>
                      <Grid item xs={6}>
                        {row.ass && (
                          <div className={classes.column}>
                            {formatDecimal(row.ass)}{' '}
                            {key + 1 < length ? (
                              ass ? (
                                <ArrowDropDownIcon style={{ color: 'green' }} />
                              ) : (
                                <ArrowDropUpIcon style={{ color: 'red' }} />
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        Hrudník
                      </Grid>
                      <Grid item xs={6}>
                        {row.chest && (
                          <div className={classes.column}>
                            {formatDecimal(row.chest)}{' '}
                            {key + 1 < length ? (
                              chest ? (
                                <ArrowDropDownIcon style={{ color: 'green' }} />
                              ) : (
                                <ArrowDropUpIcon style={{ color: 'red' }} />
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        Biceps
                      </Grid>
                      <Grid item xs={6}>
                        {row.arm && (
                          <div className={classes.column}>
                            {formatDecimal(row.arm)}{' '}
                            {key + 1 < length ? (
                              arm ? (
                                <ArrowDropDownIcon style={{ color: 'green' }} />
                              ) : (
                                <ArrowDropUpIcon style={{ color: 'red' }} />
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        Stehná
                      </Grid>
                      <Grid item xs={6}>
                        {row.thigh && (
                          <div className={classes.column}>
                            {formatDecimal(row.thigh)}{' '}
                            {key + 1 < length ? (
                              thigh ? (
                                <ArrowDropDownIcon style={{ color: 'green' }} />
                              ) : (
                                <ArrowDropUpIcon style={{ color: 'red' }} />
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        Lýtka
                      </Grid>
                      <Grid item xs={6}>
                        {row.calf && (
                          <div className={classes.column}>
                            {formatDecimal(row.calf)}{' '}
                            {key + 1 < length ? (
                              calf ? (
                                <ArrowDropDownIcon style={{ color: 'green' }} />
                              ) : (
                                <ArrowDropUpIcon style={{ color: 'red' }} />
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        Predlaktia
                      </Grid>
                      <Grid item xs={6}>
                        {row.forearm && (
                          <div className={classes.column}>
                            {formatDecimal(row.forearm)}{' '}
                            {key + 1 < length ? (
                              forearm ? (
                                <ArrowDropDownIcon style={{ color: 'green' }} />
                              ) : (
                                <ArrowDropUpIcon style={{ color: 'red' }} />
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </Grid>

                      <Grid item xs={6}>
                        Krk
                      </Grid>
                      <Grid item xs={6}>
                        {row.neck && (
                          <div className={classes.column}>
                            {formatDecimal(row.neck)}{' '}
                            {key + 1 < length ? (
                              neck ? (
                                <ArrowDropDownIcon style={{ color: 'green' }} />
                              ) : (
                                <ArrowDropUpIcon style={{ color: 'red' }} />
                              )
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}
            </Grid>
          </Container>
        </MobileWrapper>
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
      </div>
      <BodyAddDialog dialog={dialog.dialog} setDialog={dialog.handleDialog} fetchData={fetchData} />
      <BodyFilterDialog
        filter={filter.filter}
        setFilter={filter.setFilter}
        setData={handleSetState}
      />
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
  column: {
    display: 'flex',
    alignItems: 'center',
    width: 25
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

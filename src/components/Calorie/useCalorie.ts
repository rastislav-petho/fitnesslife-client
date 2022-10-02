import { useState, useEffect, useContext } from 'react';
import { useApi } from '../../api/useApi';
import { Context } from '../../context/context';
import { Calorie, DialogMode } from '../../helpers/types';

export type CalorieDialog = {
  open: boolean;
  mode: DialogMode;
  data?: Calorie;
};

export type CalorieFilter = {
  dateFrom: string;
  dateTo: string;
  open: boolean;
};

export type CaloriePageDataProps = {
  data: Calorie[];
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
  };
};

export const useCalorie = () => {
  const { appState, dispatch } = useContext(Context);
  const [dialog, setDialog] = useState<CalorieDialog>({
    open: false,
    mode: 'ADD'
  });
  const [state, setState] = useState<CaloriePageDataProps>({
    data: [],
    pagination: { total: 0, perPage: 0, currentPage: 1 }
  });
  const [filter, setFilter] = useState<CalorieFilter>({
    dateFrom: '',
    dateTo: '',
    open: false
  });

  const { calories } = useApi();

  useEffect(() => {
    fetchData(state.pagination.currentPage);
  }, []);

  const handleDialog = (value: boolean, mode: DialogMode, data?: Calorie) => {
    setDialog({ open: value, mode: mode, data });
  };

  const handleFilterOpen = (value: boolean) => {
    setFilter({ ...filter, open: value });
  };

  const handleSetState = (data: Calorie[]) => {
    setState({ ...state, data: data });
  };

  const fetchData = async (page?: number) => {
    dispatch({ type: 'SET_LOADING', loading: true });
    const response = await calories.list(page);
    setState({ data: response.data, pagination: response.pagination });
    dispatch({ type: 'SET_LOADING', loading: false });
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    fetchData(newPage + 1);
  };

  const columns = [
    { label: 'Dátum' },
    { label: 'Prijaté kalórie (kcal)' },
    { label: 'Splálené kalórie (kcal)' },
    { label: 'Deficit (kcal)' },
    { label: 'Hmotnosť (kg)' },
    { label: 'Poznámky' }
  ];

  return {
    handleDialog,
    handleChangePage,
    fetchData,
    handleFilterOpen,
    handleSetState,
    loading: appState.loading,
    dialog,
    setFilter,
    filter,
    state,
    columns
  };
};

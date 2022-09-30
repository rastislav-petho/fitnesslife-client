import { useState, useEffect } from 'react';
import { useApi } from '../../api/useApi';
import { Calorie } from '../../helpers/types';

export type CaloriesDialogMode = 'ADD' | 'EDIT';

export type CalorieDialog = {
  open: boolean;
  mode: CaloriesDialogMode;
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
  const [loading, setLoading] = useState<boolean>(true);
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

  const { caloriesApi } = useApi();

  useEffect(() => {
    fetchData(state.pagination.currentPage);
  }, []);

  const handleDialog = (value: boolean, mode: CaloriesDialogMode, data?: Calorie) => {
    setDialog({ open: value, mode: mode, data });
  };

  const handleFilterOpen = (value: boolean) => {
    setFilter({ ...filter, open: value });
  };

  const handleSetState = (data: Calorie[]) => {
    setState({ ...state, data: data });
  };

  const fetchData = async (page?: number) => {
    setLoading(true);
    const response = await caloriesApi.list(page);
    setState({ data: response.data, pagination: response.pagination });
    setLoading(false);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    fetchData(newPage + 1);
  };
  return {
    handleDialog,
    handleChangePage,
    fetchData,
    handleFilterOpen,
    handleSetState,
    loading,
    dialog,
    setFilter,
    filter,
    state
  };
};

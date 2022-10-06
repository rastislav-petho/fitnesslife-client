import { useContext, useEffect, useState } from 'react';
import { useApi } from '../../api/useApi';
import { Context } from '../../context/context';
import { DialogMode, TreningType } from '../../helpers/types';

export type TreningDialog = {
  open: boolean;
  mode: DialogMode;
  data?: TreningType;
};

export type TreningFilter = {
  dateFrom: string;
  dateTo: string;
  open: boolean;
};

export type TreningPageDataProps = {
  data: TreningType[];
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
  };
};

export const useTrening = () => {
  const { dispatch } = useContext(Context);
  const api = useApi();

  const [state, setState] = useState<TreningPageDataProps>({
    data: [],
    pagination: { total: 0, perPage: 0, currentPage: 1 }
  });
  const [dialog, setDialog] = useState<TreningDialog>({
    open: false,
    mode: 'ADD'
  });
  const [filter, setFilter] = useState<TreningFilter>({
    dateFrom: '',
    dateTo: '',
    open: false
  });

  useEffect(() => {
    fetchData(state?.pagination.currentPage);
  }, []);

  const fetchData = async (page?: number) => {
    dispatch({ type: 'SET_LOADING', loading: true });
    const response = await api.trening.list(page);
    setState({ data: response.data, pagination: response.pagination });
    dispatch({ type: 'SET_LOADING', loading: false });
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    fetchData(newPage + 1);
  };

  const handleSetState = (data: TreningType[]) => {
    setState({ ...state, data: data });
  };

  const handleDialog = (value: boolean, mode: DialogMode, data?: TreningType) => {
    setDialog({ open: value, mode: mode, data });
  };

  const handleFilterOpen = (value: boolean) => {
    setFilter({ ...filter, open: value });
  };

  const columns = [
    { label: 'Dátum' },
    { label: 'Trénované partie' },
    { label: 'Spálené kalórie' },
    { label: 'Trvanie tréningu' },
    { label: 'Poznámky' }
  ];

  return {
    columns,
    state,
    handleSetState,
    dialog,
    handleDialog,
    filter,
    handleFilterOpen,
    fetchData,
    handleChangePage
  };
};

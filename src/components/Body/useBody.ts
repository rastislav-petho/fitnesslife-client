import { useEffect, useState } from 'react';
import { useApi } from '../../api/useApi';
import { Body, DialogMode } from '../../helpers/types';

export type BodyDialog = {
  open: boolean;
  mode: DialogMode;
  data?: Body;
};

export type BodyPageDataProps = {
  data: Body[];
  pagination: {
    total: number;
    perPage: number;
    currentPage: number;
  };
};

export type BodyFilter = {
  dateFrom: string;
  dateTo: string;
  open: boolean;
};

export const useBody = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dialog, setDialog] = useState<BodyDialog>({
    open: false,
    mode: 'ADD'
  });
  const [state, setState] = useState<BodyPageDataProps>({
    data: [],
    pagination: { total: 0, perPage: 0, currentPage: 1 }
  });
  const [filter, setFilter] = useState<BodyFilter>({
    dateFrom: '',
    dateTo: '',
    open: false
  });

  const { bodyApi } = useApi();

  useEffect(() => {
    fetchData(state.pagination.currentPage);
  }, []);

  const handleDialog = (value: boolean, mode: DialogMode, data?: Body) => {
    setDialog({ open: value, mode: mode, data });
  };

  const handleFilterOpen = (value: boolean) => {
    setFilter({ ...filter, open: value });
  };

  const fetchData = async (page?: number) => {
    setLoading(true);
    const response = await bodyApi.list(page);
    setState({ data: response.data, pagination: response.pagination });
    setLoading(false);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    fetchData(newPage + 1);
  };

  const handleSetState = (data: Body[]) => {
    setState({ ...state, data: data });
  };

  return {
    handleSetState,
    handleChangePage,
    fetchData,
    handleFilterOpen,
    handleDialog,
    filter,
    setFilter,
    state,
    dialog,
    loading,
    setLoading
  };
};

import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
    EntityState,
    PayloadAction,
  } from '@reduxjs/toolkit';
  import type { RootState } from '../../app/store';
  import { fetchTickets } from '../../api/fakeApi';
  import type { Ticket, SortKey, SortDir } from '../../types';
  
  const ticketsAdapter = createEntityAdapter<Ticket, number>({
    selectId: (t: Ticket) => t.id,
    sortComparer: (a, b) => a.price - b.price,
  });
  
  export const loadTickets = createAsyncThunk('tickets/load', async () => {
    const data = await fetchTickets();
    return data as Ticket[];
  });
  
  interface FiltersState {
    companies: string[];
    stops: number[];
    sort: { key: SortKey; dir: SortDir };
    query: string;
  }
  
  interface TicketsState extends EntityState<Ticket, number> {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
    filters: FiltersState;
  }
  
  const initialState: TicketsState = {
    ...ticketsAdapter.getInitialState(),
    status: 'idle',
    filters: {
      companies: [],
      stops: [],
      sort: { key: 'price', dir: 'asc' },
      query: '',
    },
  };
  
  const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
      setCompanies(state, action: PayloadAction<string[]>) {
        state.filters.companies = action.payload;
      },
      setStops(state, action: PayloadAction<number[]>) {
        state.filters.stops = action.payload;
      },
      setSort(state, action: PayloadAction<{ key: SortKey; dir: SortDir }>) {
        state.filters.sort = action.payload;
      },
      setQuery(state, action: PayloadAction<string>) {
        state.filters.query = action.payload;
      },
      resetFilters(state) {
        state.filters = initialState.filters;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadTickets.pending, (state) => {
          state.status = 'loading';
          state.error = undefined;
        })
        .addCase(loadTickets.fulfilled, (state, action) => {
          state.status = 'succeeded';
          ticketsAdapter.setAll(state, action.payload);
        })
        .addCase(loadTickets.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Unknown error';
        });
    },
  });
  
  export const { setCompanies, setStops, setSort, setQuery, resetFilters } = ticketsSlice.actions;
  export default ticketsSlice.reducer;
  
  const selectors = ticketsAdapter.getSelectors<RootState>((s) => s.tickets);
  export const selectTicketsStatus = (s: RootState) => s.tickets.status;
  export const selectTicketsError = (s: RootState) => s.tickets.error;
  export const selectFilters = (s: RootState) => s.tickets.filters;
  export const selectAllTickets = selectors.selectAll;
  
  export const selectCompaniesAvailable = createSelector(selectAllTickets, (all) =>
    Array.from(new Set(all.map((t) => t.company))).sort()
  );
  export const selectStopsAvailable = () => [0, 1, 2, 3];
  
  export const selectFilteredSortedTickets = createSelector(
    [selectAllTickets, selectFilters],
    (all, f) => {
      let list = all;
  
      if (f.companies.length) list = list.filter((t) => f.companies.includes(t.company));
      if (f.stops.length) list = list.filter((t) => f.stops.includes(t.connectionAmount ?? 0));
  
      if (f.query.trim()) {
        const q = f.query.trim().toLowerCase();
        list = list.filter((t) => `${t.from} ${t.to}`.toLowerCase().includes(q));
      }
  
      const factor = f.sort.dir === 'asc' ? 1 : -1;
      list = [...list].sort((a, b) => {
        switch (f.sort.key) {
          case 'price':
            return (a.price - b.price) * factor;
          case 'duration':
            return (a.duration - b.duration) * factor;
          case 'stops': {
            const as = a.connectionAmount ?? 0;
            const bs = b.connectionAmount ?? 0;
            return (as - bs) * factor;
          }
          default:
            return 0;
        }
      });
  
      return list;
    }
  );
  
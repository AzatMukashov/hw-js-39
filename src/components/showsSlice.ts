import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Show {
  id: number;
  name: string;
  summary: string;
}

interface ShowState {
  searchResults: Show[];
  selectedShow: Show | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShowState = {
  searchResults: [],
  selectedShow: null,
  status: 'idle',
  error: null
}

export const fetchShows = createAsyncThunk<Show[], string>('shows/fetchShows', async (query: string) => {
  const response = await fetch(`http://api.tvmaze.com/search/shows?q=${query}`);
  const data: { show: Show }[] = await response.json();
  return data.map(item => item.show);
});
export const fetchShowDetails = createAsyncThunk<Show, number>('shows/fetchShowDetails', async (id: number) => {
  const response = await fetch(`http://api.tvmaze.com/shows/${id}`);
  const data: Show = await response.json();
  return data;
});

const showSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShows.fulfilled, (state, action: PayloadAction<Show[]>) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(fetchShowDetails.fulfilled, (state, action: PayloadAction<Show>) => {
        state.selectedShow = action.payload;
      });
  }
});

export default showSlice.reducer;
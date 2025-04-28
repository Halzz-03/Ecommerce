import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { HomeCategory, HomeData } from "../../../types/homeDataTypes";
import { api } from "../../../Config/Api";


interface HomePageState {
  homePageData: HomeData | null;
  loading: boolean;
  error: string | null;
}

const initialState: HomePageState = {
  homePageData: null,
  loading: false,
  error: null
};

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
  'home/createHomeCategories',
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post('/home/categories', homeCategories);
      console.log("home categories ",response.data)
      return response.data;
    } catch (error: any) {
      // Handle the error and return it to be used in rejected action
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create home categories';
      console.log("errr ",errorMessage,error)
      return rejectWithValue(errorMessage);
    }
  }
);
// Async thunk to fetch home page data
export const fetchHomePageData = createAsyncThunk(
  'homePage/fetchHomePageData',
  async (_, { rejectWithValue }) => {
    try {
      // First try to get the data from the GET endpoint
      const response = await api.get('/home-page');
      console.log("Raw response from GET /home-page:", response);
      
      // If we got a 200 status but empty data, try an alternative endpoint
      if (response.status === 200 && (!response.data || response.data === '')) {
        console.log("Received empty data with 200 status, trying alternative endpoint");
        
        // Try the endpoint that you know is working (from your logs)
        const altResponse = await api.get('/home/categories');
        console.log("Alternative response:", altResponse);
        return altResponse.data;
      }
      
      return response.data;
    } catch (error: any) {
      console.error("Error in fetchHomePageData:", error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch home page data';
      return rejectWithValue(errorMessage);
    }
  }
);


const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomePageData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomePageData.fulfilled, (state, action: PayloadAction<HomeData>) => {
        state.loading = false;
        state.homePageData = action.payload;
        state.error = null;
      })
      .addCase(fetchHomePageData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default homePageSlice.reducer;



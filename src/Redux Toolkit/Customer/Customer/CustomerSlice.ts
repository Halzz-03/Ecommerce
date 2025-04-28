// src/Redux Toolkit/homeSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { HomeCategory, HomeData } from '../../../types/homeDataTypes';
import { string } from 'yup';

interface UpdateCustomerProfilePayload {
  fullName: string;
  email: string;
  mobile: string;
}

interface HomeState {
  homePageData: HomeData | null;
  homeCategories: HomeCategory[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  homePageData: null,
  homeCategories: [],
  loading: false,
  error: null,
};
export const updateCustomerProfile = createAsyncThunk<
  string,
  UpdateCustomerProfilePayload
>(
  'home/updateCustomerProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      console.log("Updating profile with data:", profileData);
      const baseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5454";

      const response = await axios.patch(
        `${baseUrl}/api/users/update-profile`,
        profileData, // send as JSON body
        { 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      console.log("Response:", response.data);
      return response.data;
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);



const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // … your other thunks here …

    builder.addCase(updateCustomerProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateCustomerProfile.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        // optionally: state.userMessage = action.payload;
      }
    );
    builder.addCase(updateCustomerProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default homeSlice.reducer;

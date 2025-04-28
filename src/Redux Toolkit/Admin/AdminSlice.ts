// src/Redux Toolkit/homeCategorySlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeCategory } from '../../types/homeDataTypes';
import { api } from '../../Config/Api';

// API URLs
const API_URL = '/admin';

// Thunk: Update a Home Category
export const updateHomeCategory = createAsyncThunk<HomeCategory, { id: number; data: HomeCategory }>(
  'homeCategory/updateHomeCategory',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/home-category/${id}`, data);
      console.log('Category updated', response); // Log response
      return response.data;
    } catch (error: any) {
      console.log('Error updating category', error); // Log error
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue('An error occurred while updating the category.');
      }
    }
  }
);

// Thunk: Fetch all Home Categories
export const fetchHomeCategories = createAsyncThunk<HomeCategory[]>(
  'homeCategory/fetchHomeCategories',
  async (_, { rejectWithValue }) => {
    try {
      const url = `${API_URL}/home-category`;
      console.log('Fetching categories from URL:', url);  // Log URL for debugging
      const response = await api.get(url);
      console.log('Fetched categories', response.data); // Log fetched categories
      return response.data;
    } catch (error: any) {
      console.log('Error fetching categories', error.response); // Log fetch error
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
);


export const fetchAdminProfile = createAsyncThunk(
  'admin/fetchAdminProfile',
  async (_, { rejectWithValue }) => {
    console.log('fetchAdminProfile thunk called'); // Log for debugging
    try {
      const response = await api.get('/api/users/profile');
      console.log('Fetched admin profile', response.data); // Log fetched admin profile
      return response.data;
    } catch (error: any) {
      console.log('Error fetching admin profile', error.response); // Log error
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch admin profile');
    }
  }
);

// Update Admin Profile Thunk
export const updateAdminProfile = createAsyncThunk(
  'admin/updateAdminProfile',
  async (adminData: { fullName: string; email: string; mobile: string }, { rejectWithValue }) => {
    try {
      console.log('Updating admin profile with data:', adminData); // Log before update
      console.log('JWT token exists:', !!localStorage.getItem('jwt')); // Check JWT token
      
      // Using the admin-specific endpoint
      const response = await api.patch('/api/users/admin/update-profile', adminData);
      console.log('Admin profile updated successfully:', response.data); // Log successful update
      return response.data;
    } catch (error: any) {
      console.error('Error updating admin profile:', error.response?.data || error.message); // Log error
      console.log('Full error object:', error); // Log complete error object
      
      if (error.response && error.response.data) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message || 'Unknown error',
          details: error.response.data
        });
      } else {
        return rejectWithValue('An error occurred while updating the admin profile.');
      }
    }
  }
);

// Types
interface AdminProfile {
  fullName: string;
  email: string;
  mobile: string;
}

interface HomeCategoryState {
  categories: HomeCategory[];
  loading: boolean;
  error: string | null;
  categoryUpdated: boolean;

  admin: AdminProfile | null;
  adminLoading: boolean;
  adminError: string | null;
  adminUpdated: boolean;
}

// Initial State
const initialState: HomeCategoryState = {
  categories: [],
  loading: false,
  error: null,
  categoryUpdated: false,

  admin: null,
  adminLoading: false,
  adminError: null,
  adminUpdated: false,
};

// Create the slice
const homeCategorySlice = createSlice({
  name: 'homeCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Home Category: Update
    builder.addCase(updateHomeCategory.pending, (state) => {
      console.log('Update Home Category: Pending');
      state.loading = true;
      state.error = null;
      state.categoryUpdated = false;
    });
    builder.addCase(updateHomeCategory.fulfilled, (state, action) => {
      console.log('Update Home Category: Fulfilled', action.payload);
      state.loading = false;
      state.categoryUpdated = true;
      const index = state.categories.findIndex((category) => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      } else {
        state.categories.push(action.payload);
      }
    });
    builder.addCase(updateHomeCategory.rejected, (state, action) => {
      console.log('Update Home Category: Rejected', action.payload);
      state.loading = false;
      state.error = action.payload as string;
    });

    // Home Category: Fetch
    builder.addCase(fetchHomeCategories.pending, (state) => {
      console.log('Fetch Home Categories: Pending');
      state.loading = true;
      state.error = null;
      state.categoryUpdated = false;
    });
    builder.addCase(fetchHomeCategories.fulfilled, (state, action) => {
      console.log('Fetch Home Categories: Fulfilled', action.payload);
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchHomeCategories.rejected, (state, action) => {
      console.log('Fetch Home Categories: Rejected', action.payload);
      state.loading = false;
      state.error = action.payload as string;
    });

    // Admin Profile: Fetch
    builder.addCase(fetchAdminProfile.pending, (state) => {
      console.log('Fetch Admin Profile: Pending');
      state.adminLoading = true;
      state.adminError = null;
    });
    builder.addCase(fetchAdminProfile.fulfilled, (state, action: PayloadAction<AdminProfile>) => {
      console.log('Fetch Admin Profile: Fulfilled', action.payload);
      state.adminLoading = false;
      state.admin = action.payload;
    });
    builder.addCase(fetchAdminProfile.rejected, (state, action) => {
      console.log('Fetch Admin Profile: Rejected', action.payload);
      state.adminLoading = false;
      state.adminError = action.payload as string;
    });

    // Admin Profile: Update
    builder.addCase(updateAdminProfile.pending, (state) => {
      console.log('Update Admin Profile: Pending');
      state.adminLoading = true;
      state.adminError = null;
      state.adminUpdated = false;
    });
    builder.addCase(updateAdminProfile.fulfilled, (state, action: PayloadAction<AdminProfile>) => {
      console.log('Update Admin Profile: Fulfilled', action.payload);
      state.adminLoading = false;
      state.admin = action.payload;
      state.adminUpdated = true;
    });
    builder.addCase(updateAdminProfile.rejected, (state, action) => {
      console.log('Update Admin Profile: Rejected', action.payload);
      state.adminLoading = false;
      state.adminError = action.payload as string;
    });
  },
});

// Export the reducer
export default homeCategorySlice.reducer;

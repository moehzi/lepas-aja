import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginWithPassword, loginWithGoogle, logout, createUser, testing } from '../services/authService';

export const loginWithPassword = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const response = await loginWithPassword(email, password);
    return response.data;
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle', async () => {
    const response = await loginWithGoogle
  }
)

export const createUserWithEmailAndPassword = createAsyncThunk(
  'createUser', async (email, password) => {
    const resoponse = await createUserWithEmailAndPassword(email, password);
    return reponse.data;
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: idle,
    value: null,
  },
  reducers: {
    login: (email, password) => {
      state.value,
    },
  },
});

export const { login, logout, createUser } = authSlice.actions;

export default authSlice.reducer;

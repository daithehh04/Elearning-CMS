import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiGetUserFromToken, apiLogin } from '../../api/authApi';

const initialState = {
  userInfo: null,
  loading: false,
  loadingCheckLogin: true,
};

export const requestLogin = createAsyncThunk('auth/login', async (props) => {
  const res = await apiLogin(props);
  return res.data;
});

export const requestGetUserFromToken = createAsyncThunk(
  'user/requestGetUserFromToken',
  async (props) => {
    const res = await apiGetUserFromToken(props.token);
    return res.data;
  }
);

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    /**
     * login
     */
    builder.addCase(requestLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(requestLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload.userLogin;
    });
    // requestGetUserFromToken
    builder.addCase(requestGetUserFromToken.pending, (state) => {
      state.loadingCheckLogin = true;
    });
    builder.addCase(requestGetUserFromToken.fulfilled, (state, action) => {
      state.userInfo = action.payload.userInfo;
      state.loadingCheckLogin = false;
    });
    builder.addCase(requestGetUserFromToken.rejected, (state) => {
      state.loadingCheckLogin = false;
    });
  },
});

export const authState = (state) => state.authState;

export const { loadUserInfo } = authSlice.actions;
export default authSlice.reducer;

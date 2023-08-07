import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
const initialState = {
  email: "",
  role: "",
  isLoading: true,
  isError: false,
  error: "",
};

const createUser = createAsyncThunk(
  "auth/createUser",
  async ({ email, password }, thunkAPI) => {
    // const auth = getAuth();
    const data = await createUserWithEmailAndPassword(auth, email, password);
    return data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.error = "";
        state.email = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.email = "";
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

// export const { } = authSlice.actions;

export default authSlice.reducer;

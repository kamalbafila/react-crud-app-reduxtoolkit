import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import IUser from "../DataModel/IUser";
import { CreateUsers, UpdateUsers, GetUsers, DeleteUsers } from "./UserActions";

interface UsersState {
  users: IUser[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (): Promise<IUser[]> => {
    const respone = await GetUsers();
    return respone;
  }
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (user: IUser) => {
    const respone = await CreateUsers(user);
    return respone;
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (user: IUser) => {
    const respone = await UpdateUsers(user, user.id);
    return respone;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number) => {
    const respone = await DeleteUsers(id);
    return respone;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<IUser[]>) => {
          state.users = action.payload;
          state.status = "succeeded";
        }
      )
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action: PayloadAction<IUser>) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;

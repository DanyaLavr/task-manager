import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, app } from "../../auth/firebaseConfig";

const ADMIN_EMAILS = ["lavrovskiy.danya@gmail.com", "admin@example.com"];

const getUserRole = email => {
  return ADMIN_EMAILS.includes(email) ? "admin" : "user";
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const registerUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(registerUser.user, {
        displayName: name,
      });

      const token = await registerUser.user.getIdToken();
      const role = getUserRole(registerUser.user.email);

      return {
        user: {
          name: registerUser.user.displayName,
          email: registerUser.user.email,
          uid: registerUser.user.uid,
          role,
        },
        token,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginUser = await signInWithEmailAndPassword(auth, email, password);
      const token = await loginUser.user.getIdToken();
      const role = getUserRole(loginUser.user.email);

      return {
        user: {
          name: loginUser.user.displayName,
          email: loginUser.user.email,
          uid: loginUser.user.uid,
          role,
        },
        token,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

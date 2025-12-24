// файл для створення стор в Redux

import { configureStore, combineReducers } from "@reduxjs/toolkit"; // для створення сховища
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { taskReducer } from "./tasks/tasksSlice";
import { filterReducer } from "./filters/filtersSlice";
import { commentsReducer } from "./comments/commentsSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { authReducer } from "./auth/authSlice";
import { userReducer } from "./user/usersSlice";
import { notificationReducer } from "./notification/notificationSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  tasks: taskReducer,
  filters: filterReducer,
  comments: commentsReducer,
  auth: authReducer,
  user: userReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

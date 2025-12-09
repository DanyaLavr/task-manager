import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { taskReducer } from "./taskSlice";
import { filtersReducer } from "./filtersSlice";
import { combineReducers } from "redux";
import { commentsReducer } from "./commentsSlice";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  tasks: taskReducer,
  comments: commentsReducer,
  filter: filtersReducer,
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

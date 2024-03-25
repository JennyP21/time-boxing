import { configureStore } from "@reduxjs/toolkit";
import { bucketApi } from "./features/bucketApi";

export const store = configureStore({
  reducer: {
    [bucketApi.reducerPath]: bucketApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bucketApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

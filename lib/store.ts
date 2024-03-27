import { configureStore } from "@reduxjs/toolkit";
import { bucketApi } from "./features/bucketApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { taskApi } from "./features/taskApi";

export const store = configureStore({
  reducer: {
    [bucketApi.reducerPath]: bucketApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bucketApi.middleware)
      .concat(taskApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

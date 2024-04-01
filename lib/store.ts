import { configureStore } from "@reduxjs/toolkit";
import { bucketApi } from "./features/bucketApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { taskApi } from "./features/taskApi";
import { stepsApi } from "./features/stepsApi";

export const store = configureStore({
  reducer: {
    [bucketApi.reducerPath]: bucketApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [stepsApi.reducerPath]: stepsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bucketApi.middleware)
      .concat(taskApi.middleware)
      .concat(stepsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

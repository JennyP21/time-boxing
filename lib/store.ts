import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bucketApi } from "./features/bucketApi";
import { labelApi } from "./features/labelApi";
import { projectsApi } from "./features/projectApi";
import { stepsApi } from "./features/stepsApi";
import { taskApi } from "./features/taskApi";

export const store = configureStore({
  reducer: {
    [bucketApi.reducerPath]: bucketApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [labelApi.reducerPath]: labelApi.reducer,
    [stepsApi.reducerPath]: stepsApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bucketApi.middleware)
      .concat(taskApi.middleware)
      .concat(stepsApi.middleware)
      .concat(labelApi.middleware)
      .concat(projectsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { bucketApi } from "./features/bucketApi";
import { labelApi } from "./features/labelApi";
import { projectsApi } from "./features/projectApi";
import { stepsApi } from "./features/stepsApi";
import { taskApi } from "./features/taskApi";
import { teamApi } from "./features/teamApi";
import { userApi } from "./features/userApi";

export const store = configureStore({
  reducer: {
    [bucketApi.reducerPath]: bucketApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [labelApi.reducerPath]: labelApi.reducer,
    [stepsApi.reducerPath]: stepsApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(bucketApi.middleware)
      .concat(taskApi.middleware)
      .concat(stepsApi.middleware)
      .concat(labelApi.middleware)
      .concat(projectsApi.middleware)
      .concat(teamApi.middleware)
      .concat(userApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

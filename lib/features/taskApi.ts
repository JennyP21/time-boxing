import { TaskI, TaskWithUserI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  tagTypes: ["tasks"],
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getTasksByBucket: builder.query<
      TaskWithUserI[],
      string
    >({
      query: (id: string) => `/bucket/${id}/tasks`,
      providesTags: ["tasks"],
    }),
    addTask: builder.mutation<TaskI, TaskI>({
      query: (task: TaskI) => ({
        url: `/task`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useGetTasksByBucketQuery,
  useAddTaskMutation,
} = taskApi;

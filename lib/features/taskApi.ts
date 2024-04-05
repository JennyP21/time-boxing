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
    getTasks: builder.query<TaskWithUserI[], void>({
      query: () => `/task`,
      providesTags: ["tasks"],
    }),
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
    updateTask: builder.mutation<TaskI, TaskI>({
      query: (data: TaskI) => ({
        url: `/task/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),
    deleteTask: builder.mutation<null, string>({
      query: (id: string) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTasksByBucketQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;

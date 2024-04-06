import { TaskI, TaskWithUserI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  tagTypes: ["addTask", "deleteTask", "updateTask"],
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getTasks: builder.query<TaskWithUserI[], void>({
      query: () => `/task`,
      providesTags: ["addTask", "deleteTask", "updateTask"],
    }),
    getTasksByBucket: builder.query<
      TaskWithUserI[],
      string
    >({
      query: (id: string) => `/bucket/${id}/tasks`,
      providesTags: ["addTask", "deleteTask", "updateTask"],
    }),
    getTasksByLabel: builder.query<TaskI[], string>({
      query: (id: string) => `label/${id}/task`,
      providesTags: ["addTask", "deleteTask", "updateTask"],
    }),
    addTask: builder.mutation<TaskI, TaskI>({
      query: (task: TaskI) => ({
        url: `/task`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["addTask"],
    }),
    updateTask: builder.mutation<TaskI, TaskI>({
      query: (data: TaskI) => ({
        url: `/task/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateTask"],
    }),
    deleteTask: builder.mutation<null, string>({
      query: (id: string) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteTask"],
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

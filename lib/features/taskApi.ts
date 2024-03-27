import { TaskI } from "@/interfaces";
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
    getTasksByBucket: builder.query<TaskI[], string>({
      query: (id: string) => `/bucket/${id}/tasks`,
      providesTags: ["tasks"],
    }),
  }),
});

export const { useGetTasksByBucketQuery } = taskApi;

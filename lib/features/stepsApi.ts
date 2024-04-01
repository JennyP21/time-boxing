import { StepsI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const stepsApi = createApi({
  tagTypes: ["steps"],
  reducerPath: "stepsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getStepsByTaskId: builder.query<StepsI[], string>({
      query: (id: string) => `/task/${id}/step`,
      providesTags: ["steps"],
    }),
    // addTask: builder.mutation<TaskI, TaskI>({
    //   query: (task: TaskI) => ({
    //     url: `/task`,
    //     method: "POST",
    //     body: task,
    //   }),
    //   invalidatesTags: ["tasks"],
    // }),
    // updateTask: builder.mutation<TaskI, TaskI>({
    //   query: (data: TaskI) => ({
    //     url: `/task/${data.id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["tasks"],
    // }),
    // deleteTask: builder.mutation<null, string>({
    //   query: (id: string) => ({
    //     url: `/task/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["tasks"],
    // }),
  }),
});

export const { useGetStepsByTaskIdQuery } = stepsApi;

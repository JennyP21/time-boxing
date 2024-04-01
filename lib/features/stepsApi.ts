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
    addStep: builder.mutation<StepsI, StepsI>({
      query: (task: StepsI) => ({
        url: `/step`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["steps"],
    }),
    updateStep: builder.mutation<StepsI, StepsI>({
      query: (data: StepsI) => ({
        url: `/step/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["steps"],
    }),
    deleteStep: builder.mutation<null, string>({
      query: (id: string) => ({
        url: `/step/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["steps"],
    }),
  }),
});

export const {
  useGetStepsByTaskIdQuery,
  useAddStepMutation,
  useDeleteStepMutation,
  useUpdateStepMutation,
} = stepsApi;

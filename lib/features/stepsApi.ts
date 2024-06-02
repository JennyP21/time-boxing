import { StepsI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const stepsApi = createApi({
  tagTypes: ["addStep", "updateStep", "deleteStep"],
  reducerPath: "stepsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    getStepsByTaskId: builder.query<StepsI[], string>({
      query: (id: string) => `/task/${id}/step`,
      providesTags: ["addStep", "updateStep", "deleteStep"],
    }),
    addStep: builder.mutation<StepsI, StepsI>({
      query: (task: StepsI) => ({
        url: `/step`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["addStep"],
    }),
    updateStep: builder.mutation<StepsI, StepsI>({
      query: (data: StepsI) => ({
        url: `/step/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateStep"],
    }),
    deleteStep: builder.mutation<null, string>({
      query: (id: string) => ({
        url: `/step/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteStep"],
    }),
  }),
});

export const {
  useGetStepsByTaskIdQuery,
  useAddStepMutation,
  useDeleteStepMutation,
  useUpdateStepMutation,
} = stepsApi;

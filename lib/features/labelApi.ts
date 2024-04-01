import { LabelI, Task_LabelI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const labelApi = createApi({
  tagTypes: ["addLabel", "removeLabel", "updateLabel"],
  reducerPath: "labelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getLabels: builder.query<LabelI[], void>({
      query: () => "label/",
      providesTags: [
        "addLabel",
        "removeLabel",
        "updateLabel",
      ],
    }),
    getLabelsByTask: builder.query<LabelI[], string>({
      query: (id: string) => `task/${id}/label`,
      providesTags: [
        "addLabel",
        "removeLabel",
        "updateLabel",
      ],
    }),
    addLabel: builder.mutation<LabelI, LabelI>({
      query: (data: LabelI) => ({
        url: `label`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addLabel"],
    }),
    updateLabel: builder.mutation<LabelI, LabelI>({
      query: (data: LabelI) => ({
        url: `label/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateLabel"],
    }),
    deleteLabel: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `label/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["updateLabel"],
    }),
  }),
});

export const {
  useGetLabelsQuery,
  useGetLabelsByTaskQuery,
  useAddLabelMutation,
  useUpdateLabelMutation,
  useDeleteLabelMutation,
} = labelApi;

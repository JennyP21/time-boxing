import { LabelI } from "@/interfaces";
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
  }),
});

export const {
  useGetLabelsQuery,
  useGetLabelsByTaskQuery,
} = labelApi;

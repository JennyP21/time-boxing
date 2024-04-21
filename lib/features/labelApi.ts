import { LabelI, Task_LabelI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const labelApi = createApi({
  tagTypes: [
    "addLabel",
    "removeLabel",
    "updateLabel",
    "assignLabel",
    "unassignLabel",
  ],
  reducerPath: "labelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getLabelsByProjectId: builder.query<LabelI[], string>({
      query: (project_id: string) =>
        `project/${project_id}/label`,
      providesTags: [
        "addLabel",
        "removeLabel",
        "updateLabel",
        "assignLabel",
        "unassignLabel",
      ],
    }),
    getLabelsByTask: builder.query<LabelI[], string>({
      query: (id: string) => `task/${id}/label`,
      providesTags: [
        "addLabel",
        "removeLabel",
        "updateLabel",
        "assignLabel",
        "unassignLabel",
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
    assignLabel: builder.mutation<Task_LabelI, Task_LabelI>(
      {
        query: (data: Task_LabelI) => ({
          url: "/task_label/assign",
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["assignLabel"],
      }
    ),
    unassignLabel: builder.mutation<void, Task_LabelI>({
      query: (data: Task_LabelI) => ({
        url: `/task_label/unassign`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["unassignLabel"],
    }),
  }),
});

export const {
  useGetLabelsByProjectIdQuery,
  useGetLabelsByTaskQuery,
  useAddLabelMutation,
  useUpdateLabelMutation,
  useDeleteLabelMutation,
  useAssignLabelMutation,
  useUnassignLabelMutation,
} = labelApi;

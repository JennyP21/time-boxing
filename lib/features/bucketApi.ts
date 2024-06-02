import { API_URL } from "@/constants";
import { BucketI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const bucketApi = createApi({
  tagTypes: ["addBucket", "updateBucket", "deleteBucket"],
  reducerPath: "bucketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getBucketsByProjectId: builder.query<BucketI[], string>(
      {
        query: (project_id: string) =>
          `project/${project_id}/bucket`,
        providesTags: [
          "addBucket",
          "updateBucket",
          "deleteBucket",
        ],
      }
    ),
    addBucket: builder.mutation<BucketI, BucketI>({
      query: (data: BucketI) => ({
        url: "bucket/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addBucket"],
    }),
    updateBucket: builder.mutation<BucketI, BucketI>({
      query: (data: BucketI) => ({
        url: `bucket/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateBucket"],
    }),
    deleteBucket: builder.mutation<void, string>({
      query: (id) => ({
        url: `bucket/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteBucket"],
    }),
  }),
});

export const {
  useGetBucketsByProjectIdQuery,
  useAddBucketMutation,
  useUpdateBucketMutation,
  useDeleteBucketMutation,
} = bucketApi;

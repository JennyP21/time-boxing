import { BucketI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const bucketApi = createApi({
  tagTypes: ["bucket"],
  reducerPath: "bucketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getBuckets: builder.query<BucketI[], void>({
      query: () => "bucket/",
      providesTags: ["bucket"],
    }),
    addBucket: builder.mutation<BucketI, BucketI>({
      query: (data: { name: string }) => ({
        url: "bucket/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bucket"],
    }),
    updateBucket: builder.mutation<BucketI, BucketI>({
      query: (data: { name: string; id: string }) => ({
        url: `bucket/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["bucket"],
    }),
    deleteBucket: builder.mutation<void, string>({
      query: (id) => ({
        url: `bucket/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bucket"],
    }),
  }),
});

export const {
  useGetBucketsQuery,
  useAddBucketMutation,
  useUpdateBucketMutation,
  useDeleteBucketMutation,
} = bucketApi;

import { Bucket } from "@/interfaces";
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
    getBuckets: builder.query<Bucket[], void>({
      query: () => "bucket/",
      providesTags: ["bucket"],
    }),
    addBucket: builder.mutation<Bucket, Bucket>({
      query: (data: { name: string }) => ({
        url: "bucket/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["bucket"],
    }),
    updateBucket: builder.mutation<Bucket, Bucket>({
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

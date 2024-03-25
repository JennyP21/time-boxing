import { Bucket } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const bucketApi = createApi({
  reducerPath: "bucketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getBuckets: builder.query<Bucket[], void>({
      query: () => "bucket/",
    }),
    addBucket: builder.mutation<Bucket, Bucket>({
      query: (data: { name: string }) => ({
        url: "bucket/",
        method: "POST",
        body: data,
      }),
    }),
    deleteBucket: builder.mutation<void, string>({
      query: (id) => ({
        url: `bucket/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetBucketsQuery, useAddBucketMutation } =
  bucketApi;

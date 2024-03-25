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
  }),
});

export const { useGetBucketsQuery } = bucketApi;

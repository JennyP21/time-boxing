import { UserI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getUserById: builder.query<UserI, string>({
      query: (id: string) => `/user/${id}`,
    }),
    addUser: builder.mutation<UserI, FormData>({
      query: (data: FormData) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useAddUserMutation } =
  userApi;

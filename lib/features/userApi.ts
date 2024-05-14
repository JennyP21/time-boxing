import { AccountI, UserI } from "@/interfaces";
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
    addUser: builder.mutation<AccountI, AccountI>({
      query: (data: AccountI) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserByIdQuery, useAddUserMutation } =
  userApi;

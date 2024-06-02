import { UserI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  tagTypes: ["updateUser"],
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    getUserById: builder.query<UserI, string>({
      query: (email: string) => ({
        url: `/user`,
        method: "POST",
        body: { email },
      }),
      providesTags: ["updateUser"],
    }),
    addUser: builder.mutation<UserI, FormData>({
      query: (data: FormData) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    updateUser: builder.mutation<UserI, FormData>({
      query: (data: FormData) => ({
        url: `/user/${data.get("id")}`,
        method: "PATCH",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["updateUser"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
} = userApi;

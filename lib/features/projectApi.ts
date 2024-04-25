import { ProjectI } from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
  tagTypes: [
    "addProject",
    "updateProject",
    "deleteProject",
  ],
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getProject: builder.query<ProjectI, string>({
      query: (id: string) => `/project/${id}`,
      providesTags: [
        "addProject",
        "updateProject",
        "deleteProject",
      ],
    }),
    getProjectsByTeamId: builder.query<ProjectI[], string>({
      query: (team_id: string) =>
        `/project/team/${team_id}`,
      providesTags: [
        "addProject",
        "updateProject",
        "deleteProject",
      ],
    }),
    getProjectsByUserId: builder.query<ProjectI[], string>({
      query: (user_id: string) =>
        `/project/user/${user_id}`,
      providesTags: [
        "addProject",
        "updateProject",
        "deleteProject",
      ],
    }),
    addProject: builder.mutation<ProjectI, ProjectI>({
      query: (project: ProjectI) => ({
        url: `/project`,
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["addProject"],
    }),
    updateProject: builder.mutation<ProjectI, ProjectI>({
      query: (project: ProjectI) => ({
        url: `/project/${project.id}`,
        method: "PATCH",
        body: project,
      }),
      invalidatesTags: ["updateProject"],
    }),
    deleteProject: builder.mutation<null, string>({
      query: (id: string) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteProject"],
    }),
  }),
});

export const {
  useGetProjectsByTeamIdQuery,
  useGetProjectsByUserIdQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;

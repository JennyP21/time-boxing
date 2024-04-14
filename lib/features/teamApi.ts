import {
  PropsWithTeam,
  Team_UserIdI,
  TeamI,
  TeamMemberI,
  TeamWithUserI,
} from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const teamApi = createApi({
  tagTypes: ["addTeam", "updateTeam", "deleteTeam"],
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getTeamsByUserId: builder.query<
      PropsWithTeam[],
      string
    >({
      query: (user_id) => `team/user/${user_id}`,
      providesTags: ["addTeam", "updateTeam", "deleteTeam"],
    }),
    addTeam: builder.mutation<TeamI, TeamWithUserI>({
      query: ({ team, user_id }) => ({
        url: `team/user/${user_id}`,
        method: "POST",
        body: team,
      }),
      invalidatesTags: ["addTeam"],
    }),
    updateTeam: builder.mutation<TeamI, TeamI>({
      query: (team) => ({
        url: `team/${team.id}`,
        method: "PATCH",
        body: team,
      }),
      invalidatesTags: ["updateTeam"],
    }),
    deleteTeam: builder.mutation<void, string>({
      query: (team_id) => ({
        url: `team/${team_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteTeam"],
    }),
    addMember: builder.mutation<void, TeamMemberI>({
      query: (teamMember) => ({
        url: `team/member`,
        method: "POST",
        body: teamMember,
      }),
      invalidatesTags: ["updateTeam"],
    }),
    removeMember: builder.mutation<void, Team_UserIdI>({
      query: ({ team_id, user_id }) => ({
        url: `team/${team_id}/user/${user_id}`,
        method: "POST",
      }),
      invalidatesTags: ["updateTeam"],
    }),
    updateTeamMemberRole: builder.mutation<
      TeamMemberI,
      TeamMemberI
    >({
      query: (teamMember) => ({
        url: `team/member`,
        method: "PATCH",
        body: teamMember,
      }),
    }),
  }),
});

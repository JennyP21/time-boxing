import {
  PropsWithTeamI,
  PropsWithTeamMembersI,
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
  tagTypes: [
    "addTeam",
    "updateTeam",
    "deleteTeam",
    "addMember",
    "updateMember",
  ],
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getTeamsByUserId: builder.query<
      PropsWithTeamI[],
      string
    >({
      query: (user_id) => `team/user/${user_id}`,
      providesTags: ["addTeam", "updateTeam", "deleteTeam"],
    }),
    getTeamById: builder.query<TeamI, string>({
      query: (team_id) => `team/${team_id}`,
      providesTags: [
        "addTeam",
        "updateTeam",
        "deleteTeam",
        "addMember",
        "updateMember",
      ],
    }),
    getTeamMembers: builder.query<
      PropsWithTeamMembersI[],
      string
    >({
      query: (team_id) => `team/${team_id}/member`,
      providesTags: ["addMember", "updateMember"],
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
        url: `team/${teamMember.team_id}/member`,
        method: "POST",
        body: teamMember,
      }),
      invalidatesTags: ["addMember"],
    }),
    removeMember: builder.mutation<void, Team_UserIdI>({
      query: ({ team_id, user_id }) => ({
        url: `team/${team_id}/member/${user_id}`,
        method: "POST",
      }),
      invalidatesTags: ["updateMember"],
    }),
    updateTeamMemberRole: builder.mutation<
      TeamMemberI,
      TeamMemberI
    >({
      query: (teamMember) => ({
        url: `team/${teamMember.team_id}/member`,
        method: "PATCH",
        body: teamMember,
      }),
    }),
  }),
});

export const {
  useGetTeamMembersQuery,
  useGetTeamByIdQuery,
  useGetTeamsByUserIdQuery,
  useAddMemberMutation,
  useAddTeamMutation,
  useUpdateTeamMutation,
  useUpdateTeamMemberRoleMutation,
  useDeleteTeamMutation,
  useRemoveMemberMutation,
} = teamApi;

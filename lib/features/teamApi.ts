import { transformTeamMembersResponse } from "@/components/utils";
import { API_URL } from "@/constants";
import {
  AddMemberI,
  RemoveMemberI,
  TeamI,
  TeamMemberI,
  TransformedTeamMemberResponseI,
} from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

interface AddTeamI {
  team: TeamI;
  user_id: string;
}

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
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getTeamsByUserId: builder.query<TeamI[], string>({
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
      TransformedTeamMemberResponseI,
      string
    >({
      query: (team_id) => ({
        url: `team/${team_id}/member`,
      }),
      transformResponse: (res) =>
        transformTeamMembersResponse(res),
      providesTags: ["addMember", "updateMember"],
    }),
    addTeam: builder.mutation<TeamI, AddTeamI>({
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
    addMember: builder.mutation<void, AddMemberI>({
      query: (newMember) => ({
        url: `team/${newMember.team_id}/member`,
        method: "POST",
        body: newMember,
      }),
      invalidatesTags: ["addMember"],
    }),
    removeMember: builder.mutation<void, RemoveMemberI>({
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
      invalidatesTags: ["updateMember"],
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

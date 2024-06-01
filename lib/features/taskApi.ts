import {
  Task_AssigneeI,
  TaskContainerI,
  TaskI,
  UserI,
} from "@/interfaces";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

interface TaskByLabelI {
  label_id: string;
  project_id: string;
}

export const taskApi = createApi({
  tagTypes: [
    "addTask",
    "deleteTask",
    "updateTask",
    "assignUser",
    "unAssignUser",
  ],
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
  }),
  endpoints: (builder) => ({
    getTasksByProjectId: builder.query<TaskI[], string>({
      query: (project_id: string) =>
        `/project/${project_id}/task`,
      providesTags: ["addTask", "deleteTask", "updateTask"],
    }),
    getTasksByProjectIds: builder.query<TaskI[], string[]>({
      query: (project_ids: string[]) => ({
        url: `/task/project`,
        method: "POST",
        body: project_ids,
      }),
      providesTags: ["addTask", "deleteTask", "updateTask"],
    }),
    getTasksByBucket: builder.query<TaskI[], string>({
      query: (id: string) => `/bucket/${id}/tasks`,
      providesTags: ["addTask", "deleteTask", "updateTask"],
    }),
    getTasksByLabel: builder.query<
      TaskContainerI[],
      TaskByLabelI
    >({
      query: ({ label_id, project_id }) =>
        `label/${label_id}/task/project/${project_id}`,
      providesTags: ["addTask", "deleteTask", "updateTask"],
    }),
    addTask: builder.mutation<TaskI, TaskI>({
      query: (task: TaskI) => ({
        url: `/task`,
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["addTask"],
    }),
    updateTask: builder.mutation<TaskI, TaskI>({
      query: (data: TaskI) => ({
        url: `/task/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateTask"],
    }),
    deleteTask: builder.mutation<null, string>({
      query: (id: string) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteTask"],
    }),
    getAssigneesByTaskId: builder.query<UserI[], string>({
      query: (task_id) => `task/${task_id}/assignee`,
      providesTags: ["assignUser", "unAssignUser"],
    }),
    assignUser: builder.mutation<
      Task_AssigneeI,
      Task_AssigneeI
    >({
      query: (data: Task_AssigneeI) => ({
        url: "/task_assignee/assign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["assignUser"],
    }),
    unassignUser: builder.mutation<void, Task_AssigneeI>({
      query: (data: Task_AssigneeI) => ({
        url: "/task_assignee/unassign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["unAssignUser"],
    }),
  }),
});

export const {
  useGetAssigneesByTaskIdQuery,
  useGetTasksByProjectIdsQuery,
  useAssignUserMutation,
  useUnassignUserMutation,
  useGetTasksByProjectIdQuery,
  useGetTasksByBucketQuery,
  useGetTasksByLabelQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;

import { parseZodErr } from "@/components/utils";
import {
  addProjectError,
  notFoundError,
} from "@/constants";
import { addProject } from "@/data-access/project";
import { getTeamById } from "@/data-access/team";
import { getUserById } from "@/data-access/user";
import { ProjectI } from "@/interfaces";
import {
  validateProject,
  validateRequest,
} from "@/validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data: ProjectI = await request.json();

      const validation = validateProject.safeParse(data);

      if (!validation.success)
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

      if (!data.team_id && !data.user_id) {
        return NextResponse.json("Invalid data received.", {
          status: 400,
        });
      }

      if (data.team_id) {
        const team = await getTeamById(data.team_id);
        if (!team) {
          return NextResponse.json(
            notFoundError("Team").message,
            {
              status: 404,
            }
          );
        }
      }

      if (data.user_id) {
        const user = await getUserById(data.user_id);
        const session = await getServerSession();
        if (session && session.user.email !== user.email) {
          return NextResponse.json(
            notFoundError("User").message,
            {
              status: 404,
            }
          );
        }
      }

      const newProject = await addProject({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return NextResponse.json(newProject);
    } catch (error) {
      return NextResponse.json(addProjectError.message, {
        status: 500,
      });
    }
  }
);

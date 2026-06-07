import { parseZodErr } from "@/components/utils";
import {
  addProjectError,
  notFoundError,
  unAuthorizedError,
} from "@/constants";
import { addProject } from "@/data-access/project";
import { getTeamById, getTeamMember } from "@/data-access/team";
import { getUserById } from "@/data-access/user";
import { ProjectI } from "@/interfaces";
import {
  validateProject,
  validateRequest,
} from "@/validation";
import { verifySession } from "@/lib/apiAuth";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const sessionUser = await verifySession();
      if (!sessionUser) {
        return NextResponse.json(unAuthorizedError.message, {
          status: 401,
        });
      }

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
        // Verify user belongs to the team
        const member = await getTeamMember(data.team_id, sessionUser.id);
        if (!member) {
          return NextResponse.json(unAuthorizedError.message, {
            status: 401,
          });
        }
      }

      if (data.user_id) {
        if (sessionUser.id !== data.user_id) {
          return NextResponse.json(unAuthorizedError.message, {
            status: 401,
          });
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

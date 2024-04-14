import {
  addTeamMember,
  updateRole,
} from "@/data-access/team";
import { validateTeamMember } from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const validation = validateTeamMember.safeParse(data);

  if (!validation.success) {
    return NextResponse.json(validation.error, {
      status: 400,
    });
  }

  await addTeamMember(data);

  return NextResponse.json([]);
}

export async function PATCH(request: NextRequest) {
  const data = await request.json();

  const validation = validateTeamMember.safeParse(data);

  if (!validation.success)
    return NextResponse.json(validation.error, {
      status: 400,
    });

  await updateRole(data);

  return NextResponse.json([]);
}

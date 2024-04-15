import { getProjectsByTeamId } from "@/data-access/project";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const projects = await getProjectsByTeamId(params.id);

  return NextResponse.json(projects);
}

import {
  getUserError,
  unAuthorizedError,
} from "@/constants";
import { getUserByEmail } from "@/data-access/user";
import { validateRequest } from "@/validation";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data = await request.json();
      const session = await getServerSession();
      if (!session || session.user.email !== data.email) {
        return NextResponse.json(
          unAuthorizedError.message,
          { status: 401 }
        );
      }
      const user = await getUserByEmail(data.email);
      if (!user)
        NextResponse.json(getUserError.message, {
          status: 404,
        });
      user.password = "";
      return NextResponse.json(user);
    } catch (error) {
      console.log(error);
      return NextResponse.json(getUserError.message, {
        status: 500,
      });
    }
  }
);

import {
  getUserError,
  unAuthorizedError,
} from "@/constants";
import { getUserById } from "@/data-access/user";
import { APIParams } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id;
      const session = useSession();
      if (
        !session.data?.user ||
        session.data.user.id !== id
      ) {
        return NextResponse.json(
          unAuthorizedError.message,
          { status: 401 }
        );
      }

      const user = await getUserById(id);
      user.password = "";
      return NextResponse.json(user);
    } catch (error) {
      return NextResponse.json(getUserError.message, {
        status: 500,
      });
    }
  }
);

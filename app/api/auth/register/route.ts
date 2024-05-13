import {
  getImageUrlByName,
  hashPassword,
  parseZodErr,
} from "@/components/utils";
import { unexpectedError } from "@/constants";
import {
  addUser,
  getUserByEmail,
} from "@/data-access/user";
import { UserI } from "@/interfaces";
import { validateUser } from "@/validation";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const data: UserI = await request.json();

    const validation = validateUser.safeParse(data);

    if (!validation.success)
      return NextResponse.json(
        parseZodErr(validation.error),
        { status: 400 }
      );

    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return NextResponse.json("Email already exists", {
        status: 409,
      });
    }

    const hashedPassword = await hashPassword(
      data.password
    );

    const newUser = await addUser({
      ...data,
      id: v4(),
      image: data.image
        ? data.image
        : getImageUrlByName(data.name),
      password: hashedPassword,
    });

    return NextResponse.json(newUser);
  } catch (error) {
    NextResponse.json(unexpectedError.message, {
      status: 500,
    });
  }
}

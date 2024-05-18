import {
  getImageUrlByName,
  hashPassword,
  parseZodErr,
} from "@/components/utils";
import {
  alreadyExists,
  unexpectedError,
  userRegistrationError,
} from "@/constants";
import {
  addUser,
  getUserByEmail,
} from "@/data-access/user";
import { UserI } from "@/interfaces";
import { validateUser } from "@/validation";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { v4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();

    const user: UserI = {
      id: v4(),
      name: body.get("name")!.toString(),
      email: body.get("email")!.toString(),
      password: body.get("password")!.toString(),
      image: "",
    };

    if (body.has("imageData")) {
      const file = body.get("imageData") as File;
      const fileName =
        `${user.id}_${user.email}_profile_` + file.name;
      try {
        const { url } = await put(fileName, file, {
          access: "public",
        });
        user.image = url;
      } catch (error) {
        return NextResponse.json(
          userRegistrationError.message,
          {
            status: 400,
          }
        );
      }
    }

    const validation = validateUser.safeParse(user);

    if (!validation.success)
      return NextResponse.json(
        parseZodErr(validation.error),
        { status: 400 }
      );

    const existingUser = await getUserByEmail(user.email);
    if (existingUser) {
      return NextResponse.json(
        alreadyExists("Email").message,
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await hashPassword(
      user.password
    );

    const newUser = await addUser({
      ...user,
      image: user.image
        ? user.image
        : getImageUrlByName(user.name),
      password: hashedPassword,
    });
    const sanitizedUser = {
      ...newUser,
      password: undefined,
    };

    return NextResponse.json(sanitizedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(unexpectedError.message, {
      status: 500,
    });
  }
}

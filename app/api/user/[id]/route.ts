import { userUpdateError } from "@/constants";
import {
  getUserById,
  updateUser,
} from "@/data-access/user";
import { APIParams, UserI } from "@/interfaces";
import { validateRequestWithParams } from "@/validation";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = validateRequestWithParams(
  async (request: NextRequest, { params }: APIParams) => {
    try {
      const id = params.id!;
      const user = await getUserById(id);
      const body = await request.formData();
      const data = {
        name: body.get("name")!.toString(),
        image: user.image,
      } as UserI;

      if (body.has("imageData")) {
        const file = body.get("imageData") as File;
        const fileName =
          `${user.id}_${user.email}_profile_` + file.name;
        try {
          const { url } = await put(fileName, file, {
            access: "public",
          });
          data.image = url;
        } catch (error) {
          return NextResponse.json(
            userUpdateError.message,
            {
              status: 400,
            }
          );
        }
      }

      const updatedUser = await updateUser(user.id, data);
      updatedUser.password = "";
      return NextResponse.json(updatedUser);
    } catch (error) {
      return NextResponse.json(userUpdateError.message, {
        status: 500,
      });
    }
  }
);

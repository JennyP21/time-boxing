import { parseZodErr } from "@/components/utils";
import { addLabelError } from "@/constants";
import { addLabel } from "@/data-access/label";
import {
  validateLabel,
  validateRequest,
} from "@/validation";
import { NextRequest, NextResponse } from "next/server";

export const POST = validateRequest(
  async (request: NextRequest) => {
    try {
      const data = await request.json();

      const validation = validateLabel.safeParse(data);
      if (!validation.success)
        return NextResponse.json(
          parseZodErr(validation.error),
          {
            status: 400,
          }
        );

      const newLabel = await addLabel({
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
      });

      return NextResponse.json(newLabel);
    } catch (error) {
      return NextResponse.json(addLabelError.message, {
        status: 500,
      });
    }
  }
);

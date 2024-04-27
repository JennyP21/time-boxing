import { toast } from "@/components/error/Toast";
import { unexpectedError } from "@/constants";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function handleErrors(
  error: FetchBaseQueryError | SerializedError,
  errorId: string
) {
  if ("status" in error) {
    const errMsg =
      "error" in error
        ? error.error
        : (error.data as string);

    toast.error(errMsg, { toastId: errorId });
  } else {
    toast.error(unexpectedError.message, {
      toastId: unexpectedError.type,
    });
  }
}

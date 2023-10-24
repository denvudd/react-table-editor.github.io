import { Errors } from "@/constants/errors";
import axios from "@/lib/axios";
import { type TableData } from "@/types/table";
import { AxiosError } from "axios";

export async function deleteRow(id: number) {
  try {
    const { data } = await axios.delete(`/table/${id}/`);

    console.log(data);

    return data as TableData;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.log(error);
      if (error.response) {
        switch (error.response.status) {
          case 403: {
            return Errors.Forbidden;
          }
        }
      } else {
        return Errors.Unknown;
      }
    }
  }
}

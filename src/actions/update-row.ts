import axios from "@/lib/axios";
import { AxiosError } from "axios";
import { TableData, TableDataKeys } from "@/types/table";
import { Errors } from "@/constants/errors";

export async function updateRow(
  id: string,
  field: TableDataKeys,
  value: string | number
) {
  try {
    const { data } = await axios.patch(`/table/${id}/`, {
      [field]: value,
    });

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

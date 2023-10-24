import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

import { type TableDataResponse } from "@/types/table";
import { type TableParams } from "./types";

export const fetchTable = createAsyncThunk(
  "products/fetchProducts",
  async (params: TableParams) => {
    const { limit, offset } = params;
    const { data } = await axios.get("/table/", {
      params: {
        limit,
        offset,
      },
    });

    return data as TableDataResponse;
  }
);

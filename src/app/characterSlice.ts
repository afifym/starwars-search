import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCharacters } from "../api/queries"
import type { Character } from "../types"
import { toast } from "react-toastify"

export const searchCharacters = createAsyncThunk(
  "character/search",
  async ({ query }: { query: string }) => {
    const data = await getCharacters(query)
    return data.results
  },
)

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    items: [] as Character[],
    status: "idle" as "loading" | "success" | "error",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchCharacters.pending, (state) => {
        state.status = "loading"
      })
      .addCase(searchCharacters.fulfilled, (state, action) => {
        state.status = "success"
        state.items = action.payload
      })
      .addCase(searchCharacters.rejected, (state) => {
        state.status = "error"
        toast.error("An error occurred")
      })
  },
})

export default characterSlice.reducer

"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export function useMe() {
  return useSelector((state: RootState) => state.me);
}

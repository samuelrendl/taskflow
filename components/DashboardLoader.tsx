"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { setMe } from "@/lib/store/meSlice";
import { fetchMe } from "@/lib/api";

export default function DashboardLoader() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchMe().then((me) => {
      dispatch(setMe(me));
    });
  }, [dispatch]);

  return null;
}

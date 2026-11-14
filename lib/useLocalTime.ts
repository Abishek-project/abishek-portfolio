"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/constants";

/** Live clock in the profile's time zone (empty until mounted, to avoid hydration mismatch). */
export const useLocalTime = (withSeconds = true) => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: Profile.timeZone,
      hour: "2-digit",
      minute: "2-digit",
      ...(withSeconds && { second: "2-digit" }),
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [withSeconds]);
  return time;
};

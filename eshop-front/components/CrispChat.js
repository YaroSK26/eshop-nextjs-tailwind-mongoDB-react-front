"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("2bb6bcfd-5007-4790-84f3-de523df3fa8b");
  }, []);

  return null;
};

"use client";

import React, { useState } from "react";
import UiCard from "../Components/UiCard";
import Heading from "../Components/Heading";
import { useRecoilValue } from "recoil";
import { formState } from "../atoms/authFormAtom";
import AuthenticationForm from "../Components/AuthenticationForm";
import { Boxes } from "../Components/ui/background-boxes";
import { cn } from "../lib/utils";

function page() {
  const login = useRecoilValue(formState);

  return (
    <div className=" w-[100vw] h-[100vh] overflow-hidden relative bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className=" flex items-center justify-center w-[100vw] h-[100vh]">
        <UiCard>
          <Heading title={login ? "Login" : "Sign Up"} />
          <AuthenticationForm />
        </UiCard>
      </div>
    </div >
  );
}

export default page;
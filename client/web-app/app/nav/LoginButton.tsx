"use client";

import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import React from "react";

export default function LoginButton() {
  //Same with doendeserver config id
  return (
    <Button onClick={() => signIn("id-server", { callbackUrl: "/" })}>
      Login
    </Button>
  );
}

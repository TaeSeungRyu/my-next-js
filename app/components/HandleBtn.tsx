"use client";
import { signIn } from "next-auth/react";
export function handleSignin() {
  signIn("credentials", {
    email: "email@aaa.com",
    password: "email from custom signin",
  });
}

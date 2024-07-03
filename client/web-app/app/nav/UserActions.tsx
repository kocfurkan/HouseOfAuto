"use client";

import { Button, Dropdown } from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

type Props = { user: Partial<User> };

export default function UserActions({ user }: Props) {
  return (
    <Dropdown label={`Welcome ${user.name}`}>
      <Dropdown.Item>
        <Link href="/">My Auctions</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link href="/">Auctions Won</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link href="/">Sell My Car</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link href="/session">Session</Link> Session
      </Dropdown.Item>
      <Dropdown.Item onClick={() => signOut({ callbackUrl: "/" })}>
        Sign Out
      </Dropdown.Item>
    </Dropdown>
  );
}

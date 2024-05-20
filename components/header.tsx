import * as React from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FPG_ICON_URL } from "@/lib/utils";
import { FaGithub } from "react-icons/fa";

import Image from "next/image";

export function Header() {
  return (
    <Card className="bg-white">
      <CardHeader>
        <div className="flex flex-row gap-2 items-center">
          <CardTitle>Invisible Drop</CardTitle>
        </div>
        <CardDescription>
          <Link
            href="https://warpcast.com/newtroarts/0x6fc89eb2"
            className="underline"
          >
            By Newtro Arts
          </Link>
          <br />
          Once it ends, you'll receive the artists pieces in your wallets!
          <span className="font-medium">
            To join the whitelist, follow these steps:
          </span>
          <br /> - 🔴 Click on "Join Whitelist"
          <br /> - 🔵 Type 77 $degen or more in the comments
          <br /> - 🟣 Follow us and share this frame This frame will be open for
          48HS.
        </CardDescription>
        <div className="flex flex-row justify-between items-center">
          <CardDescription className="text-sm pt-3">
            Once it ends, you'll receive the artists pieces in your wallets!
          </CardDescription>
          <Link
            href="https://github.com/SweetmanTech/degen-whitelist-frame"
            className="underline"
          >
            <FaGithub size={16} className="pt-1" />
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
}

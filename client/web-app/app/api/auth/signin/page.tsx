import EmptyFilter from "@/app/components/EmptyFilter";
import React from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) {
  return (
    <EmptyFilter
      title="You need to be logged in to do that"
      subtitle="click to log in"
      showLogin
      callbackUrl={searchParams.callbackUrl}
    />
  );
}

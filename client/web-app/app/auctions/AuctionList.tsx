import { error } from "console";
import React from "react";
import AuctionCard from "./AuctionCard";

async function getData() {
  const res = await fetch("http://localhost:6001/search");

  if (!res.ok) throw new Error("fetching failed");

  return res.json();
}

export default async function AuctionList() {
  const data = await getData();

  return (
    <div>
      {data &&
        data.results.map((auction: any) => (
          <AuctionCard auction={auction} key={auction.id}></AuctionCard>
        ))}
    </div>
  );
}

import Heading from "@/app/components/Heading";
import React from "react";
import AuctionForm from "../AuctionForm";

export default function Create() {
  return (
    <div className="mx-auto max-w-[75½] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Sell my car!"
        subtitle="Please enter the details of your car"
      ></Heading>
      <AuctionForm></AuctionForm>
    </div>
  );
}

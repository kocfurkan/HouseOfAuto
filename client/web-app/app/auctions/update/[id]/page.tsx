import Heading from "@/app/components/Heading";
import React from "react";
import AuctionForm from "../../AuctionForm";
import { getDetails } from "@/app/actions/auctionActions";

export default async function Update({ params }: { params: { id: string } }) {
  const data = await getDetails(params.id);
  return (
    <div className="mx-auto max-w[75½] shadow-lg p-10 bg-white rounded-lg">
      <Heading
        title="Update Your Auction"
        subtitle="Please update the details of your car"
      ></Heading>
      <AuctionForm auction={data}></AuctionForm>
    </div>
  );
}

import Image from "next/image";
import AuctionList from "./auctions/AuctionList";

export default function Home() {
  return (
    <div>
      <AuctionList></AuctionList>
    </div>
  );
}

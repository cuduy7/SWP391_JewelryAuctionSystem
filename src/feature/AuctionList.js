import React from "react";
import AuctionCard from "../component/AuctionCard";
import '../css/AuctionCardList.css';

export default function AuctionList({ auctions }) {
  return (
    <div className="auction-card-list">
      {auctions.map((auction, index) => (
        <AuctionCard
          key={index}
          name={auction.name}
          price={auction.price}
          imageSrc={auction.imageSrc}
        />
      ))}
    </div>
  );
}

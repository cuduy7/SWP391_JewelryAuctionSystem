import React from "react";
import '../css/AuctionCard.css';

export default function AuctionCard({ name, price, imageSrc }) {
  return (
    <div className="auction-card">
      <img src={imageSrc} alt={name} className="auction-card-image" />
      <div className="auction-card-details">
        <h3 className="auction-card-name">{name}</h3>
        <p className="auction-card-price">{price}</p>
      </div>
    </div>
  );
}
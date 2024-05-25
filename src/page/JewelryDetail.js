// src/components/JewelryDetail.js
import React, { useEffect, useState } from "react";
import imagePath from "../asset/images.jpg";
import Popup from "../component/Popup";
import '../css/JewelryDetail.css';
import similarAuctions from "../data/auction";
import AuctionList from "../feature/AuctionList";

export default function JewelryDetail() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const auctionEndTime = new Date("2024-05-30T15:00:00");

  const calculateTimeLeft = () => {
    const difference = +auctionEndTime - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const renderTimeLeft = () => {
    return (
      <>
        {timeLeft.days !== undefined ? (
          <div>
            <span>{timeLeft.days}d </span>
            <span>{timeLeft.hours}h </span>
            <span>{timeLeft.minutes}m </span>
            <span>{timeLeft.seconds}s</span>
          </div>
        ) : (
          <div>Auction Ended</div>
        )}
      </>
    );
  };

  const handlePlaceBidClick = () => {
    setIsPopupOpen(true);
  };

  return (
    <section>
      <div className="product">
      <div className="product-container">
        <div className="product-title">Trang Sức Ruby</div>
        <div className="product-content">
          <div className="product-image">
            <img src={imagePath} alt="Ruby Jewelry" />
          </div>
          <div className="product-detail">
            <div className="product-time">
              Auction Ends In: {renderTimeLeft()}
            </div>
            <div className="product-info">
              <p><strong>Description:</strong> This exquisite ruby jewelry piece features a stunning central ruby surrounded by diamonds.</p>
              <p><strong>Price:</strong> $2,500</p>
              <p><strong>Materials:</strong> 18K Gold, Ruby, Diamonds</p>
              <p><strong>Dimensions:</strong> 2.5cm x 2.5cm</p>
              <p><strong>Weight:</strong> 15g</p>
              <button className="place-bid-button" onClick={handlePlaceBidClick}>Place Bid</button>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="similar-auctions">
        <h2>Similar Auctions</h2>
        <AuctionList auctions={similarAuctions} />
    </div>
    <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2>Place Your Bid</h2>
        <p>Enter your bid amount below:</p>
        <input type="number" placeholder="Bid Amount" />
        <button className="place-bid-submit">Submit Bid</button>
      </Popup>
    </section>
    
  );
}
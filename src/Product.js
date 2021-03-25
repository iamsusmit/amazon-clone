import React, { useState } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

//for countdown
import { Statistic } from "antd";
import "antd/dist/antd.css";
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function Product({
  id,
  title,
  image,
  price,
  rating,
  countdown,
  discountPrice,
}) {
  const [displayCountdown, setDisplayCountdown] = useState(true);
  const [{ basket }, dispatch] = useStateValue();

  function onFinish() {
    setDisplayCountdown(false);
  }

  const addToBasket = () => {
    // dispatch the item into the data layer
    if (countdown && displayCountdown) {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: id,
          title: title,
          image: image,
          price: discountPrice, //during countdown time, dispatch discountPrice
          rating: rating,
        },
      });
    } else {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: id,
          title: title,
          image: image,
          price: price, //after countdown ends, dispatch price
          rating: rating,
        },
      });
    }
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        {!countdown ? (
          <p className="product__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
        ) : (
          //on completion of countdown, discounted price will disappear & previous price will not be striked out anymore
          <>
            <p
              className={
                displayCountdown
                  ? "discounted__product__price"
                  : "product__price"
              }
            >
              <small>$</small>
              <strong>{price}</strong>
            </p>
            <p
              className={
                displayCountdown ? "product__price" : "remove__product__price"
              }
            >
              <small>$</small>
              <strong>{discountPrice}</strong>
            </p>
          </>
        )}
        {/* show countdown when 'countdown' prop is passed to <Product/> and show till the countdown ends */}
        {countdown && displayCountdown && (
          <div>
            <Countdown
              title="Order before the offer ends"
              value={deadline}
              onFinish={onFinish}
              valueStyle={{ color: "#a57805" }}
              format="HH:mm:ss:SSS" //format="D 天 H 时 m 分 s 秒"
            />
          </div>
        )}

        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;

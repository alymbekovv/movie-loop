import React, { useEffect, useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import scss from "./Carousel.module.scss";
import MoviesCart from "../../cart/MoviesCart";
import { Skeleton } from "@mui/material";

const Carousel = ({ data, genre, mediaType }) => {
  const carouselRef = useRef();
  const [show, setShow] = useState(0);
  const [lodaing, setLodaing] = useState(true);

  useEffect(() => {
    if (data && data.length > 0) {
      const timeout = setTimeout(() => {
        setLodaing(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [data]);

  const scroll = (value) => {
    const container = carouselRef.current;
    const amount =
      value === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({ left: amount, behavior: "smooth" });
    setShow(amount);
  };

  function skItem() {
    return (
      <div style={{ margin: "0 10px", borderRadius: "20px" }}>
        <Skeleton
          variant="rectangular"
          width={230}
          height={320}
          animation="wave"
          sx={{ background: "#2d2d2q", borderRadius: "20px" }}
        />
        <Skeleton variant="text" width={210} animation="wave" />
        <Skeleton variant="text" width={140} animation="wave" />
      </div>
    );
  }

  return (
    <div className={scss.carousel}>
      <div className={scss.wrapper}>
        {show >= 1 ? (
          <BsFillArrowLeftCircleFill
            onClick={() => scroll("left")}
            className={`${scss.arrow} ${scss.left}`}
          />
        ) : (
          ""
        )}
        {show <= 3000 ? (
          <BsFillArrowRightCircleFill
            onClick={() => scroll("right")}
            className={`${scss.arrow} ${scss.right}`}
          />
        ) : (
          ""
        )}

        <div ref={carouselRef} className={scss.carouselItems}>
          {lodaing
            ? [...Array(6)].map((_, i) => (
                <React.Fragment key={i}>{skItem()}</React.Fragment>
              ))
            : data.map((item, index) => (
                <MoviesCart
                  item={item}
                  key={index}
                  genre={genre}
                  mediaType={mediaType}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

import "react-responsive-carousel/lib/styles/carousel.min.css";

import firstImg from "../../../assets/IMG-20220428-WA0002.jpg";
import secondImg from "../../../assets/irest-150x167.jpg";
import thirdImg from "../../../assets/logo-adidas-150x68.png";
import fourthImg from "../../../assets/logo-gr8-150x67.jpeg";
import fifthImg from "../../../assets/logo-reebok-150x68.png";
import sixthImg from "../../../assets/logo-spirit-150x67.png";
import seventhImg from "../../../assets/logo-steelflex-150x68.png";
import eightthImg from "../../../assets/logo-stex-150x68.png";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay"; // Import autoplay styles
import { Autoplay } from "swiper/modules";
const Dealerships = () => {
  return (
    <div className="my-12">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={4}
        autoplay={{
          delay: 0, // Delay between slides (in ms)
          disableOnInteraction: false, // Keeps autoplay running even after user interaction
        }}
        loop={true} // Enable infinite looping
        speed={1000}
        spaceBetween={0}
      >
        <SwiperSlide className="border-y-2 border-x-2">
          <img src={firstImg} className="w-full h-[60px] object-contain" />
        </SwiperSlide>
        <SwiperSlide className="border-y-2">
          <img src={secondImg} className="w-full h-[60px] object-contain" />
        </SwiperSlide>
        <SwiperSlide className="border-y-2 border-x-2">
          <img src={thirdImg} className="w-full h-[60px] object-contain" />
        </SwiperSlide>

        <SwiperSlide className="border-y-2">
          <img src={fourthImg} className="w-full h-[60px] object-contain" />
        </SwiperSlide>
        <SwiperSlide className="border-y-2 border-x-2">
          <img src={fifthImg} className="w-full h-[60px] object-contain" />
        </SwiperSlide>
        <SwiperSlide className="border-y-2">
          <img src={sixthImg} className="w-full h-[60px] object-contain" />
        </SwiperSlide>
        <SwiperSlide className="border-y-2 border-x-2">
          <img src={seventhImg} className="w-full h-[60px] object-contain" />
        </SwiperSlide>
        <SwiperSlide className="border-y-2">
          <img src={eightthImg} className="w-full h-[60px] object-contain" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Dealerships;

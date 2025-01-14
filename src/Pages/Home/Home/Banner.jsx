// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const Banner = () => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={{
        delay: 1000,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={5000}
      navigation
      pagination={{ clickable: true }}
      spaceBetween={40}
      slidesPerView={1}
      className="bg-banner5 bg-cover bg-no-repeat bg-center min-h-screen grid place-content-center"
    >
      <SwiperSlide>
        <div>
          <img
            src={
              "https://i.ibb.co.com/bmR56v2/dec912b4-84e8-4c5f-9c57-81c639979844.webp"
            }
            className="w-full object-cover opacity-60"
            alt=""
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={
            "https://i.ibb.co.com/qnntHPK/0420af1a-29fd-49a8-a90e-7be1ec83dca6.webp"
          }
          className="w-full  object-cover opacity-60"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={
            "https://i.ibb.co.com/4YkdhPb/5e2f8743-c682-458c-b195-315ff623c780.webp"
          }
          className="w-full  object-cover opacity-60"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;

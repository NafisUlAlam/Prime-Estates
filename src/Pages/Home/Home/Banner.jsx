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
            src={"https://i.ibb.co.com/5rjhTLq/bannerimg1.jpg"}
            className="w-full h-[500px] object-cover opacity-60"
            alt=""
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={"https://i.ibb.co.com/rmtTtN5/bannerimg2.jpg"}
          className="w-full  h-[500px] object-cover opacity-60"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={"https://i.ibb.co.com/cDL4JDy/bannerimg3.jpg"}
          className="w-full h-[500px] object-cover opacity-60"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={"https://i.ibb.co.com/fQLTCS7/bannerimg4.jpg"}
          className="w-full h-[500px] object-cover opacity-60"
          alt=""
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={"https://i.ibb.co.com/j51jh2w/bannerimg5.jpg"}
          className="w-full h-[500px] object-cover opacity-60"
          alt=""
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;

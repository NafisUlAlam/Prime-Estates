// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Hero from "./Hero";
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
      className="bg-banner5 bg-cover bg-no-repeat bg-center h-[70dvh]"
    >
      <SwiperSlide>
        <Hero
          banner={"bg-heroBanner1"}
          title={"Prime Properties, Prime Choices"}
          subtitle={
            "Find your dream home or the perfect investment property with ease. Your journey to a better future starts here."
          }
        ></Hero>
      </SwiperSlide>
      <SwiperSlide>
        <Hero
          banner={"bg-heroBanner2"}
          title={"Where Trust Meets Real Estate"}
          subtitle={
            "Discover properties handpicked for quality and authenticity. We make your property search effortless and reliable."
          }
        ></Hero>
      </SwiperSlide>
      <SwiperSlide>
        <Hero
          banner={"bg-heroBanner3"}
          title={"Your Gateway to Property Excellence"}
          subtitle={
            "Explore a curated selection of homes and commercial spaces that fit your vision. Let's bring your dreams to life."
          }
        ></Hero>
      </SwiperSlide>
      <SwiperSlide>
        <Hero
          banner={"bg-heroBanner4"}
          title={"Turning Listings Into Living"}
          subtitle={
            "From viewing to owning, we guide you every step of the way. Experience real estate like never before with personalized solutions."
          }
        ></Hero>
      </SwiperSlide>
      <SwiperSlide>
        <Hero
          banner={"bg-heroBanner5"}
          title={"No Scammers Allowed"}
          subtitle={
            "We prioritize honesty and transparency to ensure a secure environment for everyone. Together, let’s build a community based on trust and integrity."
          }
        ></Hero>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;

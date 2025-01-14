/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        banner: "url(/layered-waves-haikei.svg)",
        banner2: "url(/wave-haikei.svg)",
        banner3: "url(/stacked-peaks-haikei.svg)",
        banner4: "url(/review.png)",
        banner5: "url(/hello.png)",
        queryBanner:
          "url(https://i.ibb.co.com/3Cj8zLL/thoughtful-woman-with-laptop-looking-big-question-mark-1150-39362.jpg)",
      },
    },
  },
  plugins: [daisyui],
};

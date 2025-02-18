const giveColorOutput = (variable) => {
  return ({ opacityValue }) => {
    console.log(opacityValue);
    if (opacityValue !== undefined)
      return `rgba(var(${variable}), ${opacityValue})`;
    return `rgb(var(${variable}))`;
  };
};

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
        heroBanner1: "url(https://i.ibb.co.com/5rjhTLq/bannerimg1.jpg)",
        heroBanner2: "url(https://i.ibb.co.com/rmtTtN5/bannerimg2.jpg)",
        heroBanner3: "url(https://i.ibb.co.com/cDL4JDy/bannerimg3.jpg)",
        heroBanner4: "url(https://i.ibb.co.com/fQLTCS7/bannerimg4.jpg)",
        heroBanner5: "url(https://i.ibb.co.com/j51jh2w/bannerimg5.jpg)",
      },
      colors: {
        text: giveColorOutput("--text"),
        background: giveColorOutput("--background"),
        primary: giveColorOutput("--primary"),
        secondary: giveColorOutput("--secondary"),
        accent: giveColorOutput("--accent"),
      },
    },
  },
  plugins: [daisyui],
};

// import barba from "../node_modules/@barba/core/dist/barba.mjs";
import 'https://cdn.jsdelivr.net/npm/@barba/core';
import anime from "../node_modules/animejs/lib/anime.es.js";

const swiper = document.getElementById("swiper");
const hero = document.getElementById("Hero");
const springConfig = "spring(1, 100, 100, 0)";

const colors = ["#75B9BE"];

const getRandomColor = () => {
  return colors[Math.round(Math.random() * (colors.length - 1))];
};

barba.init({
  async: true,
  transitions: [
    {
      name: "swipe",
      before({data}){
        swiper.style.left = 0;
      },
      leave({ current }) {
        const tl = anime.timeline({
          duration: 800,
          easing: springConfig,
        });

        tl.add({
          targets: swiper,
          left: 0,
          scaleX: [0, 1],
        });

        tl.add(
          {
            targets: current.container,
            opacity: 0,
          },
          0
        );

        // tl.add(
        //   {
        //     targets: hero,
        //     opacity: 0,
        //     translateX: 50,
        //   },
        //   0
        // );

        return tl.finished;
      },
      after({ next }) {
        const tl = anime.timeline({
          duration: 800,
          easing: springConfig,
        });

        tl.add({
          targets: next.container,
          opacity: [0, 1],
        });

        tl.add(
          {
            targets: swiper,
            left: screen.width,
            scaleX: [1, 0],
          },
          0
        );
        // next.container.add();
        return tl.finished;
      },
    },
  ],
  preventRunning: true,
});

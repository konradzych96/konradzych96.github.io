import barba from "../node_modules/@barba/core/dist/barba.mjs";
import anime from "../node_modules/animejs/lib/anime.es.js";

const swiper = document.getElementById("swiper");
const springConfig = "spring(1, 100, 100, 0)";

const colors = ["#75B9BE", "#677DB7", "#E8D6CB", "#00CFC1"];

const getRandomColor = () => {
  return colors[Math.round(Math.random() * (colors.length - 1))];
};

barba.init({
  async: true,
  transitions: [
    {
      name: "swipe",
      leave({ current }) {
        swiper.style.backgroundColor = getRandomColor();

        const tl = anime.timeline({
          duration: 800,
          easing: springConfig,
        });

        tl.add({
          targets: swiper,
          scaleX: [0, 1],
        });

        tl.add(
          {
            targets: current.container,
            opacity: 0,
          },
          0
        );

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

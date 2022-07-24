import barba from '../node_modules/@barba/core/dist/barba.mjs'
import anime from '../node_modules/animejs/lib/anime.es.js'


const swiper = document.getElementById("swiper");
const springConfig = "spring(1, 100, 25, 0)";

barba.init({
  transitions: [
    {
      name: "swipe",
      leave({ current }) {
        // swiper.style.backgroundColor = "#F03A47";

        const tl = anime.timeline({
          duration: 400,
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
          }
        );
        return tl.finished;
      },
      enter({ next }) {
        const tl = anime.timeline({
          duration: 400,
          easing: springConfig,
        });

        tl.add({
          targets: swiper,
          scaleX: [1, 0],
        });

        tl.add(
          {
            targets: next.container,
            opacity: [0, 1],
          },
          0
        );

        return tl.finished;
      },
    },
  ],
  // preventRunning: true,
});

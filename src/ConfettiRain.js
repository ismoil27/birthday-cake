import React, { useEffect, useRef } from "react";

const ConfettiRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const COLORS = ["#0000e7", "#dbdb00", "#ed1c24", "#00ebeb"];
    let duration = 2000;
    let progress = 0;
    let w = 0;
    let h = 0;
    let xpos = 0.8;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const resizeWindow = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const range = (a, b) => (b - a) * Math.random() + a;

    const drawCircle = (x, y, width, height, style, deg) => {
      const rotDeg = (deg * Math.PI) / 180;
      context.beginPath();
      context.save();
      context.translate(x + width, y + height);
      context.rotate(rotDeg);
      context.fillStyle = style;
      context.fillRect(-width, -height, width, height);
      context.restore();
    };

    document.onmousemove = (e) => {
      xpos = e.pageX / w;
    };

    const confetti = [];
    const NUM_CONFETTI = 350;

    for (let i = 0; i < NUM_CONFETTI; i++) {
      confetti.push({
        style: COLORS[~~range(0, 4)],
        deg: range(10, 120),
        r: ~~range(4, 10),
        width: 2 * ~~range(4, 10),
        height: ~~range(4, 10) / 2,
        replace: function () {
          this.opacity = 0;
          this.dop = 1;
          this.x = range(0, w - this.width);
          this.y = range(-(h - this.width), -this.width);
          this.xmax = w - this.r;
          this.ymax = h - this.r;
          this.vx = 0;
          this.vy = 1.1 * this.r + range(-1, 1);
        },
        draw: function () {
          this.x += this.vx;
          this.y += this.vy;
          if (this.y > this.ymax) {
            this.replace();
          }
          if (!(0 < this.x < this.xmax)) {
            this.x = (this.x + this.xmax) % this.xmax;
          }
          drawCircle(
            ~~this.x,
            ~~this.y,
            this.width,
            this.height,
            this.style,
            this.deg
          );
        },
      });
    }

    const step = () => {
      window.requestAnimationFrame(step);
      context.clearRect(0, 0, w, h);
      confetti.forEach((c) => c.draw());
      progress += 20;
    };

    window.onload = () => setTimeout(resizeWindow, 0);
    window.addEventListener("resize", resizeWindow);

    resizeWindow();
    step();

    return () => {
      window.removeEventListener("resize", resizeWindow);
    };
  }, []);

  return <canvas ref={canvasRef} id="world"></canvas>;
};

export default ConfettiRain;

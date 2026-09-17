// ============================================================
// Cool Mode · 按键粒子特效（移植自 Magic UI）
// 说明：原版是 React 组件（magicui.design/docs/components/cool-mode，
//       MIT 协议，原作者 Bankk / ClickFusion）。这里去掉 React 包装，
//       保留核心粒子逻辑，改为原生 JS，供纯 HTML 页面直接使用。
//       按住元素时会在指针位置持续生成粒子：粒子旋转、上飘减速、
//       加速下落后移出屏幕自动回收。鼠标与触摸设备均支持。
// 用法：window.CoolMode.apply(element, options)
//       options.particle: "circle"(默认，彩色圆点) | 图片 URL | emoji/文字
//       options.size / speedHorz / speedUp: 粒子尺寸与速度，默认随机
// ============================================================
(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";

  let instanceCounter = 0;

  // 全屏粒子容器（固定定位、穿透点击、置于最顶层），多个实例共用
  const getContainer = () => {
    const id = "_coolMode_effect";
    const existingContainer = document.getElementById(id);

    if (existingContainer) {
      return existingContainer;
    }

    const container = document.createElement("div");
    container.setAttribute("id", id);
    container.setAttribute(
      "style",
      "overflow:hidden; position:fixed; height:100%; top:0; left:0; right:0; bottom:0; pointer-events:none; z-index:2147483647"
    );

    document.body.appendChild(container);

    return container;
  };

  // 给元素绑定粒子特效，返回解绑函数（页面级使用无需解绑）
  const applyParticleEffect = (element, options) => {
    instanceCounter++;

    const defaultParticle = "circle";
    const particleType = (options && options.particle) || defaultParticle;
    const sizes = [15, 20, 25, 35, 45];
    const limit = 45;

    let particles = [];
    let autoAddParticle = false;
    let mouseX = 0;
    let mouseY = 0;

    const container = getContainer();

    const appendCircleParticle = (particle, size) => {
      const circleSVG = document.createElementNS(SVG_NS, "svg");
      const circle = document.createElementNS(SVG_NS, "circle");

      circle.setAttributeNS(null, "cx", (size / 2).toString());
      circle.setAttributeNS(null, "cy", (size / 2).toString());
      circle.setAttributeNS(null, "r", (size / 2).toString());
      // 深色主题下改用霓虹色板：青 / 蓝 / 紫 / 品红（高亮度带光感）
      const NEON_HUES = [186, 200, 262, 280, 320];
      const hue = NEON_HUES[Math.floor(Math.random() * NEON_HUES.length)];
      circle.setAttributeNS(null, "fill", `hsl(${hue}, 95%, 62%)`);

      circleSVG.appendChild(circle);
      circleSVG.setAttribute("width", size.toString());
      circleSVG.setAttribute("height", size.toString());

      particle.appendChild(circleSVG);
    };

    const appendImageParticle = (particle, imageSrc, size) => {
      const image = document.createElement("img");
      image.src = imageSrc;
      image.width = size;
      image.height = size;
      image.alt = "";
      image.style.borderRadius = "50%";

      particle.appendChild(image);
    };

    const appendTextParticle = (particle, particleContent, size) => {
      const fontSizeMultiplier = 3;
      const emojiSize = size * fontSizeMultiplier;
      const content = document.createElement("div");

      content.textContent = particleContent;
      content.style.fontSize = `${emojiSize}px`;
      content.style.lineHeight = "1";
      content.style.textAlign = "center";
      content.style.width = `${size}px`;
      content.style.height = `${size}px`;
      content.style.display = "flex";
      content.style.alignItems = "center";
      content.style.justifyContent = "center";
      content.style.transform = `scale(${fontSizeMultiplier})`;
      content.style.transformOrigin = "center";

      particle.appendChild(content);
    };

    function generateParticle() {
      const size =
        (options && options.size) || sizes[Math.floor(Math.random() * sizes.length)];
      const speedHorz = (options && options.speedHorz) || Math.random() * 10;
      const speedUp = (options && options.speedUp) || Math.random() * 25;
      const spinVal = Math.random() * 360;
      const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
      const top = mouseY - size / 2;
      const left = mouseX - size / 2;
      const direction = Math.random() <= 0.5 ? -1 : 1;

      const particle = document.createElement("div");

      if (particleType === "circle") {
        appendCircleParticle(particle, size);
      } else if (
        particleType.startsWith("http") ||
        particleType.startsWith("/")
      ) {
        appendImageParticle(particle, particleType, size);
      } else {
        appendTextParticle(particle, particleType, size);
      }

      particle.style.position = "absolute";
      particle.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${spinVal}deg)`;

      container.appendChild(particle);

      particles.push({
        direction,
        element: particle,
        left,
        size,
        speedHorz,
        speedUp,
        spinSpeed,
        spinVal,
        top,
      });
    }

    function refreshParticles() {
      particles.forEach((p) => {
        p.left = p.left - p.speedHorz * p.direction;
        p.top = p.top - p.speedUp;
        // 上升速度逐渐衰减到负值 → 粒子先减速上飘，再加速下落
        p.speedUp = Math.min(p.size, p.speedUp - 1);
        p.spinVal = p.spinVal + p.spinSpeed;

        if (
          p.top >=
          Math.max(window.innerHeight, document.body.clientHeight) + p.size
        ) {
          particles = particles.filter((o) => o !== p);
          p.element.remove();
        }

        p.element.setAttribute(
          "style",
          [
            "position:absolute",
            "will-change:transform",
            `top:${p.top}px`,
            `left:${p.left}px`,
            `transform:rotate(${p.spinVal}deg)`,
          ].join(";")
        );
      });
    }

    let animationFrame;

    let lastParticleTimestamp = 0;
    const particleGenerationDelay = 30;

    function loop() {
      const currentTime = performance.now();
      if (
        autoAddParticle &&
        particles.length < limit &&
        currentTime - lastParticleTimestamp > particleGenerationDelay
      ) {
        generateParticle();
        lastParticleTimestamp = currentTime;
      }

      refreshParticles();
      animationFrame = requestAnimationFrame(loop);
    }

    loop();

    const isTouchInteraction = "ontouchstart" in window;

    const tap = isTouchInteraction ? "touchstart" : "mousedown";
    const tapEnd = isTouchInteraction ? "touchend" : "mouseup";
    const move = isTouchInteraction ? "touchmove" : "mousemove";

    const updateMousePosition = (e) => {
      if ("touches" in e) {
        const touch = e.touches && e.touches[0];
        if (!touch) return;
        mouseX = touch.clientX;
        mouseY = touch.clientY;
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    };

    const tapHandler = (e) => {
      updateMousePosition(e);
      autoAddParticle = true;
    };

    const disableAutoAddParticle = () => {
      autoAddParticle = false;
    };

    element.addEventListener(move, updateMousePosition, { passive: true });
    element.addEventListener(tap, tapHandler, { passive: true });
    element.addEventListener(tapEnd, disableAutoAddParticle, { passive: true });
    element.addEventListener("mouseleave", disableAutoAddParticle, {
      passive: true,
    });

    return () => {
      element.removeEventListener(move, updateMousePosition);
      element.removeEventListener(tap, tapHandler);
      element.removeEventListener(tapEnd, disableAutoAddParticle);
      element.removeEventListener("mouseleave", disableAutoAddParticle);

      const interval = setInterval(() => {
        if (animationFrame && particles.length === 0) {
          cancelAnimationFrame(animationFrame);
          clearInterval(interval);

          if (--instanceCounter === 0) {
            container.remove();
          }
        }
      }, 500);
    };
  };

  window.CoolMode = { apply: applyParticleEffect };
})();

// ============================================================
// Meteors · 流星雨背景特效（移植自 Magic UI）
// 说明：原版是 React 组件（magicui.design/docs/components/meteors，
//       MIT 协议，原作者 dillionverma）。这里去掉 React 包装，
//       改为原生 JS：向容器内注入 N 个随机位置 / 延迟 / 时长的流星。
// 用法：window.Meteors.init(container, options)
//       options.number      流星数量（默认 20）
//       options.minDelay    出现最小延迟秒数（默认 0.2）
//       options.maxDelay    出现最大延迟秒数（默认 1.2）
//       options.minDuration 单程最短秒数（默认 2）
//       options.maxDuration 单程最长秒数（默认 10）
//       options.angle       轨迹角度（默认 215，官方值；
//                           设为 35 时流星斜向穿过容器落下）
// 注意：容器需要 position:relative + overflow:hidden，
//       容器内的内容层需要 z-index 高于流星层。
// ============================================================
(function () {
  const init = (container, options) => {
    if (!container) return;
    const opts = options || {};

    const number = opts.number || 20;
    const minDelay = opts.minDelay || 0.2;
    const maxDelay = opts.maxDelay || 1.2;
    const minDuration = opts.minDuration || 2;
    const maxDuration = opts.maxDuration || 10;
    const angle = opts.angle || 215;

    for (let i = 0; i < number; i++) {
      const meteor = document.createElement("span");
      meteor.className = "meteor";
      // 官方实现：--angle = -angle，起点在容器上方 5%，横向随机
      meteor.style.setProperty("--angle", -angle + "deg");
      meteor.style.top = "-5%";
      meteor.style.left =
        Math.floor(Math.random() * window.innerWidth) + "px";
      meteor.style.animationDelay =
        Math.random() * (maxDelay - minDelay) + minDelay + "s";
      meteor.style.animationDuration =
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s";

      container.appendChild(meteor);
    }
  };

  window.Meteors = { init };
})();

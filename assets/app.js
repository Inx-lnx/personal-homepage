const KNOWLEDGE=[
{keys:["你是谁","名字","介绍","身份"],answer:"我是崇施涵，一个正在学习计算机的大学生，目前主要探索 AI 应用和编程。"},
{keys:["最近","在做什么","忙什么"],answer:"我最近在持续迭代个人主页，同时学习编程和英语，把学到的东西做成真实作品。"},
{keys:["擅长","方向","专业","学什么"],answer:"我目前专注 AI 应用，也在学习 HTML / CSS、JavaScript、Python 和 Supabase。"},
{keys:["兴趣","爱好","喜欢"],answer:"我喜欢音乐、羽毛球和二次元，也喜欢体验有意思的新技术。"},
{keys:["联系","邮箱"],answer:"可以发邮件到 sora291933347@tju.edu.cn，也可以在页面里给我留言。"},
{keys:["你好","hi","hello"],answer:"你好，很高兴认识你。关于学习、AI 或兴趣都可以问我。"}
];
const FALLBACK="这个问题我还没有准备好。可以试试问：你是谁、最近在做什么，或者你有什么兴趣？";
const chatBox=document.getElementById("chat-box"),chatForm=document.getElementById("chat-form"),chatText=document.getElementById("chat-text");
function pickAnswer(question){const q=question.toLowerCase().replace(/\s+/g,"");for(const item of KNOWLEDGE){if(item.keys.some(k=>q.includes(k.toLowerCase().replace(/\s+/g,""))))return item.answer}return FALLBACK}
function addMsg(text,who){if(!chatBox)return;const msg=document.createElement("div"),bubble=document.createElement("span");msg.className="msg "+who;bubble.className="bubble";bubble.textContent=text;msg.appendChild(bubble);chatBox.appendChild(msg);chatBox.scrollTop=chatBox.scrollHeight;return bubble}
function botReply(text){const bubble=addMsg("正在思考…","bot");if(!bubble)return;bubble.classList.add("typing");setTimeout(()=>{bubble.classList.remove("typing");bubble.textContent=text;chatBox.scrollTop=chatBox.scrollHeight},420)}
if(chatForm)chatForm.addEventListener("submit",e=>{e.preventDefault();const value=chatText.value.trim();if(!value)return;addMsg(value,"user");chatText.value="";botReply(pickAnswer(value))});
document.querySelectorAll(".chip").forEach(chip=>chip.addEventListener("click",()=>{addMsg(chip.dataset.q,"user");botReply(pickAnswer(chip.dataset.q))}));

const fbForm=document.getElementById("feedback-form"),fbStatus=document.getElementById("fb-status");
function setFbStatus(text,cls){if(!fbStatus)return;fbStatus.textContent=text;fbStatus.className="fb-status"+(cls?" "+cls:"")}
if(fbForm)fbForm.addEventListener("submit",async e=>{e.preventDefault();const name=document.getElementById("fb-name").value.trim(),relation=document.getElementById("fb-relation").value,message=document.getElementById("fb-message").value.trim(),btn=fbForm.querySelector(".form-submit"),cfg=window.SITE_CONFIG||{};if(!name||!relation||!message){setFbStatus("请把姓名、关系和留言填写完整。","warn");return}if(!cfg.isConfigured){setFbStatus("反馈功能正在配置中，你也可以直接给我发邮件。","warn");return}btn.disabled=true;btn.textContent="提交中…";try{const res=await fetch(cfg.supabaseUrl+"/rest/v1/feedback",{method:"POST",headers:{"Content-Type":"application/json",apikey:cfg.supabaseAnonKey,Authorization:"Bearer "+cfg.supabaseAnonKey,Prefer:"return=minimal"},body:JSON.stringify({name,relation,message})});if(!res.ok)throw new Error("HTTP "+res.status);setFbStatus("收到，谢谢你的反馈。","ok");fbForm.reset()}catch(err){console.error(err);setFbStatus("提交失败，请稍后再试。","warn")}finally{btn.disabled=false;btn.innerHTML="提交反馈 <b>↗</b>"}});

(function initReveal(){if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;const targets=document.querySelectorAll(".statement>* ,.feature-card,.skills-heading,.skill-row,.section-head,.petal,.chat-copy,.chat-window,.feedback-section>*");targets.forEach(el=>el.classList.add("reveal"));const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");io.unobserve(entry.target)}}),{threshold:.08});targets.forEach(el=>io.observe(el))})();

(function initLightbox(){const imgs=[...document.querySelectorAll(".petal img")];if(!imgs.length)return;let index=0;const overlay=document.createElement("div"),image=document.createElement("img"),close=document.createElement("button"),prev=document.createElement("button"),next=document.createElement("button"),counter=document.createElement("span");overlay.className="lightbox";close.className="lb-close";close.textContent="×";close.setAttribute("aria-label","关闭");prev.className="lb-prev";prev.textContent="‹";prev.setAttribute("aria-label","上一张");next.className="lb-next";next.textContent="›";next.setAttribute("aria-label","下一张");counter.className="lb-count";overlay.append(image,close,prev,next,counter);document.body.appendChild(overlay);const render=()=>{const img=imgs[index];image.src=img.src;image.alt=img.alt;counter.textContent=(index+1)+" / "+imgs.length};const show=i=>{index=(i+imgs.length)%imgs.length;render()};const hide=()=>overlay.classList.remove("is-open");imgs.forEach((img,i)=>img.addEventListener("click",()=>{show(i);overlay.classList.add("is-open")}));prev.addEventListener("click",e=>{e.stopPropagation();show(index-1)});next.addEventListener("click",e=>{e.stopPropagation();show(index+1)});close.addEventListener("click",hide);overlay.addEventListener("click",e=>{if(e.target===overlay)hide()});document.addEventListener("keydown",e=>{if(!overlay.classList.contains("is-open"))return;if(e.key==="Escape")hide();if(e.key==="ArrowLeft")show(index-1);if(e.key==="ArrowRight")show(index+1)})})();

document.getElementById("back-top")?.addEventListener("click",()=>window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"}));

// 打字机状态行（原版效果）：逐字打出 → 停顿 → 逐字删除 → 下一句
(function initTyped(){const typedEl=document.getElementById("typed-text"),cursorEl=document.querySelector(".type-cursor");if(!typedEl)return;const PHRASES=["主攻 AI 应用","练习编程中","听着音乐学习","会打羽毛球","爱看二次元","建设个人主页"];if(matchMedia("(prefers-reduced-motion: reduce)").matches){typedEl.textContent=PHRASES[0];return}let phraseIdx=0,charIdx=0,deleting=false;function step(){const phrase=PHRASES[phraseIdx];if(!deleting){charIdx++;typedEl.textContent=phrase.slice(0,charIdx);cursorEl&&cursorEl.classList.remove("is-idle");if(charIdx>=phrase.length){deleting=true;cursorEl&&cursorEl.classList.add("is-idle");setTimeout(step,1800);return}setTimeout(step,90)}else{charIdx--;typedEl.textContent=phrase.slice(0,charIdx);cursorEl&&cursorEl.classList.remove("is-idle");if(charIdx<=0){deleting=false;phraseIdx=(phraseIdx+1)%PHRASES.length;setTimeout(step,400);return}setTimeout(step,50)}}setTimeout(step,800)})();

// ============================================================
// Meteors · 流星雨背景（原版 v3 效果，注入 Hero 区）
// 说明：官方默认角度 215° 只扫过容器顶边，改为 35° 让流星
//       斜向穿过 Hero 落下。系统开启“减少动态效果”时禁用。
// ============================================================
(function initMeteors(){if(!window.Meteors)return;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;window.Meteors.init(document.querySelector(".hero"),{number:20,angle:35})})();

// ============================================================
// Cool Mode · 按住头像 / 名字迸发炫彩粒子（原版 v3 效果）
// 说明：按住 .portrait-frame（头像）、.portrait-name（炫彩名字）
//       以及聊天标签 / 发送按钮时，在指针位置持续生成霓虹粒子。
//       系统开启“减少动态效果”时禁用。
// ============================================================
(function initCoolMode(){if(!window.CoolMode)return;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;document.querySelectorAll(".portrait-frame, .portrait-name, .chip, .send-btn").forEach(el=>window.CoolMode.apply(el,{particle:"circle"}))})();

// ============================================================
// BorderBeam · 环绕灯带（Magic UI 移植，与原版 v3 一致）
// 说明：给「经历」三张卡片注入 .border-beam，霓虹光点沿卡片
//       边框循环流动。光点为渐变色：每张卡片一组
//       [内层主色, 外层收尾色]，三组首尾相接构成完整渐变序列。
//       系统开启“减少动态效果”时不注入，无任何装饰。
//       注：灯带只保留这三张卡片，其余板块不再注入。
// ============================================================
(function initBorderBeam(){
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  // 每组 = 一段渐变：[内层主色, 外层收尾色]
  const BEAMS=[
    ["#67e8f9","#8b7bff"], /* 经历 01 · 青 → 靛紫 */
    ["#8b7bff","#a78bfa"], /* 经历 02 · 靛紫 → 薰衣草 */
    ["#a78bfa","#f9a8d4"]  /* 经历 03 · 薰衣草 → 粉 */
  ];
  const beamPaths=new Map();
  document.querySelectorAll(".feature-card").forEach((card,i)=>{
    const beam=document.createElement("span");
    beam.className="border-beam";
    beam.setAttribute("aria-hidden","true");
    const pair=BEAMS[i%BEAMS.length];
    beam.style.setProperty("--beam-a",pair[0]);
    beam.style.setProperty("--beam-b",pair[1]);
    card.appendChild(beam);
  // 光点沿整块卡片边框流动的路径。Chromium 不支持 path() 里的百分比写法，
  // 且 path() 内是用户单位（px），因此按卡片实际尺寸生成 px 路径
  // （沿用原版 0.5% 内缩，让光点中心压在边框线上）。

    const setPath=()=>{const w=card.offsetWidth,h=card.offsetHeight;if(w>0&&h>0){beam.style.offsetPath="path('M "+w*0.005+" "+h*0.005+" L "+w*0.995+" "+h*0.005+" L "+w*0.995+" "+h*0.995+" L "+w*0.005+" "+h*0.995+" L "+w*0.005+" "+h*0.005+"')"}};
    setPath();
    beamPaths.set(beam,setPath);
  });
  const setPathAll=()=>beamPaths.forEach(setPath=>setPath());
  // 窗口尺寸变化（响应式断点切换 / 横竖屏）后重算路径
  let resizeTimer;
  window.addEventListener("resize",()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(setPathAll,150)});
  // 补算：字体加载、响应式断点切换都会改变卡片高度，
  // 只在 resize 时重算会让路径停在旧高度上，故追加以下触发点。
  window.addEventListener("load",setPathAll);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(setPathAll);
  if(window.ResizeObserver){const ro=new ResizeObserver(()=>setPathAll());beamPaths.forEach((_,beam)=>{if(beam.parentElement)ro.observe(beam.parentElement)})}
})();

// ============================================================
// Smooth Cursor · 平滑光标（原版 v3 效果，已恢复）
// 说明：一个紧跟指针的小圆点 + 一个平滑跟随（lerp 0.18）的圆环，
//       悬停可交互元素时放大、按下时收缩；首次移动鼠标后才显形，
//       指针离开文档时隐藏。触摸设备（hover:none）与系统“减少动态
//       效果”下直接不创建，保持零开销。圆点/圆环样式见 style.css。
// ============================================================
(function initSmoothCursor(){
  // 仅在有鼠标（支持 hover）的环境启用
  if(window.matchMedia&&window.matchMedia("(hover: none)").matches)return;
  // 尊重系统“减少动态效果”设置
  if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const dot=document.createElement("div"),ring=document.createElement("div");
  dot.className="cursor-dot";ring.className="cursor-ring";dot.setAttribute("aria-hidden","true");ring.setAttribute("aria-hidden","true");
  document.body.appendChild(dot);document.body.appendChild(ring);
  document.body.classList.add("smooth-cursor");
  let mx=window.innerWidth/2,my=window.innerHeight/2,rx=mx,ry=my;
  // 圆环 lerp 逼近指针，圆点直接跟随
  function loop(){rx+=(mx-rx)*0.18;ry+=(my-ry)*0.18;dot.style.transform="translate("+mx+"px, "+my+"px)";ring.style.transform="translate("+rx+"px, "+ry+"px)";requestAnimationFrame(loop)}
  // 可交互元素：原版列表 + 当前站点的头像/名字（Cool Mode 喷粒子）与相册花瓣
  const INTERACTIVE="a, button, .chip, input, select, textarea, label, .portrait-frame, .portrait-name, .petal";
  window.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;document.body.classList.add("is-active");const target=e.target&&e.target.closest?e.target.closest(INTERACTIVE):null;dot.classList.toggle("is-hover",!!target);ring.classList.toggle("is-hover",!!target)});
  window.addEventListener("mousedown",()=>{dot.classList.add("is-down");ring.classList.add("is-down")});
  window.addEventListener("mouseup",()=>{dot.classList.remove("is-down");ring.classList.remove("is-down")});
  document.addEventListener("mouseleave",()=>document.body.classList.remove("is-active"));
  document.addEventListener("mouseenter",()=>document.body.classList.add("is-active"));
  loop();
})();

// ============================================================
// ContentProtection · 内容保护（右键 / 查看源代码 / 选中 / 图片另存）
// 说明：挡掉随手右键、F12、Ctrl+U、拖选文字、拖拽或长按保存图片，
//       劝退顺手搬走内容与源码的访客。
//       ⚠️ 这只是「威慑」，不是「加密」：页面上的 HTML/CSS/JS 与图片
//       都必须下发给浏览器，访客依然能用 view-source:、开发者工具的
//       菜单入口、抓包或直接下载整个页面拿到完全一样的内容。
//       真正敏感的东西（密钥、隐私数据、业务逻辑）不要放在前端。
// 例外：表单控件里保留右键与选中，否则访客没法粘贴、编辑留言。
// 开关：config.js 的 blockRightClick / blockSelect / blockImageSave
// 样式：选中与拖拽的 CSS 见 style.css 末尾，靠下面加的
//       html.no-select / html.no-drag 两个 class 生效——所以关掉开关时
//       样式会一起失效，不会出现「配置关了却仍被锁死」。
// ============================================================
(function initContentProtection(){
  const cfg=window.SITE_CONFIG||{};
  // 输入区：粘贴、选中编辑、输入法选词都要用到，必须放行
  const EDITABLE="input, textarea, select, [contenteditable], [contenteditable='true']";
  const isEditable=target=>!!(target&&target.closest&&target.closest(EDITABLE));

  // 1. 右键菜单 + 「查看源代码 / 开发者工具」快捷键
  if(cfg.blockRightClick!==false){
    document.addEventListener("contextmenu",e=>{
      if(isEditable(e.target))return;
      e.preventDefault();
    });
    // 只拦这些组合，不影响 Ctrl+C 复制、Ctrl+V 粘贴、Ctrl+A 全选
    document.addEventListener("keydown",e=>{
      const key=(e.key||"").toLowerCase();
      // F12 → 开发者工具
      if(key==="f12"){e.preventDefault();return}
      // Ctrl/Cmd+U 查看源代码、Ctrl/Cmd+S 保存页面
      if((e.ctrlKey||e.metaKey)&&!e.shiftKey&&!e.altKey&&(key==="u"||key==="s")){e.preventDefault();return}
      // Windows/Linux：Ctrl+Shift+I / J / C；macOS：Cmd+Opt+I / J / C
      if((e.ctrlKey&&e.shiftKey&&(key==="i"||key==="j"||key==="c"))||
         (e.metaKey&&e.altKey&&(key==="i"||key==="j"||key==="c"))){e.preventDefault()}
    });
  }

  // 2. 禁止拖选文本（真正的样式在 style.css，靠这个 class 生效；
  //    表单控件由 CSS 例外放行，否则留言框没法编辑）
  if(cfg.blockSelect!==false)document.documentElement.classList.add("no-select");

  // 3. 禁止拖拽 / 长按保存图片
  if(cfg.blockImageSave!==false){
    document.documentElement.classList.add("no-drag");
    // Chrome/Edge/Safari 靠 CSS 的 -webkit-user-drag:none；Firefox 不认该
    // 属性，必须在 dragstart 里拦，否则图片仍能被拖到桌面或地址栏保存。
    // 拖拽目标可能是 <img> 本身，也可能是包着它的 .petal / .portrait-frame，
    // 所以「目标是图片」和「目标里含图片」两种情况都要拦。
    document.addEventListener("dragstart",e=>{
      const t=e.target;
      if(!t)return;
      const isImg=t.tagName==="IMG";
      const holdsImg=!!(t.querySelector&&t.querySelector("img"));
      if(isImg||holdsImg)e.preventDefault();
    });
  }
})();

// ============================================================
// BackgroundMusic · 背景音乐（右下角悬浮开关 + 进站引导气泡）
// 配置：config.js 的 music（开关 / 路径 / 音量 / 文案）
// 样式：style.css 末尾的「背景音乐」一段
//
// 为什么不做「一进站就自动播放」：Chrome / Edge / Safari 都禁止页面在
// 未经用户交互时播放有声媒体，autoplay 必然被拦下。所以这里改成
// 「访客点一下才开始」：点按钮 → 播放；播放成功后把开关状态记进
// localStorage，下次进站尝试续播（若仍被浏览器拦下，就再亮一次气泡引导）。
//
// 容错：音频缺失时（没放文件 / 路径写错 / 格式不支持）不会崩，
//       按钮转为 missing 状态，气泡给出排查提示，控制台打印原因。
// 调试：控制台可用 __BGM.state() / __BGM.play() / __BGM.pause()
// ============================================================
(function initBackgroundMusic(){
  const cfg=(window.SITE_CONFIG||{}).music||{};
  if(cfg.enabled===false)return;
  const dock=document.getElementById("bgm-dock"),btn=document.getElementById("bgm-btn"),audio=document.getElementById("bgm-audio"),hintClose=document.getElementById("bgm-hint-close"),hintTitle=document.getElementById("bgm-hint-title"),hintText=document.getElementById("bgm-hint-text");
  if(!dock||!btn||!audio)return;

  const STORE_ON="csh-bgm-on",STORE_HINT="csh-bgm-hint-done";
  const readStore=key=>{try{return localStorage.getItem(key)}catch(err){return null}};
  const writeStore=(key,val)=>{try{localStorage.setItem(key,val)}catch(err){}};

  // 气泡文案由 config.js 控制，改文案不用动这里的代码
  if(hintTitle&&cfg.title)hintTitle.textContent=cfg.title;
  if(hintText&&cfg.hint)hintText.textContent=cfg.hint;

  const setState=state=>{
    dock.dataset.state=state;
    const playing=state==="playing";
    btn.setAttribute("aria-pressed",playing?"true":"false");
    btn.setAttribute("aria-label",playing?"暂停背景音乐":"播放背景音乐");
  };
  const openHint=()=>dock.classList.add("is-hint-open");
  // remember=true 表示「以后不用再主动弹这条提示了」
  const closeHint=remember=>{dock.classList.remove("is-hint-open");if(remember)writeStore(STORE_HINT,"1")};
  // 音频缺失时的排查提示（站长把文件放对后，访客就再也不会看到它）
  const showMissingHint=()=>{
    if(hintTitle)hintTitle.textContent="还没找到音乐文件";
    if(hintText)hintText.textContent="把 mp3 放到 assets/music/bgm.mp3，或在 config.js 里改 music.src。";
    openHint();
  };
  // 恢复 config.js 里配置的原始气泡文案
  const restoreHint=()=>{
    if(hintTitle&&cfg.title)hintTitle.textContent=cfg.title;
    if(hintText&&cfg.hint)hintText.textContent=cfg.hint;
  };

  const tryPlay=()=>{
    const p=audio.play();
    if(p&&p.catch)p.catch(err=>{
      // NotAllowedError = 浏览器拦截自动播放，属正常现象（等用户点击即可）
      if(!err||err.name!=="NotAllowedError")console.warn("[bgm] 播放失败：",(err&&err.message)||err);
      if(readStore(STORE_HINT)!=="1")openHint();
    });
  };

  // 先绑监听再设 src，否则文件 404 的 error 事件会被漏掉
  audio.addEventListener("playing",()=>{setState("playing");writeStore(STORE_ON,"1");closeHint(true)});
  audio.addEventListener("pause",()=>setState("idle"));
  audio.addEventListener("error",()=>{
    setState("missing");
    console.warn("[bgm] 音频加载失败，确认文件存在且浏览器支持该格式："+(cfg.src||"assets/music/bgm.mp3"));
    showMissingHint();
  });
  // 兜底：之前加载失败后音频又变得可用（换好了文件 / 网络恢复）时，
  // 不能让按钮一直卡在 missing，这里把状态和气泡文案一起放回可播放。
  const revive=()=>{if(dock.dataset.state==="missing"){setState("idle");restoreHint()}};
  audio.addEventListener("loadeddata",revive);
  audio.addEventListener("canplay",revive);

  audio.src=cfg.src||"assets/music/bgm.mp3";
  audio.loop=cfg.loop!==false;
  audio.volume=typeof cfg.volume==="number"?Math.min(1,Math.max(0,cfg.volume)):0.35;

  btn.addEventListener("click",()=>{
    // missing 状态：文件可能刚放好、或上次只是暂时性失败，
    // 这里重新加载并再试一次播放，而不是直接放弃。
    if(dock.dataset.state==="missing"){showMissingHint();audio.load();tryPlay();return}
    if(audio.paused)tryPlay();else audio.pause();
  });
  if(hintClose)hintClose.addEventListener("click",e=>{e.stopPropagation();closeHint(true)});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeHint(false)});
  // 点页面其他地方：只收起气泡、不记住 —— 这次没点，下次进站再提醒一次
  document.addEventListener("click",e=>{
    if(dock.classList.contains("is-hint-open")&&!dock.contains(e.target))closeHint(false);
  });

  // 进站引导：上次开着音乐就先尝试续播，被拦下才弹气泡；
  // 否则首次进站弹气泡引导点击（点过「×」的访客不再打扰）。
  setTimeout(()=>{
    if(dock.dataset.state==="missing")return;
    if(readStore(STORE_ON)==="1"){tryPlay();return}
    if(readStore(STORE_HINT)!=="1")openHint();
  },1200);

  window.__BGM={audio,play:tryPlay,pause:()=>audio.pause(),state:()=>dock.dataset.state};
})();

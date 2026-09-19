// ============================================================
// 站点文案字典（i18n）
//
// 用法（见 assets/lang.js）：
//   <p data-i18n="key">            → 替换 textContent
//   <p data-i18n-html="key">       → 替换 innerHTML（值里带 <br> / <em> / <small> 时用）
//   <input data-i18n-attr="placeholder:key;aria-label:key2">
//                                  → 替换属性（分号分隔，冒号前是属性名）
//   <button data-i18n-q="key">     → 替换 data-q（数字分身的快捷提问）
//
// 加新文案：在下面 zh / en 里各加一条同名 key，再到 HTML 上标属性即可。
// 只被 JS 用的 key（数组、运行时提示）统一以 js. 开头。
// ============================================================
window.SITE_I18N = {
  zh: {
    // ---------- <head> ----------
    "meta.title": "崇施涵 · 天津大学 | 个人主页",
    "meta.description": "崇施涵的个人主页：天津大学计算机科学与技术专业在读，正在高数、英语和 AI 应用三线推进。站内有学习经历、生活相册，还有一个纯前端本地知识库「数字分身」，可以直接向它提问。",
    "meta.ogTitle": "崇施涵 · 天津大学 | 个人主页",
    "meta.ogDescription": "天津大学计算机科学与技术专业在读，正在高数、英语和 AI 应用三线推进。站内有一个纯前端本地知识库「数字分身」，可以直接向它提问。",
    "meta.ogImageAlt": "崇施涵的个人主页封面",
    "meta.ogLocale": "zh_CN",
    "site.name": "崇施涵",

    // ---------- 无障碍与导航 ----------
    "a11y.skipToMain": "跳到主要内容",
    "a11y.backHome": "返回首页",
    "a11y.mainNav": "主导航",
    "a11y.contact": "跳到联系方式",
    "nav.about": "关于",
    "nav.journey": "经历",
    "nav.gallery": "相册",
    "nav.chat": "数字分身",
    "nav.feedback": "反馈",
    "nav.contact": "联系我",

    // ---------- 首屏 ----------
    "hero.title": "探索<span>未知，</span><br />创造<span>可能。</span>",
    "hero.intro": "崇施涵，天津大学计算机科学与技术专业，平时在深圳学习。<br />正在高数、英语和 AI 应用三线推进，也热爱音乐、羽毛球、二次元与围棋。",
    "hero.typed": "主攻 AI 应用",
    "hero.ctaPrimary": "认识我",
    "hero.ctaSecondary": "浏览相册",

    // ---------- 关于 ----------
    "about.title": "用技术把想法变成<br /><em>真实、可见的作品。</em>",
    "about.copy": "我相信学习最好的方式就是持续创造。从第一行代码到完整的个人网站，我正在一点点建立自己的数字世界。",
    "about.cta": "和数字分身聊聊",

    // ---------- 能力卡片 ----------
    "work.lead.title": "AI 应用<br />与创造力",
    "work.lead.copy": "探索人工智能如何帮助人更高效地表达、学习和创造，把新技术做成真正能用的产品。",
    "work.build.title": "个人主页",
    "work.build.copy": "不断迭代设计、交互与内容，让主页成为持续生长的数字名片。",
    "work.learn.title": "编程与英语",
    "work.learn.copy": "HTML / CSS、JavaScript、Python、Supabase，以及面向未来的表达能力。",

    // ---------- 经历 ----------
    "journey.title": "怎么一步步<br /><em>走到现在。</em>",
    "journey.desc": "学校课程之外，基本靠想做点什么时现学。<br />每一版都留在本地，看得见进步。",
    "journey.1.stage": "起点",
    "journey.1.title": "先让想法变成能看的东西",
    "journey.1.copy": "从 HTML 和 CSS 起手：标签、盒模型、Flex、Grid，一点点折腾出第一版能看的个人主页。现在回头看很粗糙，但那是起点。",
    "journey.2.title": "让它好看，也让它动起来",
    "journey.2.copy": "补上响应式断点、滚动进场动画、花瓣式相册与灯箱，同时把字体换成本地托管，不再依赖外部 CDN。",
    "journey.3.title": "接上数据库与数字分身",
    "journey.3.copy": "用 Supabase 做了带 RLS 权限的反馈系统，又加上纯前端的数字分身——现在它应付得了五十多个问题，答不上来还会推荐你换个问法。",
    "journey.4.title": "补齐「上线之后才想起来」的细节",
    "journey.4.copy": "分享卡片、站点图标、结构化数据与 SEO 一并补上。从这一版起，主页才真正像一张对外的名片，而不只是作业。",
    "journey.5.stage": "现在 · V11",
    "journey.5.title": "更轻、更稳，也更好读",
    "journey.5.copy": "V5 起给照片瘦身（WebP + 三级清晰度），V9 把字体按站点用字本地子集化，V10 加上 Service Worker——断网也能打开。V11 收掉了一批满屏自动流动的装饰，把偏暗的小字提亮到无障碍标准之上：主页更安静、也更好读的同时，高数、英语、AI 应用三线同步推进。",

    // ---------- 能力矩阵 ----------
    "skills.title": "持续进化的<br /><em>能力矩阵。</em>",
    "skills.4.name": "AI 应用",

    // ---------- 正在做 ----------
    "now.title": "最近在做的<br /><em>三件事。</em>",
    "now.desc": "时间基本都花在这三件事上，<br />主页是顺手练手的地方。",
    "now.badge": "进行中",
    "now.1.title": "高数",
    "now.1.copy": "必修课，躲不掉。微积分和线性代数先学明白，不然后面难的课容易跟不上。",
    "now.2.title": "英语",
    "now.2.copy": "为了以后出国读书。想练到能自己看懂英文资料、能跟人正常交流，不用总等别人翻译。",
    "now.3.title": "AI 应用",
    "now.3.copy": "最想做下去的一件事。接着学 Python 和 AI 开发，希望能做出一个真有人用的小工具。",
    "now.foot": "这三件事也写进了下面的数字分身，问它「你最近在做什么」，回答跟这里一样。",

    // ---------- 相册 ----------
    "gallery.title": "生活的切片。",
    "gallery.desc": "九张照片围成一朵花。<br />点击任意一张可放大查看。",
    "gallery.alt1": "相册照片 1",
    "gallery.alt2": "相册照片 2",
    "gallery.alt3": "相册照片 3",
    "gallery.alt4": "相册照片 4",
    "gallery.alt5": "相册照片 5",
    "gallery.alt6": "相册照片 6",
    "gallery.alt7": "相册照片 7",
    "gallery.alt8": "相册照片 8",
    "gallery.alt9": "相册照片 9",

    // ---------- 数字分身 ----------
    "chat.title": "想了解更多？<br /><em>直接问我。</em>",
    "chat.copy": "数字分身是我的一本本地小抄：学习、AI、经历、作品、兴趣、联系方式、这站怎么做出来的，都能问。<br /><small class=\"chat-note\">纯前端本地知识库 · 不联网 · 不收集任何信息</small>",
    "chat.quick.study": "学习",
    "chat.quick.work": "作品",
    "chat.quick.hobby": "兴趣",
    "chat.quick.contact": "联系",
    "chat.clear": "清空",
    "chat.clearTitle": "清空对话，重新开始",
    "chat.placeholder": "输入你的问题…",
    "chat.send": "发送 ↗",
    "chat.chip.who": "你是谁？",
    "chat.chip.major": "在学什么？",
    "chat.chip.recent": "最近在做什么？",
    "chat.chip.site": "这站怎么做的？",
    "chat.chip.project": "还做过什么？",
    "chat.chip.skill": "技能怎么样？",
    "chat.chip.hobby": "有什么兴趣？",
    "chat.chip.music": "听什么音乐？",
    "chat.chip.badminton": "羽毛球怎么样？",
    "chat.chip.go": "会下围棋吗？",
    "chat.chip.contact": "怎么联系你？",
    "chat.chip.help": "能帮我做个网站吗？",
    "chat.chip.real": "你是真人吗？",
    // 快捷提问点下去真正发给数字分身的句子（data-q）。
    // app.js 靠这句反查知识库，所以每个值都要和 app.js 里对应条目的 ask 一致。
    "chat.chipq.who": "你是谁？",
    "chat.chipq.major": "你在学什么？",
    "chat.chipq.recent": "你最近在做什么？",
    "chat.chipq.site": "这网站怎么做出来的？",
    "chat.chipq.project": "你还做过什么？",
    "chat.chipq.skill": "你的技能怎么样？",
    "chat.chipq.hobby": "你有什么兴趣？",
    "chat.chipq.music": "你喜欢听什么音乐？",
    "chat.chipq.badminton": "你打羽毛球厉害吗？",
    "chat.chipq.go": "你会下围棋吗？",
    "chat.chipq.contact": "怎么联系你？",
    "chat.chipq.help": "能帮我做一个网站吗？",
    "chat.chipq.real": "你是真人吗？",

    // ---------- 反馈 ----------
    "feedback.title": "你的想法，<br /><em>会让这里更好。</em>",
    "feedback.honeyLabel": "网站",
    "feedback.name": "姓名",
    "feedback.namePlaceholder": "怎么称呼你？",
    "feedback.relation": "关系",
    "feedback.relationPlaceholder": "请选择",
    "feedback.relation.classmate": "同学",
    "feedback.relation.friend": "朋友",
    "feedback.relation.teacher": "老师",
    "feedback.relation.colleague": "同事",
    "feedback.relation.family": "家人",
    "feedback.relation.other": "其他",
    "feedback.message": "留言",
    "feedback.messagePlaceholder": "想对我说什么？",
    "feedback.submit": "提交反馈",
    "feedback.note": "留言只有我能看到，不会公开；同一台设备一分钟内只能提交一次。",

    // ---------- 页脚 ----------
    "footer.copyMail": "复制邮箱",

    // ---------- 背景音乐 ----------
    "bgm.hintClose": "不再提示",
    "bgm.hintTitle": "点一下，边听边逛",
    "bgm.hintText": "右下角这个按钮可以随时暂停",
    "bgm.btnPlay": "播放背景音乐",
    "bgm.btnPause": "暂停背景音乐",
    "bgm.missingTitle": "还没找到音乐文件",
    "bgm.missingText": "把 mp3 放到 assets/music/bgm.mp3，或在 config.js 里改 music.src。",

    // ---------- 语言切换按钮 ----------
    "lang.toggle": "EN",
    "lang.toggleLabel": "切换到英文版",

    // ---------- 运行时提示（JS 用） ----------
    "js.welcome": "你好呀！我是崇施涵的数字分身，关于学习、AI、兴趣都可以问我～",
    "js.fallback": "这个问题超出我的小抄范围了（我是一页不联网的本地知识库，不是万能 AI）。要不咱换个方向——下面这几个我保证答得上来。",
    "js.fallbackFollowups": ["你是谁？", "你最近在做什么？", "你会做什么？", "怎么联系你？"],
    "js.typed": ["高数 · 英语 · AI 应用", "练习编程中", "听着音乐学习", "会打羽毛球", "爱看二次元", "把主页迭代到 V4"],
    "js.lightbox.label": "照片查看",
    "js.lightbox.close": "关闭",
    "js.lightbox.prev": "上一张",
    "js.lightbox.next": "下一张",
    "js.lightbox.loading": "载入中… ",
    "js.lightbox.zoom": "放大查看：",
    "js.lightbox.photo": "照片",
    "js.copy.done": "已复制到剪贴板",
    "js.copy.fail": "复制失败，可手动选中",
    "js.fb.ok": "收到，谢谢你的反馈。",
    "js.fb.incomplete": "请把姓名、关系和留言填写完整。",
    "js.fb.rate": "刚提交过啦，等一分钟再发下一条吧。",
    "js.fb.notConfigured": "反馈功能正在配置中，你也可以直接给我发邮件。",
    "js.fb.submitting": "提交中…",
    "js.fb.fail": "提交失败，请稍后再试。"
  },

  en: {
    // ---------- <head> ----------
    "meta.title": "Chong Shihan · Tianjin University | Personal Homepage",
    "meta.description": "The personal homepage of Chong Shihan — studying Computer Science at Tianjin University, currently pushing on three fronts: calculus, English, and AI applications. Includes a learning timeline, a photo gallery, and a purely front-end 'digital twin' you can ask questions.",
    "meta.ogTitle": "Chong Shihan · Tianjin University | Personal Homepage",
    "meta.ogDescription": "Studying Computer Science at Tianjin University, currently pushing on calculus, English, and AI applications. There's a purely front-end 'digital twin' on the site you can ask questions.",
    "meta.ogImageAlt": "Chong Shihan's personal homepage cover",
    "meta.ogLocale": "en_US",
    "site.name": "Chong Shihan",

    // ---------- 无障碍与导航 ----------
    "a11y.skipToMain": "Skip to main content",
    "a11y.backHome": "Back to top",
    "a11y.mainNav": "Main navigation",
    "a11y.contact": "Jump to contact info",
    "nav.about": "About",
    "nav.journey": "Journey",
    "nav.gallery": "Gallery",
    "nav.chat": "Digital Twin",
    "nav.feedback": "Feedback",
    "nav.contact": "Contact me",

    // ---------- 首屏 ----------
    "hero.title": "Exploring the <span>unknown,</span><br />building what's <span>possible.</span>",
    "hero.intro": "I'm Chong Shihan, studying Computer Science at Tianjin University while based in Shenzhen.<br />Currently pushing on three fronts — calculus, English, and AI applications — with music, badminton, anime, and Go on the side.",
    "hero.typed": "Focused on AI applications",
    "hero.ctaPrimary": "About me",
    "hero.ctaSecondary": "Browse the gallery",

    // ---------- 关于 ----------
    "about.title": "Turning ideas into<br /><em>real, visible work.</em>",
    "about.copy": "I believe the best way to learn is to keep building. From my first line of code to a complete personal site, I'm slowly constructing my own digital world.",
    "about.cta": "Talk to my digital twin",

    // ---------- 能力卡片 ----------
    "work.lead.title": "AI applications<br />and creativity",
    "work.lead.copy": "Exploring how AI helps people express, learn, and create more efficiently — and turning new tech into products that actually get used.",
    "work.build.title": "This homepage",
    "work.build.copy": "Iterating on design, interaction, and content so the site keeps growing into a living digital business card.",
    "work.learn.title": "Code and English",
    "work.learn.copy": "HTML / CSS, JavaScript, Python, Supabase — plus the communication skills the future will ask for.",

    // ---------- 经历 ----------
    "journey.title": "How I got<br /><em>here, step by step.</em>",
    "journey.desc": "Outside of coursework, I mostly learn by building whatever I feel like making.<br />Every version is kept locally, so the progress is visible.",
    "journey.1.stage": "The start",
    "journey.1.title": "Making ideas visible first",
    "journey.1.copy": "Started with HTML and CSS — tags, the box model, Flex, Grid — until the first presentable homepage appeared. It looks rough in hindsight, but that was the starting point.",
    "journey.2.title": "Making it look good, then making it move",
    "journey.2.copy": "Added responsive breakpoints, scroll-in animations, the petal gallery with a lightbox, and moved fonts to local hosting instead of an external CDN.",
    "journey.3.title": "Wiring up a database and a digital twin",
    "journey.3.copy": "Built a feedback system on Supabase with row-level security, then added a purely front-end digital twin — it now handles 50-plus questions and suggests another angle when it can't answer.",
    "journey.4.title": "Filling in the after-launch details",
    "journey.4.copy": "Share cards, favicons, structured data, and SEO all came next. From this version on, the site finally felt like a public calling card rather than homework.",
    "journey.5.stage": "Now · V11",
    "journey.5.title": "Lighter, steadier, easier to read",
    "journey.5.copy": "From V5 I started slimming photos down (WebP at three quality tiers), V9 subsetted the fonts to the characters this site actually uses, and V10 added a Service Worker so the page opens offline. V11 retired a batch of full-screen auto-flowing decorations and lifted the dimmest small text above accessibility thresholds — the page is quieter and easier to read, while calculus, English, and AI work all move forward in parallel.",

    // ---------- 能力矩阵 ----------
    "skills.title": "A skill set<br /><em>still evolving.</em>",
    "skills.4.name": "AI Applications",

    // ---------- 正在做 ----------
    "now.title": "Three things<br /><em>I'm working on.</em>",
    "now.desc": "These three take up most of my time;<br />the homepage is where I practice along the way.",
    "now.badge": "In progress",
    "now.1.title": "Calculus",
    "now.1.copy": "A required course, no way around it. Get calculus and linear algebra solid first, or the harder courses later will be rough.",
    "now.2.title": "English",
    "now.2.copy": "For studying abroad later. I want to read English material on my own and hold a real conversation instead of always waiting on a translation.",
    "now.3.title": "AI Applications",
    "now.3.copy": "The one I most want to keep going. Next up is more Python and AI development, hopefully ending in a small tool that people actually use.",
    "now.foot": "These three also live in the digital twin below — ask it 'what are you up to lately' and you'll get the same answer.",

    // ---------- 相册 ----------
    "gallery.title": "Slices of life.",
    "gallery.desc": "Nine photos arranged in a flower.<br />Click any one to enlarge it.",
    "gallery.alt1": "Gallery photo 1",
    "gallery.alt2": "Gallery photo 2",
    "gallery.alt3": "Gallery photo 3",
    "gallery.alt4": "Gallery photo 4",
    "gallery.alt5": "Gallery photo 5",
    "gallery.alt6": "Gallery photo 6",
    "gallery.alt7": "Gallery photo 7",
    "gallery.alt8": "Gallery photo 8",
    "gallery.alt9": "Gallery photo 9",

    // ---------- 数字分身 ----------
    "chat.title": "Want to know more?<br /><em>Just ask me.</em>",
    "chat.copy": "The digital twin is my local cheat sheet: ask about my studies, AI, background, projects, hobbies, contact info, or how this site was built.<br /><small class=\"chat-note\">Pure front-end knowledge base · No network calls · Nothing collected</small>",
    "chat.quick.study": "Study",
    "chat.quick.work": "Work",
    "chat.quick.hobby": "Interests",
    "chat.quick.contact": "Contact",
    "chat.clear": "Clear",
    "chat.clearTitle": "Clear the conversation and start over",
    "chat.placeholder": "Type your question…",
    "chat.send": "Send ↗",
    "chat.chip.who": "Who are you?",
    "chat.chip.major": "What are you studying?",
    "chat.chip.recent": "What are you up to lately?",
    "chat.chip.site": "How was this site built?",
    "chat.chip.project": "What else have you built?",
    "chat.chip.skill": "How are your skills?",
    "chat.chip.hobby": "What are your hobbies?",
    "chat.chip.music": "What music do you like?",
    "chat.chip.badminton": "Do you play badminton?",
    "chat.chip.go": "Do you play Go?",
    "chat.chip.contact": "How can I reach you?",
    "chat.chip.help": "Can you build me a website?",
    "chat.chip.real": "Are you a real person?",
    // The exact sentences the quick-ask chips send (data-q). app.js looks the
    // knowledge base up by this text, so each value must equal the matching
    // entry's `ask` in assets/twin-en.js.
    "chat.chipq.who": "Who are you?",
    "chat.chipq.major": "What are you studying?",
    "chat.chipq.recent": "What are you up to lately?",
    "chat.chipq.site": "How was this site built?",
    "chat.chipq.project": "What else have you built?",
    "chat.chipq.skill": "How are your skills?",
    "chat.chipq.hobby": "What are your hobbies?",
    "chat.chipq.music": "What music do you like?",
    "chat.chipq.badminton": "Do you play badminton?",
    "chat.chipq.go": "Do you play Go?",
    "chat.chipq.contact": "How can I reach you?",
    "chat.chipq.help": "Can you build me a website?",
    "chat.chipq.real": "Are you a real person?",

    // ---------- 反馈 ----------
    "feedback.title": "Your feedback<br /><em>makes this better.</em>",
    "feedback.honeyLabel": "Website",
    "feedback.name": "Name",
    "feedback.namePlaceholder": "What should I call you?",
    "feedback.relation": "Relation",
    "feedback.relationPlaceholder": "Select…",
    "feedback.relation.classmate": "Classmate",
    "feedback.relation.friend": "Friend",
    "feedback.relation.teacher": "Teacher",
    "feedback.relation.colleague": "Colleague",
    "feedback.relation.family": "Family",
    "feedback.relation.other": "Other",
    "feedback.message": "Message",
    "feedback.messagePlaceholder": "What's on your mind?",
    "feedback.submit": "Send feedback",
    "feedback.note": "Only I can see your message — it is never published. One submission per device per minute.",

    // ---------- 页脚 ----------
    "footer.copyMail": "Copy email",

    // ---------- 背景音乐 ----------
    "bgm.hintClose": "Don't show again",
    "bgm.hintTitle": "Tap to play while you browse",
    "bgm.hintText": "That button at the bottom right pauses it anytime",
    "bgm.btnPlay": "Play background music",
    "bgm.btnPause": "Pause background music",
    "bgm.missingTitle": "Music file not found",
    "bgm.missingText": "Put an mp3 at assets/music/bgm.mp3, or change music.src in config.js.",

    // ---------- 语言切换按钮 ----------
    "lang.toggle": "中文",
    "lang.toggleLabel": "Switch to Chinese",

    // ---------- 运行时提示（JS 用） ----------
    "js.welcome": "Hi! I'm Chong Shihan's digital twin. Ask me about his studies, AI, or hobbies.",
    "js.fallback": "That's outside my cheat sheet — I'm a local knowledge base with no network access, not a general-purpose AI. Let's try another angle: I can definitely answer these.",
    "js.fallbackFollowups": ["Who are you?", "What are you up to lately?", "What can you do?", "How can I reach you?"],
    "js.typed": ["Calculus · English · AI apps", "Practicing code", "Studying with music on", "Plays badminton", "Into anime", "Iterating this site"],
    "js.lightbox.label": "Photo viewer",
    "js.lightbox.close": "Close",
    "js.lightbox.prev": "Previous photo",
    "js.lightbox.next": "Next photo",
    "js.lightbox.loading": "Loading… ",
    "js.lightbox.zoom": "Zoom in: ",
    "js.lightbox.photo": "Photo",
    "js.copy.done": "Copied to clipboard",
    "js.copy.fail": "Copy failed — please select manually",
    "js.fb.ok": "Got it — thanks for the feedback.",
    "js.fb.incomplete": "Please fill in your name, relation, and message.",
    "js.fb.rate": "Just submitted — give it a minute before the next one.",
    "js.fb.notConfigured": "Feedback isn't configured yet — you can email me directly.",
    "js.fb.submitting": "Sending…",
    "js.fb.fail": "Submission failed — please try again later."
  }
};

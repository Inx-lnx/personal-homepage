// ============================================================
// 站点配置（前端可公开的配置）
//
// ⚠️ 安全说明：
//   - 这里只放「设计上允许公开」的配置，即 Supabase 的 匿名密钥(anon key)。
//     新版 Supabase 把它改叫「Publishable key」，值以 sb_publishable_ 开头，两者相同含义。
//   - 匿名密钥是公开安全的，真正控制权限的是数据库的 RLS 策略（见 supabase/schema.sql）。
//   - 绝对不要把 service_role 密钥 / 数据库密码 / 私有 token 放进这里或任何仓库文件！
// ============================================================
window.SITE_CONFIG = {
  supabaseUrl: "https://hdlerlnlmzovzgrbzarm.supabase.co",
  supabaseAnonKey: "sb_publishable_At8kMsMlPWUJXwwc2YJSoA_ZEoGrLDp",

  // ---- 内容保护开关（实现见 app.js 的 initContentProtection、样式见 style.css 末尾）----
  // 说明：以下都是「威慑」，不是「加密」——页面上的 HTML/CSS/JS 与图片必须下发给
  //       浏览器，访客仍可通过 view-source:、开发者工具菜单、抓包或直接下载页面
  //       拿到同样内容。把某一项设为 false 即可单独关闭它。
  blockRightClick: true,  // 右键菜单 + F12 / Ctrl+U / Ctrl+S / Ctrl+Shift+I·J·C 等查看源代码入口
  blockSelect: true,      // 禁止鼠标拖选文本（表单输入框自动例外，否则无法编辑留言）
  blockImageSave: true,   // 禁止拖拽图片，以及长按 / 右键另存图片

  // ---- 背景音乐（实现见 app.js 的 initBackgroundMusic，样式见 style.css 末尾）----
  // 用法：把你的 mp3 放进 assets/music/ 目录。
  //       默认约定文件名就是 bgm.mp3，所以直接改名成 bgm.mp3 丢进去即可，不用改代码；
  //       想用别的文件名，改下面的 src 就行（路径相对 index.html）。
  // 说明：浏览器禁止页面在「没有任何用户交互」时自动播放有声媒体，
  //       所以这里不做强行自动播放 —— 访客点一下右下角按钮才开始播，
  //       开关状态会记在 localStorage，下次进站尝试接着播。
  music: {
    enabled: true,                      // 设 false 可整体关掉背景音乐（按钮和气泡都不出现）
    src: "assets/music/bgm.mp3",        // 音频文件路径（相对 index.html）
    volume: 0.35,                       // 初始音量，0 ~ 1（背景音乐建议不要超过 0.5）
    loop: true,                         // 是否循环播放
    title: "点一下，边听边逛",           // 进站引导气泡的标题
    hint: "右下角这个按钮可以随时暂停"    // 进站引导气泡的说明文字
  }
};

// 是否已配置 Supabase（未配置时表单提交会提示“正在配置中”）
window.SITE_CONFIG.isConfigured =
  window.SITE_CONFIG.supabaseUrl.indexOf("YOUR_") !== 0 &&
  window.SITE_CONFIG.supabaseAnonKey.indexOf("YOUR_") !== 0;

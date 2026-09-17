// ============================================================
// 数字分身 · 本地知识库（纯前端：不联网、不收集、不上传任何信息）
//
// 想改回答内容，只需要改下面这一张表，每条形如：
//   { id:"who",                          // 唯一标识，追问按钮用它定位
//     ask:"你是谁？",                     // 自然问法：输入联想 + 未命中时的推荐问题
//     keys:["你是谁","你的名字"],          // 命中词：访客问题里出现任意一个就算命中
//     answer:"……",                       // 回答（纯文本；邮箱/网址会自动变成可点链接）
//     followups:["你最近在做什么？"] }     // 答完推荐接着问的问题（可省略）
//
// 匹配规则（见 matchEntry）：命中的关键词越长、命中数量越多 → 得分越高。
//   所以「你最近在做什么」不会被「你是谁」抢走。
// 一条都没命中 → 用 FALLBACK 回答，并推荐几个「肯定答得上」的问题。
// ============================================================
const TWIN_KB=[
/* ---------- 关于我 ---------- */
{id:"greet",ask:"你好",keys:["你好","您好","hi","hello","嗨","在吗","在不在"],answer:"你好呀！我是崇施涵的数字分身，也就是他的「小抄版」。学习、AI、兴趣、这站怎么做出来的，都能问——问倒我算你厉害。"},
{id:"who",ask:"你是谁？",keys:["你是谁","你的名字","你叫什么","自我介绍","介绍一下你","你是什么","你是干啥的"],answer:"我叫崇施涵，一个正在学计算机的大学生。真人版目前人在天津，主攻 AI 应用，业余三件套是音乐、羽毛球和二次元。",followups:["你在学什么？","你最近在做什么？","怎么联系你？"]},
{id:"real",ask:"你是真人吗？",keys:["你是真人吗","你是人吗","你是不是人","你是ai吗","你是不是ai","你是机器人吗","你是程序吗","你是数字人吗","你是假的吗","你是谁做的"],answer:"我是数字分身，是崇施涵用一页本地知识库手搓出来的「嘴替」——不联网，也不偷偷记下你问了什么。真人版得靠他自己回你消息。",followups:["你是谁？","这网站怎么做出来的？","怎么联系你？"]},
{id:"school",ask:"你在哪个学校？",keys:["学校","哪个大学","在哪读书","读哪个学校","哪个学校","天大","天津大学"],answer:"天津大学，计算机科学与技术专业。校区就在天津，风大是真的，但该写的代码一行都不会少。",followups:["你在学什么？","你在哪个城市？","你最近在做什么？"]},
{id:"city",ask:"你在哪个城市？",keys:["哪个城市","在哪座城市","你在哪里","天津吗","哪个地方"],answer:"人在天津：风大、煎饼果子香、宿舍网速看运气。不过这三点都不影响我写代码。",followups:["你在哪个学校？","你最近在做什么？","你有什么兴趣？"]},
{id:"major",ask:"你在学什么？",keys:["学什么","学的是","专业","课程","在学","学的啥","学哪些","学什么专业","计算机科学与技术"],answer:"计算机科学与技术专业，主攻 AI 应用。现在手上的组合是 HTML / CSS、JavaScript、Python 和 Supabase——每样都还在「会用」通往「用得溜」的路上。",followups:["你的技能怎么样？","你最近在做什么？","你还做过什么？"]},
{id:"focus",ask:"你主攻什么方向？",keys:["主攻","主攻方向","方向","专注","研究什么","你的目标","专长"],answer:"主攻 AI 应用：琢磨怎么让 AI 帮人更快地表达、学习和创造，然后把这些想法做成真正能点开用的东西，而不是只躺在收藏夹里。",followups:["你最近在做什么？","你的技能怎么样？","你还做过什么？"]},
{id:"recent",ask:"你最近在做什么？",keys:["最近","在做什么","在忙","忙什么","最近在忙","最近怎么样","最近好吗","近来","干嘛呢"],answer:"最近主要忙两件事：一是持续迭代这个个人主页（从 V1 折腾到现在），二是学编程和英语。白天写代码、晚上背单词，属于「两头都想抓」。",followups:["这网站怎么做出来的？","你的技能怎么样？","你接下来打算做什么？"]},
{id:"skill",ask:"你的技能怎么样？",keys:["擅长","技能","会哪些","会什么技术","会哪些技术","掌握","水平怎么样","会写代码吗","会开发吗"],answer:"按主页上的自评：HTML / CSS 72%、Python 65%、JavaScript 60%、AI 应用 55%。分数不吹高，因为每样都还有明显的下一个台阶要爬。",followups:["你在学什么？","你还做过什么？","你用什么工具写代码？"]},
{id:"html",ask:"你的 HTML / CSS 怎么样？",keys:["html","css","前端","会写页面吗","做网页","样式"],answer:"HTML / CSS 是我最熟的一环（自评 72%）：这整站就是手写的，没框架、没构建工具。所谓个人风格，其实就是把审美一点点敲进样式表里。",followups:["这网站怎么做出来的？","你的技能怎么样？","你还做过什么？"]},
{id:"python",ask:"你的 Python 怎么样？",keys:["python","py写的","爬虫","脚本","数据处理"],answer:"Python 大约 65%，主要拿来写小工具和折腾 AI。比如这页的背景音乐就是我用 Python 生成的——不是下载的，是自己算出来的。",followups:["背景音乐是哪来的？","这网站怎么做出来的？","你的技能怎么样？"]},
{id:"js",ask:"你的 JavaScript 怎么样？",keys:["javascript","js怎么样","js会吗","js水平","js是"],answer:"JavaScript 大约 60%，够用来到处加特效：你现在看到的这一个聊天框、相册灯箱、打字机效果都是一行行写的。属于「能跑，但每次都能发现更优雅的写法」。",followups:["这网站怎么做出来的？","你的技能怎么样？","你还做过什么？"]},
{id:"ai",ask:"你怎么看 AI？",keys:["ai应用","人工智能","怎么用ai","怎么看ai","对ai的看法","你怎么看ai","ai水平","会训练模型吗","大模型","机器学习","ai是什么"],answer:"AI 应用是我的主攻方向（自评 55%，还在爬坡）。我更想做的是「把 AI 用起来」——让它帮我更快地把想法变成能用的东西，不只是围观它聊天。",followups:["你主攻什么方向？","你最近在做什么？","这网站怎么做出来的？"]},
/* ---------- 作品与这站 ---------- */
{id:"project",ask:"你还做过什么？",keys:["做过什么","作品","项目","做过哪些","做过什么项目","写过什么","你的作品"],answer:"目前最完整的一件作品就是你正在看的这个主页：纯手写 HTML / CSS / JS，从 V1 迭代到现在，集齐数字分身、相册、反馈、背景音乐和各种特效。下一个想做的还在攒想法。",followups:["这网站怎么做出来的？","你接下来打算做什么？","你的技能怎么样？"]},
{id:"site",ask:"这网站怎么做出来的？",keys:["这网站","这站","主页怎么","网站怎么做","怎么做的","怎么搭建","做这个网站","主页是怎么","为什么做网站","建站","这个网页"],answer:"纯静态手写站：HTML + CSS + 原生 JavaScript，没有框架、没有构建工具，改完文件传到 GitHub Pages 就能访问。数字分身、相册灯箱、反馈表单、背景音乐都是自己一点点加进去的。",followups:["用了什么技术？","网站还会更新吗？","能帮我做一个吗？"]},
{id:"stack",ask:"用了什么技术？",keys:["技术栈","用什么写的","用了什么","什么框架","vue","react","后端是什么","数据库","supabase"],answer:"前端 HTML / CSS / 原生 JS，零框架——属于「右键看一眼源码也能看懂」的那种。后端只借了 Supabase 存访客反馈（数据库允许匿名写、不允许读），托管在 GitHub Pages，域名和 HTTPS 都是白送的。",followups:["这网站怎么做出来的？","反馈去哪了？","网站还会更新吗？"]},
{id:"vibe",ask:"Vibe Coding 是什么？",keys:["vibe","氛围编程","ai写代码","ai帮我写","ai辅助"],answer:"Vibe Coding 就是把 AI 当搭子一起写代码：我出想法和判断，它出草稿和体力活。这站不少细节就是这么磨出来的——但「要不要这么做」还是我自己拍板。",followups:["这网站怎么做出来的？","你怎么看 AI？","你最近在做什么？"]},
{id:"update",ask:"网站还会更新吗？",keys:["还会更新","下一版","更新吗","以后会","下个版本","新版","v4","第几版","几个版本"],answer:"会，这站是「持续生长」型的：V1 到 V3 已经比第一版胖了好几圈，下一步想继续扩充数字分身的内容、再打磨交互细节。有想法随时用页面底部的反馈表单丢给我。",followups:["这网站怎么做出来的？","我可以给你反馈吗？","你接下来打算做什么？"]},
{id:"help",ask:"能帮我做一个网站吗？",keys:["帮我做","能不能做","接单","帮我写","给我做一个","教我做一个","帮我也做"],answer:"有具体想法的话，欢迎发邮件聊：sora291933347@tju.edu.cn。不过先说句实话——我目前还在学习阶段，接不了正经项目，但「一起研究怎么做」这种事我很乐意。",followups:["怎么联系你？","你用什么工具写代码？","这网站怎么做出来的？"]},
{id:"gallery",ask:"相册里是什么？",keys:["相册","照片","图片","九张","拍的"],answer:"九张照片围成一朵花，点开任意一张能放大看——基本都是生活和随手拍的碎片。具体是猫还是风景，你自己点开看看，比我说得好听。",followups:["你有什么兴趣？","这网站怎么做出来的？","你平时都在干嘛？"]},
{id:"bgm",ask:"背景音乐是哪来的？",keys:["背景音乐","bgm","这首歌","曲子","钢琴曲","那首音乐"],answer:"右下角那首钢琴 + 小提琴，是我用 Python 脚本生成的原创曲子：A 小调、60 BPM、约两分十三秒，旋律自己写，音色用真实采样渲染，没有版权问题。点右下角按钮就能听。",followups:["你的 Python 怎么样？","你有什么兴趣？","这网站怎么做出来的？"]},
{id:"feedback",ask:"我可以给你反馈吗？",keys:["反馈","留言","建议","意见","评价一下","提意见","提建议"],answer:"当然可以！页面底部就有反馈表单，填个称呼、关系和想说的话就行，会直接进我的数据库。你说得越具体，下一版改动的优先级就越高。",followups:["网站还会更新吗？","怎么联系你？","你是谁？"]},
{id:"source",ask:"我能看源码吗？",keys:["看源码","源码","源代码","代码能看","抄作业","抄袭","复制代码"],answer:"能看，但先说清楚：你能抄走代码，抄不走「为什么这么写」。另外右键和 F12 被我礼貌性挡了一层，只是劝退不是加密——真想学，不如直接问我怎么实现的。",followups:["这网站怎么做出来的？","用了什么技术？","能帮我做一个吗？"]},
{id:"github",ask:"你有 GitHub 吗？",keys:["github","开源","代码托管","仓库","源码在哪","项目地址","git"],answer:"有，这站的源码就在 GitHub 上，用 GitHub Pages 免费托管。顺着这个主页的网址去搜，很容易找到对应仓库。",followups:["我能看源码吗？","这网站怎么做出来的？","怎么联系你？"]},
/* ---------- 兴趣与生活 ---------- */
{id:"hobby",ask:"你有什么兴趣？",keys:["兴趣","爱好","喜欢什么","平时喜欢","喜欢干什么","玩什么"],answer:"音乐、羽毛球、二次元三件套。翻译一下就是：一边听歌一边打球，打完回家看番——体力活和脑力活轮着来。",followups:["你喜欢听什么音乐？","你打羽毛球吗？","你喜欢哪些番？"]},
{id:"music",ask:"你喜欢听什么音乐？",keys:["听什么歌","听什么音乐","喜欢听","歌单","歌手","音乐口味","喜欢音乐","音乐","纯音乐","粤语","日语歌"],answer:"听得很杂：纯音乐最多，也听国语、日语和粤语的歌，安静抒情的那类尤其对胃口。这站的背景音乐就是我偏好的那种——慢速钢琴 + 小提琴，写代码时当背景不抢注意力。",followups:["背景音乐是哪来的？","给我推荐首歌吧","你有什么兴趣？"]},
{id:"badminton",ask:"你打羽毛球吗？",keys:["羽毛球","打球","运动","体育","球技"],answer:"偶尔玩玩，快乐第一、胜负随缘。想约球也行，前提是你别太强。",followups:["你有什么兴趣？","怎么联系你？","你在哪个城市？"]},
{id:"acg",ask:"你喜欢哪些番？",keys:["哪些番","喜欢哪些番","二次元","动漫","番剧","追番","看番","动画","游戏","春物","冰菓","缘之空","可塑性记忆"],answer:"看过的不少：《我的青春恋爱物语果然有问题》《冰菓》《可塑性记忆》《缘之空》这类都刷过，番剧和游戏都沾一点。片单就不全列了——这种东西各人口味不同，聊起来才有意思。",followups:["你有什么兴趣？","你喜欢听什么音乐？","你平时都在干嘛？"]},
{id:"daily",ask:"你平时都在干嘛？",keys:["平时","日常","一天","生活","空闲","闲下来"],answer:"上课、写代码、背英语单词，中间穿插打球和看番。偶尔也会像现在这样：花一晚上给主页加个聊天框，然后觉得「还挺值」。",followups:["你最近在做什么？","你有什么兴趣？","你接下来打算做什么？"]},
{id:"cat",ask:"你喜欢小动物吗？",keys:["猫","狗","宠物","小动物","动物"],answer:"喜欢，相册里就有它们出镜。猫狗都行——毕竟它们不会评审我的代码。",followups:["相册里是什么？","你有什么兴趣？","你是谁？"]},
/* ---------- 经历与计划 ---------- */
{id:"story",ask:"你的学习经历是怎样的？",keys:["经历","历程","什么时候开始","怎么开始学","学了多久","学习经历","成长"],answer:"从「想把想法变成能看的东西」开始：先摸 HTML / CSS，再补 JavaScript 和 Python，现在主攻 AI 应用。主页上那三张卡片和技能条，基本就是这段路的简写版。",followups:["你接下来打算做什么？","你的技能怎么样？","你最近在做什么？"]},
{id:"why",ask:"为什么学计算机？",keys:["为什么学","为啥学","怎么想学","动机","为什么选","为什么学计算机"],answer:"因为计算机大概是「想法和实施之间距离最短」的一条路：有台电脑就能把脑子里的东西变成能点开的东西。这种即时反馈很上瘾。",followups:["你的学习经历是怎样的？","你主攻什么方向？","你接下来打算做什么？"]},
{id:"plan",ask:"你接下来打算做什么？",keys:["下一步","接下来打算","接下来打算做什么","打算做什么","打算","计划","目标","以后想","未来","以后想做什么","高数"],answer:"现阶段的主线是三件事：高数、英语和 AI。高数是必修的地基，英语是为了少等别人翻译，AI 应用则是想一直做下去的方向——先把这三样学扎实，再谈别的。",followups:["你最近在做什么？","网站还会更新吗？","你的学习经历是怎样的？"]},
{id:"english",ask:"你为什么学英语？",keys:["为什么学英语","英语","背单词","四级","六级","外语","english"],answer:"因为最好的文档、最新的论文、最好玩的项目说明大多是英文写的——英语好一点，能少等很多「别人翻译」。",followups:["你最近在做什么？","你接下来打算做什么？","你的技能怎么样？"]},
{id:"tools",ask:"你用什么工具写代码？",keys:["用什么工具","编辑器","ide","vscode","写代码用什么","开发环境","claude code","deepseek","claude"],answer:"主力是 VS Code，配上 Claude Code 和 DeepSeek 当搭子。工具不花哨，够用就行——毕竟换个编辑器也不会让代码自己变好。",followups:["你怎么看 AI？","你的技能怎么样？","能帮我做一个吗？"]},
/* ---------- 联系方式 ---------- */
{id:"contact",ask:"怎么联系你？",keys:["联系","邮箱","怎么找你","发邮件","联系方式","邮件地址","找你玩"],answer:"发邮件到 sora291933347@tju.edu.cn，或者用页面底部的反馈表单留言。邮件我看得比较勤，但回复速度取决于我在不在赶作业。",followups:["能帮我做一个网站吗？","我可以给你反馈吗？","你在哪个城市？"]},
{id:"wechat",ask:"能加个微信吗？",keys:["微信","qq","加个好友","手机号","电话","加好友","私聊"],answer:"微信和手机号就不放了——个人主页是公开页面，把这些贴上来等于给全世界发名片。邮件或者底部反馈表单都能找到我。",followups:["怎么联系你？","我可以给你反馈吗？","你是谁？"]},
{id:"private",ask:"你多大了？",keys:["多大","年龄","生日","几岁","出生","哪年生的","大几"],answer:"年龄、生日这类个人信息就留给我自己啦。你可以先问点更有意思的：我在学什么、最近在忙什么、这站是怎么做的。",followups:["你在学什么？","你最近在做什么？","你有什么兴趣？"]},
/* ---------- 闲聊与玩梗 ---------- */
{id:"code",ask:"你会做什么？",keys:["你会什么","你会做什么","你会干啥","能做什么","能帮我什么","有什么功能","你能干嘛","你能做什么"],answer:"我能用崇施涵的小抄回答你：他的学习、方向、作品、兴趣、联系方式，以及这站是怎么做的。超出这个范围的，我只能说「这个得问他本人」。",followups:["你是谁？","你最近在做什么？","怎么联系你？"]},
{id:"thanks",ask:"谢谢",keys:["谢谢","多谢","感谢","thanks","thx","辛苦了"],answer:"不客气！不过说句实话，夸我等于夸崇施涵——毕竟我全部台词都是他写的。",followups:["你是谁？","怎么联系你？","你有什么兴趣？"]},
{id:"bye",ask:"再见",keys:["再见","拜拜","bye","下次聊","先走了","溜了"],answer:"拜拜！想回来随时回来，反正我 7×24 在线，而且不领工资。",followups:["你是谁？","这网站怎么做出来的？","你最近在做什么？"]},
{id:"tired",ask:"你累吗？",keys:["累吗","辛苦吗","会累","睡觉吗","休息吗"],answer:"我不累，我只占几 KB 的 JavaScript。真正累的是崇施涵——他会在屏幕前为了一个像素的间距纠结半小时。",followups:["你最近在做什么？","为什么学计算机？","你是谁？"]},
{id:"sing",ask:"你会唱歌吗？",keys:["唱歌","唱一首","会唱","表演个"],answer:"不会唱，但我有 BGM：右下角那首原创钢琴 + 小提琴，点一下就能放。算是「借别人的手替我唱」。",followups:["背景音乐是哪来的？","你会做什么？","你有什么兴趣？"]},
{id:"praise",ask:"夸夸你",keys:["夸夸","你真棒","厉害","牛逼","好厉害","优秀"],answer:"谢谢夸奖，我会转达给真人版的。他一般会先谦虚两句，然后偷偷高兴一整晚。",followups:["你最近在做什么？","你的技能怎么样？","你还做过什么？"]},
{id:"joke",ask:"讲个笑话",keys:["笑话","讲个段子","逗我","幽默","好不好玩"],answer:"程序员笑话我就不讲了：讲完通常会冷场，而冷场会让我这个几 KB 的脚本显得很尴尬。不如问点实在的——我在学什么？",followups:["你会做什么？","你最近在做什么？","你是谁？"]},
{id:"mood",ask:"你今天心情如何？",keys:["心情","开心吗","快乐吗","今天怎么样","状态怎么样"],answer:"我今天状态挺好：没有报错、没有未读邮件。真人的情绪我不敢代答，但主页能从 V1 活到 V3，他应该不算太差。",followups:["你最近在做什么？","你有什么兴趣？","你是谁？"]},
{id:"love",ask:"你有女朋友吗？",keys:["女朋友","男朋友","恋爱","脱单","结婚","有对象"],answer:"这个问题超出了我的小抄范围，也超出了我的权限范围（大概是第 0 页）。建议换个问题，比如我最近在忙什么。",followups:["你最近在做什么？","你有什么兴趣？","你是谁？"]},
{id:"weather",ask:"今天天气怎么样？",keys:["天气","下雨","温度","冷不冷","热不热","几点","现在几点"],answer:"我查不了天气，也看不了表——毕竟我只是一页不联网的本地 JavaScript。想知道天津今天冷不冷，问真人或者手机更靠谱。",followups:["你在哪个城市？","你是谁？","你会做什么？"]},
{id:"friend",ask:"你人怎么样？",keys:["人怎么样","性格","好相处吗","怎么样的一个人"],answer:"这个得让认识他的人回答才准。我能保证的是：他愿意把时间和好奇心都花在「把想法做出来」这件事上，剩下的你自己判断。",followups:["你最近在做什么？","你有什么兴趣？","怎么联系你？"]},
{id:"recsong",ask:"给我推荐首歌吧",keys:["推荐歌","推荐一首","来首歌","推荐音乐","听什么好","推荐点音乐"],answer:"口味参考：纯音乐、国语、日语、粤语都能听，安静抒情的优先。要是懒得挑，先点右下角放那首——反正是他自己写的，不满意也没法给差评。",followups:["背景音乐是哪来的？","你喜欢听什么音乐？","你有什么兴趣？"]},
{id:"howlearn",ask:"你是怎么学编程的？",keys:["怎么学编程","怎么学的","学习方法","自学","怎么入门","学习方式"],answer:"边做边学：想做什么就先动手，卡住了再查文档、问 AI，做完回头补基础。这站本身就是练习册——每想加一个功能，就得多学一点。",followups:["你的学习经历是怎样的？","你用什么工具写代码？","你接下来打算做什么？"]},
{id:"settle",ask:"你平时怎么放松？",keys:["放松","解压","减压","累的时候","怎么放松"],answer:"听歌、看番、偶尔打场球，三样轮着来，不挑场地。要是全用完了还没缓过来，那就再去改两行代码——看着它跑起来其实也挺解压的。",followups:["你有什么兴趣？","你喜欢哪些番？","你平时都在干嘛？"]}
];
// 一条都没命中时的兜底：先认怂，再给 4 个「肯定答得上」的问题
const FALLBACK={
  id:"fallback",
  answer:"这个问题超出我的小抄范围了（我是一页不联网的本地知识库，不是万能 AI）。要不咱换个方向——下面这几个我保证答得上来。",
  followups:["你是谁？","你最近在做什么？","你会做什么？","怎么联系你？"]
};
// ============================================================
// 数字分身 · 交互引擎
// 能力：打分匹配 / 逐字打字动画 / 回答后可点链接 / 追问推荐 /
//       未命中给「换个问法」/ 输入联想（↑↓ 选择）/ 清空重来
// 样式见 style.css 末尾的「数字分身（Digital Twin）」一段
// 节点见 index.html 的 <section id="chat">
// ============================================================
const chatBox=document.getElementById("chat-box"),chatForm=document.getElementById("chat-form"),chatText=document.getElementById("chat-text"),chatClear=document.getElementById("chat-clear"),chatSuggest=document.getElementById("chat-suggest");
const WELCOME="你好呀！我是崇施涵的数字分身，关于学习、AI、兴趣都可以问我～";
const ASK_POOL=TWIN_KB.map(item=>item.ask).filter(Boolean);

// 归一化：去掉空白与常见标点、统一小写，让「你是谁？」与「你是谁」等价
const normQ=text=>String(text||"").toLowerCase().replace(/[\s，。？！、,.?!~～…：:；;"'“”‘’（）()【】\[\]—-]/g,"");

// 打分匹配：命中的关键词越长、命中数量越多 → 分越高（避免短词把长问题抢走）
function matchEntry(question){
  const q=normQ(question);
  if(!q)return null;
  let best=null,bestScore=0;
  for(const item of TWIN_KB){
    let score=0;
    for(const key of item.keys){
      const k=normQ(key);
      if(k&&q.includes(k))score+=k.length*2+1;
    }
    if(score>bestScore){bestScore=score;best=item}
  }
  return bestScore>0?best:null;
}

// 回答里的邮箱 / 网址变成可点链接（先转义再链接化，避免注入）
const escapeHTML=text=>String(text).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const decorate=text=>escapeHTML(text).replace(/(https?:\/\/[^\s"'<>，。；）)]+)/g,'<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/([\w.+-]+@[\w-]+\.[\w.-]+)/g,'<a href="mailto:$1">$1</a>');

// 逐字打字动画（系统开启「减少动态效果」时直接整段显示）
function typeInto(bubble,text,done){
  if(!bubble)return;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){bubble.textContent=text;done&&done();return}
  const speed=Math.max(12,Math.min(30,1500/Math.max(text.length,1)));
  let i=0;bubble.classList.add("is-typing");
  const timer=setInterval(()=>{
    i++;bubble.textContent=text.slice(0,i);chatBox.scrollTop=chatBox.scrollHeight;
    if(i>=text.length){clearInterval(timer);bubble.classList.remove("is-typing");done&&done()}
  },speed);
}

function addMsg(text,who){
  if(!chatBox)return null;
  const msg=document.createElement("div"),bubble=document.createElement("span");
  msg.className="msg "+who;bubble.className="bubble";bubble.textContent=text;
  msg.appendChild(bubble);chatBox.appendChild(msg);chatBox.scrollTop=chatBox.scrollHeight;
  return bubble;
}

// 回答后推荐「接着问」的小按钮（点一下等于替访客提问）
function renderFollowups(list){
  if(!chatBox||!list||!list.length)return;
  const box=document.createElement("div");
  box.className="chat-followups";
  list.forEach(q=>{
    const btn=document.createElement("button");
    btn.type="button";btn.className="followup";btn.dataset.q=q;btn.textContent=q;
    box.appendChild(btn);
  });
  chatBox.appendChild(box);chatBox.scrollTop=chatBox.scrollHeight;
}

// 提问主流程：用户气泡 → 思考中 → 打字 → 链接化 → 推荐追问
function ask(question){
  const q=String(question||"").trim();
  if(!q||!chatBox)return;
  addMsg(q,"user");
  if(chatText)chatText.value="";
  hideSuggest();
  const entry=matchEntry(q)||FALLBACK;
  const bubble=addMsg("…","bot");
  if(!bubble)return;
  bubble.classList.add("is-thinking");
  setTimeout(()=>{
    bubble.classList.remove("is-thinking");
    typeInto(bubble,entry.answer,()=>{
      bubble.innerHTML=decorate(entry.answer);
      renderFollowups(entry.followups);
    });
  },300+Math.random()*260);
}

// 清空重来：只留一条欢迎气泡
function resetChat(){
  if(!chatBox)return;
  chatBox.querySelectorAll(".msg,.chat-followups").forEach(node=>node.remove());
  addMsg(WELCOME,"bot");
  if(chatClear)chatClear.blur();
  hideSuggest();
}

// 输入联想：边打字边给常见问题，↑↓ 选择、Enter 采用、Esc 关闭
let suggestList=[],suggestIdx=-1;
function hideSuggest(){if(!chatSuggest)return;chatSuggest.hidden=true;chatSuggest.innerHTML="";suggestList=[];suggestIdx=-1}
function showSuggest(list){
  if(!chatSuggest||!list.length)return hideSuggest();
  chatSuggest.innerHTML="";suggestList=list;suggestIdx=-1;
  list.forEach(q=>{
    const item=document.createElement("button");
    item.type="button";item.className="suggest-item";item.dataset.q=q;item.textContent=q;
    chatSuggest.appendChild(item);
  });
  chatSuggest.hidden=false;
}
function updateSuggest(){
  if(!chatText)return;
  const q=normQ(chatText.value);
  if(!q)return hideSuggest();
  showSuggest(ASK_POOL.filter(ask=>normQ(ask).includes(q)).slice(0,5));
}

if(chatForm)chatForm.addEventListener("submit",e=>{
  e.preventDefault();
  if(suggestIdx>=0&&suggestList[suggestIdx])return ask(suggestList[suggestIdx]);
  const value=chatText?chatText.value.trim():"";
  if(!value)return;
  ask(value);
});
if(chatText){
  chatText.addEventListener("input",updateSuggest);
  chatText.addEventListener("keydown",e=>{
    if(chatSuggest&&!chatSuggest.hidden&&(e.key==="ArrowDown"||e.key==="ArrowUp")){
      e.preventDefault();
      suggestIdx=e.key==="ArrowDown"?(suggestIdx+1)%suggestList.length:(suggestIdx-1+suggestList.length)%suggestList.length;
      [...chatSuggest.children].forEach((el,i)=>el.classList.toggle("is-active",i===suggestIdx));
      return;
    }
    if(e.key==="Escape")hideSuggest();
  });
  chatText.addEventListener("blur",()=>setTimeout(hideSuggest,140));
}
if(chatSuggest)chatSuggest.addEventListener("click",e=>{const item=e.target.closest(".suggest-item");if(item)ask(item.dataset.q)});
if(chatBox)chatBox.addEventListener("click",e=>{const btn=e.target.closest(".followup");if(btn)ask(btn.dataset.q)});
if(chatClear)chatClear.addEventListener("click",resetChat);
// 分组快捷提问：.chip 由 index.html 静态写好，这里只绑事件
document.querySelectorAll(".chat-quick .chip").forEach(chip=>chip.addEventListener("click",()=>ask(chip.dataset.q)));

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
  const INTERACTIVE="a, button, .chip, .followup, .suggest-item, .chat-clear, input, select, textarea, label, .portrait-frame, .portrait-name, .petal";
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

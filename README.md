# 🐴 2026 馬年大吉 - 扭转乾坤

**Live Demo:** https://cny2026-horse-year.vercel.app/

一个基于扭蛋机机制的趣味新年运势抽签应用，结合 AI 图像生成技术，让你在 2026 马年抽取专属好运！

## ✨ 特色功能

- 🎰 **扭蛋机体验** - 点击扭蛋机，抽取属于你的专属汤圆
- 📸 **AI 图像生成** - 上传照片，AI 为你定制独一无二的卡通马形象
- 🧧 **运势抽签** - 抽取「马类型」+「领域」+「祝福语」三重运势
- 🎨 **精美设计** - 中国传统新年风格，灯笼、烟花、渐变色彩
- 🌐 **双语支持** - 中文/English 一键切换
- 📱 **移动端适配** - 完美支持手机访问

## 🎮 玩法

1. 点击首页扭蛋机进入应用
2. 上传你的照片（可选，AI 会根据照片特征生成专属小马）
3. 点击扭蛋机抽取运势汤圆
4. 点击汤圆打开，查看你的专属运势
5. 保存或分享你的新年运势卡！

## 🛠️ 技术栈

- **前端**: HTML5 + CSS3 + JavaScript (原生)
- **后端 API**: Vercel Edge Functions
- **AI 服务**: Together AI (图像分析 + 图像生成)
- **部署**: Vercel

## 📁 项目结构

```
.
├── index.html          # 主页面
├── api/
│   ├── vision.js       # AI 图像分析 API
│   └── image.js        # AI 图像生成 API
├── background.png      # 背景图
├── bigniudan.png       # 落地页扭蛋机
├── machine.png         # 扭蛋机静态图
└── machine.mp4         # 扭蛋机视频
```

## 🚀 本地开发

```bash
# 克隆项目
git clone https://github.com/duoduo-weekend-coder/cny2026-horse-year.git
cd cny2026-horse-year

# 本地预览（需要简单 HTTP 服务器）
python3 -m http.server 8080
# 或
npx serve .

# 访问 http://localhost:8080
```

## 🔑 环境变量

部署到 Vercel 时需要配置：

```
TOGETHER_API_KEY=your_together_ai_api_key
```

## 📝 数据来源

- 20 种「马」类型（文艺马、学霸马、运动马等）
- 20 个「领域」（事业、爱情、健康、财运等）
- 15 条「祝福语」（马到成功、马上有钱、龙马精神等）

## 🤝 分享

把链接分享给朋友，一起抽取 2026 马年好运！

**https://cny2026-horse-year.vercel.app/**

---

Made with ❤️ by [duoduo_weekend_coder](https://github.com/duoduo-weekend-coder)

丙午年 | 2026 新春

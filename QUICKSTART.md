# HavenJourney 快速启动指南

## 🚀 立即开始

### 方法 1：直接打开（最简单）
1. 找到项目文件夹中的 `index.html`
2. 双击打开文件
3. 网站将在默认浏览器中打开
4. 开始浏览！

### 方法 2：使用本地服务器（推荐）

#### 使用 Python (如果已安装)
```bash
# 打开命令行，进入项目文件夹
cd HavenJourney

# 启动服务器
python -m http.server 8000

# 或者如果使用 Python 2
python -m SimpleHTTPServer 8000

# 在浏览器访问
# http://localhost:8000
```

#### 使用 Node.js
```bash
# 安装 http-server（全局安装一次即可）
npm install -g http-server

# 在项目文件夹运行
http-server

# 在浏览器访问显示的地址
```

#### 使用 VS Code
1. 安装 "Live Server" 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 📱 测试响应式设计

### 在浏览器中测试移动端
1. 打开网站
2. 按 `F12` 打开开发者工具
3. 点击设备图标（或按 `Ctrl+Shift+M` / `Cmd+Shift+M`）
4. 选择不同设备尺寸测试

## 🎨 主要功能测试

### ✅ 导航菜单
- 点击右上角菜单项
- 在移动端测试汉堡菜单
- 测试下拉分类菜单

### ✅ 搜索功能
- 点击搜索图标
- 输入关键词（如 "fashion", "travel", "skincare"）
- 查看实时搜索结果
- 按 ESC 键关闭搜索

### ✅ 分类筛选
- 在首页向下滚动到文章区域
- 点击不同分类按钮
- 观察文章的平滑过滤动画

### ✅ 文章阅读
- 点击任意文章卡片
- 浏览完整文章内容
- 测试产品推荐链接
- 尝试分享按钮

### ✅ 联系表单
- 访问 Contact 页面
- 填写表单
- 测试表单验证和提交

### ✅ 响应式特性
- 调整浏览器窗口大小
- 测试不同断点的布局变化
- 验证移动端菜单和交互

## 🎯 页面导览

| 页面 | 文件名 | 描述 |
|------|--------|------|
| 首页 | index.html | 特色文章、分类筛选、分页 |
| 关于 | about.html | 团队介绍、使命愿景 |
| 联系 | contact.html | 联系表单、联系信息 |
| 时尚文章 | article-1.html | 可持续时尚指南（2025年3月） |
| 美容文章 | article-2.html | 护肤程序指南（2025年2月） |
| 家居文章 | article-3.html | 生物亲和设计（2025年4月） |
| 旅行文章 | article-4.html | 隐藏的旅游目的地（2025年6月） |
| 金融文章 | article-5.html | 投资策略（2025年1月） |

## 🔧 自定义设置

### 更改网站颜色
打开 `css/style.css`，找到 `:root` 部分：
```css
:root {
    --color-primary: #D4874B;  /* 修改主色调 */
    --color-secondary: #8B5A3C; /* 修改次要颜色 */
    /* ... 其他颜色变量 */
}
```

### 添加新文章
1. 复制 `article-1.html`
2. 重命名为 `article-6.html`
3. 编辑内容、图片和信息
4. 在 `index.html` 中添加文章卡片
5. 更新 `js/main.js` 中的 articles 数组

### 修改 Logo
在任意 HTML 文件中找到：
```html
<div class="logo">
    <h1>HavenJourney</h1> <!-- 修改这里 -->
    <span class="tagline">Curated Stories for Modern Living</span>
</div>
```

### 更换图片
- 所有图片使用 Unsplash CDN
- 格式：`https://images.unsplash.com/photo-{id}?w={width}&q={quality}`
- 可替换为自己的图片路径

## 🎨 配色方案说明

网站使用暖色系设计：

**主色调**
- 🟠 主橙色 `#D4874B` - 按钮、强调元素
- 🟤 深棕色 `#8B5A3C` - 次要元素
- 🟫 陶土色 `#C17854` - 装饰元素

**背景色**
- 🤍 奶油色 `#F5F1E8` - 页面背景
- 🟡 沙色 `#E8DCC4` - 卡片背景
- ⚪ 白色 - 内容区域

**文字颜色**
- ⚫ 深棕 `#2C2416` - 标题
- 🔘 灰棕 `#6B5D4F` - 正文

## 📦 项目文件说明

```
HavenJourney/
├── 📄 index.html          # 主页（400+ 行）
├── 📄 about.html          # 关于页面（200+ 行）
├── 📄 contact.html        # 联系页面（250+ 行）
├── 📄 article-1.html      # 时尚文章（600+ 行）
├── 📄 article-2.html      # 美容文章（600+ 行）
├── 📄 article-3.html      # 家居文章（600+ 行）
├── 📄 article-4.html      # 旅行文章（600+ 行）
├── 📄 article-5.html      # 金融文章（600+ 行）
├── 📁 css/
│   └── 📄 style.css       # 主样式表（2000+ 行）
├── 📁 js/
│   └── 📄 main.js         # 交互功能（600+ 行）
├── 📄 README.md           # 项目文档
└── 📄 QUICKSTART.md       # 本文件
```

## 💡 提示和技巧

1. **性能优化**：网站已优化，使用 CDN 资源和延迟加载
2. **SEO 友好**：所有页面包含适当的元标签
3. **可访问性**：使用语义化 HTML 和 ARIA 标签
4. **跨浏览器**：在 Chrome、Firefox、Safari、Edge 测试通过
5. **移动优先**：响应式设计，完美适配所有设备

## 🐛 常见问题

**Q: 为什么某些图片不显示？**
A: 确保有稳定的网络连接，图片来自 Unsplash CDN

**Q: 搜索功能不工作？**
A: 确保 JavaScript 已启用，检查浏览器控制台是否有错误

**Q: 移动端菜单不出现？**
A: 尝试刷新页面，确保窗口宽度小于 768px

**Q: 表单提交后没反应？**
A: 这是演示版本，表单提交仅显示成功消息，未连接后端

**Q: 如何连接真实的后端？**
A: 需要设置 API 端点，修改 `js/main.js` 中的表单处理函数

## 📚 学习资源

- **HTML**: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML)
- **CSS**: [CSS-Tricks](https://css-tricks.com/)
- **JavaScript**: [JavaScript.info](https://javascript.info/)
- **响应式设计**: [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 🤝 需要帮助？

遇到问题或有建议？
- 📧 Email: contact@havenjourney.com
- 💬 通过网站联系表单留言

## ✨ 享受你的 HavenJourney 网站！

探索每个功能，自定义成你喜欢的样子，创造属于你的精彩内容！

---

**Happy Coding! 🚀**


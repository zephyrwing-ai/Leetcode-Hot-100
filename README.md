# Leetcode Hot 100

Leetcode 热题 100 题解网站，包含解题思路、代码和注释展开功能。

## 启动

纯前端静态网站，需要一个本地 HTTP 服务器（直接打开 `index.html` 会因为 `fetch` 跨域限制无法加载文档）。

### 方式一：Python（推荐，无需安装）

```bash
cd Leetcode-Hot-100
python3 -m http.server 8080
```

打开 http://localhost:8080

### 方式二：Node.js

```bash
npx serve .
```

### 方式三：VS Code

安装 Live Server 插件，右键 `index.html` → Open with Live Server。

## 添加新题解

1. 在对应分类目录下创建 Markdown 文件（如 `Hash/4.xxx.md`）
2. 在 `docs.json` 的对应 section 中添加条目：

```json
{
  "title": "题目名称",
  "path": "Hash/4.xxx.md"
}
```

3. 添加新分类则在 `docs.json` 的 `sections` 数组中新增一个 section

## 项目结构

```
├── index.html       # 入口页面
├── app.js           # 导航渲染 + Markdown 解析 + 代码注释展开
├── styles.css       # 样式
├── docs.json        # 导航配置（分类和题目路径）
├── index.md         # 首页：解题方法论
├── Hash/            # 哈希表题解
└── Two-Pointer/     # 双指针题解
```

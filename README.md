<p align="center">
  <picture>
    <img src="public/vite.svg" width="80" alt="驭鉴 Logo" />
  </picture>
</p>

<h1 align="center">驭鉴 · YùJiàn</h1>

<p align="center">
  <em>驭车之鉴，一见倾心 — Curate your next drive.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-18-61DAFB?logo=react" alt="React 18" />
  <img src="https://img.shields.io/badge/typescript-5-3178C6?logo=typescript" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/vite-5-646CFF?logo=vite" alt="Vite 5" />
  <img src="https://img.shields.io/badge/test-20%2F20%20passing-4A9E6B?logo=vitest" alt="Tests" />
  <img src="https://img.shields.io/badge/license-MIT-C8A052" alt="License" />
</p>

<p align="center">
  <a href="#中文">中文</a> &nbsp;|&nbsp;
  <a href="#english">English</a> &nbsp;|&nbsp;
  <a href="#快速开始">快速开始</a> &nbsp;|&nbsp;
  <a href="#quick-start">Quick Start</a>
</p>

---

## 预览 / Preview

<p align="center">
  <em>暗色展厅风格 · 铜金点缀 · 毛玻璃质感 · 多维度筛选</em>
  <br/>
  <em>Dark gallery theme · Copper accents · Glassmorphism · Multi-axis filters</em>
</p>

| 桌面端 · Desktop | 移动端 · Mobile |
|---|---|
| 筛选侧边栏 + 网格视图 + 详情弹窗 | 底部抽屉筛选 + 单列卡片 |
| Sidebar filters + Grid + Detail overlay | Bottom-sheet drawer + Single column |

> 在线演示 / Live Demo: _即将上线 · Coming soon_

---

<span id="中文"></span>

## 🇨🇳 中文

**驭鉴** 是一款专注汽车筛选与对比的 Web 应用。通过品牌、价格、车型、燃油类型、排量五大维度精准过滤，支持多车并排对比、URL 状态同步，适配桌面与移动端，帮助用户在海量车型中找到理想之选。

### 核心功能

<table>
<tr>
  <td width="50%">

🔍 **多维度筛选**
品牌 · 价格区间 · 车型 · 燃油类型 · 排量
AND 逻辑组合，精确命中

📊 **灵活排序**
价格升降 · 排量升降 · 马力升降 · 最新发布
即时切换，实时更新

⚖️ **车辆对比**
最多 3 辆车并排对比
规格差异自动高亮标注

  </td>
  <td width="50%">

📋 **详情卡片**
全屏覆盖层展示完整参数
品牌 / 型号 / 排量 / 马力 / 变速箱

📱 **移动端适配**
底部滑出筛选面板
单列网格 · 全宽下拉选择

🔗 **URL 状态同步**
筛选条件写入 URL 参数
支持浏览器前进后退、链接分享

  </td>
</tr>
</table>

### 技术架构

```
用户交互 → URL 参数 (useSearchParams) → Hook 层 (300ms 防抖) → Mock API → UI 渲染
                                                 ↕
                                           状态管理 (Context + Ref)
```

| 层级 | 技术选型 | 说明 |
|------|----------|------|
| 视图 | React 18 · TypeScript 5 | 函数组件 + Hooks |
| 路由 | React Router 6 | URL 参数驱动筛选状态 |
| 构建 | Vite 5 | HMR 开发体验 |
| 样式 | CSS 自定义属性 | 暗色主题 · 响应式断点 |
| 测试 | Vitest · RTL · Playwright | 单元 → 集成 → E2E |
| 数据 | 模拟 API (setTimeout) | 332 辆车 · 33 个品牌 · 2% 错误率 |

### 项目结构

```
src/
├── components/
│   ├── FilterSidebar/      ← 筛选侧边栏 + 移动端抽屉
│   ├── CarGrid/            ← 卡片网格 (loading/empty/error)
│   ├── CarDetail/          ← 详情覆盖层
│   ├── CompareDrawer/      ← 对比面板 (含差异高亮)
│   ├── SortControls/       ← 排序下拉
│   └── shared/             ← LoadingSkeleton / EmptyState / ErrorState
├── hooks/
│   ├── useUrlState.ts      ← URL ↔ 状态双向同步
│   ├── useCarFilters.ts    ← 防抖查询 + 取消过期请求
│   ├── useCarSort.ts       ← 排序逻辑
│   └── useCarCompare.ts    ← 对比状态 (上限 3)
├── services/
│   ├── mockData.ts         ← 种子随机数据生成
│   └── carApi.ts           ← 模拟 API 接口
└── types/car.ts            ← 全部类型定义 + 常量
```

---

<span id="english"></span>

## 🇬🇧 English

**YùJiàn (驭鉴)** is a premium car filtering and comparison web app. It enables precise discovery across 5 filter dimensions — brand, price, vehicle type, fuel type, and displacement — with side-by-side comparison, URL state persistence, and full mobile adaptation.

### Core Features

<table>
<tr>
  <td width="50%">

🔍 **Multi-axis Filtering**
Brand · Price · Type · Fuel · Displacement
AND logic for surgical precision

📊 **Flexible Sorting**
Price ↑↓ · Displacement ↑↓ · HP ↑↓ · Newest
Instant, zero-lag switching

⚖️ **Side-by-Side Compare**
Up to 3 cars in comparison table
Auto-highlighted spec differences

  </td>
  <td width="50%">

📋 **Detail Overlay**
Full-spec immersive panel
Brand / Model / Displacement / HP / Transmission

📱 **Mobile First**
Bottom-sheet filter drawer
Single-column grid · Full-width selects

🔗 **Shareable URLs**
All filter state in query params
Back/forward navigation · Link sharing

  </td>
</tr>
</table>

### Architecture

```
User Input → URL Params (useSearchParams) → Hook Layer (300ms debounce) → Mock API → UI
                                                  ↕
                                          State (Context + Ref)
```

| Layer | Stack | Notes |
|-------|-------|-------|
| View | React 18 · TypeScript 5 | Functional components + Hooks |
| Routing | React Router 6 | URL params as source of truth |
| Build | Vite 5 | Instant HMR |
| Styling | CSS Custom Properties | Dark theme · Responsive breakpoints |
| Testing | Vitest · RTL · Playwright | Unit → Integration → E2E |
| Data | Mock API (setTimeout) | 332 cars · 33 brands · 2% error rate |

---

<span id="快速开始"></span>

## 🚀 快速开始

```bash
# 克隆仓库
git clone git@github.com:xuehaoweng/yujian-car.git
cd yujian-car

# 安装依赖
npm install

# 启动开发服务器 (默认 http://localhost:5173)
npm start

# 运行测试 (20 个测试用例)
npm test

# 运行 E2E 测试 (需要先启动 dev server)
npx playwright test
```

---

<span id="quick-start"></span>

## 🚀 Quick Start

```bash
# Clone
git clone git@github.com:xuehaoweng/yujian-car.git
cd yujian-car

# Install
npm install

# Dev server → http://localhost:5173
npm start

# Run tests (20 cases)
npm test

# E2E tests (requires dev server running)
npx playwright test
```

---

## 📋 测试覆盖 / Test Coverage

| 层级 | 文件 | 覆盖范围 |
|------|------|----------|
| Unit | `useCarFilters` `useCarSort` `useCarCompare` `carApi` | Hook 逻辑 + API 边界 |
| Integration | `filter-and-browse` `car-detail` `compare-flow` | 组件交互 + 状态流 |
| E2E | `smoke.spec` `mobile-filter.spec` | 桌面 + 移动端完整流程 |

---

<p align="center">
  <sub>Built with ❤️ · <a href="specs/001-car-filter/">Design Docs</a> · MIT License</sub>
</p>

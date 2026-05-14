<p align="center">
  <a href="#中文">中文</a> | <a href="#english">English</a>
</p>

---

<h1 align="center">驭鉴 · YùJiàn</h1>
<p align="center"><em>Curate your next drive.</em></p>

---

<h2 id="中文">中文</h2>

汽车甄选平台 — 多维筛选、深度对比、精准定位你的下一台车。

### 特性

- **多维度筛选** — 品牌、价格区间、车型、燃油类型、排量，AND 逻辑组合
- **灵活排序** — 价格升降、排量升降、马力升降、最新发布
- **车辆对比** — 最多 3 辆车并排对比，差异高亮
- **详情卡片** — 完整规格参数 + 描述
- **移动端适配** — 底部滑出筛选面板，单列网格布局
- **URL 状态同步** — 筛选和排序参数写入 URL，支持分享和前进后退

### 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 18 + TypeScript 5 |
| 构建 | Vite 5 |
| 路由 | React Router 6 |
| 测试 | Vitest + React Testing Library + Playwright |
| 数据 | 模拟 API（332 辆车，33 个品牌） |

### 快速开始

```bash
npm install    # 安装依赖
npm start      # 启动开发服务器
npm test       # 运行单元/集成测试
npx playwright test  # 运行端到端测试
```

### 项目结构

```
src/
├── components/
│   ├── FilterSidebar/    # 筛选侧边栏 + 移动端底部抽屉
│   ├── CarGrid/          # 车辆卡片网格
│   ├── CarDetail/        # 车辆详情弹窗
│   ├── CompareDrawer/    # 对比面板
│   └── shared/           # Loading/Empty/Error 状态组件
├── hooks/                # useUrlState, useCarFilters, useCarSort, useCarCompare
├── services/             # Mock API + Mock 数据生成
├── types/                # TypeScript 类型定义
├── App.tsx               # 根组件
├── main.tsx              # 入口
└── index.css             # 全局样式
```

---

<h2 id="english">English</h2>

A curated car discovery platform — filter, compare, and find your perfect match.

### Features

- **Multi-dimensional filters** — Brand, price range, vehicle type, fuel type, displacement with AND logic
- **Flexible sorting** — Price, displacement, horsepower, newest arrivals
- **Car comparison** — Up to 3 cars side-by-side with diff highlighting
- **Detail cards** — Full specs + description overlay
- **Mobile responsive** — Bottom-sheet filter drawer, single-column grid
- **URL state sync** — Filter/sort params in URL for sharing and browser navigation

### Tech Stack

| Category | Choice |
|----------|--------|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 |
| Routing | React Router 6 |
| Testing | Vitest + React Testing Library + Playwright |
| Data | Mock API (332 cars, 33 brands) |

### Quick Start

```bash
npm install    # Install dependencies
npm start      # Start dev server
npm test       # Run unit & integration tests
npx playwright test  # Run E2E tests
```

### Project Structure

```
src/
├── components/
│   ├── FilterSidebar/    # Filter sidebar + mobile bottom drawer
│   ├── CarGrid/          # Car card grid
│   ├── CarDetail/        # Car detail overlay
│   ├── CompareDrawer/    # Comparison panel
│   └── shared/           # Loading/Empty/Error state components
├── hooks/                # useUrlState, useCarFilters, useCarSort, useCarCompare
├── services/             # Mock API + data generation
├── types/                # TypeScript type definitions
├── App.tsx               # Root component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

---

<p align="center">
  <sub>MIT License</sub>
</p>

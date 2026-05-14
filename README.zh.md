# 驭鉴 · YùJiàn

汽车甄选平台 — 多维筛选、深度对比、精准定位你的下一台车。

## 特性

- **多维度筛选** — 品牌、价格区间、车型、燃油类型、排量，AND 逻辑组合
- **灵活排序** — 价格升降、排量升降、马力升降、最新发布
- **车辆对比** — 最多 3 辆车并排对比，差异高亮
- **详情卡片** — 完整规格参数 + 描述
- **移动端适配** — 底部滑出筛选面板，单列网格布局
- **URL 状态同步** — 筛选和排序参数写入 URL，支持分享和前进后退

## 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 18 + TypeScript 5 |
| 构建 | Vite 5 |
| 路由 | React Router 6 |
| 测试 | Vitest + React Testing Library + Playwright |
| 数据 | 模拟 API（332 辆车，33 个品牌） |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 运行单元/集成测试
npm test

# 运行端到端测试
npx playwright test
```

## 项目结构

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

## 许可

MIT

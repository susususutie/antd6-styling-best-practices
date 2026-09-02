# antd6-styling-best-practices

Ant Design 6 样式与主题最佳实践演示。核心方案：

```text
ConfigProvider 动态主题 + 固定 cssVar.prefix + CSS Modules
```

页面可实时调整亮暗模式、主色、圆角、字号和紧凑算法，并对比 Ant Design 组件、自定义组件与 Canvas 图表的主题响应。

## 基础配置

```tsx
<ConfigProvider
  theme={{
    cssVar: { prefix: "app" },
    algorithm: dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
  }}
>
  <AntdApp>
    <App />
  </AntdApp>
</ConfigProvider>
```

```css
.card {
  color: var(--app-color-text);
  background: var(--app-color-bg-container);
  border: 1px solid var(--app-color-border-secondary);
}
```

## 应该怎样

1. 在入口引入 `antd/dist/reset.css`，统一基础样式和盒模型。
2. 固定 `cssVar.prefix: 'app'`；自定义组件只消费生成的 `--app-*` 语义 Token。
3. 使用语义 Token 表达用途，例如 `colorText`、`colorBgContainer`、`colorBorderSecondary`。
4. 切换亮暗算法时只更新主题配置，自定义组件通过 CSS Variables 自动适配。
5. 自定义组件使用 CSS Modules；调整 Ant Design 内部区域时使用公开的 `classNames` 或 `styles`。
6. 需要响应紧凑算法和基础字号的组件，应消费 `padding`、`controlHeight`、`fontSize`、`lineHeight` 等 Token。
7. 按影响范围覆盖主题：全局用 `theme.token`，单类 Ant Design 组件用 `theme.components`，模块用嵌套 `ConfigProvider`，业务组件用独立业务变量。
8. Canvas、图表或 JavaScript 计算无法读取 CSS 时，使用 `theme.useToken()`；普通样式优先使用 CSS Variables。
9. 使用 `Layout.Header`、`Layout.Sider`、`Layout.Content` 表达应用框架；固定顶部和侧栏，仅让内容区滚动。
10. 使用 `import { Button } from "antd"` 和 `import { SearchOutlined } from "@ant-design/icons"`；两者都支持 tree shaking。

## 避免怎样

1. 避免用固定颜色或固定色阶表达文字、背景、边框等用途。
2. 避免为普通组件分别编写亮色和暗色样式。
3. 避免动态修改 `cssVar.prefix`，也不要手写可能与 Ant Design 冲突的 `--app-*` 变量。
4. 避免将 Ant Design Component Token 当作自定义组件的公共 Token。
5. 避免依赖 `.ant-*` 内部 DOM 结构、滥用 `!important` 或把复杂样式写进内联 `style`。
6. 避免用固定像素锁死需要响应紧凑算法或基础字号的间距、控件高度和文字。
7. 避免仅为普通 CSS 读取 Token 而增加额外的 CSS-in-JS 逻辑。
8. 避免把主题模式判断散落在组件中；特殊图片、图表或结构差异应集中在主题或组件配置层。

## 开发命令

```bash
vp install
vp run dev
vp check
vp run build
```

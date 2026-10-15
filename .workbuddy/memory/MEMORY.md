# 项目长期记忆

## 布局与高度约定
- App.vue 根容器是 `min-h-screen flex flex-col`（高度 auto、靠内容 intrinsic 计算，可超过视口）；`<router-view class="flex-1 px-4 py-4">` 的 class 会**合并透传**到被渲染组件的根元素（RouterView `inheritAttrs: false` + attrs 下传）。
- 普通页面（DefaultLayout）走自然文档流，可超过视口高度；编辑类页面（BlankLayout：article/create、gallery/create）是视口锁定的，页面根写 `flex flex-col min-h-0`。
- **全高链标准写法**：页面根 `h-full flex flex-col min-h-0` → 内容区 `flex-1 min-h-0` → 滚动区内部再套 `flex flex-col`。注意 `min-height: 0` 只解除 flex 收缩下限，**不能阻止 intrinsic 高度向上传播**。
- `autoResize`（PrimeVue Textarea）会给 textarea 设行内 `height = scrollHeight`，**但存在 bug**：它先读取 `scrollHeight` 再判断是否需要收缩，而 `scrollHeight` 始终 ≥ 当前行内高度（clientHeight），所以一旦撑大，`needsShrinking = scrollHeight < 行内高度`（严格小于）永远为 false，行内高度删空后也不会恢复，从而把父容器一起撑大。
- **精确触发条件（用户定位）**：`box-sizing: border-box` 下行内高度 H 时 `clientHeight = H − border`（padding 相减抵消，只有 border 影响），而 `scrollHeight` 的下限就是 `clientHeight`。于是 `needsShrinking = (H − border) < H ⇔ border > 0`。**只要 border 为 0，条件恒 false，收缩分支成死代码**；默认样式的 1px border（共 2px）恰好是让 scrollHeight 能低于 H 的唯一余量。实测：border:0 → scrollHeight 2640==H 不缩；border:1px → scrollHeight 2638<2640 能缩。padding:0 无影响。
- **正确解法**：不依赖 PrimeVue 的 `autoResize`，自己通过 `ref` 拿到 textarea，在内容变化（`watch` + `nextTick`）和尺寸变化（`ResizeObserver`）时执行：`el.style.height = 'auto'; el.style.height = el.scrollHeight + 'px';`。先 reset 再测量，才能保证删内容时高度可以缩回来。
- 浏览器实测工具链：playwright-core + 本机 Edge（`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`），装在 `~/.workbuddy/binaries/node/workspace`；dev server 端口 5173 常被用户自占，临时服务用 5174。

## 组件约定
- `base-ui/` 放无业务的基础封装（ScrollArea、ViewHeader、PanelCard…），新建组件参考该风格。
- ArticleEditor 目前仅 ArticleCreate 使用； padding 类（px-60/py-4）由使用方通过 class 合并传入，组件自身只管内部 flex 结构。

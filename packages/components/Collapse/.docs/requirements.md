Element Plus 的 Collapse 组件在使用时可通过多种属性进行配置，以实现不同的功能和展示效果。以下是对其属性名和值的类型整理：
|组件|属性名|值的类型|描述|
|---|---|---|---|
|Collapse|model-value / v-model|`string`（手风琴模式）<br>`array`（非手风琴模式）|用于绑定当前激活的面板。在非手风琴模式下，它是一个包含当前展开面板 `name` 的数组；在使用手风琴模式时，它是一个代表当前展开面板 `name` 的字符串|
|Collapse|accordion|`boolean`|决定是否启用手风琴模式。`true` 表示开启，开启后同一时间仅能展开一个面板；`false` 表示关闭，即可以同时展开多个面板|
|Collapse Item|name|`string` / `number`|作为每个折叠面板的唯一标识符，用于在 `Collapse` 组件中区分不同的面板，方便进行状态管理和操作|
|Collapse Item|title|`string`|设置折叠面板的标题文本内容，用于向用户展示面板的主题或主要信息|
|Collapse Item|icon（2.8.3 及以上版本）|`string` / `Component`|用于设置折叠项的图标。可以传入字符串表示内置图标名称，也可以传入一个组件作为自定义图标|
|Collapse Item|disabled|`boolean`|用于控制折叠项是否被禁用。`true` 表示禁用，禁用后的折叠项无法被用户点击展开或折叠；`false` 表示可用，用户可正常操作|

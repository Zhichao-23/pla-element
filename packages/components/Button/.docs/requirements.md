Element Plus 中 Button 组件和 ButtonGroup 组件有多种属性，详细介绍如下：

1. **Button 组件属性**
   |属性名|属性值类型|属性值说明|默认值|
   |---|---|---|---|
   |size|enum|可取值为`large`、`small`，用于设置按钮尺寸，分别对应大、小尺寸，不设置时为默认尺寸|—|
   |type|enum|可取值为`primary`、`success`、`info`、`warning`、`danger`等，用于定义按钮类型，不同类型有不同的颜色和样式|—|
   |plain|boolean|`true`表示是朴素按钮，按钮样式为无填充背景，仅边框和文字颜色有变化；`false`为普通样式|`false`|
   |text|boolean|`true`表示是文本按钮，按钮无边框和背景；`false`则不是文本按钮|`false`|
   |bg|boolean|仅在`text`为`true`时有效，`true`表示文本按钮背景色始终显示；`false`表示正常文本按钮样式|`false`|
   |link|boolean|`true`表示是链接按钮，按钮样式类似链接；`false`为普通按钮|`false`|
   |round|boolean|`true`使按钮变为圆角按钮；`false`为普通直角按钮|`false`|
   |circle|boolean|`true`将按钮变为圆形按钮；`false`为非圆形按钮|`false`|
   |loading|boolean|`true`时按钮显示加载状态；`false`为正常状态|`false`|
   |loading-icon|string / Component|用于自定义加载图标组件，可传入图标名称字符串或组件，默认加载图标为`Loading`|`Loading`|
   |disabled|boolean|`true`禁用按钮，按钮不可点击且样式有禁用态区分；`false`按钮可正常使用|`false`|
   |icon|string / Component|用于设置按钮图标，可传入图标名称字符串或组件，不设置则无图标|—|
   |autofocus|boolean|`true`使按钮自动获取焦点，类似原生按钮的`autofocus`属性；`false`则不会自动获取焦点|`false`|
   |native-type|enum|可取值与原生按钮的`type`属性一致，如`button`、`submit`、`reset`，用于设置原生按钮类型|`button`|
   |auto-insert-space|boolean|`true`表示在两个中文字符间自动插入空格；`false`则不插入|—|
   |color|string|用于自定义按钮颜色，传入颜色值（如`#626aef`），框架会自动计算悬停和激活颜色|—|
   |tag|string / Component|用于自定义元素标签，可取值如`button`、`div`、`a`等，默认标签为`button`|`button`|
2. **ButtonGroup 组件属性**
   |属性名|属性值类型|属性值说明|默认值|
   |---|---|---|---|
   |size|enum|可取值为`large`、`small`，用于统一控制按钮组内按钮的尺寸|—|
   |type|enum|可取值为`primary`、`success`、`info`、`warning`、`danger`等，用于统一控制按钮组内按钮的类型|—|

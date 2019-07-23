# PC-program
PC端


### 一些探索到的说明


#### 组件封装说明

##### basic-container

封装了 el-card. 宽度依赖外部容器。

改写：原封装组件不支持头部 slot。做改写：
```
<div slot="header">
  <div name="header"><div>
</div>
<div name="body"></div>
```

# 猪齿鱼UI设计逻辑
## 数据状态驱动
1. Mobx状态管理
> 被观察对象和观察对象的双向绑定原理
> 
> 源码解读链接：<https://zhuanlan.zhihu.com/p/31704920>
> 
> 示例代码：
> ```
> const { observable, autorun } = require("mobx");
> const nums = observable([1, 2, 3]);
> autorun(() => {
>   console.log(nums.reduce((a, b) => a + b));
> });
> nums.push(1);
> ```
> 运行结果：6 7
> 
> 解读：autorun默认执行一次 在nums发生变化后触发更新 自动执行
2. 在react中使用mobx
> 
> 
> react源码：<https://react.iamkasong.com/>
> 
> 使用mobx-react提供的observer方法
> 
> 将组件转换为一个观察对象 组件内部存在mobx对象则会观察该对象
> 
> 当被观察对象发生变化时 调用forceUpdate触发组件更新
3. 数据集对象DataSet基于Mobx实现
> 每个数据集对象由一系列record对象组成
> 
> 调用query方法时根据数据创建record对象
> 
> 调用create方法手动创建record对象
> 
> record对象的最小数据驱动单元是什么？ field
## 代码中的具体使用
1. 列表中的状态驱动
> 示例代码：
> ```
> const settleIsActive = settleDs.selected.length > 0;
> ```
> 实现功能:
> 
> 监听表格的选中操作 控制按钮是否可以点击
2. 详情中的状态驱动
> 示例代码：
> ```
> record.getField('tempValue')!.set('multiple', true);
> ```
> 实现功能:
> 
> 根据某些数据状态设置field的具体表现逻辑
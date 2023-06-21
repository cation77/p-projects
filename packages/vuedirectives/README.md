---
title: vue3 directives
---

> 自定义指令主要是为了重用涉及普通元素的底层 DOM 访问的逻辑

## 自定义指令钩子函数

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

### 常用钩子参数

- `el`: 指令绑定的元素，用于直接操作 DOM
- `binding.value`: 传递给指令的值
- `binding.oldValue`: 仅在 `beforeUpdate` 和 `updated` 钩子函数中可用

## 参考

1. [自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html#directive-hooks)
2. [vue3-10 个常见的实用指令](https://juejin.cn/post/6968996649515515917)

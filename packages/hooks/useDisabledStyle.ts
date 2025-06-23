import { assign, cloneDeep, each, isArray, isFunction } from "lodash-es";
import type { VNode } from "vue";
import { watchEffect, getCurrentInstance, useSlots } from "vue";

const _dfs = (nodes: VNode[], cb: (node: VNode) => void) => {
  if (!isFunction(cb)) return;
  each(nodes ?? [], (node) => {
    cb(node);
    if (isArray(node.children)) _dfs(node.children as VNode[], cb);
  });
}

export const useDisabledStyle = () => {
  const rawProps = new Map();
  const instance = getCurrentInstance();
  const children = useSlots()?.default?.() || [];
  watchEffect(() => {
    if (!instance?.props.disabled) {
      _dfs(children, (node: VNode) => {
        node.props = rawProps.get(node);
      })
    }
    _dfs(children, (node: VNode) => {
      rawProps.set(node, cloneDeep(node.props));
      node.props = assign(node.props, {
        style: {
          cursor: 'not-allowed',
          color: 'var(--pla-disabled-text-color)'
        }
      });
    });
  });
}
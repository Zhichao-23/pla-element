const DEFAULT_NAMESPACE = "pla" as const;

const _bem = (namespace: string, block: string, blockSuffix?: string, element?: string, modifier?: string, modifierValue?: string) => {
  let className = namespace + '-' + block;
  blockSuffix && (className += `-${blockSuffix}`);
  element && (className += `__${element}`);
  modifier && (className += `--${modifier}`);
  modifierValue && (className += `_${modifierValue}`);
  return className;
}

export const useNamespace = (block: string) => {
  const b = (blockSuffix?: string) => {
    return _bem(DEFAULT_NAMESPACE, block, blockSuffix);
  }
  const e = (element: string) => {
    return _bem(DEFAULT_NAMESPACE, block, "", element);
  }
  const m = (modifier: string, modifierValue: string) => {
    return _bem(DEFAULT_NAMESPACE, block, "", "", modifier, modifierValue);
  }
  const is = (state: string) => {
    return "is-" + state;
  }
  return {
    b,
    e,
    m,
    is
  };
}
import isEqual from "lodash.isequal"; // npm i lodash.isequal
import { DependencyList, useEffect, useRef } from "react";

export function useDeepCompareEffect(effect: React.EffectCallback, deps: DependencyList) {
  const prevDeps = useRef<DependencyList>([]);

  if (!isEqual(prevDeps.current, deps)) {
    prevDeps.current = deps;
  }

  useEffect(effect, [prevDeps.current]);
}

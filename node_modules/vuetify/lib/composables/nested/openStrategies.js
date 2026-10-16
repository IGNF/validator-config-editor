// Utilities
import { isNullOrUndefined } from "../../util/index.js";
export const singleOpenStrategy = {
  open: ({
    id,
    value,
    opened,
    parents
  }) => {
    if (value) {
      const newOpened = new Set();
      newOpened.add(id);
      let parent = parents.get(id);
      while (!isNullOrUndefined(parent)) {
        newOpened.add(parent);
        parent = parents.get(parent);
      }
      return newOpened;
    } else {
      opened.delete(id);
      return opened;
    }
  },
  select: () => null
};
export const multipleOpenStrategy = {
  open: ({
    id,
    value,
    opened,
    parents
  }) => {
    if (value) {
      let parent = parents.get(id);
      opened.add(id);
      while (!isNullOrUndefined(parent) && parent !== id) {
        opened.add(parent);
        parent = parents.get(parent);
      }
      return opened;
    } else {
      opened.delete(id);
    }
    return opened;
  },
  select: () => null
};
export const listOpenStrategy = {
  open: multipleOpenStrategy.open,
  select: ({
    id,
    value,
    opened,
    parents
  }) => {
    if (!value) return opened;
    const path = [];
    let parent = parents.get(id);
    while (!isNullOrUndefined(parent)) {
      path.push(parent);
      parent = parents.get(parent);
    }
    return new Set(path);
  }
};
//# sourceMappingURL=openStrategies.js.map
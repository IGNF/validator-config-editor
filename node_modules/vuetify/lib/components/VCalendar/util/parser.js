// Utilities
import { isFunction, isObject, isString } from "../../../util/index.js"; // Types
export function parsedCategoryText(category, categoryText) {
  return isFunction(categoryText) ? categoryText(category) : isString(categoryText) && isObject(category) ? category[categoryText] : isString(category) ? category : '';
}
export function getParsedCategories(categories, categoryText) {
  if (isString(categories)) return categories.split(/\s*,\s/);
  if (Array.isArray(categories)) {
    return categories.map(category => {
      if (isString(category)) return category;
      const categoryName = isString(category.categoryName) ? category.categoryName : parsedCategoryText(category, categoryText);
      return {
        ...category,
        categoryName
      };
    });
  }
  return [];
}
//# sourceMappingURL=parser.js.map
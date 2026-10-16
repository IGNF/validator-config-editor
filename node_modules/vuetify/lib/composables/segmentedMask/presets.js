// Types

function lastDayInMonth(parts) {
  let days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][Number(parts.m) - 1] ?? 31;
  const year = Number(parts.y);
  const isLeapYear = !(year % 4) && (year % 100 || !(year % 400));
  if (days === 29 && parts.y?.length === 4 && !isLeapYear) {
    days = 28;
  }
  return days;
}
export function dateSegments(order, separator, fixYear) {
  const value = {
    y: {
      type: 'value',
      key: 'y',
      size: 4,
      max: 9999,
      close: digits => String(fixYear?.(Number(digits)) ?? digits)
    },
    m: {
      type: 'value',
      key: 'm',
      size: 2,
      min: 1,
      max: 12
    },
    d: {
      type: 'value',
      key: 'd',
      size: 2,
      min: 1,
      max: 31,
      softMax: lastDayInMonth
    }
  };
  return [...order].flatMap((key, i) => [...(i ? [{
    type: 'separator',
    value: separator
  }] : []), value[key]]);
}
//# sourceMappingURL=presets.js.map
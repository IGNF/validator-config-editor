export function useAutofocus(props) {
  function onIntersect(isIntersecting, entries) {
    if (!props.autofocus || !isIntersecting) return;
    const el = entries[0].target;
    const target = el.matches('input,textarea') ? el : el.querySelector('input,textarea');

    // Defer past overlay enter setup (e.g. VDialogTransition visibility:hidden)
    setTimeout(() => target?.focus(), 50);
  }
  return {
    onIntersect
  };
}
//# sourceMappingURL=autofocus.js.map
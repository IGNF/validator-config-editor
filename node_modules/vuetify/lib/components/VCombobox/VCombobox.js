import { Fragment as _Fragment, createElementVNode as _createElementVNode, createVNode as _createVNode, mergeProps as _mergeProps, createTextVNode as _createTextVNode, normalizeClass as _normalizeClass, normalizeStyle as _normalizeStyle } from "vue";
// Styles
import "./VCombobox.css";

// Components
import { VAvatar } from "../VAvatar/index.js";
import { VCheckboxBtn } from "../VCheckbox/index.js";
import { VChip } from "../VChip/index.js";
import { VDefaultsProvider } from "../VDefaultsProvider/index.js";
import { VDivider } from "../VDivider/index.js";
import { VIcon } from "../VIcon/index.js";
import { useInputIcon } from "../VInput/InputIcon.js";
import { VList, VListItem, VListSubheader } from "../VList/index.js";
import { VMenu } from "../VMenu/index.js";
import { makeSelectProps } from "../VSelect/VSelect.js";
import { VSheet } from "../VSheet/index.js";
import { VTextField } from "../VTextField/index.js";
import { makeVTextFieldProps } from "../VTextField/VTextField.js";
import { VVirtualScroll } from "../VVirtualScroll/index.js";
import { VHighlight } from "../../labs/VHighlight/index.js"; // Composables
import { useFocusRepair } from "../VSelect/useFocusRepair.js";
import { useScrolling } from "../VSelect/useScrolling.js";
import { useSelectionMenu } from "../VSelect/useSelectionMenu.js";
import { useTextColor } from "../../composables/color.js";
import { injectNestedDefaults } from "../../composables/defaults.js";
import { useElevation } from "../../composables/elevation.js";
import { makeFilterProps, useFilter } from "../../composables/filter.js";
import { useFocusGroups } from "../../composables/focusGroups.js";
import { useForm } from "../../composables/form.js";
import { forwardRefs } from "../../composables/forwardRefs.js";
import { transformItem, useItems } from "../../composables/list-items.js";
import { useLocale } from "../../composables/locale.js";
import { useMenuActivator } from "../../composables/menuActivator.js";
import { useProxiedModel } from "../../composables/proxiedModel.js"; // Utilities
import { computed, mergeProps, nextTick, ref, shallowRef, toRef, watch } from 'vue';
import { camelizeProps, checkPrintable, deepEqual, ensureValidVNode, escapeForRegex, genericComponent, getActiveElement, IN_BROWSER, isComposingIgnoreKey, isFunction, isNumber, noop, omit, propsFactory, useRender, wrapInArray } from "../../util/index.js"; // Types
export const makeVComboboxProps = propsFactory({
  alwaysFilter: Boolean,
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: {
    type: Boolean,
    default: true
  },
  delimiters: Array,
  closeOnInputClick: Boolean,
  trimValues: Boolean,
  ...makeFilterProps({
    filterKeys: ['title']
  }),
  ...makeSelectProps({
    hideNoData: true,
    returnObject: true
  }),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: 'combobox'
  }), ['validationValue', 'dirty'])
}, 'VCombobox');
export const VCombobox = genericComponent()({
  name: 'VCombobox',
  props: makeVComboboxProps(),
  emits: {
    'update:focused': focused => true,
    'update:modelValue': value => true,
    'update:search': value => true,
    'update:menu': value => true,
    'item:added': item => true,
    'item:removed': item => true,
    'item:created': item => true
  },
  setup(props, {
    emit,
    slots
  }) {
    const {
      t
    } = useLocale();
    const {
      elevationClasses
    } = useElevation(toRef(() => props.menuElevation));
    const vTextFieldRef = ref();
    const vMenuRef = ref();
    const listRef = ref();
    const headerRef = ref();
    const footerRef = ref();
    const vVirtualScrollRef = ref();
    const isFocused = shallowRef(false);
    const isPristine = shallowRef(true);
    const listHasFocus = shallowRef(false);
    const selectionIndex = shallowRef(-1);
    let cleared = false;
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => vTextFieldRef.value?.color);
    const {
      InputIcon
    } = useInputIcon(props);
    const model = useProxiedModel(props, 'modelValue', [], v => transformIn(wrapInArray(v)), v => {
      const transformed = transformOut(v);
      return props.multiple ? transformed : transformed[0] ?? null;
    });
    const form = useForm(props);
    const closableChips = toRef(() => props.closableChips && !form.isReadonly.value && !form.isDisabled.value);
    const chipDefaults = injectNestedDefaults('VChip');
    const hasChips = computed(() => !!(props.chips || slots.chip));
    const hasSelectionSlot = computed(() => hasChips.value || !!slots.selection);
    const _search = shallowRef(!props.multiple && !hasSelectionSlot.value ? model.value[0]?.title ?? '' : '');
    const _searchLock = shallowRef(null);
    const search = computed({
      get: () => {
        return _search.value;
      },
      set: async val => {
        _search.value = val ?? '';
        if (val === null || val === '' && !props.multiple && !hasSelectionSlot.value) {
          for (const item of model.value) {
            emit('item:removed', item);
          }
          model.value = [];
        } else if (!props.multiple && !hasSelectionSlot.value) {
          model.value = [transformItem(props, val)];
          nextTick(() => vVirtualScrollRef.value?.scrollToIndex(0));
        }
        if (val && props.multiple && props.delimiters?.length) {
          const values = splitByDelimiters(val);
          if (values.length > 1) {
            selectMultiple(values);
            _search.value = '';
          }
        }
        if (!val) selectionIndex.value = -1;
        isPristine.value = !val;
      }
    });
    const counterValue = computed(() => {
      return isFunction(props.counterValue) ? props.counterValue(model.value) : isNumber(props.counterValue) ? props.counterValue : props.multiple ? model.value.length : search.value.length;
    });
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, () => _searchLock.value ?? (props.alwaysFilter || !isPristine.value ? search.value : ''));
    const displayItems = computed(() => {
      if (props.hideSelected && _searchLock.value === null) {
        return filteredItems.value.filter(filteredItem => !model.value.some(s => s.value === filteredItem.value));
      }
      return filteredItems.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || form.isReadonly.value || form.isDisabled.value);
    const {
      menu,
      closeOnSelect
    } = useSelectionMenu(props, {
      vMenuRef,
      menuDisabled,
      isFocused
    });
    const {
      menuId,
      ariaExpanded,
      ariaControls
    } = useMenuActivator(props, menu);
    const {
      listEvents,
      onActivatorKeydown,
      setPendingFocus,
      flushPendingFocus
    } = useScrolling(listRef, vTextFieldRef, vVirtualScrollRef, displayItems, {
      selectedIndex: () => isPristine.value ? getSelectedIndex() : -1,
      headerEl: () => headerRef.value,
      menuContentEl: () => vMenuRef.value?.contentEl,
      noAutoScroll: () => props.noAutoScroll
    });
    watch(_search, value => {
      if (cleared) {
        // wait for clear to finish, VTextField sets _search to null
        // then search computed triggers and updates _search to ''
        nextTick(() => cleared = false);
      } else if (isFocused.value && !menu.value) {
        menu.value = true;
      }
      if (menu.value && isFocused.value) {
        nextTick(() => {
          vVirtualScrollRef.value?.scrollToIndex(0);
          if (listRef.value?.$el?.contains(getActiveElement())) {
            vTextFieldRef.value?.focus();
          }
        });
      }
      emit('update:search', value);
    });
    watch(model, value => {
      if (!props.multiple && !hasSelectionSlot.value) {
        _search.value = value[0]?.title ?? '';
      }
    });
    const selectedValues = computed(() => model.value.map(selection => selection.value));
    const firstSelectableItem = computed(() => displayItems.value.find(x => x.type === 'item' && !x.props.disabled));
    const highlightFirst = computed(() => {
      const selectFirst = props.autoSelectFirst === true || props.autoSelectFirst === 'exact' && search.value === firstSelectableItem.value?.title;
      return selectFirst && displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value;
    });
    const repairOrphanedFocus = useFocusRepair(menu, () => vMenuRef.value?.contentEl, () => vTextFieldRef.value?.controlRef);
    const {
      onTabKeydown
    } = useFocusGroups({
      groups: [{
        type: 'element',
        contentRef: headerRef
      }, {
        type: 'list',
        contentRef: listRef,
        displayItemsCount: () => displayItems.value.length
      }, {
        type: 'element',
        contentRef: footerRef
      }],
      onLeave: () => {
        menu.value = false;
        vTextFieldRef.value?.focus();
      }
    });
    function onClear(e) {
      cleared = true;
      nextTick(() => cleared = false);
      if (props.openOnClear) {
        menu.value = true;
      }
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;
      menu.value = props.closeOnInputClick ? !menu.value : true;
    }
    function onMousedownMenuIcon(e) {
      if (menuDisabled.value) return;
      if (isFocused.value) {
        e.preventDefault();
        e.stopPropagation();
        menu.value = !menu.value;
      }
    }
    function onMenuKeydown(e) {
      if (e.key === 'Tab') {
        onTabKeydown(e);
      }
      if (listRef.value?.$el.contains(e.target) && (checkPrintable(e) || e.key === 'Backspace')) {
        vTextFieldRef.value?.focus();
      }
    }
    function onKeydown(e) {
      if (isComposingIgnoreKey(e) || form.isReadonly.value) return;
      switch (e.key) {
        case 'Escape':
          menu.value = false;
          break;
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault();
          if (onActivatorKeydown(e, menu)) break;
          if (e.key === 'ArrowDown' && highlightFirst.value) {
            listRef.value?.focus('next');
          }
          break;
        case 'Enter':
          e.preventDefault();
          menu.value = true;
          selectHighlighted();
          if (search.value) selectFreeText();
          break;
        case 'Tab':
          selectHighlighted();
          menu.value = false;
          break;
        default:
          onSelectionKeydown(e);
      }
    }
    function selectHighlighted() {
      const item = firstSelectableItem.value;
      if (!highlightFirst.value || !item) return;
      if (model.value.some(({
        value
      }) => value === item.value)) return;
      select(item);
    }
    function selectFreeText() {
      const value = props.trimValues ? search.value.trim() : search.value;
      if (!value) {
        search.value = '';
        return;
      }
      select(transformItem(props, value), true, true);
      if (hasSelectionSlot.value) _search.value = '';
    }
    function onSelectionKeydown(e) {
      const length = model.value.length;
      if (['Backspace', 'Delete'].includes(e.key)) {
        if (!props.multiple && hasSelectionSlot.value && length > 0 && !search.value) return select(model.value[0], false);
        if (~selectionIndex.value) {
          e.preventDefault();
          const originalSelectionIndex = selectionIndex.value;
          select(model.value[selectionIndex.value], false);
          selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
        } else if (e.key === 'Backspace' && !search.value) {
          selectionIndex.value = length - 1;
        }
        return;
      }
      if (!props.multiple) return;
      if (e.key === 'ArrowLeft') {
        if (selectionIndex.value < 0 && (vTextFieldRef.value?.selectionStart ?? 0) > 0) return;
        const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
        if (model.value[prev]) {
          selectionIndex.value = prev;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value?.setSelectionRange(search.value.length, search.value.length);
        }
      } else if (e.key === 'ArrowRight') {
        if (selectionIndex.value < 0) return;
        const next = selectionIndex.value + 1;
        if (model.value[next]) {
          selectionIndex.value = next;
        } else {
          selectionIndex.value = -1;
          vTextFieldRef.value?.setSelectionRange(0, 0);
        }
      } else if (~selectionIndex.value && checkPrintable(e)) {
        selectionIndex.value = -1;
      }
    }
    function onPaste(e) {
      const clipboardText = e?.clipboardData?.getData('Text') ?? '';
      const values = splitByDelimiters(clipboardText);
      if (values.length > 1 && props.multiple) {
        e.preventDefault();
        selectMultiple(values);
      }
    }
    function getSelectedIndex() {
      return displayItems.value.findIndex(item => model.value.some(s => (props.valueComparator || deepEqual)(s.value, item.value)));
    }
    function onAfterEnter() {
      if (props.eager) {
        vVirtualScrollRef.value?.calculateVisibleItems();
      }
      flushPendingFocus();
    }
    function onAfterLeave() {
      if (isFocused.value) {
        if (vMenuRef.value?.contentEl?._clickOutside?.lastMousedownWasOutside) {
          isFocused.value = false;
        } else {
          vTextFieldRef.value?.focus();
        }
      }
      isPristine.value = true;
      _searchLock.value = null;
    }
    function isExistingItem(item) {
      const comparator = props.valueComparator || deepEqual;
      return items.value.some(i => comparator(i.value, item.value));
    }

    /** @param set - null means toggle */
    function select(item, set = true, keepMenu = false) {
      if (!item || item.props.disabled) return;
      const comparator = props.valueComparator || deepEqual;
      if (props.multiple) {
        const index = model.value.findIndex(selection => comparator(selection.value, item.value));
        const add = set == null ? !~index : set;
        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          const [removed] = value.splice(index, 1);
          if (!add) emit('item:removed', removed); // skip if only reordered
          model.value = value;
        } else if (add) {
          emit('item:added', item);
          if (!isExistingItem(item)) emit('item:created', item);
          model.value = [...model.value, item];
        }
        if (props.clearOnSelect) {
          search.value = '';
        }
      } else {
        const add = set !== false;
        const old = model.value[0];
        if (add) {
          if (old && !comparator(old.value, item.value)) {
            emit('item:removed', old);
            emit('item:added', item);
            if (!isExistingItem(item)) emit('item:created', item);
          } else if (!old) {
            emit('item:added', item);
            if (!isExistingItem(item)) emit('item:created', item);
          }
          model.value = [item];
        } else {
          if (old) emit('item:removed', old);
          model.value = [];
        }
        if ((!isPristine.value || props.alwaysFilter) && _search.value) {
          _searchLock.value = _search.value;
        }
        _search.value = add && !hasSelectionSlot.value ? item.title : '';

        // watch for search watcher to trigger
        nextTick(() => {
          if (!keepMenu) closeOnSelect();
          isPristine.value = true;
        });
      }
    }
    function splitByDelimiters(val) {
      const effectiveDelimiters = ['\n', ...(props.delimiters ?? [])];
      const signsToMatch = effectiveDelimiters.map(escapeForRegex).join('|');
      return val.split(new RegExp(`(?:${signsToMatch})+`));
    }
    async function selectMultiple(values) {
      for (let value of values) {
        value = value.trim();
        if (value) {
          select(transformItem(props, value));
          await nextTick();
        }
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
      setTimeout(() => {
        listHasFocus.value = true;
      });
    }
    function onFocusout(e) {
      listHasFocus.value = false;
      if (!vTextFieldRef.value?.$el.contains(e.relatedTarget)) {
        if (repairOrphanedFocus(e)) return;
        isFocused.value = false;
      }
    }
    let mousedownInsideContentAt = 0;
    function onMousedownContent() {
      mousedownInsideContentAt = performance.now();
    }
    function onBlur(e) {
      const next = e.relatedTarget;
      const menuContent = vMenuRef.value?.contentEl;
      if (menuContent?.contains(next) || !next && performance.now() - mousedownInsideContentAt < 10) {
        isFocused.value = true;
      }
    }
    watch(isFocused, (val, oldVal) => {
      if (val || val === oldVal) return;
      selectionIndex.value = -1;
      menu.value = false;
      if (search.value) {
        const value = props.trimValues ? search.value.trim() : search.value;
        if (!value) {
          search.value = '';
          return;
        }
        if (props.multiple) {
          select(transformItem(props, value));
          return;
        }
        if (!hasSelectionSlot.value) {
          if (value !== search.value) select(transformItem(props, value));
          return;
        }
        if (model.value.some(({
          title
        }) => title === value)) {
          _search.value = '';
        } else {
          select(transformItem(props, value));
        }
      }
    });
    watch(menu, val => {
      if (!val) setPendingFocus(null);
      if (!props.hideSelected && val && model.value.length && isPristine.value) {
        const index = getSelectedIndex();
        IN_BROWSER && !props.noAutoScroll && window.requestAnimationFrame(() => {
          index >= 0 && vVirtualScrollRef.value?.scrollToIndex(index, 'center');
        });
      }
      if (val) _searchLock.value = null;
    });
    watch(items, (newVal, oldVal) => {
      if (menu.value) return;
      if (isFocused.value && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots['prepend-item'] || slots['append-item'] || slots['no-data']);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      const menuSlotProps = {
        search,
        filteredItems: filteredItems.value
      };
      return _createVNode(VTextField, _mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "form": props.autocomplete === 'suppress' ? '' : undefined,
        "name": props.autocomplete === 'suppress' ? props.name : undefined,
        "modelValue": search.value,
        "onUpdate:modelValue": $event => search.value = $event,
        "focused": isFocused.value,
        "onUpdate:focused": $event => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "class": ['v-combobox', {
          'v-combobox--active-menu': menu.value,
          'v-combobox--chips': !!props.chips,
          'v-combobox--selection-slot': !!hasSelectionSlot.value,
          'v-combobox--selecting-index': selectionIndex.value > -1,
          [`v-combobox--${props.multiple ? 'multiple' : 'single'}`]: true
        }, props.class],
        "style": props.style,
        "readonly": form.isReadonly.value,
        "placeholder": isDirty ? undefined : props.placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onKeydown": onKeydown,
        "onPaste": onPaste,
        "onBlur": onBlur,
        "aria-expanded": ariaExpanded.value,
        "aria-controls": ariaControls.value
      }), {
        ...slots,
        default: ({
          id
        }) => _createElementVNode(_Fragment, null, [selectedValues.value.map((value, i) => _createElementVNode("input", {
          "key": i,
          "type": "hidden",
          "name": props.name,
          "value": value,
          "form": props.form
        }, null)), _createVNode(VMenu, _mergeProps({
          "id": menuId.value,
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": $event => menu.value = $event,
          "activator": "parent",
          "captureFocus": false,
          "openOnArrow": false,
          "disabled": menuDisabled.value,
          "_disableKeys": true,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "onAfterEnter": onAfterEnter,
          "onAfterLeave": onAfterLeave
        }, props.menuProps, {
          "contentClass": ['v-combobox__content', elevationClasses.value, props.menuProps?.contentClass]
        }), {
          default: () => [_createVNode(VSheet, {
            "onFocusin": onFocusin,
            "onKeydown": onMenuKeydown,
            "onMousedown": onMousedownContent
          }, {
            default: () => [slots['menu-header'] && _createElementVNode("header", {
              "ref": headerRef
            }, [slots['menu-header'](menuSlotProps)]), hasList && _createVNode(VList, _mergeProps({
              "key": "combobox-list",
              "ref": listRef,
              "class": "v-list--navigable",
              "filterable": true,
              "selected": selectedValues.value,
              "selectStrategy": props.multiple ? 'independent' : 'single-independent',
              "onMousedown": e => e.preventDefault(),
              "selectable": !!displayItems.value.length,
              "onFocusout": onFocusout,
              "tabindex": "-1",
              "aria-live": "polite",
              "aria-labelledby": `${id.value}-label`,
              "aria-multiselectable": props.multiple,
              "color": props.itemColor ?? props.color
            }, listEvents, props.listProps), {
              default: () => [slots['prepend-item']?.(), !displayItems.value.length && !props.hideNoData && (slots['no-data']?.() ?? _createVNode(VListItem, {
                "key": "no-data",
                "title": t(props.noDataText)
              }, null)), _createVNode(VVirtualScroll, {
                "ref": vVirtualScrollRef,
                "renderless": true,
                "items": displayItems.value,
                "itemKey": "value"
              }, {
                default: ({
                  item,
                  index,
                  itemRef
                }) => {
                  const camelizedProps = camelizeProps(item.props);
                  const itemProps = mergeProps(item.props, {
                    ref: itemRef,
                    key: item.value,
                    active: highlightFirst.value && item === firstSelectableItem.value ? true : undefined,
                    onClick: () => select(item, null),
                    'aria-posinset': index + 1,
                    'aria-setsize': displayItems.value.length
                  });
                  if (item.type === 'divider') {
                    return slots.divider?.({
                      props: item.raw,
                      index
                    }) ?? _createVNode(VDivider, _mergeProps(item.props, {
                      "ref": itemRef,
                      "key": `divider-${index}`
                    }), null);
                  }
                  if (item.type === 'subheader') {
                    return slots.subheader?.({
                      props: item.raw,
                      index
                    }) ?? _createVNode(VListSubheader, _mergeProps(item.props, {
                      "ref": itemRef,
                      "key": `subheader-${index}`
                    }), null);
                  }
                  return slots.item?.({
                    item: item.raw,
                    internalItem: item,
                    index,
                    props: itemProps
                  }) ?? _createVNode(VListItem, _mergeProps(itemProps, {
                    "role": "option"
                  }), {
                    prepend: ({
                      isSelected
                    }) => _createElementVNode(_Fragment, null, [props.multiple && !props.hideSelected ? _createVNode(VCheckboxBtn, {
                      "key": item.value,
                      "modelValue": isSelected,
                      "ripple": false,
                      "tabindex": "-1",
                      "aria-hidden": true,
                      "onClick": event => event.preventDefault()
                    }, null) : undefined, camelizedProps.prependAvatar && _createVNode(VAvatar, {
                      "image": camelizedProps.prependAvatar
                    }, null), camelizedProps.prependIcon && _createVNode(VIcon, {
                      "icon": camelizedProps.prependIcon
                    }, null)]),
                    title: () => {
                      return isPristine.value ? item.title : _createVNode(VHighlight, {
                        "text": item.title,
                        "matches": getMatches(item)?.title,
                        "markClass": "v-combobox__mask",
                        "matchAll": true,
                        "ignoreCase": true
                      }, null);
                    }
                  });
                }
              }), slots['append-item']?.()]
            }), slots['menu-footer'] && _createElementVNode("footer", {
              "ref": footerRef
            }, [slots['menu-footer'](menuSlotProps)])]
          })]
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = mergeProps(VChip.filterProps(item.props), {
            'onClick:close': onChipClose,
            onKeydown(e) {
              if (e.key !== 'Enter' && e.key !== ' ') return;
              e.preventDefault();
              e.stopPropagation();
              onChipClose(e);
            },
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            'onUpdate:modelValue': undefined
          });
          const hasSlot = hasChips.value ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips.value ? slots.chip({
            item: item.raw,
            internalItem: item,
            index,
            props: slotProps
          }) : slots.selection({
            item: item.raw,
            internalItem: item,
            index
          })) : undefined;
          if (hasSlot && !slotContent) return undefined;
          return _createElementVNode("div", {
            "key": item.value,
            "class": _normalizeClass(['v-combobox__selection', index === selectionIndex.value && ['v-combobox__selection--selected', textColorClasses.value]]),
            "style": _normalizeStyle(index === selectionIndex.value ? textColorStyles.value : {})
          }, [hasChips.value ? !slots.chip ? _createVNode(VChip, _mergeProps({
            "key": "chip",
            "closable": closableChips.value,
            "size": chipDefaults.value?.size ?? 'small',
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : _createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: closableChips.value,
                size: chipDefaults.value?.size ?? 'small',
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent ?? _createElementVNode("span", {
            "class": "v-combobox__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && _createElementVNode("span", {
            "class": "v-combobox__selection-comma"
          }, [_createTextVNode(",")])])]);
        })]),
        'append-inner': (...args) => _createElementVNode(_Fragment, null, [slots['append-inner']?.(...args), (!props.hideNoData || props.items.length) && props.menuIcon ? _createVNode(VIcon, {
          "class": "v-combobox__menu-icon",
          "color": vTextFieldRef.value?.fieldIconColor,
          "icon": props.menuIcon,
          "onMousedown": onMousedownMenuIcon,
          "onClick": noop,
          "aria-hidden": true,
          "tabindex": "-1"
        }, null) : undefined, props.appendInnerIcon && _createVNode(InputIcon, {
          "key": "append-icon",
          "name": "appendInner",
          "color": args[0].iconColor.value
        }, null)])
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      selectionIndex,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});
//# sourceMappingURL=VCombobox.js.map
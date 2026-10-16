import { Fragment as _Fragment, mergeProps as _mergeProps, createElementVNode as _createElementVNode, normalizeClass as _normalizeClass, createVNode as _createVNode } from "vue";
// Styles
import "./VFileInput.css";

// Components
import { VChip } from "../VChip/index.js";
import { VCounter } from "../VCounter/index.js";
import { VField } from "../VField/index.js";
import { makeVFieldProps } from "../VField/VField.js";
import { makeVInputProps, VInput } from "../VInput/VInput.js"; // Composables
import { injectNestedDefaults } from "../../composables/defaults.js";
import { useFileDrop } from "../../composables/fileDrop.js";
import { makeFileFilterProps, useFileFilter } from "../../composables/fileFilter.js";
import { useFocus } from "../../composables/focus.js";
import { forwardRefs } from "../../composables/forwardRefs.js";
import { useLocale } from "../../composables/locale.js";
import { useProxiedModel } from "../../composables/proxiedModel.js"; // Utilities
import { computed, nextTick, ref, shallowRef, toRef, watch } from 'vue';
import { callEvent, filterInputAttrs, genericComponent, getActiveElement, humanReadableFileSize, isBoolean, isObject, omit, propsFactory, useRender, wrapInArray } from "../../util/index.js"; // Types
export const makeVFileInputProps = propsFactory({
  chips: Boolean,
  counter: {
    type: Boolean,
    default: undefined
  },
  counterSizeString: {
    type: String,
    default: '$vuetify.fileInput.counterSize'
  },
  counterString: {
    type: String,
    default: '$vuetify.fileInput.counter'
  },
  hideInput: Boolean,
  multiple: Boolean,
  placeholder: String,
  persistentPlaceholder: Boolean,
  showSize: {
    type: [Boolean, Number, String],
    default: false,
    validator: v => {
      return isBoolean(v) || [1000, 1024].includes(Number(v));
    }
  },
  truncateLength: {
    type: [Number, String],
    default: 22
  },
  ...omit(makeVInputProps({
    prependIcon: '$file'
  }), ['direction']),
  modelValue: {
    type: [Array, Object],
    default: props => props.multiple ? [] : null,
    validator: val => wrapInArray(val).every(isObject)
  },
  ...makeFileFilterProps(),
  ...makeVFieldProps({
    clearable: true
  })
}, 'VFileInput');
export const VFileInput = genericComponent()({
  name: 'VFileInput',
  inheritAttrs: false,
  props: makeVFileInputProps(),
  emits: {
    'click:control': e => true,
    'mousedown:control': e => true,
    'update:focused': focused => true,
    'update:modelValue': files => true,
    rejected: files => true
  },
  setup(props, {
    attrs,
    emit,
    slots
  }) {
    const {
      t
    } = useLocale();
    const {
      filterAccepted
    } = useFileFilter(props);
    const model = useProxiedModel(props, 'modelValue', props.modelValue, val => wrapInArray(val), val => !props.multiple && Array.isArray(val) ? val[0] : val);
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const chipDefaults = injectNestedDefaults('VChip');
    const base = computed(() => !isBoolean(props.showSize) ? props.showSize : undefined);
    const totalBytes = computed(() => (model.value ?? []).reduce((bytes, {
      size = 0
    }) => bytes + size, 0));
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
    const fileNames = computed(() => (model.value ?? []).map(file => {
      const {
        name = '',
        size = 0
      } = file;
      const truncatedText = truncateText(name);
      return !props.showSize ? truncatedText : `${truncatedText} (${humanReadableFileSize(size, base.value)})`;
    }));
    const counterValue = computed(() => {
      const fileCount = model.value?.length ?? 0;
      if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value);else return t(props.counterString, fileCount);
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const inputRef = ref();
    const isActive = toRef(() => props.persistentPlaceholder || isFocused.value || props.active);
    const isPlainOrUnderlined = computed(() => ['plain', 'underlined'].includes(props.variant));
    const isDragging = shallowRef(false);
    const {
      handleDrop,
      hasFilesOrFolders,
      isDraggingFiles
    } = useFileDrop();
    function onFocus() {
      if (inputRef.value !== getActiveElement()) {
        inputRef.value?.focus();
      }
      if (!isFocused.value) focus();
    }
    function onClickPrepend(e) {
      inputRef.value?.click();
    }
    function onControlMousedown(e) {
      emit('mousedown:control', e);
    }
    function onControlClick(e) {
      inputRef.value?.click();
      emit('click:control', e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = [];
        callEvent(props['onClick:clear'], e);
      });
    }
    function truncateText(str) {
      if (str.length < Number(props.truncateLength)) return str;
      const charsKeepOneSide = Math.floor((Number(props.truncateLength) - 1) / 2);
      return `${str.slice(0, charsKeepOneSide)}…${str.slice(str.length - charsKeepOneSide)}`;
    }
    function onDragover(e) {
      if (props.disabled || props.readonly) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (isDraggingFiles(e)) isDragging.value = true;
    }
    function onDragleave(e) {
      e.preventDefault();
      const container = e.currentTarget;
      if (!container.contains(e.relatedTarget)) {
        isDragging.value = false;
      }
    }
    async function onDrop(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      isDragging.value = false;
      if (!inputRef.value || props.disabled || props.readonly || !hasFilesOrFolders(e)) return;
      const allDroppedFiles = await handleDrop(e);
      selectAccepted(allDroppedFiles);
    }
    async function onPaste(e) {
      if (!inputRef.value || props.disabled || props.readonly || !hasFilesOrFolders(e)) return;
      e.preventDefault();
      const files = await handleDrop(e);
      if (files.length) {
        selectAccepted(files);
      }
    }
    function onFileSelection(e) {
      if (!e.target || e.repack) return; // prevent loop

      if (!props.filterByType) {
        const target = e.target;
        model.value = [...(target.files ?? [])];
      } else {
        selectAccepted([...e.target.files]);
      }
    }
    function selectAccepted(files) {
      const dataTransfer = new DataTransfer();
      const {
        accepted,
        rejected
      } = filterAccepted(files);
      if (rejected.length) {
        emit('rejected', rejected);
      }
      for (const file of accepted) {
        dataTransfer.items.add(file);
      }
      inputRef.value.files = dataTransfer.files;
      model.value = [...dataTransfer.files];
      const event = new Event('change', {
        bubbles: true
      });
      event.repack = true;
      inputRef.value.dispatchEvent(event);
    }
    watch(model, newValue => {
      const hasModelReset = !Array.isArray(newValue) || !newValue.length;
      if (hasModelReset && inputRef.value) {
        inputRef.value.value = '';
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter !== undefined);
      const counterActive = props.counter !== false && props.counter !== null && !!model.value?.length;
      const hasDetails = props.hideDetails !== true && !!(slots.details || hasCounter);
      const detailsActive = !!(slots.details || hasCounter && counterActive);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = {
        ...VField.filterProps(props),
        'onClick:clear': onClear
      };
      const expectsDirectory = attrs.webkitdirectory !== undefined && attrs.webkitdirectory !== false;
      const acceptFallback = attrs.accept ? String(attrs.accept) : undefined;
      const inputAccept = expectsDirectory ? undefined : props.filterByType ?? acceptFallback;
      const showPlaceholder = !!props.placeholder && !model.value?.length && (isFocused.value || props.persistentPlaceholder || !props.label);
      return _createVNode(VInput, _mergeProps({
        "ref": vInputRef,
        "modelValue": props.multiple ? model.value : model.value[0],
        "class": ['v-file-input', {
          'v-file-input--chips': !!props.chips,
          'v-file-input--dragging': isDragging.value,
          'v-file-input--hide': props.hideInput,
          'v-input--plain-underlined': isPlainOrUnderlined.value
        }, props.class],
        "style": props.style,
        "onClick:prepend": onClickPrepend
      }, rootAttrs, inputProps, {
        "centerAffix": !isPlainOrUnderlined.value,
        "focused": isFocused.value,
        "detailsActive": detailsActive,
        "indentDetails": props.indentDetails ?? !isPlainOrUnderlined.value
      }), {
        ...slots,
        default: ({
          id,
          isDisabled,
          isDirty,
          isReadonly,
          isValid,
          hasDetails
        }) => _createVNode(VField, _mergeProps({
          "ref": vFieldRef,
          "prependIcon": props.prependIcon,
          "onMousedown": onControlMousedown,
          "onClick": onControlClick,
          "onClick:prependInner": props['onClick:prependInner'],
          "onClick:appendInner": props['onClick:appendInner']
        }, fieldProps, {
          "id": id.value,
          "active": isActive.value || isDirty.value,
          "dirty": isDirty.value || props.dirty,
          "disabled": isDisabled.value,
          "focused": isFocused.value,
          "details": hasDetails.value,
          "error": isValid.value === false,
          "onDragleave": onDragleave,
          "onDragover": onDragover,
          "onDrop": onDrop
        }), {
          ...slots,
          default: ({
            props: {
              class: fieldClass,
              ...slotProps
            },
            controlRef
          }) => _createElementVNode(_Fragment, null, [_createElementVNode("input", _mergeProps({
            "ref": val => inputRef.value = controlRef.value = val,
            "type": "file",
            "accept": inputAccept,
            "readonly": isReadonly.value,
            "disabled": isDisabled.value,
            "multiple": props.multiple,
            "name": props.name,
            "onClick": e => {
              e.stopPropagation();
              if (isReadonly.value) e.preventDefault();
              onFocus();
            },
            "onChange": onFileSelection,
            "onFocus": onFocus,
            "onBlur": blur,
            "onPaste": onPaste
          }, slotProps, inputAttrs), null), showPlaceholder ? _createElementVNode("input", {
            "class": _normalizeClass(fieldClass),
            "inert": true,
            "placeholder": props.placeholder,
            "readonly": true,
            "form": "",
            "type": "text"
          }, null) : _createElementVNode("div", {
            "class": _normalizeClass(fieldClass)
          }, [!!model.value?.length && !props.hideInput && (slots.selection ? slots.selection({
            fileNames: fileNames.value,
            totalBytes: totalBytes.value,
            totalBytesReadable: totalBytesReadable.value
          }) : props.chips ? fileNames.value.map(text => _createVNode(VChip, {
            "key": text,
            "size": chipDefaults.value?.size ?? 'small',
            "text": text
          }, null)) : fileNames.value.join(', '))])])
        }),
        details: hasDetails ? slotProps => _createElementVNode(_Fragment, null, [slots.details?.(slotProps), hasCounter && _createElementVNode(_Fragment, null, [_createElementVNode("span", null, null), _createVNode(VCounter, {
          "active": counterActive,
          "value": counterValue.value,
          "disabled": props.disabled
        }, slots.counter)])]) : undefined
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, inputRef);
  }
});
//# sourceMappingURL=VFileInput.js.map
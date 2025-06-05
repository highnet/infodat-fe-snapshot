declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends CustomElements {}
  }
}

/**
 * This type can be used to create scoped tags for your components.
 *
 * Usage:
 *
 * ```ts
 * import type { ScopedElements } from "path/to/library/jsx-integration";
 *
 * declare module "my-library" {
 *   namespace JSX {
 *     interface IntrinsicElements
 *       extends ScopedElements<'test-', ''> {}
 *   }
 * }
 * ```
 *
 */
export type ScopedElements<
  Prefix extends string = "",
  Suffix extends string = ""
> = {
  [Key in keyof CustomElements as `${Prefix}${Key}${Suffix}`]: CustomElements[Key];
};

type BaseProps = {
  /** Content added between the opening and closing tags of the element */
  children?: any;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  class?: string;
  /** Used for declaratively styling one or more elements using CSS (Cascading Stylesheets) */
  className?: string;
  /** Takes an object where the key is the class name(s) and the value is a boolean expression. When true, the class is applied, and when false, it is removed. */
  classList?: Record<string, boolean | undefined>;
  /** Specifies the text direction of the element. */
  dir?: "ltr" | "rtl";
  /** Contains a space-separated list of the part names of the element that should be exposed on the host element. */
  exportparts?: string;
  /** For <label> and <output>, lets you associate the label with some control. */
  htmlFor?: string;
  /** Specifies whether the element should be hidden. */
  hidden?: boolean | string;
  /** A unique identifier for the element. */
  id?: string;
  /** Keys tell React which array item each component corresponds to */
  key?: string | number;
  /** Specifies the language of the element. */
  lang?: string;
  /** Contains a space-separated list of the part names of the element. Part names allows CSS to select and style specific elements in a shadow tree via the ::part pseudo-element. */
  part?: string;
  /** Use the ref attribute with a variable to assign a DOM element to the variable once the element is rendered. */
  ref?: unknown | ((e: unknown) => void);
  /** Adds a reference for a custom element slot */
  slot?: string;
  /** Prop for setting inline styles */
  style?: Record<string, string | number>;
  /** Overrides the default Tab button behavior. Avoid using values other than -1 and 0. */
  tabIndex?: number;
  /** Specifies the tooltip text for the element. */
  title?: string;
  /** Passing 'no' excludes the element content from being translated. */
  translate?: "yes" | "no";
};

type BaseEvents = {
  /** [`onAnimationEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event): An [`AnimationEvent` handler](https://react.dev/reference/react-dom/components/common#animationevent-handler) function. Fires when a CSS animation completes.
   */
  onAnimationEnd?: (event: AnimationEvent) => void;

  /** `onAnimationEndCapture`: A version of `onAnimationEnd` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onAnimationEndCapture?: (event: AnimationEvent) => void;

  /** [`onAnimationIteration`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationiteration_event): An [`AnimationEvent` handler](https://react.dev/reference/react-dom/components/common#animationevent-handler) function. Fires when an iteration of a CSS animation ends, and another one begins.
   */
  onAnimationIteration?: (event: AnimationEvent) => void;

  /** `onAnimationIterationCapture`: A version of `onAnimationIteration` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onAnimationIterationCapture?: (event: AnimationEvent) => void;

  /** [`onAnimationStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event): An [`AnimationEvent` handler](https://react.dev/reference/react-dom/components/common#animationevent-handler) function. Fires when a CSS animation starts.
   */
  onAnimationStart?: (event: AnimationEvent) => void;

  /** [`onAuxClick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event): A [`MouseEvent` handler](https://react.dev/reference/react-dom/components/common#mouseevent-handler) function. Fires when a non-primary pointer button was clicked.
   */
  onAuxClick?: (event: MouseEvent) => void;

  /** `onAuxClickCapture`: A version of `onAuxClick` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onAuxClickCapture?: (event: MouseEvent) => void;

  /** `onBeforeInput`: An [`InputEvent` handler](https://react.dev/reference/react-dom/components/common#inputevent-handler) function. Fires before the value of an editable element is modified. React does _not_ yet use the native [`beforeinput`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event) event, and instead attempts to polyfill it using other events.
   */
  onBeforeInput?: (event: InputEvent) => void;

  /** `onBeforeInputCapture`: A version of `onBeforeInput` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onBeforeInputCapture?: (event: InputEvent) => void;

  /** `onBlur`: A [`FocusEvent` handler](https://react.dev/reference/react-dom/components/common#focusevent-handler) function. Fires when an element lost focus. Unlike the built-in browser [`blur`](https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event) event, in React the `onBlur` event bubbles.
   */
  onBlur?: (event: FocusEvent) => void;

  /** `onBlurCapture`: A version of `onBlur` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onBlurCapture?: (event: FocusEvent) => void;

  /** [`onClick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event): A [`MouseEvent` handler](https://react.dev/reference/react-dom/components/common#mouseevent-handler) function. Fires when the primary button was clicked on the pointing device.
   */
  onClick?: (event: MouseEvent) => void;

  /** `onClickCapture`: A version of `onClick` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onClickCapture?: (event: MouseEvent) => void;

  /** [`onCompositionStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event): A [`CompositionEvent` handler](https://react.dev/reference/react-dom/components/common#compositionevent-handler) function. Fires when an [input method editor](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) starts a new composition session.
   */
  onCompositionStart?: (event: CompositionEvent) => void;

  /** `onCompositionStartCapture`: A version of `onCompositionStart` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onCompositionStartCapture?: (event: CompositionEvent) => void;

  /** [`onCompositionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event): A [`CompositionEvent` handler](https://react.dev/reference/react-dom/components/common#compositionevent-handler) function. Fires when an [input method editor](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) completes or cancels a composition session.
   */
  onCompositionEnd?: (event: CompositionEvent) => void;

  /** `onCompositionEndCapture`: A version of `onCompositionEnd` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onCompositionEndCapture?: (event: CompositionEvent) => void;

  /** [`onCompositionUpdate`](https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event): A [`CompositionEvent` handler](https://react.dev/reference/react-dom/components/common#compositionevent-handler) function. Fires when an [input method editor](https://developer.mozilla.org/en-US/docs/Glossary/Input_method_editor) receives a new character.
   */
  onCompositionUpdate?: (event: CompositionEvent) => void;

  /** `onCompositionUpdateCapture`: A version of `onCompositionUpdate` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onCompositionUpdateCapture?: (event: CompositionEvent) => void;

  /** [`onContextMenu`](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event): A [`MouseEvent` handler](https://react.dev/reference/react-dom/components/common#mouseevent-handler) function. Fires when the user tries to open a context menu.
   */
  onContextMenu?: (event: MouseEvent) => void;

  /** `onContextMenuCapture`: A version of `onContextMenu` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onContextMenuCapture?: (event: MouseEvent) => void;

  /** [`onCopy`](https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event): A [`ClipboardEvent` handler](https://react.dev/reference/react-dom/components/common#clipboardevent-handler) function. Fires when the user tries to copy something into the clipboard.
   */
  onCopy?: (event: ClipboardEvent) => void;

  /** `onCopyCapture`: A version of `onCopy` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onCopyCapture?: (event: ClipboardEvent) => void;

  /** [`onCut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/cut_event): A [`ClipboardEvent` handler](https://react.dev/reference/react-dom/components/common#clipboardevent-handler) function. Fires when the user tries to cut something into the clipboard.
   */
  onCut?: (event: ClipboardEvent) => void;

  /** `onCutCapture`: A version of `onCut` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onCutCapture?: (event: ClipboardEvent) => void;

  /** `onDoubleClick`: A [`MouseEvent` handler](https://react.dev/reference/react-dom/components/common#mouseevent-handler) function. Fires when the user clicks twice. Corresponds to the browser [`dblclick` event.](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event)
   */
  onDoubleClick?: (event: MouseEvent) => void;

  /** `onDoubleClickCapture`: A version of `onDoubleClick` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onDoubleClickCapture?: (event: MouseEvent) => void;

  /** [`onDrag`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event): A [`DragEvent` handler](https://react.dev/reference/react-dom/components/common#dragevent-handler) function. Fires while the user is dragging something.
   */
  onDrag?: (event: DragEvent) => void;

  /** `onDragCapture`: A version of `onDrag` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onDragCapture?: (event: DragEvent) => void;

  /** [`onDragEnd`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event): A [`DragEvent` handler](https://react.dev/reference/react-dom/components/common#dragevent-handler) function. Fires when the user stops dragging something.
   */
  onDragEnd?: (event: DragEvent) => void;

  /** `onDragEndCapture`: A version of `onDragEnd` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onDragEndCapture?: (event: DragEvent) => void;

  /** [`onDragEnter`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event): A [`DragEvent` handler](https://react.dev/reference/react-dom/components/common#dragevent-handler) function. Fires when the dragged content enters a valid drop target.
   */
  onDragEnter?: (event: DragEvent) => void;

  /** `onDragEnterCapture`: A version of `onDragEnter` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onDragEnterCapture?: (event: DragEvent) => void;

  /** [`onDragOver`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event): A [`DragEvent` handler](https://react.dev/reference/react-dom/components/common#dragevent-handler) function. Fires on a valid drop target while the dragged content is dragged over it. You must call `e.preventDefault()` here to allow dropping.
   */
  onDragOver?: (event: DragEvent) => void;

  /** `onDragOverCapture`: A version of `onDragOver` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onDragOverCapture?: (event: DragEvent) => void;

  /** [`onDragStart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event): A [`DragEvent` handler](https://react.dev/reference/react-dom/components/common#dragevent-handler) function. Fires when the user starts dragging an element.
   */
  onDragStart?: (event: DragEvent) => void;

  /** `onDragStartCapture`: A version of `onDragStart` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onDragStartCapture?: (event: DragEvent) => void;

  /** [`onDrop`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event): A [`DragEvent` handler](https://react.dev/reference/react-dom/components/common#dragevent-handler) function. Fires when something is dropped on a valid drop target.
   */
  onDrop?: (event: DragEvent) => void;

  /** `onDropCapture`: A version of `onDrop` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onDropCapture?: (event: DragEvent) => void;

  /** `onFocus`: A [`FocusEvent` handler](https://react.dev/reference/react-dom/components/common#focusevent-handler) function. Fires when an element receives focus. Unlike the built-in browser [`focus`](https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event) event, in React the `onFocus` event bubbles.
   */
  onFocus?: (event: FocusEvent) => void;

  /** `onFocusCapture`: A version of `onFocus` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onFocusCapture?: (event: FocusEvent) => void;

  /** [`onGotPointerCapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/gotpointercapture_event): A [`PointerEvent` handler](https://react.dev/reference/react-dom/components/common#pointerevent-handler) function. Fires when an element programmatically captures a pointer.
   */
  onGotPointerCapture?: (event: PointerEvent) => void;

  /** `onGotPointerCaptureCapture`: A version of `onGotPointerCapture` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onGotPointerCaptureCapture?: (event: PointerEvent) => void;

  /** [`onKeyDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event): A [`KeyboardEvent` handler](https://react.dev/reference/react-dom/components/common#keyboardevent-handler) function. Fires when a key is pressed.
   */
  onKeyDown?: (event: KeyboardEvent) => void;

  /** `onKeyDownCapture`: A version of `onKeyDown` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onKeyDownCapture?: (event: KeyboardEvent) => void;

  /** [`onKeyPress`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event): A [`KeyboardEvent` handler](https://react.dev/reference/react-dom/components/common#keyboardevent-handler) function. Deprecated. Use `onKeyDown` or `onBeforeInput` instead.
   */
  onKeyPress?: (event: KeyboardEvent) => void;

  /** `onKeyPressCapture`: A version of `onKeyPress` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onKeyPressCapture?: (event: KeyboardEvent) => void;

  /** [`onKeyUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event): A [`KeyboardEvent` handler](https://react.dev/reference/react-dom/components/common#keyboardevent-handler) function. Fires when a key is released.
   */
  onKeyUp?: (event: KeyboardEvent) => void;

  /** `onKeyUpCapture`: A version of `onKeyUp` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onKeyUpCapture?: (event: KeyboardEvent) => void;

  /** [`onLostPointerCapture`](https://developer.mozilla.org/en-US/docs/Web/API/Element/lostpointercapture_event): A [`PointerEvent` handler](https://react.dev/reference/react-dom/components/common#pointerevent-handler) function. Fires when an element stops capturing a pointer.
   */
  onLostPointerCapture?: (event: PointerEvent) => void;

  /** `onLostPointerCaptureCapture`: A version of `onLostPointerCapture` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onLostPointerCaptureCapture?: (event: PointerEvent) => void;

  /** [`onMouseDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event): A [`MouseEvent` handler](https://react.dev/reference/react-dom/components/common#mouseevent-handler) function. Fires when the pointer is pressed down.
   */
  onMouseDown?: (event: MouseEvent) => void;

  /** `onMouseDownCapture`: A version of `onMouseDown` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onMouseDownCapture?: (event: MouseEvent) => void;

  /** [`onMouseEnter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event): A [`MouseEvent` handler](https://react.dev/reference/react-dom/components/common#mouseevent-handler) function. Fires when the pointer moves inside an element. Does not have a capture phase. Instead, `onMouseLeave` and `onMouseEnter` propagate from the element being left to the one being entered.
   */
  onMouseEnter?: (event: MouseEvent) => void;

  /** [`onMouseLeave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event): A [`MouseEvent` handler](https://react.dev/reference/react-dom/components/common#mouseevent-handler) function. Fires when the pointer moves outside an element. Does not have a capture phase. Instead, `onMouseLeave` and `onMouseEnter` propagate from the element being left to the one being entered.
   */
  onMouseLeave?: (event: MouseEvent) => void;

  /** [`onMouseMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event): A [`MouseEvent` handler](https://react.dev/reference/react-dom/components/common#mouseevent-handler) function. Fires when the pointer changes coordinates.
   */
  onMouseMove?: (event: MouseEvent) => void;

  /** `onMouseMoveCapture`: A version of `onMouseMove` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onMouseMoveCapture?: (event: MouseEvent) => void;

  /** [`onMouseOut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event): A [`MouseEvent` handler](https://react.dev/reference/react-dom/components/common#mouseevent-handler) function. Fires when the pointer moves outside an element, or if it moves into a child element.
   */
  onMouseOut?: (event: MouseEvent) => void;

  /** `onMouseOutCapture`: A version of `onMouseOut` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onMouseOutCapture?: (event: MouseEvent) => void;

  /** [`onMouseUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event): A [`MouseEvent` handler](https://react.dev/reference/react-dom/components/common#mouseevent-handler) function. Fires when the pointer is released.
   */
  onMouseUp?: (event: MouseEvent) => void;

  /** `onMouseUpCapture`: A version of `onMouseUp` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onMouseUpCapture?: (event: MouseEvent) => void;

  /** [`onPointerCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointercancel_event): A [`PointerEvent` handler](https://react.dev/reference/react-dom/components/common#pointerevent-handler) function. Fires when the browser cancels a pointer interaction.
   */
  onPointerCancel?: (event: PointerEvent) => void;

  /** `onPointerCancelCapture`: A version of `onPointerCancel` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onPointerCancelCapture?: (event: PointerEvent) => void;

  /** [`onPointerDown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown_event): A [`PointerEvent` handler](https://react.dev/reference/react-dom/components/common#pointerevent-handler) function. Fires when a pointer becomes active.
   */
  onPointerDown?: (event: PointerEvent) => void;

  /** `onPointerDownCapture`: A version of `onPointerDown` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onPointerDownCapture?: (event: PointerEvent) => void;

  /** [`onPointerEnter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerenter_event): A [`PointerEvent` handler](https://react.dev/reference/react-dom/components/common#pointerevent-handler) function. Fires when a pointer moves inside an element. Does not have a capture phase. Instead, `onPointerLeave` and `onPointerEnter` propagate from the element being left to the one being entered.
   */
  onPointerEnter?: (event: PointerEvent) => void;

  /** [`onPointerLeave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerleave_event): A [`PointerEvent` handler](https://react.dev/reference/react-dom/components/common#pointerevent-handler) function. Fires when a pointer moves outside an element. Does not have a capture phase. Instead, `onPointerLeave` and `onPointerEnter` propagate from the element being left to the one being entered.
   */
  onPointerLeave?: (event: PointerEvent) => void;

  /** [`onPointerMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event): A [`PointerEvent` handler](https://react.dev/reference/react-dom/components/common#pointerevent-handler) function. Fires when a pointer changes coordinates.
   */
  onPointerMove?: (event: PointerEvent) => void;

  /** `onPointerMoveCapture`: A version of `onPointerMove` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onPointerMoveCapture?: (event: PointerEvent) => void;

  /** [`onPointerOut`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event): A [`PointerEvent` handler](https://react.dev/reference/react-dom/components/common#pointerevent-handler) function. Fires when a pointer moves outside an element, if the pointer interaction is cancelled, and [a few other reasons.](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event)
   */
  onPointerOut?: (event: PointerEvent) => void;

  /** `onPointerOutCapture`: A version of `onPointerOut` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onPointerOutCapture?: (event: PointerEvent) => void;

  /** [`onPointerUp`](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerup_event): A [`PointerEvent` handler](https://react.dev/reference/react-dom/components/common#pointerevent-handler) function. Fires when a pointer is no longer active.
   */
  onPointerUp?: (event: PointerEvent) => void;

  /** `onPointerUpCapture`: A version of `onPointerUp` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onPointerUpCapture?: (event: PointerEvent) => void;

  /** [`onPaste`](https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event): A [`ClipboardEvent` handler](https://react.dev/reference/react-dom/components/common#clipboardevent-handler) function. Fires when the user tries to paste something from the clipboard.
   */
  onPaste?: (event: ClipboardEvent) => void;

  /** `onPasteCapture`: A version of `onPaste` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onPasteCapture?: (event: ClipboardEvent) => void;

  /** [`onScroll`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when an element has been scrolled. This event does not bubble.
   */
  onScroll?: (event: Event) => void;

  /** `onScrollCapture`: A version of `onScroll` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onScrollCapture?: (event: Event) => void;

  /** [`onSelect`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires after the selection inside an editable element like an input changes. React extends the `onSelect` event to work for `contentEditable={true}` elements as well. In addition, React extends it to fire for empty selection and on edits (which may affect the selection).
   */
  onSelect?: (event: Event) => void;

  /** `onSelectCapture`: A version of `onSelect` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onSelectCapture?: (event: Event) => void;

  /** [`onTouchCancel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event): A [`TouchEvent` handler](https://react.dev/reference/react-dom/components/common#touchevent-handler) function. Fires when the browser cancels a touch interaction.
   */
  onTouchCancel?: (event: TouchEvent) => void;

  /** `onTouchCancelCapture`: A version of `onTouchCancel` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onTouchCancelCapture?: (event: TouchEvent) => void;

  /** [`onTouchEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event): A [`TouchEvent` handler](https://react.dev/reference/react-dom/components/common#touchevent-handler) function. Fires when one or more touch points are removed.
   */
  onTouchEnd?: (event: TouchEvent) => void;

  /** `onTouchEndCapture`: A version of `onTouchEnd` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onTouchEndCapture?: (event: TouchEvent) => void;

  /** [`onTouchMove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove_event): A [`TouchEvent` handler](https://react.dev/reference/react-dom/components/common#touchevent-handler) function. Fires one or more touch points are moved.
   */
  onTouchMove?: (event: TouchEvent) => void;

  /** `onTouchMoveCapture`: A version of `onTouchMove` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onTouchMoveCapture?: (event: TouchEvent) => void;

  /** [`onTouchStart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event): A [`TouchEvent` handler](https://react.dev/reference/react-dom/components/common#touchevent-handler) function. Fires when one or more touch points are placed.
   */
  onTouchStart?: (event: TouchEvent) => void;

  /** `onTouchStartCapture`: A version of `onTouchStart` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onTouchStartCapture?: (event: TouchEvent) => void;

  /** [`onTransitionEnd`](https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event): A [`TransitionEvent` handler](https://react.dev/reference/react-dom/components/common#transitionevent-handler) function. Fires when a CSS transition completes.
   */
  onTransitionEnd?: (event: TransitionEvent) => void;

  /** `onTransitionEndCapture`: A version of `onTransitionEnd` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onTransitionEndCapture?: (event: TransitionEvent) => void;

  /** [`onWheel`](https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event): A [`WheelEvent` handler](https://react.dev/reference/react-dom/components/common#wheelevent-handler) function. Fires when the user rotates a wheel button.
   */
  onWheel?: (event: WheelEvent) => void;

  /** `onWheelCapture`: A version of `onWheel` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onWheelCapture?: (event: WheelEvent) => void;

  /** [`onReset`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when a form gets reset.
   */
  onReset?: (event: Event) => void;

  /** `onResetCapture`: A version of `onReset` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onResetCapture?: (event: Event) => void;

  /** [`onSubmit`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when a form gets submitted.
   */
  onSubmit?: (event: Event) => void;

  /** `onSubmitCapture`: A version of `onSubmit` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onSubmitCapture?: (event: Event) => void;

  /** [`onCancel`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/cancel_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the user tries to dismiss the dialog.
   */
  onCancel?: (event: Event) => void;

  /** `onCancelCapture`: A version of `onCancel` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onCancelCapture?: (event: Event) => void;

  /** [`onClose`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/close_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when a dialog has been closed.
   */
  onClose?: (event: Event) => void;

  /** `onCloseCapture`: A version of `onClose` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onCloseCapture?: (event: Event) => void;

  /** [`onToggle`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDetailsElement/toggle_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the user toggles the details.
   */
  onToggle?: (event: Event) => void;

  /** `onToggleCapture`: A version of `onToggle` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onToggleCapture?: (event: Event) => void;

  /** `onLoad`: An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the resource has loaded.
   */
  onLoad?: (event: Event) => void;

  /** `onLoadCapture`: A version of `onLoad` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onLoadCapture?: (event: Event) => void;

  /** [`onError`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the resource could not be loaded.
   */
  onError?: (event: Event) => void;

  /** `onErrorCapture`: A version of `onError` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onErrorCapture?: (event: Event) => void;

  /** [`onAbort`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/abort_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the resource has not fully loaded, but not due to an error.
   */
  onAbort?: (event: Event) => void;

  /** `onAbortCapture`: A version of `onAbort` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onAbortCapture?: (event: Event) => void;

  /** [`onCanPlay`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when there’s enough data to start playing, but not enough to play to the end without buffering.
   */
  onCanPlay?: (event: Event) => void;

  /** `onCanPlayCapture`: A version of `onCanPlay` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onCanPlayCapture?: (event: Event) => void;

  /** [`onCanPlayThrough`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when there’s enough data that it’s likely possible to start playing without buffering until the end.
   */
  onCanPlayThrough?: (event: Event) => void;

  /** `onCanPlayThroughCapture`: A version of `onCanPlayThrough` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onCanPlayThroughCapture?: (event: Event) => void;

  /** [`onDurationChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the media duration has updated.
   */
  onDurationChange?: (event: Event) => void;

  /** `onDurationChangeCapture`: A version of `onDurationChange` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onDurationChangeCapture?: (event: Event) => void;

  /** [`onEmptied`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the media has become empty.
   */
  onEmptied?: (event: Event) => void;

  /** `onEmptiedCapture`: A version of `onEmptied` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onEmptiedCapture?: (event: Event) => void;

  /** [`onEncrypted`](https://w3c.github.io/encrypted-media/#dom-evt-encrypted): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the browser encounters encrypted media.
   */
  onEncrypted?: (event: Event) => void;

  /** `onEncryptedCapture`: A version of `onEncrypted` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onEncryptedCapture?: (event: Event) => void;

  /** [`onEnded`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the playback stops because there’s nothing left to play.
   */
  onEnded?: (event: Event) => void;

  /** `onEndedCapture`: A version of `onEnded` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onEndedCapture?: (event: Event) => void;

  /** [`onLoadedData`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the current playback frame has loaded.
   */
  onLoadedData?: (event: Event) => void;

  /** `onLoadedDataCapture`: A version of `onLoadedData` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onLoadedDataCapture?: (event: Event) => void;

  /** [`onLoadedMetadata`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when metadata has loaded.
   */
  onLoadedMetadata?: (event: Event) => void;

  /** `onLoadedMetadataCapture`: A version of `onLoadedMetadata` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onLoadedMetadataCapture?: (event: Event) => void;

  /** [`onLoadStart`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the browser started loading the resource.
   */
  onLoadStart?: (event: Event) => void;

  /** `onLoadStartCapture`: A version of `onLoadStart` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onLoadStartCapture?: (event: Event) => void;

  /** [`onPause`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the media was paused.
   */
  onPause?: (event: Event) => void;

  /** `onPauseCapture`: A version of `onPause` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onPauseCapture?: (event: Event) => void;

  /** [`onPlay`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the media is no longer paused.
   */
  onPlay?: (event: Event) => void;

  /** `onPlayCapture`: A version of `onPlay` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onPlayCapture?: (event: Event) => void;

  /** [`onPlaying`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the media starts or restarts playing.
   */
  onPlaying?: (event: Event) => void;

  /** `onPlayingCapture`: A version of `onPlaying` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onPlayingCapture?: (event: Event) => void;

  /** [`onProgress`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires periodically while the resource is loading.
   */
  onProgress?: (event: Event) => void;

  /** `onProgressCapture`: A version of `onProgress` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onProgressCapture?: (event: Event) => void;

  /** [`onRateChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when playback rate changes.
   */
  onRateChange?: (event: Event) => void;

  /** `onRateChangeCapture`: A version of `onRateChange` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onRateChangeCapture?: (event: Event) => void;

  /** `onResize`: An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when video changes size.
   */
  onResize?: (event: Event) => void;

  /** `onResizeCapture`: A version of `onResize` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onResizeCapture?: (event: Event) => void;

  /** [`onSeeked`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when a seek operation completes.
   */
  onSeeked?: (event: Event) => void;

  /** `onSeekedCapture`: A version of `onSeeked` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onSeekedCapture?: (event: Event) => void;

  /** [`onSeeking`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when a seek operation starts.
   */
  onSeeking?: (event: Event) => void;

  /** `onSeekingCapture`: A version of `onSeeking` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onSeekingCapture?: (event: Event) => void;

  /** [`onStalled`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the browser is waiting for data but it keeps not loading.
   */
  onStalled?: (event: Event) => void;

  /** `onStalledCapture`: A version of `onStalled` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onStalledCapture?: (event: Event) => void;

  /** [`onSuspend`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when loading the resource was suspended.
   */
  onSuspend?: (event: Event) => void;

  /** `onSuspendCapture`: A version of `onSuspend` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onSuspendCapture?: (event: Event) => void;

  /** [`onTimeUpdate`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the current playback time updates.
   */
  onTimeUpdate?: (event: Event) => void;

  /** `onTimeUpdateCapture`: A version of `onTimeUpdate` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onTimeUpdateCapture?: (event: Event) => void;

  /** [`onVolumeChange`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the volume has changed.
   */
  onVolumeChange?: (event: Event) => void;

  /** `onVolumeChangeCapture`: A version of `onVolumeChange` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events)
   */
  onVolumeChangeCapture?: (event: Event) => void;

  /** [`onWaiting`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event): An [`Event` handler](https://react.dev/reference/react-dom/components/common#event-handler) function. Fires when the playback stopped due to temporary lack of data.
   */
  onWaiting?: (event: Event) => void;

  /** `onWaitingCapture`: A version of `onWaiting` that fires in the [capture phase.](https://react.dev/learn/responding-to-events#capture-phase-events) */
  onWaitingCapture?: (event: Event) => void;
};

export type AccordionProps = {
  /** Nummer des zu öffnenden Panels angeben, beginnend bei eins (1). Es kann nur ein Wert übergeben werden. */
  open?: Number;
  /** Attribut angeben, damit immer nur ein Panel gleichzeitig geöffnet wird (übertrumpft expanded). */
  single?: Boolean;
  /** Alle geöffnet anzeigen. */
  expanded?: Boolean;
  /** Web Component ist bereit */
  "onwm-defined"?: (e: CustomEvent<CustomEvent>) => void;
};

export type AccordionContentProps = {
  /**  */
  _panel?: string;
  /**  */
  _panelInner?: string;
};

export type AccordionHeadingProps = {
  /**  */
  _slottedChildren?: string;
  /** Standardmäßig zeigen oder nicht */
  expanded?: boolean;
  /** Angezeigtes Icon */
  icon?: string;
  /** Wenn ein Element hinzugefügt oder gelöscht worden ist. */
  "onwm-contentchanged"?: (e: CustomEvent<CustomEvent>) => void;
};

export type BreakingNewsProps = {
  /** Art der Meldung */
  type?: "warning" | "error" | "success";
  /** Bezeichnung der Meldung */
  title?: String;
  /** Einzigartige ID */
  id?: String;
  /** Erkennt automatisch, ob sich der Banner sticky verhält. */
  sticky?: Boolean;
  /** Text für den Schließen Button, default ist "Schließen". */
  closeText?: String;
};

export type ButtonProps = {
  /** Art des Buttons */
  kind?: "clean" | "primary" | "secondary" | "tag" | "tertiary";
  /** Button über die volle Breite darstellen. Immer oder bis 512px (s) oder 768px (m) */
  full?: "s" | "m" | "always";
  /** Inhalt im Button ausrichten */
  justify?: "center" | "space-between";
  /** Hintergrundfarbe des Buttons */
  color?:
    | "abendstimmung"
    | "flieder"
    | "frischgruen"
    | "goldgelb"
    | "morgenrot"
    | "nebelgrau"
    | "wasserblau";
  /** Größe (üblicherweise Schriftgröße und Innenabstand) des Buttons */
  size?: "xs" | "s" | "m" | "l";
  /** Positionierung des Menüs. block-* und inline-* können kombiniert werden.<br>Wenn das Attribut ohne Wert definiert oder nur eine Liste vorhanden ist, wird defaultmäßig block-start und inline-start genommen. */
  menu?: "block-start" | "block-end" | "inline-start" | "inline-end";
  /** Dropdown, wenn vorhanden, geöffnet oder nicht */
  open?: Boolean;
  /** Button rund darstellen */
  round?: Boolean;
  /** Mindestbreite des Buttons */
  width?: "s";
  /** Selektor für das Element, dessen Inhalt kopiert werden soll */
  copy?: string;
};

export type CTAProps = {
  /** Textausrichtung */
  align?: "end";
  /** Über die volle Breite anzeigen */
  full?: Boolean;
  /** Pfeil auf der linken Seite */
  start?: Boolean;
  /** Stärke der Schrift zurücksetzen (normal statt fett) */
  clean?: Boolean;
};

export type CardProps = {
  /** Gibt die Maximalbreite der Card an. */
  size?: "s" | "m" | "l" | "full" | "full-responsive";
  /** Gibt die Art des Störers in der Card an. */
  eyecatcher?: "default" | "round";
  /** Gibt die Position des Textes in der Canvas-Card oder des Störers an. */
  position?: "block-start" | "block-end" | "inline-start" | "inline-end";
  /** Gibt die Farbe der Canvas-Card oder des Störers an */
  color?:
    | "abendstimmung"
    | "abendstimmung-light"
    | "flieder"
    | "flieder-light"
    | "frischgruen"
    | "frischgruen-light"
    | "goldgelb"
    | "goldgelb-light"
    | "morgenrot"
    | "morgenrot-light"
    | "nebelgrau"
    | "nebelgrau-light"
    | "wasserblau"
    | "wasserblau-light";
  /**  Gesamte Card verlinken. */
  blocklink?: Boolean;
  /** Cards mit Hintergrundfarbe */
  canvas?: Boolean;
  /** Label des Flipcard Buttons */
  flipcardlabel?: String;
  /** Icon im Flipcard Button */
  flipcardicon?: String;
  /** Es soll eine Flip-Card umgedreht gezeigt werden. */
  flipped?: Boolean;
  /** Es soll ein Video Icon gezeigt werden. */
  video?: Boolean;
  /** Karte wurde geflipped */
  "onwm-card-flipped"?: (e: CustomEvent<CustomEvent>) => void;
};

export type AnchorProps = {
  /** Text für das "Link kopieren" Icon. [TEXT] wird automatisch durch die Überschrift ersetzt. */
  copyText?: String;
  /** Text für die Meldung nachdem der Link kopiert worden ist. */
  successText?: String;
  /** Icon für den "Link kopieren"-Link */
  icon?: String;
  /** Die ID kann entweder auf dem Element selber oder der Überschrift vergeben werden. */
  id?: String;
};

export type BadgeProps = {
  /** Textfarbe */
  color?: "success" | "error";
  /** Textfarbe */
  size?: "s";
};

export type CarouselProps = {
  /** Indikatoren unter dem Karussell anzeigen. */
  dots?: Boolean;
  /** Indikatoren und Play/Pause Button unter dem Karussell anzeigen (nur in Kombination). */
  autoplay?: Boolean;
  /** Intervall für die automatische Wiedergabe in Millisekunden. */
  autoplayInterval?: Number;
  /** Semantische Bezeichnung des Karussells (Pflichtfeld). */
  label?: String;
  /** Wenn nur ein Element angezeigt werden soll, Breite in Pixel übergeben. */
  single?: Number;
  /** Label für den Button rechts */
  nextLabel?: String;
  /** Label für den Button links */
  prevLabel?: String;
  /** Index beginnend bei 1 oder Keyword */
  position?: String | last;
  /** Slide wurde gewechselt */
  "onwm-slide-changed"?: (e: CustomEvent<CustomEvent>) => void;
};

export type CheckboxProps = {
  /** Fehlermeldung bei ungültiger Eingabe
Diese Meldung wird direkt am Checkbox-Element angezeigt, wenn es validiert wird und ungültig ist. */
  errormessage?: String;
  /** Spezifische Fehlermeldung für die Fehlerübersicht
Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
Fehlermeldungen anzuzeigen, z.B. "Bitte stimmen Sie den AGB bei 'Nutzungsbedingungen' zu"
statt nur "Bitte wählen Sie mindestens eine Option aus". */
  summaryErrormessage?: String;
  /** Gibt an, ob das Element einen Fehler hat
Dies ist ein Statusattribut, das anzeigt, ob aktuell ein Validierungsfehler vorliegt.
Es wird auf true gesetzt, wenn die Validierung fehlschlägt, und auf false, wenn die Validierung erfolgreich ist. */
  hasError?: Boolean;
  /** Aktuelle Fehlermeldung */
  error?: String;
  /** Steuert die Anzeige von Fehlermeldungen
Im Gegensatz zu 'hasError' steuert dieses Attribut, ob Fehlermeldungen angezeigt werden sollen.
Wenn auf true gesetzt, werden Validierungsfehler sofort angezeigt, ohne auf eine Formularübermittlung zu warten.
Wird typischerweise vom übergeordneten wm-form Element gesteuert. */
  showErrors?: Boolean;
  /** Aktiviert die Validierung bei Eingabe
Wenn auf true gesetzt, werden Eingaben sofort validiert und Fehler angezeigt,
ohne auf eine Formularübermittlung zu warten.
Wird typischerweise vom übergeordneten wm-form Element gesteuert. */
  validate?: Boolean;
  /** Zusätzliche Informationen zum Feld */
  info?: String;
  /**  */
  _errorController?: string;
};

export type ChipProps = {
  /** Farbe */
  color?:
    | "abendstimmung"
    | "flieder"
    | "frischgruen"
    | "goldgelb"
    | "morgenrot"
    | "nebelgrau"
    | "wasserblau";
  /** Größe */
  size?: "s" | "m" | "l";
};

export type CopyrightProps = {
  /** Die Bezeichnung der Liste */
  label?: String;
};

export type DetailsProps = {
  /** Über die volle Breite anzeigen. */
  full?: Boolean;
  /** Offen oder nicht */
  open?: Boolean;
  /** Wenn erst ab einer bestimmten Viewportbreite getoggelt werden soll, zum Beispiel 48em, 64em. */
  min?: String;
  /** Text kann ausgewählt werden. Wenn false, ist die ganze Fläche klickbar. */
  selectable?: Boolean;
};

export type FetchProps = {
  /** JSON String (Alternative zur Url) */
  json?: String;
  /** Url zur API */
  url?: String;
  /** Feld im Datensatz in dem sich die Ergebnisse befinden */
  dataset?: String;
  /** Wieviele Ergebnisse sollen pro Seite angezeigt werden */
  itemsPerPage?: String;
  /** Art der Paginierung */
  pagination?: "number" | "button";
  /**  */
  total?: number;
  /** Daten wurden erfolgreich geladen */
  "onwm-fetched"?: (e: CustomEvent<CustomEvent>) => void;
  /** Web Component ist bereit */
  "onwm-defined"?: (e: CustomEvent<CustomEvent>) => void;
};

export type FigureProps = {
  /**  */
  observer?: string;
  /**  */
  _debouncedAdjustSize?: string;
};

export type FilterProps = {
  /** Bezeichnung für das Dropdown */
  label?: String;
  /** Text für Suchen-Button */
  searchLabel?: String;
  /** Text für Abbrechen-Button */
  dismissLabel?: String;
  /** Text für auswählen-Text in Dropdown */
  selectLabel?: String;
  /** Text für ausgewählt-Text in Dropdown */
  selectedLabel?: String;
  /** Art des Filters */
  type?: "dropdown";
  /** Ist das Dropdown geöffnet */
  open?: Boolean;
  /** Buttons zu Senden/Schließen/Abbrechen anzeigen */
  controls?: Boolean;
  /** Anzahl der Elemente insgesamt und der ausgewählten */
  totals?: Object;
  /** Wenn eine Auswahl getroffen und angewendet worden ist */
  "onwm-filter-selection-submitted"?: (e: CustomEvent<CustomEvent>) => void;
  /** Wenn eine Auswahl getroffen worden ist */
  "onwm-filter-selected"?: (e: CustomEvent<CustomEvent>) => void;
};

export type FilterSelectionProps = {
  /** ids der Filter, die abgebildet werden sollen (Komma-separierte Liste) */
  filterid?: String;
  /** Label für den Zurücksetzen Button */
  resetLabel?: String;
  /** Alternative Darstellung */
  categorize?: Boolean;
  /**  */
  "onwm-filter-updated"?: (e: CustomEvent<CustomEvent>) => void;
};

export type FootnoteProps = {
  /**  */
  footnotes?: array;
  /**  */
  label?: string;
  /**  */
  referenceLabel?: string;
  /**  */
  footnoteLabel?: string;
};

export type FormProps = {
  /** Eingabefeld live validieren
Wenn auf true gesetzt, werden alle Kindelemente mit dem Attribut "validate" versehen,
wodurch diese bei jeder Eingabe validiert werden und Fehlermeldungen sofort anzeigen.
Dies ermöglicht eine sofortige Rückmeldung an den Benutzer, ohne auf die Formularübermittlung zu warten. */
  validate?: Boolean;
  /** Verfügbare Zeichenanzahl in Text-Eingabefeldern verbergen */
  hideMaxlength?: Boolean;
  /** Gibt an, ob das Formular Validierungsfehler enthält
Wird auf true gesetzt, wenn nach einer Validierung Fehler vorhanden sind.
Wird verwendet, um den Status des gesamten Formulars anzuzeigen. */
  hasValidationError?: Boolean;
  /**  */
  _validationController?: string;
};

export type FormBlockProps = {
  /** Benutzerdefinierte Überschrift */
  cloneHeadingLabel?: String;
  /** Section mit oder ohne Hintergrund. */
  highlight?: "nebelgrau";
  /** Art des Blocks */
  type?: "text";
  /** Label des "Duplizieren"-Buttons */
  duplicateLabel?: String;
  /** Label des Löschen-Buttons */
  deleteLabel?: String;
  /** 'true' für das gesamte Element oder ID für das Element, das dupliziert werden soll */
  duplicate?: String;
  /** Mindestanzahl von Blöcken */
  min?: Number;
  /** Maximalanzahl von Blöcken */
  max?: Number;
  /**  */
  ondelete?: (e: CustomEvent<Event>) => void;
  /** Block wurde gelöscht. */
  "onwm-block-deleted"?: (e: CustomEvent<CustomEvent>) => void;
  /** Block wurde dupliziert. */
  "onwm-block-duplicated"?: (e: CustomEvent<CustomEvent>) => void;
};

export type FormErrorsummaryProps = {
  /** Überschrift für die Fehlerliste. [ERRORS] ist ein Platzhalter für die Anzahl der Fehler, der automatisch ersetzt wird. */
  heading?: String;
  /** Autofocus deaktivieren
Wenn auf 'true' gesetzt, wird der erste Fehlereintrag nicht automatisch fokussiert,
was nützlich sein kann, wenn die Fehlerübersicht in einem Modal oder einer anderen
Komponente verwendet wird, die ihren eigenen Fokus verwaltet. */
  noFocus?: Boolean;
  /** Anzahl der Fehler
Diese Eigenschaft wird automatisch aktualisiert, wenn Fehlereinträge hinzugefügt
oder entfernt werden. Der Wert wird in der Überschrift angezeigt. */
  errors?: Number;
  /** Wird ausgelöst, wenn auf einen Fehlereintrag geklickt wird Der Event enthält die ID des Feldes als `event.detail.id` */
  "onjump-to-error"?: (e: CustomEvent<never>) => void;
};

export type FormGroupProps = {
  /** Setzt eine benutzerdefinierte Fehlermeldung für die Gruppe. */
  error?: String;
  /** Fehlermeldung bei ungültiger Gruppeneingabe
Diese Meldung wird angezeigt, wenn die Validierung der Gruppe fehlschlägt,
z.B. wenn Pflichtfelder in der Gruppe nicht ausgefüllt sind. */
  errormessage?: String;
  /** Spezifische Fehlermeldung für die Fehlerübersicht
Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
Fehlermeldungen anzuzeigen, z.B. "Bitte geben Sie alle erforderlichen Adressdaten ein"
statt nur "Group validation error". */
  summaryErrormessage?: String;
  /** Gibt an, ob die Gruppe einen Fehler hat
Wird auf "true" gesetzt, wenn mindestens ein Feld in der Gruppe nicht gültig ist.
Steuert die Anzeige der Fehlermeldung und der visuellen Fehlermarkierung. */
  hasGroupError?: Boolean;
  /** Text für die Legende des Fieldsets
Dieser Text wird als Beschriftung der Formulargruppe verwendet.
Kann sowohl über das legend-Attribut als auch über einen legend-Slot angepasst werden. */
  legend?: String;
  /** Whether to validate on input */
  validate?: Boolean;
  /** Text statt Sternchen darstellen */
  hideAsterisk?: Boolean;
  /** optionale ID */
  id?: String;
  /** Name-Attribute in HTML */
  name?: String;
  /** Wert des Elements */
  value?: String;
  /** Bezeichnung des Eingabefeldes */
  label?: String;
  /** Pflichtfeld */
  required?: Boolean;
  /**  Text für Pflichtfeld-Hinweis */
  requiredText?: String;
  /** Hinweis */
  hint?: String;
  /**  */
  oneventName?: (e: CustomEvent<Event>) => void;
  /**  */
  onblur?: (e: CustomEvent<Event>) => void;
  /**  */
  onfocus?: (e: CustomEvent<Event>) => void;
  /**  */
  oninvalid?: (e: CustomEvent<Event>) => void;
  /**  */
  onreset?: (e: CustomEvent<Event>) => void;
};

export type FormProgressProps = {
  /** Aktiver Schritt */
  current?: Number;
  /** Accessible Name der Navigation-Landmark */
  label?: string;
};

export type GalleryProps = {
  /** Größe der Vorschaubilder */
  size?: Number;
  /** Größe der Vorschaubilder ist nicht fluide, sondern immer fix. */
  fixed?: Boolean;
};

export type GridProps = {
  /** Abstand zwischen Elementen */
  gap?: "xs" | "s" | "m" | "l";
  /** Größe der Elemente - Cards */
  size?: "s" | "m" | "l" | "full";
};

export type HeaderProps = {
  /** Farbe der 2. Zeile im Header */
  color?:
    | "flieder"
    | "goldgelb"
    | "abendstimmung"
    | "morgenrot"
    | "frischgruen"
    | "wasserblau";
};

export type HighlightProps = {
  /** Farbe */
  color?:
    | "abendstimmung"
    | "abendstimmung-light"
    | "flieder"
    | "flieder-light"
    | "frischgruen"
    | "frischgruen-light"
    | "goldgelb"
    | "goldgelb-light"
    | "morgenrot"
    | "morgenrot-light"
    | "nebelgrau"
    | "nebelgrau-light"
    | "wasserblau"
    | "wasserblau-light";
  /** Art der Hervorhebung */
  type?: "prominent";
};

export type IconProps = {
  /** Standardbreite in Pixel */
  width?: Number;
  /** Entspricht Breite wenn nicht definiert */
  height?: Number;
  /** Additional classes */
  class?: String;
  /** ID */
  iconid?:
    | "amtswege"
    | "burger"
    | "check"
    | "chevron-down"
    | "chevron-left"
    | "chevron-double-left"
    | "chevron-right"
    | "chevron-double-right"
    | "chevron-up"
    | "clock"
    | "close"
    | "contact"
    | "contact_alternative"
    | "contact_loggedin"
    | "contact_notification"
    | "download"
    | "email"
    | "embed"
    | "error"
    | "euro"
    | "external"
    | "facebook"
    | "fullscreen"
    | "gams"
    | "gamesno"
    | "grid"
    | "handson"
    | "home"
    | "hide"
    | "info"
    | "instagram"
    | "language"
    | "link"
    | "linkedin"
    | "message"
    | "money"
    | "park"
    | "pause"
    | "pin"
    | "play"
    | "play-button"
    | "search"
    | "settings"
    | "share"
    | "sidebar"
    | "show"
    | "sound"
    | "success"
    | "twitter"
    | "trash"
    | "water"
    | "waterno"
    | "warning"
    | "whatsapp"
    | "wien-bot"
    | "wifi"
    | "youtube"
    | "x"
    | "xing"
    | "zoom";
};

export type IframeProps = {};

export type InputProps = {
  /** Art des Eingabefelds */
  type?:
    | "combobox"
    | "date"
    | "datetime-local"
    | "email"
    | "number"
    | "password"
    | "tel"
    | "text"
    | "time"
    | "url";
  /** Combobox: Feld in der Response, das die Daten enthält, zum Beispiel bei OGD üblicherweise "features" */
  dataset?: Boolean;
  /** Button in Combobox anzeigen */
  toggleButton?: Boolean;
  /** Combobox: Wert programmatisch setzen */
  setvalue?: Boolean;
  /** Gibt an, ob das Element deaktiviert ist oder nicht */
  disabled?: Boolean;
  /** Regulärer Expressen RegEx für die Validierung */
  pattern?: String;
  /** Gibt an, ob das Element einen Fehler hat
Dies ist ein Statusattribut, das anzeigt, ob aktuell ein Validierungsfehler vorliegt.
Es wird auf true gesetzt, wenn die Validierung fehlschlägt, und auf false zurückgesetzt,
wenn die Validierung erfolgreich ist oder das Formular zurückgesetzt wird. */
  hasError?: Boolean;
  /** Steuert die Anzeige von Fehlermeldungen
Im Gegensatz zu 'hasError' steuert dieses Attribut, ob Fehlermeldungen angezeigt werden sollen.
Wenn auf true gesetzt, werden Validierungsfehler sofort angezeigt, ohne auf eine Formularübermittlung zu warten.
Wird typischerweise vom übergeordneten wm-form Element gesteuert. */
  showErrors?: boolean;
  /** Aktiviert die Validierung bei Eingabe
Wenn auf true gesetzt, werden Eingaben sofort validiert und Fehler entsprechend angezeigt,
ohne auf eine Formularübermittlung zu warten.
Wird typischerweise vom übergeordneten wm-form Element gesteuert. */
  validate?: boolean;
  /** Aktueller Wert des Eingabefelds */
  value?: string;
  /** Unterdrückt die Anzeige von Fehlermeldungen */
  suppressError?: Boolean;
  /** Fehlermeldung bei ungültiger Eingabe
Diese Meldung wird direkt am Eingabefeld angezeigt, wenn es validiert wird und ungültig ist. */
  errormessage?: String;
  /** Spezifische Fehlermeldung für die Fehlerübersicht
Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
Fehlermeldungen anzuzeigen, z.B. "Bitte geben Sie Ihren Namen bei 'Kontaktdaten' ein"
statt nur "Dieses Feld ist erforderlich". */
  summaryErrormessage?: String;
  /**  */
  _errorController?: string;
  /** Current error message */
  error?: String;
  /**  */
  _output?: string;
  /** Text, der angekündigt wird, wenn Optionen angezeigt werden */
  announcementText?: String;
  /** Maximale Zeichenanzahl, die eingegeben werden darf */
  maxlength?: Number;
  /** placeholder-Attribut in HTML */
  placeholder?: String;
  /** Art des Suchfeldes */
  search?: "hidden" | "visible" | "hiddenmobile";
  /** size-Attribute in HTML */
  size?: String;
  /** Liste in Combobox beim Tippen filtern */
  filter?: Boolean;
  /** Verfügbare Zeichenanzahl verbergen */
  hideMaxlength?: Boolean;
  /** Text for maxlength message */
  maxlengthText?: String;
  /** Pattern validation message */
  patternMismatchMessage?: String;
  /**  */
  info?: string;
  /**  */
  _infoOpen?: boolean;
  /**  */
  onundefined?: (e: CustomEvent<CustomEvent>) => void;
};

export type ListProps = {
  /** Liste ohne Aufzählungszeichen, Innen- und Außenabstand */
  clean?: Boolean;
  /** Abstand zwischen Elementen */
  gap?: "xxs" | "xs" | "s" | "m" | "l" | "none";
  /** Art der Darstellung */
  type?: "horizontal" | "row";
  /** Trennzeichen zwischen Elementen */
  separator?: "pipe";
  /** Ausrichtung der Elemente */
  alignment?: "center";
  /** Ganze Zeile verlinken? */
  block?: Boolean;
};

export type MapProps = {
  /** Mittelpunkt der Karte */
  center?: String;
  /** Einzigartige ID */
  id?: String;
  /** Steuerelemente einfügen */
  controls?: Boolean;
  /** Marker clustern */
  cluster?: Boolean;
  /** Zoomlevel der Karte */
  zoom?: Number;
  /** Map ist bereit */
  "onwm-map-ready"?: (e: CustomEvent<CustomEvent>) => void;
  /** Marker wurde entfernt */
  "onwm-map-marker-removed"?: (e: CustomEvent<CustomEvent>) => void;
  /** “Übernehmen"-Button in marker wurde geklickt */
  "onwm-map-marker-submit"?: (e: CustomEvent<CustomEvent>) => void;
  /** Marker wurde hinzugefügt */
  "onwm-map-marker-added"?: (e: CustomEvent<CustomEvent>) => void;
};

export type MapAltProps = {
  /** Mittelpunkt der Karte */
  center?: String;
  /** Einzigartige ID */
  id?: String;
  /** Zoomlevel der Karte */
  zoom?: Number;
  /**  */
  _mapInitialized?: boolean;
};

export type MapMarkerProps = {
  /** Farbe des Markers */
  color?: string;
  /** Bezeichnung des Markers */
  label?: string;
  /** Latitude */
  lat?: string;
  /** Longitude */
  lng?: string;
  /** Datei muss in /icons/pins/pin-{string}.svg Pfad liegen */
  pin?: string;
};

export type ModalProps = {
  /** Ist Modal geöffnet oder nicht. */
  isopen?: Boolean;
  /** Art der Größe */
  size?: "fit-content" | "max-content";
  /** Label für "bildbeschreibung" */
  captionLabel?: String;
  /** Wenn das Modal geschlossen wurde. */
  "onwm-modal-closed"?: (e: CustomEvent<CustomEvent>) => void;
  /** Wenn das Modal geöffnet wurde. */
  "onwm-modal-opened"?: (e: CustomEvent<CustomEvent>) => void;
};

export type NavMainProps = {
  /** Accessible Name der Navigations-Landmark */
  label?: String;
  /** Label Menü geschlossen */
  labelOpen?: String;
  /** Icon Menü geschlossen */
  labelOpenIcon?: String;
  /** Label Menü offen */
  labelClose?: String;
  /** Soll das Label angezeigt werden */
  hideLabel?: Boolean;
  /** Menü offen oder zu */
  isopen?: Boolean;
  /** Microsite oder Hauptseite */
  microsite?: Boolean;
  /** Art des Menüs (immer versteckt, immer sichtbar oder nur auf kleinen Viewsports versteckt) */
  type?: "hidden" | "visible" | "hiddenmobile";
};

export type NavPageProps = {
  /** Art der Navigation */
  nav?: "scroll" | "toggle";
  /** Label des Togglebuttons */
  togglebuttonlabel?: String;
  /**  */
  _activeAnchor?: string;
  /**  */
  _observer?: null;
  /**  */
  _updateTimer?: null;
  /** Section mit oder ohne Hintergrund. */
  highlight?:
    | "abendstimmung"
    | "flieder"
    | "frischgruen"
    | "goldgelb"
    | "morgenrot"
    | "nebelgrau"
    | "wasserblau";
  /** Bei Map-Einbindungen */
  type?: "full";
  /** Wieviel Platz gibt es für Inhalt. Voll oder im Theme definiertes Maximum für Text. */
  contentsize?: "full" | "text";
};

export type notificationProps = {
  /** Art der Meldung */
  type?: "info" | "warning" | "error";
  /** Schließen-Button anzeigen */
  dismissible?: Boolean;
  /** Accessible Name für den Entfernen-Button */
  dismissLabel?: String;
  /**  */
  iconSize?: string;
};

export type PagerProps = {
  /** Alternative Überschrift für Zurück-Link */
  prevText?: String;
  /** Alternative Überschrift für Weiter-Link */
  nextText?: String;
};

export type PaginationProps = {
  /** Die Aktive Seite */
  currentPage?: Number;
  /** Buttons für erste und letzte Seite anzeigen */
  firstAndLast?: Boolean;
  /** Label für die navigation-Landmark */
  label?: String;
  /** Maximale Anzahl an Seiten */
  maxPages?: Number;
  /** Anzahl an darzustellenden Elementen pro Seite */
  perPage?: Number;
  /** Anzahl an darzustellenden Elementen ingesamt */
  total?: Number;
  /** Ausrichtung auf der Hauptachse */
  justify?: "center" | "space-between";
  /** Versteckt alle Controls */
  hideAllControls?: Boolean;
  /** Seitenwechsel */
  "onwm-page-changed"?: (e: CustomEvent<CustomEvent>) => void;
};

export type QuicklinksProps = {
  /** Anzahl der Spalten */
  cols?: 1 | 2 | 3;
};

export type QuoteProps = {
  /** Größe des Bildes */
  type?: "large" | "small";
  /** Die Quelle des Zitats (unterstützt HTML-Tags) */
  source?: String;
  /** Untertitel der Quelle (unterstützt HTML-Tags) */
  caption?: String;
};

export type RadioProps = {
  /** Fehlermeldung bei ungültiger Eingabe */
  errormessage?: String;
  /** Spezifische Fehlermeldung für die Fehlerübersicht
Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
Fehlermeldungen anzuzeigen, z.B. "Bitte wählen Sie eine Option bei 'Zahlungsart'"
statt nur "Auswahl erforderlich". */
  summaryErrormessage?: String;
  /** Gibt an, ob das Element einen Fehler hat
Dies ist ein Statusattribut, das anzeigt, ob aktuell ein Validierungsfehler vorliegt.
Es wird auf true gesetzt, wenn die Validierung fehlschlägt, und auf false zurückgesetzt,
wenn die Validierung erfolgreich ist oder das Formular zurückgesetzt wird. */
  hasError?: Boolean;
  /** Steuert die Anzeige von Fehlermeldungen
Im Gegensatz zu 'hasError' steuert dieses Attribut, ob Fehlermeldungen angezeigt werden sollen.
Wenn auf true gesetzt, werden Validierungsfehler sofort angezeigt, ohne auf eine Formularübermittlung zu warten.
Wird typischerweise vom übergeordneten wm-form Element gesteuert. */
  showErrors?: Boolean;
  /** Aktiviert die Validierung bei Eingabe
Wenn auf true gesetzt, werden Auswahländerungen sofort validiert und Fehler angezeigt,
ohne auf eine Formularübermittlung zu warten.
Wird typischerweise vom übergeordneten wm-form Element gesteuert. */
  validate?: Boolean;
  /** Aktuelle Fehlermeldung */
  error?: String;
  /** Zusätzliche Informationen zum Feld */
  info?: String;
  /** Ausgewählter Wert (kann über 'checked' Attribut gesetzt werden) */
  checked?: String;
  /** Global disabled state */
  disabled?: Boolean;
  /** Per-option configuration for disabled state */
  disabledoptions?: String;
  /**  */
  _errorController?: string;
};

export type SectionProps = {
  /** Section mit oder ohne Hintergrund. */
  highlight?:
    | "abendstimmung"
    | "flieder"
    | "frischgruen"
    | "goldgelb"
    | "morgenrot"
    | "nebelgrau"
    | "wasserblau";
  /** Bei Map-Einbindungen */
  type?: "full";
  /** Wieviel Platz gibt es für Inhalt. Voll oder im Theme definiertes Maximum für Text. */
  contentsize?: "full" | "text";
};

export type SelectProps = {
  /** Anzahl der sichtbaren Optionen */
  size?: String;
  /** Mehrere Auswählbar */
  multiple?: Boolean;
  /** Gibt an, ob das Element deaktiviert ist oder nicht */
  disabled?: Boolean;
  /** Fehlermeldung bei ungültiger Eingabe
Diese Meldung wird direkt am Select-Element angezeigt, wenn es validiert wird und ungültig ist. */
  errormessage?: String;
  /** Spezifische Fehlermeldung für die Fehlerübersicht
Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
Fehlermeldungen anzuzeigen, z.B. "Bitte wählen Sie eine Option bei 'Personendaten-Typ - Art des Antrags'"
statt nur "Auswahl erforderlich". */
  summaryErrormessage?: String;
  /** Gibt an, ob das Element einen Fehler hat */
  hasError?: Boolean;
  /** Aktuelle Fehlermeldung */
  error?: String;
  /** Aktiviert die Validierung bei Eingabe */
  validate?: boolean;
  /** Sofortige Fehleranzeige */
  showErrors?: boolean;
  /** Semikolon-getrennte Liste von Optionsbeschriftungen */
  options?: String;
  /** Semikolon-getrennte Liste von Optionswerten */
  values?: String;
  /** Semikolon-getrennte Liste von vorausgewählten Werten */
  selected?: String;
  /** @deprecated Use 'disabled="true;false;true"' syntax instead - Semikolon-getrennte Liste von deaktivierten Optionen (true/false) */
  disabledoptions?: String;
  /** Aktueller Wert des Select-Elements */
  value?: string;
  /** Initial value of the component */
  _initialValue?: String;
  /** Default value of the component */
  defaultValue?: String;
  /**  */
  _output?: string;
  /** Text, der angekündigt wird, wenn Optionen angezeigt werden */
  announcementText?: String;
  /** Maximale Zeichenanzahl, die eingegeben werden darf */
  maxlength?: Number;
  /** placeholder-Attribut in HTML */
  placeholder?: String;
  /** Art des Suchfeldes */
  search?: "hidden" | "visible" | "hiddenmobile";
  /** Liste in Combobox beim Tippen filtern */
  filter?: Boolean;
  /** Verfügbare Zeichenanzahl verbergen */
  hideMaxlength?: Boolean;
  /** Text for maxlength message */
  maxlengthText?: String;
  /** Pattern validation message */
  patternMismatchMessage?: String;
  /**  */
  info?: string;
  /**  */
  _infoOpen?: boolean;
  /**  */
  onundefined?: (e: CustomEvent<CustomEvent>) => void;
};

export type SidebarProps = {
  /** Ist die Seitenleisten eingeblendet. */
  open?: Boolean;
  /** Einzigartige ID */
  id?: String;
  /** Sichtbare Bezeichnung */
  label?: String;
  /** Keyboard-Shortcut zum Öffnen und Schließen, zum Beispiel: gs */
  shortcut?: String;
};

export type StackProps = {
  /** Abstand zwischen Elementen */
  gap?: "xxs" | "xs" | "s" | "m" | "l";
  /** Horizontaler Abstand zwischen Elementen */
  gapx?: "xxs" | "xs" | "s" | "m" | "l";
  /** Vertikaler Abstand zwischen Elementen */
  gapy?: "xxs" | "xs" | "s" | "m" | "l";
  /** Elternelement füllen. Entspricht der `flex-grow` Eigenschaft. */
  grow?: Boolean;
  /** Wird mit `grow` verwendet und teilt den Platz nicht gleichmäßig auf, sondern macht alle Elemente gleich breit. */
  equal?: Boolean;
  /** Erlauben, dass Elemente wrappen können. */
  wrap?: Boolean;
  /** Vertikal darstellen */
  vertical?: Boolean;
  /** Immer horizontal darstellen */
  horizontal?: Boolean;
  /** Ausrichtung auf der Hauptachse */
  justify?: "center" | "end" | "space-between";
  /** Ausrichtung auf der Gegenachse */
  alignment?: "center" | "end" | "start" | "stretch";
};

export type StageProps = {
  /** Hintergrund Farbe der Stage */
  color?:
    | "abendstimmung"
    | "flieder"
    | "frischgruen"
    | "goldgelb"
    | "morgenrot"
    | "nebelgrau"
    | "wasserblau";
  /** Position der Überschrift */
  justify?: "start" | "end";
  /** Breakpoint, ab dem erst Medieninhalte angezeigt werden sollen (zum Beispiel 48em) */
  media?: String;
};

export type StatusProps = {
  /** Der Text vor der Statusanzeige */
  label?: String;
  /** Text, der angezeigt wird, solange Daten laden. */
  loadingLabel?: String;
  /** Text vor Status anzeigen */
  reverse?: Boolean;
  /** ID des jeweiligen Status (0 = Schwarz, 1 = Grün, 2 = Gelb, 3 = Dunkelgelb, 4 = Orange, 5 = Rot, 6 = Hellgrau) */
  status?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Text, der neben der visuellen Anzeige dargestellt wird */
  statusText?: String;
};

export type SwitchProps = {
  /** Bezeichnung des Eingabefeldes */
  label?: String;
  /**  */
  checked?: boolean;
  /** Whether the component is disabled */
  disabled?: Boolean;
  /** Current error message */
  error?: String;
  /**  */
  errormessage?: string;
  /**  */
  summaryErrormessage?: string;
  /** Whether to validate on input */
  validate?: Boolean;
  /** Whether to show validation errors immediately */
  showErrors?: Boolean;
  /**  */
  type?: string;
  /** Wert des Elements */
  value?: String;
  /** Initial value of the component */
  _initialValue?: String;
  /**  */
  _hasInteracted?: boolean;
  /** Default value of the component */
  defaultValue?: String;
  /** Text statt Sternchen darstellen */
  hideAsterisk?: Boolean;
  /** optionale ID */
  id?: String;
  /** Name-Attribute in HTML */
  name?: String;
  /** Pflichtfeld */
  required?: Boolean;
  /**  Text für Pflichtfeld-Hinweis */
  requiredText?: String;
  /** Hinweis */
  hint?: String;
  /**  */
  onundefined?: (e: CustomEvent<CustomEvent>) => void;
  /**  */
  oneventName?: (e: CustomEvent<Event>) => void;
  /**  */
  onblur?: (e: CustomEvent<Event>) => void;
  /**  */
  onfocus?: (e: CustomEvent<Event>) => void;
  /**  */
  oninvalid?: (e: CustomEvent<Event>) => void;
  /**  */
  onreset?: (e: CustomEvent<Event>) => void;
};

export type TableProps = {
  /** Ausrichtung der Spalten: Ein Wert für alle Spalten oder Komma-separierte Liste. */
  alignment?: "start" | "end" | "center";
  /** Rahmen */
  border?:
    | "columns"
    | "columns-frame"
    | "grid"
    | "full"
    | "none"
    | "head"
    | "rows"
    | "frame";
  /** Breite der Spalten. Entweder relativ zur Gesamtbreite, angegeben in Fraktionen (1, 2, 1) oder Pixel (200px, 150px 400px) oder Mischung (200px, 1, 2) */
  cols?: String;
  /** Header einfärben */
  header?:
    | "abendstimmung"
    | "flieder"
    | "frischgruen"
    | "goldgelb"
    | "morgenrot"
    | "nebelgrau"
    | "wasserblau";
  /** Caption verbergen */
  hideCaption?: Boolean;
  /** Accessible name für die Region */
  label?: String;
  /** Spalte sortieren (Komma-separierte Liste von Booleans) */
  sort?: String;
  /** Zebra gerade oder ungerade */
  zebra?: "even" | "odd";
  /** Wenn eine Spalte sortiert wurde */
  "onwm-table-sorted"?: (e: CustomEvent<CustomEvent>) => void;
};

export type TabProps = {
  /**  */
  selected?: boolean;
};

export type TabPanelProps = {
  /**  */
  selected?: boolean;
};

export type TabsProps = {
  /** Index des ausgewählten Tabs */
  selectedIndex?: Number;
  /** Zuletzt geöffneten Tab speichern */
  remember?: Boolean;
  /** Tab-Design */
  theme?: "clean";
  /** Tab wurde gewechselt */
  "onwm-tab-changed"?: (e: CustomEvent<CustomEvent>) => void;
};

export type TagProps = {
  /** Tag mit spezieller Funktion */
  color?: "frischgruen" | "amtswege";
  /** Dropdown offen? */
  open?: string;
  /** Ist es ein Dropdown Tag? */
  dropdown?: Boolean;
  /**  */
  oneventName?: (e: CustomEvent<CustomEvent>) => void;
};

export type TagListProps = {
  /** Sollen Tags gescrolled werden oder umbrechen? */
  scrollable?: Boolean;
  /** Bezeichnung der Navigations */
  label?: String;
};

export type TextareaProps = {
  /** Whether the component is disabled */
  disabled?: Boolean;
  /**  */
  rows?: number;
  /**  */
  pattern?: string;
  /** Whether the component has a validation error */
  hasError?: Boolean;
  /**  */
  value?: string;
  /** Default value of the component */
  defaultValue?: String;
  /** Whether to show validation errors immediately */
  showErrors?: boolean;
  /** Whether to validate on input */
  validate?: boolean;
  /** Fehlermeldung bei ungültiger Eingabe
Diese Meldung wird direkt am Textarea-Element angezeigt, wenn es validiert wird und ungültig ist. */
  errormessage?: String;
  /** Spezifische Fehlermeldung für die Fehlerübersicht
Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
Fehlermeldungen anzuzeigen, z.B. "Bitte geben Sie eine Beschreibung bei 'Projektinformationen' ein"
statt nur "Dieses Feld ist erforderlich". */
  summaryErrormessage?: String;
  /** Current error message */
  error?: String;
  /**  */
  _errorController?: string;
  /**  */
  _output?: string;
  /** Text, der angekündigt wird, wenn Optionen angezeigt werden */
  announcementText?: String;
  /** Maximale Zeichenanzahl, die eingegeben werden darf */
  maxlength?: Number;
  /** placeholder-Attribut in HTML */
  placeholder?: String;
  /** Art des Suchfeldes */
  search?: "hidden" | "visible" | "hiddenmobile";
  /** size-Attribute in HTML */
  size?: String;
  /** Liste in Combobox beim Tippen filtern */
  filter?: Boolean;
  /** Verfügbare Zeichenanzahl verbergen */
  hideMaxlength?: Boolean;
  /** Text for maxlength message */
  maxlengthText?: String;
  /** Pattern validation message */
  patternMismatchMessage?: String;
  /**  */
  info?: string;
  /**  */
  _infoOpen?: boolean;
  /**  */
  onundefined?: (e: CustomEvent<CustomEvent>) => void;
};

export type TourismuszeileProps = {
  /** Sichtbarkeit des Banners */
  hidden?: Boolean;
  /** Bannerverlinkung */
  url?: String;
};

export type UploadProps = {
  /** Bezeichnung des Eingabefeldes */
  label?: String;
  /** Bezeichnung des Löschen-Buttons (Lösche [Dateiname]) */
  labelDelete?: String;
  /** Bezeichnung für das Liveregion-Update nachdem eine Datei gelöscht wurde. ([Dateiname] gelöscht) */
  labelDeleted?: String;
  /** Bezeichnung für Titel der ausgewählten Dateien */
  labelSelection?: String;
  /** Auswahl von mehreren Dateien erlauben */
  multiple?: boolean;
  /** Auflistung der ausgewählten Dateien verbergen */
  hideSelectedFiles?: boolean;
  /** Needed to submit files */
  _formData?: string;
  /** Indicates whether the upload is disabled */
  disabled?: Boolean;
  /** Fehlermeldung bei ungültiger Eingabe
Diese Meldung wird direkt am Upload-Element angezeigt, wenn es validiert wird und ungültig ist,
z.B. wenn ein Pflichtfeld keine Datei enthält. */
  errormessage?: String;
  /** Spezifische Fehlermeldung für die Fehlerübersicht
Diese Meldung wird in der Fehlerübersicht (wm-formerrorsummary) anstelle der normalen
Fehlermeldung angezeigt. Dies ist nützlich, um in der Übersicht kontextspezifischere
Fehlermeldungen anzuzeigen, z.B. "Bitte laden Sie einen Nachweis bei 'Einkommensnachweis' hoch"
statt nur "Bitte wählen Sie eine Datei aus". */
  summaryErrormessage?: String;
  /** Whether the component has been interacted with */
  _hasInteracted?: Boolean;
  /** Aktiviert die Validierung bei Eingabe */
  validate?: Boolean;
  /** Steuert die Anzeige von Fehlermeldungen */
  showErrors?: Boolean;
  /** Current error message */
  error?: String;
  /** Initial value of the component */
  _initialValue?: String;
  /** Default value of the component */
  defaultValue?: String;
  /** Text statt Sternchen darstellen */
  hideAsterisk?: Boolean;
  /** optionale ID */
  id?: String;
  /** Name-Attribute in HTML */
  name?: String;
  /** Wert des Elements */
  value?: String;
  /** Pflichtfeld */
  required?: Boolean;
  /**  Text für Pflichtfeld-Hinweis */
  requiredText?: String;
  /** Hinweis */
  hint?: String;
  /** Dateiliste aktualisiert */
  "onwm-files-updated"?: (e: CustomEvent<CustomEvent>) => void;
  /**  */
  onchange?: (e: CustomEvent<Event>) => void;
  /**  */
  "onwm-files-added"?: (e: CustomEvent<CustomEvent>) => void;
  /**  */
  "onwm-files-removed"?: (e: CustomEvent<CustomEvent>) => void;
  /**  */
  onundefined?: (e: CustomEvent<CustomEvent>) => void;
  /**  */
  oneventName?: (e: CustomEvent<Event>) => void;
  /**  */
  onblur?: (e: CustomEvent<Event>) => void;
  /**  */
  onfocus?: (e: CustomEvent<Event>) => void;
  /**  */
  oninvalid?: (e: CustomEvent<Event>) => void;
  /**  */
  onreset?: (e: CustomEvent<Event>) => void;
};

export type WienBotProps = {
  /** Start-Frage WienBot */
  widgetText?: String;
  /** Text in WienBot Sprachblase */
  infoText?: String;
  /** Kontext */
  context?: String;
  /** Art der Nachricht. In den meisten Fällen 'text'. */
  channel?: "text" | "quicklink" | "voice";
};

export type WienBotButtonProps = {
  /** Fragen an den WienBot */
  message?: String;
  /** Bestehende Nachrichten bei einem erneuten Aufruf zurücksetzen */
  resetMessages?: Boolean;
  /** Frage als Nachricht im Chat angezeigen */
  showMessage?: Boolean;
  /** Art des Nachricht. In den meisten Fällen `text`. */
  type?: "text" | "quicklink" | "voice";
};

export type CustomElements = {
  /**
   * Accordion Komponente - Ein- und Ausklappbare Panels
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-defined** - Web Component ist bereit
   *
   * ### **Methods:**
   *  - **_expandContent(heading)** - Akkordeon wurde geöffnet
   * - **_collapseContent(heading)** - Akkordeon wurde geschlossen
   * - **expand(index, element: _number_)** - Panel öffnen
   * - **collapse(index, element: _number_)** - Panel schließen
   *
   * ### **Slots:**
   *  - **default** - Nimmt Paare von wm-accordion-heading und wm-accordion-content Elementen auf
   */
  "wm-accordion": Partial<AccordionProps & BaseProps & BaseEvents>;

  /**
   * Accordion Content - Der Inhalt eines Accordion Panels
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - HTML oder Text-Content
   */
  "wm-accordion-content": Partial<
    AccordionContentProps & BaseProps & BaseEvents
  >;

  /**
   * Accordion Heading - Klickbare Überschrift für ein Accordion Panel
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-contentchanged** - Wenn ein Element hinzugefügt oder gelöscht worden ist.
   *
   * ### **Methods:**
   *  - **_getData()** - Retrieve accessible name and level from slotted heading
   *
   * ### **Slots:**
   *  - **default** - Der Slot für die Überschrift (h1-h6)
   * - **icon** - Ein Icon oder anderes Element vor der Überschrift
   * - **subheading** - Optionaler Zusatztext in der Headline, der nicht fett dargestellt wird
   */
  "wm-accordion-heading": Partial<
    AccordionHeadingProps & BaseProps & BaseEvents
  >;

  /**
   * Button/Button
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Text
   */
  "wm-breakingnews": Partial<BreakingNewsProps & BaseProps & BaseEvents>;

  /**
   * Icon/Icon
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Link oder Button
   */
  "wm-button": Partial<ButtonProps & BaseProps & BaseEvents>;

  /**
   * Komponente zur Darstellung CTA Links oder Button, die aussehen wie Links.
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Link oder Button
   */
  "wm-cta": Partial<CTAProps & BaseProps & BaseEvents>;

  /**
   * Button/Button, Icon/Icon
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-card-flipped** - Karte wurde geflipped
   *
   * ### **Methods:**
   *  - **firstUpdated()** - If there's an image, link the entire Card.
   *
   * ### **Slots:**
   *  - **heading** - Überschrift
   * - **media** - Bild oder Video
   * - **eyecatcher** - Störer
   * - **content** - Inhalt der Card
   * - **precontent** - Zusätzlicher Inhalt am Anfang der Card, zum Beispiel Chip
   * - **postcontent** - Zusätzlicher Inhalt am Ende der Card, zum Beispiel Tags
   * - **flip** - Inhalt für die Rückseite der Flip-Card
   */
  "wm-card": Partial<CardProps & BaseProps & BaseEvents>;

  /**
   * Icon/Icon
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - h2, h3, h4, h5, oder h6
   */
  "wm-anchor": Partial<AnchorProps & BaseProps & BaseEvents>;

  /**
   * Badges sind Hervorhebungen in Großbuchstaben, um wichtige Hinweise auf den ersten Blick sichtbar zu machen.
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Text
   */
  "wm-badge": Partial<BadgeProps & BaseProps & BaseEvents>;

  /**
   * Button/Button, Icon/Icon
   *
   * * Mit einem Karussell kann man mehrere Cards in einer Reihe anbieten
   * * Pfeile zeigen an, in welche Richtung man weiterdrehen kann
   * * Sliden ist auch on touch / swipe möglich
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-slide-changed** - Slide wurde gewechselt
   *
   * ### **Methods:**
   *  - **prev()** - Zum nächsten Slide springen
   * - **next()** - Zum vorherigen Slide springen
   * - **slide(n: _Number_, transition: _Boolean_)** - Zu einem bestimmten Slide springen
   * - **toggleAutoplay()** - Toggles the autoplay state
   *
   * ### **Slots:**
   *  - **default** - Cards oder Bilder
   */
  "wm-carousel": Partial<CarouselProps & BaseProps & BaseEvents>;

  /**
   *
   * ---
   *
   *
   * ### **Methods:**
   *  - **checkValidity()** - Override checkValidity to better handle error messages for the error summary
   * - **showError(message: _string_)** - Public method to show an error message
   * - **clearError()** - Public method to clear error state
   * - **setDisabled(isDisabled: _boolean_)** - Sets the disabled state of the checkbox component and all its options
   *
   */
  "wm-checkbox": Partial<CheckboxProps & BaseProps & BaseEvents>;

  /**
   * Komponente zur Darstellung von Kategorien und Eigenschaften
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Text, Link oder Button
   */
  "wm-chip": Partial<ChipProps & BaseProps & BaseEvents>;

  /**
   * Details/Details, List/List
   * ---
   *
   */
  "wm-copyright": Partial<CopyrightProps & BaseProps & BaseEvents>;

  /**
   * Button/Button
   * ---
   *
   *
   * ### **Methods:**
   *  - **toggleDetails()** - Sichtbarkeit umschalten
   *
   * ### **Slots:**
   *  - **label** - Bezeichnung
   * - **content** - Inhalt
   */
  "wm-details": Partial<DetailsProps & BaseProps & BaseEvents>;

  /**
   * Button/Button, Stack/Stack, Pagination/Pagination
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-fetched** - Daten wurden erfolgreich geladen
   * - **wm-defined** - Web Component ist bereit
   *
   * ### **Methods:**
   *  - **setJSON(d, data: _Object_)** - JSON mit Daten übergeben
   *
   * ### **Slots:**
   *  - **default** - Ausgabe der Daten
   */
  "wm-fetch": Partial<FetchProps & BaseProps & BaseEvents>;

  /**
   * Die Figure-Komponente ermöglicht es, Bilder, Videos und andere Medieninhalte in einem Container anzuzeigen.
   *  Die Größe des Containers wird automatisch an den Inhalt angepasst (zum Beispiel schmales Bild, viel Beschreibungstext).
   * ---
   *
   *
   * ### **Methods:**
   *  - **_debounce(func: _Function_, wait: _number_): _Function_** - Creates a debounced version of the provided function.
   * - **_adjustSize(retries: _number_)** - Adjusts the size of the figure element based on its media content.
   * - **render(): _TemplateResult_** - Renders the slot content.
   *
   * ### **Slots:**
   *  - **default** - HTML figure content
   */
  "wm-figure": Partial<FigureProps & BaseProps & BaseEvents>;

  /**
   * Filter
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-filter-selection-submitted** - Wenn eine Auswahl getroffen und angewendet worden ist
   * - **wm-filter-selected** - Wenn eine Auswahl getroffen worden ist
   *
   * ### **Methods:**
   *  - **submit()** - Aktuelle Auswahl speichern
   * - **updateSelection()** - Wenn es eine Filter Selection gibt, kann man diese clientseitig aktualisieren
   *
   * ### **Slots:**
   *  - **default** - undefined
   */
  "wm-filter": Partial<FilterProps & BaseProps & BaseEvents>;

  /**
   *
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-filter-updated**
   */
  "wm-filter-selection": Partial<FilterSelectionProps & BaseProps & BaseEvents>;

  /**
   * Ein benutzerdefiniertes Webkomponente für die Verwaltung von Fußnoten in einem Dokument. Es werden verweise auf Fußnoten im Text gesucht und in einer Liste am Ende des Dokuments aufgeführt.
   * Eine Referenz im Text wird durch eine Zahl markiert, die auf die entsprechende Fußnote verweist.
   * Fußnoten sind numerierte Verweise am Ende einer Seite, die zusätzliche Informationen oder Erklärungen zu bestimmten Textpassagen bieten.
   * Bei Klick auf eine Fußnote wird der Benutzer zur entsprechenden Referenz im Text zurückgeführt.
   * ---
   *
   */
  "wm-footnote": Partial<FootnoteProps & BaseProps & BaseEvents>;

  /**
   * FormErrorsummary/FormErrorsummary
   * ---
   *
   *
   * ### **Methods:**
   *  - **getErrors(): _Array_** - Public method to get current errors
   * - **render()** - Render the error summary based on reactive state
   *
   * ### **Slots:**
   *  - **default** - Contains the HTML form element und all form fields
   */
  "wm-form": Partial<FormProps & BaseProps & BaseEvents>;

  /**
   * Button/Button
   * ---
   *
   *
   * ### **Events:**
   *  - **delete**
   * - **wm-block-deleted** - Block wurde gelöscht.
   * - **wm-block-duplicated** - Block wurde dupliziert.
   *
   * ### **Slots:**
   *  - **default** - Text
   */
  "wm-formblock": Partial<FormBlockProps & BaseProps & BaseEvents>;

  /**
   * FormBlock/FormBlock, Notification/Notification, List/List
   * ---
   *
   *
   * ### **Events:**
   *  - **jump-to-error** - Wird ausgelöst, wenn auf einen Fehlereintrag geklickt wird Der Event enthält die ID des Feldes als `event.detail.id`
   *
   * ### **Methods:**
   *  - **setSummaryMessage(errorId: _string_, message: _string_)** - Setzt eine benutzerdefinierte Fehlermeldung für einen bestimmten Fehlereintrag
   *
   * Diese Methode kann verwendet werden, um die Fehlermeldung in der Zusammenfassung
   * programmatisch zu ändern, nachdem die Fehler bereits angezeigt wurden.
   *
   * Beispiel:
   * ```javascript
   * const errorSummary = document.querySelector('wm-formerrorsummary');
   * errorSummary.setSummaryMessage('inputField', 'Bitte geben Sie einen gültigen Namen ein');
   * ```
   * - **clearErrorTracking()** - Clear all processed error IDs - should be called when form is reset
   * or when a new validation cycle begins
   * - **continueToNextError(): _boolean_** - Continue to the next set of errors while preserving error history
   * This is useful for multi-step validation where you want to handle
   * errors one at a time or in batches
   * - **hasMoreErrors(): _boolean_** - Check if there are more errors in previous iterations
   * - **updateWithErrors(errors: _Array_, itemTemplate: _HTMLTemplateElement_)** - Update with error objects, preventing duplicates based on ID
   * - **addError(error: _Object_, itemTemplate: _HTMLTemplateElement_)** - Adds a single error to the summary
   *
   * ### **Slots:**
   *  - **default** - Text bzw. Fehlereinträge (normalerweise vom Formular automatisch befüllt)
   */
  "wm-formerrorsummary": Partial<
    FormErrorsummaryProps & BaseProps & BaseEvents
  >;

  /**
   * Form/Form, FormBlock/FormBlock
   * ---
   *
   *
   * ### **Events:**
   *  - **eventName**
   * - **blur**
   * - **focus**
   * - **invalid**
   * - **reset**
   *
   * ### **Methods:**
   *  - **checkValidity(): _String_** - Bridge method to support Form's validation flow
   * - **validateGroup(): _Object|String_** - Validiert alle untergeordneten Formularfelder in der Gruppe.
   *
   * Diese Methode durchläuft alle unterstützten Formularelemente innerhalb der Gruppe
   * und prüft deren Gültigkeit. Wenn mindestens ein Element ungültig ist, wird die
   * Gruppe als fehlerhaft markiert.
   * - **showError(message)** - Add showError and clearError methods that use the errorController
   * - **setDisabled(isDisabled: _boolean_)** - Sets the disabled state of the form group and all its child form elements
   * - **reset()** - Reset the form control to its initial value
   *
   * ### **Slots:**
   *  - **default** - Formularelemente, die gruppiert werden sollen
   * - **error** - Benutzerdefinierte Fehlermeldung (optional)
   */
  "wm-form-group": Partial<FormGroupProps & BaseProps & BaseEvents>;

  /**
   * Fortschrittsanzeige für mehrseitige Formulare
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Liste
   */
  "wm-formprogress": Partial<FormProgressProps & BaseProps & BaseEvents>;

  /**
   * Galerie
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Text
   */
  "wm-gallery": Partial<GalleryProps & BaseProps & BaseEvents>;

  /**
   * Komponente zur Darstellung eines Grid Layouts
   * ---
   *
   *
   * ### **Slots:**
   *  - **Cards** - undefined
   */
  "wm-grid": Partial<GridProps & BaseProps & BaseEvents>;

  /**
   * Header der Website. Alternative zu &gt;header&lt;.
   * Wird automatisch kleiner auf großen Viewports, wenn die Seite gescrolled wurde.
   * ---
   *
   *
   * ### **Methods:**
   *  - **addAction(node: _Node_)** - Eine Action von außen hinzufügen
   *
   * ### **Slots:**
   *  - **default** - 1 oder 2 divs
   */
  "wm-header": Partial<HeaderProps & BaseProps & BaseEvents>;

  /**
   * Farbliche Texthervorhebung
   *
   * Highlight mit Hintergrundfarbe kann eingesetzt werden, um einzelne Sätze oder Absätze farblich hervorzuheben.
   *
   * Highlight mit Rahmenlinien heben Inhalte hervor, zum Beispiel kurzfristig geänderte Öffnungszeiten oder ein kurzfristig nicht verfügbares Service. Fastschwarz ist üblich für Archiv-Inhalte.
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - HTML oder Text-Content
   */
  "wm-highlight": Partial<HighlightProps & BaseProps & BaseEvents>;

  /**
   * Icon aus dem vordefinierten Spritesheet
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Beschreibung des Icons. Nur befüllen, wenn der Inhalt auch wirklich im Accessbility Tree sein soll.
   */
  "wm-icon": Partial<IconProps & BaseProps & BaseEvents>;

  /**
   * Wrapper für Iframes
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Text
   */
  "wm-iframe": Partial<IframeProps & BaseProps & BaseEvents>;

  /**
   * Button/Button, Icon/Icon, Stack/Stack
   * ---
   *
   *
   * ### **Events:**
   *
   *
   * ### **Methods:**
   *  - **firstUpdated(changedProperties)** - Captures initial value from DOM after first render
   * - **getOptions(value: _String_, url: _String_): _Promise<Array|null>_** - Abrufen von Optionen aus einer Datenquelle
   *
   * Diese Methode bietet Combobox-Komponenten die Möglichkeit, Daten von einer API abzurufen.
   * Im folgenden Format sollten die zurückgegebenen Daten genutzt werden:
   * ```
   * [
   *   {
   *     text: "Anzeigetext",
   *     value: "tatsächlicher_wert",
   *     children: [] // Optional für verschachtelte Optionen
   *   }
   * ]
   * ```
   * - **setOptions(structuredData: _Array_)** - Liste in Combobox befüllen
   *
   * Diese Methode legt dynamisch Optionen für die Combobox fest.
   * Optionen sollten im folgenden Format bereitgestellt werden:
   * ```
   * [
   *   {
   *     text: "Anzeigetext", // Der Text, der angezeigt wird
   *     value: "eigentlicher_wert", // Der Wert, der im Formular übermittelt wird
   *     children: [] // Optional für verschachtelte Optionen
   *   }
   * ]
   * ```
   *
   * Für Barrierefreiheit und optimale Nutzung beachten Sie:
   * - Begrenzen Sie die Anzahl der Optionen für bessere Leistung
   * - Stellen Sie sicher, dass jede Option eindeutige Werte hat
   * - **reset()** - Resets the component to its initial state
   * - **formResetCallback()** - Reset the component to its initial state (called by forms)
   * - **setValue(value: _string_, options: _@param {boolean} options.validate - Whether to validate after setting (default: true)
   * 	 * @param {boolean} options.silent - Whether to skip dispatching events (default: false)
   * 	 * _): _string_** - Public method to set the input value programmatically
   * This ensures all side effects are properly triggered
   * - **setDisabled(isDisabled: _boolean_)** - Sets or removes disabled state
   * - **validateField(): _string_** - Forces validation of the component
   * - **updateUI()** - Explicitly forces the component to update its UI state
   * - **checkValidity()** - Standard validation method that respects component state
   * - **setCustomValidity(message)** - Public method to set a custom validation message
   * - **hideOptions(setFocus: _Boolean_)** - Liste in Combobox verbergen
   * - **updated(changedProperties)** - Override of updated lifecycle to handle attribute/property changes
   * - **showError(message: _string_)** - Shows an error message for this input
   * - **clearError()** - Clears any error state from this input
   *
   *
   * - **formDisabledCallback(disabled: _boolean_)** - Called when the element's form sets the disabled state
   * - **showOptions()** - Liste in Combobox anzeigen
   * - **clearErrorState()** - Clear error state and validation message
   */
  "wm-input": Partial<InputProps & BaseProps & BaseEvents>;

  /**
   * Darstellung von Listen vertikal, horizontal oder mit Trenner
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - <ol> oder <ul>
   */
  "wm-list": Partial<ListProps & BaseProps & BaseEvents>;

  /**
   * Button/Button, Input/Input, Icon/Icon
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-map-ready** - Map ist bereit
   * - **wm-map-marker-removed** - Marker wurde entfernt
   * - **wm-map-marker-submit** - “Übernehmen"-Button in marker wurde geklickt
   * - **wm-map-marker-added** - Marker wurde hinzugefügt
   *
   * ### **Methods:**
   *  - **resetBounds()** - Kartenausschnitt aktualisieren
   * - **setCenter(lng: _String_, lat: _String_)** - Karte zentrieren
   * - **deleteAll()** - Alle Marker löschen
   * - **addMarker(id: _String_, data: _Object_, text: _String_, draggable: _Boolean_, html: _String_, color: _Boolean_, custompin: _Boolean_, updateOptions)** - Marker hinzufügen
   * - **reRender()** - Mapinhalte und Abgrenzungen neu berechnen
   *
   * ### **Slots:**
   *  - **default** - Mapmarker
   */
  "wm-map": Partial<MapProps & BaseProps & BaseEvents>;

  /**
   * Stadtplan-Beta Karten
   * ---
   *
   *
   * ### **Methods:**
   *  - **_addMarkersBatch(markersData: _Array_, markersData[].lat: _number_, markersData[].lng: _number_, markersData[].pin: _string_, markersData[].label: _string_, markersData[].content: _string_)** - Adds a batch of markers to the map.
   *
   * This method creates a markers layer if it doesn't already exist, caches icons to avoid recreating them,
   * and adds markers to the layer in a batch. It also binds popups to markers if label or content is provided.
   * - **resetBounds()** - Kartenausschnitt aktualisieren
   * - **clearLayers()** - Marker entfernen
   * - **reRender()** - Mapinhalte und Abgrenzungen neu berechnen
   *
   * ### **Slots:**
   *  - **default** - Mapmarker
   */
  "wm-map-alt": Partial<MapAltProps & BaseProps & BaseEvents>;

  /**
   * Stadtplan - Beta Kartenmarker
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - HTML-Inhalt
   */
  "wm-mapmarker": Partial<MapMarkerProps & BaseProps & BaseEvents>;

  /**
   * Button/Button, Icon/Icon, Details/Details
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-modal-closed** - Wenn das Modal geschlossen wurde.
   * - **wm-modal-opened** - Wenn das Modal geöffnet wurde.
   *
   * ### **Methods:**
   *  - **toModal(trigger: _node_, content: _node_)** - Alternative zum data-modal Attribut. Hilfreich bei dynamisch erzeugten Buttons.
   * - **open(pos)** - Modal öffnen
   * - **close()** - Modal schließen
   */
  "wm-modal": Partial<ModalProps & BaseProps & BaseEvents>;

  /**
   * Button/Button
   * ---
   *
   *
   * ### **Methods:**
   *  - **open()** - Menü öffnen
   * - **close()** - Menü schließen
   *
   * ### **Slots:**
   *  - **default** - Liste
   * - **precontent** - Header der Navigation
   * - **postcontent** - Inhalt nach den Listen
   */
  "wm-nav-main": Partial<NavMainProps & BaseProps & BaseEvents>;

  /**
   * Button/Button
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - HTML oder Text-Content
   */
  "wm-nav-page": Partial<NavPageProps & BaseProps & BaseEvents>;

  /**
   * Button/Button, Icon/Icon, Highlight/Highlight
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Meldung
   */
  "wm-notification": Partial<notificationProps & BaseProps & BaseEvents>;

  /**
   * Komponente zum Blättern von Kapiteln
   * ---
   *
   *
   * ### **Slots:**
   *  - **prevLink** - Verlinkung zur vorigen Seite
   * - **nextLink** - Verlinkung zur nächsten Seite
   */
  "wm-pager": Partial<PagerProps & BaseProps & BaseEvents>;

  /**
   * Icon/Icon
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-page-changed** - Seitenwechsel
   *
   * ### **Slots:**
   *  - **default** - Text
   */
  "wm-pagination": Partial<PaginationProps & BaseProps & BaseEvents>;

  /**
   * CTA/CTA
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Liste
   */
  "wm-quicklinks": Partial<QuicklinksProps & BaseProps & BaseEvents>;

  /**
   * Darstellung eines Zitats
   * ---
   *
   *
   * ### **Slots:**
   *  - **image** - Optionales Bild
   * - **default** - Zitat
   */
  "wm-quote": Partial<QuoteProps & BaseProps & BaseEvents>;

  /**
   *
   * ---
   *
   *
   * ### **Methods:**
   *  - **checkValidity(): _string_** - Validates the current value against constraints
   * - **showError(message: _string_)** - Shows an error message for this radio component
   * - **clearError()** - Clears any error state from this radio component
   *
   * - **reset()** - Resets the component to its initial state
   * - **setDisabled(isDisabled: _boolean_)** - Sets the disabled state of the radio component and all its options
   */
  "wm-radio": Partial<RadioProps & BaseProps & BaseEvents>;

  /**
   * Mit Sections werden größere, thematisch abgegrenze Blöcke innerhalb einer Seite definiert.
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - HTML oder Text-Content
   */
  "wm-section": Partial<SectionProps & BaseProps & BaseEvents>;

  /**
   *
   * ---
   *
   *
   * ### **Events:**
   *
   *
   * ### **Methods:**
   *  - **updateOptions(newOptions: _Array<HTMLOptionElement>_)** - Update the <option> elements inside the select from light DOM.
   * Maintained for backward compatibility.
   *
   * - **checkValidity(): _string_** - Validates the current value against the required constraint
   * - **clearErrorState()** - Clears the error state of the component
   * - **showError(message: _string_)** - Shows an error message for this select component
   * - **clearError()** - Clears any error state from this select component
   *
   * - **formResetCallback()** - Reset the component to its initial state (called by forms)
   *
   * - **render()** - The hidden slot prevents duplicate display of options in the DOM.
   * Option elements are slotted in the light DOM for API access
   * but rendered only in the shadow DOM's select element.
   * - **setValue(value: _string|Array_, options: _@param {boolean} options.validate - Ob nach dem Setzen validiert werden soll (Standard: true)
   * 	 * @param {boolean} options.silent - Ob das Versenden von Events übersprungen werden soll (Standard: false)
   * 	 * _): _string|Array_** - Öffentliche Methode zum programmatischen Setzen des Auswahlwerts
   * Dies stellt sicher, dass alle Seiteneffekte ordnungsgemäß ausgelöst werden
   * - **setDisabled(isDisabled: _boolean_)** - Setzt oder entfernt den deaktivierten Zustand
   * - **validateField(): _string_** - Erzwingt die Validierung der Komponente
   * - **updateUI()** - Erzwingt ausdrücklich ein Update des UI-Zustands der Komponente
   *
   * - **setCustomValidity(message: _String_)** - Public method to set a custom validation message
   * - **formDisabledCallback(disabled: _boolean_)** - Called when the element's form sets the disabled state
   * - **hideOptions(setFocus: _Boolean_)** - Liste in Combobox verbergen
   * - **showOptions()** - Liste in Combobox anzeigen
   */
  "wm-select": Partial<SelectProps & BaseProps & BaseEvents>;

  /**
   * Button/Button
   * ---
   *
   *
   * ### **Methods:**
   *  - **toggleSidebar(e)** - Sidebar öffnen oder schließen
   * - **closeSidebar(e)** - Sidebar schließen
   *
   * ### **Slots:**
   *  - **default** - Jeglicher HTML-Content
   */
  "wm-sidebar": Partial<SidebarProps & BaseProps & BaseEvents>;

  /**
   * Komponeten zur vertikalen oder horizontalen Ausrichtung von Elementen
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - HTML oder Text-Content
   */
  "wm-stack": Partial<StackProps & BaseProps & BaseEvents>;

  /**
   * Button/Button, Carousel/Carousel
   * ---
   *
   *
   * ### **Slots:**
   *  - **content** - Textinhalt
   * - **media** - Bild oder Video
   */
  "wm-stage": Partial<StageProps & BaseProps & BaseEvents>;

  /**
   * Status
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - undefined
   */
  "wm-status": Partial<StatusProps & BaseProps & BaseEvents>;

  /**
   * Toggle-Switch in Formularen
   * ---
   *
   *
   * ### **Events:**
   *  - **eventName**
   * - **blur**
   * - **focus**
   * - **invalid**
   * - **reset**
   *
   * ### **Methods:**
   *  - **checkValidity(): __** - Standard validation method that respects component state
   *
   *
   * - **reset()** - Reset the form control to its initial value
   * - **formResetCallback()** - Form reset callback - called by parent forms
   * Provides standard reset behavior
   * - **setDisabled(isDisabled: _boolean_)** - Sets the disabled state of the switch
   * - **setCustomValidity(message: _String_)** - Public method to set a custom validation message
   * - **formDisabledCallback(disabled: _boolean_)** - Called when the element's form sets the disabled state
   *
   * ### **Slots:**
   *  - **default** - Text
   */
  "wm-switch": Partial<SwitchProps & BaseProps & BaseEvents>;

  /**
   * Button/Button
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-table-sorted** - Wenn eine Spalte sortiert wurde
   *
   * ### **Methods:**
   *  - **rearrangeRows(th: _Node_, newDirection: _Number_)** - Zeilen neu sortieren
   *
   * ### **Slots:**
   *  - **default** - Text
   */
  "wm-table": Partial<TableProps & BaseProps & BaseEvents>;

  /**
   * Reiter
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Bezeichnung
   */
  "wm-tab": Partial<TabProps & BaseProps & BaseEvents>;

  /**
   * Reiter Inhalt
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Text- oder HTML-Content
   */
  "wm-tabpanel": Partial<TabPanelProps & BaseProps & BaseEvents>;

  /**
   * Tabs/Tab, Tabs/TabPanel
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-tab-changed** - Tab wurde gewechselt
   *
   * ### **Methods:**
   *  - **reRenderChildren()** - Initializes elements like maps when selecting tabs
   *
   * ### **Slots:**
   *  - **tab** - Bezeichnung im Reiter
   * - **default** - Inhalte
   */
  "wm-tabs": Partial<TabsProps & BaseProps & BaseEvents>;

  /**
   * Button/Button, Icon/Icon
   * ---
   *
   *
   * ### **Events:**
   *  - **eventName**
   *
   * ### **Methods:**
   *  - **toggle(e: _Event_)** - Liste öffnen oder schließen
   * - **openDropdown()** - Dropdown-Tag öffnen
   * - **closeDropdown()** - Dropdown-Tag schließen
   *
   * ### **Slots:**
   *  - **default** - Link oder Liste mit Links
   */
  "wm-tag": Partial<TagProps & BaseProps & BaseEvents>;

  /**
   * Horizontale Liste vom Tags
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Liste
   */
  "wm-tag-list": Partial<TagListProps & BaseProps & BaseEvents>;

  /**
   *
   * ---
   *
   *
   * ### **Events:**
   *
   *
   * ### **Methods:**
   *  - **firstUpdated(changedProperties)** - Captures initial value from DOM after first render
   * - **reset()** - Resets the component to its initial state
   * - **formResetCallback()** - Form reset callback - called by parent forms
   * Provides standard reset behavior
   * - **checkValidity(): _string_** - Validates the current value against constraints
   * - **showError(message: _string_)** - Shows an error message for this textarea component
   * - **clearError()** - Clears any error state from this textarea component
   * - **setCustomValidity(message: _string_)** - Forward setCustomValidity to underlying native textarea
   * - **setDisabled(isDisabled: _boolean_)** - Sets the disabled state of the textarea
   *
   *
   * - **updated(changedProperties)** - Override of updated lifecycle to handle attribute/property changes
   * - **formDisabledCallback(disabled: _boolean_)** - Called when the element's form sets the disabled state
   * - **hideOptions(setFocus: _Boolean_)** - Liste in Combobox verbergen
   * - **showOptions()** - Liste in Combobox anzeigen
   * - **clearErrorState()** - Clear error state and validation message
   */
  "wm-textarea": Partial<TextareaProps & BaseProps & BaseEvents>;

  /**
   * Komponente zur Darstellung eines fixierten Banners am Seitenanfang
   * ---
   *
   *
   * ### **Slots:**
   *  - **heading** - Catchphrase - maximal 20 Zeichen
   * - **content** - Kurzbeschreibung - maximal 40 Zeichen
   */
  "wm-tourismuszeile": Partial<TourismuszeileProps & BaseProps & BaseEvents>;

  /**
   * Button/Button, List/List, Stack/Stack
   * ---
   *
   *
   * ### **Events:**
   *  - **wm-files-updated** - Dateiliste aktualisiert
   * - **change**
   * - **wm-files-added**
   * - **wm-files-removed**
   * - **eventName**
   * - **blur**
   * - **focus**
   * - **invalid**
   * - **reset**
   *
   * ### **Methods:**
   *  - **removeFile(index: _Number_, e: _Event_)** - Bestimmte Datei entfernen
   * - **checkValidity(): _String_** - Checks validity for file upload and applies custom error handling.
   * - **showError(message: _string_)** - Shows an error message for this upload component
   * - **clearError()** - Clears any error state from this upload component
   *
   * - **setDisabled(isDisabled: _boolean_)** - Set the disabled state of the component and properly handle UI updates
   * - **_unsetFileValues()** - Remove all files
   * - **_setFileValues()** - Fill formdata submitted to the server
   * - **formResetCallback()** - Form reset callback - called by parent forms
   * Provides standard reset behavior
   * - **reset()** - Reset the component to its initial state
   *
   * - **setCustomValidity(message: _String_)** - Public method to set a custom validation message
   * - **formDisabledCallback(disabled: _boolean_)** - Called when the element's form sets the disabled state
   *
   * ### **Slots:**
   *  - **default** - Text oder HTML-Content über dem Button
   * - **postcontent** - Text oder HTML-Content unter dem Button
   */
  "wm-upload": Partial<UploadProps & BaseProps & BaseEvents>;

  /**
   * WienBot
   * <br>
   * Docs: <a href="https://stp.wien.gv.at/wienbotwidget/static/widget/wienbot/widget.html">ubitec docs</a>
   * ---
   *
   */
  "wm-wienbot": Partial<WienBotProps & BaseProps & BaseEvents>;

  /**
   * WienBotButton
   * <br>
   * Docs: <a href="https://stp.wien.gv.at/wienbotwidget/static/widget/wienbot/widget.html">ubitec docs</a>
   * ---
   *
   *
   * ### **Slots:**
   *  - **default** - Text für den Button. Standard: „WienBotButton”
   */
  "wm-button-wienbot": Partial<WienBotButtonProps & BaseProps & BaseEvents>;
};

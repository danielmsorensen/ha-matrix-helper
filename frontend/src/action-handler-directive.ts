// Lit directive that wires an element up to Home Assistant's standard tap/
// hold/double-tap gesture detection, dispatching a native "action" custom
// event with detail: { action: "tap" | "hold" | "double_tap" }.
//
// custom-card-helpers doesn't export this directive, so it's adapted from
// HA's src/panels/lovelace/common/directives/action-handler-directive.ts
// (boilerplate-card's version breaks single tap with hasDoubleClick).
// Omitted: options.resolve/keyboardOnly (one fixed element here) and
// hasTap/disabled (never set by this card).
import { ActionHandlerOptions, deepEqual, fireEvent } from "custom-card-helpers";
import { directive, Directive, ElementPart, PartInfo } from "lit/directive.js";
import { defineOnce } from "./define-once";

const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

interface ActionHandlerElement extends HTMLElement {
  actionHandler?: {
    options: ActionHandlerOptions;
    start?: (ev: Event) => void;
    end?: (ev: Event) => void;
    handleKeyDown?: (ev: KeyboardEvent) => void;
  };
}

const DOUBLE_CLICK_TIME = 250;

class ActionHandler extends HTMLElement {
  public holdTime = 500;

  protected timer?: number;

  protected held = false;

  private cancelled = false;

  private dblClickTimeout?: number;

  // The double-tap window only pairs two taps on the same target; a quick
  // tap on a different target starts its own window instead of completing
  // one (relevant once more than one matrix-helper-card shares this single
  // page-wide handler instance).
  private dblClickTarget?: HTMLElement;

  public connectedCallback(): void {
    Object.assign(this.style, {
      position: "fixed",
      width: isTouch ? "100px" : "50px",
      height: isTouch ? "100px" : "50px",
      transform: "translate(-50%, -50%) scale(0)",
      pointerEvents: "none",
      zIndex: "999",
      background: "rgba(var(--rgb-primary-color), 0.3)",
      borderRadius: "50%",
      transition: "transform 180ms ease-in-out",
    });

    ["touchcancel", "mouseout", "mouseup", "touchmove", "mousewheel", "wheel", "scroll"].forEach(
      (ev) => {
        document.addEventListener(
          ev,
          () => {
            this.cancelled = true;
            if (this.timer) {
              this._stopAnimation();
              clearTimeout(this.timer);
              this.timer = undefined;
            }
          },
          { passive: true }
        );
      }
    );
  }

  public bind(element: ActionHandlerElement, options: ActionHandlerOptions = {}): void {
    if (element.actionHandler && deepEqual(options, element.actionHandler.options)) {
      return;
    }

    if (element.actionHandler) {
      element.removeEventListener("touchstart", element.actionHandler.start!);
      element.removeEventListener("touchend", element.actionHandler.end!);
      element.removeEventListener("touchcancel", element.actionHandler.end!);
      element.removeEventListener("mousedown", element.actionHandler.start!);
      element.removeEventListener("click", element.actionHandler.end!);
      element.removeEventListener("keydown", element.actionHandler.handleKeyDown!);
    } else {
      element.addEventListener("contextmenu", (ev: Event) => {
        ev.preventDefault();
      });
    }

    element.actionHandler = { options };

    element.actionHandler.start = (ev: Event) => {
      this.cancelled = false;
      let x: number;
      let y: number;
      if ((ev as TouchEvent).touches) {
        x = (ev as TouchEvent).touches[0].clientX;
        y = (ev as TouchEvent).touches[0].clientY;
      } else {
        x = (ev as MouseEvent).clientX;
        y = (ev as MouseEvent).clientY;
      }

      if (options.hasHold) {
        this.held = false;
        this.timer = window.setTimeout(() => {
          this._startAnimation(x, y);
          this.held = true;
          fireEvent(element, "action", { action: "hold" });
        }, this.holdTime);
      }
    };

    element.actionHandler.end = (ev: Event) => {
      if (ev.type === "touchcancel" || (ev.type === "touchend" && this.cancelled)) {
        return;
      }

      const target = ev.target as HTMLElement;

      if (ev.cancelable) {
        ev.preventDefault();
      }
      if (options.hasHold) {
        clearTimeout(this.timer);
        this._stopAnimation();
        this.timer = undefined;
      }
      if (options.hasHold && this.held) {
        fireEvent(target, "action", { action: "hold" });
      } else if (options.hasDoubleClick) {
        if (
          (ev.type === "click" && (ev as MouseEvent).detail < 2) ||
          !this.dblClickTimeout ||
          this.dblClickTarget !== target
        ) {
          const timeoutId = window.setTimeout(() => {
            if (this.dblClickTimeout === timeoutId) {
              this.dblClickTimeout = undefined;
              this.dblClickTarget = undefined;
            }
            fireEvent(target, "action", { action: "tap" });
          }, DOUBLE_CLICK_TIME);
          this.dblClickTimeout = timeoutId;
          this.dblClickTarget = target;
        } else {
          clearTimeout(this.dblClickTimeout);
          this.dblClickTimeout = undefined;
          this.dblClickTarget = undefined;
          fireEvent(target, "action", { action: "double_tap" });
        }
      } else {
        fireEvent(target, "action", { action: "tap" });
      }
    };

    element.actionHandler.handleKeyDown = (ev: KeyboardEvent) => {
      if (!["Enter", " "].includes(ev.key)) {
        return;
      }
      (ev.currentTarget as ActionHandlerElement).actionHandler!.end!(ev);
    };

    element.addEventListener("touchstart", element.actionHandler.start, { passive: true });
    element.addEventListener("touchend", element.actionHandler.end);
    element.addEventListener("touchcancel", element.actionHandler.end);
    element.addEventListener("mousedown", element.actionHandler.start, { passive: true });
    element.addEventListener("click", element.actionHandler.end);
    element.addEventListener("keydown", element.actionHandler.handleKeyDown);
  }

  private _startAnimation(x: number, y: number): void {
    Object.assign(this.style, {
      left: `${x}px`,
      top: `${y}px`,
      transform: "translate(-50%, -50%) scale(1)",
    });
  }

  private _stopAnimation(): void {
    Object.assign(this.style, {
      left: "",
      top: "",
      transform: "translate(-50%, -50%) scale(0)",
    });
  }
}

defineOnce("matrix-helper-card-action-handler", ActionHandler);

const getActionHandler = (): ActionHandler => {
  const body = document.body;
  const existing = body.querySelector("matrix-helper-card-action-handler");
  if (existing) {
    return existing as ActionHandler;
  }

  const actionHandlerElement = document.createElement(
    "matrix-helper-card-action-handler"
  ) as ActionHandler;
  body.appendChild(actionHandlerElement);
  return actionHandlerElement;
};

export const actionHandlerBind = (
  element: ActionHandlerElement,
  options?: ActionHandlerOptions
): void => {
  getActionHandler().bind(element, options);
};

class ActionHandlerDirective extends Directive {
  constructor(partInfo: PartInfo) {
    super(partInfo);
  }

  render(_options?: ActionHandlerOptions) {
    return undefined;
  }

  update(part: ElementPart, [options]: [ActionHandlerOptions?]) {
    actionHandlerBind(part.element as ActionHandlerElement, options);
    return this.render();
  }
}

export const actionHandler = directive(ActionHandlerDirective);

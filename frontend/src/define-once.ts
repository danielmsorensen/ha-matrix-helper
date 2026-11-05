// The bundle can be loaded twice on one page -- e.g. while a user still has
// the old standalone card installed next to the copy this integration serves
// -- and a custom element name can only be defined once, so a second
// copy reuses the elements the first one defined instead of throwing.
export function defineOnce(name: string, constructor: CustomElementConstructor): void {
  if (!customElements.get(name)) {
    customElements.define(name, constructor);
  }
}

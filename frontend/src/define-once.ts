// The bundle can be loaded twice on one page -- e.g. if its resource was also
// added by hand -- and a custom element name can only be defined once, so a
// second copy reuses the elements the first one defined instead of throwing.
export function defineOnce(name: string, constructor: CustomElementConstructor): void {
  if (!customElements.get(name)) {
    customElements.define(name, constructor);
  }
}

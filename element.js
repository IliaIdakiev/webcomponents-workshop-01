(function () {
  const templateString = `<div>
    <slot name="header"></slot>
    <div id="element-value"></div>
    <button id="increment-btn">Increment</button>
    <slot name="footer"></slot>
  </div>`;
  const template = utils.createTemplate(templateString);

  class Element extends HTMLElement {

    get currentValue() {
      return +this.valueElement.innerHTML;
    }

    set currentValue(newValue) {
      this.valueElement.innerHTML = newValue;
    }

    constructor() {
      super();

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));


      this.valueElement = this.shadowRoot.getElementById('element-value');
      this.incrementBtnElement = this.shadowRoot.getElementById('increment-btn');

      this.currentValue = 0;

      this.incrementCounter = this.incrementCounter.bind(this);
    }

    incrementCounter() {
      this.currentValue++;
      this.dispatchEvent(new CustomEvent('value-incremented', {
        detail: {
          value: this.currentValue
        }
      }));
    }

    connectedCallback() {
      this.incrementBtnElement.addEventListener('click', this.incrementCounter);
    }

    disconnectedCallback() {
      this.incrementBtnElement.removeEventListener('click', this.incrementCounter);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name !== 'value') { return; }
      this.currentValue = +newValue;
    }

    static get observedAttributes() {
      return ['value'];
    }
  }

  customElements.define('hg-element', Element);
}());


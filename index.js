(function () {
  const templateString = `<div>
    <div id="element-value"></div>
    <button id="increment-btn">Increment</button>
  </div>`;
  const template = utils.createTemplate(templateString);

  class Element extends HTMLElement {
    constructor() {
      super();
      this.counter = 0;
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.valueElement = this.shadowRoot.getElementById('element-value');
      this.incrementBtnElement = this.shadowRoot.getElementById('increment-btn');

      this.valueElement.innerHTML = this.counter;
      this.incrementBtnElement.addEventListener('click', () => {
        this.valueElement.innerHTML = ++this.counter;
      });
    }
  }

  customElements.define('hg-element', Element);
}())

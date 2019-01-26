(function () {
  const templateString = `<div>
    <button id="reset-btn">Reset</button>
    <hg-element>
      <div id="test" slot="header">My Counter Title</div>
      <div id="footer" slot="footer">My Counter Footer</div>
    </hg-element>
  </div>`;

  const template = utils.createTemplate(templateString);

  class App extends HTMLElement {

    constructor() {
      super();
      this.counter = 0;
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      this.counterElement = this.shadowRoot.querySelector('hg-element');
      this.resetBtnElement = this.shadowRoot.getElementById('reset-btn');
      this.counterElement.setAttribute('value', this.counter);

      const test = this.shadowRoot.getElementById('test');
      test.addEventListener('click', function () {
        console.log(123);
      });

      this.resetBtnClickHandler = this.resetBtnClickHandler.bind(this);
      this.updateCounterValue = this.updateCounterValue.bind(this);
    }

    resetBtnClickHandler() {
      this.counterElement.setAttribute('value', 0);
    }

    updateCounterValue(event) {
      this.counter = event.detail.value;
      console.log(this.counter);
    }

    connectedCallback() {
      this.counterElement.addEventListener('value-incremented', this.updateCounterValue)
      this.resetBtnElement.addEventListener('click', this.resetBtnClickHandler);
    }

    disconnectedCallback() {
      this.counterElement.removeEventListener('value-incremented', this.updateCounterValue)
      this.resetBtnElement.removeEventListener('click', this.resetBtnClickHandler);
    }
  }

  customElements.define('hg-app', App);
}());
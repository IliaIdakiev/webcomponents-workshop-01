const utils = (function () {
  function createTemplate(content) {
    const template = document.createElement('template');
    template.innerHTML = content;
    return template;
  }

  return {
    createTemplate
  };
}());

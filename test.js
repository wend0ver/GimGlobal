var gimloader = (function (exports) {
  'use strict';

  var version = "0.2.5";

  var styles$1 = ":root {\n  --text: black;\n  --bg-primary: white;\n  --bg-secondary: white;\n}\n\n.gl-listWrap {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n.gl-listWrap .pluginList {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  align-content: start;\n  gap: 1rem;\n  padding: 1rem;\n  height: 100%;\n  background-color: var(--bg-primary);\n  border-radius: 10px;\n  color: var(--text);\n  flex: 1;\n  overflow-y: auto;\n  height: 100%;\n}\n.gl-listWrap .pluginList .empty {\n  width: 100%;\n  text-align: center;\n  font-size: 2rem;\n  font-weight: 600;\n  grid-column-end: span 2;\n  padding-top: 1rem;\n}\n.gl-listWrap .header {\n  display: flex;\n  width: 100%;\n  justify-content: start;\n  align-items: center;\n}\n.gl-listWrap button {\n  cursor: pointer;\n  width: 43px;\n  height: 43px;\n  border: none;\n  background-color: transparent;\n}\n.gl-listWrap svg {\n  fill: var(--text);\n}\n.gl-listWrap .plugin {\n  padding: 1rem;\n  height: 200px;\n  background-color: var(--bg-secondary);\n  border-radius: 6px;\n  display: flex;\n  flex-direction: column;\n  box-shadow: rgba(0, 0, 0, 0.05) 0px -1px 10px 0px, rgba(0, 0, 0, 0.1) 0px 1px 4px 0px, rgb(243, 236, 232) 0px 10px 30px 0px;\n}\n.gl-listWrap .plugin .info {\n  flex-grow: 1;\n}\n.gl-listWrap .plugin .top {\n  width: 100%;\n  display: flex;\n}\n.gl-listWrap .plugin .top input {\n  width: 30px;\n  height: 30px;\n}\n.gl-listWrap .plugin .name {\n  font-size: 1.5rem;\n  font-weight: 600;\n  flex-grow: 1;\n}\n.gl-listWrap .plugin .author {\n  font-size: 0.8rem;\n  font-weight: normal;\n}\n.gl-listWrap .plugin .description {\n  font-size: 1rem;\n}\n.gl-listWrap .plugin .buttons {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n}\n\n.gl-modalBG {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100vh;\n  z-index: 100;\n  background-color: rgba(0, 0, 0, 0.2);\n  backdrop-filter: blur(5px);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  animation: fadeIn 0.15s;\n}\n\n.codeCakeEditor {\n  border-radius: 0.2rem;\n}\n\n.gl-modal {\n  min-width: 25%;\n  min-height: 200px;\n  max-height: 80%;\n  max-width: 80%;\n  border-radius: 1rem;\n  padding: 1rem;\n  background-color: var(--bg-primary);\n  color: var(--text);\n  animation: zoomIn ease-out 0.15s;\n  display: flex;\n  flex-direction: column;\n}\n.gl-modal .title {\n  margin-bottom: 0.5rem;\n  font-size: 1rem;\n  font-weight: 600;\n}\n.gl-modal .content {\n  overflow-y: auto;\n  flex: 1;\n}\n.gl-modal > .buttons {\n  display: flex;\n  justify-content: flex-end;\n  gap: 1rem;\n  padding-top: 1rem;\n}\n.gl-modal > .buttons button {\n  padding: 0.5rem 1rem;\n  border: none;\n  border-radius: 0.5rem;\n  cursor: pointer;\n}\n.gl-modal > .buttons button.close {\n  background-color: transparent;\n  text-decoration: underline;\n}\n.gl-modal > .buttons button.primary {\n  background-color: #178635;\n  color: white;\n}\n.gl-modal > .buttons button.danger {\n  background-color: #ff4d4f;\n  color: white;\n}\n\n.gl-row {\n  display: flex;\n  gap: 8px;\n}\n\n* > .gl-wrench {\n  padding: 8px 12px;\n}\n\n.gl-wrench {\n  width: 20px;\n  height: 20px;\n}\n.gl-wrench svg {\n  fill: white;\n  width: 20px;\n  height: 20px;\n  transform: translate(-50%, -50%);\n}\n\n.gl-join {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.gl-join .openPlugins {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: none;\n  background-color: rgb(30, 7, 107);\n  height: 36px;\n  width: 40px;\n  border-radius: 4px;\n  cursor: pointer;\n}\n.gl-join .openPlugins:hover {\n  background-color: rgb(43, 10, 155);\n}\n.gl-join .openPlugins svg {\n  fill: white;\n}\n\n.gl-homeWrench {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.gl-homeWrench .icon {\n  width: 30px;\n  height: 30px;\n}\n.gl-homeWrench.light .text {\n  color: white;\n}\n.gl-homeWrench.light .text:hover {\n  color: white;\n}\n.gl-homeWrench.light svg {\n  fill: white;\n}\n.gl-homeWrench .text {\n  font-size: 18px;\n  color: rgb(22, 119, 255);\n  font-weight: bold;\n  cursor: pointer;\n}\n.gl-homeWrench .text:hover {\n  color: #69b1ff;\n}\n\ndiv:has(> * > * > .gl-hostWrench) {\n  margin-right: 8px;\n}\n\n.gl-hostWrench {\n  display: flex;\n}\n\n.gl-1dHostPluginBtn {\n  padding: 6px 14px;\n  background-color: rgb(131, 131, 131);\n  border-radius: 4px;\n  margin-right: 8px;\n  color: white;\n  transition: transform 0.23s ease 0s;\n  border: none;\n  font-weight: 900;\n  font-size: 24px;\n  box-shadow: rgba(0, 0, 0, 0.46) 0px 4px 33px -6px;\n}\n.gl-1dHostPluginBtn:hover {\n  transform: scale(1.04);\n}\n\n.gl-1dHostGameWrench {\n  width: 25px;\n  height: 25px;\n}\n.gl-1dHostGameWrench svg {\n  fill: white;\n  transform: translate(6px, -1px);\n}\n\n.gl-1dGameWrench {\n  width: 23px;\n  height: 23px;\n}\n.gl-1dGameWrench svg {\n  fill: white;\n}\n\n.gl-1dGameWrenchJoin {\n  width: 32px;\n  height: 32px;\n  margin-left: 8px;\n}\n.gl-1dGameWrenchJoin svg {\n  fill: white;\n}\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes zoomIn {\n  from {\n    transform: scale(0.3);\n  }\n  to {\n    transform: scale(1);\n  }\n}";

  var codeCakeStyles = "/* codecake global styles */\n.codecake {\n    display: flex;\n    font-family: \"Source Code Pro\", monospace;\n    letter-spacing: normal;\n    min-height: 0;\n    padding: 20px;\n    width: 100%;\n}\n.codecake-editor {\n    flex-grow: 1;\n    font-size: 14px;\n    font-weight: 400;\n    height: 100%;\n    line-height: 20px;\n    overflow: auto;\n    overflow-wrap: normal;\n    outline: none;\n    width: 100%;\n    white-space: pre; /* pre-wrap */\n    word-wrap: normal;\n}\n.codecake-gutters {\n    min-height: 0;\n    overflow: hidden;\n    position: relative;\n    width: 48px;\n}\n.codecake-lines {\n    bottom: 0px;\n    color: currentColor;\n    font-size: 12px;\n    line-height: 20px;\n    opacity: 0.5;\n    overflow: hidden;\n    padding-right: 16px;\n    position: absolute;\n    right: 0px;\n    text-align: right;\n    top: 0px;\n}\n.codecake-lines > div {\n    margin-bottom: 4px;\n    min-height: 16px;\n}\n.codecake-lines > div:not(:first-child) {\n    margin-top: 4px;\n}\n\n/* Terrible hack to hide last empty line in editor */\n.codecake-editor .line:last-child,\n.codecake-lines > div:last-child {\n    display: none !important;\n}\n\n/* Editor plugins */\n.codecake-linewrapping {\n    white-space: pre-wrap !important;\n}\n\n/* Editor scrollbar */\n.codecake-editor::-webkit-scrollbar {\n    width: 8px;\n    height: 8px;\n}\n.codecake-editor::-webkit-scrollbar-track {\n    background-color: transparent;\n}\n.codecake-editor::-webkit-scrollbar-thumb {\n    background-color: currentColor;\n    border-radius: 16px;\n}\n.codecake-editor::-webkit-scrollbar-button {\n    display: none;\n}\n.codecake-editor::-webkit-scrollbar-corner {\n    background-color: transparent;\n}\n\n/* codecake light theme */\n.codecake-light {\n    background-color: #fafafa;\n    color: #101623;\n}\n.codecake-light .codecake-editor::-webkit-scrollbar-thumb {\n    background-color: #dedfe3;\n}\n.codecake-light .codecake-editor::-webkit-scrollbar-thumb:hover {\n    background-color: #cbccd2;\n}\n.codecake-light .codecake-lines {\n    /* color: #6cb1c5; */\n    color: #878a98;\n}\n\n.codecake-light .token-operator, \n.codecake-light .token-number,\n.codecake-light .token-unit {\n    color: #e57697;\n}\n.codecake-light .token-punctuation, \n.codecake-light .token-property,\n.codecake-light .token-selector-pseudo,\n.codecake-light .token-selector-attr,\n.codecake-light .token-quote,\n.codecake-light .token-code {\n    color: #3a464e;\n}\n.codecake-light .token-keyword,\n.codecake-light .token-bullet {\n    color: #b351d9;\n}\n.codecake-light .token-constant {\n    color: #20118a;\n}\n.codecake-light .token-attribute,\n.codecake-light .token-tag,\n.codecake-light .token-title.function,\n.codecake-light .token-selector-tag,\n.codecake-light .token-section {\n    color: #3a9ff2;\n}\n.codecake-light .token-attr,\n.codecake-light .token-selector-class,\n.codecake-light .token-link {\n    color: #f38d00;\n}\n.codecake-light .token-string {\n    color: #00a17d;\n}\n.codecake-light .token-comment {\n    color: #969896;\n}\n\n/* codecake dark theme */\n.codecake-dark {\n    background-color: #272b3f;\n    color: #aab2d4;\n}\n.codecake-dark .codecake-editor::-webkit-scrollbar-thumb {\n    background-color: #99aaff15;\n}\n.codecake-dark .codecake-editor::-webkit-scrollbar-thumb:hover {\n    background-color: #99aaff22;\n}\n.codecake-dark .codecake-lines {\n    color: #757ca3;\n}\n\n.codecake-dark .token-attr,\n.codecake-dark .token-selector-tag {\n    color: #80d0ff;\n}\n.codecake-dark .token-comment,\n.codecake-dark .token-quote {\n    color: #58628d;\n}\n.codecake-dark .token-constant, \n.codecake-dark .token-number,\n.codecake-dark .token-bullet,\n.codecake-dark .token-link {\n    color: #ffae80;\n}\n.codecake-dark .token-title.function,\n.codecake-dark .token-section {\n    color: #22c1dd;\n} \n.codecake-dark .token-attribute,\n.codecake-dark .token-tag,\n.codecake-dark .token-code,\n.codecake-dark .token-strong {\n    color: #6e9af7;\n}\n.codecake-dark .token-keyword {\n    color: #af89f5;\n}\n.codecake-dark .token-operator,\n.codecake-dark .token-selector-attr {\n    color: #ad388c;\n}\n.codecake-dark .token-property,\n.codecake-dark .token-selector-class {\n    color: #bdc7f5;\n}\n.codecake-dark .token-selector-pseudo,\n.codecake-dark .token-punctuation,\n.codecake-dark .token-emphasis {\n    color: #8bb3f4;\n}\n.codecake-dark .token-string {\n    color: #9bcd65;\n}\n.codecake-dark .token-unit {\n    color: #dd556e;\n}\n\n/* MonoBlue theme */\n.codecake-monoblue {\n    background-color: #eef2f6;\n    color: #011e48;\n}\n.codecake-monoblue .token-keyword, \n.codecake-monoblue .token-tag,\n.codecake-monoblue .token-selector-tag, \n.codecake-monoblue .token-section {\n    font-weight: bold;\n}\n.codecake-monoblue .token-string,\n.codecake-monoblue .token-section {\n    color: #1086ce;\n}\n.codecake-monoblue .token-comment {\n    color: #8e9eaf;\n}\n.codecake-monoblue .token-code,\n.codecake-monoblue .token-quote,\n.codecake-monoblue .token-tag, \n.codecake-monoblue .token-attr,\n.codecake-monoblue .token-attribute,\n.codecake-monoblue .token-selector-class,\n.codecake-monoblue .token-punctuation {\n    color: #224d84;\n}\n.codecake-monoblue .token-bullet {\n    color: #8fc8f3;\n}\n\n/* One Light theme */\n/* Inspired in https://github.com/akamud/vscode-theme-onelight */\n.codecake-one-light {\n    background-color: #fafafa;\n    color: #393c46;\n}\n.codecake-one-light .token-keyword {\n    color: #a329a1;\n}\n.codecake-one-light .token-string,\n.codecake-one-light .token-attribute {\n    color: #54ac53;\n}\n.codecake-one-light .token-constant {\n    color: #0084bd;\n}\n.codecake-one-light .token-number,\n.codecake-one-light .token-unit,\n.codecake-one-light .token-selector-class,\n.codecake-one-light .token-selector-attr,\n.codecake-one-light .token-selector-pseudo,\n.codecake-one-light .token-attr {\n    color: #a37000;\n}\n.codecake-one-light .token-bullet,\n.codecake-one-light .token-title.function {\n    color: #4279f0;\n}\n.codecake-one-light .token-quote,\n.codecake-one-light .token-comment {\n    color: #a3a4a8;\n}\n.codecake-one-light .token-section,\n.codecake-one-light .token-tag,\n.codecake-one-light .token-selector-tag {\n    color: #e74a3c;\n}\n.codecake-one-light .token-builtin {\n    color: #bb8002;\n}\n\n/* One Dark theme */\n/* Inspired in https://github.com/akamud/vscode-theme-onedark */\n.codecake-one-dark {\n    background-color: #282c34;\n    color: #b6bdc8;\n}\n.codecake-one-dark .token-keyword {\n    color: #ca78e2;\n}\n.codecake-one-dark .token-string,\n.codecake-one-dark .token-attribute {\n    color: #93bd75;\n}\n.codecake-one-dark .token-bullet,\n.codecake-one-dark .token-title.function {\n    color: #62adea;\n}\n.codecake-one-dark .token-constant {\n    color: #5cb6c1;\n}\n.codecake-one-dark .token-quote,\n.codecake-one-dark .token-comment {\n    color: #5f6672;\n}\n.codecake-one-dark .token-number,\n.codecake-one-dark .token-unit,\n.codecake-one-dark .token-selector-class,\n.codecake-one-dark .token-selector-attr,\n.codecake-one-dark .token-selector-pseudo,\n.codecake-one-dark .token-attr {\n    color: #d19761;\n}\n.codecake-one-dark .token-section,\n.codecake-one-dark .token-tag,\n.codecake-one-dark .token-selector-tag {\n    color: #e4727b;\n}\n.codecake-one-dark .token-builtin {\n    color: #e4b867;\n}\n\n/* Common styles */\n.codecake-light .token-strong,\n.codecake-dark .token-strong,\n.codecake-monoblue .token-strong,\n.codecake-one-light .token-strong,\n.codecake-one-dark .token-strong {\n    font-weight: bold;\n}\n.codecake-light .token-emphasis,\n.codecake-dark .token-emphasis,\n.codecake-monoblue .token-emphasis,\n.codecake-one-light .token-emphasis,\n.codecake-one-dark .token-emphasis {\n    font-style: italic;\n}\n";

  // gotta have pretty console.logs
  function log(...args) {
      console.log('%c[GL]', 'color:#5030f2', ...args);
  }
  function getUnsafeWindow() {
      if (typeof unsafeWindow !== "undefined")
          return unsafeWindow;
      return window;
  }
  const useGM = typeof GM_getValue !== 'undefined';
  function setValue(key, value) {
      if (useGM) {
          GM_setValue(key, value);
      }
      else {
          localStorage.setItem(`gl-${key}`, value);
      }
  }
  function getValue(key, defaultValue) {
      if (useGM) {
          return GM_getValue(key, defaultValue);
      }
      else {
          return localStorage.getItem(`gl-${key}`) ?? defaultValue;
      }
  }

  var wrench = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M22.7,19L13.6,9.9C14.5,7.6 14,4.9 12.1,3C10.1,1 7.1,0.6 4.7,1.7L9,6L6,9L1.6,4.7C0.4,7.1 0.9,10.1 2.9,12.1C4.8,14 7.5,14.5 9.8,13.6L18.9,22.7C19.3,23.1 19.9,23.1 20.3,22.7L22.6,20.4C23.1,20 23.1,19.3 22.7,19Z\" /></svg>";

  function showModal(content, options) {
      let bgEl = document.createElement("div");
      bgEl.className = "gl-modalBG";
      let modalEl = document.createElement("div");
      modalEl.className = "gl-modal";
      if (options?.className)
          modalEl.classList.add(options.className);
      if (options?.style)
          modalEl.style.cssText = options.style;
      // create the title and content
      if (options?.title) {
          let title = document.createElement("div");
          title.textContent = options.title;
          title.className = "title";
          modalEl.appendChild(title);
      }
      let modalContent = document.createElement("div");
      modalContent.className = "content";
      modalEl.appendChild(modalContent);
      if (options?.buttons) {
          let buttons = document.createElement("div");
          buttons.className = "buttons";
          modalEl.appendChild(buttons);
          // create the buttons
          for (let button of options.buttons) {
              let buttonEl = document.createElement("button");
              buttonEl.textContent = button.text;
              buttonEl.classList.add(button.style ?? "primary");
              buttonEl.addEventListener("click", (e) => {
                  closeModal();
                  if (button.onClick)
                      button.onClick(e);
              });
              buttons.appendChild(buttonEl);
          }
      }
      // render the content
      if (content instanceof HTMLElement) {
          modalContent.appendChild(content);
      }
      else {
          GL.ReactDOM.createRoot(modalContent).render(content);
      }
      bgEl.appendChild(modalEl);
      // close the modal when the background is clicked
      modalEl.addEventListener("click", e => e.stopPropagation());
      if (options?.closeOnBackgroundClick)
          bgEl.onclick = closeModal;
      document.body.appendChild(bgEl);
      function closeModal() {
          bgEl.remove();
          if (options?.onClosed)
              options.onClosed();
      }
      return closeModal;
  }

  var plusBoxOutline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19,19V5H5V19H19M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5C3,3.89 3.9,3 5,3H19M11,7H13V11H17V13H13V17H11V13H7V11H11V7Z\" /></svg>";

  var pencilOutline = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z\" /></svg>";

  var importSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M14,12L10,8V11H2V13H10V16M20,18V6C20,4.89 19.1,4 18,4H6A2,2 0 0,0 4,6V9H6V6H18V18H6V15H4V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18Z\" /></svg>";

  var deleteSvg = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z\" /></svg>";

  class Plugin {
      script;
      enabled;
      headers;
      return;
      constructor(script, enabled = true, initial = false) {
          this.script = script;
          this.enabled = enabled;
          this.headers = parseHeader(script);
          // we are going to manually call enable on the first load
          if (enabled && !initial) {
              this.enable(initial);
          }
      }
      async enable(initial = false) {
          this.enabled = true;
          // create a blob from the script and import it
          let blob = new Blob([this.script], { type: 'application/javascript' });
          let url = URL.createObjectURL(blob);
          let returnVal = await import(url);
          this.return = returnVal;
          log(`Loaded plugin: ${this.headers.name}`);
          if (!initial) {
              if (this.headers.reloadRequired === 'true' || this.headers.reloadRequired === '') {
                  let reload = confirm(`${this.headers.name} requires a reload to function properly. Reload now?`);
                  if (reload) {
                      location.reload();
                  }
              }
          }
      }
      disable() {
          this.enabled = false;
          if (this.return) {
              this.return?.onStop?.();
          }
          this.return = null;
      }
  }
  let plugins = [];
  async function initPlugins() {
      let pluginScripts = JSON.parse(getValue('plugins', '[]'));
      for (let plugin of pluginScripts) {
          let pluginObj = new Plugin(plugin.script, plugin.enabled, true);
          plugins.push(pluginObj);
      }
      await Promise.all(plugins.map(p => p.enable(true)));
      log('Plugins loaded');
  }
  initPlugins();
  function savePlugins(newPlugins) {
      plugins = newPlugins;
      let pluginObjs = plugins.map(p => ({ script: p.script, enabled: p.enabled }));
      setValue('plugins', JSON.stringify(pluginObjs));
  }
  function parseHeader(code) {
      let headers = {
          name: "Unnamed Plugin",
          description: "No description provided",
          author: "Unknown Author",
          reloadRequired: "false"
      };
      // parse the JSDoc header at the start (if it exists)
      let closingIndex = code.indexOf('*/');
      if (!(code.trimStart().startsWith('/**')) || closingIndex === -1) {
          return headers;
      }
      let header = code.slice(0, closingIndex + 2);
      header = header.slice(3, -2).trim();
      let lines = header.split('\n');
      // remove the leading asterisks and trim the lines
      lines = lines.map(line => {
          let newLine = line.trimStart();
          if (newLine.startsWith('*')) {
              newLine = newLine.slice(1).trim();
          }
          return newLine;
      });
      let text = lines.join(' ');
      // go through and find all at symbols followed by non-whitespace
      // and that don't have a bracket before them if they are a link
      let validAtIndexes = [];
      let index = -1;
      while ((index = text.indexOf('@', index + 1)) !== -1) {
          if (text[index + 1] === ' ')
              continue;
          if (index != 0 && text[index - 1] === '{') {
              if (text.slice(index + 1, index + 5) === 'link') {
                  continue;
              }
          }
          validAtIndexes.push(index);
      }
      for (let i = 0; i < validAtIndexes.length; i++) {
          let chunk = text.slice(validAtIndexes[i] + 1, validAtIndexes[i + 1] || text.length);
          let key = chunk.slice(0, chunk.indexOf(' ') || chunk.length);
          let value = chunk.slice(key.length).trim();
          headers[key] = value;
      }
      return headers;
  }

  /*
   * CodeCake Editor
  */

  const insertText = text => {
      const sel = window.getSelection();
      const range = sel.getRangeAt(0);
      const textElement = document.createTextNode(text);
      range.insertNode(textElement);
      range.setStartAfter(textElement);
      sel.removeAllRanges();
      sel.addRange(range);
  };

  const getCodeBeforeOrAfter = (parent, dir) => {
      const {startContainer, startOffset, endContainer, endOffset} = window.getSelection().getRangeAt(0);
      const range = document.createRange();
      range.selectNodeContents(parent);
      dir === -1 ? range.setEnd(startContainer, startOffset) : range.setStart(endContainer, endOffset);
      return range.toString();
  };

  const debounce = fn => {
      let timer = null;
      return wait => {
          clearTimeout(timer);
          wait === 1 ? fn() : (timer = window.setTimeout(fn, wait)); 
      };
  };

  const getTextNodeAtPosition = (root, index) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, el => {
          if (index > el.textContent.length){
              index = index - el.textContent.length;
              return NodeFilter.FILTER_REJECT
          }
          return NodeFilter.FILTER_ACCEPT;
      });
      return {
          node: walker.nextNode() || root,
          position: index,
      };
  };

  const getEditorTemplate = () => {
      const templateContent = [
          `<div class="codecake">`,
          `    <div class="codecake-gutters" style="display:none;">`,
          `        <div class="codecake-gutter codecake-lines" style="display:none;"></div>`,
          `    </div>`,
          `    <div class="codecake-editor" spellcheck="false" autocorrect="off"></div>`, 
          `</div>`,
      ];
      const templateElement = document.createElement("template");
      templateElement.innerHTML = templateContent.join("").trim();
      return templateElement.content.firstChild;
  };

  // Create a new instance of the code editor
  const create = (parent, options = {}) => {
      let prevCode = "";
      let focus = false;
      let escKeyPressed = false;
      const listeners = {}; // Store events listeners
      const tab = options?.indentWithTabs ? "\t" : " ".repeat(options.tabSize || 4);
      const endl = String.fromCharCode(10);
      const autoIndent = options?.autoIndent ?? true;
      const addClosing = options?.addClosing ?? true;
      const openChars = `[({"'`, closeChars = `])}"'`;
      const hlg = options?.highlight ?? ((c, l) => highlight(c, l));
      parent.appendChild(getEditorTemplate());
      const editor = parent.querySelector(".codecake-editor");
      const lines = parent.querySelector(".codecake-lines");
      !options?.readOnly && editor.setAttribute("contenteditable", "plaintext-only");
      (options?.className || "").split(" ").filter(c => !!c).forEach(c => parent.querySelector(".codecake").classList.add(c));
      options?.lineNumbers && (parent.querySelector(".codecake-gutters").style.display = "");
      options?.lineNumbers && (lines.style.display = "");
      // 'plaintext-only' mode is not supported in Firefox
      if (!options?.readOnly && editor.contentEditable !== "plaintext-only") {
          editor.setAttribute("contenteditable", "true");
          editor.addEventListener("paste", event => {
              const insertText = event.clipboardData.getData("text/plain");
              event.preventDefault();
              // insert text at cursor position
              const sel = window.getSelection();
              const range = sel.getRangeAt(0);
              range.deleteContents();
              range.insertNode(document.createTextNode(insertText));
              update(10);
          });
      }
      if (options?.lineWrap) {
          editor.classList.add("codecake-linewrapping");
      }
      // Manage code
      const setCode = (newCode, wait) => {
          editor.textContent = newCode;
          prevCode = editor.textContent || "";
          update(wait ?? 50);
      };
      const getCode = () => editor.textContent || "";
      const getCodeBefore = () => getCodeBeforeOrAfter(editor, -1);
      const getCodeAfter = () => getCodeBeforeOrAfter(editor, +1);
      // Position managers
      const savePosition = () => {
          const range = window.getSelection().getRangeAt(0);
          range.setStart(editor, 0);
          return range.toString().length;
      };
      const restorePosition = index => {
          const selection = window.getSelection();
          const pos = getTextNodeAtPosition(editor, index);
          selection.removeAllRanges();
          const range = new Range();
          range.setStart(pos.node, pos.position);
          selection.addRange(range);
      };
      // Debounce code update
      const update = debounce(() => {
          const position = focus && savePosition();
          let currentCode = getCode();
          if (!currentCode.endsWith(endl)) {
              currentCode = currentCode + endl;
              editor.textContent = currentCode;
          }
          const newText = typeof hlg === "function" ? hlg(currentCode, options.language || "") : currentCode;
          editor.innerHTML = `<span class="line">` + newText.split("\n").join(`</span>\n<span class="line">`) + `</span>`;
          if (options?.lineNumbers) {
              const linesC = Array.from(editor.querySelectorAll(`span.line`)).map((line, index) => {
                  return `<div style="height:${line.getBoundingClientRect().height}px;">${index + 1}</div>`;
              });
              lines.innerHTML = linesC.join("");
          }
          (typeof listeners["change"] === "function") && listeners["change"](currentCode);
          focus && restorePosition(position);
      });
      // Register editor events listeners
      editor.addEventListener("keydown", event => {
          (typeof listeners["keydown"] === "function") && (listeners["keydown"](event));
          if (!event.defaultPrevented && !options?.readOnly) {
              prevCode = getCode();
              // Handle inserting new line
              if (event.key === "Enter" && autoIndent) {
                  event.preventDefault();
                  const lines = getCodeBefore().split(endl);
                  const extraLine = /^[)}\]]/.test(getCodeAfter());
                  const pos = savePosition();
                  const lastLine = lines[lines.length - 1];
                  const lastIndentation = (/^([\s]*)/.exec(lastLine))?.[0] || "";
                  const lastChar = lastLine.trim().slice(-1);
                  const indentation = lastIndentation + (/[\[\{]/.test(lastChar) ? tab : "");
                  setCode(prevCode.substring(0, pos) + endl + indentation + (extraLine ? (endl + lastIndentation) : "") + prevCode.substring(pos, prevCode.length), 1);
                  restorePosition(pos + 1 + indentation.length);
              }
              // Handle backspace
              else if (event.key === "Backspace" || (event.key === "Tab" && !escKeyPressed && event.shiftKey)) {
                  if (window.getSelection().type === "Caret") {
                      let removeChars = 0;
                      const pos = savePosition();
                      const lines = prevCode.slice(0, pos).split(endl);
                      const line = lines[lines.length - 1] || ""; 
                      if (line !== "" && line.trim() === "") {
                          event.preventDefault();
                          removeChars = (line.length % tab.length === 0) ? tab.length : line.length % tab.length;
                          setCode(prevCode.substring(0, pos - removeChars) + prevCode.substring(pos, prevCode.length), 1);
                      }
                      restorePosition(pos - removeChars);
                  }
              }
              // Handle insert tab
              else if (event.key === "Tab" && !escKeyPressed && !event.shiftKey) {
                  event.preventDefault();
                  insertText(tab);
              }
              // Skip closing char
              else if (addClosing && closeChars.includes(event.key) && getCodeAfter().charAt(0) === event.key) {
                  event.preventDefault();
                  restorePosition(savePosition() + 1);
              }
              // Handle closing chars
              else if (addClosing && openChars.includes(event.key)) {
                  event.preventDefault();
                  const [start, end] = [getCodeBefore().length, getCodeAfter().length];
                  const pos = savePosition();
                  const wrapText = (prevCode.length - start - end > 0) ? prevCode.substring(start, prevCode.length - end) : "";
                  setCode(prevCode.substring(0, pos - wrapText.length) + event.key + wrapText + closeChars[openChars.indexOf(event.key)] + prevCode.substring(pos, prevCode.length), 1);
                  restorePosition(pos + 1);
              }
              // Save if escape key has been pressed to avoid trapping keyboard focus
              escKeyPressed = event.key === "Escape";
          }
      });
      editor.addEventListener("keyup", event => {
          (typeof listeners["keyup"] === "function") && (listeners["keyup"](event));
          if (!event.defaultPrevented && !options?.readOnly && prevCode !== getCode()) {
              return update(250);
          }
      });
      editor.addEventListener("focus", () => focus = true);
      editor.addEventListener("blur", () => focus = false);
      editor.addEventListener("scroll", () => lines.style.top = `-${editor.scrollTop}px`);
      editor.addEventListener("paste", () => update(10));
      // Initialize editor values
      options?.code ? setCode(options?.code) : update(1);
      return {
          getCode: () => getCode(),
          setCode: code => setCode(code || "", 1),
          onChange: listener => (listeners["change"] = listener),
          onKeyDown: listener => (listeners["keydown"] = listener),
          onKeyUp: listener => (listeners["keyup"] = listener),
      };
  };


  /*
   * CodeCake Syntax highlight
  */

  const escape = text => {
      return text.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
  };

  const jsKeywords = [
      "as", "async", "await", "break", "case", "catch", "class", "const", "continue", "constructor", "debugger", "default",
      "delete", "do", "else", "export", "extends", "finally", "for", "from", "function", "if", "implements", "import",
      "in", "instanceof", "let", "new", "of", "return", "static", "super", "switch", "symbol", "this", "throw",
      "try", "typeof", "undefined", "var", "void", "while", "with", "yield",
  ];

  const cssConstants = [
      "absolute", "relative", "fixed", "sticky", "bold", "normal", "auto", "none", "solid", "dashed",
      "sans-serif", "sans", "serif", "monospace", "red", "white", "black", "blue", "yellow", "green", "orange", "gray",
  ];

  // Languajes definition
  const languages = {
      html: {
          aliases: [],
          rules: [
              {
                  starts: /^<!--/,
                  ends: /-->/,
                  rules: [
                      {regex: /^(.+)/, token: "comment"},
                  ],
              },
              {
                  regex: /^(<([\w]+)(?![^>]*\/>)[^>]*>)/,
                  rules: [
                      {
                          regex: /^(<[\w]+)/,
                          rules: [
                              {regex: /^(<)/, token: "punctuation"},
                              {regex: /^([\w]+)/, token: "tag"},
                          ],
                      },
                      {
                          regex: /^([\w\.\-\_]+="[^"]+")/,
                          rules: [
                              {regex: /^([\w\.\-\_]+)/, token: "attr"},
                              {regex: /^(=)/, token: "punctuation"},
                              {regex: /^(".*?")/, token: "string"},
                          ],
                      },
                      {regex: /^(>)/, token: "punctuation"},
                  ],
              },
              {
                  regex: /^(<\/[\w]+>)/,
                  rules: [
                      {regex: /^([<\/>])/, token: "punctuation"},
                      {regex: /^([\w]+)/, token: "tag"},
                  ],
              },
          ],
      },
      javascript: {
          aliases: ["js", "jsx"],
          rules: [
              {regex: /^(\/\/.*)/, token: "comment"},
              {
                  starts: /^\/\*/,
                  ends: /\*\//,
                  rules: [
                      {regex: /^(.+)/, token: "comment"},
                  ],
              },
              {regex: /^(\'.*?\')|^(\".*?\")/, token: "string"},
              {
                  regex: /^(\`[^\`]*?\`)/,
                  rules: [
                      {regex: /^(.+)/, token: "string"},
                  ],
              },
              {regex: new RegExp(`^\\b(${jsKeywords.join("|")})\\b`), token: "keyword"},
              {regex: /^\b(true|false|null)\b/, token: "constant"},
              {regex: /^([+-]?([0-9]*[.])?[0-9]+)\b/, token: "number"},
              {regex: /^([{}[\](\):;\\.,])/, token: "punctuation"},
              {
                  regex: /^(<(?:=>|[^>])+(?:\/)?>)/,
                  rules: [
                      {
                          regex: /^(<\/?[\w]+)/,
                          rules: [
                              {regex: /^(<)/, token: "punctuation"},
                              {regex: /^([\w]+)/, token: "tag"},
                          ],
                      },
                      {
                          regex: /^([\w\.\-\_]+=(?:"[^"]*"|\{[^\}]*}))/,
                          rules: [
                              {regex: /^([\w\.\-\_]+)/, token: "attr"},
                              {regex: /^(=)/, token: "punctuation"},
                              {regex: /^("(?:.)*?"|\{(?:.)*?})/, token: "string"},
                          ],
                      },
                      {regex: /^(>)/, token: "punctuation"},
                  ],
              },
              {regex: /^([?!&@~\/\-+*%=<>|])/, token: "operator"},
              {
                  regex: /^([a-zA-Z][\w]*\s*\()/,
                  rules: [
                      {regex: /^([^\(]+)/, token: "title function"},
                      {regex: /^(\()/, token: "punctuation"},
                  ],
              },
              {regex: /^([\w]+)/, token: "word"},
          ],
      },
      css: {
          aliases: [],
          rules: [
              {
                  starts: /^\/\*/,
                  ends: /\*\//,
                  rules: [
                      {regex: /^(.+)/, token: "comment"},
                  ],
              },
              {regex: /^([{},;])/, token: "punctuation"},
              {regex: /^(@(font-face|import|keyframes))/, token: "keyword"},
              {
                  regex: /^([a-z\-]+\s*:\s*[^;\n]+);/,
                  rules: [
                      {
                          regex: /^([a-z\-]+\s*:)/,
                          rules: [
                              {regex: /^([a-z\-]+)/, token: "attribute"},
                              {regex: /^(:)/, token: "punctuation"},
                          ],
                      },
                      {regex: /^(#[\da-f]{3,8})/, token: "constant"},
                      {regex: /^([+-]?([0-9]*[.])?[0-9]+)/, token: "number"},
                      {regex: /^(\'(?:.)*?\')|^(\"(?:.)*?\")/, token: "string"},
                      {regex: new RegExp(`^\\b(${cssConstants.join("|")})\\b`), token: "constant"},
                      {regex: /^\b(cm|mm|in|px|pt|pc|em|rem|vw|vh)\b/, token: "unit"},
                  ],
              },
              {regex: /^(::?[a-z]+)/, token: "selector-pseudo"},
              {regex: /^(\[[^\]]+\])/, token: "selector-attr"},
              {regex: /^(\.[\w\-\_]+)/, token: "selector-class"},
              {regex: /^(\#[\w\-\_]+)/, token: "selector-id"},
              {regex: /^(body|html|a|div|table|td|tr|th|input|button|textarea|label|form|svg|g|path|rect|circle|ul|li|ol)\b/, token: "selector-tag"},
              {regex: /^(\'(?:.)*?\')|^(\"(?:.)*?\")/, token: "string"},
          ],
      },
      markdown: {
          aliases: ["md"],
          rules: [
              {regex: /^(#{1,6}[^\n]+)/, token: "section"},
              {regex: /^(\`{3}[^\`{3}]+\`{3})/, token: "code"},
              {regex: /^(\`[^\`\n]+\`)/, token: "code"},
              {regex: /^ *([\*\-+:]|\d+\.) /, token: "bullet"},
              {regex: /^(\*{2}[^\*\n]+\*{2})/, token: "strong"},
              {regex: /^(\*[^\*\n]+\*)/, token: "emphasis"},
              {
                  regex: /^(!?\[[^\]\n]*]\([^\)\n]+\))/,
                  rules: [
                      {
                          regex: /^(\[.+\])/,
                          rules: [
                              {regex: /^([^\[\]]+)/, token: "string"},
                          ],
                      },
                      {
                          regex: /^(\(.+\))/,
                          rules: [
                              {regex: /^([^\(\)]+)/, token: "link"},
                          ],
                      }
                  ],
              },
              {regex: /^(\> [^\n]+)/, token: "quote"},
          ],
      },
  };

  const getRule = (rules, str) => {
      return rules.find(rule => {
          if (rule.starts) {
              return rule.starts.test(str) && rule.ends.test(str);
          }
          return rule.regex.test(str);
      });
  };

  const getMatch = (rule, str) => {
      if (rule.starts) {
          const match = rule.ends.exec(str);
          return str.substring(0, match.index + match[0].length);
      }
      return rule.regex.exec(str)[0];
  };

  const _highlight = (code, rules) => {
      let text = "", i = 0;
      while (i < code.length) {
          const subCode = code.substring(i);
          const rule = getRule(rules, subCode);
          if (rule) {
              const match = getMatch(rule, subCode);
              if (match.length > 0) {
                  text = text + (rule.rules ? _highlight(match, rule.rules) : `<span class="token-${rule.token}">${escape(match)}</span>`);
                  i = i + match.length;
                  continue;
              }
          }
          text = text + escape(code[i]);
          i = i + 1;
      }
      return text;
  };

  const highlight = (code, language = "javascript") => {
      return _highlight(code, languages[language]?.rules || []);
  };

  function showCodeEditor(plugins, setPlugins, plugin) {
      let editorDiv = document.createElement("div");
      editorDiv.addEventListener("keydown", (e) => e.stopPropagation());
      let editor = create(editorDiv, {
          language: "javascript",
          highlight: highlight,
          className: "codecake-dark codeCakeEditor",
          lineNumbers: true
      });
      editor.setCode(plugin.script);
      showModal(editorDiv, {
          title: "Edit Plugin Code",
          style: "width: 50%",
          buttons: [
              {
                  text: "cancel",
                  style: "close"
              }, {
                  text: "save",
                  style: "primary",
                  onClick() {
                      plugin.disable();
                      plugin.script = editor.getCode();
                      plugin.enable();
                      let newPlugins = [...plugins];
                      savePlugins(newPlugins);
                      setPlugins(newPlugins);
                  }
              }
          ]
      });
  }
  // can't be bothered with the type
  function createPlugin(plugins, setPlugins) {
      let editorDiv = document.createElement("div");
      editorDiv.addEventListener("keydown", (e) => e.stopPropagation());
      let editor = create(editorDiv, {
          language: "javascript",
          highlight: highlight,
          className: "codecake-dark codeCakeEditor",
          lineNumbers: true
      });
      const defaultCode = `/**
* @name New Plugin
* @description A new plugin
* @author Your Name Here
*/`;
      editor.setCode(defaultCode);
      showModal(editorDiv, {
          title: "Create New Plugin",
          style: "width: 50%",
          buttons: [
              {
                  text: "cancel",
                  style: "close"
              }, {
                  text: "save",
                  style: "primary",
                  onClick() {
                      let newPlugins = [...plugins, new Plugin(editor.getCode())];
                      setPlugins(newPlugins);
                      savePlugins(newPlugins);
                  }
              }
          ]
      });
  }

  function PluginManager() {
      const React = GL.React;
      const [plugins$1, setPlugins] = React.useState(plugins);
      const filePickerInput = React.useRef(null);
      function importFile() {
          filePickerInput.current?.click();
          filePickerInput.current?.addEventListener("change", async () => {
              let file = filePickerInput.current?.files?.[0];
              if (!file)
                  return;
              // read the file
              let reader = new FileReader();
              reader.addEventListener("load", () => {
                  let code = reader.result;
                  // @ts-ignore compiler option is set but vscode can't tell
                  code = code.replaceAll("\r\n", "\n");
                  let plugin = new Plugin(code);
                  let newPlugins = [...plugins$1, plugin];
                  setPlugins(newPlugins);
                  savePlugins(newPlugins);
              });
              reader.readAsText(file);
          });
      }
      function deletePlugin(plugin) {
          let confirm = window.confirm(`Are you sure you want to delete ${plugin.headers.name}?`);
          if (!confirm)
              return;
          let newPlugins = plugins$1.filter(p => p !== plugin);
          setPlugins(newPlugins);
          savePlugins(newPlugins);
      }
      return (React.createElement("div", { className: "gl-listWrap" },
          React.createElement("div", { className: "header" },
              React.createElement("button", { dangerouslySetInnerHTML: { __html: importSvg }, onClick: importFile }),
              React.createElement("input", { type: "file", style: { display: "none" }, accept: ".js", ref: filePickerInput }),
              React.createElement("button", { dangerouslySetInnerHTML: { __html: plusBoxOutline }, onClick: () => createPlugin(plugins$1, setPlugins) })),
          React.createElement("div", { className: "pluginList" },
              plugins$1.map((plugin, index) => {
                  return (React.createElement("div", { key: index, className: "plugin" },
                      React.createElement("div", { className: "info" },
                          React.createElement("div", { className: "top" },
                              React.createElement("div", { className: "name" }, plugin.headers.name),
                              React.createElement("input", { type: "checkbox", checked: plugin.enabled, onInput: e => {
                                      if (!e.currentTarget.checked) {
                                          plugin.enable();
                                      }
                                      else {
                                          plugin.disable();
                                      }
                                      // this re-renders all the plugins (bad) but I don't care
                                      let newPlugins = [...plugins$1];
                                      setPlugins(newPlugins);
                                      savePlugins(newPlugins);
                                  } })),
                          React.createElement("div", { className: "author" },
                              "by ",
                              plugin.headers.author),
                          React.createElement("div", { className: "description" }, plugin.headers.description)),
                      React.createElement("div", { className: "buttons" },
                          React.createElement("button", { dangerouslySetInnerHTML: { __html: pencilOutline }, onClick: () => showCodeEditor(plugins$1, setPlugins, plugin) }),
                          React.createElement("button", { dangerouslySetInnerHTML: { __html: deleteSvg }, onClick: () => deletePlugin(plugin) }))));
              }),
              plugins$1.length === 0 ?
                  React.createElement("div", { className: "empty" }, "No plugins! Create or import one to get started.")
                  : null)));
  }

  let modalOpen = false;
  function openPluginManager() {
      if (modalOpen)
          return;
      modalOpen = true;
      showModal(GL.React.createElement(PluginManager), {
          title: 'Manage Plugins',
          style: "width: 50%; height: 80%",
          closeOnBackgroundClick: true,
          buttons: [
              {
                  text: "close",
                  style: "primary"
              }
          ],
          onClosed: () => modalOpen = false
      });
  }
  function addPluginButtons(loader) {
      // add a hotkey shift+p to open the plugin manager
      loader.hotkeys.add(new Set(['alt', 'p']), openPluginManager);
      // add the button to the creative screen and the host screen
      loader.parcel.interceptRequire(null, exports => exports?.default?.toString?.().includes('.disable?"none":"all"'), exports => {
          loader.patcher.after(null, exports, "default", (_, __, res) => {
              if (res?.props?.className?.includes?.('light-shadow flex between')) {
                  let nativeType = res.props.children[1].type.type;
                  res.props.children[1].type.type = function () {
                      let res = nativeType.apply(this, arguments);
                      // make sure we haven't already added the button
                      if (res.props.children.some((c) => c?.props?.tooltip === 'Plugins'))
                          return res;
                      let btnType = res.props.children[0].type;
                      res.props.children.splice(0, 0, loader.React.createElement(btnType, {
                          tooltip: 'Plugins',
                          children: loader.React.createElement('div', {
                              className: 'gl-wrench',
                              dangerouslySetInnerHTML: { __html: wrench }
                          }),
                          onClick: openPluginManager
                      }));
                      return res;
                  };
              }
              if (res?.props?.children?.props?.tooltip === 'Options') {
                  res.props.className = 'gl-row';
                  let newBtn = res.props.children.type({
                      tooltip: 'Plugins',
                      children: loader.React.createElement('div', {
                          className: 'gl-wrench',
                          dangerouslySetInnerHTML: { __html: wrench }
                      }),
                      onClick: openPluginManager
                  });
                  res.props.children = [res.props.children, newBtn];
              }
              return res;
          });
      }, true);
      // add the wrench button to the join screen
      loader.parcel.interceptRequire(null, exports => exports?.default?.toString?.().includes('type:"secondary"'), exports => {
          loader.patcher.after(null, exports, 'default', (_, __, res) => {
              let newButton = loader.React.createElement('button', {
                  className: 'openPlugins',
                  dangerouslySetInnerHTML: { __html: wrench },
                  onClick: openPluginManager
              });
              return loader.React.createElement('div', { className: 'gl-join' }, [res, newButton]);
          });
      }, true);
      // add the button to the home screen
      loader.parcel.interceptRequire(null, exports => exports?.SpaceContext, exports => {
          loader.patcher.before(null, exports, 'default', (_, args) => {
              let light = location.href.includes("/creative");
              if (args[0].children?.some?.((c) => c?.key === 'creative')) {
                  let icon = loader.React.createElement('div', {
                      className: 'icon',
                      dangerouslySetInnerHTML: { __html: wrench }
                  });
                  let text = loader.React.createElement('div', {
                      className: "text"
                  }, "Plugins");
                  let newEl = loader.React.createElement('div', {
                      className: `gl-homeWrench ${light ? 'light' : ''}`,
                      onClick: openPluginManager
                  }, [icon, text]);
                  args[0].children.splice(0, 0, newEl);
              }
          });
      }, true);
      // add the button to the host screen before the game starts
      loader.parcel.interceptRequire(null, 
      // the } is there for a reason
      exports => exports?.default?.toString?.().includes('customHorizontalPadding}'), exports => {
          let nativeDefault = exports.default;
          loader.patcher.after(null, exports, 'default', (_, __, res) => {
              let btnContents = loader.React.createElement('div', {
                  className: "gl-hostWrench"
              }, [
                  loader.React.createElement('div', {
                      className: 'gl-wrench',
                      dangerouslySetInnerHTML: { __html: wrench }
                  }),
                  loader.React.createElement('div', {}, "Plugins")
              ]);
              let newBtn = nativeDefault.apply(this, [{
                      children: btnContents,
                      onClick: openPluginManager,
                      customColor: "#01579b",
                      className: 'gl-hostWrenchBtn'
                  }]);
              let name = res?.props?.children?.props?.children?.[2]?.props?.children?.props?.children?.[1];
              if (name === 'Rewards') {
                  res.props.children = [newBtn, res.props.children];
              }
              return res;
          });
      }, true);
      // add the button to 1d host screens
      loader.parcel.interceptRequire(null, exports => exports?.default?.displayName?.includes?.('inject-with-gameOptions-gameValues-players-kit-ui'), exports => {
          loader.patcher.after(null, exports.default, 'render', (_, __, res) => {
              let nativeType = res.type;
              delete res.type;
              res.type = function () {
                  let res = new nativeType(...arguments);
                  let nativeRender = res.render;
                  delete res.render;
                  res.render = function () {
                      let res = nativeRender.apply(this, arguments);
                      let newBtn = loader.React.createElement('button', {
                          className: 'gl-1dHostPluginBtn',
                          onClick: openPluginManager
                      }, 'Plugins');
                      res.props.children = [newBtn, res.props.children];
                      return res;
                  };
                  return res;
              };
              return res;
          });
      }, true);
      // add the button to the 1d host screen while in-game
      // we need to do this to intercept the stupid mobx wrapper which is a massive pain
      loader.parcel.interceptRequire(null, exports => exports?.__decorate, exports => {
          loader.patcher.before(null, exports, '__decorate', (_, args) => {
              if (args[1]?.toString?.()?.includes("Toggle Music")) {
                  let nativeRender = args[1].prototype.render;
                  args[1].prototype.render = function () {
                      let res = nativeRender.apply(this, args);
                      let children = res.props.children[2].props.children.props.children;
                      let newEl = loader.React.createElement(children[1].type, {
                          icon: loader.React.createElement('div', {
                              className: 'gl-1dHostGameWrench',
                              dangerouslySetInnerHTML: { __html: wrench }
                          }),
                          onClick: openPluginManager,
                          tooltipMessage: "Plugins"
                      });
                      children.splice(0, 0, newEl);
                      return res;
                  };
              }
          });
      }, true);
      // add the button to the 1d game screen
      loader.parcel.interceptRequire(null, exports => exports?.observer &&
          exports.Provider, exports => {
          // let nativeObserver = exports.observer;
          // delete exports.observer;
          // exports.observer = function() {
          loader.patcher.before(null, exports, 'observer', (_, args) => {
              if (args[0]?.toString?.().includes('"aria-label":"Menu"')) {
                  let nativeArgs = args[0];
                  args[0] = function () {
                      let res = nativeArgs.apply(this, arguments);
                      // for when we're still on the join screen
                      if (res?.props?.children?.props?.children?.props?.src === '/client/img/svgLogoWhite.svg') {
                          let props = res.props.children.props;
                          props.children = [props.children, loader.React.createElement('div', {
                                  className: 'gl-1dGameWrenchJoin',
                                  style: { cursor: 'pointer' },
                                  dangerouslySetInnerHTML: { __html: wrench },
                                  onClick: openPluginManager
                              })];
                          return res;
                      }
                      let children = res?.props?.children?.[0]?.props?.children?.props?.children;
                      if (!children)
                          return res;
                      let newEl = loader.React.createElement(children[1].type, {
                          onClick: openPluginManager,
                      }, loader.React.createElement('div', {
                          className: 'gl-1dGameWrench',
                          dangerouslySetInnerHTML: { __html: wrench }
                      }));
                      children.splice(3, 0, newEl);
                      return res;
                  };
              }
          });
      }, true);
  }

  /*
      This method of intercepting modules was inspired by https://codeberg.org/gimhook/gimhook
  */
  class Parcel extends EventTarget {
      _parcelModuleCache = {};
      _parcelModules = {};
      reqIntercepts = [];
      readyToIntercept = true;
      // regIntercepts: { match: string | RegExp, callback: (exports: any) => any }[] = [];
      constructor() {
          super();
          this.setup();
          this.reloadExistingScript();
      }
      interceptRequire(id, match, callback, once = false) {
          if (!match || !callback)
              throw new Error('match and callback are required');
          let intercept = { match, callback, once };
          if (id)
              intercept.id = id;
          this.reqIntercepts.push(intercept);
          // return a cancel function
          return () => {
              let index = this.reqIntercepts.indexOf(intercept);
              if (index !== -1)
                  this.reqIntercepts.splice(index, 1);
          };
      }
      stopIntercepts(id) {
          this.reqIntercepts = this.reqIntercepts.filter(intercept => intercept.id !== id);
      }
      // interceptRegister(match: string | RegExp, callback: (exports: any) => any) {
      //     this.regIntercepts.push({ match, callback });
      // }
      async reloadExistingScript() {
          let existingScripts = document.querySelectorAll('script[src*="index"]:not([nomodule])');
          if (existingScripts.length > 0)
              this.readyToIntercept = false;
          else
              return;
          await new Promise(res => window.addEventListener('load', res));
          // nuke the dom
          document.querySelector("#root")?.remove();
          let newRoot = document.createElement('div');
          newRoot.id = 'root';
          document.body.appendChild(newRoot);
          this.readyToIntercept = true;
          this._parcelModuleCache = {};
          this._parcelModules = {};
          for (let existingScript of existingScripts) {
              // re-import the script since it's already loaded
              log(existingScript, 'has already loaded, re-importing...');
              let res = await fetch(existingScript.src);
              let text = await res.text();
              // nasty hack to prevent the browser from caching other scripts (might be useful later)
              // let index: number = 0;
              // while((index = text.indexOf('import(', index)) !== -1) {
              //     let nesting = 1;
              //     index += 7;
              //     // this assumes that the parenthesis are balanced
              //     while(nesting !== 0) {
              //         index++;
              //         if(text[index] === '(') nesting++;
              //         if(text[index] === ')') nesting--;
              //     }
              //     text = text.slice(0, index) + `+'?t='+Date.now()` + text.slice(index);
              // }
              let script = document.createElement('script');
              script.textContent = text;
              script.type = "module";
              document.head.appendChild(script);
              existingScript.remove();
          }
      }
      setup() {
          let requireHook;
          let nativeParcelRequire = getUnsafeWindow()["parcelRequire388b"];
          ((requireHook = (moduleName) => {
              if (moduleName in this._parcelModuleCache) {
                  return this._parcelModuleCache[moduleName].exports;
              }
              if (moduleName in this._parcelModules) {
                  let moduleCallback = this._parcelModules[moduleName];
                  delete this._parcelModules[moduleName];
                  let moduleObject = {
                      id: moduleName,
                      exports: {}
                  };
                  this._parcelModuleCache[moduleName] = moduleObject;
                  moduleCallback.call(moduleObject.exports, moduleObject, moduleObject.exports);
                  // run intercepts
                  if (this.readyToIntercept) {
                      for (let intercept of this.reqIntercepts) {
                          if (intercept.match(moduleObject.exports)) {
                              let returned = intercept.callback?.(moduleObject.exports);
                              if (returned)
                                  moduleObject.exports = returned;
                              if (intercept.once) {
                                  this.reqIntercepts.splice(this.reqIntercepts.indexOf(intercept), 1);
                              }
                          }
                      }
                  }
                  return moduleObject.exports;
              }
              if (nativeParcelRequire) {
                  return nativeParcelRequire(moduleName);
              }
              throw new Error(`Cannot find module '${moduleName}'`);
          }
          // @ts-ignore
          ).register = (moduleName, moduleCallback) => {
              this._parcelModules[moduleName] = moduleCallback;
              nativeParcelRequire?.register(moduleName, moduleCallback);
          });
          Object.defineProperty(getUnsafeWindow(), "parcelRequire388b", {
              value: requireHook,
              writable: false,
              enumerable: true,
              configurable: false
          });
      }
  }

  class Net {
      blueboat;
      colyseus;
      type = 'Unknown';
      get active() {
          if (this.type == 'Unknown')
              return null;
          return this.type == 'Blueboat' ? this.blueboat : this.colyseus;
      }
      constructor(loader) {
          this.blueboat = new BlueboatIntercept(loader, this);
          this.colyseus = new ColyseusIntercept(loader, this);
      }
  }
  class BlueboatIntercept extends EventTarget {
      room = null;
      blueboatLoaded = false;
      constructor(loader, net) {
          super();
          let me = this;
          loader.parcel.interceptRequire(null, exports => exports?.default?.toString?.().includes("this.socketListener()"), exports => {
              let nativeRoom = exports.default;
              return function () {
                  let room = new nativeRoom(...arguments);
                  me.room = room;
                  net.type = 'Blueboat';
                  log('Blueboat room intercepted');
                  let nativeCall = room.onMessage.call;
                  room.onMessage.call = function (channel, data) {
                      me.dispatchEvent(new CustomEvent(channel, { detail: data }));
                      me.dispatchEvent(new CustomEvent('*', { detail: { channel, data } }));
                      if (!me.blueboatLoaded) {
                          me.blueboatLoaded = true;
                          loader.dispatchEvent(new CustomEvent('loadEnd'));
                          log("Blueboat game finished loading");
                      }
                      return nativeCall.apply(this, arguments);
                  };
                  return room;
              };
          });
      }
      send(channel, message) {
          if (!this.room)
              return;
          this.room.send(channel, message);
      }
  }
  class ColyseusIntercept extends EventTarget {
      room = null;
      colyseusLoaded = false;
      constructor(loader, net) {
          super();
          let me = this;
          // somewhat taken from https://codeberg.org/gimhook/gimhook/src/branch/master/modloader/src/game.ts
          loader.parcel.interceptRequire(null, exports => exports?.OnJoinedRoom, exports => {
              let nativeOnJoined = exports.OnJoinedRoom;
              delete exports.OnJoinedRoom;
              net.type = 'Colyseus';
              log('Colyseus room intercepted');
              exports.OnJoinedRoom = function (colyseus) {
                  me.room = colyseus.room;
                  let nativeDispatchMsg = colyseus.room.dispatchMessage;
                  delete colyseus.room.dispatchMessage;
                  // intercept colyseus.room.dispatchMessage
                  colyseus.room.dispatchMessage = function (channel, message) {
                      if (!me.colyseusLoaded) {
                          me.colyseusLoaded = true;
                          loader.dispatchEvent(new CustomEvent('loadEnd'));
                          log("Colyseus game finished loading");
                      }
                      me.dispatchEvent(new CustomEvent(channel, { detail: message }));
                      me.dispatchEvent(new CustomEvent('*', { detail: { channel, message } }));
                      nativeDispatchMsg.apply(this, arguments);
                  };
                  return nativeOnJoined.apply(this, [colyseus]);
              };
              return exports;
          });
      }
      send(channel, message) {
          if (!this.room)
              return;
          this.room.send(channel, message);
      }
  }

  class HotkeyManager {
      hotkeys = new Map();
      pressedKeys = new Set();
      constructor() {
          window.addEventListener('keydown', (event) => {
              this.pressedKeys.add(event.key.toLowerCase());
              this.checkHotkeys(event);
          });
          window.addEventListener('keyup', (event) => {
              this.pressedKeys.delete(event.key.toLowerCase());
          });
      }
      checkHotkeys(event) {
          for (let [hotkey, run] of this.hotkeys.entries()) {
              if (this.pressedKeys.size < hotkey.size)
                  continue;
              let match = true;
              for (let key of hotkey) {
                  if (!this.pressedKeys.has(key)) {
                      match = false;
                      break;
                  }
              }
              if (match) {
                  if (run.preventDefault)
                      event.preventDefault();
                  run.callback(event);
              }
          }
      }
      add(hotkey, callback, preventDefault = true) {
          this.hotkeys.set(hotkey, { callback, preventDefault });
      }
      remove(hotkey) {
          this.hotkeys.delete(hotkey);
      }
  }

  let styles = new Map();
  async function addStyles(id, styleString) {
      let style = document.createElement('style');
      style.innerHTML = styleString;
      // wait for document to be ready
      if (!document.head)
          await new Promise(res => document.addEventListener('DOMContentLoaded', res, { once: true }));
      document.head.appendChild(style);
      // add to map
      if (!styles.has(id))
          styles.set(id, []);
      styles.get(id)?.push(style);
  }
  function removeStyles(id) {
      if (!styles.has(id))
          return;
      for (let style of styles.get(id)) {
          style.remove();
      }
      styles.delete(id);
  }

  // this patcher implementation is based on the one used by BetterDiscord
  class Patcher {
      patches = new Map();
      unpatchers = new Map();
      applyPatches(object, property) {
          const properties = this.patches.get(object);
          if (!properties)
              return;
          const patches = properties.get(property);
          if (!patches)
              return;
          delete object[property];
          // reset the property to its original value
          object[property] = patches.original;
          // apply all patches
          for (const patch of patches.patches) {
              let original = object[property];
              switch (patch.point) {
                  case 'before':
                      object[property] = function () {
                          patch.callback(this, arguments);
                          return original.apply(this, arguments);
                      };
                      break;
                  case 'after':
                      object[property] = function () {
                          let returnValue = original.apply(this, arguments);
                          let newReturn = patch.callback(this, arguments, returnValue);
                          if (newReturn)
                              return newReturn;
                          return returnValue;
                      };
                      break;
                  case 'instead':
                      object[property] = function () {
                          return patch.callback(this, arguments);
                      };
                      break;
              }
          }
      }
      addPatch(object, property, patch) {
          if (!this.patches.has(object)) {
              this.patches.set(object, new Map([[property, { original: object[property], patches: [] }]]));
          }
          const properties = this.patches.get(object);
          if (!properties)
              return;
          if (!properties.has(property)) {
              properties.set(property, { original: object[property], patches: [] });
          }
          const patches = properties.get(property);
          if (!patches)
              return;
          patches.patches.push(patch);
          // apply patches to the object
          this.applyPatches(object, property);
      }
      getRemovePatch(id, object, property, patch) {
          let unpatch = () => {
              if (id) {
                  // remove the patch from the id's list of unpatchers
                  const unpatchers = this.unpatchers.get(id);
                  if (unpatchers) {
                      const index = unpatchers.indexOf(unpatch);
                      if (index !== -1) {
                          unpatchers.splice(index, 1);
                      }
                  }
              }
              // remove the patch from the patches map
              if (!this.patches.has(object))
                  return;
              const properties = this.patches.get(object);
              if (!properties)
                  return;
              if (!properties.has(property))
                  return;
              const patches = properties.get(property);
              if (!patches)
                  return;
              const index = patches.patches.indexOf(patch);
              if (index === -1)
                  return;
              patches.patches.splice(index, 1);
              // apply patches to the object
              this.applyPatches(object, property);
              // if the list of patches is empty, remove the property from the map
              if (patches.patches.length === 0) {
                  properties.delete(property);
              }
              // if the map of properties is empty, remove the object from the map
              if (properties.size === 0) {
                  this.patches.delete(object);
              }
          };
          if (id) {
              if (!this.unpatchers.has(id)) {
                  this.unpatchers.set(id, [unpatch]);
              }
              else {
                  this.unpatchers.get(id)?.push(unpatch);
              }
          }
          return unpatch;
      }
      after(id, object, property, callback) {
          let patch = { callback, point: 'after' };
          this.addPatch(object, property, patch);
          let remove = this.getRemovePatch(id, object, property, patch);
          return remove;
      }
      before(id, object, property, callback) {
          let patch = { callback, point: 'before' };
          this.addPatch(object, property, patch);
          let remove = this.getRemovePatch(id, object, property, patch);
          return remove;
      }
      instead(id, object, property, callback) {
          let patch = { callback, point: 'instead' };
          this.addPatch(object, property, patch);
          let remove = this.getRemovePatch(id, object, property, patch);
          return remove;
      }
      unpatchAll(id) {
          const unpatchers = this.unpatchers.get(id);
          if (!unpatchers)
              return;
          for (const unpatcher of unpatchers) {
              unpatcher();
          }
      }
  }

  class GimkitLoader extends EventTarget {
      version = version;
      React;
      ReactDOM;
      notification;
      modules = {};
      stores;
      platformerPhysics;
      parcel = new Parcel();
      net = new Net(this);
      hotkeys = new HotkeyManager();
      patcher = new Patcher();
      UI = {
          showModal,
          addStyles,
          removeStyles
      };
      constructor() {
          super();
          log('GimkitLoader v' + this.version + ' loaded');
          this.injectSheetsAndScripts();
          this.getReact();
          this.exposeValues();
          addPluginButtons(this);
      }
      injectSheetsAndScripts() {
          let sheet = new CSSStyleSheet();
          sheet.replace(styles$1);
          let codeCakeSheet = new CSSStyleSheet();
          codeCakeSheet.replace(codeCakeStyles);
          document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet, codeCakeSheet];
      }
      exposeValues() {
          // window.stores
          this.parcel.interceptRequire(null, exports => exports?.default?.characters, exports => {
              this.stores = exports.default;
              window.stores = exports.default;
              getUnsafeWindow().stores = exports.default;
          });
          // window.platformerPhysics
          this.parcel.interceptRequire(null, exports => exports?.CharacterPhysicsConsts, exports => {
              this.platformerPhysics = exports.CharacterPhysicsConsts;
              window.platformerPhysics = exports.CharacterPhysicsConsts;
              getUnsafeWindow().platformerPhysics = exports.CharacterPhysicsConsts;
          });
      }
      getReact() {
          this.parcel.interceptRequire(null, exports => exports?.useState, exports => {
              if (this.React)
                  return;
              this.React = exports;
          });
          this.parcel.interceptRequire(null, exports => exports?.createRoot, exports => {
              if (this.ReactDOM)
                  return;
              this.ReactDOM = exports;
          });
          this.parcel.interceptRequire(null, exports => exports?.default?.useNotification, exports => {
              this.notification = exports.default;
          });
      }
  }
  let loader = new GimkitLoader();
  window.GL = loader;
  getUnsafeWindow().GL = loader;

  exports.GimkitLoader = GimkitLoader;

  return exports;

})({});

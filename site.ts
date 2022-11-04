
const style = `
.explorer, .button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: black;
  font-weight: normal;
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  text-align: left;
  z-index: 999999;
}
.button {
  width: 64px;
  height: 64px;
  border-radius: 100%;
  text-align: center;
  line-height: 60px;
  font-size: 32px;
  border: none;
  cursor: pointer;
}
.explorer {
  display: none;
  flex-direction: column;
  background: white;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  padding-top: 5px;
  width: 300px;
  box-shadow: -6px 0 16px -8px rgb(0 0 0 / 8%), -9px 0 28px 0 rgb(0 0 0 / 5%), -12px 0 48px 16px rgb(0 0 0 / 3%);
}
.explorer-main {
  color: #2d2d2d;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "Roboto", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  margin-bottom: 10px;
  background: white;
  color: black;
  border: none;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
}
.explorer-cancel, .explorer-link {
  box-sizing: border-box;
  margin: 0;
  font-family: inherit;
  overflow: visible;
  text-transform: none;
  line-height: 1.5715;
  position: relative;
  display: inline-block;
  font-weight: 400;
  white-space: nowrap;
  text-align: center;
  border: 1px solid transparent;
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.015);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  user-select: none;
  touch-action: manipulation;
  height: 32px;
  padding: 4px 15px;
  font-size: 14px;
  border-radius: 4px;
  color: #2d2d2d;
  border-color: rgba(0, 0, 0, 0.15);
  background: #fff;
  outline: 0;
  text-decoration: none;
}
.explorer-cancel:hover, .explorer-link:hover {
  filter: brightness(0.8);
}
.bottom-section {
  border-top: 1px solid #f0f0f0;
  padding: 10px 16px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
`

export function inject({ config, posthog }) {

  // Create shadow root
  const shadow = createShadow(style)

  // Find the article for the current URL
  const currentUrl = window.location.href
  const article = config.articles.find((article) => article.url === currentUrl)

  // If the article doesn't exist, return
  if (!article || !article.cta || !article.content) {
    return
  }

  // Open explorer with button
  function openExplorer(): void {
    Object.assign(buttonElement.style, { display: 'none' })
    Object.assign(explorerElement.style, { display: 'flex' })

    const closeButton = shadow.querySelector('.explorer-cancel')
    closeButton.addEventListener('click', (e) => {
        e.preventDefault()
        Object.assign(explorerElement.style, { display: 'none' })
    })
  }

  // Create button element
  const buttonElement = Object.assign(document.createElement('button'), {
    className: 'button',
    innerText: '❓',
    onclick: openExplorer,
  })
  shadow.appendChild(buttonElement)

  // Main explorer element HTML
  const explorer = `
    <div class="explorer-main"></div>
    <div class='bottom-section'>
      <div class='buttons'>
      <a class='explorer-link' type='button' target=_blank'>
        Learn more
      </a>
      <a class='explorer-cancel' type='button'>Close</a>
      </div>
    </div>
  `

  // Create explorer element
  const explorerElement = Object.assign(document.createElement('div'), {
    className: 'explorer',
    innerHTML: explorer,
  })

  // Select elements in main explorer element
  const explorerText = explorerElement.getElementsByClassName('explorer-main')[0] as HTMLElement;
  const explorerLink = explorerElement.getElementsByClassName('explorer-link')[0] as HTMLElement;

  // Modify elements in main explorer element
  explorerText.innerText = article.cta
  explorerLink.setAttribute('href', article.content)

  shadow.appendChild(explorerElement)
}

function createShadow(style?: string): ShadowRoot {
  const div = document.createElement('div')
  const shadow = div.attachShadow({ mode: 'open' })
  if (style) {
    const styleElement = Object.assign(document.createElement('style'), {
      innerText: style,
    })
    shadow.appendChild(styleElement)
  }
  document.body.appendChild(div)
  return shadow
}
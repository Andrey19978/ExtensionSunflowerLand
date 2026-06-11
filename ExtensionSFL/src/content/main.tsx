import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './views/App.tsx'

console.log('[CRXJS] Hello world from content script!')

// content-script.js

// --- Шаг А: Объявляем функцию (назвали "doClick") ---
function doClick() {
    console.log('Выполняю клик!');
    const element = document.querySelector("#game-board > div.absolute.w-full.h-full.z-10 > div > div.absolute.left-1\\/2.top-1\\/2.-translate-x-1\\/2.-translate-y-1\\/2 > div > div:nth-child(147) > div > div > div");
    
    if (element) {
        (element as HTMLElement).click();
        console.log('Клик выполнен успешно!');
    } else {
        console.log('Элемент не найден!');
    }
}

// --- Шаг Б: Ждем команду "голоса" ---
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.command === 'клик') {   // если голос сказал "клик"
        doClick();                       // вызываем нашу функцию
        sendResponse({ status: 'клик выполнен' });
    }

return true
  });

const container = document.createElement('div')
container.id = 'crxjs-app'
document.body.appendChild(container)
createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

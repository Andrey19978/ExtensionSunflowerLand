import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './views/App.tsx'

console.log('Расшерение подключенно')

// content-script.js
let timer: any = null;
// --- Шаг А: Объявляем функцию (назвали "doClick") ---
function doClick() {
    function innerCollect() {
        chrome.storage.local.get("abort", (result) => {
            if (result.abort) return;

            const elements = [];
            for (let i = 1; i <= 215; i++) {
                const selector = `#game-board > div.absolute.w-full.h-full.z-10 > div > div.absolute.left-1\\/2.top-1\\/2.-translate-x-1\\/2.-translate-y-1\\/2 > div > div:nth-child(${i}) > div > div > div`;
                elements.push(document.querySelector(selector));
            }

            elements.forEach((element) => {
                if (element) {
                    for (let i = 0; i < 3; i++) {
                        element.click();
                    }
                }
            });

            if (!result.abort) {
                timer = setTimeout(innerCollect, 5000);
            }
        });
    }

    innerCollect()
}


// --- Шаг Б: Ждем команду "голоса" ---
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.command === 'клик') {   // если голос сказал "клик"
        doClick();                      // вызываем нашу функцию
        sendResponse({ status: 'клик выполнен' });
    }

    return true
});

function stopSle() {
    clearTimeout(timer);
    timer = null;
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.command === 'stop') {   // если голос сказал "клик"
        stopSle()        // вызываем нашу функцию
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
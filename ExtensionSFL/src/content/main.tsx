// content-script.js
let timer: any = null;
let isRunning = false;
let abortFlag = false;

function doClick() {
  if (isRunning) {
    console.log('Цикл уже запущен');
    return;
  }
  
  isRunning = true;
  abortFlag = false;
  
  function harvestLoop() {
    if (abortFlag) {
      console.log('Цикл остановлен');
      isRunning = false;
      return;
    }
    
    const elements = document.querySelectorAll('img[src*="stump"]');
    console.log('Найдено элементов:', elements.length);
    
    if (elements.length > 0) {
      console.log("Ждем кд");
      timer = setTimeout(harvestLoop, 5000);
    } else {
      // Собираем деревья
      const trees = document.querySelectorAll<HTMLImageElement>('img[src*="tree"]');
      if (trees.length === 0) {
        console.log('Деревья не найдены на странице');
      } else {
        console.log(`Найдено деревьев: ${trees.length}`);
        trees.forEach(tree => tree.click());
        console.log("Все деревья собраны");
      }
      
      if (!abortFlag) {
        timer = setTimeout(harvestLoop, 5000);
      } else {
        isRunning = false;
      }
    }
  }
  
  harvestLoop();
}

function stopButt() {
  console.log('Остановка цикла');
  abortFlag = true;
  clearTimeout(timer);
  timer = null;
  isRunning = false;
}

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.command === 'start') {
    doClick();
    sendResponse({ status: 'цикл запущен' });
  } else if (request.command === 'stop') {
    stopButt();
    sendResponse({ status: 'цикл остановлен' });
  }
  return true;
});
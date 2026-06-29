let isActive = true;

export default function StoneHarvest() {
    // Сбрасываем флаг при новом запуске
    isActive = true;
    
    function tryClick() {
        // Проверяем флаг остановки
        if (!isActive) {
            console.log('Сбор камней остановлен');
            return;
        }

        const stoneElements = document.querySelectorAll<HTMLImageElement>('img[src*="resources/stone"]');
        
        if (stoneElements.length) {
            const firstStone = stoneElements[0];
            let parent = firstStone.closest('div.absolute.w-full.h-full.pointer-events-none');
            if (!parent) {
                parent = firstStone.closest('div');
            }
            
            const text = parent?.textContent || '';
            const hasTimer = /[\d]+мин\s*[\d]*сек|[\d]+мин|[\d]+сек/.test(text);
            
            if (hasTimer) {
                console.log(`Есть таймер восстановления: ${text.match(/[\d]+мин\s*[\d]*сек/)?.[0] || 'найден'}, ждём...`);
                setTimeout(tryClick, 5000);
                return;
            }
            
            console.log(`Кликаем по ${stoneElements.length} камням!`);
            stoneElements.forEach(stone => stone.click());
            
        } else {
            console.log('Камни не найдены');
            setTimeout(tryClick, 1000);
        }
    }

    tryClick();
}

// Функция для остановки
export function stopStoneHarvest() {
    isActive = false;
    console.log('StoneHarvest остановлен');
}
// 1. 設定隨機圖片路徑 (請確認您的資料夾名稱是 images 還是 image)
const fortuneImages = [
    'images/img1.png',
    'images/img2.png',
    'images/img3.png'
];

// 2. 取得 HTML 元素
const drawBtn = document.getElementById('draw-btn');
const resetBtn = document.getElementById('reset-btn');
const resultCard = document.getElementById('result-card');
const stickContainer = document.getElementById('stick-animation');
const chickenAvatarImg = document.getElementById('chicken-avatar-img');
const bgm = document.getElementById('bgm');
const musicToggle = document.getElementById('music-toggle');

// 顯示結果的元素
const stickTitle = document.getElementById('stick-title');
const stickLuck = document.getElementById('stick-luck');
const stickImage = document.getElementById('stick-image');
const stickPoem = document.getElementById('stick-poem');
const stickOldMeaning = document.getElementById('stick-old-meaning');
const stickSummary = document.getElementById('stick-summary');

// 音樂自動播放（需要用戶互動才能真正播放）
let isMusicPlaying = false;
document.addEventListener('click', () => {
    if (!isMusicPlaying) {
        bgm.play().then(() => {
            isMusicPlaying = true;
            musicToggle.innerText = '🔊';
        }).catch(err => console.log('自動播放被阻擋，需要用戶互動'));
    }
}, { once: true });

// 音樂控制按鈕
musicToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // 防止觸發上面的自動播放
    if (bgm.paused) {
        bgm.play();
        musicToggle.innerText = '🔊';
        isMusicPlaying = true;
    } else {
        bgm.pause();
        musicToggle.innerText = '🔇';
        isMusicPlaying = false;
    }
});

// 3. 點擊「開始求籤」
drawBtn.addEventListener('click', () => {
    // 確保音樂播放
    if (bgm.paused) {
        bgm.play().then(() => {
            musicToggle.innerText = '🔊';
            isMusicPlaying = true;
        }).catch(err => console.log('音樂播放失敗:', err));
    }
    
    // 動畫開始
    stickContainer.classList.add('shaking');
    drawBtn.disabled = true;
    drawBtn.innerText = "誠心祈求中...";
    
    setTimeout(() => {
        stickContainer.classList.remove('shaking');
        
        // --- 核心邏輯 ---

        // A. 從 data.js 的 allFortunes 陣列中隨機選一支
        // (allFortunes 變數是從 data.js 讀進來的)
        const randomIndex = Math.floor(Math.random() * allFortunes.length);
        const fortune = allFortunes[randomIndex];

        // B. 隨機選一張圖片作為雞大師頭像
        const randomImageIndex = Math.floor(Math.random() * fortuneImages.length);
        
        // --- 更新畫面 (對應您的 JSON 欄位) ---
        
        // 1. 籤號 (格式：第 1 籤)
        stickTitle.innerText = `第 ${fortune["籤號"]} 籤`;
        
        // 2. 籤等 (格式：上籤)
        stickLuck.innerText = fortune["籤等"];
        
        // 3. 詩曰 (因為 JSON 裡是陣列，我們取第一個版本，或是用 join 接起來)
        // 這裡我設定為：如果有兩個版本，就顯示第一個
        if (Array.isArray(fortune["詩曰"])) {
            stickPoem.innerText = fortune["詩曰"][0]; 
        } else {
            stickPoem.innerText = fortune["詩曰"];
        }

        // 4. 解曰
        stickOldMeaning.innerText = `【解曰】${fortune["解曰"]}`;

        // 5. 雞大師總結
        stickSummary.innerText = fortune["總結"];

        // 6. 雞大師頭像（隨機）
        chickenAvatarImg.src = fortuneImages[randomImageIndex];

        // 顯示結果
        drawBtn.style.display = 'none';
        resultCard.classList.remove('hidden');
        drawBtn.innerText = "開始求籤";
        drawBtn.disabled = false;

    }, 1500); // 1.5秒後顯示
});

// 4. 重置
resetBtn.addEventListener('click', () => {
    resultCard.classList.add('hidden');
    drawBtn.style.display = 'inline-block';
    chickenAvatarImg.src = "images/img1.png"; // 重置為預設圖片
    window.scrollTo(0, 0); // 回到頂部
});
(function () {
  let isSelecting = false, startX, startY, endX, endY, overlay, selectionBox;

  function isContextValid() {
    try {
      return !!(chrome && chrome.runtime && chrome.runtime.id);
    } catch (e) {
      return false;
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'T' || e.key === 't' || e.key === 'R' || e.key === 'r')) {
      e.preventDefault();
      startSnipping();
    }
  });

  function startSnipping() {
    if (!isContextValid()) {
      notify.notifyAction("Extension context was reloaded.\nPlease refresh (F5) the webpage to continue!", 'warning', 3e3);
      return;
    }
    if (document.getElementById('snip-overlay')) return;

    overlay = document.createElement('div');
    overlay.id = 'snip-overlay';
    overlay.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(15, 23, 42, 0.4); backdrop-filter: blur(2px);
      z-index: 2147483647; cursor: crosshair; user-select: none;
    `;

    selectionBox = document.createElement('div');
    selectionBox.style.cssText = `
      position: absolute; border: 2px dashed #4f46e5;
      background: rgba(79, 70, 229, 0.15); border-radius: 4px; display: none;
    `;
    overlay.appendChild(selectionBox);
    document.body.appendChild(overlay);

    overlay.addEventListener('mousedown', onMouseDown);
    overlay.addEventListener('mousemove', onMouseMove);
    overlay.addEventListener('mouseup', onMouseUp);
  }

  function onMouseDown(e) {
    isSelecting = true;
    startX = e.clientX; startY = e.clientY;
    Object.assign(selectionBox.style, {
      left: `${startX}px`, top: `${startY}px`, width: '0px', height: '0px', display: 'block'
    });
  }

  function onMouseMove(e) {
    if (!isSelecting) return;
    endX = e.clientX; endY = e.clientY;
    let width = Math.abs(endX - startX), height = Math.abs(endY - startY);
    let left = Math.min(startX, endX), top = Math.min(startY, endY);
    Object.assign(selectionBox.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
  }

  async function onMouseUp(e) {
    if (!isSelecting) return;
    isSelecting = false;
    let rect = {
      x: Math.min(startX, e.clientX), y: Math.min(startY, e.clientY),
      width: Math.abs(e.clientX - startX), height: Math.abs(e.clientY - startY),
      dpr: window.devicePixelRatio || 1
    };
    overlay?.remove();
    if (rect.width > 10 && rect.height > 10) captureAndCrop(rect);
  }

  function generateBackgroundStyle(ts) {
    if (ts.bgType === 'image' && ts.bgImageUrl) return `url("${ts.bgImageUrl}") center/cover no-repeat`;
    if (ts.bgType === 'gradient') return `linear-gradient(${ts.gradAngle || 135}deg, ${ts.gradStart || '#e0c3fc'}, ${ts.gradEnd || '#8ec5fc'})`;
    let hex = ts.bgColor || '#ffffff', alpha = ts.bgAlpha ?? 0.95;
    let r = parseInt(hex.slice(1, 3), 16) || 255, g = parseInt(hex.slice(3, 5), 16) || 255, b = parseInt(hex.slice(5, 7), 16) || 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  try {
    if (chrome?.storage?.onChanged) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (isContextValid() && area === 'local') updateActiveToastStyle();
      });
    }
  } catch (e) { }

  function updateActiveToastStyle() {
    if (!isContextValid()) return;
    let toast = document.getElementById('trans-floating-toast');
    if (!toast) return;

    chrome.storage.local.get(['targetLang', 'showFrom', 'toastStyle'], async (config) => {
      const ts = config.toastStyle || {};
      toast.style.background = generateBackgroundStyle(ts);
      if (ts.textColor) toast.style.color = ts.textColor;
      if (ts.borderColor) {
        toast.style.borderColor = ts.borderColor;
        let title = toast.querySelector('#toast-drag-header strong');
        if (title) title.style.color = ts.borderColor;
      }
      if (ts.radius !== undefined) toast.style.borderRadius = ts.radius + 'px';
      if (ts.fontSize) {
        toast.style.fontSize = ts.fontSize + 'px';
        toast.querySelectorAll('textarea').forEach(ta => ta.style.fontSize = ts.fontSize + 'px');
      }
      if (ts.fontFamily) {
        toast.style.fontFamily = ts.fontFamily;
        toast.querySelectorAll('textarea').forEach(ta => ta.style.fontFamily = ts.fontFamily);
      }

      let fromBox = toast.querySelector('#toast-from-container');
      if (fromBox) fromBox.style.display = (config.showFrom === false) ? 'none' : 'flex';

      let langSelect = toast.querySelector('#toast-lang-select');
      if (langSelect && config.targetLang && langSelect.value !== config.targetLang) {
        langSelect.value = config.targetLang;
        let fromTa = toast.querySelector('#toast-from-text'), toTa = toast.querySelector('#toast-to-text');
        if (fromTa?.value && toTa) {
          toTa.value = "Translating...";
          toTa.value = await translateInPage(fromTa.value, config.targetLang);
        }
      }
    });
  }

  function showFloatingToast(x, y, width, height, config) {
    let oldToast = document.getElementById('trans-floating-toast');
    if (oldToast) oldToast.remove();

    let toast = document.createElement('div');
    toast.id = 'trans-floating-toast';

    let posX = Math.max(10, Math.min(x, window.innerWidth - 350));
    let posY = (y + height + 250 > window.innerHeight) ? Math.max(10, y - 240) : y + height + 10;

    const ts = config.toastStyle || {};
    const bgStyle = generateBackgroundStyle(ts);
    const border = ts.borderColor || '#4f46e5';

    toast.style.cssText = `
      position: fixed; left: ${posX}px; top: ${posY}px; width: 340px; min-width: 260px;
      background: ${bgStyle}; color: ${ts.textColor || '#0f172a'};
      border: 1.5px solid ${border}; border-radius: ${ts.radius ?? 10}px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2); padding: 12px;
      z-index: 2147483647; font-family: ${ts.fontFamily || 'sans-serif'}; font-size: ${ts.fontSize || 13}px;
      display: flex; flex-direction: column; gap: 8px; resize: both; overflow: auto;
    `;

    toast.innerHTML = `
      <div id="toast-drag-header" style="display:flex; justify-content:space-between; align-items:center; cursor:move; user-select:none; border-bottom:1px solid rgba(0,0,0,0.08); padding-bottom:6px;">
        <strong style="color:${border}; font-size:12px; display:flex; align-items:center; gap:4px;">🌐 Translator Pro</strong>
        <div style="display:flex; align-items:center; gap:8px; margin-left:auto;">
          <select id="toast-lang-select" style="font-size:11px; padding:2px 6px; border-radius:6px; border:1px solid #ccc; background:#fff;">
            <option value="vi" ${config.targetLang === 'vi' ? 'selected' : ''}>Vietnamese</option>
            <option value="en" ${config.targetLang === 'en' ? 'selected' : ''}>English</option>
            <option value="zh-CN" ${config.targetLang === 'zh-CN' ? 'selected' : ''}>Chinese</option>
            <option value="ja" ${config.targetLang === 'ja' ? 'selected' : ''}>Japanese</option>
            <option value="ko" ${config.targetLang === 'ko' ? 'selected' : ''}>Korean</option>
          </select>
          <span id="close-trans-toast" style="cursor:pointer; font-size:16px; font-weight:bold; color:#94a3b8;">&times;</span>
        </div>
      </div>
      <div id="toast-status" style="color:#64748b; font-size:12px;">Scanning text & translating...</div>
      <div id="toast-result" style="display:none; flex-direction:column; gap:8px; flex-grow:1;">
        <div id="toast-from-container" style="display:${config.showFrom === false ? 'none' : 'flex'}; flex-direction:column;">
          <div style="display:flex; justify-content:space-between; font-size:11px; color:#64748b; margin-bottom:2px;">
            <span>Source text:</span>
            <span id="btn-copy-from" style="cursor:pointer; color:${border}; font-weight:bold;">📋 Copy</span>
          </div>
          <textarea id="toast-from-text" style="width:100%; height:45px; border:1px solid #cbd5e1; border-radius:6px; padding:4px; font-size:inherit; font-family:inherit; background:rgba(255,255,255,0.8);"></textarea>
        </div>
        <div style="display:flex; flex-direction:column; flex-grow:1;">
          <div style="display:flex; justify-content:space-between; font-size:11px; color:#15803d; margin-bottom:2px;">
            <strong>Translation:</strong>
            <span id="btn-copy-to" style="cursor:pointer; color:${border}; font-weight:bold;">📋 Copy</span>
          </div>
          <textarea id="toast-to-text" style="width:100%; height:55px; border:1px solid #86efac; border-radius:6px; padding:4px; font-size:inherit; font-family:inherit; font-weight:600; color:#14532d; background:rgba(240,253,244,0.9);"></textarea>
        </div>
      </div>
    `;

    document.body.appendChild(toast);
    makeToastDraggable(toast, toast.querySelector('#toast-drag-header'));

    toast.querySelector('#close-trans-toast').onclick = () => toast.remove();
    toast.querySelector('#btn-copy-from').onclick = () => navigator.clipboard.writeText(toast.querySelector('#toast-from-text').value);
    toast.querySelector('#btn-copy-to').onclick = () => navigator.clipboard.writeText(toast.querySelector('#toast-to-text').value);

    toast.querySelector('#toast-lang-select').addEventListener('change', async (e) => {
      const newLang = e.target.value;
      if (isContextValid()) chrome.storage.local.set({ targetLang: newLang });
      const fromVal = toast.querySelector('#toast-from-text').value;
      if (fromVal.trim()) {
        toast.querySelector('#toast-to-text').value = "Translating...";
        toast.querySelector('#toast-to-text').value = await translateInPage(fromVal, newLang);
      }
    });

    return toast;
  }

  function makeToastDraggable(toastEl, handleEl) {
    let isDragging = false, dragStartX, dragStartY, initialLeft, initialTop;
    handleEl.addEventListener('mousedown', (e) => {
      if (e.target.tagName === 'SELECT' || e.target.id === 'close-trans-toast') return;
      isDragging = true; dragStartX = e.clientX; dragStartY = e.clientY;
      const rect = toastEl.getBoundingClientRect();
      initialLeft = rect.left; initialTop = rect.top;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
      if (!isDragging) return;
      let newLeft = Math.max(0, Math.min(initialLeft + (e.clientX - dragStartX), window.innerWidth - toastEl.offsetWidth));
      let newTop = Math.max(0, Math.min(initialTop + (e.clientY - dragStartY), window.innerHeight - toastEl.offsetHeight));
      toastEl.style.left = `${newLeft}px`; toastEl.style.top = `${newTop}px`;
    }

    function onMouseUp() {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  }

  async function translateInPage(text, targetLang = 'en') {
    if (!text?.trim()) return '';
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await res.json();
      return data[0].map(item => item[0]).join('');
    } catch { return "Translation connection error!"; }
  }

  async function doOCRInPage(base64Image, customApiKey) {
    const keys = customApiKey ? [customApiKey, "K87889148388957", "K83907727188957", "helloworld"] : ["K87889148388957", "K83907727188957", "helloworld"];
    for (let key of keys) {
      try {
        const formData = new FormData();
        formData.append("base64Image", base64Image);
        formData.append("language", "eng");
        formData.append("apikey", key);
        formData.append("scale", "true");
        formData.append("OCREngine", "2");

        const res = await fetch("https://api.ocr.space/parse/image", { method: "POST", body: formData });
        if (res.status === 429) continue;
        const data = await res.json();
        const text = data?.ParsedResults?.[0]?.ParsedText;
        if (text?.trim()) return text.trim();
      } catch (err) { console.error("OCR Key Failed:", key); }
    }
    return "";
  }

  function captureAndCrop(rect) {
    if (!isContextValid()) {
      notify.notifyAction("Extension context was reloaded.\nPlease refresh (F5) the webpage to continue!", 'warning', 3e3);
      return;
    }

    try {
      chrome.storage.local.get(['targetLang', 'saveData', 'showFrom', 'toastStyle', 'ocrApiKey'], (config) => {
        if (!isContextValid()) return;

        showFloatingToast(rect.x, rect.y, rect.width, rect.height, config || {});

        chrome.runtime.sendMessage({ action: "capture_tab" }, (response) => {
          if (chrome.runtime.lastError || !response?.dataUrl) {
            let statusEl = document.getElementById('toast-status');
            if (statusEl) statusEl.innerText = "❌ Screen capture error!";
            return;
          }

          let img = new Image();
          img.onload = async () => {
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let cropX = rect.x * rect.dpr, cropY = rect.y * rect.dpr;
            let cropW = rect.width * rect.dpr, cropH = rect.height * rect.dpr;

            canvas.width = cropW; canvas.height = cropH;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

            let base64Image = canvas.toDataURL('image/jpeg', 0.9);

            const sourceText = await doOCRInPage(base64Image, config?.ocrApiKey);
            const statusEl = document.getElementById('toast-status');
            const resultEl = document.getElementById('toast-result');

            if (!sourceText) {
              if (statusEl) statusEl.innerText = "❌ No text found in selected area!";
              return;
            }

            const translated = await translateInPage(sourceText, config?.targetLang || 'en');
            if (statusEl) statusEl.style.display = 'none';
            if (resultEl) resultEl.style.display = 'flex';

            let fromTa = document.getElementById('toast-from-text');
            let toTa = document.getElementById('toast-to-text');
            if (fromTa) fromTa.value = sourceText;
            if (toTa) toTa.value = translated;

            if (config?.saveData !== false && isContextValid()) {
              chrome.storage.local.set({ lastSourceText: sourceText, lastTransText: translated });
            }
          };
          img.src = response.dataUrl;
        });
      });
    } catch (err) {
      notify.notifyAction("Please refresh (F5) the webpage to continue using the extension!", 'warning', 3e3);
    }
  }
  notify.notifyAction("Content loaded!", 'success', 3e3);
})();

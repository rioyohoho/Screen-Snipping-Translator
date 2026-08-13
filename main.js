document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id);

  const sourceLang = $('sourceLang'), targetLang = $('targetLang'), ocrSpinner = $('ocrSpinner'),
        spinnerText = $('spinnerText'), sourceText = $('sourceText'),
        translatedText = $('translatedText'), btnManualTranslate = $('btnManualTranslate'),
        btnClear = $('btnClear'), btnCopySource = $('btnCopySource'), btnCopyTrans = $('btnCopyTrans'),
        configForm = $('configForm'), checkSaveData = $('checkSaveData'), checkShowFrom = $('checkShowFrom'),
        cfgBgType = $('cfgBgType'), boxBgColor = $('boxBgColor'), boxBgGradient = $('boxBgGradient'),
        boxBgImage = $('boxBgImage'), cfgBgColor = $('cfgBgColor'), cfgBgAlpha = $('cfgBgAlpha'),
        lblAlphaVal = $('lblAlphaVal'), cfgGradStart = $('cfgGradStart'), cfgGradEnd = $('cfgGradEnd'),
        cfgGradAngle = $('cfgGradAngle'), cfgBgImageUrl = $('cfgBgImageUrl'), cfgFontSelect = $('cfgFontSelect'),
        cfgFontCustom = $('cfgFontCustom'), cfgFontSizeNum = $('cfgFontSizeNum'), cfgFontSizeRange = $('cfgFontSizeRange'),
        lblFontSizeVal = $('lblFontSizeVal'), cfgTextColor = $('cfgTextColor'), cfgBorderColor = $('cfgBorderColor'),
        cfgBorderRadius = $('cfgBorderRadius'), cfgOcrKey = $('cfgOcrKey');

  // Navigation Tabs
  document.querySelectorAll('.nav-link').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => {
        p.classList.remove('active');
        p.style.display = 'none';
      });
      
      btn.classList.add('active');
      const target = $(btn.dataset.target);
      if (target) {
        target.classList.add('active');
        target.style.display = 'block';
      }
    });
  });

  // Controls Event Listeners
  cfgBgType.addEventListener('change', () => {
    boxBgColor.classList.toggle('d-none', cfgBgType.value !== 'color');
    boxBgGradient.classList.toggle('d-none', cfgBgType.value !== 'gradient');
    boxBgImage.classList.toggle('d-none', cfgBgType.value !== 'image');
    saveConfigLive();
  });

  cfgBgAlpha.addEventListener('input', () => { lblAlphaVal.innerText = cfgBgAlpha.value; saveConfigLive(); });
  
  cfgFontSizeRange.addEventListener('input', () => { 
    cfgFontSizeNum.value = cfgFontSizeRange.value; 
    if (lblFontSizeVal) lblFontSizeVal.innerText = cfgFontSizeRange.value;
    saveConfigLive(); 
  });

  cfgFontSelect.addEventListener('change', () => {
    cfgFontCustom.classList.toggle('d-none', cfgFontSelect.value !== 'custom');
    saveConfigLive();
  });

  function saveConfigLive() {
    const toastStyle = {
      bgType: cfgBgType.value, bgColor: cfgBgColor.value, bgAlpha: parseFloat(cfgBgAlpha.value),
      gradStart: cfgGradStart.value, gradEnd: cfgGradEnd.value, gradAngle: parseInt(cfgGradAngle.value) || 135,
      bgImageUrl: cfgBgImageUrl.value.trim(), textColor: cfgTextColor.value, borderColor: cfgBorderColor.value,
      radius: parseInt(cfgBorderRadius.value) || 10, fontSize: parseInt(cfgFontSizeRange.value) || 13,
      fontFamily: cfgFontSelect.value === 'custom' ? (cfgFontCustom.value || 'sans-serif') : cfgFontSelect.value
    };

    chrome.storage.local.set({
      saveData: checkSaveData.checked,
      showFrom: checkShowFrom.checked,
      ocrApiKey: cfgOcrKey ? cfgOcrKey.value.trim() : '',
      toastStyle,
      sourceLang: sourceLang.value || 'auto',
      targetLang: targetLang.value || 'vi'
    });
  }

  [checkSaveData, checkShowFrom, cfgBgColor, cfgGradStart, cfgGradEnd, cfgGradAngle, cfgBgImageUrl, cfgFontCustom, cfgTextColor, cfgBorderColor, cfgBorderRadius].forEach(el => {
    if (el) {
      el.addEventListener('input', saveConfigLive);
      el.addEventListener('change', saveConfigLive);
    }
  });

  async function translateText(text, target = 'vi', source = 'auto') {
    if (!text?.trim()) return '';
    try {
      const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(source || 'auto')}&tl=${encodeURIComponent(target || 'vi')}&dt=t&q=${encodeURIComponent(text)}`);
      const data = await res.json();
      return data[0].map(item => item[0]).join('');
    } catch { return "Translation error!"; }
  }

  // Load Saved Storage Configs
  chrome.storage.local.get(null, (data) => {
    if (data.ocrApiKey) cfgOcrKey.value = data.ocrApiKey;
    if (data.sourceLang) sourceLang.value = data.sourceLang;
    if (data.targetLang) targetLang.value = data.targetLang;
    if (data.saveData !== undefined) checkSaveData.checked = data.saveData;
    if (data.showFrom !== undefined) checkShowFrom.checked = data.showFrom;

    if (data.toastStyle) {
      const ts = data.toastStyle;
      if (ts.bgType) { cfgBgType.value = ts.bgType; cfgBgType.dispatchEvent(new Event('change')); }
      if (ts.bgColor) cfgBgColor.value = ts.bgColor;
      if (ts.bgAlpha !== undefined) { cfgBgAlpha.value = ts.bgAlpha; lblAlphaVal.innerText = ts.bgAlpha; }
      if (ts.gradStart) cfgGradStart.value = ts.gradStart;
      if (ts.gradEnd) cfgGradEnd.value = ts.gradEnd;
      if (ts.gradAngle) cfgGradAngle.value = ts.gradAngle;
      if (ts.bgImageUrl) cfgBgImageUrl.value = ts.bgImageUrl;
      if (ts.textColor) cfgTextColor.value = ts.textColor;
      if (ts.borderColor) cfgBorderColor.value = ts.borderColor;
      if (ts.radius !== undefined) cfgBorderRadius.value = ts.radius;
      if (ts.fontSize) { 
        cfgFontSizeRange.value = ts.fontSize; 
        cfgFontSizeNum.value = ts.fontSize;
        if (lblFontSizeVal) lblFontSizeVal.innerText = ts.fontSize;
      }
      if (ts.fontFamily) {
        if (['Arial, sans-serif', "'Segoe UI', sans-serif", 'Roboto, sans-serif', "'Georgia', serif", 'monospace'].includes(ts.fontFamily)) {
          cfgFontSelect.value = ts.fontFamily;
        } else {
          cfgFontSelect.value = 'custom';
          cfgFontCustom.classList.remove('d-none');
          cfgFontCustom.value = ts.fontFamily;
        }
      }
    }

    if (data.saveData !== false) {
      if (data.lastSourceText) sourceText.value = data.lastSourceText;
      if (data.lastTransText) translatedText.value = data.lastTransText;
    }
  });

  sourceLang.addEventListener('change', async () => {
    saveConfigLive();
    if (sourceText.value.trim()) {
      translatedText.value = "Translating...";
      translatedText.value = await translateText(sourceText.value, targetLang.value, sourceLang.value);
    }
  });

  targetLang.addEventListener('change', async () => {
    saveConfigLive();
    if (sourceText.value.trim()) {
      translatedText.value = "Translating...";
      translatedText.value = await translateText(sourceText.value, targetLang.value, sourceLang.value);
    }
  });

  btnManualTranslate.addEventListener('click', async () => {
    if (sourceText.value.trim()) {
      translatedText.value = "Translating...";
      translatedText.value = await translateText(sourceText.value, targetLang.value, sourceLang.value);
    }
  });

  btnClear.addEventListener('click', () => {
    sourceText.value = ""; translatedText.value = "";
    chrome.storage.local.remove(['lastSourceText', 'lastTransText']);
  });

  btnCopySource.addEventListener('click', () => sourceText.value && navigator.clipboard.writeText(sourceText.value));
  btnCopyTrans.addEventListener('click', () => translatedText.value && navigator.clipboard.writeText(translatedText.value));
  configForm.addEventListener('submit', (e) => { e.preventDefault(); saveConfigLive(); notify.notifyAction("Settings saved successfully!", 'success', 3e3); });
});

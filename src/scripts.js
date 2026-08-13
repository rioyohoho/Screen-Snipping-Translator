// scripts.js
let pr=(fun,t=500)=>new Promise((r,c)=>{setTimeout(()=>{try{r(fun())}catch(fun){c(fun)}},t)});
let txt = {
    /**
     * @param {String} t : text = "abc"
     * @param  {...String} e : text = 'a','b', => true
     * @returns {Boolean} 'a','b','d' => false
     */
    contains(t, ...e) { if ("string" != typeof t) return !1; for (let r of e) if ("string" != typeof r || !t.includes(r)) return !1; return !0 },
    /**
     * @param {String} t : text = 'chào'
     * @returns : text = 'ch\u00e0o'
     */
    encode(t) { let e = ""; for (let r = 0; r < t.length; r++) { let o = t.charCodeAt(r); o > 127 ? e += "\\u" + o.toString(16).padStart(4, "0") : e += t[r] } return e },
    /**
     * @param {String} t : text = 'ch\u00e0o'
     * @returns {String} : text = 'chào'
     */
    decode: t => t.replace(/\\u([\d\w]{4})/gi, function (_, i) { return String.fromCharCode(parseInt(i, 16)) })
}
let _m={
    get_bytes:async t=>{let e="";if(t instanceof HTMLElement?(e=t.src||t.currentSrc||t.href,!e&&t instanceof HTMLImageElement&&t.src&&(e=t.src)):"string"==typeof t&&(e=t),!e)throw new Error("Không tìm thấy nguồn dữ liệu (src) hợp lệ từ phần tử!");if(e.startsWith("data:")){let t=await fetch(e);return await t.arrayBuffer()}let r=await fetch(e);if(!r.ok)throw new Error(`Không thể tải dữ liệu: ${r.statusText}`);return await r.arrayBuffer()},
    download:(t,e=(new Date).toLocaleString("vi").replaceAll(/[:/,\s]/g,"_"),r=".bin",a="application/octet-stream")=>{let n=new Blob([t],{type:a}),c=URL.createObjectURL(n),o=document.createElement("a");o.href=c,o.download=e+r,document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(c)}
};
let code = {
    cookieEncode(e) { let n = ""; for (let o in e) if (e.hasOwnProperty(o)) { let t = encodeURIComponent(o), r = encodeURIComponent(e[o]); n += `${t}=${r};` } return n },
    cookieDecode(t) { let e = {}; if (!t) return e; let i = t.split(";"); return i.forEach(t => { let i = t.trim().split("="); if (2 === i.length) { let r = i[0].trim(), l = decodeURIComponent(i[1].trim()); e[r] = l } }), e },
    queryEncode(o) { let e = new URLSearchParams; for (let r in o) o.hasOwnProperty(r) && e.append(r, o[r]); return e.toString() },
    queryDecode(t) { if ("string" == typeof t) t = new URLSearchParams(t); else if (!(t instanceof URLSearchParams)) throw Error("Must be URLSearchParams."); return Object.fromEntries(t.entries()) }
}
/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} e
 * @param {(Partial<HTMLElementTagNameMap[K]> & {
 *   _attrs?: Record<string, string>,
 *   _evts?: Record<string, EventListenerOrEventListenerObject>
 * })} [t]
 * @param {...(HTMLElement | string)} n
 * @returns {HTMLElementTagNameMap[K]}
 */
let cre=(e,t={},...n)=>{let i=document.createElement(e);if(t&&"object"==typeof t){let{_attrs:r={},_evts:c={},...s}=t;Object.assign(i,s),Object.keys(r).forEach(e=>{i.setAttribute(e,r[e])}),Object.keys(c).forEach(e=>{"function"==typeof c[e]&&i.addEventListener(e,c[e])})}return n.forEach(e=>{"string"==typeof e?e.includes("<")&&e.includes(">")?i.innerHTML+=e:i.innerText+=e:e instanceof Element&&i.appendChild(e)}),i};
// notify.js
let notify = (t => {
    let type = {
        info: { text: "#04566A", bg: "#DFF6FF", border: "#4A90E2" },
        primary: { text: "#FFFFFF", bg: "#007BFF", border: "#004B8D" },
        success: { text: "#155724", bg: "#D4EDDA", border: "#398B4B" },
        warning: { text: "#856404", bg: "#FFF3CD", border: "#D9B300" },
        danger: { text: "#850404ff", bg: "#ffcdcd", border: "#d90000ff" },
        second: { text: "#383D41", bg: "#e2e3e5", border: "#6C757D" }
    }; Object.freeze(type);
    let e = type, o = (t, e = {}, ...o) => { let r = document.createElement(t); if (e && "object" == typeof e) { let { _attrs: i = {}, _evts: n = {}, ...d } = e; Object.assign(r, d), Object.keys(i).forEach(t => { r.setAttribute(t, i[t]) }), Object.keys(n).forEach(t => { "function" == typeof n[t] && r.addEventListener(t, n[t]) }) } return o.forEach(t => { "string" == typeof t ? t.includes("<") && t.includes(">") ? r.innerHTML += t : r.innerText += t : t instanceof Element && r.appendChild(t) }), r }, r = o("div", { _attrs: { id: "notify_" + Math.random().toString(36).substring(3, 6) }, style: "position:fixed;bottom:.5em;right:0;transform:translate(-.5em);z-index:9999;display:flex;flex-direction:column;gap:0.1em;" }); if (document.body.prepend(r), !document.getElementById("notify-spin-style")) { let i = document.createElement("style"); i.id = "notify-spin-style", i.textContent = "@keyframes notify-spinner-border {to { transform:rotate(360deg);}}", document.head.appendChild(i) } let n = { type: e, container: r, notificationIdCounter: 0, confirm(t, ...r) { let i = r.length > 0 ? r : [["Cancel", "warning"], ["OK", "primary"]], n = e.info; return new Promise(o => { let s = t => { document.body.removeChild(l), document.removeEventListener("keydown", a), document.removeEventListener("keypress", a), o(t) }, c = i.map((t, o) => { let [n, i] = t, a = e[i] || e.primary; return cre("button", { textContent: n, style: `padding:10px 20px;background-color:${a.border};color:${"#FFFFFF" === a.text ? "white" : a.text};border:none;cursor:pointer;font-size:16px;transition:background-color .2s;flex-grow:1;`, _evts: { click: () => s(o) } }) }), d = cre("div", { style: "display:flex;justify-content:center;gap:15px;" }, ...c), p = cre("div", { _evts: { click: t => t.stopPropagation() }, style: `padding:25px;max-width:400px;width:90%;background-color:${n.bg};color:${n.text};border:.5px solid ${n.border};box-shadow:0 4px 12px rgba(0,0,0,.3);cursor:default;display:flex;flex-direction:column;` }, cre("p", { textContent: t, style: `margin-bottom:20px;font-weight:bold;text-align:center;color:${n.text};font-size:18px;` }), d), l = cre("div", { style: "font-family:sans-serif;position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:rgba(0,0,0,.8);display:flex;justify-content:center;align-items:center;z-index:1100;cursor:pointer;", _evts: { click: () => s(-1) } }, p); l.tabIndex = -1, document.body.prepend(l), l.focus(); let a = t => { if ("Escape" === t.key) t.preventDefault(), s(0); else if ("Enter" === t.key) t.preventDefault(), s(1); else /^[0-9]$/.test(t.key) && (t.preventDefault(), s(Number(t.key))) }; document.addEventListener("keydown", a), document.addEventListener("keypress", a) }) }, input(t, r = "info") { let i = e[r]; return new Promise(r => { let n = t => { document.body.removeChild(s), r(t) }, d = o("textarea", { _attrs: { placeholder: new DOMParser().parseFromString(t, 'text/html')?.body.textContent || '', rows: "4" }, style: `background:transparent;width:100%;padding:10px;margin-bottom:15px;box-sizing:border-box;border:.5px solid ${i.border};resize:vertical;font-size:16px;outline:none;transition:border-color 0.3s;`, _evts: { keydown(t) { "Enter" !== t.key || t.shiftKey || (t.preventDefault(), n(d.value)) } } }), a = o("div", { _evts: { click: t => t.stopPropagation() }, style: `padding:25px;max-width:500px;width:90%;background-color:${i.bg};color:${i.text};border:.5px solid ${i.border};box-shadow:0 4px 12px rgba(0, 0, 0, 0.3);cursor:default;display:flex;flex-direction:column;` }, o("p", { innerHTML: t, style: `margin-bottom:15px;font-weight:bold;text-align:center;color:${i.text};` }), d, o("div", { style: "display:flex;justify-content:flex-end;gap:10px;" }, o("button", { textContent: "Hủy", style: "padding:8px 15px;background-color:#ccc;color:#333;border:none;cursor:pointer;font-size:16px;transition:background-color 0.2s;", _evts: { click: () => n(null) } }), o("button", { textContent: "Gửi", style: `padding:8px 15px;background-color:${e.primary.bg};color:${e.primary.text};border:none;cursor:pointer;font-size:16px;transition:background-color 0.2s;`, _evts: { click: () => n(d.value) } }))), s = o("div", { style: "font-family:sans-serif;position:fixed;top:0px;left:0px;width:100vw;height:100vh;background-color:rgba(0, 0, 0, 0.8);display:flex;justify-content:center;align-items:center;z-index:1100;cursor:pointer;", _evts: { click: () => n(null) } }, a); document.body.prepend(s), d.focus() }) }, showNotification(t, i = {}) { let n = "notification-" + ++this.notificationIdCounter, d = e[i.type || "info"], a = []; if (i.loading) { let s = o("div", { _attrs: { role: "status" }, style: "display:inline-block;width:1rem;height:1rem;vertical-align:-0.125em;border:0.15em solid currentColor;border-right-color:transparent;border-radius:50%;animation:notify-spinner-border 0.75s linear infinite;margin-right:0.5rem;" }); a.push(s) } let l = o("div", { innerHTML: t }); a.push(l); let c = o("div", { _attrs: { id: n }, style: `min-width:300px;max-width:90vw;padding:10px 20px;border:1px solid ${d.border};display:flex;align-items:center;box-shadow:0 0.5rem 1rem rgba(0, 0, 0, 0.15);color:${d.text};background-color:${d.bg};` }, ...a); return r.appendChild(c), i.sticky || i.loading || setTimeout(() => this.hideNotification(n), i.duration || 3e3), n }, hideNotification(t) { let e = document.getElementById(t); e && (e.style.transition = "opacity 0.5s ease", e.style.opacity = 0, setTimeout(() => e.remove(), 500)) }, notifyAction(t, e = "info", o = 3e3) { n.showNotification(t, { type: e, duration: o }) }, async notifyPromise(t, e) { let o = n.showNotification(t, { type: "primary", loading: !0, sticky: !0 }); try { await e, n.hideNotification(o), n.showNotification(`${t} th\xe0nh c\xf4ng!`, { type: "success" }) } catch (r) { n.hideNotification(o), n.showNotification(`${t} thất bại!`, { type: "danger" }), console.error("Promise failed:", r) } } }; return n
})();

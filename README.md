## [HƯỚNG DẪN TIẾNG VIỆT](./README.vi.md)

# Screen & Text Translator - User Guide

## REQUIREMENTS
```bash
node -v & npm -v
```
```bash
git clone https://github.com/rioyohoho/Screen-Snipping-Translator.git
cd Screen-Snipping-Translator
npm install
```

---

<table>
    <caption>
      <h3>Setup</h3>
    </caption>
    <tr>
        <td>
            <a href="https://github.com/user-attachments/assets/d33b2f83-a9f4-4b96-97d7-2239fa0f41c2">
                <img src="https://github.com/user-attachments/assets/d33b2f83-a9f4-4b96-97d7-2239fa0f41c2"
                    alt="Video demo" style="width: 350px; border-radius: 8px;">
            </a>
        </td>
    </tr>
</table>

### 1. Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| **`Alt + T`** / **`Alt + R`** | Activate **Screen Snipping (OCR/AI)** to capture and translate an area. |
| **`Alt + C`** | Activate **Inspect & Pick Element (Find Text)** to extract text directly from the webpage. |
| **`Escape` (Esc)** | Cancel snipping or element picking mode. |

---

### 2. Core Features

#### 2.1. Screen Snipping (OCR / AI)
* Press **`Alt + T`** or **`Alt + R`**, hold the left mouse button, and drag a selection box over the text/image.
* Release the mouse to automatically extract text and display the translated result in the floating toast.

#### 2.2. Find Text (Element Inspector)
* Press **`Alt + C`** or click the **`🔍 Find Text`** button in the extension panel.
* Hover over any web element to highlight it with a blue frame, then left-click to extract and translate immediately.

#### 2.3. Floating Toast Window
* **Draggable:** Click and hold the header bar to move the toast anywhere on the screen.
* **Language Switcher:** Change languages or click **`⇄`** to swap source and target languages instantly.
* **Engine Switcher:** Switch on-the-fly between `⚡ OCR`, `✨ Gemini`, and `🤖 GPT`.
* **Copy Text:** Click **`📋 Copy`** on either the source text or translation field.
* **Bidirectional Resize Sync:** Drag the bottom-right corner to resize; the width and height automatically sync and save to settings.

---

### 3. Extension Panel Settings

#### Tab 1: Translate
* Select the default translation engine (`OCR Space`, `Gemini 1.5 Flash`, `GPT-4o Mini`).
* Set Source (From) and Target (To) languages, translate manually, or clear current inputs.

#### Tab 2: Keys (API Key Management)
* Add multiple backup API keys separated by commas or new lines.
* Automatic error/rate-limit rotation with a configurable cooldown timer (`Reset cooldown`).
* Click the red cooldown badge on any key to manually reset its timer back to `0`.

#### Tab 3: Styles (Appearance Customization)
* **Dimensions:** Set default toast `Width` (px) and `Height` (px).
* **Background:** Choose Solid Color + Alpha, Gradient (with 0-360° clockwise rotation), or Image URL.
* **Text & Font:** Customize text color with transparency (Alpha), font size, and font families.
* **Border & Radius:** Customize border color with Alpha, border size (px), and corner radius (default: `1px`).

#### Tab 4: Info
* View the extension version, features summary, and quick shortcut references.

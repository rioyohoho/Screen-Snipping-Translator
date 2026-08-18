# Screen & Text Translator - User Guide / Hướng Dẫn Sử Dụng

## REQUIREMENTS
```
node -v & npm -v
```
```
git clone https://github.com/rioyohoho/Screen-Snipping-Translator.git
cd Screen-Snipping-Translator
npm install
```
### 1. Keyboard Shortcuts / Phím Tắt

<table>
  <tr>
    <td valign="top">
      <table>
        <thead>
          <tr>
            <th>Shortcut / Phím Tắt</th>
            <th>Action / Chức Năng</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Alt + T</code> / <code>Alt + R</code></td>
            <td><strong>[EN]</strong> Activate <strong>Screen Snipping (OCR/AI)</strong> to capture and translate an area.<br><strong>[VI]</strong> Kích hoạt <strong>Quét Vùng Ảnh (OCR/AI)</strong> để chụp và dịch.</td>
          </tr>
          <tr>
            <td><code>Alt + C</code></td>
            <td><strong>[EN]</strong> Activate <strong>Inspect & Pick Element</strong> to extract text.<br><strong>[VI]</strong> Kích hoạt <strong>Trỏ & Chọn Phần Tử</strong> để lấy chữ.</td>
          </tr>
          <tr>
            <td><code>Escape</code> (Esc)</td>
            <td><strong>[EN]</strong> Cancel snipping or element picking mode.<br><strong>[VI]</strong> Hủy bỏ chế độ quét/chọn.</td>
          </tr>
        </tbody>
      </table>
    </td>
    <td valign="top">
      <a href="https://youtube.com/shorts/yqPH-6_6Gdg?feature=share">
        <img width="300" alt="Video demo" src="https://github.com/user-attachments/assets/d33b2f83-a9f4-4b96-97d7-2239fa0f41c2" />
      </a>
    </td>
  </tr>
</table>

---

### 2. Core Features / Các Chức Năng Chính

#### 2.1. Screen Snipping (OCR / AI) / Quét Vùng Màn Hình
* **[EN]** Press **`Alt + T`** or **`Alt + R`**, hold the left mouse button, and drag a selection box over the text/image.
* **[VI]** Nhấn **`Alt + T`** hoặc **`Alt + R`**, giữ chuột trái và kéo vùng chọn qua đoạn văn bản/hình ảnh cần dịch.
* **[EN]** Release the mouse to automatically extract text and display the translated result in the floating toast.
* **[VI]** Thả chuột để tự động trích xuất nội dung và hiển thị kết quả dịch trên cửa sổ toast nổi.

#### 2.2. Find Text (Element Inspector) / Trỏ & Lấy Văn Bản
* **[EN]** Press **`Alt + C`** or click the **`🔍 Find Text`** button in the extension panel.
* **[VI]** Nhấn **`Alt + C`** hoặc nhấn nút **`🔍 Find Text`** trên bảng điều khiển tiện ích.
* **[EN]** Hover over any web element to highlight it with a blue frame, then left-click to extract and translate immediately.
* **[VI]** Di chuột qua phần tử trên trang để làm nổi bật khung viền xanh, sau đó click chuột trái để trích xuất và dịch ngay.

#### 2.3. Floating Toast Window / Cửa Sổ Toast Nổi
* **[EN]** **Draggable:** Click and hold the header bar to move the toast anywhere on the screen.
* **[VI]** **Kéo thả:** Nhấn giữ thanh tiêu đề trên cùng để di chuyển toast đến vị trí bất kỳ.
* **[EN]** **Language Switcher:** Change languages or click **`⇄`** to swap source and target languages instantly.
* **[VI]** **Đổi ngôn ngữ:** Chọn lại ngôn ngữ hoặc bấm nút **`⇄`** để đảo chiều ngôn ngữ trực tiếp.
* **[EN]** **Engine Switcher:** Switch on-the-fly between `⚡ OCR`, `✨ Gemini`, and `🤖 GPT`.
* **[VI]** **Đổi Engine:** Chuyển đổi trực tiếp giữa `⚡ OCR`, `✨ Gemini`, và `🤖 GPT`.
* **[EN]** **Copy Text:** Click **`📋 Copy`** on either the source text or translation field.
* **[VI]** **Sao chép:** Bấm **`📋 Copy`** tại ô văn bản gốc hoặc ô kết quả dịch.
* **[EN]** **Bidirectional Resize Sync:** Drag the bottom-right corner to resize; the width and height automatically sync and save to settings.
* **[VI]** **Đồng bộ kích thước 2 chiều:** Kéo góc dưới-phải để thay đổi kích cỡ; thông số rộng/cao sẽ tự động lưu vào cài đặt.

---

### 3. Extension Panel Settings / Quản Lý Cài Đặt

#### Tab 1: Translate / Dịch Thuật
* **[EN]** Select the default translation engine (`OCR Space`, `Gemini 1.5 Flash`, `GPT-4o Mini`).
* **[VI]** Chọn Engine dịch mặc định (`OCR Space`, `Gemini 1.5 Flash`, `GPT-4o Mini`).
* **[EN]** Set Source (From) and Target (To) languages, translate manually, or clear current inputs.
* **[VI]** Chọn ngôn ngữ Nguồn (From) và Đích (To), dịch thủ công hoặc xóa trắng nội dung.

#### Tab 2: Keys / Quản Lý API Key
* **[EN]** Add multiple backup API keys separated by commas or new lines.
* **[VI]** Thêm danh sách nhiều key dự phòng, phân tách bằng dấu phẩy hoặc dòng mới.
* **[EN]** Automatic error/rate-limit rotation with a configurable cooldown timer (`Reset cooldown`).
* **[VI]** Tự động chuyển key khi gặp lỗi/hết quota theo bộ đếm thời gian (`Reset cooldown`).
* **[EN]** Click the red cooldown badge on any key to manually reset its timer back to `0`.
* **[VI]** Nhấp vào nhãn đếm ngược màu đỏ để reset trạng thái key về `0` ngay lập tức.

#### Tab 3: Styles / Tùy Chỉnh Giao Diện
* **[EN]** **Dimensions:** Set default toast `Width` (px) and `Height` (px).
* **[VI]** **Kích thước:** Thiết lập chiều rộng (`Width`) và chiều cao (`Height`) mặc định của toast.
* **[EN]** **Background:** Choose Solid Color + Alpha, Gradient (with 0-360° clockwise rotation), or Image URL.
* **[VI]** **Nền:** Chọn màu đơn sắc + Alpha, Gradient (kèm xoay góc 0-360° theo kim đồng hồ), hoặc Ảnh URL.
* **[EN]** **Text & Font:** Customize text color with transparency (Alpha), font size, and font families.
* **[VI]** **Văn bản & Font:** Tùy chỉnh màu chữ kèm độ trong suốt (Alpha), cỡ chữ, và font chữ.
* **[EN]** **Border & Radius:** Customize border color with Alpha, border size (px), and corner radius (default: `1px`).
* **[VI]** **Viền & Bo Góc:** Chỉnh màu viền kèm Alpha, độ dày viền (px), và bán kính bo góc (mặc định: `1px`).

#### Tab 4: Info / Thông Tin
* **[EN]** View the extension version, features summary, and quick shortcut references.
* **[VI]** Xem phiên bản tiện ích, tóm tắt tính năng, và tra cứu phím tắt nhanh.

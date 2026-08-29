## [ENGLISH INSTRUCTIONS](./README.md)

# Screen & Text Translator - Hướng Dẫn Sử Dụng

## YÊU CẦU HỆ THỐNG
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
      <h3>Cài đặt</h3>
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

### 1. Phím Tắt

| Phím Tắt | Chức Năng |
| :--- | :--- |
| **`Alt + T`** / **`Alt + R`** | Kích hoạt công cụ **Quét Vùng Ảnh (OCR/AI)** để chụp và dịch vùng chọn. |
| **`Alt + C`** | Kích hoạt chế độ **Trỏ & Chọn Phần Tử (Find Text)** để lấy chữ trực tiếp từ trang web. |
| **`Escape` (Esc)** | Hủy bỏ chế độ quét ảnh hoặc trỏ chọn phần tử. |

---

### 2. Các Chức Năng Chính

#### 2.1. Quét Vùng Màn Hình (OCR / AI)
* Nhấn **`Alt + T`** hoặc **`Alt + R`**, giữ chuột trái và kéo vùng chọn qua đoạn văn bản/hình ảnh cần dịch.
* Thả chuột để tự động trích xuất nội dung và hiển thị kết quả dịch trên cửa sổ toast nổi.

#### 2.2. Trỏ & Lấy Văn Bản (Find Text)
* Nhấn **`Alt + C`** hoặc nhấn nút **`🔍 Find Text`** trên bảng điều khiển tiện ích.
* Di chuột qua phần tử trên trang để làm nổi bật khung viền xanh, sau đó click chuột trái để trích xuất và dịch ngay.

#### 2.3. Cửa Sổ Toast Nổi
* **Kéo thả:** Nhấn giữ thanh tiêu đề trên cùng để di chuyển toast đến vị trí bất kỳ.
* **Đổi ngôn ngữ:** Chọn lại ngôn ngữ hoặc bấm nút **`⇄`** để đảo chiều ngôn ngữ trực tiếp.
* **Đổi Engine:** Chuyển đổi trực tiếp giữa `⚡ OCR`, `✨ Gemini`, và `🤖 GPT`.
* **Sao chép:** Bấm **`📋 Copy`** tại ô văn bản gốc hoặc ô kết quả dịch.
* **Đồng bộ kích thước 2 chiều:** Kéo góc dưới-phải để thay đổi kích cỡ; thông số rộng/cao sẽ tự động lưu vào cài đặt.

---

### 3. Quản Lý Cài Đặt

#### Tab 1: Dịch Thuật (Translate)
* Chọn Engine dịch mặc định (`OCR Space`, `Gemini 1.5 Flash`, `GPT-4o Mini`).
* Chọn ngôn ngữ Nguồn (From) và Đích (To), dịch thủ công hoặc xóa trắng nội dung.

#### Tab 2: Quản Lý API Key (Keys)
* Thêm danh sách nhiều key dự phòng, phân tách bằng dấu phẩy hoặc dòng mới.
* Tự động chuyển key khi gặp lỗi/hết quota theo bộ đếm thời gian (`Reset cooldown`).
* Nhấp vào nhãn đếm ngược màu đỏ để reset trạng thái key về `0` ngay lập tức.

#### Tab 3: Tùy Chỉnh Giao Diện (Styles)
* **Kích thước:** Thiết lập chiều rộng (`Width`) và chiều cao (`Height`) mặc định của toast.
* **Nền:** Chọn màu đơn sắc + Alpha, Gradient (kèm xoay góc 0-360° theo kim đồng hồ), hoặc Ảnh URL.
* **Văn bản & Font:** Tùy chỉnh màu chữ kèm độ trong suốt (Alpha), cỡ chữ, và font chữ.
* **Viền & Bo Góc:** Chỉnh màu viền kèm Alpha, độ dày viền (px), và bán kính bo góc (mặc định: `1px`).

#### Tab 4: Thông Tin (Info)
* Xem phiên bản tiện ích, tóm tắt tính năng, và tra cứu phím tắt nhanh.

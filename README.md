# Hướng Dẫn Sử Dụng Extension Screen & Text Translator

---

### 1. Phím Tắt Tiện Ích

| Phím Tắt | Chức Năng |
| :--- | :--- |
| **`Alt + T`** hoặc **`Alt + R`** | Kích hoạt công cụ **Quét Vùng Ảnh (Snipping OCR)** trên màn hình để nhận diện chữ và dịch |
| **`Alt + C`** | Kích hoạt chế độ **Trỏ & Chọn Phần Tử (Find Text)** để lấy chữ trực tiếp từ website |
| **`Escape` (Esc)** | Hủy bỏ chế độ quét / trỏ chọn phần tử |

---

### 2. Các Chức Năng Chính

#### 2.1. Quét Vùng Ảnh (Snipping OCR / AI)
1. Nhấn **`Alt + T`** hoặc **`Alt + R`** trên bất kỳ trang web nào.
2. Giữ chuột trái và kéo chọn vùng văn bản / hình ảnh cần dịch.
3. Thả chuột: Toast dịch sẽ tự động mở tại vị trí vừa quét, nhận diện và trả về kết quả dịch.

#### 2.2. Tìm & Trỏ Lấy Văn Bản (Find Text)
1. Nhấn **`Alt + C`** hoặc click nút **`🔍 Find Text`** trong Side Panel.
2. Di chuột đến đoạn văn bản hoặc khối HTML cần dịch (khung viền xanh sẽ sáng lên theo phần tử).
3. Click chuột trái vào phần tử để trích xuất nội dung và dịch ngay lập tức.

#### 2.3. Cửa Sổ Toast Nổi (Floating Toast)
* **Kéo thả di chuyển:** Giữ chuột vào thanh tiêu đề trên cùng để kéo Toast đi bất kỳ đâu.
* **Đổi ngôn ngữ nhanh:** Chọn ngôn ngữ nguồn / đích hoặc bấm nút **`⇄`** để đảo chiều dịch trực tiếp.
* **Đổi Engine tức thì:** Chuyển đổi giữa `⚡ OCR`, `✨ Gemini`, `🤖 GPT`.
* **Sao chép:** Bấm **`📋 Copy`** ở ô văn bản gốc hoặc kết quả dịch.
* **Co giãn kích thước 2 chiều:** Kéo góc dưới-phải của Toast để phóng to/thu nhỏ. Kích thước (Width & Height) sẽ tự động lưu lại vào cài đặt.

---

### 3. Hướng Dẫn Quản Lý Cài Đặt (Panel Extension)

#### Tab 1: Translate (Giao diện dịch chính)
* Chọn Engine dịch mặc định (`OCR Space`, `Gemini 1.5 Flash`, `GPT-4o Mini`).
* Chọn ngôn ngữ Nguồn (From) và Đích (To).
* Dịch văn bản thủ công bằng nút **`Translate`**.
* Nút **`Clear`** để xóa trắng dữ liệu hiện tại.

#### Tab 2: Keys (Quản lý API Key)
* **Gemini API Keys & OpenAI API Keys:** Thêm danh sách key dự phòng (nhập nhiều key cách nhau bằng dấu phẩy hoặc xuống dòng).
* **Cơ chế Cooldown:** Khi 1 key bị lỗi/hết quota (429/403/401), hệ thống tự chuyển sang key tiếp theo và khóa key lỗi theo thời gian cấu hình (`Reset cooldown`).
* Bấm vào nhãn số giây màu đỏ để reset trạng thái key về `0` (sẵn sàng sử dụng).

#### Tab 3: Styles (Tùy Chỉnh Giao Diện Toast)
* **Toast Dimensions:** Cài đặt chiều rộng (`Width`) và chiều cao (`Height`) mặc định.
* **Background Style:**
  * `Solid Color + Alpha`: Màu đơn sắc kèm thanh trượt độ trong suốt (Alpha).
  * `Gradient Color`: Chuyển màu 2 điểm kèm góc xoay 360° theo chiều kim đồng hồ.
  * `Background Image`: Đặt hình nền Toast theo đường dẫn URL.
* **Text & Font:** Đổi màu chữ kèm Alpha, kích cỡ chữ (`Font Size`), và chọn Font (`Arial`, `Segoe UI`, `Roboto`, `Georgia`, `Monospace`, hoặc Font tùy chỉnh).
* **Border & Radius:** Đổi màu viền kèm Alpha, độ dày viền (`Border Size`), và độ bo góc (`Corner Radius`, mặc định `1px`).

#### Tab 4: Info (Thông Tin Phiên Bản)
* Xem phiên bản hiện tại và hướng dẫn phím tắt nhanh.

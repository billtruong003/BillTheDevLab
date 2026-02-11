# 🚀 Hướng Dẫn Biến Source Code Này Thành Blog Của Bạn

Chào mừng bạn đến với template blog chuyên nghiệp! Dưới đây là các bước để bạn bắt đầu viết và đưa blog lên internet.

## 1. Cá Nhân Hóa (Bắt buộc)

Thay đổi các thông tin sau để blog mang đậm dấu ấn cá nhân của bạn:

- **Tên & Mạng Xã Hội:** Sửa file `apps/web/lib/config/site.config.ts`.
- **Avatar & Logo:** Thay thế ảnh trong `apps/web/public/images/avatar.jpg` và `favicon.ico`.
- **Giới Thiệu:** Sửa nội dung trang `apps/web/app/(marketing)/about/page.tsx`.

## 2. Quản Lý Nội Dung

- **Viết Bài:** Tạo file `.mdx` mới trong `apps/web/content/posts/`.
  - Xem hướng dẫn chi tiết tại `apps/web/content/MDX_CHEATSHEET.md`.
- **Dự Án:** Sửa file `apps/web/lib/config/projects.config.ts` để thêm các dự án của bạn.

## 3. Triển Khai (Deploy) lên Vercel (Frontend Only)

Để blog chạy nhanh nhất mà không cần cài đặt server phức tạp:

1. Đẩy code lên GitHub.
2. Vào [Vercel.com](https://vercel.com), chọn **Add New Project** -> Import repo GitHub vừa tạo.
3. **Cấu hình Build:**
   - **Framework Preset:** Next.js
   - **Root Directory:** Chọn `apps/web` (quan trọng!).
   - **Build Command:** `cd apps/web && npm run build` (hoặc để mặc định nếu Vercel nhận diện đúng).
4. Bấm **Deploy**.

*(Lưu ý: Phần Backend NestJS sẽ cần server riêng để chạy chức năng đếm view/thanh toán. Nhưng blog vẫn hoạt động tốt ở chế độ tĩnh/frontend-only).*

## 4. Chạy Local (Máy cá nhân)

```bash
# Cài đặt dependency
npm install

# Chạy chế độ phát triển (Frontend + Backend)
npm run dev

# Chỉ chạy Frontend (nhẹ hơn)
cd apps/web && npm run dev
```

Chúc bạn có những bài viết thật chất lượng! 🎉
# Hướng Dẫn Viết Bài & Nhúng Nội Dung (MDX Cheatsheet)

## 1. Cấu Trúc File `.mdx`

Mỗi bài viết phải bắt đầu bằng **Frontmatter**:

```yaml
---
title: "Tiêu đề bài viết"
description: "Mô tả ngắn cho thẻ preview (SEO)"
date: "2024-03-20"
tags: ["Next.js", "Tutorial"]
coverImage: "/images/posts/cover.jpg"
layout: "post"
featured: true
estimatedReadTime: 5
---
```

## 2. Nhúng Video & Mạng Xã Hội

Hệ thống hỗ trợ các component React đặc biệt để nhúng nội dung an toàn và tối ưu.

### YouTube
Nhúng video YouTube bằng ID video (phần sau `v=`).

```jsx
<YouTube id="dQw4w9WgXcQ" title="Tên video (tùy chọn)" />
```

### TikTok
Nhúng video TikTok bằng ID video.

```jsx
<TikTok id="7329584274928422177" />
```

### Spotify
Nhúng bài hát, album hoặc playlist từ Spotify.

```jsx
// Nhúng bài hát (Track)
<Spotify uri="spotify:track:4cOdK2wGLETKBW3PvgPWqT" type="track" />

// Nhúng Playlist
<Spotify uri="37i9dQZF1DXcBWIGoYBM5M" type="playlist" />
```

### Twitter (X)
Nhúng Tweet bằng ID.

```jsx
<Tweet id="1765432109876543210" />
```

### Nhúng Iframe Khác (Chung)
Nhúng bất kỳ nội dung nào hỗ trợ iframe (Google Maps, Figma, CodePen...).

```jsx
<Embed 
  src="https://codepen.io/your-pen/embed/preview" 
  height={500} 
  title="CodePen Example" 
/>
```

## 3. Các Component Khác

### Callout (Thông báo)
Dùng để làm nổi bật thông tin.

```jsx
<Callout type="info" title="Thông tin">
  Đây là thông tin bổ sung.
</Callout>

<Callout type="warning" title="Cảnh báo">
  Hãy cẩn thận khi thực hiện bước này.
</Callout>

<Callout type="danger" title="Nguy hiểm">
  Hành động này không thể hoàn tác.
</Callout>
```

### Code Snippet
Hiển thị code với syntax highlighting.

```jsx
<CodeSnippet language="typescript" title="main.ts">
  console.log("Hello World");
</CodeSnippet>
```

### Image Gallery
Hiển thị bộ sưu tập ảnh.

```jsx
<ImageGallery 
  images={[
    { src: "/images/posts/img1.jpg", alt: "Mô tả 1" },
    { src: "/images/posts/img2.jpg", alt: "Mô tả 2" }
  ]} 
/>
```

### Sketchfab (3D Model)
Nhúng mô hình 3D từ Sketchfab.

```jsx
<Sketchfab id="3d-model-id" />
```

### Nút Mua Hàng / Download

```jsx
<BuyButton productId="prod_123" price={19.99} />
<SecureDownloadButton fileKey="my-file.zip" label="Download Source Code" />
```
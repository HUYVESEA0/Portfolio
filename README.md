# Portfolio Website

Đây là website portfolio cá nhân được xây dựng với HTML, CSS và JavaScript thuần.

## Tính năng

- **Responsive Design**: Tương thích với tất cả các thiết bị (desktop, tablet, mobile)
- **Modern UI/UX**: Thiết kế hiện đại, clean và chuyên nghiệp
- **Smooth Animations**: Hiệu ứng mượt mà và tự nhiên
- **Interactive Elements**: Các thành phần tương tác thân thiện với người dùng
- **Contact Form**: Form liên hệ với validation
- **Social Media Links**: Liên kết đến các mạng xã hội

## Cấu trúc

```
Portfolio/
├── index.html          # Trang chính
├── styles.css          # File CSS chính
├── script.js           # JavaScript functionality
└── README.md           # Tài liệu hướng dẫn
```

## Các phần chính

1. **Navigation Bar**: Menu điều hướng với hiệu ứng hover
2. **Hero Section**: Phần giới thiệu với gradient background
3. **About Section**: Thông tin cá nhân và thống kê
4. **Skills Section**: Kỹ năng được phân loại theo Frontend, Backend, Tools
5. **Projects Section**: Showcase các dự án với hover effects
6. **Contact Section**: Form liên hệ và thông tin liên lạc
7. **Footer**: Thông tin bản quyền

## Cách sử dụng

1. **Cập nhật thông tin cá nhân**:
   - Thay đổi tên, thông tin liên hệ trong file `index.html`
   - Cập nhật ảnh avatar (thay thế placeholder image)
   - Điều chỉnh nội dung về bản thân

2. **Thêm dự án**:
   - Cập nhật section `.projects-grid` trong `index.html`
   - Thêm ảnh dự án và thông tin mô tả
   - Cập nhật links đến demo và source code

3. **Tùy chỉnh màu sắc**:
   - Thay đổi biến CSS trong file `styles.css`
   - Primary color: `#4F46E5`
   - Gradient colors có thể thay đổi trong `.hero` section

4. **Thêm kỹ năng mới**:
   - Cập nhật `.skill-items` trong từng category
   - Sử dụng Font Awesome icons

## Customization

### Thay đổi màu chủ đạo
```css
/* Tìm và thay thế #4F46E5 bằng màu bạn muốn */
.nav-logo { color: #YOUR_COLOR; }
.btn-primary { background-color: #YOUR_COLOR; }
/* ... */
```

### Thêm hiệu ứng dark mode
Uncomment dòng cuối trong `script.js`:
```javascript
createThemeToggle();
```

### Tùy chỉnh font chữ
Thay đổi Google Fonts import trong `index.html` và cập nhật CSS:
```css
body {
    font-family: 'Your-Font', sans-serif;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Tối ưu hóa hình ảnh
- Sử dụng CDN cho icons và fonts
- Minify CSS/JS cho production
- Lazy loading cho hình ảnh (có thể thêm)

## Deployment

### 🚀 GitHub Pages (Khuyến nghị)

1. **Tạo repository trên GitHub**
2. **Cập nhật package.json** với thông tin GitHub của bạn
3. **Push code lên GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git branch -M main
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```
4. **Bật GitHub Pages** trong Settings > Pages
5. **Chọn source:** Deploy from branch `main`

📖 **Chi tiết:** Xem file `DEPLOY.md`

### Quick Deploy Scripts

```bash
# Linux/Mac
chmod +x deploy.sh
./deploy.sh

# Windows
deploy.bat
```

### Các nền tảng khác
- **Netlify**: Drag & drop thư mục
- **Vercel**: Import từ GitHub
- **Firebase Hosting**: `firebase deploy`

## Todo / Cải tiến

- [ ] Thêm blog section
- [ ] Tích hợp CMS
- [ ] PWA features
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Analytics integration

## License

MIT License - Bạn có thể sử dụng tự do cho mục đích cá nhân và thương mại.

---

**Lưu ý**: Hãy thay thế tất cả thông tin placeholder bằng thông tin thực của bạn trước khi deploy!

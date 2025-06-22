# 🚀 Hướng dẫn Deploy Portfolio lên GitHub Pages

## Bước 1: Tạo Repository trên GitHub

1. Đăng nhập vào GitHub.com
2. Click nút **"New"** để tạo repository mới
3. Đặt tên repository: `portfolio` hoặc `your-username.github.io`
4. Chọn **Public** repository
5. **KHÔNG** tích vào "Add a README file" (vì chúng ta đã có)
6. Click **"Create repository"**

## Bước 2: Cập nhật thông tin GitHub trong package.json

Thay đổi `yourusername` trong package.json thành username GitHub thực của bạn:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_GITHUB_USERNAME/portfolio.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_GITHUB_USERNAME/portfolio/issues"
  },
  "homepage": "https://YOUR_GITHUB_USERNAME.github.io/portfolio"
}
```

## Bước 3: Push code lên GitHub

Mở terminal trong thư mục Portfolio và chạy các lệnh sau:

```bash
# Thêm remote origin (thay YOUR_GITHUB_USERNAME bằng username của bạn)
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/portfolio.git

# Đổi tên branch chính thành main (nếu cần)
git branch -M main

# Add tất cả files
git add .

# Commit đầu tiên
git commit -m "Initial commit: Portfolio website"

# Push lên GitHub
git push -u origin main
```

## Bước 4: Bật GitHub Pages

1. Vào repository trên GitHub
2. Click tab **"Settings"**
3. Scroll xuống phần **"Pages"** (bên trái)
4. Trong **"Source"**, chọn **"Deploy from a branch"**
5. Chọn branch **"main"** và folder **"/ (root)"**
6. Click **"Save"**

## Bước 5: Kiểm tra website

- GitHub sẽ build và deploy website trong vài phút
- Website sẽ có địa chỉ: `https://YOUR_GITHUB_USERNAME.github.io/portfolio`
- Bạn có thể xem status trong tab **"Actions"**

## 🛠️ Scripts hữu ích

Sau khi setup xong, bạn có thể sử dụng:

```bash
# Chạy website local để test
npm start

# Deploy lên GitHub Pages (sau khi đã setup)
npm run deploy
```

## 🔄 Cập nhật website

Khi bạn muốn cập nhật website:

```bash
# Thay đổi code...
git add .
git commit -m "Update portfolio content"
git push origin main
```

GitHub Pages sẽ tự động build lại website sau vài phút.

## 📝 Lưu ý quan trọng

1. **Repository phải là Public** để sử dụng GitHub Pages miễn phí
2. **File chính phải tên là `index.html`** (đã có)
3. **Đường dẫn ảnh** nên sử dụng relative paths
4. **Domain tùy chỉnh** có thể setup trong Settings > Pages

## 🚨 Troubleshooting

**Nếu website không hiển thị:**
- Kiểm tra tab Actions xem có lỗi build không
- Đảm bảo branch và folder settings đúng
- Chờ 5-10 phút để GitHub build

**Nếu CSS/JS không load:**
- Kiểm tra đường dẫn trong index.html
- Đảm bảo files không bị gitignore

## 🎉 Hoàn thành!

Website portfolio của bạn giờ đã live trên internet! Share link với mọi người:
`https://YOUR_GITHUB_USERNAME.github.io/portfolio`

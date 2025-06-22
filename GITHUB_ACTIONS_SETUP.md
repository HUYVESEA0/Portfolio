# 🔧 GitHub Actions Setup Guide

Để các GitHub Actions hoạt động, bạn cần setup một số secrets và integrations:

## 1. 📊 WakaTime Integration Setup

### Bước 1: Tạo WakaTime Account
1. Truy cập [wakatime.com](https://wakatime.com)
2. Đăng ký account miễn phí
3. Cài đặt WakaTime extension cho VS Code:
   - Mở VS Code
   - Tìm "WakaTime" trong Extensions
   - Cài đặt và nhập API key khi được yêu cầu

### Bước 2: Lấy WakaTime API Key
1. Đăng nhập WakaTime
2. Vào [Settings > API Key](https://wakatime.com/api-key)
3. Copy API key

### Bước 3: Thêm Secrets vào GitHub
1. Vào repository GitHub: `https://github.com/HUYVESEA0/Portfolio`
2. Click **Settings** tab
3. Click **Secrets and variables** > **Actions**
4. Click **New repository secret**
5. Thêm 2 secrets:

   **Secret 1:**
   - Name: `WAKATIME_API_KEY`
   - Value: [API key từ WakaTime]

   **Secret 2:**
   - Name: `GH_TOKEN`
   - Value: [GitHub Personal Access Token]

### Bước 4: Tạo GitHub Personal Access Token
1. Vào [GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Đặt tên: `Portfolio Auto Update`
4. Chọn scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click **Generate token**
6. Copy token và paste vào `GH_TOKEN` secret

## 2. 🐍 Snake Animation Setup

Snake animation sẽ tự động hoạt động sau khi bạn push code lên GitHub. Không cần setup thêm gì!

## 3. 🔄 Auto-update README Setup

Tự động hoạt động, không cần setup thêm.

## 4. ✅ Verification Steps

### Test WakaTime Integration
1. Code một chút trong VS Code (với WakaTime extension)
2. Chờ vài phút để WakaTime ghi nhận
3. Kiểm tra [WakaTime dashboard](https://wakatime.com/dashboard)

### Test GitHub Actions
1. Push code lên GitHub
2. Vào tab **Actions** trong repository
3. Kiểm tra các workflows:
   - 🟢 **Snake**: Tạo snake animation
   - 🟢 **Waka Readme**: Cập nhật stats
   - 🟢 **Update README**: Auto-update timestamp

### Test Results
Sau khi setup thành công:
- ✅ WakaTime stats sẽ tự động cập nhật trong README
- ✅ Snake animation sẽ hiển thị tại cuối README
- ✅ Timestamp sẽ tự động cập nhật

## 🎯 Timeline

- **Ngay lập tức**: Snake animation và auto-update
- **Sau 1-2 giờ**: WakaTime bắt đầu thu thập data
- **Sau 1 ngày**: Đủ data để hiển thị stats đẹp

## 🐛 Troubleshooting

### WakaTime không hoạt động?
- Kiểm tra API key đã đúng chưa
- Kiểm tra WakaTime extension đã active trong VS Code
- Thử restart VS Code

### GitHub Actions bị lỗi?
- Kiểm tra Secrets đã thêm đúng chưa
- Kiểm tra GitHub token còn hạn không
- Xem logs trong tab Actions

### Snake animation không hiển thị?
- Chờ workflow chạy xong (vào tab Actions)
- Kiểm tra branch `output` đã được tạo

---

🎉 **Sau khi setup xong, profile GitHub của bạn sẽ trở nên cực kỳ ấn tượng với auto-updating stats!**

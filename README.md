### Hướng dẫn chạy dự án

# Yêu cầu:

- Node: 20.16.0
- Yarn
- Visual Studio Code
- Visual Studio
- SQL Server
- SSMS

# Lấy dự án về máy

Clone dự án từ github về (Có thể chọn 1 trong 2 câu lệnh sau):

```
git clone https://github.com/thawmisntme4081/catering-online.git
```

hoặc

```
git clone git@github.com:thawmisntme4081/catering-online.git
```

1. FrontEnd

```
cd frontend
yarn install
yarn dev
```

2. BackEnd

```
cd backend
dotnet restore
dotnet ef database update
```

- Import data vào SSMS
- Tạo file appsettings.json

```
dotnet run watch
```

3. Đăng nhập

- Tk admin
  email: admin@gmail.com
  password: admin123

- Tk caterer: tất cả các caterers đều có password là "caterers"
- Tk customer: tự đăng ký và đăng nhập

4. Test API trên swagger: Đối với những api có ổ khóa

- Cần chạy api login trước để lấy token
- Bấm vào ổ khóa và nhập "Bearer + <token>"
- Bấm "Authorize"

**Lưu ý**

- Không code trên nhánh main. Cần checkout sang nhánh của mình (Ví dụ: feature/thanh)
- Trước khi làm task mới luôn cập nhật nhánh main và merge vào nhánh của mình

```
git fetch origin main --rebase
```

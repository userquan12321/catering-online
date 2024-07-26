### Hướng dẫn chạy dự án

# Yêu cầu:

- Node: 20.2.0
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
dotnet run watch
```

- Import data vào SSMS

**Lưu ý**

- Không code trên nhánh main. Cần checkout sang nhánh của mình (Ví dụ: feature/Thanh)
- Trước khi làm task mới luôn cập nhật nhánh main và merge vào nhánh của mình

```
git fetch origin main --rebase
```

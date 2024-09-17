# Bookstore API

Bu proje, basit bir kitap mağazası için RESTful API sağlar. Kitapları listeleyebilir, detaylarını görebilir, ekleyebilir, güncelleyebilir ve silebilirsiniz.

## İçindekiler

- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Testler](#testler)

## Kurulum

### Gereksinimler

- Node.js
- MySQL
- Web sunucusu (Apache, Nginx, vb.)

### Adımlar

1. **Proje Dosyalarını İndirin**

   ```bash
   git clone https://github.com/Deryababul/book_api_nodejs.git
   cd book_api_nodejs

2. **Bağımlılıkları Yükleyin**
   ```bash
    npm install
    npm install express  mysql2 dotenv 
    npm install -g nodemon

3. **.env Dosyasını Oluşturun**
   ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=book_db_nodejs
    API_KEY=your_secret_api_key
    PORT = 5000
4. **Veritabanı Yapılandırması**
   ```bash
    CREATE DATABASE book_db_nodejs;

5. **Veritabanını Oluşturun**
   ```bash
    CREATE TABLE books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        isbn VARCHAR(13) UNIQUE,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
6. **API Anahtarını Ayarlayın**
    .env de bulunan apiKey değişkeninin your_secret_api_key değerini kendi API anahtarınız ile değiştirin. Postman'de header kısmına X-API-Key => your_secret_api_key şeklinde ekleme yapın.

7. **Uygulamayı Başlatın**
   ```bash
    npm start

## Kullanım

### API Kullanımı
    {{URL}} => http://localhost/api/books
    - Kitap Listeleme (GET {{URL}}) 
    - Kitap Detayı (GET {{URL}}/{id})
    - Kitap Ekleme (POST {{URL}})
    - Kitap Güncelleme (PUT {{URL}}/{id})
    - Kitap Silme (DELETE {{URL}}/{id})

## Testler
1. **Test bağımlılıklarını yükleyin**
    ```bash
    npm install --save-dev jest
    npm install mock-req-res --save-dev

2. **Testleri çalıştırın**
    ```bash
    npm test

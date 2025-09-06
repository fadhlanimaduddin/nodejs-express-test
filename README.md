# Node.js Express + PostgreSQL CRUD + Auth + Search API

Project ini adalah implementasi **CRUD Rest API** menggunakan **Node.js (Express)** dengan **PostgreSQL** sebagai database, ditambah:
- **JWT Authentication** (login + protected routes)
- **CRUD User** (database PostgreSQL)
- **Search API** berdasarkan `name`, `nim`, dan `ymd` (data real-time dari [dataset](https://bit.ly/48ejMhW))

---

## Teknologi
- Node.js + Express
- PostgreSQL
- JWT (JSON Web Token)
- Helmet, CORS, Morgan (security + logging)
- Axios (fetch data eksternal)

---

## Setup & Running

### 1. Clone repo
```bash
git clone https://github.com/fadhlanimaduddin/nodejs-express-test.git
cd nodejs-express-test
```

### 2️. Install dependencies
```bash
npm install
```

### 3️. Setup PostgreSQL
Buat database (misalnya `testdb`) lalu buat tabel `users`:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### 4️. Konfigurasi environment
Buat file `.env` di root project seperti pada .env.example

### 5️. Run server
```bash
npm run dev
```

Server akan berjalan di [http://localhost:3000](http://localhost:3000)

---

## Endpoint API

### Auth
- `POST /api/auth/register` → register user baru
- `POST /api/auth/login` → login, return JWT

### CRUD Users (protected)
- `GET /api/users` → list semua user
- `GET /api/users/:id` → detail user yang dipilih
- `POST /api/users` → tambah user
- `PUT /api/users/:id` → update user
- `DELETE /api/users/:id` → hapus user

### Search (protected, real-time from external data)
- `GET /api/search/name?name=Turner Mia`
- `GET /api/search/nim?nim=9352078461`
- `GET /api/search/ymd?ymd=20230405`

---

## Testing dengan Postman
1. Login → dapatkan token JWT.
2. Tambahkan header pada setiap request protected:
   ```
   Authorization: Bearer <token>
   ```
3. Import collection Postman dari file `postman_collection.json`.

---

## Catatan
- Gunakan `helmet` dan `cors` untuk security.
- Semua request ke endpoint **CRUD Users** dan **Search** harus lewat autentikasi login.
- Data search selalu diambil langsung (real-time) dari dataset eksternal.

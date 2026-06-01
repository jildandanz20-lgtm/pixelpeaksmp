# 🎮 PixelPeak SMP — Website

Website resmi server Minecraft PixelPeak SMP.
**Stack:** Next.js 14 · Prisma · PostgreSQL (Railway) · Clerk Auth · Vercel

---

## 🚀 Setup dari Nol (Ikuti Urutan Ini!)

### 1. Install Node.js
Download dan install Node.js versi **18 atau 20** dari:
👉 https://nodejs.org

Cek versi setelah install:
```bash
node -v   # harus v18+ atau v20+
npm -v
```

---

### 2. Clone / Download Project
```bash
# Kalau pakai Git
git clone https://github.com/USERNAME/pixelpeaksmp.git
cd pixelpeaksmp

# Kalau tidak pakai Git, extract zip lalu masuk foldernya
cd pixelpeaksmp
```

---

### 3. Install Dependencies
```bash
npm install
```

---

### 4. Setup Database di Neon

1. Buka https://neon.tech → **Sign Up** pakai GitHub
2. Klik **New Project**
   - Project name: `pixelpeaksmp`
   - Region: **Asia Pacific (Singapore)**
3. Klik **Create Project**
4. Di dashboard, klik **Connection Details**
5. Kamu butuh **DUA** URL berbeda:

**DATABASE_URL** → pakai **Pooled connection**
- Di dropdown pilih **Pooled connection**
- Copy string → ada `-pooler` di hostname-nya:
  ```
  postgresql://USER:PASS@ep-xxxx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
  ```

**DIRECT_URL** → pakai **Direct connection**
- Di dropdown pilih **Direct connection**
- Copy string → tanpa `-pooler`:
  ```
  postgresql://USER:PASS@ep-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
  ```

> ⚠️ Penting: `DATABASE_URL` untuk query (pakai pooler), `DIRECT_URL` untuk migration/seed (direct)

---

### 5. Setup Clerk Auth

1. Buka https://clerk.com → Sign Up gratis
2. Klik **Create Application**
   - Nama: `PixelPeak SMP`
   - Aktifkan **Google** dan **Discord** di Social Connections
3. Klik **API Keys** di sidebar, copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → dimulai `pk_test_...`
   - `CLERK_SECRET_KEY` → dimulai `sk_test_...`
4. Setup Webhook (untuk sync user ke DB):
   - Di Clerk Dashboard → **Webhooks** → **Add Endpoint**
   - URL: `https://DOMAIN_KAMU.vercel.app/api/webhook/clerk`
   - Events yang dicentang: `user.created`, `user.updated`, `user.deleted`
   - Copy **Signing Secret** → ini `CLERK_WEBHOOK_SECRET`
5. Aktifkan Google OAuth:
   - Clerk Dashboard → **Social Connections** → **Google** → Enable
6. Aktifkan Discord OAuth:
   - Clerk Dashboard → **Social Connections** → **Discord** → Enable
   - Butuh **Discord Application** di https://discord.com/developers

---

### 6. Buat File .env
```bash
# Copy dari template
cp .env.example .env
```

Buka `.env` dan isi semua nilai:
```env
DATABASE_URL="postgresql://USER:PASS@HOST:PORT/DATABASE?sslmode=require"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
CLERK_SECRET_KEY=sk_test_xxxx
CLERK_WEBHOOK_SECRET=whsec_xxxx

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_IP=play.pixelpeaksmp.id
NEXT_PUBLIC_BEDROCK_PORT=19132
```

---

### 7. Setup Database Schema
```bash
# Push schema ke Railway PostgreSQL
npm run db:push

# Isi data awal (rank packages, coin packages)
npm run db:seed
```

---

### 8. Jalankan di Lokal
```bash
npm run dev
```
Buka browser: **http://localhost:3000** ✅

---

## 📦 Deploy ke Vercel (Hosting Gratis)

### 1. Push ke GitHub
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/pixelpeaksmp.git
git push -u origin main
```

### 2. Deploy di Vercel
1. Buka https://vercel.com → Login pakai GitHub
2. Klik **New Project** → pilih repo `pixelpeaksmp`
3. Di bagian **Environment Variables**, tambahkan semua isi `.env` kamu
4. Klik **Deploy** → tunggu ~2 menit
5. Website live di `https://pixelpeaksmp.vercel.app` 🎉

### 3. Update Webhook Clerk
Setelah dapat URL Vercel, update Clerk Webhook:
- URL: `https://pixelpeaksmp.vercel.app/api/webhook/clerk`

### 4. Update NEXT_PUBLIC_APP_URL
Di Vercel dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_APP_URL` = `https://pixelpeaksmp.vercel.app`

---

## 👑 Set Admin Pertama

Setelah deploy dan login pertama kali:

```bash
# Jalankan di terminal lokal (dengan .env sudah terisi)
npx prisma studio
```

Di Prisma Studio:
1. Klik tabel `users`
2. Cari username kamu
3. Ubah kolom `role` dari `MEMBER` menjadi `ADMIN`
4. Klik **Save** ✅

Atau pakai query langsung:
```sql
UPDATE users SET role = 'ADMIN' WHERE username = 'USERNAME_KAMU';
```

---

## 📁 Struktur Project

```
pixelpeaksmp/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Data awal
├── src/
│   ├── app/
│   │   ├── (auth)/        # Halaman login/register Clerk
│   │   ├── admin/         # Dashboard admin (protected)
│   │   ├── api/
│   │   │   ├── webhook/clerk/  # Sync user Clerk → DB
│   │   │   └── store/purchase/ # API beli item
│   │   ├── dashboard/     # Dashboard member (protected)
│   │   ├── gallery/       # Galeri screenshot
│   │   ├── join/          # Cara join server
│   │   ├── leaderboard/   # Papan peringkat
│   │   ├── store/         # Toko rank & coin
│   │   ├── layout.tsx     # Root layout + Clerk
│   │   └── page.tsx       # Home page
│   ├── components/
│   │   ├── home/          # Hero, Stats, Features
│   │   └── layout/        # Navbar, BottomNav, Footer
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client singleton
│   │   └── utils.ts       # Helper functions
│   └── middleware.ts      # Clerk route protection
├── .env.example           # Template env vars
├── next.config.js
├── tailwind.config.js
├── railway.json           # Config Railway
└── vercel.json            # Config Vercel
```

---

## 🛠️ Perintah Berguna

```bash
npm run dev          # Jalankan lokal (localhost:3000)
npm run build        # Build production
npm run db:push      # Sync schema ke database
npm run db:seed      # Isi data awal
npm run db:studio    # Buka Prisma Studio (GUI database)
npm run db:migrate   # Buat migration baru
```

---

## ❓ Troubleshooting

**Error: DATABASE_URL tidak valid**
→ Pastikan format `postgresql://USER:PASS@HOST:PORT/DB?sslmode=require`

**Error: Clerk key tidak ditemukan**
→ Pastikan `.env` sudah diisi dan tidak ada spasi ekstra

**Login tidak redirect ke dashboard**
→ Cek `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard` di `.env`

**User tidak tersimpan ke database setelah login**
→ Pastikan Clerk Webhook sudah disetup dengan URL yang benar dan events `user.created` dicentang

**Admin page redirect ke home**
→ Set role ADMIN di database via Prisma Studio

---

## 📞 Support

Discord: https://discord.gg/pixelpeaksmp

# 🎯 SATUSUARA - Platform Inovasi & Dukungan Komunitas Indonesia

SatuSuara adalah platform kolaboratif yang menghubungkan para inovator untuk berbagi ide-ide kreatif dan saling memberikan dukungan melalui sistem voting. Kami percaya bahwa inovasi lokal dari desa dan individu memiliki potensi besar untuk membawa perubahan positif. Platform ini memfasilitasi kolaborasi, diskusi, dan implementasi solusi-solusi inovatif dengan cara yang transparan dan inklusif.

![Next.js](https://img.shields.io/badge/Next.js-14.x-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Fitur Utama

- 🔐 Sistem Autentikasi yang Aman
- 💡 Manajemen Inovasi (Create, Read, Update, Delete)
- 🗳️ Sistem Voting & Ranking untuk Inovasi
- 🏘️ Kategori Per Desa & Individu
- 👥 Profil Inovator & Komunitas
- 💬 Komentar & Diskusi Interaktif
- 📊 Dashboard Analytics & Statistik Real-time
- 🔍 Search & Filter Inovasi Lanjutan
- 📱 Responsive Design untuk Semua Device
- 🌓 Dark/Light Mode
- 🛡️ Data Validation & Security
- 🎨 Modern UI/UX dengan Tailwind CSS
- ⚡ Performance Optimization dengan Next.js

## 🎯 Visi Platform

SATUSUARA dirancang untuk memberdayakan inovator lokal dengan memberikan wadah untuk:

**Berbagi Inovasi** - Publikasikan ide-ide cemerlang kamu kepada komunitas yang lebih luas

**Mendapatkan Dukungan** - Kumpulkan votes dan feedback dari para inovator lainnya

**Berkolaborasi** - Terhubung dengan inovator lain untuk mengembangkan ide bersama

**Mempercepat Implementasi** - Gunakan voting sebagai validasi untuk menentukan prioritas inovasi

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x atau lebih tinggi
- npm atau yarn atau pnpm
- Git

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/Ahmad-Yu2up-Ar-Raf/SatuSuara.git
   cd satusuara
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   # atau
   pnpm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   # atau
   pnpm dev
   ```

5. **Buka browser**
   Kunjungi [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

## 👥 Untuk Team Collaborator

Jika kamu bagian dari tim development SATUSUARA, ikuti panduan berikut untuk workflow yang terstruktur.

### Setup Development Environment

1. **Clone dan setup project**
   ```bash
   git clone https://github.com/Ahmad-Yu2up-Ar-Raf/SatuSuara.git
   cd satusuara
   npm install
   ```

2. **Buat development branch baru (JANGAN kerja di branch main)**
   ```bash
   # Format: dev/nama-kamu atau feature/nama-fitur
   git checkout -b dev/nama-kamu
   
   # Contoh:
   git checkout -b dev/john-doe
   git checkout -b feature/voting-system
   git checkout -b fix/authentication-bug
   ```

3. **Setup environment lokal**
   ```bash
   cp .env.example .env.local
   # Update .env.local sesuai konfigurasi lokal kamu
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

### Git Workflow yang Wajib Diikuti

**Sebelum mulai coding:**
```bash
# 1. Pastikan branch development kamu up-to-date dengan main
git checkout main
git pull origin main

# 2. Switch ke branch development kamu
git checkout dev/nama-kamu

# 3. Merge latest changes dari main
git merge main
```

**Saat development:**
```bash
# 1. Buat changes dan test secara menyeluruh
# 2. Commit dengan message yang jelas
git add .
git commit -m "feat: tambah fitur voting system"

# 3. Push ke remote branch kamu
git push origin dev/nama-kamu

# 4. Buat Pull Request (PR) di GitHub
# - Berikan deskripsi yang jelas tentang changes
# - Reference issue/task terkait jika ada
# - Tunggu review dari minimal 1 team member

# 5. Setelah approval, merge ke main
# - Jangan merge sendiri tanpa approval
# - Delete branch setelah merge
```

**Jika ada conflict:**
```bash
# 1. Pull latest main
git checkout main
git pull origin main

# 2. Merge ke branch development kamu
git checkout dev/nama-kamu
git merge main

# 3. Resolve conflicts (lihat file yang conflict)
# 4. Commit merge
git add .
git commit -m "merge: resolve conflicts dengan main"

# 5. Push kembali
git push origin dev/nama-kamu
```

### Commit Message Convention

Gunakan format commit message yang konsisten untuk dokumentasi yang lebih baik:

```
<type>: <subject>

<body>

<footer>
```

**Type yang digunakan:**
- `feat`: Fitur baru
- `fix`: Perbaikan bug
- `docs`: Update dokumentasi
- `style`: Perubahan formatting/styling (bukan logic)
- `refactor`: Refactoring code tanpa mengubah functionality
- `test`: Menambah atau update test
- `chore`: Update dependencies, config, build tools, dll
- `perf`: Improvement performa

**Contoh commit message:**

```bash
# Fitur baru
git commit -m "feat: tambah sistem voting untuk inovasi"

# Bug fix
git commit -m "fix: perbaiki bug vote count tidak update real-time"

# Dokumentasi
git commit -m "docs: update README untuk setup environment"

# Dengan deskripsi lebih detail
git commit -m "feat: tambah filter inovasi berdasarkan kategori

- Tambah filter dropdown di halaman explore
- Update API endpoint untuk support kategori filter
- Add unit tests untuk filter functionality"
```

### Code Review Process

1. **Sebelum create PR**, pastikan:
   - ✅ Semua changes sudah tested secara lokal
   - ✅ Tidak ada console.log atau debug code
   - ✅ Code sudah follow coding standards (lihat section di bawah)
   - ✅ Commit message jelas dan descriptive

2. **Saat create PR**:
   - Berikan judul yang jelas
   - Isi deskripsi dengan detail changes
   - Screenshot/demo jika ada UI changes
   - Reference related issues dengan `#issue-number`

3. **Saat review**:
   - Baca code dengan seksama
   - Berikan constructive feedback
   - Approve atau request changes
   - Minimum 1 approval sebelum merge

### Code Standards

**JavaScript/TypeScript:**
- Gunakan camelCase untuk variables dan functions
- Gunakan PascalCase untuk React components
- Type-safe dengan TypeScript (hindari `any`)
- Max line length: 100 characters
- Use arrow functions untuk anonymous functions

**React Components:**
- Functional components dengan hooks (bukan class components)
- Extract reusable logic ke custom hooks
- Props harus di-type dengan TypeScript
- Gunakan React.memo untuk optimization jika diperlukan

**File Structure:**
```
src/
├── components/          # React components
├── app/                 # Next.js pages dan routes
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript types
├── styles/             # Global styles
└── config/             # Configuration files
```

### Environment Variables

Jangan pernah commit `.env.local` atau file dengan credentials. File `.env.example` sudah di-track dan berisi template variables.

Untuk credentials atau secrets lokal:
- Tanya ke tech lead untuk mendapatkan nilai sebenarnya
- Update `.env.local` secara lokal (file ini sudah di .gitignore)

### Important Rules untuk Team

**DILARANG:**
- ❌ Push langsung ke branch `main`
- ❌ Commit file `.env.local` atau `.env`
- ❌ Merge PR sendiri tanpa approval
- ❌ Leave console.log atau debugging code
- ❌ Commit large binary files

**WAJIB:**
- ✅ Selalu buat branch baru untuk setiap fitur/fix
- ✅ PR harus di-review minimal 1 orang sebelum merge
- ✅ Test feature secara menyeluruh sebelum push
- ✅ Commit message yang jelas dan descriptive
- ✅ Keep branch tetap sync dengan main (merge regularly)
- ✅ Delete branch setelah merge

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   ├── sections/          # Page sections
│   └── navigation/        # Navigation components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
│   ├── api.ts            # API client setup
│   ├── utils.ts          # Helper utilities
│   └── validations/      # Schema validations (Zod)
├── types/                # TypeScript types
│   └── index.ts          # Type definitions
├── styles/               # Global styles
└── config/               # Configuration
    └── constants.ts      # App constants
```

## 💡 Key Features Explained

### Sistem Voting
- Setiap user dapat memberikan satu vote per inovasi
- Real-time update vote count di dashboard
- Ranking inovasi berdasarkan jumlah votes
- Filter ranking berdasarkan periode (harian, mingguan, bulanan)

### Kategori Inovasi
- **Per Desa**: Inovasi komunitas di level desa
- **Individu**: Inovasi personal dari perorangan
- **Kategori Custom**: Pertanian, Teknologi, Pendidikan, Kesehatan, Sosial, dll

### Manajemen Konten
- Form builder untuk submission inovasi
- Upload multiple gambar/video untuk inovasi
- Rich text editor untuk deskripsi detail
- Tagging system untuk categorization
- Draft mode untuk inovasi yang belum published

### Community Engagement
- Komentar dan replies di setiap inovasi
- Like functionality untuk komentar
- User profiles dengan portfolio inovasi
- Follow inovator favorit
- Notification system untuk updates

## 🛡️ Security Features

- JWT authentication
- Input validation & sanitization
- XSS protection
- CSRF protection
- Rate limiting untuk API
- Secure headers (HSTS, CSP, etc)
- Environment variables untuk sensitive data
- Code splitting & bundle optimization

## 🎨 UI/UX Features

- Responsive mobile-first design
- Dark mode support
- Smooth animations & transitions
- Loading states & skeleton screens
- Error handling dengan user-friendly messages
- Toast notifications untuk feedback
- Accessible components (WCAG 2.1 compliant)
- SEO optimized dengan Next.js meta tags

## 📊 Future Roadmap

- [ ] Integration dengan backend API terpadu
- [ ] Email notification system
- [ ] Advanced analytics & insights untuk inovator
- [ ] Export inovasi ke PDF
- [ ] Social media sharing integration
- [ ] Gamification features (badges, leaderboards)
- [ ] Mobile app dengan React Native
- [ ] Multi-language support (i18n)
- [ ] API documentation untuk third-party integration

## 🤝 Contributing

Contributions sangat diterima dari tim. Silakan ikuti Git Workflow dan Code Standards yang sudah ditetapkan di section "Untuk Team Collaborator".

## 📝 License

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Acknowledgments

- Built dengan Next.js, React, dan TypeScript
- UI Components dari Tailwind CSS
- Form validation dengan React Hook Form dan Zod
- Type safety dengan TypeScript
- Icons dari Lucide React

## 📧 Contact & Support

Untuk pertanyaan, feedback, atau masalah teknis:
- Create issue di GitHub repository
- Contact tech lead untuk urgent issues
- Email: support@satusuara.id

---

Dibuat dengan ❤️ untuk mendorong inovasi lokal di Indonesia 🇮🇩
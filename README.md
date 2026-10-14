# Portofolio Reza Jauhari P.

Website portofolio pribadi berbasis React dan Vite. Situs ini memuat profil, keahlian, proyek, sertifikat, tautan demo, dan kontak. Tampilan menggunakan Tailwind CSS v4 serta mendukung tema terang/gelap dan bahasa Indonesia/Inggris.

Repositori: [rezajauhari555-code/portofoliorezajp](https://github.com/rezajauhari555-code/portofoliorezajp)

## Persyaratan

- Git
- Node.js 20.19+ atau 22.12+
- npm

## Menjalankan dari Git

```bash
git clone https://github.com/rezajauhari555-code/portofoliorezajp.git
cd portofoliorezajp
npm install
npm run dev
```

Buka alamat lokal yang ditampilkan Vite di terminal, biasanya `http://localhost:5173`.

## Perintah Proyek

```bash
npm run dev      # Jalankan server pengembangan
npm run lint     # Periksa kode dengan Oxlint
npm run build    # Buat build produksi di folder dist/
npm run preview  # Pratinjau build produksi secara lokal
```

Untuk menguji build produksi:

```bash
npm run build
npm run preview
```

## Mengirim Perubahan ke GitHub

Jika proyek sudah di-clone dari GitHub:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Jika mulai dari folder lokal yang belum terhubung ke remote GitHub:

```bash
git init -b main
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/rezajauhari555-code/portofoliorezajp.git
git push -u origin main
```

Pastikan repository di GitHub sudah dibuat dan akun GitHub memiliki akses push. Jika branch utama repository bernama selain `main`, ganti nama branch pada perintah push sesuai nama tersebut.

## Publikasi ke GitHub Pages

Workflow GitHub Actions pada `.github/workflows/deploy.yml` akan membangun dan menerbitkan situs setiap kali ada push ke branch `main`. Untuk mengaktifkannya:

1. Buka repository di GitHub.
2. Masuk ke **Settings → Pages**.
3. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
4. Push perubahan ke `main`, lalu pantau prosesnya di tab **Actions**.

Setelah workflow berhasil, situs tersedia di [rezajauhari555-code.github.io/portofoliorezajp](https://rezajauhari555-code.github.io/portofoliorezajp/). Build sudah dikonfigurasi untuk subpath repository dan menyertakan fallback agar route seperti `/about` atau `/certificates` tetap bisa dibuka langsung.

## Teknologi

- React
- Vite
- Tailwind CSS v4
- React Router
- React Icons
- Oxlint
# Website Ncing Mantu

Struktur folder:
```
ncing-mantu/
├── index.html      # halaman utama
├── css/style.css   # semua styling
├── js/script.js    # logic carousel produk, keranjang, nav aktif
└── assets/         # semua gambar (logo, maskot, foto produk) asli dari desain
```

## Cara pakai
Buka `index.html` langsung di browser, atau jalankan local server kalau mau (contoh pakai VSCode Live Server extension) supaya path gambar relatif dimuat dengan rapi.

## Catatan
- Harga semua produk diasumsikan **Rp 35.000** (di desain cuma tertulis "35").
- Deskripsi "Manisan Mangga" ditulis manual karena tidak ada di desain asli — silakan sesuaikan di `index.html` (cari `Manisan Mangga` di array `PRODUCTS` pada `js/script.js`).
- Nomor WA & alamat masih placeholder dari desain (082X-12XX-X032, dll) — ganti di `index.html` bagian `#kontak`.
- QR code pembayaran masih bingkai kosong (sama seperti desain asli) — tinggal taruh gambar QRIS asli di dalam `.qr-frame` kalau sudah ada.

export interface Item {
  id: number
  waktu: string
  kategori: string
  nama: string
  waybill: string
  kode: string
  foto?: string
}

export interface AppUser {
  id: number
  nama: string
  email: string
  aktif: boolean
  stasiun: string
  role: 'Admin' | 'User'
}

/* ─── Database Scanner ─── */
export const scannerItems: Item[] = [
  { id: 1,  waktu: '21/11/26, 15.49', kategori: 'Perawatan Tubuh',  nama: 'Sutra Pelumas Gel Lubricant 30ml',                         waybill: '',             kode: '',        foto: 'https://picsum.photos/seed/lubricant/200/200' },
  { id: 2,  waktu: '21/11/26, 15.49', kategori: 'Alat Tulis',       nama: 'Karet Gelang Merah Tahan Panas 100g',                     waybill: '',             kode: '',        foto: 'https://picsum.photos/seed/rubberband/200/200' },
  { id: 3,  waktu: '21/11/26, 15.49', kategori: 'Alat Pertukangan', nama: 'Eceran Serabut Kelapa Merah Alami 1kg',                   waybill: '',             kode: '',        foto: 'https://picsum.photos/seed/coconutfiber/200/200' },
  { id: 4,  waktu: '21/11/26, 15.49', kategori: 'Kebersihan',       nama: 'Racun Tikus Ampuh Super Sachet 10g',                       waybill: '',             kode: '',        foto: 'https://picsum.photos/seed/ratpoison/200/200' },
  { id: 5,  waktu: '21/11/26, 15.47', kategori: 'Fashion',          nama: 'Kaos Polos Cotton Combed 30s Hitam',                      waybill: 'JY2456789012', kode: 'SCN-005', foto: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop&auto=format' },
  { id: 6,  waktu: '21/11/26, 15.46', kategori: 'Elektronik',       nama: 'Earphone TWS Bluetooth 5.3 Stereo Bass',                  waybill: 'JY2456789013', kode: 'SCN-006', foto: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop&auto=format' },
  { id: 7,  waktu: '21/11/26, 15.44', kategori: 'Kosmetik',         nama: 'Lipstik Matte Tahan Lama 24 Jam',                         waybill: '',             kode: 'SCN-007', foto: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop&auto=format' },
  { id: 8,  waktu: '21/11/26, 15.43', kategori: 'Makanan',          nama: 'Keripik Kentang Pedas Manis 200g',                        waybill: 'JY2456789014', kode: '',        foto: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop&auto=format' },
  { id: 9,  waktu: '21/11/26, 15.41', kategori: 'Minuman',          nama: 'Kopi Sachet Robusta 3in1 isi 20pcs',                      waybill: '',             kode: '',        foto: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200&h=200&fit=crop&auto=format' },
  { id: 10, waktu: '21/11/26, 15.40', kategori: 'Dapur',            nama: 'Spatula Silikon Anti Panas Set 3pcs',                     waybill: 'JY2456789015', kode: 'SCN-010', foto: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&auto=format' },
  { id: 11, waktu: '21/11/26, 15.38', kategori: 'Mainan',           nama: 'Boneka Beruang Jumbo 60cm',                               waybill: '',             kode: '',        foto: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=200&h=200&fit=crop&auto=format' },
  { id: 12, waktu: '21/11/26, 15.35', kategori: 'Olahraga',         nama: 'Matras Yoga Anti Slip 6mm',                               waybill: 'JY2456789016', kode: 'SCN-012', foto: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&auto=format' },
  { id: 13, waktu: '21/11/26, 15.33', kategori: 'Fashion',          nama: 'Celana Jeans Slim Fit Pria Size 32',                      waybill: '',             kode: '',        foto: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop&auto=format' },
  { id: 14, waktu: '21/11/26, 15.30', kategori: 'Elektronik',       nama: 'Powerbank 20000mAh Fast Charging',                        waybill: 'JY2456789017', kode: 'SCN-014', foto: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop&auto=format' },
  { id: 15, waktu: '21/11/26, 15.28', kategori: 'Kebersihan',       nama: 'Sabun Cuci Piring Cair 800ml Jeruk Nipis',                waybill: '',             kode: '',        foto: 'https://picsum.photos/seed/dishsoap/200/200' },
  { id: 16, waktu: '21/11/26, 15.26', kategori: 'Fashion',          nama: 'Sepatu Sneakers Putih Running Sport',                     waybill: 'JY2456789018', kode: 'SCN-016', foto: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop&auto=format' },
  { id: 17, waktu: '21/11/26, 15.24', kategori: 'Alat Tulis',       nama: 'Buku Tulis A5 isi 38 Lembar',                             waybill: '',             kode: '',        foto: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=200&fit=crop&auto=format' },
  { id: 18, waktu: '21/11/26, 15.22', kategori: 'Elektronik',       nama: 'Headphone Over-Ear Wireless ANC',                         waybill: 'JY2456789019', kode: 'SCN-018', foto: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop&auto=format' },
]

/* ─── Tugas Repack ─── */
export const repackItems: Item[] = [
  { id: 1,  waktu: '21/11/26, 15.41', kategori: 'Kebersihan',           nama: 'Citrun Bubuk Pembersih Kerak 1 Kg',                       waybill: 'JY2352805722', kode: '',        foto: 'https://picsum.photos/seed/citric/200/200' },
  { id: 2,  waktu: '21/11/26, 15.41', kategori: 'Kebersihan',           nama: 'Selasi Cloth Stain Remover Serbaguna 1000g',              waybill: 'JY2318578222', kode: '',        foto: 'https://picsum.photos/seed/stainremover/200/200' },
  { id: 3,  waktu: '21/11/26, 15.40', kategori: 'Aksesoris Tablet',     nama: 'AP King Sarung Jari Gaming Anti Keringat',                waybill: 'JY1196118333', kode: '',        foto: 'https://picsum.photos/seed/fingercover/200/200' },
  { id: 4,  waktu: '21/11/26, 15.33', kategori: 'Celana Pendek Wanita', nama: 'Celana Pendek Wanita Salur Garis Putih Casual All Size',  waybill: 'JY2301228332', kode: '',        foto: 'https://picsum.photos/seed/shorts/200/200' },
  { id: 5,  waktu: '21/11/26, 15.30', kategori: 'Elektronik',           nama: 'Kabel Data Type-C 1.5m Nylon Braided',                    waybill: 'JY2352805733', kode: 'RPK-005', foto: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=200&h=200&fit=crop&auto=format' },
  { id: 6,  waktu: '21/11/26, 15.27', kategori: 'Makanan',              nama: 'Biskuit Cokelat Kaleng 500g',                             waybill: 'JY2352805744', kode: 'RPK-006', foto: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop&auto=format' },
  { id: 7,  waktu: '21/11/26, 15.24', kategori: 'Fashion',              nama: 'Sandal Jepit Wanita Motif Bunga',                         waybill: 'JY2352805755', kode: '',        foto: 'https://picsum.photos/seed/sandal/200/200' },
  { id: 8,  waktu: '21/11/26, 15.21', kategori: 'Kosmetik',             nama: 'Serum Vitamin C Brightening 20ml',                        waybill: 'JY2352805766', kode: 'RPK-008', foto: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop&auto=format' },
  { id: 9,  waktu: '21/11/26, 15.18', kategori: 'Olahraga',             nama: 'Botol Minum Sport 1L BPA Free',                           waybill: 'JY2352805777', kode: '',        foto: 'https://picsum.photos/seed/waterbottle/200/200' },
  { id: 10, waktu: '21/11/26, 15.15', kategori: 'Dapur',                nama: 'Toples Kaca Kedap Udara 1L',                              waybill: 'JY2352805788', kode: 'RPK-010', foto: 'https://picsum.photos/seed/glassjar/200/200' },
  { id: 11, waktu: '21/11/26, 15.12', kategori: 'Alat Tulis',           nama: 'Pulpen Gel Hitam 0.5mm isi 12',                           waybill: 'JY2352805799', kode: '',        foto: 'https://picsum.photos/seed/pen/200/200' },
  { id: 12, waktu: '21/11/26, 15.09', kategori: 'Mainan',               nama: 'Puzzle Kayu Edukasi Anak 3+',                             waybill: 'JY2352805800', kode: 'RPK-012', foto: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=200&h=200&fit=crop&auto=format' },
]

/* ─── Users ─── */
export const users: AppUser[] = [
  { id: 1, nama: 'RIZKA FAIZA HAMIM',    email: 'hamimrizka17@gmail.com',       aktif: true,  stasiun: 'JAT GATEWAY', role: 'User'  },
  { id: 2, nama: 'Dani Apr',             email: 'daniapriyanto21@gmail.com',    aktif: true,  stasiun: 'JAT GATEWAY', role: 'Admin' },
  { id: 3, nama: 'Fiki Amalia',          email: 'fikiamalia552@gmail.com',      aktif: true,  stasiun: 'JAT GATEWAY', role: 'Admin' },
  { id: 4, nama: 'Rifki Pratama',        email: 'wijanarkoar2720@gmail.com',    aktif: true,  stasiun: 'JAT GATEWAY', role: 'User'  },
  { id: 5, nama: 'Andhika Anas Maulana', email: 'andhikaanasmaulana@gmail.com', aktif: true,  stasiun: 'JAT GATEWAY', role: 'Admin' },
  { id: 6, nama: 'Aris Aprian Hadi',     email: 'arisaprian24@gmail.com',       aktif: true,  stasiun: 'JAT GATEWAY', role: 'Admin' },
  { id: 7, nama: 'SURIYA RAMADON',       email: 'suriya.ramadon@jnt.co.id',     aktif: true,  stasiun: 'JAT GATEWAY', role: 'Admin' },
  { id: 8, nama: 'Bagus Setiawan',       email: 'bagus.setiawan@jnt.co.id',     aktif: false, stasiun: 'JAT GATEWAY', role: 'User'  },
]
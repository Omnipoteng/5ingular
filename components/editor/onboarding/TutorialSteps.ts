export interface TutorialStep {
  targetSelector?: string; // CSS selector of the target element to highlight
  title: string;
  subtitle?: string;
  description: string;
  placement: "top" | "bottom" | "left" | "right" | "center";
  interactive?: boolean;
  interactiveType?: "click-tool-text" | "upload-image" | "none";
  buttonText?: string;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    title: "Selamat Datang di 5ingular Editor!",
    subtitle: "Creative Canvas Workspace",
    description: "Mari ikuti tur singkat (10 langkah) untuk memahami workspace kreatif premium kami secara interaktif. Hanya butuh waktu 1-2 menit!",
    placement: "center"
  },
  {
    targetSelector: '[data-tour="canvas"]',
    title: "Kanvas Desain Utama",
    subtitle: "Ruang Kerja Kreatif Anda",
    description: "Ini adalah area kerja utama Anda. Kanvas putih di tengah adalah lembar desain, sedangkan area luar yang berwarna gelap berfungsi sebagai workspace luas tempat Anda meletakkan aset pendukung.",
    placement: "right"
  },
  {
    targetSelector: '[data-tour="tool-text"]',
    title: "Langkah Interaktif: Pilih Text Tool",
    subtitle: "Menulis Tipografi Kreatif",
    description: "Silakan KLIK tombol Text Tool (ikon 'T') di toolbar kiri ini untuk mengaktifkannya. Tombol 'Lanjut' di popover ini akan terbuka setelah Anda mengkliknya!",
    placement: "right",
    interactive: true,
    interactiveType: "click-tool-text"
  },
  {
    targetSelector: '[data-tour="tool-rect"]',
    title: "Membuat Bentuk Vektor",
    subtitle: "Rectangle, Circle, & Line Tools",
    description: "Di bawah Text Tool, Anda memiliki Rectangle, Circle, dan Line. Klik salah satunya, lalu klik-dan-drag di kanvas untuk menggambar bentuk baru dengan ukuran dinamis.",
    placement: "right"
  },
  {
    targetSelector: '[data-tour="tool-image"]',
    title: "Langkah Interaktif: Unggah Gambar",
    subtitle: "Tambahkan Foto & Ilustrasi",
    description: "Silakan KLIK tombol Image Tool ini, lalu pilih satu berkas gambar dari komputer Anda. Setelah gambar berhasil dimuat ke kanvas, tombol 'Lanjut' akan otomatis aktif!",
    placement: "right",
    interactive: true,
    interactiveType: "upload-image"
  },
  {
    targetSelector: '[data-tour="layers-panel"]',
    title: "Pengelolaan Layer Pro",
    subtitle: "Layers Panel di Sisi Kiri",
    description: "Setiap teks, bentuk, atau gambar yang Anda buat otomatis terdaftar sebagai layer di sini. Anda dapat mengubah urutan tumpukan layer, mengunci posisinya (lock), atau menyembunyikannya.",
    placement: "right"
  },
  {
    targetSelector: '[data-tour="properties-panel"]',
    title: "Atur Detail Objek",
    subtitle: "Right Properties Panel",
    description: "Ketika Anda memilih sebuah objek di kanvas, panel kanan ini akan menampilkan propertinya. Anda dapat mengatur warna fill, ketebalan stroke, tingkat transparansi (opacity), serta rotasi objek.",
    placement: "left"
  },
  {
    targetSelector: '[data-tour="zoom-controls"]',
    title: "Zooming & Navigasi Kanvas",
    subtitle: "Kontrol Workspace",
    description: "Gunakan tombol Zoom (+ / -) di sini atau gunakan scroll roda mouse untuk memperbesar/memperkecil tampilan kanvas. Tekan tombol Alt + Drag di kanvas (atau gunakan Hand tool) untuk menggeser layar (panning).",
    placement: "bottom"
  },
  {
    targetSelector: '[data-tour="export-button"]',
    title: "Ekspor Hasil Desain Anda",
    subtitle: "Unduh Gambar Berkualitas Tinggi",
    description: "Pekerjaan Anda tersimpan secara otomatis ke LocalStorage. Klik tombol Export di sini untuk mengunduh desain Anda dalam format PNG transparan, JPG, atau WEBP dengan resolusi tinggi.",
    placement: "bottom"
  },
  {
    title: "Selamat! Anda Siap Berkreasi",
    subtitle: "Tur Selesai",
    description: "Kini Anda telah menguasai dasar-dasar 5ingular Editor. Semua fitur siap Anda gunakan untuk mendesain karya terbaik Anda sekarang!",
    placement: "center",
    buttonText: "Mulai Mendesain"
  }
];

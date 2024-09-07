//! Tema yönetim sınıfı
class ThemeMode {
  theme: string;
  //! Yerel depolamada tema varsa onu yükler, yoksa varsayılan olarak "light" temasını ayarlar
  constructor() {
    const theme: string | null = localStorage.getItem("theme");
    this.theme = theme ? JSON.parse(theme) : "light";
  }
  //! Tema değiştirme metodu
  changeTheme(): void {
    //! Mevcut tema "light" ise "dark" yapar, "dark" ise "light" yapar
    this.theme = this.theme === "light" ? "dark" : "light";
    //! Yeni temayı yerel depolamaya kaydeder
    localStorage.setItem("theme", JSON.stringify(this.theme));
  }
  //! Geçerli temayı döndüren metot
  getTheme(): string {
    return this.theme;
  }
}
export default ThemeMode;
document.addEventListener("DOMContentLoaded", function () {
    const openModalButtons = document.querySelectorAll(".open-modal");
    const closeModalButtons = document.querySelectorAll(".close-modal");
    const modals = document.querySelectorAll(".modal");
    const clock = document.querySelector(".clock");
    const buttons = document.querySelectorAll(".container .btn");
    const hariButtons = document.querySelectorAll(".modal .hari-btn");
    let activeTable = null;
 // === KODE KALENDER ===
 const months = ["JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI", "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"];

 let today = new Date();
 let currentMonth = months[today.getMonth()];
 let currentDate = today.getDate();

 let monthElement = document.getElementById("month");
 let dateElement = document.getElementById("date");

 // Cek apakah elemen ditemukan sebelum diubah
 if (monthElement) {
     monthElement.textContent = currentMonth;
 } else {
     console.error("Elemen #month tidak ditemukan!");
 }

 if (dateElement) {
     dateElement.textContent = currentDate;
 } else {
     console.error("Elemen #date tidak ditemukan!");
 }

 // Buka modal tertentu sesuai tombol yang diklik
 openModalButtons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        const modalId = this.getAttribute("data-modal");
        const modal = document.querySelector(`.modal[data-modal="${modalId}"]`);

        if (modal) {
            setTimeout(() => {
                modal.style.display = "flex"; // Modal muncul setelah delay
            }, 900); // Ubah delay sesuai durasi animasi tombol
        }
    });
});

    // Tutup modal jika klik tombol close
    closeModalButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modal = this.closest(".modal");
            if (modal) {
                modal.style.display = "none"; // Hanya menutup modal yang sesuai
                //clock.style.visibility = "visible";
                //KUDUNA DIHAPUSbuttons.forEach(btn => btn.style.display = "block");
            }

            // Reset tabel
            if (activeTable) {
                activeTable.style.display = "none";
                activeTable = null;
            }
        });
    });

    // Tutup modal jika klik di luar modal-content
    modals.forEach(modal => {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
                clock.style.visibility = "visible";
                //KUDUNA DIHAPUSbuttons.forEach(btn => btn.style.display = "block");
                if (activeTable) {
                    activeTable.style.display = "none";
                    activeTable = null;
                }
            }
        });
    });

    // Tampilkan tabel di bawah tombol yang diklik
    hariButtons.forEach(button => {
        button.addEventListener("click", function () {
            const hari = this.getAttribute("data-hari");
            const tableContent = document.getElementById(hari);
    
            if (tableContent) {
                // Kalau tabel yang diklik sudah terbuka, sembunyikan
                if (activeTable === tableContent && tableContent.style.display === "block") {
                    tableContent.style.display = "none";
                    activeTable = null;
                } else {
                    // Sembunyikan semua tabel lain sebelum menampilkan yang baru
                    document.querySelectorAll(".tabel-container").forEach(t => t.style.display = "none");
                    
                    // Tampilkan tabel di bawah tombol yang diklik
                    tableContent.style.display = "block";
                    this.insertAdjacentElement("afterend", tableContent);
                    activeTable = tableContent;
                }
            }
        });
    });
    // Sembunyikan semua modal saat halaman dimuat
    document.querySelectorAll(".modal").forEach(modal => {
        modal.style.display = "none";
    });

    // Jam analog dengan pergerakan
    const deg = 6;
    
    const hour = document.querySelector(".hour");
    const min = document.querySelector(".min");
    const sec = document.querySelector(".sec");

    const setClock = () => {
        let day = new Date();
        let hh = day.getHours() * 30;
        let mm = day.getMinutes() * deg;
        let ss = day.getSeconds() * deg;

        hour.style.transform = `rotateZ(${hh + mm / 12}deg)`;
        min.style.transform = `rotateZ(${mm}deg)`;
        sec.style.transform = `rotateZ(${ss}deg)`;
    };

    // Jalankan pertama kali dan update setiap 1 detik
    setClock();
    setInterval(setClock, 1000);
});
//CODINGAN TERAKHIR YANG WARAS


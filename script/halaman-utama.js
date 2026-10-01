// =====================================================
// DATA TEKS
// =====================================================

const textData = [
    {
        id: "text1",
        teks: "©2026 By RobloxIndonesia_old"
    },
    {
        id: "text2",
        teks: "Versi Website 3.7v"
    }
];

textData.forEach(item => {

    const element =
        document.getElementById(item.id);

    if (element) {
        element.textContent = item.teks;
    }

});


// =====================================================
// DATA LINK
// =====================================================

const linkData = [

    // NAV
    {
        id: "link1",
        href: "/home",
        text: "Home"
    },
    {
        id: "link2",
        href: "/games-tren",
        text: "Game Tren"
    },
    {
        id: "link3",
        href: "/berita",
        text: "Berita"
    },
    {
        id: "link4",
        href: "/sejarah",
        text: "Sejarah"
    },

    // FOOTER
    {
        id: "link5",
        href: "#",
        text: "Tentang Kami"
    },
    {
        id: "link6",
        href: "#",
        text: "Bantuan"
    },
    {
        id: "link7",
        href: "#",
        text: "Privasi"
    },
    {
        id: "link8",
        href: "#",
        text: "Situs Peta"
    },

    // SIDEBAR
    {
        id: "link9",
        href: "/robloxshorts",
        text: "Roblox Shorts"
    },
    {
        id: "link10",
        href: "#",
        text: "Keadaan Koneksi Server Roblox"
    },
    {
        id: "link11",
        href: "#",
        text: "Kode² Di Game Roblox"
    },
    {
        id: "link12",
        href: "#",
        text: "Tutorial Di Roblox"
    },
    {
        id: "link13",
        href: "#",
        text: "Karakter Terkenal Di Roblox"
    },
    {
        id: "link14",
        href: "/foto-roblox",
        text: "Foto Roblox"
    },
    {
        id: "link15",
        href: "/users",
        text: "Username"
    },
    {
        id: "link16",
        href: "mailto:robloxindonesia.github.io@gmail.com?subject=Halo%20RobloxIndonesia_old&body=ada%20butuh%20bantuan/minta%20simpan%20halaman%20akun%20Roblox.",
        text: "Hubungi Kami"
    }

];


// =====================================================
// ISI LINK YANG SUDAH ADA DI HTML
// =====================================================

linkData.forEach(item => {

    const link =
        document.getElementById(item.id);

    if (!link) return;

    link.textContent = item.text;
    link.href = item.href;

});


// =====================================================
// BUKA MENU
// =====================================================

function openMenu() {

    const menu =
        document.getElementById("menuDropdown");

    if (menu) {
        menu.style.width = "250px";
    }

}


// =====================================================
// TUTUP MENU
// =====================================================

function closeMenu() {

    const menu =
        document.getElementById("menuDropdown");

    if (menu) {
        menu.style.width = "0";
    }

}


// =====================================================
// PROFIL ROBLOX INDONESIA
// =====================================================

const profileLink =
    document.createElement("a");

profileLink.href =
    "/users/profil.html?user=robiox_lndo&date=2026-02-28";


const profiles =
    document.createElement("img");

profiles.src =
    "https://RobloxIndonesia.github.io/img/30DAY-AvatarHeadshot-ED6E504DCD0989309333C3F87B84DC2E.png";

profiles.className =
    "profile";

profiles.alt =
    "Profile";


profileLink.appendChild(profiles);


const profileContainer =
    document.getElementById("profiles");

if (profileContainer) {

    profileContainer.appendChild(profileLink);

}


// =====================================================
// LOGO
// =====================================================

const urlLogo =
    "/img/logo.png";


// LOGO HEADER

const logo1 =
    document.createElement("img");

logo1.src =
    urlLogo;

logo1.alt =
    "Logo";

logo1.width =
    100;


const logoContainer1 =
    document.getElementById("logo1");

if (logoContainer1) {

    logoContainer1.appendChild(logo1);

}


// LOGO SIDEBAR

const logo2 =
    document.createElement("img");

logo2.src =
    urlLogo;

logo2.alt =
    "Logo";

logo2.width =
    100;


const logoContainer2 =
    document.getElementById("logo2");

if (logoContainer2) {

    logoContainer2.appendChild(logo2);

}

// =====================================================
// RUANG KOSONG OTOMATIS
// =====================================================

function aturRuangKosong() {

    const main = document.querySelector("main");

    if (!main) return;

    // Hapus ruang kosong lama
    const lama = document.getElementById("empty-space");

    if (lama) {
        lama.remove();
    }

    const tinggiLayar = window.innerHeight;
    const tinggiKonten = main.getBoundingClientRect().bottom;

    // Persentase ruang kosong
    const persen = 75;

    // Jika konten belum mencapai bawah layar
    if (tinggiKonten < tinggiLayar) {

        const ruangKosong =
            tinggiLayar - tinggiKonten;

        const ruang = document.createElement("div");

        ruang.id = "empty-space";

        ruang.style.height =
            (ruangKosong * persen / 100) + "px";

        main.appendChild(ruang);
    }
}

window.addEventListener(
    "load",
    aturRuangKosong
);

window.addEventListener(
    "resize",
    aturRuangKosong
);

(() => {

    // ========================================
    // AMBIL DATA JSON
    // ========================================

    let data = window.__profilData || {};

    let tanggalData =
        window.__profilTanggal || "2026-09-01";


    if (!data || Object.keys(data).length === 0) {

        console.log(
            "Data profil tidak ditemukan."
        );

        return;

    }


    // ========================================
    // ELEMEN HTML
    // ========================================

    const displayName =
        document.getElementById("displayName");

    const username =
        document.getElementById("username");

    const description =
        document.getElementById("bio");


    const friends =
        document.getElementById("friends");

    const followers =
        document.getElementById("followers");

    const following =
        document.getElementById("following");


    const certified =
        document.getElementById("certified");

    const plus =
        document.getElementById("plus");


    const popup =
        document.getElementById("popupProfil");


    const banner =
        document.getElementById("banner");

    const back =
        document.getElementById("back");


    const robloxButton =
        document.getElementById("editAvatar");

    const menuButton =
        document.getElementById("menu");


    const tabTentang =
        document.getElementById("tabTentang");

    const tabKreasi =
        document.getElementById("tabKreasi");


    const tentang =
        document.getElementById("tentang");

    const kreasi =
        document.getElementById("kreasi");


    const gameList =
        document.getElementById("gameList");

    const memakai =
        document.getElementById("memakai");

    const favorit =
        document.getElementById("favorit");

    const komunitas =
        document.getElementById("komunitas");


    // ========================================
    // INPUT POPUP
    // ========================================

    const inputDisplay =
        document.getElementById("inputDisplay");

    const inputUsername =
        document.getElementById("inputUsername");

    const inputDescription =
        document.getElementById("inputDescription");

    const inputFriends =
        document.getElementById("inputFriends");

    const inputFollowers =
        document.getElementById("inputFollowers");

    const inputFollowing =
        document.getElementById("inputFollowing");

    const inputVerified =
        document.getElementById("inputVerified");

    const inputPlus =
        document.getElementById("inputPlus");


    // ========================================
    // HELPER TEXT
    // ========================================

    const setText = (el, value) => {

        if (el) {

            el.textContent =
                value ?? "";

        }

    };


    // ========================================
    // HELPER GAMBAR
    // ========================================

    const setImage = (id, src) => {

        const el =
            document.getElementById(id);

        if (el && src) {

            el.src = src;

        }

    };


    // ========================================
    // TAMPILKAN DATA JSON
    // ========================================

    function tampilkanDataJSON() {

        // ====================================
        // PROFIL
        // ====================================

        setText(
            displayName,
            data.displayName ||
            "Displayname"
        );


        setText(
            username,
            data.name ||
            data.username ||
            "Username"
        );


        setText(
            description,
            data.description ||
            "Tidak ada bio"
        );


        // ====================================
        // STATISTIK
        // ====================================

        setText(
            friends,
            data.friendsCount ??
            data.friends ??
            0
        );


        setText(
            followers,
            data.followersCount ??
            data.followers ??
            0
        );


        setText(
            following,
            data.followingCount ??
            data.following ??
            0
        );


// ====================================
// URL AVATAR
// ====================================

// URL Roblox dari JSON
const robloxHeadshot =
    data.avatarHeadshotUrl || "";


// URL GitHub Pages
const githubHeadshot =
    data.id && data.name
        ? `https://robloxindonesia.github.io/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/${data.id}-${encodeURIComponent(data.name)}-headshot.png`
        : "";


// URL lokal
const localHeadshot =
    data.id && data.name
        ? `/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/${data.id}-${encodeURIComponent(data.name)}-headshot.png`
        : "";


// URL Roblox avatar penuh
const robloxAvatar =
    data.imageUrl || "";


// URL GitHub Pages avatar penuh
const githubAvatar =
    data.id && data.name
        ? `https://robloxindonesia.github.io/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/${data.id}-${encodeURIComponent(data.name)}-avatar.webp`
        : "";


// URL lokal avatar penuh
const localAvatar =
    data.id && data.name
        ? `/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/${data.id}-${encodeURIComponent(data.name)}-avatar.webp`
        : "";


// ====================================
// AVATAR
// Headshot
// ====================================

const avatar =
    document.getElementById("avatar");


if (avatar) {

    if (robloxHeadshot) {

        avatar.dataset.tahap =
            "roblox";

        avatar.src =
            robloxHeadshot;

    } else if (githubHeadshot) {

        avatar.dataset.tahap =
            "github";

        avatar.src =
            githubHeadshot;

    } else if (localHeadshot) {

        avatar.dataset.tahap =
            "local";

        avatar.src =
            localHeadshot;

    } else {

        avatar.dataset.tahap =
            "gagal";

        avatar.src =
            "/img/background.png";
    }


    avatar.onerror = () => {

        if (
            avatar.dataset.tahap ===
                "roblox" &&
            githubHeadshot
        ) {

            avatar.dataset.tahap =
                "github";

            avatar.src =
                githubHeadshot;

            return;
        }


        if (
            avatar.dataset.tahap ===
                "github" &&
            localHeadshot
        ) {

            avatar.dataset.tahap =
                "local";

            avatar.src =
                localHeadshot;

            return;
        }


        avatar.onerror =
            null;

        avatar.src =
            "/img/background.png";
    };

}


// ====================================
// BANNER
// Avatar Full
// ====================================

if (banner) {

    if (robloxAvatar) {

        banner.dataset.tahap =
            "roblox";

        banner.src =
            robloxAvatar;

    } else if (githubAvatar) {

        banner.dataset.tahap =
            "github";

        banner.src =
            githubAvatar;

    } else if (localAvatar) {

        banner.dataset.tahap =
            "local";

        banner.src =
            localAvatar;

    } else {

        banner.src =
            "/img/background.png";
    }


    banner.onload = () => {

        if (back) {

            back.classList.remove(
                "back1",
                "back2"
            );

        }

    };


    banner.onerror = () => {

        if (
            banner.dataset.tahap ===
                "roblox" &&
            githubAvatar
        ) {

            banner.dataset.tahap =
                "github";

            banner.src =
                githubAvatar;

            return;
        }


        if (
            banner.dataset.tahap ===
                "github" &&
            localAvatar
        ) {

            banner.dataset.tahap =
                "local";

            banner.src =
                localAvatar;

            return;
        }


        banner.onerror =
            null;

        banner.src =
            "/img/background.png";
    };

}

        // ====================================
        // VERIFIED
        // ====================================

        if (certified) {

            if (
                data.hasVerifiedBadge === true ||
                data.verified === true
            ) {

                certified.src =
                    "/iconsvg/certified.svg";

                certified.style.display =
                    "inline-block";

            } else {

                certified.style.display =
                    "none";

            }

        }


        // ====================================
        // PLUS
        // ====================================

        if (plus) {

            plus.src =
                "/iconsvg/plus.svg";

            plus.style.display =
                data.plus === true
                    ? "inline-block"
                    : "none";

        }


        // ====================================
        // JUDUL
        // ====================================

        document.title =
            `${data.displayName ||
            data.name ||
            "Profil"} - Roblox Indonesia`;

    }


    // ========================================
    // JALANKAN OTOMATIS
    // ========================================

    tampilkanDataJSON();


    // ========================================
    // PROFIL ROBLOX
    // ========================================

    if (
        robloxButton &&
        data.id
    ) {

        robloxButton.onclick = () => {

            window.open(
                `https://www.roblox.com/users/${data.id}/profile`,
                "_blank"
            );

        };

    }


    // ========================================
    // INFO LENGKAP
    // ========================================

    if (menuButton) {

        menuButton.onclick = () => {

            // =================================
            // TANGGAL DIBUAT
            // =================================

            const tanggalDibuat =
                data.created
                    ? new Date(data.created)
                    : new Date();


            const tanggal =
                tanggalDibuat.toLocaleDateString(
                    "id-ID",
                    {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                );


            const waktu =
                tanggalDibuat.toLocaleTimeString(
                    "id-ID",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
                    }
                );


            // =================================
            // WAKTU DATA DISALIN
            // =================================

            const tanggalDisalin =
                data.copiedAt
                    ? new Date(data.copiedAt)
                    : null;


            const tanggalCopy =
                tanggalDisalin
                    ? tanggalDisalin.toLocaleDateString(
                        "id-ID",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        }
                    )
                    : "Belum ada";


            const waktuCopy =
                tanggalDisalin
                    ? tanggalDisalin.toLocaleTimeString(
                        "id-ID",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        }
                    )
                    : "Belum ada";


            // =================================
            // INFO
            // =================================

            alert(
`Info Lengkap

Nama Tampilan
${data.displayName || ""}

Username
@${data.name || data.username || ""}

ID Pengguna
${data.id || "Tidak ada"}

Arsip Data
${tanggalData}

Dibuat
Tanggal : ${tanggal}
Waktu   : ${waktu}

Data Disalin
Tanggal : ${tanggalCopy}
Waktu   : ${waktuCopy}

Status
${data.isBanned ? "Diblokir" : "Aktif"}

Lencana Verifikasi
${(
    data.hasVerifiedBadge ||
    data.verified
)
    ? "Terverifikasi"
    : "Tidak terverifikasi"}`
            );

        };

    }


    // ========================================
    // TAB
    // ========================================

    if (
        tentang &&
        kreasi
    ) {

        tentang.hidden =
            false;

        kreasi.hidden =
            true;


        if (tabTentang) {

            tabTentang.onclick = () => {

                tentang.hidden =
                    false;

                kreasi.hidden =
                    true;

            };

        }


        if (tabKreasi) {

            tabKreasi.onclick = () => {

                tentang.hidden =
                    true;

                kreasi.hidden =
                    false;

            };

        }

    }


// ========================================
// HELPER FALLBACK GAMBAR
// ========================================

function setImageFallback(
    img,
    primaryUrl,
    githubUrl,
    localUrl
) {

    // ====================================
    // ROBLOX
    // ====================================

    if (primaryUrl) {

        img.dataset.tahap =
            "roblox";

        img.src =
            primaryUrl;

    }

    // ====================================
    // GITHUB PAGES
    // ====================================

    else if (githubUrl) {

        img.dataset.tahap =
            "github";

        img.src =
            githubUrl;

    }

    // ====================================
    // LOCALHOST
    // ====================================

    else if (localUrl) {

        img.dataset.tahap =
            "local";

        img.src =
            localUrl;

    }

    else {

        img.dataset.tahap =
            "gagal";

        img.src =
            "/img/background.png";

    }


    // ====================================
    // JIKA GAMBAR GAGAL
    // ====================================

    img.onerror = function() {

        if (
            this.dataset.tahap ===
                "roblox" &&
            githubUrl
        ) {

            this.dataset.tahap =
                "github";

            this.src =
                githubUrl;

            return;
        }


        if (
            this.dataset.tahap ===
                "github" &&
            localUrl
        ) {

            this.dataset.tahap =
                "local";

            this.src =
                localUrl;

            return;
        }


        this.onerror =
            null;

        this.src =
            "/img/background.png";

    };

}


// ========================================
// KREASI
// ========================================

if (gameList) {

    gameList.innerHTML =
        "";


    (data.creations || [])
        .forEach(game => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "kreasi-item";


            const image =
                document.createElement(
                    "img"
                );


            image.alt =
                game.name || "";


            const robloxURL =
                game.imageUrl || "";


            const githubURL =
                game.id && data.name
                    ? `https://robloxindonesia.github.io/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/creations/${game.id}.png`
                    : "";


            const localURL =
                game.id && data.name
                    ? `/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/creations/${game.id}.png`
                    : "";


            setImageFallback(
                image,
                robloxURL,
                githubURL,
                localURL
            );


            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "kreasi-info";


            const title =
                document.createElement(
                    "strong"
                );


            title.textContent =
                game.name || "";


            const description =
                document.createElement(
                    "p"
                );


            description.textContent =
                game.description ||
                "Tidak ada deskripsi";


            const stats =
                document.createElement(
                    "div"
                );


            stats.className =
                "kreasi-stats";


            stats.textContent =
                `👁 ${game.visits ?? 0} kunjungan`;


            info.appendChild(
                title
            );

            info.appendChild(
                description
            );

            info.appendChild(
                stats
            );


            item.appendChild(
                image
            );

            item.appendChild(
                info
            );


            gameList.appendChild(
                item
            );

        });

}


// ========================================
// SAAT INI MEMAKAI
// ========================================

if (memakai) {

    memakai.innerHTML =
        "";


    (data.currentlyWearing || [])
        .forEach(item => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card";


            const image =
                document.createElement(
                    "img"
                );


            image.alt =
                item.name || "";


            const robloxURL =
                item.imageUrl || "";


            const githubURL =
                item.id && data.name
                    ? `https://robloxindonesia.github.io/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/currently-wearing/${item.id}.png`
                    : "";


            const localURL =
                item.id && data.name
                    ? `/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/currently-wearing/${item.id}.png`
                    : "";


            setImageFallback(
                image,
                robloxURL,
                githubURL,
                localURL
            );


            const name =
                document.createElement(
                    "p"
                );


            name.textContent =
                item.name || "";


            card.appendChild(
                image
            );


            card.appendChild(
                name
            );


            memakai.appendChild(
                card
            );

        });

}


// ========================================
// FAVORIT GAMES
// ========================================

if (favorit) {

    favorit.innerHTML =
        "";


    (data.favoriteGames || [])
        .forEach(game => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card";


            const image =
                document.createElement(
                    "img"
                );


            image.alt =
                game.name || "";


            const robloxURL =
                game.imageUrl || "";


            const githubURL =
                game.id && data.name
                    ? `https://robloxindonesia.github.io/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/favorite-games/${game.id}.png`
                    : "";


            const localURL =
                game.id && data.name
                    ? `/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/favorite-games/${game.id}.png`
                    : "";


            setImageFallback(
                image,
                robloxURL,
                githubURL,
                localURL
            );


            const name =
                document.createElement(
                    "p"
                );


            name.textContent =
                game.name || "";


            card.appendChild(
                image
            );


            card.appendChild(
                name
            );


            favorit.appendChild(
                card
            );

        });

}


// ========================================
// KOMUNITAS
// ========================================

if (komunitas) {

    komunitas.innerHTML =
        "";


    (data.communities || [])
        .forEach(group => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "card";


            const image =
                document.createElement(
                    "img"
                );


            image.alt =
                group.name || "";


            const robloxURL =
                group.imageUrl || "";


            const githubURL =
                group.id && data.name
                    ? `https://robloxindonesia.github.io/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/communities/${group.id}.png`
                    : "";


            const localURL =
                group.id && data.name
                    ? `/users/data/${tanggalData}/assets/${encodeURIComponent(data.name)}/communities/${group.id}.png`
                    : "";


            setImageFallback(
                image,
                robloxURL,
                githubURL,
                localURL
            );


            const name =
                document.createElement(
                    "p"
                );


            name.textContent =
                group.name || "";


            const role =
                document.createElement(
                    "small"
                );


            role.textContent =
                group.role?.name ||
                "Member";


            card.appendChild(
                image
            );


            card.appendChild(
                name
            );


            card.appendChild(
                role
            );


            komunitas.appendChild(
                card
            );

        });

}


// ========================================
// EDIT PROFIL
// ========================================

    const editProfilBtn =
        document.getElementById(
            "editProfil"
        );


    if (
        editProfilBtn &&
        popup
    ) {

        editProfilBtn.onclick = () => {

            popup.style.display =
                "flex";


            // =================================
            // DISPLAY NAME
            // =================================

            if (inputDisplay) {

                inputDisplay.value =
                    data.displayName ||
                    "";

            }


            // =================================
            // USERNAME
            // =================================

            if (inputUsername) {

                inputUsername.value =
                    data.name ||
                    data.username ||
                    "";

            }


            // =================================
            // DESCRIPTION
            // =================================

            if (inputDescription) {

                inputDescription.value =
                    data.description ||
                    "";

            }


            // =================================
            // FRIENDS
            // =================================

            if (inputFriends) {

                inputFriends.value =
                    data.friendsCount ??
                    data.friends ??
                    0;

            }


            // =================================
            // FOLLOWERS
            // =================================

            if (inputFollowers) {

                inputFollowers.value =
                    data.followersCount ??
                    data.followers ??
                    0;

            }


            // =================================
            // FOLLOWING
            // =================================

            if (inputFollowing) {

                inputFollowing.value =
                    data.followingCount ??
                    data.following ??
                    0;

            }


            // =================================
            // VERIFIED
            // =================================

            if (inputVerified) {

                inputVerified.checked =
                    data.hasVerifiedBadge === true ||
                    data.verified === true;

            }


            // =================================
            // PLUS
            // =================================

            if (inputPlus) {

                inputPlus.checked =
                    data.plus === true;

            }

        };

    }


    // ========================================
    // TUTUP POPUP
    // ========================================

    const closeProfilBtn =
        document.getElementById(
            "closeProfil"
        );


    if (
        closeProfilBtn &&
        popup
    ) {

        closeProfilBtn.onclick = () => {

            popup.style.display =
                "none";

        };

    }


    // ========================================
    // SIMPAN PROFIL
    // ========================================

    const saveProfilBtn =
        document.getElementById(
            "saveProfil"
        );


    if (
        saveProfilBtn &&
        popup
    ) {

        saveProfilBtn.onclick = () => {

            // =================================
            // DISPLAY NAME
            // =================================

            if (inputDisplay) {

                data.displayName =
                    inputDisplay.value;

            }


            // =================================
            // USERNAME
            // =================================

            if (inputUsername) {

                data.name =
                    inputUsername.value;

                data.username =
                    inputUsername.value;

            }


            // =================================
            // DESCRIPTION
            // =================================

            if (inputDescription) {

                data.description =
                    inputDescription.value;

            }


            // =================================
            // STATISTIK
            // =================================

            if (inputFriends) {

                data.friendsCount =
                    Number(
                        inputFriends.value
                    ) || 0;

            }


            if (inputFollowers) {

                data.followersCount =
                    Number(
                        inputFollowers.value
                    ) || 0;

            }


            if (inputFollowing) {

                data.followingCount =
                    Number(
                        inputFollowing.value
                    ) || 0;

            }


            // =================================
            // VERIFIED
            // =================================

            if (inputVerified) {

                data.hasVerifiedBadge =
                    inputVerified.checked;

                data.verified =
                    inputVerified.checked;

            }


            // =================================
            // PLUS
            // =================================

            if (inputPlus) {

                data.plus =
                    inputPlus.checked;

            }


            // =================================
            // UPDATE TAMPILAN
            // =================================

            tampilkanDataJSON();


            // =================================
            // SIMPAN LOCAL STORAGE
            // =================================

            const userIdKey =
                data.id ||
                data.name ||
                "default_user";


            localStorage.setItem(
                "profil_" + userIdKey,
                JSON.stringify(data)
            );


            // =================================
            // TUTUP POPUP
            // =================================

            popup.style.display =
                "none";


            console.log(
                "Profil berhasil diperbarui:",
                data
            );

        };

    }


    // ========================================
    // KLIK DI LUAR POPUP
    // ========================================

    window.addEventListener(
        "click",
        (e) => {

            if (
                popup &&
                e.target === popup
            ) {

                popup.style.display =
                    "none";

            }

        }
    );


    // ========================================
    // SELESAI
    // ========================================

    console.log(
        "Profil berhasil dimuat:",
        data.name ||
        data.username
    );

    console.log(
        "Tanggal data:",
        tanggalData
    );

})();
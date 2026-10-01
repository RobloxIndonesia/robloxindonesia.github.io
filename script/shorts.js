/* ========================================
   ELEMENT
======================================== */
const container = document.querySelector(".shorts");
const short = document.querySelector(".short");
const video = document.getElementById("video");
const title = document.getElementById("title");
const description = document.getElementById("description");
const button = document.getElementById("centerControl");
const loader = document.getElementById("loader");
const quality = document.getElementById("quality");
const qualityStatus = document.getElementById("qualityStatus");
const orderControl = document.getElementById("orderControl");
const videoProgress = document.querySelector(".video-progress");
const progressBar = document.getElementById("progressBar");
const videoTime = document.getElementById("videoTime");
const speedControl = document.getElementById("speedControl");


/* ========================================
   DATA
======================================== */
let shortsData = {};


/* ========================================
   BASE URL
======================================== */
const VIDEO_BASE =
    "https://robloxindonesia.github.io/video/";


/* ========================================
   KUALITAS
======================================== */
const qualityList = [
    2160,
    1440,
    1080,
    720,
    540,
    480,
    360,
    240,
    144
];


/* ========================================
   STATE
======================================== */
let currentId = null;
let currentQuality = null;
let availableQualities = [];

let changingVideo = false;

let autoMode = true;
let randomMode = true;


/* ========================================
   KECEPATAN VIDEO
======================================== */
let videoSpeed = 1;

const speedList = [
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    2
];

let speedIndex =
    speedList.indexOf(videoSpeed);

if (speedIndex < 0) {
    speedIndex = 2;
}

if (speedControl) {
    speedControl.textContent =
        videoSpeed + "×";
}


/* ========================================
   ID CACHE
======================================== */
let videoIds = [];


/* ========================================
   QUALITY CACHE
======================================== */
const qualityCache =
    Object.create(null);


/* ========================================
   HISTORY
======================================== */
let videoHistory = [];
let historyIndex = -1;


/* ========================================
   LOAD TOKEN
======================================== */
let loadToken = 0;


/* ========================================
   AUTO QUALITY
======================================== */
let speedTesting = false;
let lastSpeedTest = 0;

const SPEED_TEST_INTERVAL = 30000;


/* ========================================
   LOAD JSON
======================================== */
async function loadData() {

    try {

        const response =
            await fetch(
                "/script/shorts/shorts.json",
                {
                    cache: "default"
                }
            );

        if (!response.ok) {

            throw new Error(
                "shorts.json HTTP " +
                response.status
            );

        }

        shortsData =
            await response.json();

        videoIds =
            Object.keys(shortsData)
                .map(Number)
                .sort((a, b) => a - b);

        console.log(
            "Data Shorts berhasil dimuat:",
            shortsData
        );

        return true;

    } catch (error) {

        console.error(
            "Gagal memuat shorts.json:",
            error
        );

        title.textContent =
            "Gagal memuat data";

        description.textContent =
            "shorts.json tidak ditemukan.";

        return false;
    }
}


/* ========================================
   VIDEO URL
======================================== */
function getVideoUrl(id, qualityValue) {

    const data =
        shortsData[id];

    if (!data) return null;

    const file =
        encodeURIComponent(data.file);

    return (
        VIDEO_BASE +
        qualityValue +
        "p/" +
        file
    );
}


/* ========================================
   GET ID URL
======================================== */
function getId() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const requested =
        Number(
            params.get("id")
        );

    if (
        requested &&
        shortsData[requested]
    ) {
        return requested;
    }

    return videoIds[0] || null;
}


/* ========================================
   FIRST / LAST
======================================== */
function getFirstId() {

    return videoIds.length
        ? videoIds[0]
        : null;
}


function getLastId() {

    return videoIds.length
        ? videoIds[videoIds.length - 1]
        : null;
}


/* ========================================
   CHECK QUALITIES
======================================== */
async function checkQualities(id) {

    if (qualityCache[id]) {
        return qualityCache[id];
    }

    const data =
        shortsData[id];

    if (
        !data ||
        !Array.isArray(data.qualities)
    ) {
        return [];
    }

    const qualities =
        data.qualities
            .map(Number)
            .filter(q =>
                qualityList.includes(q)
            )
            .sort((a, b) => b - a);

    qualityCache[id] =
        qualities;

    return qualities;
}


/* ========================================
   UPDATE QUALITY OPTIONS
======================================== */
function updateQualityOptions() {

    for (
        const option of quality.options
    ) {

        if (
            option.value === "auto"
        ) {
            continue;
        }

        const q =
            Number(option.value);

        if (
            availableQualities.includes(q)
        ) {

            option.disabled = false;
            option.textContent =
                q + "p";

        } else {

            option.disabled = true;
            option.textContent =
                q + "p (tidak tersedia)";
        }
    }
}


/* ========================================
   CLOSEST QUALITY
======================================== */
function getClosestQuality(target) {

    if (!availableQualities.length) {
        return null;
    }

    if (!target) {
        return availableQualities[0];
    }

    let closest =
        availableQualities[0];

    for (
        const q of availableQualities
    ) {

        if (
            Math.abs(q - target) <
            Math.abs(closest - target)
        ) {

            closest = q;
        }
    }

    return closest;
}


/* ========================================
   LOAD SHORT
======================================== */
async function loadShort(
    id,
    autoplay = true
) {

    const data =
        shortsData[id];

    if (!data) return;

    const token =
        ++loadToken;

    loader.classList.add("show");

    title.textContent =
        data.title;

    description.textContent =
        data.description;


    const qualities =
        await checkQualities(id);

    if (
        token !== loadToken
    ) {
        return;
    }


    availableQualities =
        qualities;

    updateQualityOptions();


    if (!availableQualities.length) {

        loader.classList.remove("show");

        title.textContent =
            "Video tidak tersedia";

        description.textContent =
            "Tidak ada kualitas video yang ditemukan.";

        return;
    }


    let selectedQuality;


    /* AUTO */
    if (autoMode) {

        selectedQuality =
            availableQualities[0];

    }

    /* MANUAL */
    else {

        selectedQuality =
            getClosestQuality(
                currentQuality
            );
    }


    currentId =
        id;

    currentQuality =
        selectedQuality;


    quality.value =
        autoMode
            ? "auto"
            : String(selectedQuality);


    qualityStatus.textContent =
        selectedQuality + "p";


    const src =
        getVideoUrl(
            id,
            selectedQuality
        );


    video.pause();

    video.onloadedmetadata =
        null;

    video.onerror =
        null;


    video.src =
        src;

    video.load();


    video.onloadedmetadata =
        () => {

            if (
                token !== loadToken
            ) {
                return;
            }


            /*
             * KEMBALIKAN KECEPATAN
             */
            video.playbackRate =
                videoSpeed;


            /*
             * RESET PROGRESS
             */
            updateVideoTime();
            updateProgress(0);


            loader.classList.remove(
                "show"
            );


            if (autoplay) {

                video.play()
                    .catch(() => {});

            }
        };


    video.onerror =
        () => {

            if (
                token !== loadToken
            ) {
                return;
            }

            loader.classList.remove(
                "show"
            );

            fallbackQuality(
                selectedQuality
            );
        };
}


/* ========================================
   CHANGE QUALITY
======================================== */
function changeQuality(newQuality) {

    if (
        !availableQualities.includes(
            newQuality
        )
    ) {
        return;
    }


    if (
        currentQuality === newQuality
    ) {
        return;
    }


    const currentTime =
        video.currentTime || 0;

    const wasPlaying =
        !video.paused;


    currentQuality =
        newQuality;


    qualityStatus.textContent =
        newQuality + "p";


    loader.classList.add("show");


    const token =
        ++loadToken;


    video.pause();

    video.onloadedmetadata =
        null;

    video.onerror =
        null;


    video.src =
        getVideoUrl(
            currentId,
            newQuality
        );

    video.load();


    video.onloadedmetadata =
        () => {

            if (
                token !== loadToken
            ) {
                return;
            }


            try {

                if (
                    Number.isFinite(
                        video.duration
                    )
                ) {

                    video.currentTime =
                        Math.min(
                            currentTime,
                            video.duration
                        );
                }

            } catch {}


            /*
             * PENTING:
             * KEMBALIKAN SPEED
             */
            video.playbackRate =
                videoSpeed;


            updateVideoTime();


            loader.classList.remove(
                "show"
            );


            if (wasPlaying) {

                video.play()
                    .catch(() => {});

            }
        };


    video.onerror =
        () => {

            if (
                token !== loadToken
            ) {
                return;
            }

            loader.classList.remove(
                "show"
            );

            fallbackQuality(
                newQuality
            );
        };
}


/* ========================================
   FALLBACK
======================================== */
function fallbackQuality(
    failedQuality
) {

    const lower =
        availableQualities
            .filter(
                q => q < failedQuality
            )
            .sort(
                (a, b) => b - a
            );


    if (lower.length) {

        changeQuality(
            lower[0]
        );

        return;
    }


    const alternative =
        availableQualities.find(
            q => q !== failedQuality
        );


    if (alternative) {

        changeQuality(
            alternative
        );

    } else {

        qualityStatus.textContent =
            "Gagal memutar";
    }
}


/* ========================================
   SPEED TEST
======================================== */
async function measureDownloadSpeed(
    url
) {

    if (speedTesting) {
        return 0;
    }

    speedTesting = true;


    try {

        const start =
            performance.now();


        const response =
            await fetch(
                url,
                {
                    cache: "force-cache"
                }
            );


        if (
            !response.ok ||
            !response.body
        ) {
            return 0;
        }


        const reader =
            response.body.getReader();

        let received = 0;


        while (true) {

            const {
                done,
                value
            } = await reader.read();


            if (done) break;


            received +=
                value.length;


            if (
                received >=
                256 * 1024
            ) {

                reader.cancel();

                break;
            }
        }


        const seconds =
            (
                performance.now() -
                start
            ) / 1000;


        if (
            seconds <= 0 ||
            received <= 0
        ) {
            return 0;
        }


        return (
            received * 8
        ) / seconds / 1000000;


    } catch {

        return 0;

    } finally {

        speedTesting =
            false;
    }
}


/* ========================================
   SELECT AUTO QUALITY
======================================== */
function selectQuality(speed) {

    const preferred = [

        [2160, 16],
        [1440, 10],
        [1080, 8],
        [720, 5],
        [540, 3],
        [480, 2],
        [360, 1.5],
        [240, 0.8],
        [144, 0]

    ];


    for (
        const [q, required]
        of preferred
    ) {

        if (
            speed >= required &&
            availableQualities.includes(q)
        ) {
            return q;
        }
    }


    return (
        availableQualities[
            availableQualities.length - 1
        ]
    );
}


/* ========================================
   AUTO QUALITY
======================================== */
async function autoQuality(
    force = false
) {

    if (
        !autoMode ||
        !currentId ||
        !availableQualities.length
    ) {
        return;
    }


    const now =
        Date.now();


    if (
        !force &&
        now - lastSpeedTest <
        SPEED_TEST_INTERVAL
    ) {
        return;
    }


    const idAtStart =
        currentId;

    const token =
        loadToken;


    lastSpeedTest =
        now;


    qualityStatus.textContent =
        "Mengukur...";


    const testQuality =
        availableQualities[0];


    const speed =
        await measureDownloadSpeed(
            getVideoUrl(
                currentId,
                testQuality
            )
        );


    if (
        idAtStart !== currentId ||
        token !== loadToken
    ) {
        return;
    }


    if (speed <= 0) {

        qualityStatus.textContent =
            currentQuality + "p";

        return;
    }


    const selected =
        selectQuality(speed);


    qualityStatus.textContent =
        speed.toFixed(2) +
        " Mbps • " +
        selected +
        "p";


    if (
        currentQuality !== selected
    ) {

        changeQuality(
            selected
        );
    }
}


/* ========================================
   QUALITY SELECT
======================================== */
quality.addEventListener(
    "change",
    () => {

        if (
            quality.value === "auto"
        ) {

            autoMode = true;

            autoQuality(true);

            return;
        }


        autoMode = false;

        changeQuality(
            Number(quality.value)
        );
    }
);


/* ========================================
   SPEED CONTROL
======================================== */
if (speedControl) {

    speedControl.addEventListener(
        "click",
        () => {

            speedIndex++;


            if (
                speedIndex >=
                speedList.length
            ) {

                speedIndex = 0;
            }


            videoSpeed =
                speedList[speedIndex];


            video.playbackRate =
                videoSpeed;


            speedControl.textContent =
                videoSpeed + "×";
        }
    );
}


/* ========================================
   ACAK / URUTAN
======================================== */
if (orderControl) {

    function updateOrderIcon() {

        orderControl.innerHTML =
            randomMode
                ? `
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M16 3h5v5"></path>
                        <path d="M21 3l-7 7"></path>
                        <path d="M3 7h3c2 0 3 1 8 7"></path>
                        <path d="M3 17h3c2 0 3-1 8-7"></path>
                        <path d="M14 14l7 7"></path>
                        <path d="M16 21h5v-5"></path>
                    </svg>
                `
        : `
            <svg viewBox="0 0 24 24">
                <path d="M1 5l8 7-8 7z"></path>
                <path d="M11 5l8 7-8 7z"></path>
                <path d="M22 5v14"></path>
            </svg>
        `;
    }


    updateOrderIcon();


    orderControl.addEventListener(
        "click",
        () => {

            randomMode =
                !randomMode;

            updateOrderIcon();
        }
    );
}


/* ========================================
   RANDOM VIDEO
======================================== */
function getRandomNewVideo(
    current
) {

    let candidates =
        videoIds.filter(
            id => id !== current
        );


    const unused =
        candidates.filter(
            id =>
                !videoHistory.includes(id)
        );


    if (unused.length) {

        candidates =
            unused;
    }


    if (!candidates.length) {

        candidates =
            videoIds.filter(
                id => id !== current
            );
    }


    if (!candidates.length) {
        return current;
    }


    return candidates[
        Math.floor(
            Math.random() *
            candidates.length
        )
    ];
}


/* ========================================
   NEXT VIDEO
======================================== */
function getNextVideoId(
    current
) {

    if (!randomMode) {

        const index =
            videoIds.indexOf(current);


        if (
            index === -1 ||
            index >=
            videoIds.length - 1
        ) {
            return current;
        }


        return videoIds[index + 1];
    }


    if (
        historyIndex <
        videoHistory.length - 1
    ) {

        historyIndex++;

        return videoHistory[
            historyIndex
        ];
    }


    const nextId =
        getRandomNewVideo(
            current
        );


    if (
        nextId !== current
    ) {

        videoHistory =
            videoHistory.slice(
                0,
                historyIndex + 1
            );


        videoHistory.push(
            nextId
        );


        historyIndex =
            videoHistory.length - 1;
    }


    return nextId;
}


/* ========================================
   PREVIOUS VIDEO
======================================== */
function getPreviousVideoId(
    current
) {

    if (!randomMode) {

        const index =
            videoIds.indexOf(current);


        if (index <= 0) {
            return current;
        }


        return videoIds[
            index - 1
        ];
    }


    if (historyIndex > 0) {

        historyIndex--;

        return videoHistory[
            historyIndex
        ];
    }


    return current;
}


/* ========================================
   CHANGE SHORT
======================================== */
async function changeShort(
    id,
    direction
) {

    if (changingVideo) return;
    if (!shortsData[id]) return;
    if (id === currentId) return;


    if (
        !randomMode &&
        direction === "next" &&
        currentId >= getLastId()
    ) {
        return;
    }


    if (
        !randomMode &&
        direction === "previous" &&
        currentId <= getFirstId()
    ) {
        return;
    }


    changingVideo = true;

    video.pause();


    short.classList.remove(
        "next",
        "previous"
    );


    void short.offsetWidth;


    short.classList.add(
        direction === "next"
            ? "next"
            : "previous"
    );


    history.pushState(
        { id: id },
        "",
        "?id=" + id
    );


    await loadShort(
        id,
        true
    );


    if (autoMode) {
        autoQuality(false);
    }


    setTimeout(
        () => {

            short.classList.remove(
                "next",
                "previous"
            );

            changingVideo = false;

        },
        300
    );
}


/* ========================================
   SWIPE
======================================== */
let startY = 0;
let startX = 0;


container.addEventListener(
    "touchstart",
    event => {

        const touch =
            event.touches[0];

        startY =
            touch.clientY;

        startX =
            touch.clientX;

    },
    {
        passive: true
    }
);


container.addEventListener(
    "touchend",
    event => {

        if (changingVideo) {
            return;
        }


        const touch =
            event.changedTouches[0];


        const distanceY =
            startY -
            touch.clientY;


        const distanceX =
            startX -
            touch.clientX;


        if (
            Math.abs(distanceX) >
            Math.abs(distanceY)
        ) {
            return;
        }


        if (
            Math.abs(distanceY) <
            70
        ) {
            return;
        }


        const current =
            currentId;


        /* SWIPE ATAS */
        if (
            distanceY > 0
        ) {

            const nextId =
                getNextVideoId(
                    current
                );


            if (
                nextId !== current
            ) {

                changeShort(
                    nextId,
                    "next"
                );
            }


            return;
        }


        /* SWIPE BAWAH */
        const previousId =
            getPreviousVideoId(
                current
            );


        if (
            previousId !== current
        ) {

            changeShort(
                previousId,
                "previous"
            );
        }

    },
    {
        passive: true
    }
);


/* ========================================
   VIDEO PROGRESS + WAKTU
======================================== */
let draggingProgress = false;


/* ========================================
   FORMAT WAKTU
======================================== */
function formatVideoTime(
    seconds
) {

    if (
        !Number.isFinite(seconds)
    ) {
        return "0:00";
    }


    seconds =
        Math.max(
            0,
            Math.floor(seconds)
        );


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        seconds % 60;


    return (
        minutes +
        ":" +
        String(
            remaining
        ).padStart(2, "0")
    );
}


/* ========================================
   UPDATE WAKTU
======================================== */
function updateVideoTime() {

    if (!videoTime) return;


    const current =
        formatVideoTime(
            video.currentTime
        );


    const duration =
        formatVideoTime(
            video.duration
        );


    videoTime.textContent =
        current +
        " / " +
        duration;
}


/* ========================================
   POSISI PROGRESS
======================================== */
function getProgressPosition(
    clientX
) {

    const rect =
        videoProgress.getBoundingClientRect();


    let position =
        (
            clientX -
            rect.left
        ) / rect.width;


    return Math.max(
        0,
        Math.min(
            1,
            position
        )
    );
}


/* ========================================
   UPDATE PROGRESS
======================================== */
function updateProgress(
    position
) {

    if (!progressBar) return;


    progressBar.style.width =
        (
            position * 100
        ) + "%";
}


/* ========================================
   SEEK VIDEO
======================================== */
function seekVideo(
    clientX
) {

    if (
        !video.duration ||
        !videoProgress
    ) {
        return;
    }


    const position =
        getProgressPosition(
            clientX
        );


    const targetTime =
        position *
        video.duration;


    updateProgress(
        position
    );


    if (videoTime) {

        videoTime.textContent =
            formatVideoTime(
                targetTime
            ) +
            " / " +
            formatVideoTime(
                video.duration
            );
    }


    video.currentTime =
        targetTime;
}


/* ========================================
   MOUSE
======================================== */
if (videoProgress) {

    videoProgress.addEventListener(
        "mousedown",
        event => {

            draggingProgress = true;

            videoProgress.classList.add(
                "dragging"
            );

            seekVideo(
                event.clientX
            );
        }
    );


    document.addEventListener(
        "mousemove",
        event => {

            if (!draggingProgress) {
                return;
            }

            seekVideo(
                event.clientX
            );
        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            if (!draggingProgress) {
                return;
            }

            draggingProgress = false;

            videoProgress.classList.remove(
                "dragging"
            );
        }
    );


    /* ========================================
       TOUCH
    ======================================== */

    videoProgress.addEventListener(
        "touchstart",
        event => {

            draggingProgress = true;

            videoProgress.classList.add(
                "dragging"
            );

            seekVideo(
                event.touches[0].clientX
            );

        },
        {
            passive: true
        }
    );


    videoProgress.addEventListener(
        "touchmove",
        event => {

            if (!draggingProgress) {
                return;
            }

            seekVideo(
                event.touches[0].clientX
            );

        },
        {
            passive: true
        }
    );


    videoProgress.addEventListener(
        "touchend",
        () => {

            draggingProgress = false;

            videoProgress.classList.remove(
                "dragging"
            );
        }
    );
}


/* ========================================
   VIDEO BERJALAN
======================================== */
video.addEventListener(
    "timeupdate",
    () => {

        updateVideoTime();


        if (
            draggingProgress ||
            !video.duration
        ) {
            return;
        }


        const position =
            video.currentTime /
            video.duration;


        updateProgress(
            position
        );
    }
);


/* ========================================
   VIDEO LOAD
======================================== */
video.addEventListener(
    "loadedmetadata",
    () => {

        updateVideoTime();

        updateProgress(0);

        /*
         * Pastikan speed tetap.
         */
        video.playbackRate =
            videoSpeed;
    }
);


/* ========================================
   PLAY / PAUSE
======================================== */
let hideTimer;


video.addEventListener(
    "click",
    () => {

        if (video.paused) {

            video.play()
                .catch(() => {});

        } else {

            video.pause();
        }


        button.classList.add(
            "show"
        );


        clearTimeout(
            hideTimer
        );


        hideTimer =
            setTimeout(
                () => {

                    button.classList.remove(
                        "show"
                    );

                },
                700
            );
    }
);


video.addEventListener(
    "play",
    () => {

        button.textContent =
            "❚❚";

        /*
         * Pastikan speed tetap.
         */
        video.playbackRate =
            videoSpeed;
    }
);


video.addEventListener(
    "pause",
    () => {

        button.textContent =
            "▶";
    }
);


/* ========================================
   BACK / FORWARD
======================================== */
window.addEventListener(
    "popstate",
    async () => {

        const id =
            getId();


        if (!shortsData[id]) {
            return;
        }


        await loadShort(
            id,
            true
        );


        if (autoMode) {
            autoQuality(false);
        }
    }
);


/* ========================================
   START
======================================== */
(async function init() {

    const loaded =
        await loadData();


    if (!loaded) {
        return;
    }


    if (!videoIds.length) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const requestedId =
        Number(
            params.get("id")
        );


    let id;


    if (
        requestedId &&
        shortsData[requestedId]
    ) {

        id =
            requestedId;

    } else {

        if (randomMode) {

            id =
                videoIds[
                    Math.floor(
                        Math.random() *
                        videoIds.length
                    )
                ];

        } else {

            id =
                videoIds[0];
        }
    }


    videoHistory =
        [id];

    historyIndex = 0;


    history.replaceState(
        { id: id },
        "",
        "?id=" + id
    );


    currentId =
        id;


    await loadShort(
        id,
        true
    );


    if (autoMode) {
        autoQuality(true);
    }

})();


/* ========================================
   AUTO QUALITY 30 DETIK
======================================== */
setInterval(
    () => {

        if (
            autoMode &&
            !changingVideo &&
            currentId
        ) {

            autoQuality(false);
        }

    },
    30000
);
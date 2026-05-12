console.log(document.getElementById("repeatBtn"));
let songs = [];
// let playlist = [];
let playlist = JSON.parse(localStorage.getItem("playlist")) || [];
let playlists = JSON.parse(localStorage.getItem("playlists")) || [];
let currentIndex = -1;
// let isShuffle = false;
// ===== GLOBAL PLAYER STATE (NEW) =====
let isPlaying = false;

function updatePlayerUI(song){
    if(!song) return;

    document.querySelector(".title").textContent = song.title;
    document.querySelector(".para").textContent = song.artist?.name || "Unknown Artist";
    document.querySelector(".album-img").src = song.album?.cover_medium || "./assests/card4img.jpeg";
}
let currentSong = "";
let currentSongId = null;

const footerLikeBtn = document.getElementById("footerLikeBtn");

// let currentSong = "";
// let currentSongId = "";
let likedSongs = new Set();
let currentSongPreview = "";

const audio = document.getElementById("audioPlayer");
const albumImage = document.querySelector(".album-img");
// audio.addEventListener("ended", function () {

//     currentIndex++;

//     if (currentIndex >= songs.length) {
//         currentIndex = 0;
//     }

//     playSong(currentIndex);
// });

// audio.addEventListener("ended", function () {

//     if (songs.length === 0) return;

//     if (isShuffle) {
//         currentIndex = Math.floor(Math.random() * songs.length);
//     } else {
//         currentIndex = (currentIndex + 1) % songs.length;
//     }

//     playSong(currentIndex);
// });
// audio.addEventListener("ended", function () {

//     if (songs.length === 0) return;

//     if (isShuffle) {
//         let randomIndex;

//         do {
//             randomIndex = Math.floor(Math.random() * songs.length);
//         } while (randomIndex === currentIndex);

//         currentIndex = randomIndex;

//     } else {
//         currentIndex = (currentIndex + 1) % songs.length;
//     }

//     playSong(currentIndex);
// });
audio.addEventListener("ended", function () {

    if (songs.length === 0) return;

    // 🔁 Repeat ONE
    if (repeatMode === "one") {
        playSong(currentIndex);
        return;
    }

    // 🔀 Shuffle
    if (isShuffle) {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentIndex);

        currentIndex = randomIndex;

    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }

    playSong(currentIndex);
});
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
let isShuffle = false;
const shuffleBtn = document.getElementById("shuffleBtn");
let repeatMode = "off"; // off → all → one

const repeatBtn = document.getElementById("repeatBtn");

repeatBtn.addEventListener("click", function () {

    if (repeatMode === "off") {
        repeatMode = "all";
        repeatBtn.style.opacity = "1"; // active

    } else if (repeatMode === "all") {
        repeatMode = "one";
        repeatBtn.style.opacity = "1";
        repeatBtn.style.filter = "brightness(1.5)"; // highlight

    } else {
        repeatMode = "off";
        repeatBtn.style.opacity = "0.6";
        repeatBtn.style.filter = "none";
    }

    console.log("Repeat Mode:", repeatMode);
});
shuffleBtn.addEventListener("click", function () {
    isShuffle = !isShuffle;

    if (isShuffle) {
        shuffleBtn.style.color = "#1db954";
    } else {
        shuffleBtn.style.color = "white";
    }
});
// PLAY SONG FUNCTION
function playSong(index) {

    if (index < 0 || index >= songs.length) return;

    currentIndex = index;

    const song = songs[index];

    // audioPlayer.src = song.preview || song.preview_url;
    // audioPlayer.play();

    //     audio.src = song.preview || song.preview_url;
    // audio.play();

    // document.querySelector(".title").textContent = song.title;
    // document.querySelector(".para").textContent = song.artist?.name || "Unknown Artist";

    audio.src = song.preview || song.preview_url;
audio.play();
isPlaying = true;

updatePlayerUI(song);

document.getElementById("playPauseBtn").textContent = "❚❚";
highlightCurrentSong();
}

// NEXT SONG
// nextBtn.addEventListener("click", function () {

//     // if (songs.length === 0) return;

//     // currentIndex++;

//     // if (currentIndex >= songs.length) {
//     //     currentIndex = 0;
//     // }

//     // playSong(currentIndex);

//     if (songs.length === 0) return;

// if (isShuffle) {
//     currentIndex = Math.floor(Math.random() * songs.length);
// } else {
//     currentIndex = (currentIndex + 1) % songs.length;
// }

// playSong(currentIndex);
// });
nextBtn.addEventListener("click", function () {
if (repeatMode === "one") {
    playSong(currentIndex);
    return;
}
    if (songs.length === 0) return;

    if (isShuffle) {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentIndex);

        currentIndex = randomIndex;

    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }

    playSong(currentIndex);
});
// PREVIOUS SONG
// prevBtn.addEventListener("click", function () {

//     // if (songs.length === 0) return;

//     // currentIndex--;

//     // if (currentIndex < 0) {
//     //     currentIndex = songs.length - 1;
//     // }

//     // playSong(currentIndex);

//     if (songs.length === 0) return;

// if (isShuffle) {
//     currentIndex = Math.floor(Math.random() * songs.length);
// } else {
//     currentIndex--;
//     if (currentIndex < 0) currentIndex = songs.length - 1;
// }

// playSong(currentIndex);
// });
prevBtn.addEventListener("click", function () {
if (repeatMode === "one") {
    playSong(currentIndex);
    return;
}
    if (songs.length === 0) return;

    if (isShuffle) {
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * songs.length);
        } while (randomIndex === currentIndex);

        currentIndex = randomIndex;

    } else {
        currentIndex--;
        if (currentIndex < 0) currentIndex = songs.length - 1;
    }

    playSong(currentIndex);
});

// ===== PREMIUM FUNCTIONALITY =====

const premiumBtn = document.getElementById("premiumBtn");
const navbar = document.querySelector(".navbar");
const premiumTag = document.getElementById("premiumTag");
const searchInput = document.getElementById("searchInput");

let isPremium = localStorage.getItem("isPremium") === "true";

// Apply saved state on load
if (isPremium) {
    activatePremium();
}

premiumBtn.addEventListener("click", function (e) {
    e.preventDefault();
    isPremium = !isPremium;
    localStorage.setItem("isPremium", isPremium);

    if (isPremium) {
        activatePremium();
    } else {
        deactivatePremium();
    }
});

function activatePremium() {
    premiumBtn.classList.add("premium-active");
    navbar.classList.add("premium-navbar");
    premiumTag.style.display = "block";

    alert("🎉 Premium Activated! Enjoy Ad-Free Music.");
}

function deactivatePremium() {
    premiumBtn.classList.remove("premium-active");
    navbar.classList.remove("premium-navbar");
    premiumTag.style.display = "none";

    alert("Premium Deactivated.");
}

// ===== SUPPORT FUNCTIONALITY =====

const supportBtn = document.getElementById("supportBtn");
const supportModal = document.getElementById("supportModal");
const closeSupport = document.getElementById("closeSupport");
const supportForm = document.getElementById("supportForm");
const supportSuccess = document.getElementById("supportSuccess");

// Open modal
supportBtn.addEventListener("click", function (e) {
    e.preventDefault();
    supportModal.style.display = "flex";
});

// Close modal
closeSupport.addEventListener("click", function () {
    supportModal.style.display = "none";
});

// Close if clicked outside
window.addEventListener("click", function (e) {
    if (e.target === supportModal) {
        supportModal.style.display = "none";
    }
});

// Form submit simulation
supportForm.addEventListener("submit", function (e) {
    e.preventDefault();

    supportSuccess.textContent = "✅ Your issue has been submitted successfully!";
    supportForm.reset();

    setTimeout(() => {
        supportSuccess.textContent = "";
        supportModal.style.display = "none";
    }, 2000);
});

// ===== DOWNLOAD WITH REMOVE + LIBRARY LIST =====

document.addEventListener("DOMContentLoaded", function () {
// const repeatBtn = document.getElementById("repeatBtn");

//     repeatBtn.addEventListener("click", function () {

//         if (repeatMode === "off") {
//             repeatMode = "all";
//             repeatBtn.style.opacity = "1";

//         } else if (repeatMode === "all") {
//             repeatMode = "one";
//             repeatBtn.style.filter = "brightness(1.5)";

//         } else {
//             repeatMode = "off";
//             repeatBtn.style.opacity = "0.6";
//             repeatBtn.style.filter = "none";
//         }

//         console.log("Repeat Mode:", repeatMode);
//     });

    const downloadSongBtn = document.getElementById("downloadSongBtn");
    const premiumBtn = document.getElementById("premiumBtn");
    const downloadedSection = document.getElementById("downloadedSection");
    const downloadedList = document.getElementById("downloadedList");

    if (!downloadSongBtn) return;

    const songName = document.querySelector(".title").textContent;

    let downloadedSongs = JSON.parse(localStorage.getItem("downloadedSongs")) || [];

    function updateUI() {
        const premiumStatus = localStorage.getItem("isPremium") === "true";
        const isDownloaded = downloadedSongs.includes(songName);

        if (!premiumStatus) {
            downloadSongBtn.classList.add("locked");
            downloadSongBtn.classList.remove("premium-enabled");
            downloadSongBtn.title = "Premium Required";
            return;
        }

        downloadSongBtn.classList.remove("locked");

        if (isDownloaded) {
            downloadSongBtn.classList.add("premium-enabled");
            downloadSongBtn.classList.remove("fa-circle-down");
            downloadSongBtn.classList.add("fa-circle-check");
            downloadSongBtn.title = "Remove Download";
        } else {
            downloadSongBtn.classList.remove("premium-enabled");
            downloadSongBtn.classList.remove("fa-circle-check");
            downloadSongBtn.classList.add("fa-circle-down");
            downloadSongBtn.title = "Download Song";
        }

        renderDownloadedList();
    }

    function renderDownloadedList() {
        downloadedList.innerHTML = "";

        if (downloadedSongs.length === 0) {
            downloadedSection.style.display = "none";
            return;
        }

        downloadedSection.style.display = "block";

        downloadedSongs.forEach(song => {
            const li = document.createElement("li");
            li.textContent = song;
            downloadedList.appendChild(li);
        });
    }

    downloadSongBtn.addEventListener("click", function () {

    const premiumStatus = localStorage.getItem("isPremium") === "true";

    if (!premiumStatus) {
        alert("🚫 Song download is available only for Premium users.");
        return;
    }

    const currentSong = document.querySelector(".title").textContent;

    // 🔥 ALWAYS GET FRESH DATA
    let downloadedSongs = JSON.parse(localStorage.getItem("downloadedSongs")) || [];

    const isDownloaded = downloadedSongs.includes(currentSong);

    if (isDownloaded) {
        // REMOVE
        downloadedSongs = downloadedSongs.filter(song => song !== currentSong);
        localStorage.setItem("downloadedSongs", JSON.stringify(downloadedSongs));

        downloadSongBtn.classList.remove("premium-enabled");
        downloadSongBtn.classList.remove("fa-circle-check");
        downloadSongBtn.classList.add("fa-circle-down");
        downloadSongBtn.title = "Download Song";

        alert("❌ Download Removed.");
    } else {
        // ADD
        downloadedSongs.push(currentSong);
        localStorage.setItem("downloadedSongs", JSON.stringify(downloadedSongs));

        downloadSongBtn.classList.add("premium-enabled");
        downloadSongBtn.classList.remove("fa-circle-down");
        downloadSongBtn.classList.add("fa-circle-check");
        downloadSongBtn.title = "Remove Download";

        alert("⬇️ Song Downloaded Successfully!");
    }
});

    if (premiumBtn) {
        premiumBtn.addEventListener("click", function () {
            setTimeout(updateUI, 100);
        });
    }

    updateUI();
});

// ===== ADVANCED NAVBAR DOWNLOAD SYSTEM =====

document.addEventListener("DOMContentLoaded", function () {

    const navbarDownload = document.getElementById("navbarDownload");
    const downloadModal = document.getElementById("downloadModal");
    const closeDownload = document.getElementById("closeDownload");
    const navbarDownloadList = document.getElementById("navbarDownloadList");
    const noDownloadsMsg = document.getElementById("noDownloadsMsg");
    const downloadBadge = document.getElementById("downloadBadge");

    const songTitleElement = document.querySelector(".title");

    function updateBadge() {
        const downloadedSongs = JSON.parse(localStorage.getItem("downloadedSongs")) || [];
        downloadBadge.textContent = downloadedSongs.length;
    }

    function openModal() {
        const premiumStatus = localStorage.getItem("isPremium") === "true";
        let downloadedSongs = JSON.parse(localStorage.getItem("downloadedSongs")) || [];

        navbarDownloadList.innerHTML = "";
        noDownloadsMsg.textContent = "";

        if (!premiumStatus) {
            noDownloadsMsg.textContent = "🚫 Downloads are available only for Premium users.";
            downloadModal.style.display = "flex";
            return;
        }

        if (downloadedSongs.length === 0) {
            noDownloadsMsg.textContent = "No songs downloaded yet.";
        } else {
            downloadedSongs.forEach(song => {
                const li = document.createElement("li");

                const songSpan = document.createElement("span");
                songSpan.textContent = song;
                songSpan.style.cursor = "pointer";

                // CLICK TO PLAY
                songSpan.addEventListener("click", function () {
                    songTitleElement.textContent = song;
                    downloadModal.style.display = "none";
                });

                // REMOVE BUTTON
                const removeBtn = document.createElement("button");
                removeBtn.textContent = "Remove";
                removeBtn.classList.add("remove-btn");removeBtn.addEventListener("click", function () {

    let downloadedSongs = JSON.parse(localStorage.getItem("downloadedSongs")) || [];

    // Remove song
    downloadedSongs = downloadedSongs.filter(s => s !== song);

    localStorage.setItem("downloadedSongs", JSON.stringify(downloadedSongs));

    // ===== FIX FOOTER BUTTON STATE =====
    const currentSong = document.querySelector(".title")?.textContent;
    const footerDownloadBtn = document.getElementById("downloadSongBtn"); 
    // ⚠️ IMPORTANT: use your real footer button id

    if (footerDownloadBtn && currentSong === song) {
        footerDownloadBtn.classList.remove("premium-enabled");
        footerDownloadBtn.classList.remove("fa-circle-check");
        footerDownloadBtn.classList.add("fa-circle-down");
        footerDownloadBtn.title = "Download Song";
    }

    // Remove from modal instantly
    li.remove();

    if (downloadedSongs.length === 0) {
        document.getElementById("noDownloadsMsg").textContent =
            "No songs downloaded yet.";
    }
});
                li.appendChild(songSpan);
                li.appendChild(removeBtn);
                navbarDownloadList.appendChild(li);
            });
        }

        downloadModal.style.display = "flex";
        updateBadge();
    }

    if (navbarDownload) {
        navbarDownload.addEventListener("click", function (e) {
            e.preventDefault();
            openModal();
        });
    }

    if (closeDownload) {
        closeDownload.addEventListener("click", function () {
            downloadModal.style.display = "none";
        });
    }

    window.addEventListener("click", function (e) {
        if (e.target === downloadModal) {
            downloadModal.style.display = "none";
        }
    });

    //updateBadge();
    //updateDownloadBadge();
triggerDownloadSync();
});

// ===== FOOTER DOWNLOAD TOGGLE FUNCTIONALITY (ADDED) =====

document.addEventListener("DOMContentLoaded", function () {

    const footerDownloadBtn = document.getElementById("footerDownloadBtn");
    const songTitleElement = document.querySelector(".title");

    if (!footerDownloadBtn || !songTitleElement) return;

    function updateFooterButtonUI() {
        const premiumStatus = localStorage.getItem("isPremium") === "true";
        const currentSong = songTitleElement.textContent;
        const downloadedSongs = JSON.parse(localStorage.getItem("downloadedSongs")) || [];

        if (!premiumStatus) {
            footerDownloadBtn.textContent = "Download";
            return;
        }

        if (downloadedSongs.includes(currentSong)) {
            footerDownloadBtn.textContent = "Remove Download";
        } else {
            footerDownloadBtn.textContent = "Download";
        }
    }

    footerDownloadBtn.addEventListener("click", function () {

    const premiumStatus = localStorage.getItem("isPremium") === "true";

    if (!premiumStatus) {
        alert("🚫 Song download is available only for Premium users.");
        return;
    }

    const currentSong = document.querySelector(".title").textContent;
    // let downloadedSongs = JSON.parse(localStorage.getItem("downloadedSongs")) || [];

    if (downloadedSongs.includes(currentSong)) {
        // REMOVE
        downloadedSongs = downloadedSongs.filter(song => song !== currentSong);
        footerDownloadBtn.textContent = "Download";
        alert("❌ Download Removed.");
    } else {
        // ADD
        downloadedSongs.push(currentSong);
        footerDownloadBtn.textContent = "Remove Download";
        alert("⬇️ Song Downloaded Successfully!");
    }

    localStorage.setItem("downloadedSongs", JSON.stringify(downloadedSongs));
});

    // Update UI when song changes or page loads
    updateFooterButtonUI();

});

// ===== GLOBAL DOWNLOAD SYNC EVENT =====

function triggerDownloadSync() {
    document.dispatchEvent(new Event("downloadUpdated"));
}

// ===== LISTEN FOR DOWNLOAD SYNC =====

document.addEventListener("downloadUpdated", function () {

    const songTitleElement = document.querySelector(".title");
    const footerDownloadBtn = document.getElementById("footerDownloadBtn");

    if (!songTitleElement || !footerDownloadBtn) return;

    const currentSong = songTitleElement.textContent;
    const downloadedSongs = JSON.parse(localStorage.getItem("downloadedSongs")) || [];

    if (downloadedSongs.includes(currentSong)) {
        footerDownloadBtn.textContent = "Remove Download";
    } else {
        footerDownloadBtn.textContent = "Download";
    }
});

// ===== AUTO UPDATE FOOTER BUTTON WHEN SONG CHANGES =====

document.addEventListener("click", function () {

    const footerDownloadBtn = document.getElementById("footerDownloadBtn");
    const currentSong = document.querySelector(".title")?.textContent;

    if (!footerDownloadBtn || !currentSong) return;

    const downloadedSongs = JSON.parse(localStorage.getItem("downloadedSongs")) || [];

    if (downloadedSongs.includes(currentSong)) {
        footerDownloadBtn.textContent = "Remove Download";
    } else {
        footerDownloadBtn.textContent = "Download";
    }
});

// ===== SIGN UP FUNCTIONALITY =====

const signupBtn = document.getElementById("signupBtn");
const signupModal = document.getElementById("signupModal");
const closeSignup = document.getElementById("closeSignup");
const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");
const userDisplay = document.getElementById("userDisplay");

// Open modal
signupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    signupModal.style.display = "flex";
});

// Close modal
closeSignup.addEventListener("click", function () {
    signupModal.style.display = "none";
});

// Close outside click
window.addEventListener("click", function (e) {
    if (e.target === signupModal) {
        signupModal.style.display = "none";
    }
});

// Handle signup
signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user => user.email === email);

    if (userExists) {
        signupMessage.textContent = "❌ Email already registered.";
        signupMessage.style.color = "red";
        return;
    }

    const newUser = { name, email, password };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto login
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    signupMessage.textContent = "✅ Account created successfully!";
    signupMessage.style.color = "lightgreen";

    updateUserUI();

    setTimeout(() => {
        signupModal.style.display = "none";
        signupForm.reset();
        signupMessage.textContent = "";
    }, 1500);
});

// Show logged in user
function updateUserUI() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        userDisplay.textContent = "👤 " + currentUser.name;
        signupBtn.style.display = "none";
    }
}

// Load user on page load
document.addEventListener("DOMContentLoaded", updateUserUI);

// ===== LOGIN FUNCTIONALITY =====

const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const logoutBtn = document.getElementById("logoutBtn");

const profileSection = document.getElementById("profileSection");
const profileDropdown = document.getElementById("profileDropdown");
const avatarCircle = document.getElementById("avatarCircle");
// Open login modal
loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loginModal.style.display = "flex";
});

// Close login modal
closeLogin.addEventListener("click", function () {
    loginModal.style.display = "none";
});

// Close outside click
window.addEventListener("click", function (e) {
    if (e.target === loginModal) {
        loginModal.style.display = "none";
    }
});


// Handle login
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(user => user.email === email && user.password === password);

    if (!validUser) {
        loginMessage.textContent = "❌ Invalid email or password.";
        loginMessage.style.color = "red";
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(validUser));

    loginMessage.textContent = "✅ Login successful!";
    loginMessage.style.color = "lightgreen";

    updateUserUI();

    setTimeout(() => {
        loginModal.style.display = "none";
        loginForm.reset();
        loginMessage.textContent = "";
    }, 1500);
});logoutBtn.addEventListener("click", function () {

    // Remove current user from storage
    localStorage.removeItem("currentUser");

    // Clear UI manually
    userDisplay.textContent = "";
    avatarCircle.textContent = "";

    // Hide profile section
    profileSection.style.display = "none";

    // Show login button again
    loginBtn.style.display = "inline-block";

    // Close dropdown
    profileDropdown.style.display = "none";

    // Optional: redirect
    // window.location.href = "index.html";

});
function updateUserUI() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser) {
        loginBtn.style.display = "none";
        profileSection.style.display = "flex";

        userDisplay.textContent = currentUser.name;
        avatarCircle.textContent = currentUser.name.charAt(0).toUpperCase();

    } else {
        loginBtn.style.display = "inline-block";
        profileSection.style.display = "none";
    }
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateUserUI);

updateUserUI();

profileSection.addEventListener("click", function () {
    profileDropdown.style.display =
        profileDropdown.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", function (e) {
    if (!profileSection.contains(e.target)) {
        profileDropdown.style.display = "none";
    }
});document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");
    const allCards = document.querySelectorAll(".card");

    if (!searchInput) return;
 searchInput.addEventListener("input", function () {

    const value = this.value.trim().toLowerCase();

    allCards.forEach(card => {

        const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
        const info = card.querySelector(".card-info")?.textContent.toLowerCase() || "";

        if (title.includes(value) || info.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {

            this.value = "";
            this.placeholder = "Search songs, artists, albums...";

            allCards.forEach(card => {
                card.style.display = "block";
            });

        }
    });
    // 🔥 NEW: If search is cleared, reset input properly
    if (value === "") {
        this.placeholder = "Search songs, artists, albums...";
    }

});

});

// =============================
// HOME BUTTON FUNCTIONALITY (IMPROVED)
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const homeBtn = document.getElementById("homeBtn");

    if (!homeBtn) return;

    homeBtn.addEventListener("click", function () {

        // 1️⃣ Clear search input
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.value = "";
        }

        // 2️⃣ Show all cards
        const allCards = document.querySelectorAll(".card");
        allCards.forEach(card => {
            card.style.display = "block";
        });

        // 3️⃣ Close Support Modal
        const supportModal = document.getElementById("supportModal");
        if (supportModal) {
            supportModal.style.display = "none";
        }

        // 4️⃣ Close Download Modal
        const downloadModal = document.getElementById("downloadModal");
        if (downloadModal) {
            downloadModal.style.display = "none";
        }

        // 5️⃣ Close Profile Dropdown
        const profileDropdown = document.getElementById("profileDropdown");
        if (profileDropdown) {
            profileDropdown.style.display = "none";
        }

        // 6️⃣ Scroll to top smoothly
        const mainContent = document.querySelector(".main-content");

if (mainContent) {
    mainContent.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

    });

});

window.onload = function () {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
};

// =============================
// YOUR LIBRARY FUNCTIONALITY
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const libraryBtn = document.getElementById("libraryBtn");
    const sidebar = document.querySelector(".sidebar");

    if (!libraryBtn || !sidebar) return;

    libraryBtn.addEventListener("click", function () {

        // Scroll sidebar to top
        sidebar.scrollTo({
            top: 0,
            behavior: "smooth"
        });
 });

});
document.addEventListener("DOMContentLoaded", function () {

    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
        body.classList.add("light-mode");
        themeToggle.textContent = "☀️";
    }

    themeToggle.addEventListener("click", function () {

        body.classList.toggle("light-mode");

        if (body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
            themeToggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "dark");
            themeToggle.textContent = "🌙";
        }

    });

});document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");

    const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
    const progressBar = document.querySelector(".progress-bar");
    const volumeBar = document.querySelector(".volume-bar");
    const currentTimeEl = document.querySelector(".curr_time");
    const totalTimeEl = document.querySelector(".tot_time");

    if (!audio || !playPauseBtn) return;

    // ▶ Play / Pause
    // playPauseBtn.addEventListener("click", function () {

    //     if (audio.paused) {
    //         audio.play();
    //         playPauseBtn.textContent = "❚❚";
    //     } else {
    //         audio.pause();
    //         playPauseBtn.textContent = "▶";
    //     }

    // });

    playPauseBtn.addEventListener("click", function () {

    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = "❚❚";

        // START ROTATION
        albumImage.classList.add("rotate");

    } else {
        audio.pause();
        playPauseBtn.textContent = "▶";

        // STOP ROTATION
        albumImage.classList.remove("rotate");
    }
    isPlaying = !audio.paused;

});

    // ⏭ NEXT SONG
if (nextBtn) {
    // nextBtn.addEventListener("click", function () {

    //     if (songs.length === 0) return;

    //     currentIndex++;

    //     if (currentIndex >= songs.length) {
    //         currentIndex = 0;
    //     }

    //     const song = songs[currentIndex];

    //     audio.src = song.preview;
    //     audio.play();
    //     currentIndex = songs.findIndex(s => s.id === song.id);

    //     document.querySelector(".title").textContent = song.title;
    //     document.querySelector(".para").textContent = song.artist.name;
    // });
}

// ⏮ PREVIOUS SONG
if (prevBtn) {
    // prevBtn.addEventListener("click", function () {

    //     if (songs.length === 0) return;

    //     currentIndex--;

    //     if (currentIndex < 0) {
    //         currentIndex = songs.length - 1;
    //     }

    //     const song = songs[currentIndex];

    //     audio.src = song.preview;
    //     audio.play();

    //     document.querySelector(".title").textContent = song.title;
    //     document.querySelector(".para").textContent = song.artist.name;
    // });
}

    audio.addEventListener("play", function () {
        albumImage.classList.add("rotate");
    playPauseBtn.textContent = "❚❚";
});

audio.addEventListener("pause", function () {
    albumImage.classList.remove("rotate");
    playPauseBtn.textContent = "▶";
});

audio.addEventListener("play", () => {
    isPlaying = true;
    document.getElementById("playPauseBtn").textContent = "❚❚";
});

audio.addEventListener("pause", () => {
    isPlaying = false;
    document.getElementById("playPauseBtn").textContent = "▶";
});


// audio.addEventListener("ended", function(){

//     currentIndex++;

//     if(currentIndex >= songs.length){
//         currentIndex = 0;
//     }

//     const song = songs[currentIndex];

//     audio.src = song.preview;
//     audio.play();

//     document.querySelector(".title").textContent = song.title;
//     document.querySelector(".para").textContent = song.artist.name;

// });
    // ⏩ Update Progress
    audio.addEventListener("timeupdate", function () {

        if (!progressBar) return;

        const progressPercent = (audio.currentTime / audio.duration) * 100;
        // progressBar.value = progressPercent;
progressBar.value = progressPercent;

// 🔥 ADD THIS LINE (animation)
progressBar.style.background =
    `linear-gradient(to right, #1db954 ${progressPercent}%, #444 ${progressPercent}%)`;
        if (currentTimeEl) {
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60)
                .toString()
                .padStart(2, "0");

            currentTimeEl.textContent = `${minutes}:${seconds}`;
        }
    });

    // ⏭ Seek
    if (progressBar) {
        progressBar.addEventListener("input", function () {
            const seekTime = (progressBar.value / 100) * audio.duration;
            audio.currentTime = seekTime;
            progressBar.style.background =
        `linear-gradient(to right, #1db954 ${progressBar.value}%, #444 ${progressBar.value}%)`;
        });
    }

    // 🔊 Volume
    if (volumeBar) {
        volumeBar.addEventListener("input", function () {
            audio.volume = volumeBar.value / 100;
        });
    }

    // ⏱ Duration
    audio.addEventListener("loadedmetadata", function () {

        if (!totalTimeEl) return;

        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60)
            .toString()
            .padStart(2, "0");

        totalTimeEl.textContent = `${minutes}:${seconds}`;
    });

    // 🔁 Reset button when song ends
    // audio.addEventListener("ended", function () {
    //     playPauseBtn.textContent = "▶";
    // });

//     audio.addEventListener("ended", function () {

//     currentIndex++;

//     if (currentIndex >= songs.length) {
//         currentIndex = 0;
//     }

//     const song = songs[currentIndex];

//     audio.src = song.preview;
//     audio.play();

//     document.querySelector(".title").textContent = song.title;
//     document.querySelector(".para").textContent = song.artist.name;
// });

});searchInput.addEventListener("input", function () {

    const searchValue = this.value.toLowerCase();

    const cards = document.querySelectorAll("#songsContainer .card");

    cards.forEach(card => {

        const title = card.querySelector(".card-title").textContent.toLowerCase();
        const artist = card.querySelector(".card-info").textContent.toLowerCase();

        if (title.includes(searchValue) || artist.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("searchInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const searchValue = this.value.toLowerCase();

        const cards = document.querySelectorAll("#songsContainer .card");

        cards.forEach(card => {

            const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
            const artist = card.querySelector(".card-info")?.textContent.toLowerCase() || "";

            if (title.includes(searchValue) || artist.includes(searchValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});
document.addEventListener("DOMContentLoaded", function () {

    const songsContainer = document.getElementById("songsContainer");
    const audio = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

    const title = document.querySelector(".title");
    const artist = document.querySelector(".para");
    const albumImg = document.querySelector(".album-img");

    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    // const footerLikeBtn = document.getElementById("footerLikeBtn");
let currentSongId = null;

    if (!songsContainer) return;

    let currentSong = "";

    // =============================
    // CREATE SONG CARD
    // =============================

    function createSongCard(song){

        const card = document.createElement("div");
        card.classList.add("card");const songId = String(song.id);
//         card.innerHTML = `
//     <div class="card-img-wrapper">
//         <img src="${song.album.cover_medium}" class="card-img">
//         <i class="fa-regular fa-heart like-btn"></i>
//     </div>

//     <p class="card-title">${song.title}</p>
//     <p class="card-info">${song.artist.name}</p>
// `;

// card.innerHTML = `
//         <img src="${song.album.cover_medium}" class="card-img">

//         <div class="card-content">
//             <p class="card-title">${song.title}</p>
//             <p class="card-info">${song.artist.name}</p>
//         </div>

//         <i class="fa-regular fa-heart like-btn" data-id="${songId}"></i>
//     `;
// 

card.innerHTML = `
        <img src="${song.album.cover_medium}" class="card-img">

        <div class="card-content">
            <p class="card-title">${song.title}</p>
            <p class="card-info">${song.artist.name}</p>
        </div>

        <div class="card-actions">
            <i class="fa-regular fa-heart like-btn" data-id="${songId}"></i>
            <button class="playlist-btn">➕</button>
        </div>
    `;
const likeBtn = card.querySelector(".like-btn");
const playlistBtn = card.querySelector(".playlist-btn");

// playlistBtn.addEventListener("click", function(e){

//     e.stopPropagation();

//     playlist.push(song);

//     localStorage.setItem("playlist", JSON.stringify(playlist));

//     alert("Song added to playlist");

// });

playlistBtn.addEventListener("click", function(e){

    e.stopPropagation();

    playlist.push(song);

    localStorage.setItem("playlist", JSON.stringify(playlist));

    displayPlaylist();   // ⭐ ADD THIS LINE

    alert("Song added to playlist");

});
let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];
  if(likedSongs.includes(songId)){
        likeBtn.classList.remove("fa-regular");
        likeBtn.classList.add("fa-solid");
    }likeBtn.addEventListener("click", function(e){

    e.stopPropagation();

    const songId = this.dataset.id;

    let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

    if(likedSongs.includes(songId)){

        likedSongs = likedSongs.filter(id => id !== songId);

        likeBtn.classList.remove("fa-solid");
        likeBtn.classList.add("fa-regular");

    }else{

        likedSongs.push(songId);

        likeBtn.classList.remove("fa-regular");
        likeBtn.classList.add("fa-solid");

    }

    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));

    // ✅ update footer ONLY if this song is playing
    if(songId == currentSongId){
        updateFooterLikeState(songId);
    }

});
        card.addEventListener("click", function () {

            // Pause if same song clicked
            // if (currentSong === song.preview && !audio.paused) {
            //     audio.pause();
            //     playPauseBtn.textContent = "▶";
            //     currentSong = "";
            //     return;
            // }

    //         if (currentSong === song.preview) {

    //     if(audio.paused){
    //         audio.play();
    //         playPauseBtn.textContent = "❚❚";
    //     }else{
    //         audio.pause();
    //         playPauseBtn.textContent = "▶";
    //     }

    //     return;
    // }

            // Play new song
            // audio.src = song.preview;
            // audio.play();
            // currentSong = song.preview;
// currentSongId = song.id;
// currentSongId = String(song.id);
// updateFooterLike();
// updateFooterLikeState(song.id);

// audio.src = song.preview;
// audio.play();

// currentSong = song.preview;
// currentSongId = String(song.id);

// ⭐ IMPORTANT
// currentIndex = songs.findIndex(s => String(s.id) === currentSongId);
//             playPauseBtn.textContent = "❚❚";
// updateFooterLikeState(song.id);
//             // Update footer
//             if (title) title.textContent = song.title;
//             if (artist) artist.textContent = song.artist.name;
//             if (albumImg) albumImg.src = song.album.cover_medium;

//             currentSong = song.preview;

// same song → toggle
    if(currentSongId === String(song.id)){
        if(audio.paused){
            audio.play();
        } else {
            audio.pause();
        }
        return;
    }

    // new song
    currentSongId = String(song.id);
    currentIndex = songs.findIndex(s => String(s.id) === currentSongId);

    audio.src = song.preview;
    audio.play();
    isPlaying = true;

    updatePlayerUI(song);
    highlightCurrentSong();

        });

        songsContainer.appendChild(card);
    }function updateFooterLikeState(songId){

    const footerLikeBtn = document.getElementById("footerLikeBtn");

    let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

    // if(likedSongs.includes(songId)){
    if(likedSongs.includes(String(songId))){

        footerLikeBtn.classList.remove("fa-regular");
        footerLikeBtn.classList.add("fa-solid");

    }else{

        footerLikeBtn.classList.remove("fa-solid");
        footerLikeBtn.classList.add("fa-regular");

    }

}const footerLikeBtn = document.getElementById("footerLikeBtn");
footerLikeBtn.addEventListener("click", function(){

    if(!currentSongId) return;

    let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

    if(likedSongs.includes(currentSongId)){

        likedSongs = likedSongs.filter(id => id !== currentSongId);

    }else{

        likedSongs.push(currentSongId);

    }

    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));

    // update footer heart
    updateFooterLikeState(currentSongId);

    // update card heart
    const cardHeart = document.querySelector(`.like-btn[data-id="${currentSongId}"]`);

    if(cardHeart){

        if(likedSongs.includes(currentSongId)){
            cardHeart.classList.remove("fa-regular");
            cardHeart.classList.add("fa-solid");
        }else{
            cardHeart.classList.remove("fa-solid");
            cardHeart.classList.add("fa-regular");
        }

    }

});function loadRandomSongs(){

        let letters = "abcdefghijklmnopqrstuvwxyz";
        let randomLetter = letters[Math.floor(Math.random() * letters.length)];

        // fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${randomLetter}`)
        // .then(res => res.json())
        // .then(data => {

        //     songsContainer.innerHTML = "";

        //     data.data.slice(0,30).forEach(song => {
        //         createSongCard(song);
        //     });

        // })

        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${randomLetter}`)
.then(res => res.json())
.then(data => {

    songs = data.data;   // ⭐ VERY IMPORTANT LINE

    songsContainer.innerHTML = "";

    data.data.slice(0,30).forEach(song => {
        createSongCard(song);
    });

})
        .catch(err => console.log("API error:", err));

    }

    loadRandomSongs();

    // =============================
    // DYNAMIC SEARCH
    // =============================

    if (searchInput){

        searchInput.addEventListener("input", function(){

            const query = this.value.trim();

            if(query.length < 2){
                loadRandomSongs();
                return;
            }

            fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
            .then(res => res.json())
            // .then(data => {

            //     songsContainer.innerHTML = "";

            //     data.data.slice(0,24).forEach(song => {
            //         createSongCard(song);
            //     });

            // });

            .then(data => {

    songs = data.data;   // ⭐ add this

    songsContainer.innerHTML = "";

    data.data.slice(0,24).forEach(song => {
        createSongCard(song);
    });

});

        });

    }document.getElementById("searchBtn").addEventListener("click", function () {

    const query = document.getElementById("searchInput").value.trim();

    if (query === "") return;

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then(res => res.json())
    .then(data => {

        songsContainer.innerHTML = "";

        data.data.slice(0, 24).forEach(song => {
            createSongCard(song);
        });

    })
    .catch(err => console.log("Search error:", err));

});


});

// ===== NEXT SONG =====
if (nextBtn) {
    nextBtn.addEventListener("click", function () {

        // if (songs.length === 0) return;

        // currentIndex++;

        // if (currentIndex >= songs.length) {
        //     currentIndex = 0;
        // }

        // const song = songs[currentIndex];

        // audio.src = song.preview;
        // audio.play();

        // document.querySelector(".title").textContent = song.title;
        // document.querySelector(".para").textContent = song.artist.name;

        if (songs.length === 0) return;

if (isShuffle) {
    currentIndex = Math.floor(Math.random() * songs.length);
} else {
    currentIndex++;
    if (currentIndex >= songs.length) currentIndex = 0;
}

playSong(currentIndex);
    });
}


// ===== PREVIOUS SONG =====
if (prevBtn) {
    prevBtn.addEventListener("click", function () {

        // if (songs.length === 0) return;

        // currentIndex--;

        // if (currentIndex < 0) {
        //     currentIndex = songs.length - 1;
        // }

        // const song = songs[currentIndex];

        // audio.src = song.preview;
        // audio.play();

        // document.querySelector(".title").textContent = song.title;
        // document.querySelector(".para").textContent = song.artist.name;

        if (songs.length === 0) return;

if (isShuffle) {
    currentIndex = Math.floor(Math.random() * songs.length);
} else {
    currentIndex--;
    if (currentIndex < 0) currentIndex = songs.length - 1;
}

playSong(currentIndex);
    });
}

function displayPlaylist(){

   const playlistContainer = document.getElementById("playlistContainer");

    if(!playlistContainer) return;

    playlistContainer.innerHTML = "";

    playlist.forEach((song,index) => {

        const li = document.createElement("li");

        li.textContent = song.title + " - " + song.artist.name;

        li.style.cursor = "pointer";
        li.style.marginBottom = "6px";

        li.addEventListener("click", function(){

            audio.src = song.preview;
            audio.play();

            document.querySelector(".title").textContent = song.title;
            document.querySelector(".para").textContent = song.artist.name;

        });

        playlistContainer.appendChild(li);

    });


}

displayPlaylist();

document.addEventListener("DOMContentLoaded", function () {
const shuffleBtn = document.getElementById("shuffleBtn");

if (shuffleBtn) {
    shuffleBtn.addEventListener("click", function () {
        isShuffle = !isShuffle;

        console.log("Shuffle:", isShuffle);

        if (isShuffle) {
            shuffleBtn.classList.add("active");
        } else {
            shuffleBtn.classList.remove("active");
        }
    });
}
    const volumeBar = document.querySelector(".volume-bar");
    const bars = document.querySelectorAll(".volume-indicator span");

    if (!volumeBar || bars.length === 0) return;

    volumeBar.addEventListener("input", function () {

        const volume = this.value;

        bars.forEach((bar, index) => {
            if (volume > index * 25) {
                bar.style.opacity = "1";
            } else {
                bar.style.opacity = "0.3";
            }
        });

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById("audioPlayer");
    const bars = document.querySelectorAll(".volume-indicator span");

    if (!audio || bars.length === 0) return;

    // ▶️ When music plays → start animation
    audio.addEventListener("play", function () {
        bars.forEach(bar => {
            bar.style.animationPlayState = "running";
            bar.style.opacity = "1";
        });
    });

    // ⏸ When paused → stop animation
    audio.addEventListener("pause", function () {
        bars.forEach(bar => {
            bar.style.animationPlayState = "paused";
        });
    });

    // ⏹ When ended → stop animation
    // audio.addEventListener("ended", function () {
    //     bars.forEach(bar => {
    //         bar.style.animationPlayState = "paused";
    //     });
    // });
// audio.addEventListener("ended", function () {
//     currentIndex = (currentIndex + 1) % songs.length;
//     playSong(currentIndex);
// });

// audio.addEventListener("ended", function () {

//     if (songs.length === 0) return;

//     if (isShuffle) {
//         currentIndex = Math.floor(Math.random() * songs.length);
//     } else {
//         currentIndex = (currentIndex + 1) % songs.length;
//     }

//     playSong(currentIndex);
// });
});

function highlightCurrentSong(){
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("active-song");
    });

    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        const title = card.querySelector(".card-title")?.textContent;

        if(title === document.querySelector(".title").textContent){
            card.classList.add("active-song");
        }
    });
}
// =============================
// PLAYLIST FEATURE
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const createPlaylistBtn = document.getElementById("createPlaylistBtn");
    const playlistModal = document.getElementById("playlistModal");
    const closePlaylist = document.getElementById("closePlaylist");
    const playlistForm = document.getElementById("playlistForm");
    const playlistNameInput = document.getElementById("playlistName");
    const playlistMessage = document.getElementById("playlistMessage");
    const playlistContainer = document.getElementById("playlistContainer");

    const audio = document.getElementById("audioPlayer");

    let playlists = JSON.parse(localStorage.getItem("playlists")) || [];

    // =============================
    // OPEN MODAL
    // =============================

    if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener("click", function () {
            playlistModal.style.display = "flex";
        });
    }

    // =============================
    // CLOSE MODAL
    // =============================

    if (closePlaylist) {
        closePlaylist.addEventListener("click", function () {
            playlistModal.style.display = "none";
        });
    }

    window.addEventListener("click", function (e) {
        if (e.target === playlistModal) {
            playlistModal.style.display = "none";
        }
    });

    // =============================
    // CREATE PLAYLIST
    // =============================

    if (playlistForm) {

        playlistForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const playlistName = playlistNameInput.value.trim();

            if (!playlistName) return;

            const alreadyExists = playlists.some(
                p => p.name.toLowerCase() === playlistName.toLowerCase()
            );

            if (alreadyExists) {
                playlistMessage.textContent = "❌ Playlist already exists";
                playlistMessage.style.color = "red";
                return;
            }

            const newPlaylist = {
                id: Date.now(),
                name: playlistName,
                songs: []
            };

            playlists.push(newPlaylist);

            localStorage.setItem(
                "playlists",
                JSON.stringify(playlists)
            );

            playlistMessage.textContent = "✅ Playlist created";
            playlistMessage.style.color = "lightgreen";

            renderPlaylists();

            playlistForm.reset();

            setTimeout(() => {
                playlistModal.style.display = "none";
                playlistMessage.textContent = "";
            }, 1200);

        });

    }

    // =============================
    // RENDER PLAYLISTS
    // =============================

    function renderPlaylists() {

        playlistContainer.innerHTML = "";

        playlists.forEach(playlist => {

            const wrapper = document.createElement("div");
            wrapper.classList.add("playlist-box");

            const title = document.createElement("div");
            title.classList.add("playlist-title");
            title.textContent = playlist.name;

            const songList = document.createElement("ul");
            songList.classList.add("playlist-songs");

            // EMPTY PLAYLIST
            if (playlist.songs.length === 0) {

                const empty = document.createElement("li");
                empty.textContent = "No songs added yet";
                empty.style.opacity = "0.7";

                songList.appendChild(empty);

            } else {

                // SONGS
                playlist.songs.forEach(song => {

                    const li = document.createElement("li");
                    li.textContent = song.title;

                    // PLAY SONG FROM PLAYLIST
                    li.addEventListener("click", function () {

                        audio.src = song.preview;
                        audio.play();

                        document.querySelector(".title").textContent = song.title;

                        document.querySelector(".para").textContent =
                            song.artist;

                        document.querySelector(".album-img").src =
                            song.image;

                    });

                    songList.appendChild(li);

                });

            }

            // =============================
            // ADD CURRENT SONG BUTTON
            // =============================

            const addBtn = document.createElement("button");

            addBtn.classList.add("add-playlist-btn");

            addBtn.textContent = "Add Current Song";

            addBtn.addEventListener("click", function () {

                if (!currentSong || !currentSong.title) {
                    alert("⚠️ Play a song first");
                    return;
                }

                const songExists = playlist.songs.some(
                    s => s.title === currentSong.title
                );

                if (songExists) {
                    alert("Song already added");
                    return;
                }

                playlist.songs.push(currentSong);

                localStorage.setItem(
                    "playlists",
                    JSON.stringify(playlists)
                );

                renderPlaylists();

                alert("✅ Song added to playlist");

            });

            // =============================
            // DELETE PLAYLIST
            // =============================

            const deleteBtn = document.createElement("button");

            deleteBtn.classList.add("playlist-delete");

            deleteBtn.textContent = "Delete";

            deleteBtn.addEventListener("click", function () {

                playlists = playlists.filter(
                    p => p.id !== playlist.id
                );

                localStorage.setItem(
                    "playlists",
                    JSON.stringify(playlists)
                );

                renderPlaylists();

            });

            // ACTIONS WRAPPER
            const actions = document.createElement("div");

            actions.classList.add("playlist-actions");

            actions.appendChild(addBtn);

            actions.appendChild(deleteBtn);

            // APPEND
            wrapper.appendChild(title);

            wrapper.appendChild(songList);

            wrapper.appendChild(actions);

            playlistContainer.appendChild(wrapper);

        });

    }

    // INITIAL RENDER
    renderPlaylists();

});

// =============================
// ADMIN DASHBOARD
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const adminBtn = document.getElementById("adminBtn");
    const adminModal = document.getElementById("adminModal");
    const closeAdmin = document.getElementById("closeAdmin");

    const totalUsers = document.getElementById("totalUsers");
    const totalPlaylists = document.getElementById("totalPlaylists");
    const totalDownloads = document.getElementById("totalDownloads");
    const premiumUsers = document.getElementById("premiumUsers");
    const adminUserList = document.getElementById("adminUserList");

    // OPEN DASHBOARD
    if (adminBtn) {

        adminBtn.addEventListener("click", function (e) {

            e.preventDefault();

            loadAdminData();

            adminModal.style.display = "flex";

        });

    }

    // CLOSE DASHBOARD
    if (closeAdmin) {

        closeAdmin.addEventListener("click", function () {

            adminModal.style.display = "none";

        });

    }

    // OUTSIDE CLICK CLOSE
    window.addEventListener("click", function (e) {

        if (e.target === adminModal) {
            adminModal.style.display = "none";
        }

    });

    // LOAD DATA
    function loadAdminData() {

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const playlists =
            JSON.parse(localStorage.getItem("playlists")) || [];

        const downloads =
            JSON.parse(localStorage.getItem("downloadedSongs")) || [];

        const isPremium =
            localStorage.getItem("isPremium") === "true";

        // STATS
        totalUsers.textContent = users.length;

        totalPlaylists.textContent = playlists.length;

        totalDownloads.textContent = downloads.length;

        premiumUsers.textContent = isPremium ? 1 : 0;

        // USER LIST
        adminUserList.innerHTML = "";

        if (users.length === 0) {

            adminUserList.innerHTML =
                "<li>No registered users</li>";

            return;
        }

        users.forEach(user => {

            const li = document.createElement("li");

            li.innerHTML = `
                👤 <strong>${user.name}</strong><br>
                📧 ${user.email}
            `;

            adminUserList.appendChild(li);

        });

    }

});

// =============================
// TOP TRACKS FEATURE
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const topTracksContainer =
        document.getElementById("topTracksContainer");

    // SAMPLE TRACKS
    const topTracks = [

        {
            title: "Blinding Lights",
            artist: "The Weeknd",
            image:
                "https://i.scdn.co/image/ab67616d0000b2730f660e2b7d8111f5f7f5d6f",
            preview:
                "https://p.scdn.co/mp3-preview/sample1.mp3"
        },

        {
            title: "Shape of You",
            artist: "Ed Sheeran",
            image:
                "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
            preview:
                "https://p.scdn.co/mp3-preview/sample2.mp3"
        },

        {
            title: "Starboy",
            artist: "The Weeknd",
            image:
                "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
            preview:
                "https://p.scdn.co/mp3-preview/sample3.mp3"
        },

        {
            title: "Levitating",
            artist: "Dua Lipa",
            image:
                "https://i.scdn.co/image/ab67616d0000b273d4daf28d55fe4197ede848be",
            preview:
                "https://p.scdn.co/mp3-preview/sample4.mp3"
        }

    ];

    renderTopTracks();

    // =============================
    // RENDER TOP TRACKS
    // =============================

    function renderTopTracks() {

        if (!topTracksContainer) return;

        topTracksContainer.innerHTML = "";

        topTracks.forEach((track, index) => {

            const card = document.createElement("div");

            card.classList.add(
                "card",
                "top-track-card"
            );

            card.innerHTML = `
                <div class="top-track-rank">
                    ${index + 1}
                </div>

                <img
                    src="${track.image}"
                    class="card-img"
                >

                <p class="card-title">
                    ${track.title}
                </p>

                <p class="card-info">
                    ${track.artist}
                </p>

                <button class="top-track-play">
                    Play
                </button>
            `;

            // PLAY TRACK
            card.querySelector(".top-track-play")
                .addEventListener("click", function () {

                    const audio =
                        document.getElementById("audioPlayer");

                    if (!audio) return;

                    audio.src = track.preview;

                    audio.play();

                    // UPDATE PLAYER UI
                    document.querySelector(".title")
                        .textContent = track.title;

                    document.querySelector(".para")
                        .textContent = track.artist;

                    document.querySelector(".album-img")
                        .src = track.image;

                    // SAVE CURRENT SONG
                    currentSong = {
                        title: track.title,
                        artist: track.artist,
                        preview: track.preview,
                        image: track.image
                    };

                });

            topTracksContainer.appendChild(card);

        });

    }

});


// =============================
// REAL SPOTIFY DATA
// =============================

const CLIENT_ID = "9a0c9389765546cf92e9808ef88c967c";
const CLIENT_SECRET = "4ea82d51f2f4491f8b8c8366790ec65f";

// =============================
// GET SPOTIFY TOKEN
// =============================

async function getSpotifyToken() {

    try {

        const result = await fetch(
            "https://accounts.spotify.com/api/token",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded",

                    "Authorization":
                        "Basic " +
                        btoa(
                            CLIENT_ID +
                            ":" +
                            CLIENT_SECRET
                        )
                },

                body: "grant_type=client_credentials"
            }
        );

        const data = await result.json();

        return data.access_token;

    } catch (error) {

        console.log("Spotify Token Error:", error);

    }

}

// =============================
// LOAD REAL TRACKS
// =============================

async function loadSpotifyTracks() {

    try {

        const token = await getSpotifyToken();

        const response = await fetch(
            "https://api.spotify.com/v1/browse/new-releases?limit=8",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        const container =
            document.getElementById(
                "spotifyTracksContainer"
            );

        if (!container) return;

        container.innerHTML = "";

        data.albums.items.forEach(album => {

            const image =
                album.images[0]?.url || "";

            const title =
                album.name;

            const artist =
                album.artists[0]?.name || "Unknown";

            const spotifyUrl =
                album.external_urls.spotify;

            const card =
                document.createElement("div");

            card.classList.add(
                "card",
                "spotify-card"
            );

            card.innerHTML = `
                <img
                    src="${image}"
                    class="card-img"
                >

                <p class="card-title">
                    ${title}
                </p>

                <p class="card-info">
                    ${artist}
                </p>

                <button class="spotify-play-btn">
                    Open in Spotify
                </button>
            `;

            card.querySelector(
                ".spotify-play-btn"
            ).addEventListener(
                "click",
                function () {

                    window.open(
                        spotifyUrl,
                        "_blank"
                    );

                }
            );

            container.appendChild(card);

        });

    } catch (error) {

        console.log(
            "Spotify API Error:",
            error
        );

    }

}

// =============================
// INITIAL LOAD
// =============================

loadSpotifyTracks();
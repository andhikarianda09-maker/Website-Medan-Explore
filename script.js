


const gallery = destinations.slice(0, 8);

const destinationContainer = document.getElementById("destinationContainer");
const topDestination = document.getElementById("topDestination");
const galleryGrid = document.getElementById("galleryGrid");
const searchInput = document.getElementById("searchInput");

function cardTemplate(item) {
    return `
        <article class="destination-card">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="card-body">
                <span class="badge">${item.category}</span>
                <h3>${item.name}</h3>
                <div class="location">Lokasi: ${item.location}</div>
                <p>${item.description}</p>
            </div>
        </article>
    `;
}

function renderDestinations(items) {
    if (!items.length) {
        destinationContainer.innerHTML =
            `<p style="grid-column:1/-1;text-align:center;color:#81928c">Destinasi tidak ditemukan.</p>`;
        return;
    }
    destinationContainer.innerHTML = items.map(cardTemplate).join("");
}

function renderTop() {
    const top = [
        destinations[0],
        destinations[4],
        destinations[1],
        destinations[3],
        destinations[6]
    ];

    topDestination.innerHTML = top.map((item, index) => `
        <article class="top-card">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="card-body">
                <span class="rank">${index + 1}</span>
                <h3>${item.name}</h3>
                <div class="location">${item.category}</div>
            </div>
        </article>
    `).join("");
}

function renderGallery() {
    galleryGrid.innerHTML = gallery.map(item => `
        <div class="gallery-item" data-image="${item.image}" data-caption="${item.name}">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
    `).join("");
}

renderDestinations(destinations);
renderTop();
renderGallery();

let selectedCategory = "Semua";

document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        selectedCategory = button.dataset.category;
        applySearch();
    });
});

function applySearch() {
    const keyword = searchInput.value.toLowerCase().trim();

    const result = destinations.filter(item => {
        const categoryMatch =
            selectedCategory === "Semua" || item.category === selectedCategory;

        const searchMatch =
            item.name.toLowerCase().includes(keyword);

        return categoryMatch && searchMatch;
    });

    renderDestinations(result);
}

searchInput.addEventListener("input", applySearch);

const heroSearch = document.getElementById("heroSearch");
const heroSearchBtn = document.getElementById("heroSearchBtn");

function runHeroSearch() {
    searchInput.value = heroSearch.value;
    document.getElementById("destinasi").scrollIntoView({ behavior: "smooth" });
    applySearch();
}

heroSearch.addEventListener("keydown", event => {
    if (event.key === "Enter") runHeroSearch();
});

heroSearchBtn.addEventListener("click", runHeroSearch);

document.getElementById("navSearch").addEventListener("click", () => {
    document.getElementById("searchInput").focus();
    document.getElementById("destinasi").scrollIntoView({ behavior: "smooth" });
});

const modal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");

galleryGrid.addEventListener("click", event => {
    const item = event.target.closest(".gallery-item");
    if (!item) return;

    modalImage.src = item.dataset.image;
    modalCaption.textContent = item.dataset.caption;
    modal.classList.remove("hidden");
});

function closeImageModal() {
    modal.classList.add("hidden");
    modalImage.src = "";
}

document.getElementById("closeModal").addEventListener("click", closeImageModal);

modal.addEventListener("click", event => {
    if (event.target === modal) closeImageModal();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeImageModal();
});

document.getElementById("contactForm").addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    const nameError = document.getElementById("nameError");
    const messageError = document.getElementById("messageError");
    const success = document.getElementById("successMessage");

    nameError.textContent = "";
    messageError.textContent = "";
    success.textContent = "";

    let valid = true;

    if (name === "") {
        nameError.textContent = "Nama wajib diisi.";
        valid = false;
    }

    if (message === "") {
        messageError.textContent = "Pesan wajib diisi.";
        valid = false;
    }

    if (valid) {
        const emailTujuan = "wisatamedanexplore@gmail.com";

    window.location.href =
    `mailto:${emailTujuan}?subject=${encodeURIComponent("Tanya Tentang Destinasi")}&body=${encodeURIComponent(`Nama: ${name}\n\nPesan: ${message}`)}`;
    }
});

const detailModal = document.createElement("div");

detailModal.className = "detail-modal-overlay hidden";

detailModal.innerHTML = `
    <div class="detail-modal-box">

        <button id="detailClose">×</button>

        <img id="detailImage" class="detail-main-image">

        <div id="detailGallery" class="detail-gallery"></div>

        <div class="detail-body">

            <span id="detailCategory" class="badge"></span>

            <h2 id="detailTitle"></h2>

            <div class="detail-location-rating">
                <div>
                    📍
                    <span>
                        <small>Lokasi</small>
                        <b id="detailLocation"></b>
                    </span>
                </div>

                <div>
                    ⭐
                    <span>
                        <small>Rating</small>
                        <b id="detailRating"></b>
                    </span>
                </div>
            </div>

            <h3>Deskripsi</h3>

            <p id="detailDescription"></p>

            <div class="detail-info">

                <div>
                    🏛️
                    <span>
                        <small>Kategori</small>
                        <b id="detailCategoryInfo"></b>
                    </span>
                </div>

                <div>
                    🎟️
                    <span>
                        <small>Harga Tiket</small>
                        <b id="detailTicket"></b>
                    </span>
                </div>

                <div>
                    🕐
                    <span>
                        <small>Jam Operasional</small>
                        <b id="detailHours"></b>
                    </span>
                </div>

                <div>
                    📍
                    <span>
                        <small>Alamat</small>
                        <b id="detailAddress"></b>
                    </span>
                </div>

            </div>

            <div class="detail-buttons">

                <button id="detailMaps">
                    📍 Lihat di Google Maps →
                </button>

                <button id="detailShare">
                    ↗ Bagikan →
                </button>

            </div>

        </div>
    </div>
`;

document.body.appendChild(detailModal);


// Ketika card diklik
destinationContainer.addEventListener("click", function(event) {

    const card = event.target.closest(".destination-card");

    if (!card) return;

    const name = card.querySelector("h3").textContent;

    const item = destinations.find(function(destination) {
        return destination.name === name;
    });

    if (!item) return;


    // Isi data popup
    document.getElementById("detailImage").src = item.image;

    document.getElementById("detailTitle").textContent = item.name;

    document.getElementById("detailCategory").textContent = item.category;

    document.getElementById("detailLocation").textContent = item.location;

    document.getElementById("detailRating").textContent =
        item.rating || "-";

    document.getElementById("detailDescription").textContent =
        item.detailDescription || item.description;

    document.getElementById("detailCategoryInfo").textContent =
        item.category;

    document.getElementById("detailTicket").textContent =
        item.ticket || "-";

    document.getElementById("detailHours").textContent =
        item.hours || "-";

    document.getElementById("detailAddress").textContent =
        item.address || "-";


    // Gallery
    const gallery = document.getElementById("detailGallery");

    gallery.innerHTML = "";

    if (item.gallery) {

        item.gallery.forEach(function(image) {

            const img = document.createElement("img");

            img.src = image;

            img.onclick = function() {
                document.getElementById("detailImage").src = image;
            };

            gallery.appendChild(img);

        });

    }


    // Tombol Google Maps
    document.getElementById("detailMaps").onclick = function() {
        window.open(item.maps, "_blank");
    };


    // Tombol Bagikan
    document.getElementById("detailShare").onclick = function() {

        navigator.clipboard.writeText(window.location.href);

        alert("Link berhasil disalin!");

    };


    // Tampilkan popup
    detailModal.classList.remove("hidden");

});


// Tombol tutup
document.getElementById("detailClose").onclick = function() {

    detailModal.classList.add("hidden");

};


// Klik area luar popup untuk menutup
detailModal.onclick = function(event) {

    if (event.target === detailModal) {
        detailModal.classList.add("hidden");
    }

};

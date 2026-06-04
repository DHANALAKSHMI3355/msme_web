// ==========================
// HERO SLIDER
// ==========================

const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let slideTimer = null;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
}

function startSlideShow() {
    slideTimer = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 4000);
}

function resetSlideShow() {
    if (slideTimer) {
        clearInterval(slideTimer);
    }
    startSlideShow();
}

showSlide(currentSlide);
startSlideShow();

const prevArrow = document.querySelector(".hero-arrow.prev");
const nextArrow = document.querySelector(".hero-arrow.next");

prevArrow.addEventListener("click", () => {
    showSlide(currentSlide - 1);
    resetSlideShow();
});

nextArrow.addEventListener("click", () => {
    showSlide(currentSlide + 1);
    resetSlideShow();
});


// ==========================
// SEARCH FUNCTION
// ==========================

const searchBtn = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");

const schemes = [
    "PMEGP",
    "CGTMSE",
    "MUDRA",
    "Stand-Up India",
    "SIDBI Make in India",
    "ASPIRE",
    "SFURTI",
    "ZED Certification",
    "RAMP",
    "National SC-ST Hub",
    "Coir Vikas Yojana",
    "PM Vishwakarma",
    "CLCSS",
    "IIUS",
    "MSME Cluster Development Programme",
    "Technology Upgradation Fund Scheme",
    "Market Development Assistance (MDA)",
    "Incubation Support for MSMEs",
    "Entrepreneurship Skill Development Programme (ESDP)"
];

const categorySchemes = {
    "Loan & Finance": [
        "PMEGP",
        "CGTMSE",
        "MUDRA",
        "Stand-Up India",
        "SIDBI Make in India"
    ],
    "Infrastructure": [
        "IIUS",
        "MSME Cluster Development Programme",
        "Technology Upgradation Fund Scheme",
        "CLCSS"
    ],
    "Skill Development": [
        "ASPIRE",
        "PM Vishwakarma",
        "Entrepreneurship Skill Development Programme (ESDP)"
    ],
    "Innovation": [
        "ZED Certification",
        "Incubation Support for MSMEs",
        "Technology Upgradation Fund Scheme"
    ],
    "Export Support": [
        "RAMP",
        "Market Development Assistance (MDA)",
        "Export Promotion Schemes"
    ],
    "Artisans": [
        "PM Vishwakarma",
        "Coir Vikas Yojana",
        "SFURTI"
    ],
    "Special Support & Inclusion": [
        "National SC-ST Hub",
        "Stand-Up India",
        "Women Entrepreneurship Support"
    ]
};

searchBtn.addEventListener("click", () => {

    const value = searchInput.value.toLowerCase().trim();

    if(value === ""){
        alert("Please enter a scheme name");
        return;
    }

    const result = schemes.filter(scheme =>
        scheme.toLowerCase().includes(value)
    );

    if(result.length > 0){
        alert("Matching Schemes:\n\n" + result.join("\n"));
    }
    else{
        alert("No matching scheme found");
    }

});


// ==========================
// ENTER KEY SEARCH
// ==========================

searchInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        searchBtn.click();
    }

});


// ==========================
// APPLY NOW BUTTON
// ==========================

const applyBtn =
document.querySelector(".apply-btn");

applyBtn.addEventListener("click", () => {

    alert("Redirecting to MSME Application Portal");

    // Example
    // window.location.href = "apply.html";

});


// ==========================
// VIEW SCHEMES BUTTON
// ==========================

const viewBtn =
document.querySelector(".view-btn");

viewBtn.addEventListener("click", () => {

    alert("Opening Schemes Page");

    // Example
    // window.location.href = "schemes.html";

});


// ==========================
// CATEGORY CARD CLICK
// ==========================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const category = card.querySelector("h3").innerText;
        const relatedSchemes = categorySchemes[category] || ["No related scheme list available yet"];

        alert(
            "Category: " + category + "\n\n" +
            "Related MSME schemes:\n• " + relatedSchemes.join("\n• ")
        );
    });
});


// ==========================
// SCHEME DETAILS BUTTON
// ==========================

const loginBtn = document.querySelector(".login");
const registerBtn = document.querySelector(".register");
const authButtons = document.getElementById("authButtons");
const userIconBtn = document.getElementById("userIconBtn");
const userMenu = document.getElementById("userMenu");
const logoutBtn = document.getElementById("logoutBtn");
const authModal = document.getElementById("authModal");
const closeModalBtn = document.getElementById("closeModal");
const authForm = document.getElementById("authForm");
const authModalTitle = document.getElementById("authModalTitle");
const authModalText = document.getElementById("authModalText");
const authSubmitBtn = document.getElementById("authSubmitBtn");
const authName = document.getElementById("authName");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authConfirm = document.getElementById("authConfirm");

let authMode = "register";

function showLoggedInView(userName) {
    if (authButtons) authButtons.classList.add("hidden");
    if (userIconBtn) {
        userIconBtn.classList.add("visible");
        userIconBtn.setAttribute("title", userName || "Logged in user");
    }
    if (userMenu) userMenu.setAttribute("aria-hidden", "true");
}

function resetAuthState() {
    localStorage.removeItem("msmeUser");
    if (authButtons) authButtons.classList.remove("hidden");
    if (userIconBtn) {
        userIconBtn.classList.remove("visible");
        userIconBtn.setAttribute("title", "Logged in user");
    }
    if (userMenu) {
        userMenu.classList.remove("show");
        userMenu.setAttribute("aria-hidden", "true");
    }
}

function openAuthModal(mode) {
    authMode = mode;
    if (mode === "login") {
        authModalTitle.textContent = "Login";
        authModalText.textContent = "Enter your email and password to continue.";
        authSubmitBtn.textContent = "Login";
        authName.style.display = "none";
        authConfirm.style.display = "none";
    } else {
        authModalTitle.textContent = "Create Account";
        authModalText.textContent = "Enter your username, verification email, and password.";
        authSubmitBtn.textContent = "Register";
        authName.style.display = "block";
        authConfirm.style.display = "block";
    }
    authModal.classList.add("open");
    authModal.setAttribute("aria-hidden", "false");
}

function closeAuthModal() {
    authModal.classList.remove("open");
    authModal.setAttribute("aria-hidden", "true");
    authForm.reset();
}

if (loginBtn) loginBtn.addEventListener("click", () => openAuthModal("login"));
if (registerBtn) registerBtn.addEventListener("click", () => openAuthModal("register"));
if (userIconBtn) {
    userIconBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (localStorage.getItem("msmeUser")) {
            userMenu.classList.toggle("show");
            userMenu.setAttribute("aria-hidden", String(!userMenu.classList.contains("show")));
        }
    });
}
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        resetAuthState();
        userMenu.classList.remove("show");
        alert("You have been logged out. You can sign in again from the top buttons.");
    });
}

document.addEventListener("click", () => {
    if (userMenu) {
        userMenu.classList.remove("show");
        userMenu.setAttribute("aria-hidden", "true");
    }
});
if (closeModalBtn) closeModalBtn.addEventListener("click", closeAuthModal);
if (authModal) authModal.addEventListener("click", (e) => {
    if (e.target === authModal) closeAuthModal();
});

if (authForm) {
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = authName.value.trim();
        const email = authEmail.value.trim();
        const password = authPassword.value;
        const confirmPassword = authConfirm.value;

        if (authMode === "register") {
            if (!name) {
                alert("Please enter your username.");
                return;
            }
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            localStorage.setItem("msmeUser", JSON.stringify({ name, email, password }));
            showLoggedInView(name);
            closeAuthModal();
            alert("Registration successful. Verification email sent to " + email);
            return;
        }

        const savedUser = JSON.parse(localStorage.getItem("msmeUser") || "null");
        if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
            alert("Invalid email or password.");
            return;
        }

        showLoggedInView(savedUser.name);
        closeAuthModal();
        alert("Login successful. Welcome back, " + savedUser.name);
    });
}

const savedUser = JSON.parse(localStorage.getItem("msmeUser") || "null");
if (savedUser) {
    showLoggedInView(savedUser.name);
}

const detailButtons =
document.querySelectorAll(".scheme-card button");

detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        const scheme =
        button.parentElement.querySelector("h3").innerText;

        alert(
            scheme +
            "\n\nMore details will open here."
        );

    });

});


// ==========================
// SCROLL ANIMATION
// ==========================

const observer =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform =
            "translateY(0px)";

        }

    });

});

document.querySelectorAll(
".card, .scheme-card"
).forEach(el => {

    el.style.opacity = "0";
    el.style.transform =
    "translateY(50px)";
    el.style.transition =
    "0.8s ease";

    observer.observe(el);

});


// ==========================
// WELCOME MESSAGE
// ==========================

window.addEventListener("load", () => {

    console.log(
        "MSME Portal Loaded Successfully"
    );

});
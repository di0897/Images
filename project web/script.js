document.addEventListener("DOMContentLoaded", function() {
    
    // ==================================================
    // 1. BOOT SEQUENCE (LOADING SCREEN)
    // ==================================================
    const bootScreen = document.getElementById("boot-screen");
    const progressBar = document.getElementById("progress-bar");
    const percentage = document.getElementById("percentage");
    const loaderText = document.getElementById("loader-text");
    
    const logs = [
        "Sabarr yaa...", 
        "Lagi nyiapin yang terbaik...", 
        "masih Loading...", 
        "dikit lagi...",
        "System Ready."
    ];
    
    let width = 0;
    const interval = setInterval(() => {
        width += Math.random() * 3; 
        if (width > 100) width = 100;
        
        progressBar.style.width = width + "%";
        percentage.innerText = Math.floor(width) + "%";
        
        let logIndex = Math.floor((width / 100) * logs.length);
        if(logIndex < logs.length) loaderText.innerText = logs[logIndex];

        if (width === 100) {
            clearInterval(interval);
            setTimeout(() => {
                bootScreen.style.opacity = "0"; 
                setTimeout(() => {
                    bootScreen.style.display = "none";
                    AOS.refresh(); 
                }, 500);
            }, 500);
        }
    }, 40); 


    // ==================================================
    // 2. STATS COUNTER ANIMATION (Bergerak dari 0)
    // ==================================================
    const counters = document.querySelectorAll('.counter');
    const speed = 200; 

    const runCounter = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target'); 
                const count = +counter.innerText; 
                const inc = target / speed; 

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };
    
    // Animasi hanya jalan saat elemen terlihat di layar
    let observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            runCounter();
            observer.disconnect(); // Stop observing after running once
        }
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) observer.observe(statsSection);


    // ==================================================
    // 3. TYPEWRITER EFFECT (HERO)
    // ==================================================
    if(document.querySelector(".dynamic-text")){
        new Typed(".dynamic-text", {
            strings: [
                "System Analyst", 
                "Data Analyst", 
                "System Information Student",
                "Tech Enthusiast"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            loop: true,
            showCursor: true,
            cursorChar: '_'
        });
    }


    // ==================================================
    // 4. CERTIFICATE GENERATOR (Tanpa Gambar Fisik)
    // ==================================================
    const certData = [
        { title: "Data Science Math", org: "Duke University", icon: "fa-calculator" },
        { title: "Quantitative Modeling", org: "Wharton", icon: "fa-chart-line" },
        { title: "Creative Thinking", org: "Imperial College", icon: "fa-lightbulb" },
        { title: "Financial Leadership", org: "Cambridge", icon: "fa-money-bill-wave" },
        { title: "P2P Protocols", org: "Univ. Colorado", icon: "fa-network-wired" },
        { title: "Google Data Analytics", org: "Google", icon: "fa-database" },
        { title: "Python for Everybody", org: "Univ. Michigan", icon: "fa-code" },
        { title: "Machine Learning", org: "Stanford", icon: "fa-robot" },
        { title: "IBM Data Science", org: "IBM", icon: "fa-server" },
        { title: "SQL for Data Science", org: "UC Davis", icon: "fa-table" },
        { title: "Excel Business", org: "Macquarie", icon: "fa-file-excel" },
        { title: "Cloud Intro", org: "AWS", icon: "fa-cloud" },
        { title: "Cybersecurity", org: "Cisco", icon: "fa-shield-alt" },
        { title: "Project Management", org: "Google", icon: "fa-tasks" },
        { title: "Digital Marketing", org: "HubSpot", icon: "fa-bullhorn" },
        { title: "UI/UX Design", org: "CalArts", icon: "fa-paint-brush" },
        { title: "Business Intel", org: "MicroStrategy", icon: "fa-chart-bar" },
        { title: "Network Eng.", org: "Cisco", icon: "fa-project-diagram" },
        { title: "Adv. Statistics", org: "Johns Hopkins", icon: "fa-infinity" },
        { title: "Full Stack Dev", org: "RevoU", icon: "fa-laptop-code" }
    ];

    const container = document.getElementById("certificate-container");
    
    if(container) {
        certData.forEach((cert, i) => {
            const cardHTML = `
            <div class="cert-card" data-aos="fade-up" data-aos-delay="${(i % 4) * 100}">
                <div class="cert-visual">
                    <i class="fas ${cert.icon}"></i>
                </div>
                <div class="cert-body">
                    <h3>${cert.title}</h3>
                    <p>${cert.org}</p>
                    <a href="#" class="cert-btn">Verify Credential</a>
                </div>
            </div>
            `;
            container.innerHTML += cardHTML;
        });
    }


    // ==================================================
    // 5. NAVBAR & MOBILE MENU
    // ==================================================
    const nav = document.querySelector(".navbar");
    const menuBtn = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    window.addEventListener("scroll", () => {
        nav.classList.toggle("sticky", window.scrollY > 50);
    });

    if(menuBtn){
        menuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }


    // ==================================================
    // 6. CUSTOM CURSOR
    // ==================================================
    const cursor = document.querySelector(".cursor");
    const cursor2 = document.querySelector(".cursor2");

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        
        setTimeout(() => {
            cursor2.style.left = e.clientX + "px";
            cursor2.style.top = e.clientY + "px";
        }, 50);
    });

    const hoverables = document.querySelectorAll("a, button, .cert-card, .gallery-item");
    hoverables.forEach(el => {
        el.addEventListener("mouseenter", () => cursor2.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursor2.classList.remove("hover"));
    });


    // ==================================================
    // 7. INITIALIZE AOS
    // ==================================================
    AOS.init({
        once: true,
        offset: 100,
        duration: 1000,
        easing: 'ease-out-cubic'
    });
});

// Fungsi Global untuk menutup menu
function closeMenu() {
    const navLinks = document.querySelector(".nav-links");
    if(navLinks) navLinks.classList.remove("active");
}
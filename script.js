/* ============================================================
   SarthakCodes Portfolio — shared vanilla JS
   No external libraries needed.
   ============================================================ */

/* ----- 1. NAVIGATION: mobile menu toggle ----- */
function initMobileMenu() {
  const btn = document.getElementById("menuToggle");
  const menu = document.getElementById("myNavMenu");
  if (!btn || !menu) return;

  const toggle = () => {
    const isOpen = menu.classList.toggle("open");
    const icon = btn.querySelector("i");
    if (icon) icon.className = isOpen ? "uil uil-times" : "uil uil-bars";
    btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  btn.addEventListener("click", toggle);

  // close menu when a link is clicked
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      const icon = btn.querySelector("i");
      if (icon) icon.className = "uil uil-bars";
    }),
  );
}

/* ----- 2. HEADER SHADOW + SCROLL PROGRESS + BACK-TO-TOP ----- */
function initScrollEffects() {
  const nav =
    document.getElementById("header") || document.querySelector("nav");
  const progress = document.getElementById("scroll-progress");
  const backToTop = document.getElementById("back-to-top");

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;

    if (nav && nav.classList && !nav.classList.contains("page-nav")) {
      nav.classList.toggle("scrolled", y > 40);
    }

    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    if (progress && max > 0) {
      progress.style.width = `${(y / max) * 100}%`;
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", y > 420);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" }),
    );
  }
}

/* ----- 3. TYPING EFFECT (vanilla) ----- */
function initTyping() {
  const el = document.querySelector(".typedText");
  if (!el) return;

  const words = ["Designer.", "Developer.", "Data Analyst."];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const type = () => {
    const word = words[wordIndex];
    charIndex = deleting ? charIndex - 1 : charIndex + 1;
    el.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 95;
    if (!deleting && charIndex === word.length) {
      delay = 1600;
      deleting = true;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 350;
    }
    setTimeout(type, delay);
  };

  type();
}

/* ----- 4. SCROLL REVEAL (IntersectionObserver, singleton) ----- */
let revealObserver = null;

function initReveal() {
  const items = document.querySelectorAll(
    ".reveal, .section-title, .eyebrow, .about-info, .skills-box, .project-box, .contact-info, .project-row, .client-card",
  );

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("revealed"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
  }

  items.forEach((el, i) => {
    if (el.classList.contains("revealed")) return; // idempotent re-runs
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
    revealObserver.observe(el);
  });
}

/* ----- 5. ACTIVE LINK HIGHLIGHTING ----- */
function initActiveLinks() {
  const sections = document.querySelectorAll("section[id]");
  if (!sections.length) return;

  const links = document.querySelectorAll(".nav-link");
  const linkFor = (id) =>
    [...links].find((l) => (l.getAttribute("href") || "").slice(1) === id);

  const onScroll = () => {
    const y = window.scrollY + 120;
    let current = "";
    sections.forEach((s) => {
      if (y >= s.offsetTop) current = s.id;
    });
    links.forEach((l) => l.classList.remove("active-link"));
    const active = linkFor(current);
    if (active) active.classList.add("active-link");
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ----- 6. CONTACT FORM (Google Sheet) ----- */
function initContactForm() {
  const form = document.forms["google-sheet"];
  if (!form) return;

  const status = document.getElementById("form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  const scriptURL =
    "https://docs.google.com/spreadsheets/d/1NUlyE39Gd8wzZumVo6MgTvmOgj8Gjip0e2e1ZtTosgk/edit?usp=sharing";

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitBtn) submitBtn.disabled = true;

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(() => {
        form.reset();
        if (status) {
          status.classList.add("show");
          status.innerHTML =
            '<i class="uil uil-check-circle"></i> Thanks for reaching out — I\'ll get back to you soon!';
          setTimeout(() => status.classList.remove("show"), 5000);
        }
      })
      .catch((err) => {
        console.error("Error!", err.message);
        // graceful fallback: open the mail client
        window.location.href =
          "mailto:sarthak04.c@gmail.com?subject=Inquiries&body=Hey%20Sarthak!...";
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
}

/* ----- 7. PROJECTS PAGE: render from projects.json ----- */
function initProjectsPage() {
  const projectsContainer = document.getElementById("projects-container");
  const challengeContainer = document.getElementById("challenge-container");

  fetch("projects.json")
    .then((res) => res.json())
    .then((data) => {
      // ---------------- Projects ----------------
      if (projectsContainer) {
        projectsContainer.innerHTML = data.projects
          .map(
            (p) => `
            <article class="project-row reveal">
              <div class="project-media" onclick="window.open('${p.link}', '_blank')">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
                <div class="play-hint">
                  <i class="uil uil-arrow-up-right"></i>
                </div>
              </div>

              <div class="project-card">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-description">${p.description}</p>

                <button
                  class="btn btn-primary"
                  onclick="window.open('${p.link}', '_blank')">

                  View Project
                  <i class="uil uil-external-link-alt"></i>

                </button>
              </div>
            </article>
          `,
          )
          .join("");
      }

      // ---------------- 30 Days Challenge ----------------
      if (challengeContainer) {
        challengeContainer.innerHTML = data.challengeDays
          .map(
            (item) => `
            <a href="${item.link}"
               target="_blank"
               rel="noopener noreferrer">

              <img
                src="${item.image}"
                alt="Day ${item.day}"
                loading="lazy">

            </a>
          `,
          )
          .join("");
      }

      initReveal();
    })
    .catch((err) => console.error("Error loading JSON:", err));
}

/* ----- 8. CLIENTS PAGE: render clients ----- */
function initClientsPage() {
  const container = document.getElementById("clients-container");
  if (!container) return;

  const clients = [
    {
      name: "John Doe",
      feedback:
        "Absolutely amazing service! The project exceeded expectations.",
      img: "assets/client1.JPG",
    },
    {
      name: "Jane Smith",
      feedback: "Professional and top-notch quality. Will collaborate again!",
      img: "assets/client2.jpg",
    },
    {
      name: "Mike Johnson",
      feedback: "Delivered exactly what was promised, and even more!",
      img: "assets/client3.jpg",
    },
  ];

  container.innerHTML = clients
    .map(
      (c) => `
      <article class="client-card reveal">
        <img src="${c.img}" alt="${c.name}" class="client-img" loading="lazy" />
        <h3 class="client-name">${c.name}</h3>
        <p class="client-feedback">${c.feedback}</p>
      </article>`,
    )
    .join("");

  initReveal();
}

/* ----- 9. EYES THAT FOLLOW THE CURSOR (projects page) ----- */
function initEyes() {
  const eyes = document.querySelectorAll(".eye");
  if (!eyes.length) return;

  document.addEventListener("mousemove", (e) => {
    eyes.forEach((eye) => {
      const pupil = eye.querySelector(".pupil");
      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const dist = Math.min(7, Math.hypot(e.clientX - cx, e.clientY - cy) / 14);
      pupil.style.transform = `translate(${Math.cos(angle) * dist}px, ${
        Math.sin(angle) * dist
      }px)`;
    });
  });
}

/* ----- 10. MARQUEE: duplicate content for a seamless loop ----- */
function initMarquee() {
  const marquee = document.querySelector(".marquee");
  const content = document.querySelector(".marquee-content");
  if (!marquee || !content) return;
  const clone = content.cloneNode(true);
  clone.setAttribute("aria-hidden", "true");
  marquee.appendChild(clone);
}

/* ----- BOOT ----- */
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollEffects();
  initTyping();
  initReveal();
  initActiveLinks();
  initContactForm();
  initProjectsPage();
  initClientsPage();
  initEyes();
  initMarquee();
});

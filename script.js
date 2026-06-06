// =========================================
// Nayan Jyoti Thapa - Portfolio Scripts
// =========================================

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const siteNav = document.querySelector(".site-nav");
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector("#mobileMenu");
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  const sectionLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const greeting = document.querySelector("#greeting");
  const typewriter = document.querySelector("#typewriter");
  const animatedItems = document.querySelectorAll(".fade-up, .fade-in");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const workCards = document.querySelectorAll(".work-card");
  const modal = document.querySelector("#workModal");
  const modalTitle = document.querySelector("#modalTitle");
  const modalObjective = document.querySelector("#modalObjective");
  const modalBody = document.querySelector("#modalBody");
  const modalClose = document.querySelector(".modal-close");
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const legalOpenButtons = document.querySelectorAll("[data-legal-open]");
  const legalCloseButtons = document.querySelectorAll("[data-legal-close]");
  const legalPanels = document.querySelectorAll(".legal-panel");

  const updateNavState = function () {
    if (!siteNav) {
      return;
    }
    siteNav.classList.toggle("scrolled", window.scrollY > 80);
  };

  const closeModal = function () {
    if (!modal) {
      return;
    }
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-locked");
  };

  const closeLegalPanel = function (panel) {
    if (!panel) {
      return;
    }
    panel.classList.remove("active");
    document.body.classList.remove("modal-locked");
  };

  const openLegalById = function (id) {
    const panel = id ? document.getElementById(id) : null;
    if (!panel) {
      return;
    }
    panel.classList.add("active");
    document.body.classList.add("modal-locked");
  };

  updateNavState();
  window.addEventListener("scroll", updateNavState, { passive: true });

  if (greeting) {
    const hour = new Date().getHours();
    let message = "Good Evening \uD83C\uDF19";
    if (hour < 12) {
      message = "Good Morning \u2600\uFE0F";
    } else if (hour < 17) {
      message = "Good Afternoon \uD83C\uDF24\uFE0F";
    }
    greeting.textContent = message;
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      const isOpen = mobileMenu.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
      hamburger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });
  }

  allNavLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (mobileMenu && mobileMenu.classList.contains("open")) {
        mobileMenu.classList.remove("open");
      }
      if (hamburger) {
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "Open menu");
      }
    });
  });

  if (typewriter) {
    const words = [
      "Your Digital Marketer",
      "Your Performance Ads Specialist",
      "Your Google & Meta Ads Expert",
      "Your ROI-Driven Campaigner"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    window.setInterval(function () {
      const currentWord = words[wordIndex] || "";
      charIndex = deleting ? charIndex - 1 : charIndex + 1;
      typewriter.textContent = currentWord.slice(0, charIndex);

      if (!deleting && charIndex === currentWord.length) {
        deleting = true;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }, 115);
  }

  if ("IntersectionObserver" in window && animatedItems.length > 0) {
    const animationObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedItems.forEach(function (item, index) {
      if (item) {
        item.style.transitionDelay = String((index % 6) * 80) + "ms";
        animationObserver.observe(item);
      }
    });
  } else {
    animatedItems.forEach(function (item) {
      if (item) {
        item.classList.add("animate");
      }
    });
  }

  if ("IntersectionObserver" in window && sections.length > 0 && sectionLinks.length > 0) {
    const activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        const sectionId = entry.target.getAttribute("id");
        sectionLinks.forEach(function (link) {
          const href = link.getAttribute("href");
          link.classList.toggle("active", href === "#" + sectionId);
        });
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 });

    sections.forEach(function (section) {
      activeObserver.observe(section);
    });
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.getAttribute("data-filter") || "all";
      let visibleIndex = 0;

      filterButtons.forEach(function (item) {
        item.classList.toggle("active", item === button);
      });

      workCards.forEach(function (card) {
        const category = card.getAttribute("data-category");
        const shouldShow = filter === "all" || category === filter;
        if (shouldShow) {
          card.hidden = false;
          card.style.transitionDelay = String(visibleIndex * 80) + "ms";
          visibleIndex += 1;
          card.classList.remove("animate");
          card.offsetHeight;
          card.classList.add("animate");
        } else {
          card.hidden = true;
        }
      });
    });
  });

  const openModal = function (card) {
    if (!card || !modal || !modalTitle || !modalObjective || !modalBody) {
      return;
    }

    const title = card.getAttribute("data-title") || "Campaign Details";
    const objective = card.getAttribute("data-objective") || "Campaign";
    const budget = card.getAttribute("data-budget") || "Sample budget";
    const description = card.getAttribute("data-description") || "";
    const details = card.getAttribute("data-details") || "";
    const targeting = card.getAttribute("data-targeting") || "";
    const learning = card.getAttribute("data-learning") || "";

    modalTitle.textContent = title;
    modalObjective.textContent = objective;
    modalBody.innerHTML = "";

    [
      ["Budget", budget],
      ["Full Description", description],
      ["Strategy Used", details],
      ["Targeting Approach", targeting],
      ["Key Learnings", learning]
    ].forEach(function (item) {
      const paragraph = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = item[0] + ": ";
      paragraph.appendChild(strong);
      paragraph.appendChild(document.createTextNode(item[1]));
      modalBody.appendChild(paragraph);
    });

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-locked");
  };

  workCards.forEach(function (card) {
    const detailsButton = card.querySelector(".details-btn");
    if (detailsButton) {
      detailsButton.addEventListener("click", function () {
        openModal(card);
      });
    }
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  }

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameField = contactForm.querySelector('[name="name"]');
      const emailField = contactForm.querySelector('[name="email"]');
      const messageField = contactForm.querySelector('[name="message"]');
      const name = nameField ? nameField.value.trim() : "";
      const email = emailField ? emailField.value.trim() : "";
      const message = messageField ? messageField.value.trim() : "";

      if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "#EF4444";
        formMessage.style.display = "block";
        return;
      }

      formMessage.textContent = "Thanks! I'll get back to you at nayan.nexare@gmail.com soon.";
      formMessage.style.color = "#22C55E";
      formMessage.style.display = "block";
      contactForm.reset();
    });
  }

  legalOpenButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openLegalById(button.getAttribute("data-legal-open"));
    });
  });

  legalCloseButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const id = button.getAttribute("data-legal-close");
      closeLegalPanel(id ? document.getElementById(id) : null);
    });
  });

  legalPanels.forEach(function (panel) {
    panel.addEventListener("click", function (event) {
      if (event.target === panel) {
        closeLegalPanel(panel);
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    closeModal();
    legalPanels.forEach(function (panel) {
      if (panel.classList.contains("active")) {
        closeLegalPanel(panel);
      }
    });
  });
});

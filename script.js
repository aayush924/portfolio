function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("[data-animate]");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));

  const experienceArticles = document.querySelectorAll(
    "#experience article"
  );
  experienceArticles.forEach((article, index) => {
    article.style.opacity = "0";
    article.style.transform = "translateY(20px)";
    article.style.transition = `opacity 0.4s ease ${index * 0.06}s, transform 0.4s ease ${index * 0.06}s`;
  });

  const articleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const articles = entry.target.querySelectorAll("article");
          articles.forEach((article) => {
            article.style.opacity = "1";
            article.style.transform = "translateY(0)";
          });
          articleObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const experienceContainers = document.querySelectorAll(
    "#experience .details-container"
  );
  experienceContainers.forEach((container) =>
    articleObserver.observe(container)
  );

  document.querySelectorAll(".color-container").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor-glow");
  document.body.appendChild(cursor);

  const style = document.createElement("style");
  style.textContent = `
    .custom-cursor-glow {
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(53,53,53,0.04) 0%, transparent 70%);
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 9999;
      transition: opacity 0.3s ease;
      opacity: 0;
    }
  `;
  document.head.appendChild(style);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursor.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});

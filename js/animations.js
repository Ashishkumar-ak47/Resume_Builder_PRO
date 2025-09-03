// Enhanced animations and interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll(".features, .bottom-cta").forEach((section) => {
    observer.observe(section);
  });

  // Add stagger effect to feature cards
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Parallax effect for floating elements
  let ticking = false;

  function updateFloatingElements() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // Move floating shapes
    const shapes = document.querySelectorAll(".floating-shape");
    shapes.forEach((shape, index) => {
      const speed = 0.3 + index * 0.1;
      shape.style.transform = `translateY(${rate * speed}px)`;
    });

    // Move floating text
    const texts = document.querySelectorAll(".floating-text");
    texts.forEach((text, index) => {
      const speed = 0.2 + index * 0.05;
      text.style.transform = `translateY(${rate * speed}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateFloatingElements);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestTick);

  // Mouse movement effect for hero section
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    heroContent.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroContent.style.transform = "translate(0, 0)";
  });

  // Add sparkle effect on button hover
  function createSparkle(button) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleAnim 0.6s ease-out forwards;
        `;

    const rect = button.getBoundingClientRect();
    sparkle.style.left = Math.random() * rect.width + "px";
    sparkle.style.top = Math.random() * rect.height + "px";

    button.appendChild(sparkle);

    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 600);
  }

  // Add sparkle animation to CSS if not exists
  if (!document.querySelector("#sparkle-animation")) {
    const style = document.createElement("style");
    style.id = "sparkle-animation";
    style.textContent = `
            @keyframes sparkleAnim {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: scale(1) rotate(180deg);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  // Add sparkle effect to CTA buttons
  const ctaButtons = document.querySelectorAll(
    ".cta-button, .cta-secondary-button",
  );
  ctaButtons.forEach((button) => {
    button.style.position = "relative";
    button.style.overflow = "hidden";

    button.addEventListener("mouseenter", () => {
      const sparkleInterval = setInterval(() => {
        createSparkle(button);
      }, 100);

      button.addEventListener(
        "mouseleave",
        () => {
          clearInterval(sparkleInterval);
        },
        { once: true },
      );
    });
  });

  // Typewriter effect for hero title
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Apply typewriter effect after initial animation
  setTimeout(() => {
    const titleGradient = document.querySelector(".title-gradient");
    if (titleGradient) {
      const originalText = titleGradient.textContent;
      typeWriter(titleGradient, originalText, 150);
    }
  }, 1500);

  // Add floating animation to stat cards
  const statCards = document.querySelectorAll(".stat-card");
  statCards.forEach((card, index) => {
    setInterval(() => {
      card.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 5}px)`;
    }, 50);
  });

  // Random color change for floating text
  const colors = [
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f59e0b",
    "#ec4899",
    "#06b6d4",
  ];
  const floatingTexts = document.querySelectorAll(".floating-text");

  setInterval(() => {
    floatingTexts.forEach((text) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      text.style.color = randomColor;
    });
  }, 3000);

  // Add ripple effect to buttons
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  // Add ripple CSS if not exists
  if (!document.querySelector("#ripple-animation")) {
    const style = document.createElement("style");
    style.id = "ripple-animation";
    style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleAnim 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes rippleAnim {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
    document.head.appendChild(style);
  }

  // Apply ripple effect to all buttons
  document.querySelectorAll("button").forEach((button) => {
    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.addEventListener("click", createRipple);
  });
});

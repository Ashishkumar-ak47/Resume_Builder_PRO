// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the application
  initializeApp();

  function initializeApp() {
    setupNavigation();
    setupFormHandling();
    setupLocalStorage();
    animateNumbers();
  }

  // Navigation handling
  function setupNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Mobile menu toggle (if needed in future)
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener("click", toggleMobileMenu);
    }
  }

  function toggleMobileMenu() {
    const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
  }

  // Form handling and data management
  function setupFormHandling() {
    // Initialize form data
    window.resumeData = {
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        profile: "",
      },
      experience: [],
      education: [],
      skills: [],
      certifications: [],
      selectedTemplate: null,
    };
  }

  // Local storage management
  function setupLocalStorage() {
    // Load existing data from localStorage
    const savedData = localStorage.getItem("resumeBuilderData");
    if (savedData) {
      try {
        window.resumeData = JSON.parse(savedData);
      } catch (e) {
        console.warn("Could not parse saved resume data");
      }
    }

    // Save data function
    window.saveResumeData = function () {
      localStorage.setItem(
        "resumeBuilderData",
        JSON.stringify(window.resumeData),
      );
    };

    // Clear data function
    window.clearResumeData = function () {
      localStorage.removeItem("resumeBuilderData");
      window.resumeData = {
        personalInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          profile: "",
        },
        experience: [],
        education: [],
        skills: [],
        certifications: [],
        selectedTemplate: null,
      };
    };
  }

  // Animate numbers in stats
  function animateNumbers() {
    const numberElements = document.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });

    numberElements.forEach((el) => observer.observe(el));
  }

  function animateNumber(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ""));
    const suffix = text.replace(/[\d,]/g, "");
    const duration = 2000;
    const stepTime = 50;
    const steps = duration / stepTime;
    const increment = number / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        current = number;
        clearInterval(timer);
      }

      element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, stepTime);
  }

  // Page navigation functions
  window.startBuilding = function () {
    // Create personal info page if it doesn't exist
    if (!document.querySelector(".personal-info-page")) {
      createPersonalInfoPage();
    } else {
      showPage("personal-info");
    }
  };

  window.navigateToPage = function (pageId) {
    showPage(pageId);
  };

  function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll(".page").forEach((page) => {
      page.style.display = "none";
    });

    // Show target page
    const targetPage = document.querySelector(`.${pageId}-page`);
    if (targetPage) {
      targetPage.style.display = "block";
      targetPage.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Create personal info page
  function createPersonalInfoPage() {
    const pageHTML = `
            <div class="page personal-info-page" style="min-height: 100vh; background: white; padding: 2rem;">
                <div class="max-w-2xl mx-auto">
                    <div class="page-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #e5e7eb;">
                        <button onclick="goBack()" class="back-button" style="background: none; border: none; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; color: #6b7280;">
                            <i class="fas fa-arrow-left"></i>
                        </button>
                        <h1 style="font-size: 1.5rem; font-weight: 600; color: #111827;">Personal Information</h1>
                        <button onclick="goHome()" class="close-button" style="background: none; border: none; cursor: pointer; color: #6b7280;">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <form id="personalInfoForm" style="display: flex; flex-direction: column; gap: 1.5rem;">
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">First Name</label>
                            <input type="text" name="firstName" placeholder="Your first name" required 
                                   style="width: 100%; padding: 0.75rem 1rem; background: #f3f4f6; border: none; border-radius: 0.75rem; font-size: 1rem;">
                        </div>
                        
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Last Name</label>
                            <input type="text" name="lastName" placeholder="Your last name" required
                                   style="width: 100%; padding: 0.75rem 1rem; background: #f3f4f6; border: none; border-radius: 0.75rem; font-size: 1rem;">
                        </div>
                        
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Email Address</label>
                            <input type="email" name="email" placeholder="youremail@example.com" required
                                   style="width: 100%; padding: 0.75rem 1rem; background: #f3f4f6; border: none; border-radius: 0.75rem; font-size: 1rem;">
                        </div>
                        
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Phone Number</label>
                            <input type="tel" name="phone" placeholder="(123) 456-7890" required
                                   style="width: 100%; padding: 0.75rem 1rem; background: #f3f4f6; border: none; border-radius: 0.75rem; font-size: 1rem;">
                        </div>
                        
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: #374151;">Profile Summary</label>
                            <textarea name="profile" placeholder="A brief summary of your profile" rows="4"
                                      style="width: 100%; padding: 0.75rem 1rem; background: #f3f4f6; border: none; border-radius: 0.75rem; font-size: 1rem; resize: vertical;"></textarea>
                        </div>
                    </form>
                    
                    <div style="position: fixed; bottom: 0; left: 0; right: 0; padding: 1rem; background: white; border-top: 1px solid #e5e7eb;">
                        <button type="submit" form="personalInfoForm" id="continueButton" disabled
                                style="width: 100%; padding: 1rem; background: #3b82f6; color: white; border: none; border-radius: 0.75rem; font-size: 1rem; font-weight: 600; cursor: pointer; opacity: 0.5;">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        `;

    document.body.insertAdjacentHTML("beforeend", pageHTML);

    // Setup form handling
    setupPersonalInfoForm();
    showPage("personal-info");
  }

  function setupPersonalInfoForm() {
    const form = document.getElementById("personalInfoForm");
    const continueButton = document.getElementById("continueButton");
    const inputs = form.querySelectorAll("input[required], textarea[required]");

    // Load existing data
    Object.keys(window.resumeData.personalInfo).forEach((key) => {
      const input = form.querySelector(`[name="${key}"]`);
      if (input && window.resumeData.personalInfo[key]) {
        input.value = window.resumeData.personalInfo[key];
      }
    });

    // Validate form
    function validateForm() {
      let isValid = true;
      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
        }
      });

      continueButton.disabled = !isValid;
      continueButton.style.opacity = isValid ? "1" : "0.5";
      continueButton.style.cursor = isValid ? "pointer" : "not-allowed";
    }

    // Add event listeners
    inputs.forEach((input) => {
      input.addEventListener("input", validateForm);
    });

    // Form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Save data
      const formData = new FormData(form);
      Object.keys(window.resumeData.personalInfo).forEach((key) => {
        window.resumeData.personalInfo[key] = formData.get(key) || "";
      });

      window.saveResumeData();

      // Show success message
      showSuccessMessage("Personal information saved!");

      // Navigate to next step (you can expand this)
      setTimeout(() => {
        alert(
          "Great! Your personal information has been saved. The complete resume builder with all steps is ready for further development.",
        );
      }, 1000);
    });

    validateForm();
  }

  // Utility functions
  window.goBack = function () {
    window.history.back();
  };

  window.goHome = function () {
    // Hide all pages and show home
    document.querySelectorAll(".page").forEach((page) => {
      page.style.display = "none";
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function showSuccessMessage(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
        `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Add toast animations
  if (!document.querySelector("#toast-animations")) {
    const style = document.createElement("style");
    style.id = "toast-animations";
    style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }

  // Debug helpers
  window.debugResumeData = function () {
    console.log("Current Resume Data:", window.resumeData);
  };

  console.log("Resume Builder initialized successfully!");
});

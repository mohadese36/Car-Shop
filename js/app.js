//بارگزاری ابتدا

// script.js
window.addEventListener('load', () => {

  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => {
      preloader.style.display = 'none';

      const content = document.getElementById('content');
      content.style.display = 'block';
  }, 1000); 
});

// nav scroll
document.addEventListener("DOMContentLoaded", () => {
    const secondNavbar = document.querySelector(".navbar:nth-of-type(2)");
    const stickyOffset = secondNavbar.offsetTop;
  
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > stickyOffset) {
        secondNavbar.classList.add("sticky");
      } else {
        secondNavbar.classList.remove("sticky");
      }
    });
});

//toggle-heart
  document.querySelectorAll('.toggle-heart').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        const label = this.nextElementSibling;
        if (this.checked) {
            label.style.color = "#e2264d"; // قرمز
        } else {
            label.style.color = "rgba(255, 255, 255, 0.4)";
        }
    });
});

//animation text
document.addEventListener("DOMContentLoaded", function (){
  document.querySelectorAll('.ml12').forEach((textWrapper) => {
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  });
  
  function runAnimation(textWrapper) {
    anime.timeline({ loop: false })
      .add({
        targets: textWrapper.querySelectorAll('.letter'),
        translateX: [40, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1500,
        delay: (el, i) => 500 + 50 * i
      });
  }
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
  
        entry.target.style.opacity = 1; 
        runAnimation(entry.target);
        observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.5 
  });
  
  document.querySelectorAll('.ml12').forEach((textWrapper) => {
    observer.observe(textWrapper);
  });
})

//featured
document.addEventListener("DOMContentLoaded", function () {
  const featuredItems = document.querySelectorAll(".featured-item");
  const featuredImage = document.getElementById("featured-image");
  let currentMode = ""; 

  function clearMobileChanges() {
    featuredItems.forEach(item => {
      const imageContainer = item.querySelector(".featured-image-container");
      if (imageContainer) {
        item.removeChild(imageContainer);
      }

      item.removeEventListener("click", handleMobileClick);
    });
  }


  function handleMobileClick() {
    const imageSrc = this.getAttribute("data-image");

    let imageContainer = this.querySelector(".featured-image-container");
    if (!imageContainer) {
      imageContainer = document.createElement("div");
      imageContainer.classList.add("featured-image-container");

      const img = document.createElement("img");
      img.src = imageSrc;
      img.classList.add("featured-photo");
      img.style.width = "100%";
      img.style.borderRadius = "8px";

      imageContainer.appendChild(img);
      this.appendChild(imageContainer);

      setTimeout(() => {
        imageContainer.classList.add("open");
      }, 10);
    } else {
      imageContainer.classList.remove("open");
      setTimeout(() => {
        if (imageContainer.parentElement) {
          this.removeChild(imageContainer);
        }
      }, 900);
    }


    featuredItems.forEach(otherItem => {
      if (otherItem !== this) {
        const otherImageContainer = otherItem.querySelector(".featured-image-container");
        if (otherImageContainer) {
          otherImageContainer.classList.remove("open");
          setTimeout(() => {
            if (otherImageContainer.parentElement) {
              otherItem.removeChild(otherImageContainer);
            }
          }, 700);
        }
      }
    });
  }


  function handleDesktopClick() {
    const newImage = this.getAttribute("data-image");
    if (featuredImage) {
      featuredImage.src = newImage;
    }
  }


  function handleMobileMode() {
    console.log("Switching to mobile mode");
    clearMobileChanges();

    featuredItems.forEach(item => {
      item.addEventListener("click", handleMobileClick);
    });
  }


  function handleDesktopMode() {
    console.log("Switching to desktop mode");
    clearMobileChanges(); 

    featuredItems.forEach(item => {
      item.addEventListener("click", handleDesktopClick);
    });
  }


  function handleResize() {
    const isMobile = window.innerWidth < 992;


    if (!isMobile && currentMode !== "desktop") {
      currentMode = "desktop";
      handleDesktopMode();
    }

    else if (isMobile && currentMode !== "mobile") {
      currentMode = "mobile";
      handleMobileMode();
    }
  }


  handleResize();

  window.addEventListener("resize", handleResize);
});

document.addEventListener("DOMContentLoaded", function () {
const featuredItems = document.querySelectorAll(".featured-item"); 


function handleIconRotation() {
const isDesktop = window.innerWidth >= 992;

featuredItems.forEach(item => {
    const icon = item.querySelector('.arrow-icon'); 
    item.addEventListener("click", function () {

        featuredItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove(isDesktop ? "active" : "open");
                const otherIcon = otherItem.querySelector('.arrow-icon');
                if (isDesktop) {
                    otherIcon.style.transform = "rotate(0deg)"; 
                } else {
                    otherIcon.style.transform = "rotate(0deg)"; 
                }
            }
        });


        const isOpen = item.classList.toggle(isDesktop ? "active" : "open");


        if (isDesktop) {
            icon.style.transform = isOpen ? "rotate(270deg)" : "rotate(0deg)";
        } else {
            icon.style.transform = isOpen ? "rotate(90deg)" : "rotate(0deg)";
        }
    });
});
}


handleIconRotation();


window.addEventListener('resize', handleIconRotation);
});

//counter
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter-number");

  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const speed = 200; 
    const increment = Math.ceil(target / speed);

    let count = 0;

    const updateCounter = () => {
      count += increment;
      if (count < target) {
        counter.textContent = count;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  };

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight && rect.bottom >= 0 
    );
  };

  const checkCounters = () => {
    counters.forEach((counter) => {
      if (isInViewport(counter) && !counter.classList.contains("started")) {
        counter.classList.add("started");
        startCounter(counter);
      }
    });
  };

  checkCounters(); 
  window.addEventListener("scroll", checkCounters);
});

// carosel goutes
$(document).ready(function(){
  $("#testimonial-slider").owlCarousel({
      items:1,
      itemsDesktop:[1000,1],
      itemsDesktopSmall:[979,1],
      itemsTablet:[768,1],
      pagination:false,
      navigation:true,
      navigationText:["",""],
      autoPlay:true
  });
});

//slider
document.addEventListener("DOMContentLoaded", function () {
  const sliderInner = document.querySelector(".slider-inner");
  const images = sliderInner.querySelectorAll(".image-wrapper");
  const nextButton = document.getElementById("nextBtn");

  let currentIndex = 0;
  const visibleCount = 6;

  nextButton.addEventListener("click", function () {
      if (currentIndex < images.length - visibleCount) {
          currentIndex++;
      } else {
          currentIndex = 0;
      }
      updateSliderPosition();
  });

  function updateSliderPosition() {
      const offset = -(currentIndex * images[0].offsetWidth);
      sliderInner.style.transform = `translateX(${offset}px)`;
  }
});



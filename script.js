const text = "The Future on Your Wrist";
let index = 0;

function typeWriter() {
  if (index < text.length) {
    document.getElementById("typewriter").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}

function cycleGallery() {
  let images = document.querySelectorAll(".gallery-img");
  images.forEach(img => img.style.display = "none");
  let index = Math.floor(Math.random() * images.length);
  images[index].style.display = "block";
  setTimeout(cycleGallery, 3000);
}

function animateFeatures() {
  const features = document.querySelectorAll('.feature');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.5 });
  features.forEach(feature => observer.observe(feature));
}

document.querySelector("button").addEventListener("mouseover", () => {
  document.querySelector("button").classList.add("animate-pulse");
});

document.querySelector("button").addEventListener("mouseout", () => {
  document.querySelector("button").classList.remove("animate-pulse");
});

document.querySelectorAll(".gallery-img").forEach(img => {
  img.addEventListener("click", () => {
    const popup = document.createElement("div");
    popup.classList.add("lightbox");
    popup.innerHTML = `<img src="${img.src}">`;
    document.body.appendChild(popup);
    popup.addEventListener("click", () => popup.remove());
  });
});

let count = 0;
function updateCounter() {
  const counterElement = document.getElementById("counter");
  if (count < 100) {
    count++;
    counterElement.innerText = count;
    setTimeout(updateCounter, 30);
  }
}

function createSparkleCanvas() {
  const canvas = document.getElementById("sparkleCanvas");
  const ctx = canvas.getContext("2d");
  let w = window.innerWidth;
  let h = 300;
  canvas.width = w;
  canvas.height = h;
  let particles = [];
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      d: Math.random() * 0.5 + 0.5
    });
  }
  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    particles.forEach(p => {
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    });
    ctx.fill();
    particles.forEach(p => {
      p.y += p.d;
      if (p.y > h) {
        p.y = 0;
        p.x = Math.random() * w;
      }
    });
  }
  setInterval(draw, 30);
}

window.onload = () => {
  typeWriter();
  cycleGallery();
  animateFeatures();
  updateCounter();
  createSparkleCanvas();
};

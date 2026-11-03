const intro = document.querySelector('#intro');
const celebration = document.querySelector('#celebration');
const openGift = document.querySelector('#openGift');
const blowButton = document.querySelector('#blowButton');
const candles = document.querySelector('#candles');
const hint = document.querySelector('#candleHint');
const secretButton = document.querySelector('#secretButton');
const secret = document.querySelector('#secret');

openGift.addEventListener('click', () => {
  intro.classList.add('opened');
  celebration.classList.add('visible');
  celebration.setAttribute('aria-hidden', 'false');
  confetti(50);
  window.scrollTo({ top: 0 });
});

blowButton.addEventListener('click', () => {
  if (candles.classList.contains('out')) return;
  candles.classList.add('out');
  hint.textContent = 'Wish made. Semoga terkabul ✦';
  blowButton.textContent = 'Keinginanmu diterbangkan';
  confetti(90);
});

secretButton.addEventListener('click', () => {
  secret.classList.add('open');
  secret.setAttribute('aria-hidden', 'false');
});

document.querySelector('.close-secret').addEventListener('click', closeSecret);
secret.addEventListener('click', event => { if (event.target === secret) closeSecret(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeSecret(); });

function closeSecret() {
  secret.classList.remove('open');
  secret.setAttribute('aria-hidden', 'true');
}

function confetti(amount) {
  const colors = ['#b66e71', '#edb6a7', '#cda56a', '#fff2b6', '#d9a6bd'];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('i');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--duration', `${2.5 + Math.random() * 2.8}s`);
    piece.style.setProperty('--drift', `${-120 + Math.random() * 240}px`);
    piece.style.animationDelay = `${Math.random() * .45}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 6000);
  }
}

const canvas = document.querySelector('#stars');
const ctx = canvas.getContext('2d');
let sparks = [];

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  sparks = Array.from({ length: Math.min(35, Math.floor(innerWidth / 35)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.4 + .3,
    a: Math.random() * .4 + .15,
    speed: Math.random() * .12 + .04
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sparks.forEach(s => {
    s.a += (Math.random() - .5) * .012;
    s.a = Math.max(.08, Math.min(.55, s.a));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(185,151,116,${s.a})`;
    ctx.fill();
    s.y -= s.speed;
    if (s.y < -2) s.y = canvas.height + 2;
  });
  requestAnimationFrame(drawStars);
}

addEventListener('resize', resizeCanvas);
resizeCanvas();
drawStars();

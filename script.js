const weddingDate=new Date('2026-10-18T08:00:00+07:00');
const opening=document.querySelector('#opening');
const mainContent=document.querySelector('#mainContent');
const loadingScreen=document.querySelector('#loadingScreen');
const guestName=new URLSearchParams(location.search).get('to')?.replace(/\+/g,' ')||'Tamu Undangan';document.querySelector('#guestName').textContent=guestName;
document.querySelector('#openInvitation').addEventListener('click',()=>{opening.classList.add('is-hidden');loadingScreen.classList.add('is-active');window.setTimeout(()=>{loadingScreen.classList.add('is-hidden');mainContent.classList.remove('is-locked');document.body.classList.remove('no-scroll');startMusic()},1500)});document.body.classList.add('no-scroll');
const backgroundMusic=document.querySelector('#backgroundMusic');const musicToggle=document.querySelector('#musicToggle');let musicPlaying=false;
backgroundMusic.load();
function startMusic(){backgroundMusic.play().then(()=>{musicPlaying=true;musicToggle.classList.add('is-playing')}).catch(()=>{musicToggle.classList.remove('is-playing')})}
function stopMusic(){backgroundMusic.pause();musicPlaying=false;musicToggle.classList.remove('is-playing')}
document.querySelector('#openInvitation').addEventListener('click',startMusic);musicToggle.addEventListener('click',()=>musicPlaying?stopMusic():startMusic());
const nodes={days:document.querySelector('#days'),hours:document.querySelector('#hours'),minutes:document.querySelector('#minutes'),seconds:document.querySelector('#seconds')};
function updateCountdown(){const d=weddingDate-Date.now();if(d<=0)return Object.values(nodes).forEach(n=>n.textContent='00');nodes.days.textContent=String(Math.floor(d/86400000)).padStart(2,'0');nodes.hours.textContent=String(Math.floor(d/3600000)%24).padStart(2,'0');nodes.minutes.textContent=String(Math.floor(d/60000)%60).padStart(2,'0');nodes.seconds.textContent=String(Math.floor(d/1000)%60).padStart(2,'0')}updateCountdown();setInterval(updateCountdown,1000);
const observer=new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
document.querySelector('#rsvpForm').addEventListener('submit',e=>{e.preventDefault();const name=new FormData(e.currentTarget).get('name');document.querySelector('#formStatus').textContent=`Terima kasih, ${name}. Konfirmasi Anda sudah dicatat.`;e.currentTarget.reset()});
document.querySelector('.copy-button').addEventListener('click',async e=>{const b=e.currentTarget;try{await navigator.clipboard.writeText(b.dataset.copy);b.firstChild.textContent='Tersalin ';setTimeout(()=>b.firstChild.textContent='Salin nomor ',1600)}catch{b.firstChild.textContent='1234567890'}});
const invitationUrl=window.location.href.split('#')[0];const shareText=`Undangan pernikahan Ari & Marlina untuk ${guestName}: ${invitationUrl}`;const shareButton=document.querySelector('#shareButton');const copyLinkButton=document.querySelector('#copyLinkButton');
shareButton.addEventListener('click',async()=>{if(navigator.share){await navigator.share({title:'Ari & Marlina | Undangan Pernikahan',text:shareText,url:invitationUrl})}else{await navigator.clipboard.writeText(shareText);shareButton.querySelector('span').textContent='Tersalin'}});
copyLinkButton.addEventListener('click',async()=>{await navigator.clipboard.writeText(invitationUrl);copyLinkButton.textContent='Link berhasil disalin';setTimeout(()=>copyLinkButton.textContent='Salin link undangan',1800)});

/* =========================================================
   PERSONALIZACIÓN RÁPIDA
   Cambia SOLO estos tres valores y el sitio actualizará
   automáticamente el responsable, la carrera y la biografía.
   ========================================================= */
const PROJECT = {
  responsible: "Moisés de Jesús Pérez Pinto",
  program: "Especialización en Telemática",
  bio: "Estudiante interesado/a en el uso de las tecnologías digitales y en comprender cómo las redes telemáticas permiten comunicar, compartir información y crear nuevos espacios de interacción y aprendizaje."
};

document.querySelectorAll("[data-responsible]").forEach(el => {
  el.textContent = PROJECT.responsible;
});
document.getElementById("programText").textContent = PROJECT.program;
document.getElementById("bioText").textContent = PROJECT.bio;

const initials = PROJECT.responsible
  .replace("TU NOMBRE AQUÍ","TN")
  .split(/\s+/)
  .filter(Boolean)
  .slice(0,2)
  .map(x => x[0]?.toUpperCase() || "")
  .join("");
document.getElementById("bioAvatar").textContent = initials || "TN";

/* Menu móvil */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.classList.toggle("active", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

/* Barra de progreso + encabezado */
const scrollBar = document.getElementById("scrollBar");
const topbar = document.querySelector(".topbar");
function onScroll(){
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? (scrollY / max) * 100 : 0;
  scrollBar.style.width = `${p}%`;
  topbar.classList.toggle("scrolled", scrollY > 24);
}
addEventListener("scroll", onScroll, {passive:true});
onScroll();

/* Aparición progresiva */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Explorador PAN/LAN/MAN/WAN */
const networks = {
  pan:{
    label:"PERSONAL AREA NETWORK",
    title:"Red de Área Personal",
    text:"Comunica dispositivos en un radio corto, por ejemplo un teléfono y un computador.",
    reach:"Pocos metros",
    scene:"Uso personal",
    scale:0.78
  },
  lan:{
    label:"LOCAL AREA NETWORK",
    title:"Red de Área Local",
    text:"Conecta equipos dentro de una extensión limitada, como una casa, instituto, universidad o empresa.",
    reach:"Edificio / campus",
    scene:"Hogar o institución",
    scale:0.9
  },
  man:{
    label:"METROPOLITAN AREA NETWORK",
    title:"Red de Área Metropolitana",
    text:"Interconecta redes y equipos dentro de una zona urbana o ciudad.",
    reach:"Ciudad",
    scene:"Entorno metropolitano",
    scale:1.02
  },
  wan:{
    label:"WIDE AREA NETWORK",
    title:"Red de Área Extensa",
    text:"Conecta equipos o redes entre ciudades, países o continentes. Internet es el gran referente de interconexión global.",
    reach:"Países / continentes",
    scene:"Interconexión global",
    scale:1.12
  }
};
const tabs = document.querySelectorAll(".network-tab");
const netCopy = document.getElementById("networkCopy");
const netCore = document.getElementById("netCore");
const rings = document.querySelectorAll(".net-ring");
tabs.forEach(tab => tab.addEventListener("click", () => {
  tabs.forEach(x => x.classList.remove("active"));
  tab.classList.add("active");
  const key = tab.dataset.network;
  const d = networks[key];
  netCore.textContent = key.toUpperCase();
  netCopy.animate([{opacity:.25,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:320,easing:"ease-out"});
  netCopy.innerHTML = `
    <span class="mono">${d.label}</span>
    <h3>${d.title}</h3>
    <p>${d.text}</p>
    <div class="network-data">
      <div><small>ALCANCE</small><b>${d.reach}</b></div>
      <div><small>ESCENARIO</small><b>${d.scene}</b></div>
    </div>`;
  rings.forEach((r,i) => r.style.transform = `scale(${d.scale + i*.02})`);
}));

/* Canvas: red de nodos animada, discreta y responsive */
const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");
let nodes = [];
let raf;
function resizeCanvas(){
  const dpr = Math.min(devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.max(1, rect.width * dpr);
  canvas.height = Math.max(1, rect.height * dpr);
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const count = Math.max(24, Math.min(58, Math.floor(rect.width / 26)));
  nodes = Array.from({length:count}, () => ({
    x:Math.random()*rect.width,
    y:Math.random()*rect.height,
    vx:(Math.random()-.5)*.22,
    vy:(Math.random()-.5)*.22,
    r:Math.random()*1.5+.6
  }));
}
function draw(){
  const rect = canvas.getBoundingClientRect();
  ctx.clearRect(0,0,rect.width,rect.height);
  for(let i=0;i<nodes.length;i++){
    const a=nodes[i];
    a.x+=a.vx;a.y+=a.vy;
    if(a.x<0||a.x>rect.width) a.vx*=-1;
    if(a.y<0||a.y>rect.height) a.vy*=-1;
    ctx.beginPath();
    ctx.arc(a.x,a.y,a.r,0,Math.PI*2);
    ctx.fillStyle="rgba(120,225,255,.48)";
    ctx.fill();
    for(let j=i+1;j<nodes.length;j++){
      const b=nodes[j], dx=a.x-b.x, dy=a.y-b.y, dist=Math.hypot(dx,dy);
      if(dist<130){
        ctx.beginPath();
        ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
        ctx.strokeStyle=`rgba(103,189,225,${(1-dist/130)*.12})`;
        ctx.lineWidth=.7;ctx.stroke();
      }
    }
  }
  raf=requestAnimationFrame(draw);
}
resizeCanvas();
if(!matchMedia("(prefers-reduced-motion: reduce)").matches) draw();
addEventListener("resize", () => {
  cancelAnimationFrame(raf);
  resizeCanvas();
  if(!matchMedia("(prefers-reduced-motion: reduce)").matches) draw();
});


/* Botón "Volver arriba" */
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  backToTop.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* Unidad Temática 2 · Video
   El archivo MP4 se reproduce localmente desde /assets.
   El enlace de YouTube se conserva como alternativa.
*/
const UNIT2_VIDEO_URL = "https://youtu.be/8LzHefBdqC0";
const videoLink = document.getElementById("videoLink");
if(videoLink){
  videoLink.href = UNIT2_VIDEO_URL;
  videoLink.hidden = false;
}

const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");
menuToggle?.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded","false");
  menuToggle?.setAttribute("aria-label","Open navigation");
}));
const year=document.getElementById("year");
if(year) year.textContent=String(new Date().getFullYear());
if("IntersectionObserver" in window){
  const revealObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
    });
  },{threshold:.12});
  document.querySelectorAll(".stack-card,.project-card,.journey-card,.leadpilot-card,.architecture-panel").forEach(el=>{
    el.classList.add("reveal");revealObserver.observe(el);
  });
  const navObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      nav?.querySelectorAll("a[href^='#']").forEach(link=>{
        link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id);
      });
    });
  },{rootMargin:"-35% 0px -55% 0px"});
  document.querySelectorAll("main section[id]").forEach(section=>navObserver.observe(section));
}
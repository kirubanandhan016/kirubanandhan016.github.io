const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("nav");
menuToggle?.addEventListener("click",()=>{
  const isOpen=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(isOpen));
  menuToggle.setAttribute("aria-label",isOpen?"Close navigation":"Open navigation");
});
nav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded","false");
  menuToggle?.setAttribute("aria-label","Open navigation");
}));
const year=document.getElementById("year");
if(year) year.textContent=String(new Date().getFullYear());
if("IntersectionObserver" in window){
  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add("visible");revealObserver.unobserve(entry.target);}
    });
  },{threshold:.12});
  document.querySelectorAll(".skill-card,.project-card,.leadpilot-card,.experience-card,.education-card,.cert-card").forEach(el=>{
    el.classList.add("reveal");revealObserver.observe(el);
  });
  const navObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        nav?.querySelectorAll("a[href^='#']").forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+entry.target.id));
      }
    });
  },{rootMargin:"-35% 0px -55% 0px"});
  document.querySelectorAll("main section[id]").forEach(section=>navObserver.observe(section));
}


const contactForm=document.getElementById("contactForm");
contactForm?.addEventListener("submit",event=>{
  event.preventDefault();
  const data=new FormData(contactForm);
  const subject=encodeURIComponent(String(data.get("subject")||"Portfolio enquiry"));
  const body=encodeURIComponent("Name: "+data.get("name")+"\nEmail: "+data.get("email")+"\n\n"+data.get("message"));
  window.location.href="mailto:kirubanandhan016@gmail.com?subject="+subject+"&body="+body;
});

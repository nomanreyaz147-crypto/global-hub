const searchInput=document.getElementById('search-input');
const filterBtns=document.querySelectorAll('.filter-btn');
const rows=document.querySelectorAll('.tool-row');
const counter=document.getElementById('tools-counter');
const scrollBtn=document.getElementById('scroll-top-btn');
let currentCat='all';
let favs=[];
try{const s=localStorage.getItem('ai_hub_favs');if(s)favs=JSON.parse(s);}catch(e){}
if(localStorage.getItem('theme')==='light')document.body.classList.add('light');
function toggleTheme(){document.body.classList.toggle('light');localStorage.setItem('theme',document.body.classList.contains('light')?'light':'dark');}
function updateStars(){rows.forEach(row=>{const id=row.getAttribute('data-id');const btn=row.querySelector('.fav-btn');btn.classList.toggle('active',favs.includes(id));});}
function toggleFavorite(id){favs=favs.includes(id)?favs.filter(f=>f!==id):[...favs,id];localStorage.setItem('ai_hub_favs',JSON.stringify(favs));updateStars();if(currentCat==='favs')filterTools();}
function filterTools(){const q=searchInput.value.toLowerCase();let count=0;rows.forEach(row=>{const id=row.getAttribute('data-id');const cat=row.getAttribute('data-cat');const text=row.innerText.toLowerCase();const mSearch=!q||text.includes(q);const mCat=currentCat==='all'?true:currentCat==='favs'?favs.includes(id):cat===currentCat;const show=mSearch&&mCat;row.style.display=show?'':'none';if(show)count++;});counter.textContent=count+' Tool'+(count!==1?'s':'');}
window.addEventListener('scroll',()=>{scrollBtn.style.display=window.scrollY>400?'flex':'none';});
function scrollToTop(){window.scrollTo({top:0,behavior:'smooth'});}
searchInput.addEventListener('input',filterTools);
filterBtns.forEach(btn=>{btn.addEventListener('click',function(){filterBtns.forEach(b=>b.classList.remove('active'));this.classList.add('active');currentCat=this.getAttribute('data-category');filterTools();});});
updateStars();

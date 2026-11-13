const PRODUCTS = [
  {id:'lemon', name:'Asinan Kuah Lemon', price:25000, jar:'assets/kuah_lemon.png', garnish:'assets/garnish_lemon.png',
    desc:'Asinan segar dengan perpaduan rasa asam, manis, dan pedas, dilengkapi kuah lemon yang menyegarkan.'},
  {id:'kiamboy', name:'Asinan Kiamboy', price:35000, jar:'assets/kiamboy.png', garnish:'assets/garnish_kiamboy.png',
    desc:'Asinan segar dengan perpaduan rasa asam, manis, dan pedas, dilengkapi kiamboy premium pilihan.'},
  {id:'mangga', name:'Manisan Mangga', price:30000, jar:'assets/jar_mangga.png', garnish:'assets/garnish_mangga.png',
    desc:'Manisan mangga matang pilihan, diolah segar dengan rasa manis alami tanpa pengawet.'},
  {id:'rujak', name:'Rujak Jambu Kristal', price:20000, jar:'assets/rujak_plate.png', garnish:'',
    desc:'Nikmati kesegaran Rujak Jambu Kristal dengan potongan jambu kristal yang renyah, segar, dan manis alami, dipadukan dengan bumbu rujak pedas manis yang menggugah selera. Cocok dinikmati kapan saja!'},
  {id:'sabun', name:'Sabun Cuci Piring', price:15000, jar:'assets/sabun_bottle.png', garnish:'assets/sabun_lime.png',
    desc:'Sabun pembersih peralatan makan yang membantu mengangkat lemak dan kotoran, sehingga piring dan peralatan dapur bersih kembali.'},
];
const fmt = n => 'Rp ' + n.toLocaleString('id-ID');
let active = PRODUCTS[0].id;
let cart = {}; // id -> qty

function renderCarousel(){
  const el = document.getElementById('carousel');
  el.innerHTML = PRODUCTS.map(p => `
    <div class="pcard ${p.id===active?'active':''}" data-id="${p.id}">
      <div class="photo">
        <img class="jar" src="${p.jar}" alt="${p.name}">
        ${p.garnish ? `<img class="garnish" src="${p.garnish}" alt="">` : ''}
      </div>
      <div class="pname"><span>${p.name}</span><span>${(p.price/1000)|0}</span></div>
    </div>`).join('');
  el.querySelectorAll('.pcard').forEach(c=>c.addEventListener('click',()=>{active=c.dataset.id; renderCarousel(); renderDetail();}));
}
function renderDetail(){
  const p = PRODUCTS.find(x=>x.id===active);
  document.getElementById('pd-txt').innerHTML = '<h3>'+p.name+'</h3><p>'+p.desc+'</p>';
}
function renderCart(){
  const items = Object.entries(cart).filter(([,q])=>q>0);
  const list = document.getElementById('cartList');
  const empty = document.getElementById('cartEmpty');
  list.innerHTML = items.map(([id,q])=>{
    const p = PRODUCTS.find(x=>x.id===id);
    return `<li><span class="nm">${p.name} <b>×${q}</b></span><span>${fmt(p.price*q)}</span></li>`;
  }).join('');
  empty.style.display = items.length ? 'none' : 'block';
  const total = items.reduce((s,[id,q])=>s + PRODUCTS.find(x=>x.id===id).price*q, 0);
  document.getElementById('cartTotal').textContent = fmt(total);
  return total;
}
document.getElementById('addCartBtn').addEventListener('click', ()=>{
  cart[active] = (cart[active]||0) + 1;
  renderCart();
});
document.getElementById('checkoutBtn').addEventListener('click', ()=>{
  const total = renderCart();
  document.getElementById('qrNote').textContent = total>0 ? ('Total: ' + fmt(total)) : 'Keranjang masih kosong — pilih produk dulu ya';
  document.getElementById('qris').scrollIntoView({behavior:'smooth'});
});

renderCarousel(); renderDetail(); renderCart();

/* active nav link on scroll */
const sections = ['beranda','produk','kontak'].map(id=>document.getElementById(id));
const links = document.querySelectorAll('.nav-link');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      links.forEach(l=>l.classList.toggle('active', l.dataset.s===e.target.id));
    }
  });
},{rootMargin:'-45% 0px -50% 0px'});
sections.forEach(s=>io.observe(s));
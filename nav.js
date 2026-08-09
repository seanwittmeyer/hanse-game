// Brewhouses of the Hanse — THE SITE NAVIGATION, in one place.
// (2026-08-09, designer: "each of the html pages have some sort of navigation but they are
// inconsistent. All should have a link to play, rules, learn, and print.")
//
// Every page carries the SAME four destinations in the SAME order with the SAME colours; the
// page you are on renders as a marked, non-clickable chip. Edit the roster HERE, never
// per-page — the four pages had drifted to four different link sets, which is exactly what a
// single source prevents. Tiny and dependency-free on purpose: learn.html is a ten-minute
// primer and must not have to load the 84 KB card library to draw a nav bar.
(function(){
'use strict';
const PAGES=[
  {k:'learn',href:'learn.html',ic:'🎓',nm:'Learn',c:'#3d6b7e',tip:'The ten-minute primer — learn to play'},
  {k:'rules',href:'index.html',ic:'📖',nm:'Rules', c:'#b8860b',tip:'The complete rulebook & component reference'},
  {k:'play', href:'play.html', ic:'▶', nm:'Play',  c:'#4a6b3a',tip:'Play it — hot-seat, with AI seats'},
  {k:'print',href:'print.html',ic:'🖨',nm:'Print', c:'#9c3b2e',tip:'The print-and-play kit — cut the prototype'},
];
// one chip; the current page is a <span> (nothing to click) carrying aria-current
function chip(p,cur){
  const on=(p.k===cur);
  const body=p.ic+'<span class="hnav-t">'+p.nm+'</span>';
  return on
    ? '<span class="hnav-a on" style="--nc:'+p.c+'" aria-current="page" title="You are here">'+body+'</span>'
    : '<a class="hnav-a" style="--nc:'+p.c+'" href="'+p.href+'" title="'+p.tip+'">'+body+'</a>';
}
function links(cur){return PAGES.map(p=>chip(p,cur)).join('');}
function bar(cur,extra){return '<span class="hnav">'+links(cur)+(extra||'')+'</span>';}
function mount(sel,cur,extra){const el=document.querySelector(sel);if(el)el.innerHTML=bar(cur,extra);return el;}
// the menu form (play.html's hamburger): plain rows, the current page dimmed
function menuLinks(cur){return PAGES.map(function(p){
  return p.k===cur
    ? '<span class="hnav-m on" aria-current="page">'+p.ic+' '+p.nm+'</span>'
    : '<a class="hnav-m" href="'+p.href+'">'+p.ic+' '+p.nm+'</a>';}).join('');}

// Every visual rule is written as `.hnav .hnav-a` (0,2,0) rather than `.hnav-a` (0,1,0): the
// four host pages each style their own bar (print.html's `.bar a` is (0,1,1) and was painting
// the Rules chip gold-on-gold), so the shared nav has to out-specify its hosts to look the
// same everywhere. Same defence components.js uses for the card faces.
const CSS=
 '.hnav{display:inline-flex;flex-wrap:wrap;align-items:center;gap:6px;vertical-align:middle}'
+'.hnav .hnav-a{display:inline-flex;align-items:center;gap:5px;font-family:inherit;font-size:.86rem;font-weight:bold;'
+'text-decoration:none;padding:6px 12px;border-radius:6px;white-space:nowrap;line-height:1.15;'
+'background:var(--nc,#6b6256);color:#f6efdd;border:1px solid rgba(0,0,0,.25);transition:filter .13s,transform .13s}'
+'.hnav .hnav-a:hover{filter:brightness(1.14);color:#fff}'
+'.hnav .hnav-a:active{transform:translateY(1px)}'
+'.hnav .hnav-a.on{opacity:.62;box-shadow:inset 0 0 0 2px rgba(255,255,255,.6);cursor:default}'
+'.hnav .hnav-a:focus-visible{outline:2px solid #d8a72a;outline-offset:2px}'
/* narrow screens: the label folds away, the glyph carries the chip */
+'@media(max-width:560px){.hnav .hnav-a{padding:6px 9px}.hnav .hnav-a .hnav-t{display:none}}'
/* the menu (dropdown) form */
+'.hnav-m{display:block;text-decoration:none;padding:8px 15px;font-size:.9rem;white-space:nowrap}'
+'.hnav-m.on{opacity:.5;cursor:default}';

if(typeof document!=='undefined'&&document.createElement&&!document.getElementById('hnav-css')){
  const st=document.createElement('style');st.id='hnav-css';st.textContent=CSS;
  const h=document.head||document.documentElement;if(h&&h.appendChild)h.appendChild(st);
}
window.HNAV={PAGES,links,bar,mount,menuLinks};
})();

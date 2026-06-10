// Headless smoke-test for printables.html — runs the page's <script> in a vm with a stubbed DOM
// and asserts: pages build in both modes, every item stays inside the sheet, cut lines are deduped,
// and the checklist totals match the data. Run: node playtests/printables-check.js
const fs=require('fs'),vm=require('vm');
const src=fs.readFileSync(__dirname+'/../printables.html','utf8');
const m=src.match(/<script>\n([\s\S]*?)<\/script>/);
if(!m){console.error('FAIL: could not extract inline script');process.exit(1);}
const stubEl=()=>({innerHTML:'',classList:{toggle(){}},style:{}});
const ctx={window:{},document:{getElementById:()=>stubEl(),body:{classList:{toggle(){}}},createElement:()=>({click(){},set href(v){},set download(v){}})},
  URL:{createObjectURL:()=>'',revokeObjectURL(){}},Blob:function(){},console};
vm.createContext(ctx);
vm.runInContext(m[1],ctx);

let fails=0;
const ok=(cond,msg)=>{if(!cond){fails++;console.log('FAIL: '+msg);}else console.log('ok  : '+msg);};

for(const mode of ['full','proof']){
  vm.runInContext('MODE="'+mode+'"',ctx);
  const pages=vm.runInContext('buildPages()',ctx);
  console.log('\n== MODE '+mode+' — '+pages.length+' sheets ==');
  const secs={};pages.forEach(p=>secs[p.section]=(secs[p.section]||0)+1);
  console.log('  sections:',JSON.stringify(secs));
  let inb=true,cutdup=true,n=0;
  pages.forEach(p=>{
    p.items.forEach(it=>{n++;
      if(it.x<0||it.y<0||it.x+it.w>10.4001||it.y+it.h>7.9001)
        {inb=false;console.log('  OUT OF BOUNDS on S'+p.no+':',it.x,it.y,it.w,it.h);}
    });
    const seen={};p.cuts.forEach(c=>{const k=c.join(',');if(seen[k])cutdup=false;seen[k]=1;});
  });
  ok(inb,mode+': all '+n+' items inside the 10.4×7.9 sheet');
  ok(cutdup,mode+': no duplicate cut segments');
  ok(pages[pages.length-1].section==='list',mode+': checklist is the last sheet');
  ok(pages.filter(p=>p.section==='boards').length===(mode==='full'?7:3),mode+': board sheet count');
  if(mode==='full'){
    const tiles=pages.filter(p=>p.section==='tiles').reduce((a,p)=>a+p.items.length,0);
    ok(tiles===123,'full: 123 tiles packed (got '+tiles+')');
    const circles=pages.filter(p=>p.section==='bits').reduce((a,p)=>a+p.circles.length,0);
    ok(circles===100+100+7,'full: 207 circle cuts — 100 goods + 100 discs + 7 workers/markers (got '+circles+')');
    const rects=pages.filter(p=>p.section==='bits').reduce((a,p)=>a+p.items.length,0)-circles;
    ok(rects===0,'full: bits sheets are circles only — no square chips (got '+rects+' rects)');
    const cards=pages.filter(p=>p.section==='cards').reduce((a,p)=>a+p.items.length,0);
    ok(cards===20,'full: 20 recipe cards (got '+cards+')');
  }
  // every page renders an overlay with regmarks
  const ovOK=pages.every(p=>vm.runInContext('overlaySvg(PAGES&&0?0:'+JSON.stringify({no:p.no,label:p.label,cuts:[],circles:[]})+')',ctx).includes('<circle'));
  ok(ovOK,mode+': overlay svg with registration marks on every sheet');
}
console.log('\n'+(fails?fails+' FAILURE(S)':'ALL CHECKS PASSED'));
process.exit(fails?1:0);

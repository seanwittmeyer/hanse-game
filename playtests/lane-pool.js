// LANE-POOL (v4.16) — pools the three lane-study corpora BY DIAL CONFIG (not arm name)
// and prints the verdict table with binomial CIs. Usage: node playtests/lane-pool.js
'use strict';
const fs=require('fs');
const path=require('path');

// arm → config key (the same dials, whatever the arm was called in its pass)
const CFG={
  base:'off', base2:'off',
  pips:'pips',
  ladder:'ladder',
  faucets:'faucets-only',
  full:'pips+both', anchor:'pips+both', confirmA:'pips+both',
  lite:'pips+both-lite',
  stars:'pips+both+trimmed★', confirmB:'pips+both+trimmed★',
  caskonly:'pips+cask', confirmC:'pips+cask',
  bldgonly:'pips+bldg', confirmD:'pips+bldg',
};
const rows=[];
['lane-corpus','lane-corpus2','lane-corpus3'].forEach(d=>{
  const dir=path.join(__dirname,d);
  if(!fs.existsSync(dir))return;
  fs.readdirSync(dir).filter(f=>f.endsWith('.jsonl')).forEach(f=>{
    fs.readFileSync(path.join(dir,f),'utf8').split('\n').filter(Boolean).forEach(l=>{
      try{const r=JSON.parse(l);if(!r.error)rows.push(r);}catch(e){}
    });});
});
const by={};
rows.forEach(r=>{const k=CFG[r.arm]||r.arm;(by[k]=by[k]||[]).push(r);});
const fmt=(v,d)=>v.toFixed(d==null?1:d);
const ci=(p,n)=>fmt(1.96*100*Math.sqrt(p*(1-p)/n),1);   // ±1.96·se in pp (the full half-width)
console.log('config                games  seat      win%(±CI)   total  hall★   maj   ens  novDead  pace');
Object.keys(by).sort((a,b)=>by[b].length-by[a].length).forEach(k=>{
  const g=by[k];
  const seat=t=>g.flatMap(x=>x.players.filter(p=>t==='cm'?p.tier==='cellarmaster':(t==='gm'?(p.tier==='guildmaster'&&!p.hall):p.hall)));
  const nov=g.filter(x=>!(x.ports&&x.ports.novgorod)).length/g.length;
  const pace=g.reduce((s,x)=>s+x.round,0)/g.length;
  ['cm','gm','hall'].forEach((t,i)=>{
    const P=seat(t);const n=P.length;if(!n)return;
    const w=P.filter(p=>p.win).length/n;
    const avg=f=>P.reduce((s,p)=>s+f(p),0)/n;
    console.log(
      (i===0?k.padEnd(22):' '.repeat(22))
      +(i===0?String(g.length).padStart(5):'     ')
      +'  '+(t==='hall'?'GM-hall':t.toUpperCase()).padEnd(8)
      +(fmt(100*w)+'±'+ci(w,n)).padStart(11)
      +fmt(avg(p=>p.total)).padStart(8)
      +fmt(avg(p=>(p.bankH||0)+(p.ext||0))).padStart(7)
      +fmt(avg(p=>p.maj)).padStart(6)
      +fmt(avg(p=>p.ens),2).padStart(6)
      +(i===0?(fmt(100*nov)+'%').padStart(8):' '.repeat(8))
      +(i===0?fmt(pace).padStart(6):''));
  });
  console.log('');
});

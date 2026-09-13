// oracle-study.js — reads the TURN ORACLE's traces (playtests/oracle.js → JSON lines) and prints the
// turn study: what a work turn hands its seat (little wins), when the arcs land (goal arcs), what
// happens to a seat on a rival's clock, and how the score is built — per tier or lane, per count.
// Tolerant of partial corpora: it reads whatever shards are in the directory.
// Usage: node playtests/oracle-study.js <dir|file...> [--label=journeyman,lanes/trader] [--counts=2,3,4] [--short]
'use strict';
const fs=require('fs'),path=require('path');
const args=process.argv.slice(2);const opt={};const srcs=[];
args.forEach(a=>{if(a.startsWith('--')){const [k,v]=a.slice(2).split('=');opt[k]=v===undefined?true:v;}else srcs.push(a);});
const files=[];srcs.forEach(s=>{const st=fs.statSync(s);if(st.isDirectory())fs.readdirSync(s).filter(f=>f.endsWith('.jsonl')).forEach(f=>files.push(path.join(s,f)));else files.push(s);});
const COUNTS=(opt.counts||'2,3,4').split(',').map(Number);
const G={};let errs=0;
files.forEach(f=>{fs.readFileSync(f,'utf8').split('\n').forEach(line=>{if(!line.trim())return;let o;try{o=JSON.parse(line);}catch(e){return;}
  if(o.cfg&&typeof o.cfg==='object')return;if(o.error){errs++;return;}
  if(opt.label&&!opt.label.split(',').includes(o.cfg))return;
  const k=o.cfg;(G[k]=G[k]||{})[o.n]=(G[k][o.n]||[]);G[k][o.n].push(o);});});
const BIG=new Set(['deliver','hall','sail','post','kbuild','pbuild','flip','recipe','spec','cross','chain']);
const SMALL=new Set(['brew','age','ready','braumeister','comm','load','raise','dividend','trade','yard','bonus','pact']);
const PETTY=new Set(['grain','yardgrain']);
const tag=e=>e.split(':')[0];
const cls=t=>{let c=0;t.ev.forEach(e=>{const k=tag(e);if(BIG.has(k))c=Math.max(c,3);else if(SMALL.has(k))c=Math.max(c,2);else if(PETTY.has(k))c=Math.max(c,1);});return c;};
const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
const med=a=>{if(!a.length)return null;const s=a.slice().sort((x,y)=>x-y);return s[Math.floor(s.length/2)];};
const f1=x=>(x==null||isNaN(x))?'—':Number(x).toFixed(1);
const pc=x=>(x==null||isNaN(x))?'—':Math.round(100*x)+'%';
const phase=r=>r<=4?0:r<=8?1:2;
// ---- per-seat derivations ----
function seatStudy(g,sid){
  const own=g.turns.filter(t=>t.s===sid);
  const ms={};const first=(k,r)=>{if(ms[k]==null)ms[k]=r;};
  g.turns.forEach(t=>{const evs=t.ev.filter(()=>t.s===sid).concat(t.pev.filter(x=>x[0]===sid).map(x=>x[1]));
    evs.forEach(e=>{const k=tag(e),p=e.split(':');
      if(k==='brew'&&p[1]!=='gruit')first('exportBrew',t.r);
      if(k==='ready'&&p[1]!=='gruit')first('exportReady',t.r);
      if(k==='comm')first('comm',t.r);if(k==='post')first('post',t.r);if(k==='load')first('load',t.r);
      if(k==='sail'||k==='carried')first('atSea',t.r);if(k==='deliver')first('deliver',t.r);if(k==='inv')first('inv',t.r);
      if(k==='trade')first('trade',t.r);if(k==='recipe')first('recipe',t.r);if(k==='pbuild')first('pbuild',t.r);if(k==='flip')first('flip',t.r);
      if(k==='kbuild')first('kbuild',t.r);if(k==='chain'&&(p[1]==='london'||p[1]==='novgorod'))first('chain2',t.r);
      if(k==='hall')first('hall',t.r);if(k==='spec')first('spec',t.r);if(k==='yard')first('yard',t.r);
      if(k==='cross'){const n=+p[2];if(n>=3)first('flight3',t.r);if(n>=4)first('flight4',t.r);if(n>=5)first('flight5',t.r);}});});
  g.snaps.forEach(s=>{const c=s.seats[sid]&&s.seats[sid].cnt;if(c>=3)first('count3',s.r);if(c>=4)first('count4',s.r);if(c>=5)first('count5',s.r);});
  let run=0,maxRun=0;own.forEach(t=>{if(t.ds>0)run=0;else{run++;if(run>maxRun)maxRun=run;}});
  const cnt={};g.turns.forEach(t=>{(t.s===sid?t.ev:[]).concat(t.pev.filter(x=>x[0]===sid).map(x=>x[1])).forEach(e=>{const k=tag(e);cnt[k]=(cnt[k]||0)+1;if(k==='brew'&&e.split(':')[1]==='gruit')cnt.gruit=(cnt.gruit||0)+1;});});
  const S=g.seats[sid];
  const arcs=[S.kb>=1,ms.chain2!=null,S.flight>=3,S.hallN>=1,S.t2>=1,(S.specs||[]).length>=1];
  return {ms,own,maxRun,cnt,rounds:g.rounds,arcs:arcs.filter(Boolean).length,arcSet:arcs,S,win:g.win===sid};
}
const MS=[['exportBrew','first export brew'],['comm','first commission'],['post','first post (after the starter)'],['load','first load'],['atSea','own cargo sails'],
  ['deliver','first far delivery'],['inv','first ⚜'],['trade','the hop trade'],['recipe','a recipe gained'],['yard','a cart to the yard'],['pbuild','first private tile'],['flip','the Flip'],
  ['kbuild','a Kontor building'],['chain2','a two-segment chain'],['hall','a hall present'],['spec','a specialist'],['count3','count 3'],['count4','count 4'],['count5','count 5'],['flight3','Flight 3'],['flight4','Flight 4'],['flight5','Flight 5']];
const ARCN=['Kontor building','2-seg chain','Flight ≥3','hall present','a Flip','a specialist'];
function groupStudy(games){
  const R={games:games.length};if(!games.length)return R;
  const turns=[],seats=[];games.forEach(g=>{g.turns.forEach(t=>turns.push(t));g.seats.forEach((s,i)=>seats.push(seatStudy(g,i)));});
  R.rounds=avg(games.map(g=>g.rounds));R.rmin=Math.min(...games.map(g=>g.rounds));R.rmax=Math.max(...games.map(g=>g.rounds));
  R.band=avg(games.map(g=>g.rounds>=10&&g.rounds<=18?1:0));R.dice=avg(games.map(g=>g.trigger==='dice'?1:0));
  R.turnsPerSeat=turns.length/seats.length;
  const C=turns.map(cls);R.big=avg(C.map(c=>c===3?1:0));R.small=avg(C.map(c=>c===2?1:0));R.petty=avg(C.map(c=>c===1?1:0));R.empty=avg(C.map(c=>c===0?1:0));
  R.evPerTurn=avg(turns.map(t=>t.ev.length));R.starTurns=avg(turns.map(t=>t.ds>0?1:0));R.starPerTurn=avg(turns.map(t=>t.ds));
  R.silence=avg(seats.map(s=>s.maxRun));R.silence5=avg(seats.map(s=>s.maxRun>=5?1:0));
  R.dieTurns=avg(turns.map(t=>t.d>0?1:0));R.die2=avg(turns.map(t=>t.d>=2?1:0));
  R.ph=[0,1,2].map(p=>{const T=turns.filter(t=>phase(t.r)===p);return {n:T.length,ev:avg(T.map(t=>t.ev.length)),big:avg(T.map(t=>cls(t)===3?1:0)),empty:avg(T.map(t=>cls(t)===0?1:0)),star:avg(T.map(t=>t.ds)),die:avg(T.map(t=>t.d>0?1:0))};});
  const st={A:0,B:0,C:0,D:0};turns.forEach(t=>st[t.c]=(st[t.c]||0)+1);R.st=Object.keys(st).map(k=>st[k]/turns.length);
  R.last=avg(games.map(g=>{const T=g.turns.filter(t=>t.r===g.rounds);return T.length?avg(T.map(t=>cls(t)===3?1:0)):0;}));
  R.rivalGain=avg(turns.map(t=>t.psc.some(x=>x[1]>0)?1:0));R.rivalLoss=avg(turns.map(t=>t.psc.some(x=>x[1]<0)?1:0));
  R.carried=avg(games.map(g=>g.turns.reduce((a,t)=>a+t.pev.filter(x=>tag(x[1])==='carried').length,0)));
  R.rivalDeliv=avg(games.map(g=>g.turns.reduce((a,t)=>a+t.pev.filter(x=>tag(x[1])==='deliver').length,0)));
  R.ms={};MS.forEach(([k])=>{const rs=seats.map(s=>s.ms[k]).filter(x=>x!=null);R.ms[k]={reach:rs.length/seats.length,med:med(rs)};});
  R.arcs=avg(seats.map(s=>s.arcs));R.arcs2=avg(seats.map(s=>s.arcs>=2?1:0));R.arcs3=avg(seats.map(s=>s.arcs>=3?1:0));R.arcs0=avg(seats.map(s=>s.arcs===0?1:0));
  R.arcEach=[0,1,2,3,4,5].map(i=>avg(seats.map(s=>s.arcSet[i]?1:0)));
  R.noFar=avg(seats.map(s=>s.S.deliv===0?1:0));R.noDoor=avg(seats.map(s=>s.S.deliv===0&&s.S.hallN===0?1:0));R.noLoad=avg(seats.map(s=>s.ms.load==null?1:0));
  R.stranded=avg(seats.map(s=>s.S.stranded>=1?1:0));R.flightLow=avg(seats.map(s=>s.S.flight<3?1:0));
  const parts=['deliv','hall','sea','docked','wharf','maj','flight','bank','guild'];R.parts={};parts.forEach(k=>R.parts[k]=avg(seats.map(s=>s.S.sc[k]||0)));R.total=avg(seats.map(s=>s.S.sc.total));
  R.winTotal=avg(games.map(g=>g.seats[g.win].sc.total));
  R.margin=avg(games.map(g=>{const t=g.seats.map(s=>s.sc.total).sort((a,b)=>b-a);return t[0]-(t[1]||0);}));
  R.close=avg(games.map(g=>{const t=g.seats.map(s=>s.sc.total).sort((a,b)=>b-a);return (t[0]-(t[1]||0))<=10?1:0;}));
  R.contested=avg(games.map(g=>{let c=0;for(let k=0;k<4;k++){const v=g.seats.map(s=>s.parked[k]).sort((a,b)=>b-a);if(v[0]>0&&v[0]-(v[1]||0)<=1)c++;}return c;}));
  R.perSeat={deliv:avg(seats.map(s=>s.S.deliv)),hall:avg(seats.map(s=>s.S.hallN)),yard:avg(seats.map(s=>s.S.yardN)),kb:avg(seats.map(s=>s.S.kb)),tiles:avg(seats.map(s=>s.S.tiles)),t2:avg(seats.map(s=>s.S.t2)),
    recipes:avg(seats.map(s=>s.S.recipes)),specs:avg(seats.map(s=>(s.S.specs||[]).length)),count:avg(seats.map(s=>s.S.count)),flight:avg(seats.map(s=>s.S.flight)),inv:avg(seats.map(s=>s.S.inv)),supply:avg(seats.map(s=>s.S.supply))};
  // lanes
  const lanes={};seats.forEach(s=>{const k=s.S.ps;if(!k)return;const L=lanes[k]=lanes[k]||{n:0,w:0,tot:[],arcs:[],deliv:[],hall:[],flight:[],kb:[],t2:[],msD:[],msH:[],msK:[],msF:[],sea:[],maj:[],wharf:[],yard:[],loads:[],brews:[],gruit:[],trade:[]};
    L.n++;if(s.win)L.w++;L.tot.push(s.S.sc.total);L.arcs.push(s.arcs);L.deliv.push(s.S.deliv);L.hall.push(s.S.hallN);L.flight.push(s.S.flight);L.kb.push(s.S.kb);L.t2.push(s.S.t2);
    L.sea.push(s.S.sc.sea+s.S.sc.docked);L.maj.push(s.S.sc.maj);L.wharf.push(s.S.sc.wharf);L.yard.push(s.cnt.yard||0);L.loads.push(s.cnt.load||0);L.brews.push(s.cnt.brew||0);L.gruit.push(s.cnt.gruit||0);L.trade.push(s.cnt.trade||0);
    if(s.ms.deliver!=null)L.msD.push(s.ms.deliver);if(s.ms.hall!=null)L.msH.push(s.ms.hall);if(s.ms.kbuild!=null)L.msK.push(s.ms.kbuild);if(s.ms.flip!=null)L.msF.push(s.ms.flip);});
  R.sailed=avg(games.map(g=>g.sailed||0));R.comms=avg(games.map(g=>g.turns.reduce((x,t)=>x+t.ev.filter(e=>tag(e)==='comm').length,0)));
  const sig=s=>s.arcSet.map(b=>b?1:0).join('');const winners=seats.filter(s=>s.win);const sigs={};winners.forEach(s=>{const k=sig(s);sigs[k]=(sigs[k]||0)+1;});
  const top=Object.entries(sigs).sort((x,y)=>y[1]-x[1]);R.sigN=top.length;R.sigTop=top.slice(0,3).map(([k,v])=>k+' '+pc(v/Math.max(1,winners.length)));
  R.winParts={};parts.forEach(k=>R.winParts[k]=avg(winners.map(s=>s.S.sc[k]||0)));
  R.leadChange=avg(games.map(g=>{const sn=g.snaps;if(sn.length<2)return 0;const prev=sn[sn.length-2].seats.map(x=>x.sc);let lead=0;prev.forEach((v,i)=>{if(v>prev[lead])lead=i;});return lead!==g.win?1:0;}));
  R.lanes=lanes;R.seatN=seats.length;
  const c=k=>avg(seats.map(s=>s.cnt[k]||0));R.ev={brews:c('brew'),gruit:c('gruit'),loads:c('load'),yard:c('yard'),hall:c('hall'),inv:c('inv'),trade:c('trade'),post:c('post'),raise:c('raise'),market:avg(seats.map(s=>s.own.filter(t=>t.c==='A').length))};
  R.neverLeft=R.ev.brews-R.ev.loads-R.ev.yard-R.ev.hall;
  R.invRunway=med(seats.filter(s=>s.ms.inv!=null).map(s=>s.rounds-s.ms.inv));R.invDead=avg(seats.map(s=>s.S.inv));
  return R;}
const labels=Object.keys(G).sort();
console.log('=== the turn oracle — '+files.length+' shard files · labels: '+labels.join(', ')+(errs?' · '+errs+' errored games skipped':'')+' ===');
labels.forEach(L=>{
  const per=COUNTS.map(n=>groupStudy(G[L][n]||[]));
  const col=(fn,sep=' / ')=>per.map(R=>R.games?fn(R):'—').join(sep);
  console.log('\n######## '+L+' · games '+col(R=>R.games)+' ('+COUNTS.map(n=>n+'p').join(' / ')+')');
  console.log('PACE    rounds '+col(R=>f1(R.rounds)+' ['+R.rmin+'–'+R.rmax+']')+' · in band '+col(R=>pc(R.band))+' · ended on the dice '+col(R=>pc(R.dice))+' · turns a seat '+col(R=>f1(R.turnsPerSeat)));
  console.log('TURNS   what a work turn hands its seat (each turn classed by its best event)');
  console.log('  big   '+col(R=>pc(R.big))+'   a ★ or a lasting piece: a delivery · a present · a sail · a post · a building · the Flip · a recipe · a specialist · a card crosses · a chain');
  console.log('  small '+col(R=>pc(R.small))+'   progress: a brew · aging · Ready · a commission · a load · Raise die · the dividend · the trade · the yard · a bonus · a building stop');
  console.log('  petty '+col(R=>pc(R.petty))+'   goods only (the Market\'s grain, a prize\'s grain)');
  console.log('  empty '+col(R=>pc(R.empty))+'   moved, nothing');
  console.log('  events a turn '+col(R=>f1(R.evPerTurn))+' · turns that move ★ '+col(R=>pc(R.starTurns))+' · ★ a turn '+col(R=>f1(R.starPerTurn))+' · a die spent '+col(R=>pc(R.dieTurns))+' (two '+col(R=>pc(R.die2))+')');
  console.log('  ★ silence — a seat\'s longest run of own turns with no ★: '+col(R=>f1(R.silence))+' turns · seats with a run ≥5: '+col(R=>pc(R.silence5)));
  console.log('  by phase (rounds 1–4 · 5–8 · 9+) events a turn '+col(R=>R.ph.map(p=>f1(p.ev)).join('·'))+' · big turns '+col(R=>R.ph.map(p=>pc(p.big)).join('·'))+' · empty '+col(R=>R.ph.map(p=>pc(p.empty)).join('·'))+' · ★ a turn '+col(R=>R.ph.map(p=>f1(p.star)).join('·')));
  console.log('  dice by phase '+col(R=>R.ph.map(p=>pc(p.die)).join('·')));
  console.log('  stations Market·Brewhouse·Harbor·Cellar '+col(R=>R.st.map(pc).join('·'))+' · big turns in the final round '+col(R=>pc(R.last)));
  console.log('PASSIVE what a seat gets on a rival\'s clock — turns where a rival gained ★ '+col(R=>pc(R.rivalGain))+' · lost ★ '+col(R=>pc(R.rivalLoss))+' · own casks carried by a rival\'s sail a game '+col(R=>f1(R.carried))+' · deliveries on a rival\'s clock a game '+col(R=>f1(R.rivalDeliv)));
  console.log('ARCS    first-time milestones — the share of seats reaching it · the median round of those who do');
  MS.forEach(([k,name])=>{console.log('  '+name.padEnd(30)+col(R=>pc(R.ms[k].reach)+(R.ms[k].med!=null?' r'+R.ms[k].med:'').padEnd(8),'  '));});
  console.log('  arcs completed a seat (of six: '+ARCN.join(' · ')+'): mean '+col(R=>f1(R.arcs))+' · ≥2 '+col(R=>pc(R.arcs2))+' · ≥3 '+col(R=>pc(R.arcs3))+' · none '+col(R=>pc(R.arcs0)));
  console.log('  each arc reached: '+col(R=>R.arcEach.map(pc).join('·')));
  console.log('  dead ends — seats with no far delivery '+col(R=>pc(R.noFar))+' · neither delivery nor present '+col(R=>pc(R.noDoor))+' · never loaded '+col(R=>pc(R.noLoad))+' · a Ready cask stranded at the end '+col(R=>pc(R.stranded))+' · Flight under 3 '+col(R=>pc(R.flightLow)));
  console.log('  per seat: deliveries '+col(R=>f1(R.perSeat.deliv))+' · presents '+col(R=>f1(R.perSeat.hall))+' · yard carts '+col(R=>f1(R.perSeat.yard))+' · Kontor buildings '+col(R=>f1(R.perSeat.kb))+' · tiles '+col(R=>f1(R.perSeat.tiles))+' (Flips '+col(R=>f1(R.perSeat.t2))+') · recipes '+col(R=>f1(R.perSeat.recipes))+' · specialists '+col(R=>f1(R.perSeat.specs))+' · count '+col(R=>f1(R.perSeat.count))+' · Flight '+col(R=>f1(R.perSeat.flight))+' · ⚜ held '+col(R=>f1(R.perSeat.inv))+' · dice left '+col(R=>f1(R.perSeat.supply)));
  console.log('  casks a seat: brews '+col(R=>f1(R.ev.brews))+' (Gruit '+col(R=>f1(R.ev.gruit))+') · loads '+col(R=>f1(R.ev.loads))+' · yard carts '+col(R=>f1(R.ev.yard))+' · presents '+col(R=>f1(R.ev.hall))+' · never left the brewery '+col(R=>f1(R.neverLeft))+' · posts '+col(R=>f1(R.ev.post))+' · Raise die '+col(R=>f1(R.ev.raise))+' · Market visits '+col(R=>f1(R.ev.market))+' · Ships commissioned a game '+col(R=>f1(R.comms))+' → sailed '+col(R=>f1(R.sailed)));
  console.log('  the ⚜: earned a seat '+col(R=>f1(R.ev.inv))+' · traded '+col(R=>f1(R.ev.trade))+' · presented '+col(R=>f1(R.ev.hall))+' · held at the end '+col(R=>f1(R.invDead))+' · rounds left after the first ⚜ (median) '+col(R=>R.invRunway==null?'—':R.invRunway));
  console.log('SCORE   a seat: deliveries '+col(R=>f1(R.parts.deliv))+' · hall '+col(R=>f1(R.parts.hall))+' · sea pips '+col(R=>f1(R.parts.sea))+' · docked '+col(R=>f1(R.parts.docked))+' · wharf '+col(R=>f1(R.parts.wharf))+' · majorities '+col(R=>f1(R.parts.maj))+' · Flight '+col(R=>f1(R.parts.flight))+' · specialists '+col(R=>f1(R.parts.bank+R.parts.guild))+' · total '+col(R=>f1(R.total)));
  console.log('        winner '+col(R=>f1(R.winTotal))+' · margin '+col(R=>f1(R.margin))+' · close (≤10★) '+col(R=>pc(R.close))+' · contested majorities a game (leader ahead by ≤1) '+col(R=>f1(R.contested)));
  console.log('PATHS   the winners\' arc sets (bits: Kontor building · 2-seg chain · Flight ≥3 · hall · Flip · specialist): distinct '+col(R=>R.sigN)+' · top three '+col(R=>R.sigTop.join(' '),'  |  '));
  console.log('        the winner\'s ★ by part: deliveries '+col(R=>f1(R.winParts.deliv))+' · hall '+col(R=>f1(R.winParts.hall))+' · sea pips '+col(R=>f1(R.winParts.sea))+' · docked '+col(R=>f1(R.winParts.docked))+' · wharf '+col(R=>f1(R.winParts.wharf))+' · majorities '+col(R=>f1(R.winParts.maj))+' · Flight '+col(R=>f1(R.winParts.flight))+' · the lead changed in the final round '+col(R=>pc(R.leadChange)));
  const anyLanes=per.some(R=>R.lanes&&Object.keys(R.lanes).length);
  if(anyLanes){console.log('LANES   (USAGE first: what each committed lane did; VALUE second: its win share)');
    const names=[...new Set(per.flatMap(R=>Object.keys(R.lanes||{})))].sort();
    names.forEach(k=>{const c=(fn)=>per.map(R=>{const Lg=R.lanes&&R.lanes[k];return Lg?fn(Lg):'—';}).join(' / ');
      console.log('  '+k.padEnd(11)+'seats '+c(Lg=>Lg.n)+' · brews '+c(Lg=>f1(avg(Lg.brews)))+' (Gruit '+c(Lg=>f1(avg(Lg.gruit)))+') · loads '+c(Lg=>f1(avg(Lg.loads)))+' · yard '+c(Lg=>f1(avg(Lg.yard)))+' · trades '+c(Lg=>f1(avg(Lg.trade)))+' · deliveries '+c(Lg=>f1(avg(Lg.deliv)))+' · presents '+c(Lg=>f1(avg(Lg.hall)))+' · Kontor bldgs '+c(Lg=>f1(avg(Lg.kb)))+' · Flips '+c(Lg=>f1(avg(Lg.t2)))+' · Flight '+c(Lg=>f1(avg(Lg.flight)))+' · arcs '+c(Lg=>f1(avg(Lg.arcs)))+' · 1st delivery r'+c(Lg=>med(Lg.msD)==null?'—':med(Lg.msD))+' · ★ '+c(Lg=>f1(avg(Lg.tot)))+' (sea '+c(Lg=>f1(avg(Lg.sea)))+' maj '+c(Lg=>f1(avg(Lg.maj)))+' wharf '+c(Lg=>f1(avg(Lg.wharf)))+') · WINS '+c(Lg=>pc(Lg.w/Lg.n)));});}
});

if(opt.timeline){const [lab,nn,gi]=opt.timeline.split(':');const g=((G[lab]||{})[+nn]||[]).find(x=>x.gi===+gi)||((G[lab]||{})[+nn]||[])[0];
  if(!g){console.log('no such game');}else{
    console.log('\n==== timeline · '+lab+' · '+g.n+'p · game '+g.gi+' · '+g.rounds+' rounds ('+g.trigger+') · winner P'+(g.win+1)+' — final ★ '+g.seats.map((s,i)=>'P'+(i+1)+(s.ps?'/'+s.ps:'')+' '+s.sc.total).join(' · '));
    const CN={A:'Market',B:'Brewhouse',C:'Harbor',D:'Cellar'};
    g.turns.forEach(t=>{const pev=t.pev.length?'  ⟨'+t.pev.map(x=>'P'+(x[0]+1)+':'+x[1]).join(' ')+'⟩':'';
      console.log('r'+String(t.r).padStart(2)+' P'+(t.s+1)+' '+CN[t.c].padEnd(9)+(t.d?' die×'+t.d:'      ')+' '+(t.dg>=0?'+':'')+t.dg+'G '+(t.dh>=0?'+':'')+t.dh+'H '+(t.ds>0?'+'+t.ds+'★':t.ds<0?t.ds+'★':'   ')+'  '+t.ev.join(' ')+pev);});
    g.snaps.forEach(s=>{});
    console.log('  the score by round: '+g.snaps.map(s=>'r'+s.r+' '+s.seats.map(x=>x.sc).join('/')).join(' · '));}}

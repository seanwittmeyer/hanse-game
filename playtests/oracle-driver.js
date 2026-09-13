//================= ORACLE DRIVER — appended in-scope by playtests/oracle.js, never run alone =================
// Wraps the CANONICAL engine's own functions to write a per-turn trace: what each work turn
// handed its seat (events), the dice and goods it spent, the ★ it moved, and what happened to
// the other seats on that clock. USAGE first: the trace records events; the study reads them.
render=function(){};save=function(){};log=function(){};snapshot=function(){};
if(__SRCN>0)SRC_PRIMARY=__SRCN;
if(__MUST>=0)COMM_MUST=__MUST;
if(__GMR>0)GM_ROLLS=__GMR;
if(__GMS>0)GUILD_MS=__GMS;
if(__CMS>0)CELLAR_MS=__CMS;
var __G=null,__T=null;
function __on(){return !!__G&&!aiSimulating;}
function __tot(){return S.players.map(function(q){return scorePlayer(q).total;});}
function __ev(pid,tag){if(!__on())return;
  if(__T&&pid===__T.s)__T.ev.push(tag);
  else if(__T)__T.pev.push([pid,tag]);
  else __G.loose.push([S.turn,pid,tag]);}
function __open(p){__T={r:S.turn,s:p.id,c:p.cell,sup0:p.supply,g0:p.grain,h0:p.hops,sc0:__tot(),ev:[],pev:[]};}
function __close(sid){if(!__T)return;var p=S.players[sid];var sc1=__tot();var T=__T;
  __G.turns.push({r:T.r,s:sid,c:T.c,d:T.sup0-p.supply,dg:p.grain-T.g0,dh:p.hops-T.h0,ds:sc1[sid]-T.sc0[sid],ev:T.ev,pev:T.pev,
    psc:sc1.map(function(v,i){return [i,v-T.sc0[i]];}).filter(function(x){return x[0]!==sid&&x[1]!==0;})});
  __T=null;}
function __snap(){__G.snaps.push({r:S.turn,seats:S.players.map(function(q){var sc=scorePlayer(q);
  return {sc:sc.total,sup:q.supply,cnt:qualityCount(q),g:q.grain,h:q.hops,inv:q.invites,vb:q.vessels.filter(function(c){return c;}).length};})});}
function __chainCheck(pid){var p=S.players[pid];FAR.forEach(function(k){if(hasChain(p,k)&&!__G.chains[pid][k]){__G.chains[pid][k]=1;__ev(pid,'chain:'+k);}});}
var __doMove=doMove;doMove=function(c){var p=cur();var r=__doMove(c);if(__on()&&p.placed&&p.cell===c&&!__T)__open(p);return r;};
var __endTurn=endTurn;endTurn=function(){var a0=S.active,t0=S.turn;var r=__endTurn();
  if(__on()&&(S.active!==a0||S.over)){__close(a0);if(S.turn>t0||S.over)__snap();}return r;};
var __brewCommit=brewCommit;brewCommit=function(st,v){var p=cur();var vi=openVessel(p);var n0=p._brews||0;var r=__brewCommit(st,v);
  if(__on()&&(p._brews||0)>n0){__ev(p.id,'brew:'+st);var c=p.vessels[vi];if(c&&caskReady(c))__ev(p.id,'ready:'+st);}return r;};
var __ageAllot=ageAllot;ageAllot=function(vi){var p=cur();var c=p.vessels[vi];var d0=c?c.die:0;var r=__ageAllot(vi);
  if(__on()&&c&&c.die>d0){__ev(p.id,'age');if(c.die>=c.q)__ev(p.id,'ready:'+c.style);}return r;};
if(typeof braumeisterTick==='function'){var __braum=braumeisterTick;braumeisterTick=function(p){var b=p.vessels.map(function(c){return c?c.die:null;});var r=__braum(p);
  if(__on())p.vessels.forEach(function(c,i){if(c&&b[i]!=null&&c.die>b[i]){__ev(p.id,'braumeister');if(c.die>=c.q)__ev(p.id,'ready:'+c.style);}});return r;};}
var __loadCommit=loadCommit;loadCommit=function(sid,vi){var p=cur();var t=S.slots[sid];var d=t?shipDest(t):'?';var c=p.vessels[vi];var r=__loadCommit(sid,vi);
  if(__on()&&c&&!p.vessels[vi])__ev(p.id,'load:'+d+':'+c.style);return r;};
var __sailShip=sailShip;sailShip=function(slot,cid){var t=S.slots[slot];var owners=t?(t.load||[]).map(function(L){return L.owner;}):[];var d=t?shipDest(t):'?';var r=__sailShip(slot,cid);
  if(__on()&&!S.slots[slot]){__ev(cid,'sail:'+d);owners.forEach(function(o){if(o!==cid)__ev(o,'carried:'+d);});}return r;};
var __landDeliver=landDeliver;landDeliver=function(lp,L,Lg){var r=__landDeliver(lp,L,Lg);
  if(__on()){var dd=lp.delivered[lp.delivered.length-1];__ev(lp.id,'deliver:'+Lg.dest+':'+(dd?dd.val:0));__ev(lp.id,'inv');}return r;};
var __yardLand=yardLand;yardLand=function(p,vi){var c=p.vessels[vi];var r=__yardLand(p,vi);
  if(__on())__ev(p.id,'yard:'+yardZone(S.yard.length-1)+':'+(c?c.style:'?'));return r;};
var __hallPresent=hallPresent;hallPresent=function(p,vi){var n0=p.delivered.length;var r=__hallPresent(p,vi);
  if(__on()&&p.delivered.length>n0){var dd=p.delivered[p.delivered.length-1];__ev(p.id,'hall:'+dd.val);}return r;};
if(typeof gainGrain==='function'){var __gainGrain=gainGrain;gainGrain=function(p,n,why){var r=__gainGrain(p,n,why);
  if(__on())__ev(p.id,'grain:'+(why?(why.indexOf('yard')>=0?'yard':why.indexOf('hall')>=0?'hall':why.indexOf('bonus')>=0?'bonus':'other'):'market'));return r;};}
var __yardPick=yardPick;yardPick=function(ch,st){var b=(UI.pendingYard||[])[0];var lp=b?S.players[b.pid]:null;var n0=lp?lp.recipes.length:0;var r=__yardPick(ch,st);
  if(__on()&&lp&&lp.recipes.length>n0)__ev(lp.id,'recipe:'+st+':yard');return r;};
var __recipeGainPick=recipeGainPick;recipeGainPick=function(st){var p=cur();var n0=p.recipes.length;var r=__recipeGainPick(st);
  if(__on()&&p.recipes.length>n0)__ev(p.id,'recipe:'+st+':bonus');return r;};
if(typeof guildhallGrant==='function'){var __guildhallGrant=guildhallGrant;guildhallGrant=function(p){var n0=p.recipes.length;var r=__guildhallGrant(p);
  if(__on()&&p.recipes.length>n0)__ev(p.id,'recipe:guildhall:'+(p.recipes.length-n0));return r;};}
var __grantUpgrade=grantUpgrade;grantUpgrade=function(p,k){var n0=p.upgrades.length;var r=__grantUpgrade(p,k);
  if(__on()&&p.upgrades.length>n0)__ev(p.id,'spec:'+k);return r;};
var __postPick=postPick;postPick=function(seg){var P=UI.post;var pid=P?P.pid:S.active;var had=!!(S.sea.posts[seg]&&S.sea.posts[seg][pid]!=null);var r=__postPick(seg);
  if(__on()&&!had&&S.sea.posts[seg]&&S.sea.posts[seg][pid]!=null){__ev(pid,'post:'+seg);__chainCheck(pid);}return r;};
if(typeof bondStand==='function'){var __bondStand=bondStand;bondStand=function(p,seg){var r=__bondStand(p,seg);if(__on()){__ev(p.id,'post:'+seg+':bond');__chainCheck(p.id);}return r;};}
var __kbuildPick=kbuildPick;kbuildPick=function(k,t){var K=UI.kb;var pid=K?K.pid:S.active;var was=S.sea.kontor[k].slots.filter(function(x){return x;}).length;var r=__kbuildPick(k,t);
  if(__on()&&S.sea.kontor[k].slots.filter(function(x){return x;}).length>was)__ev(pid,'kbuild:'+k+':'+t);return r;};
var __placePrivOn=placePrivOn;placePrivOn=function(slot){var B=UI.pb;var pid=B?B.pid:S.active;var st=B?B.station:'?';var b0=privAt(slot);var r=__placePrivOn(slot);
  if(__on()&&!b0&&privAt(slot))__ev(pid,'pbuild:'+st);return r;};
var __pbuildPick=pbuildPick;pbuildPick=function(kind,st){var B=UI.pb;var pid=B?B.pid:S.active;var r=__pbuildPick(kind,st);
  if(__on()&&kind==='flip')__ev(pid,'flip:'+st);return r;};
var __commPlace=commPlace;commPlace=function(slot){var p=cur();var r=__commPlace(slot);var t=S.slots[slot];
  if(__on()&&t&&t.type==='ship')__ev(p.id,'comm:'+t.ship+':'+t.dest);return r;};
var __raiseApply=raiseApply;raiseApply=function(p,t){var r=__raiseApply(p,t);if(__on())__ev(p.id,'raise:'+t.kind);return r;};
if(typeof srcTrade==='function'){var __srcTrade=srcTrade;srcTrade=function(){var p=cur();var i0=p.invites;var r=__srcTrade();if(__on()&&p.invites<i0)__ev(p.id,'trade');return r;};}
if(typeof dividend==='function'){var __dividend=dividend;dividend=function(p){var r=__dividend(p);if(__on()&&DIVIDEND_H)__ev(p.id,'dividend');return r;};}
if(typeof flightCross==='function'){var __flightCross=flightCross;flightCross=function(p,st){var r=__flightCross(p,st);if(__on())__ev(p.id,'cross:'+st+':'+flightBeers(p));return r;};}
var __enterPact=enterPact;enterPact=function(slot,rt){var p=cur();var b=privAt(slot);var r=__enterPact(slot,rt);if(__on())__ev(p.id,'pact:'+(b?pactKind(b):'?'));return r;};
var __fireCaskAct=fireCaskAct;fireCaskAct=function(act,rt){var p=cur();var r=__fireCaskAct(act,rt);if(__on())__ev(p.id,'bonus:'+act);return r;};
if(typeof gainGrain!=='function'&&typeof srcTake==='function'){var __srcTakeOld=srcTake;srcTake=function(g,h){var p=cur();var r=__srcTakeOld(g,h);if(__on())__ev(p.id,'grain:market');return r;};}
function __runGame(n,gi){
  __G={turns:[],snaps:[],loose:[],chains:{}};__T=null;
  S=freshState(n,['P1','P2','P3','P4','P5'].slice(0,n));UI={sub:'starter'};undoStack=[];
  S.players.forEach(function(p,i){var ps=null;
    if(__PERSONAS)ps=__MIX?AI_PERSONAS[Math.floor(Math.random()*AI_PERSONAS.length)]:AI_PERSONAS[(i+gi)%AI_PERSONAS.length];
    p.ai=__PERSONAS?{tier:__PTIER,persona:ps}:{tier:__TIER};
    if(__SUPPLY>0)p.supply=__SUPPLY;__G.chains[p.id]={};});
  var guard=0;
  while(!S.over){aiStep();if(++guard>250000)return {error:'runaway (guard tripped)',n:n,round:S.turn,sub:UI.sub};}
  if(__T)__close(__T.s);
  var idOK=S.players.every(function(p){return p.supply+diceOnBoard(p)===(SUPPLY_DICE+2)&&p.supply>=0;});
  var rows=finalRows().rows;
  return {n:n,gi:gi,rounds:S.turn,trigger:S.endReason||'?',sailed:S.sailed,idOK:idOK,win:rows[0].p.id,
    seats:S.players.map(function(q){var sc=scorePlayer(q);
      return {id:q.id,ps:(q.ai&&q.ai.persona)||null,tier:q.ai.tier,sc:sc,count:qualityCount(q),
        chains:FAR.filter(function(k){return hasChain(q,k);}).length,kb:bldgsOf(q),flight:flightBeers(q),
        deliv:q.delivered.filter(function(d){return !d.yard&&!d.hall;}).length,hallN:q.delivered.filter(function(d){return d.hall;}).length,
        yardN:q.delivered.filter(function(d){return d.yard;}).length,
        tiles:SLOTS.filter(function(s){var b=privAt(s.id);return b&&b.owner===q.id;}).length,
        t2:SLOTS.filter(function(s){var b=privAt(s.id);return b&&b.owner===q.id&&b.tier===2;}).length,
        recipes:q.recipes.length,specs:q.upgrades.slice(),supply:q.supply,inv:q.invites,g:q.grain,h:q.hops,
        parked:KONTORE.map(function(k){return parkedAt(q,k);}),
        stranded:q.vessels.filter(function(c){return c&&caskReady(c);}).length};}),
    turns:__G.turns,snaps:__G.snaps,loose:__G.loose};
}
var __OUT=[];
__COUNTS.forEach(function(n){for(var g=0;g<__N;g++){__seed(__SEED+(g+__GOFF)*7919+n*104729);var r;
  try{r=__runGame(n,g+__GOFF);}catch(e){r={error:String(e&&e.stack||e).slice(0,600),n:n,round:(typeof S!=='undefined'&&S)?S.turn:0,sub:UI&&UI.sub};}
  __OUT.push(r);}});
this.__OUT=__OUT;

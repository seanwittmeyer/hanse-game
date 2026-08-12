// Brewhouses of the Hanse — the shared CARD COMPONENT LIBRARY (v3.3).
// Single source of the printed card faces: data + generators + card CSS, used by BOTH
// print.html (the print kit) and play.html (the app mirrors the kit). Faces are the
// canon — edit a card HERE, never per-page. Everything lives in one IIFE and is exposed as
// window.HC; the card CSS injects itself at load (scoped so it cannot restyle a host page).
(function(){
'use strict';
// ---- ILLUSTRATED ICONS (2026-08-03) — the c.1350 sticker set replaces the Lucide glyphs at the
// one swap point. ICON_ART maps a lucide name (or a VIRTUAL name — contract · age-3 · kontor-<city>)
// to its art/icons/<file>.png; LU emits the art <img> when mapped, else the lucide <i> as before.
// LUX is the raw-lucide escape hatch for the crest contexts the designer ruled OUT of the program
// (building-tile + specialist-tile crests keep their glyphs — the tiles already carry full art).
// (round 4b, designer: wheat/sprout are NOT mapped — at cost-chip size the art muddies, so
// grain & hops ride the coloured Lucide glyphs everywhere; the big goods TOKENS keep art via tok())
const ICON_ART={coins:'goods',dices:'quality-die',
  'dice-1':'die-1','dice-2':'die-2','dice-3':'die-3','dice-4':'die-4','dice-5':'die-5','dice-6':'die-6',
  star:'star',check:'ready',beer:'cask',sailboat:'ship',landmark:'kontor','building-2':'building',
  wrench:'specialist','scroll-text':'recipe','map-pin':'presence',search:'build','package-plus':'bonus-load',
  'flask-conical':'station-brew',hourglass:'station-age',store:'station-market',ship:'station-harbor',
  anchor:'wharf',hammer:'build',contract:'contract','age-3':'station-age-3','kontor-bruges':'kontor-bruges',
  'kontor-london':'kontor-london','kontor-bergen':'kontor-bergen','kontor-novgorod':'kontor-novgorod',
  // round 2 (2026-08-03): building-2 = the HOUSE (you PLACE a building — the noun; the trowel 'build'
  // stays the verb via search) · the numbered QUALITY casks (side-lying, wax-sealed, numeral overlaid)
  // · die-q = the parked-die value (die + ?) · sail = the ship with its forward arrow
  'quality-1':'quality-1','quality-2':'quality-2','quality-3':'quality-3','quality-4':'quality-4',
  'quality-5':'quality-5','quality-6':'quality-6','die-q':'die-q',sail:'sail','age-1':'station-age-1','age-2':'station-age-2',
  // die MODIFIER marks (round 4): the die with its lift/drop printed on it — drops in red
  'die-plus1':'die-plus1','die-plus2':'die-plus2','die-plus3':'die-plus3','die-minus1':'die-minus1'};
const LUX=(n,cls)=>'<i data-lucide="'+n+'"'+(cls?' class="'+cls+'"':' class="ic"')+'></i>';
const LU=(n,cls)=>ICON_ART[n]?'<img class="ai ic'+(cls?' '+cls:'')+'" src="art/icons/'+ICON_ART[n]+'.png" alt="">':LUX(n,cls);
const cost=(g,h)=>{let a=[];if(g)a.push('<span class="gc g">'+LU('wheat','g')+g+'</span>');if(h)a.push('<span class="gc h">'+LU('sprout','h')+h+'</span>');return a.join('');};   // the NUMBER rides the goods colour too (designer, round 2)
const QI='beer', VP='star';  // quality icon (a beer = its quality/level) · victory-point icon

// v3.0-A "SPECIFIC GAINS" — a cask's slot-action is one of NINE concrete acquisitions, printed on the
// tile and steerable at the kettle (the face-up top of each quality pile). The pool is quality-gated:
// survey/hire/brew join at Q3+ (v4.12 — brew was Q4+: 'brew is a true throttle'). Convert and the pool Wild are CUT (Convert -> the Grain
// Exchange work; Wild survives only as the Workshop dock effect + the flipped-tile Floor stops).
// Gruit is PINNED to Source. Icons/texts mirror play.html CASK_ACT.
const CASK_POOL=[   // v4.0: the cask action is a LOAD BONUS — it fires as the cask boards a hull.
  // v4.2 "the fee rides the ITEM": the three ACQUISITION bonuses read "· fee" — you pay the
  // chosen item's OWN printed price (recipe card / specialist tile / building tile; chipless
  // buildings are free). The kontor prizes stay free; using a building never adds a fee.
  {k:'source',  ai:'coins',         act:'Gain 2 goods',             q:2},
  {k:'age',     ai:'age-2',     act:'Age +2',                   q:2},
  {k:'load',    ai:'package-plus',  act:'Load 1 more cask',         q:2},   // TODO(art 2026-08-09, designer): 'Load 1 more' wants its OWN icon — bonus-load reads too generic; brief queued in art/PROMPTS.md
  {k:'reach',   ai:'map-pin',       act:'+1 presence',         q:2},   // v4.12: free as a cask action — ONLY the Almoner's Stall charges 2G
  {k:'recipe',  ai:'scroll-text',   act:'Gain 1 recipe',          q:2},
  {k:'survey',  ai:'search',        act:'Build 1 building',  q:3},   // v4.9: the builder's die stands on it — no printed ★
  {k:'hire',    ai:'wrench',        act:'Gain 1 specialist',      q:3},
  {k:'brew',    ai:'flask-conical', act:'Brew 1 cask',              q:3},   // v4.12: Q3+ (was Q4+)
];
const poolFor=q=>CASK_POOL.filter(a=>q>=a.q);   // the printed mix per quality tier
// cask supply — fixed global counts (COMPONENTS §5; the scarce high-Q exports are intentional). Gruit PINNED to Source; Q2+ draw at brew (steerable).
// ready = maturation steps (v1.1: Hopped & Broyhan are FAST = ready 1; Keut ready 2; Mumme/Bock ready 3).
const CASKS=[
  {nm:'Gruit',   c:'#8a949c', q:1, g:1,h:0, n:16, ready:0, pin:CASK_POOL[0]},   // v4.0: 0 aging steps — fresh ale, Ready at brew (die 1)
  {nm:'Hopped',  c:'#c2922f', q:2, g:1,h:1, n:12, ready:1},
  {nm:'Broyhan', c:'#b06a34', q:3, g:1,h:2, n:6,  ready:1, off:2},   // v4.12 offsets: each Q3+ beer prints ONE brew tile of its six (never all — the 6-window must cross verb 8)
  {nm:'Keut',    c:'#9c5f2e', q:3, g:2,h:1, n:6,  ready:2, off:6, tag:'<b>+1</b> '+LU('map-pin')+'<br>presence'},
  {nm:'Mumme',   c:'#caa12a', q:4, g:1,h:3, n:6,  ready:3, off:4},
  {nm:'Bock',    c:'#7c2128', q:5, g:2,h:3, n:6,  ready:3, off:3},
  // ---- EXPANSION "Specialty Beers" (v4.14 "Beer Atlas" — re-derived on the v4 spine; opt-in) —
  // PINNED-signature casks, drafted 3-of-7 with the toggle (>=1 base Q4+ guaranteed) ----
  // v4.15b [designer-ruled 2026-08-10 — "keep it simple"]: the signature IS the pinned bonus.
  {nm:'Gose', exp:1,     c:'#6e8b74', q:2, g:2,h:0, n:8, ready:1, pin:{k:'goods3',ai:'coins',act:'Gain 3 goods',q:2}},
  {nm:'Zerbster', exp:1, c:'#5f7a3c', q:3, g:0,h:3, n:6, ready:1, pin:{k:'zgyle',ai:'package-plus',act:'A free Gruit (a tray die) · Load 1 more',q:3}},
  {nm:'Duckstein', exp:1,c:'#7a5236', q:2, g:1,h:1, n:8, ready:1, pin:CASK_POOL[3], tag:'smoke-hardy:<br>'+LU('die-plus1')+' as it boards'},   // v4.14: the old ready-2 collapses to 1 (the die floors at 1); the board-lift IS the identity
  // ---- EXPANSION CAPSTONE "Jopenbier" (its OWN toggle) — v4.14: a PLAIN Q6 (the dock-vintage is cut —
  // it rode the deploy state); start 2, FOUR aging steps, the die parks at 6 (8★ at Novgorod) ----
  {nm:'Jopenbier', exp:1,c:'#5e2433', q:6, g:2,h:4, n:6, ready:4, pin:CASK_POOL[0], tag:'the vintage:<br>ages to '+LU('dice-6')},
];
// v4.0 — NEUTRAL, destination-bound hulls (the destination is PRINTED on the tile). The 24-tile deck,
// KONTORE ONLY, now in THREE sizes: Skute 1 · Cog 2 · Hulk 3 berths — a Skute sails on its first load
// (the deadlock relief valve is a COMPONENT now; the charter/contract subsystem is retired).
const HULL={skute:{cap:1,fee:2},cog:{cap:2,fee:1},hulk:{cap:3,fee:0}};   // v4.8 "Harbor Rates" ⚙: the commission fee is PER HULL — 2/1/0 G for 1/2/3 berths (dispatch speed is dear, tonnage free); fee 0 prints NO chip (chipless = free, the buildings' grammar)
const SHIP_DISPLAY=4;   // face-up ship market ⚙ (v4.0: 4 — refills from the shuffled ship deck)
const SHIP_DEST={Bruges:{kc:'#274b5c',req:1},London:{kc:'#b8860b',req:2},Bergen:{kc:'#4a6b3a',req:2},Novgorod:{kc:'#7c2128',req:3}};   // v4.10: Novgorod's printed minimum is 3+ (the export band) — the tile had kept the pre-v4.10 4+
const SHIP_DECK=[   // ⚙ 24 hulls — 6 Skute / 10 Cog / 8 Hulk, 6 per port
  ['skute','Bruges'],['cog','Bruges'],['cog','Bruges'],['cog','Bruges'],['hulk','Bruges'],['hulk','Bruges'],
  ['skute','London'],['skute','London'],['cog','London'],['cog','London'],['hulk','London'],['hulk','London'],
  ['skute','Bergen'],['cog','Bergen'],['cog','Bergen'],['cog','Bergen'],['hulk','Bergen'],['hulk','Bergen'],
  ['skute','Novgorod'],['skute','Novgorod'],['cog','Novgorod'],['cog','Novgorod'],['hulk','Novgorod'],['hulk','Novgorod'],
];
// ---- SLOT TILES (v3.0-A): PRIVILEGES & BUILDINGS — the one owned family on the living slots (mirrors
// play.html BUILDINGS). One grammar: "a tile modifies the OCCUPANT docked on it", in two verbs —
//   • VALUE = a PRIVILEGE (blue): prints a plain +N★ bonus. When the OWNER's cask departs the slot
//     toward a sale, turn its tally die to N — once, at departure, nothing recalculated (the pips ARE
//     the ★ banked on delivery; no premium, no cap rule, no sail-time bump). A rival's cargo banks nothing.
//   • TRANSFORM = a WORK (green): changes the docked cask/ship, for WHOEVER docks there. Three works
//     print an ACTION — their slot's stop offers "deploy here OR the printed action".
// v3.0-A cuts the Gauger's Office + the Festkeller; Rich Berth is reworked to the sail-short valve;
// Pilot's House · Open Staithe · Rope Walk · Grain Exchange · Mission Quay are new works.
// art: — the five new works ride interim stand-in art (the cut tiles' freed files + ship art) until
// their own images are generated; briefs are queued in art/PROMPTS.md.
const DIE=n=>'<span class="diech">'+LU('dice-'+n)+'</span>';
const BTGT={cask:{ic:'beer',lbl:'a CASK docked here'},ship:{ic:'sailboat',lbl:'a SHIP docked here'}};
const BUILDINGS=[
  // ---- v4.5b "Open Orders" — THE DICE PASS: 8 of the 17 tiles touch a die (was 3). ONE green
  // family — every building serves whoever activates it; the builder STANDS A DIE on the tile at
  // its printed start face (v4.9/v4.9b — the +3★ mint is cut; ms below is that printed face).
  // ACTION buildings print a verb, fired on their slot's stop; LOAD-LIFT buildings modify the
  // boarding die / the ship at their slot. The Annex (echo verb) is CUT; the goods faucets thinned.
  // 17 tiles ⚙. (art: every design owns its file — building-<k>.png; the 2026-08-02 art pass
  // retired the last interim stand-ins. Briefs: art/PROMPTS.md.)
  {k:'granary',   nm:'Granary',           ms:1, verb:'transform', tgt:'act',  ic:'coins',        n:1, act:'source', eff:'Gain 2 goods'},
  {k:'scriveners',nm:'Scrivener’s Hall',  ms:2, verb:'transform', tgt:'act',  ic:'scroll-text',  n:1, g:1, act:'recipe', eff:'Gain 1 recipe'},
  {k:'missionq',  nm:'Mission Quay',      ms:1, verb:'transform', tgt:'act',  ic:'church',       n:2, act:'age',    eff:'Age +2'},
  {k:'hiringpost',nm:'Hiring Post',       ms:2, verb:'transform', tgt:'act',  ic:'wrench',       n:1, g:1, act:'hire',   eff:'Gain 1 specialist'},
  {k:'almoner',   nm:'Almoner’s Stall',   ms:1, verb:'transform', tgt:'act',  ic:'heart',        n:1, act:'alms',  eff:'<span class="g">2'+LU('wheat','g')+'</span> → +1 presence'},   // v4.12: the ONE priced presence channel
  // v45d power ladder — fees print in GRAIN only (hops are spent USING buildings, never buying them)
  {k:'racking',   nm:'Racking Hall',      ms:3, verb:'transform', tgt:'act',  ic:'repeat',       n:1, g:3, act:'rack',   eff:'Swap 2 dice'},
  {k:'assay',     nm:'Assay House',       ms:1, verb:'transform', tgt:'act',  ic:'scale',        n:1, g:1, act:'assay',  eff:'<span class="h">1'+LU('sprout','h')+'</span> → 1 cask Ready'},   // v4.12 (was ±1)
  {k:'abbey',     nm:'Abbey Cellar',      ms:3, verb:'transform', tgt:'act',  ic:'hourglass',    n:1, g:2, act:'abbey',  eff:'<span class="h">3'+LU('sprout','h')+'</span> → all aging Ready'},
  {k:'hopex',     nm:'Hop Exchange',      ms:2, verb:'transform', tgt:'act',  ic:'sprout',       n:1, g:2, act:'hopex',  eff:'<span class="h">1'+LU('sprout','h')+'</span> → '+LU('die-plus1','dlift')+' · max 2'},
  {k:'maltkiln',  nm:'Malt Kiln',         ms:2, verb:'transform', tgt:'cask', ic:'flame',        n:2, g:2, effIc:'die-plus1',  eff:'on load'},
  {k:'tollhouse', nm:'Tollhouse',         ms:3, verb:'transform', tgt:'cask', ic:'ticket',       n:1, g:1, effIc:'die-minus1', eff:'on load → +3★'},
  {k:'bonded',    nm:'Bonded Store',      ms:3, verb:'transform', tgt:'cask', ic:'warehouse',    n:1, g:2, effIc:'die-plus1',  eff:'on load · sails with the Ship · players aboard gain 2 goods'},
  {k:'cooperage', nm:'Cooperage',         ms:3, verb:'transform', tgt:'ship', ic:'package',      n:1, g:2, eff:'+1 ship capacity · on load +1★'},   // v4.12b: the wharfage eases 2→1 ⚙
  {k:'customs',   nm:'Customs House',     ms:3, verb:'transform', tgt:'ship', ic:'scroll-text',  n:1, g:2, eff:'−1 quality required'},
  {k:'richberth', nm:'Rich Berth',        ms:3, verb:'transform', tgt:'ship', ic:'anchor',       n:1, g:2, eff:'May sail 1 short'},
  // v4.6 "Guildbook" — the box prints 20 tiles; SETUP DEALS 17 (≥1 Kiln + ≥1 Mission Quay guaranteed)
  {k:'victual',   nm:'Victualling Yard',  ms:3, verb:'transform', tgt:'cask', ic:'boxes',        n:1, g:2, eff:'Loading: the bonus fires TWICE · sails with the Ship'},
  {k:'exchange',  nm:'Merchants’ Exchange',ms:2, verb:'transform',tgt:'act',  ic:'arrow-right-left', n:1, g:2, act:'exchange', eff:'Replace up to 3 open Orders'},   // v4.12
  {k:'capstan',   nm:'Warping Capstan',   ms:3, verb:'transform', tgt:'act',  ic:'ship-wheel',   n:1, g:2, act:'capstan', eff:'Move any docked Ship'},   // v4.12: cargo rides; full where it lands → it sails
];
// ---- LADINGS (v4.5b) — the kontor ORDER row: 15 tiles ⚙, a face-up row of 3. Deliver a cask
// that matches the tile (its kontor + the die minimum, or the named beer) and CLAIM it — the
// printed ★ bank at once; one lading per delivered cask; the row refills at end of turn.
// v4.7 SETUP: a lading naming a beer NOT dealt this game returns to the box (no dead orders).
const LADINGS=[
  {dest:'Bruges',  min:3, pts:2},{dest:'Bruges',  min:4, pts:3},{dest:'Bruges',  beer:'Keut',    pts:3},{dest:'Bruges', min:5, pts:4},
  {dest:'London',  min:4, pts:3},{dest:'London',  min:5, pts:4},{dest:'London',  beer:'Broyhan', pts:3},{dest:'London', min:6, pts:5},
  {dest:'Bergen',  min:4, pts:3},{dest:'Bergen',  min:5, pts:4},{dest:'Bergen',  beer:'Mumme',   pts:4},
  {dest:'Novgorod',min:5, pts:3},{dest:'Novgorod',beer:'Bock',  pts:4},{dest:'Novgorod',min:6, pts:4},
  {dest:null,      min:6, pts:3},
];
// v4.15 "Guildhall" ⚙ — the EASED 20-tile Order schedule (hall mode REPLACES the base 15):
// rewards 1–3★ and routine conditions, because in hall mode every claim also pays an INVITATION
// (the Guildhall lane's gate must fire repeatedly). Mirrors play.html LADINGS_HALL.
const LADINGS_HALL=[
  {dest:'Bruges',min:2,pts:1},{dest:'Bruges',min:3,pts:2},{dest:'Bruges',beer:'Keut',pts:2},{dest:'Bruges',min:4,pts:2},{dest:'Bruges',min:5,pts:3},
  {dest:'London',min:2,pts:1},{dest:'London',min:3,pts:2},{dest:'London',beer:'Broyhan',pts:2},{dest:'London',min:5,pts:3},
  {dest:'Bergen',min:2,pts:1},{dest:'Bergen',min:3,pts:2},{dest:'Bergen',beer:'Mumme',pts:3},{dest:'Bergen',min:4,pts:2},
  {dest:'Novgorod',min:4,pts:2},{dest:'Novgorod',min:5,pts:3},{dest:'Novgorod',beer:'Bock',pts:3},{dest:'Novgorod',min:6,pts:3},
  {dest:null,min:2,pts:1},{dest:null,min:4,pts:2},{dest:null,min:6,pts:3},
];
// the INVITATION tile (v4.15) — a 2×0.9in gold strip: spend it with a Ready cask to enshrine.
function invitationTile(){return '<div class="ldtile" style="--c:#8a6408">'
  +'<div class="ld-hd">⚜<span class="ld-k">Invitation</span></div>'
  +'<div class="ld-bd"><span class="ld-beer">'+LU(QI)+' Ready</span><span class="ld-arr">+</span><span class="ld-die">'+LU('dices')+' ≥ shelf</span><span class="ld-arr">→</span><span class="ld-pts">the Hall</span></div>'
  +'<div class="ld-sub">spend to enshrine · earned per Order claim &amp; first showing per shelf</div>'
  +'</div>';}

// ---- PRIVATE BREWERY IMPROVEMENTS (v1.0): the few inherently-private upgrades, BOUGHT for goods at the
// CELLAR (distinct from the earned-and-placed public Buildings). Mirrors play.html IMPROVEMENTS.
// v82 "Scarce Improvements": these now form a SHUFFLED DECK of (n−1) copies of each type (n=players) feeding a
// face-up DISPLAY of 4 at the Cellar (refills from the deck). 3 copies/type covers a 4-player deck (n−1=3).
// ============================================================================
// SPECIALIST TILE ART — IMAGE-GENERATION SPEC (for the art agent; v2.6.1)
// ============================================================================
// Generate ONE image per Specialist, saved as art/improve-<slug>.jpg (JPEG, not PNG — a flat-field
// object shot with no transparency needs no alpha channel, and compresses ~8x smaller at quality
// ~88 with no visible loss; every other art/ family stays .png) where <slug> = the kit's own
// slug(d.nm) (lowercased, non-alphanumeric runs → a single hyphen — e.g. Coppersmith →
// improve-coppersmith.jpg, Grain Factor → improve-grain-factor.jpg; NOTE the hyphen — a prior
// version of this comment said "grainfactor"/"hopgardener" with no hyphen, which does not match
// what slug() actually emits at runtime; always derive the filename from slug(), not by hand).
// STYLE (all seven, identical treatment):
//   • a plain warm BEIGE field (parchment #e9dcc0-ish), edge-to-edge — NO scene, NO border
//   • ONE object centered — the specialist's trade tool (the art: brief on each row below);
//     medieval-woodcut / muted-gouache feel, readable at 1 inch print size
//   • no text, no people, no player-colour hues (the purple foot bar is added by the kit)
// The card is now SQUARE (2in×2in, matching the Building card): this art sits full-bleed behind a
// scrim; name on top, effect+cost in the purple foot — so keep the object in the middle 60% of the frame.
// The briefs (also carried per-row as art:'…'):
//   coppersmith    → a gleaming copper brew kettle                     (legacy file)
//   cellarman      → an oak cask racked on a wooden stillage
//   grain-factor   → a tied burlap sack overflowing with barley
//   hop-gardener   → a climbing hop bine with cones on a tall pole
//   stevedore      → a medieval wooden treadwheel harbor crane
//   braumeister    → a long wooden mash paddle over a copper kettle (v4.5b)
//   lagerkeeper    → stacked casks dusted with frost and icicles        (legacy file)
//   quaymaster     → a private wooden jetty with a rope-wound mooring bollard (legacy file)
// The guild eight (v4.6 — all landed 2026-08-02):
//   guild-scholar  → a bundle of sealed recipe scrolls (red wax seals)
//   innkeeper      → a foaming glazed stoneware ale jug with a pewter lid
//   supercargo     → a sealed ship's manifest across a rope-bound sea chest
//   chronicler     → an open chronicle with a goose-quill pen (blank pages)
//   alderman       → a gilded chain of office on a crimson velvet cushion
//   town-crier     → a polished brass handbell, dark-wood handle
//   chandler       → a hand balance — barley on one pan, hop cones on the other
//   shipwright     → a shipwright's adze across a curved oak ship rib
// ============================================================================
const IMPROVE=[   // SPECIALISTS = PURPLE · v4.0: EARNED free (Bergen's prize — v4.7: EVERY CASK seats its house one, the per-cask grammar of all four ports · the Hiring Post · the 'Gain 1 specialist' load bonus) — never bought · deck of max(2,n−1)/type (v4.5b) · 2 SEATS per house (both open from the start — v45h)
  {ic:'wrench',     nm:'Cellarman', art:'an oak cask racked on a wooden stillage',   act:'Your dice start +1', g:0, h:2, c:'#5b3a8e', n:3},   // v4.12: the v45g cap repealed — his Broyhan starts READY
  {ic:'badge-plus', nm:'Grain Factor', art:'a tied burlap sack overflowing with barley',  act:'Gain '+LU('wheat','g ic')+' → <span class="g">+1'+LU('wheat','g ic')+'</span>', g:2, c:'#5b3a8e', n:3},   // v4.7: 1G→2G (the probe's auto-pick core)
  {ic:'badge-plus', nm:'Hop Gardener', art:'a climbing hop bine with cones on a tall pole',     act:'Gain '+LU('sprout','h ic')+' → <span class="h">+1'+LU('sprout','h ic')+'</span>', g:0, h:2, c:'#5b3a8e', n:3},
  {ic:'package-plus',nm:'Stevedore', art:'a medieval wooden treadwheel harbor crane',  act:'Each time you load: up to 2 casks', g:1, c:'#5b3a8e', n:3},
  {ic:'wrench',     nm:'Braumeister', art:'a long wooden mash paddle over a copper kettle', act:'Start of your turn: age 1 cask +1', g:1, h:1, c:'#5b3a8e', n:3},   // v4.5b heir of the cut auto-age · v4.12 wording
  // ---- v4.6 "Guildbook": the 8 GUILD designs — 1 copy each (scarce); three print SEAT GATES
  // (the Agricola prerequisite, read off components: flipped cards · claimed tiles · parked dice).
  // art: all eight own their object-shot files (the 2026-08-02 art pass; briefs in art/PROMPTS.md).
  {ic:'graduation-cap', nm:'Guild Scholar', art:'a bundle of sealed recipe scrolls', act:'When gaining recipes, pay no fee', g:2, c:'#5b3a8e', n:1},   // v4.12 wording (every channel, Bruges included)
  {ic:'bed',        nm:'Innkeeper', art:'a foaming glazed stoneware ale jug', act:'Brewing 3+ casks at once: age one +1 at your turn start', g:2, c:'#5b3a8e', n:1},   // v4.12 rework: the 4th-vessel rig and the gate are CUT — a full house earns the drip
  {ic:'luggage',    nm:'Supercargo', art:'a sealed manifest over a rope-bound chest', act:'A rival sails your cask: <span class="g">+1'+LU('wheat','g ic')+'</span><span class="h">+1'+LU('sprout','h ic')+'</span>', h:2, c:'#5b3a8e', n:1},   // v4.7: 1H→2H · v4.12 wording pass
  {ic:'book-open',  nm:'Chronicler', art:'an open chronicle with a quill', act:'End: +3★ per claimed Order', g:1, h:1, c:'#5b3a8e', n:1},   // v4.12: uncapped, ungated, 3★ ⚙
  {ic:'gavel',      nm:'Alderman', art:'a chain of office on a velvet cushion', act:'End: +2★ per kontor with 3+ parked dice', g:2, c:'#5b3a8e', n:1},
  {ic:'megaphone',  nm:'Town Crier', art:'a brass handbell', act:'Place a presence die: +2★', g:1, c:'#5b3a8e', n:1},   // v4.12: +2★ ⚙ per placed die (the die parks at 1 — 3★ total; face-2 retires)
  {ic:'arrow-right-left', nm:'Chandler', art:'a hand balance — grain on one pan, hop cones on the other', act:'Once per turn: swap <span class="g">1'+LU('wheat','g ic')+'</span> ↔ <span class="h">1'+LU('sprout','h ic')+'</span>', g:1, c:'#5b3a8e', n:1},
  {ic:'hammer',     nm:'Shipwright', art:'a shipwright’s adze on a curved hull rib', act:'When commissioning Ships, pay no fee', h:1, c:'#5b3a8e', n:1},   // v4.12 wording (the Scholar's grammar)
];
const GOODS=[{ic:'wheat',nm:'Grain',c:'#9c7414',n:60},{ic:'sprout',nm:'Hops',c:'#5d7d34',n:40}];
// v0.16 — the scarce CHARTER CONTRACT (a CARD): start 2/house, buy more at the Market (1 G), spend 1 + a
// flat 2 G fare to charter a single cask. ~20 supply covers starts + the Market buy pile. Art = contractCard().
const CONTRACTS={nm:'Merchant’s Order', n:20};
// v3.2d — recipe cards are DOUBLE-SIDED: the cost face / the BREWED face (a big check, bottom-right).
// Flip a card the first time you brew that beer — your flipped recipe cards ARE the Flight: the unlock
// currency AND the scoring record (the ladder counts distinct beers BREWED). The board strip is gone.
const STARTERS=[   // the starting recipes are CARDS since v3.2d — one each per player, dealt at setup (flip Gruit at setup: the warm start is brewed)
  {nm:'Gruit', cc:'#8a949c', L:1, g:1,h:0, start:1},
  {nm:'Hopped',cc:'#c2922f', L:2, g:1,h:1, start:1}];
const RECIPES=[  // EXPORT recipe cards — print in the same double-sided run as the STARTERS above.
  // buy = the WHARF FEE — the FORMULA H = Q−3 (v4.9c; was Q−2 at v45e), hops only, paid at EVERY channel (Bruges included; Q3 and below = free)
  // · g/h = the BREW cost on the tucked edge.
  {nm:'Broyhan', cc:'#946d09', L:3, g:1,h:2, buy:{},     reach:'Q3 · all kontore (the Hall via Dispatch) · FAST: ready 1'},
  {nm:'Keut',    cc:'#9c7209', L:3, g:2,h:1, buy:{},     reach:'Q3 · all kontore (+ the Hall) · +1 presence on a kontor delivery'},
  {nm:'Mumme',   cc:'#9a5526', L:4, g:1,h:3, buy:{h:1},     reach:'Q4 · all kontore (the Hall via Dispatch)'},
  {nm:'Bock',    cc:'#7c2128', L:5, g:2,h:3, buy:{h:2}, reach:'Q5 · all kontore · the premium climb (fee H = Q−3 — v4.9c)'},
  // EXPANSION "Specialty Beers" (v4.14 "Beer Atlas", opt-in) — the 3 specialty export recipe cards
  // (fees ride the ruled formula H = Q−3: the Q3-and-below are chip-less/FREE; Jopenbier pays 3H)
  {nm:'Gose',     cc:'#6e8b74', L:2, g:2,h:0, exp:1, buy:{}, reach:'Q2 · grain-path (no hops) · its every cask: GAIN 3 GOODS on load — the better Gruit when you have the grain (v4.15b)'},
  {nm:'Zerbster', cc:'#5f7a3c', L:3, g:0,h:3, exp:1, buy:{}, reach:'Q3 · its every cask: a FREE GRUIT (a tray die) + LOAD 1 MORE as it boards — the parti-gyle (v4.15b)'},
  {nm:'Duckstein',cc:'#7a5236', L:2, g:1,h:1, exp:1, buy:{}, reach:'Q2 · SMOKE-HARDY: its die +1 as it boards (cap 6) — a Q2 that makes the Novgorod band'},
  {nm:'Jopenbier',cc:'#5e2433', L:6, g:2,h:4, exp:1, buy:{h:3}, reach:'Q6 CAPSTONE (own toggle) · always acquirable, never drafted · start 2, four steps · 6★ anywhere, 8★ Novgorod · the Flight’s 6th type (6→25)'},
];

//==================================================================
// ART — piece face generators (the scrutinized tile/card/board art)
//==================================================================
// BUILDING tile (v1.0 keystone) — an OWNED slot modifier: icon + name + verb badge (VALUE/TRANSFORM) +
// the effect + a target glyph (what it modifies: cask/ship/line/owner) + the goods cost. Value = violet, Transform = green.
// BUILDING CARD (printables2 v5) — buildings migrate from flat tiles to 2″ double-sided ART CARDS (same grammar
// as the cask/ship cards). FRONT = full-bleed building art (art/building-<key>.png) behind a scrim, with the name
// + verb badge (Value/Transform) up top and the effect + target glyph + goods cost in a colour foot. The card
// nests in the 2.5″ player-colour owner FRAME, so the coloured edge around it marks ownership.
const PRIV_FOOT='rgba(31,86,122,.74)';const WORK_FOOT='rgba(50,79,42,.74)';   // v2.4.1: PRIVILEGE = bright blue (owner-only) · BUILDING = green (serves everyone) — SPECIALIST = purple below
const BLD_FOOT='rgba(58,51,66,.7)';   // legacy fallback   // building card foot/base — dark purple-grey (#3a3342) at 70% opacity so the illustration bleeds ~30% through the foot. Same on front & back.
// v3.4a at 66% height — the SAME anatomy the 2in card earned (icon+name header · art window ·
// the colour foot: the effect big, then the target chip + cost row), compressed, never flattened.
const STD_ACT={source:{ai:'coins',t:'Gain 2 goods'},age:{ai:'age-2',t:'Age +2'},reach:{ai:'map-pin',t:'+1 presence'},alms:{ai:'map-pin',t:'2G → +1 presence'},recipe:{ai:'scroll-text',t:'Gain 1 recipe'},hire:{ai:'wrench',t:'Gain 1 specialist'}};   // v4.12: 'alms' = the Almoner's priced presence
function buildingCard(d){const foot=(d.verb==='value'?PRIV_FOOT:WORK_FOOT);
  // v4.9b "Cornerstones": the tile prints the mason's mark's START FACE — set your die to it at build
  const msChip=d.ms?'<span class="bt-ms" title="the mason\u2019s mark starts here \u2014 set your die to this face at build; every use turns it up (pips score at game end)">'+LU('dice-'+d.ms)+'</span>':'';
  // a STANDARD verb prints the same icon chip the casks print — one action grammar across the kit;
  // only the non-standard powers carry text (terse: the rulebook holds the full language)
  const sa=d.act&&STD_ACT[d.act];
  // round 5: ANY leading icon (a standard verb's chip OR a die-mark via effIc) rides the same
  // .ac slot at ONE size; the text bottom-aligns beside it and wraps upward when long
  const lead=sa?LU(sa.ai):(d.effIc?LU(d.effIc):null);
  const eff=lead?'<span class="ac">'+lead+'</span><span class="bt-etext">'+(sa?sa.t:d.eff)+'</span>':d.eff;
  return '<div class="btile btW" style="--c:'+foot+'">'
  +artLayer(d.art||('building-'+d.k+'.png'))
  +'<div class="bt-top"><span class="bt-ic">'+LUX(d.ic)+'</span><span class="bt-nm'+(d.nm.length>18?' xlong':d.nm.length>15?' long':'')+'">'+d.nm+'</span>'
    +msChip+((d.g||d.h)?'<span class="bt-cost">'+cost(d.g,d.h)+'</span>':'')+'</div>'   // the fee rides the TOP-RIGHT corner (round 6); the mark's start face sits beside it (v4.9b)
  +'<div class="bt-foot"><span class="bt-eff'+(lead?' bt-act':'')+'">'+eff+'</span></div>'
  +'</div>';}
// LADING TILE (v4.5b) — a 2×0.9in order strip in the kontor's colour: WHERE (the kontor) ·
// WHAT (the die minimum, or the named beer) · the ★ reward. Any-kontor rides parchment-grey.
function ladingTile(d){const kc=d.dest?(SHIP_DEST[d.dest]||{}).kc||'#555':'#6b6257';
  const what=d.beer?('<span class="ld-beer">'+LU(QI)+' '+d.beer+'</span>')
                   :('<span class="ld-die">'+LU('dice-'+d.min)+' '+d.min+(d.min<6?'+':'')+'</span>');
  return '<div class="ldtile" style="--c:'+kc+'">'
  +'<div class="ld-hd">'+LU(d.dest?'kontor-'+d.dest.toLowerCase():'landmark')+'<span class="ld-k">'+(d.dest||'Any Kontor')+'</span></div>'
  +'<div class="ld-bd">'+what+'<span class="ld-arr">→</span><span class="ld-pts">'+d.pts+' '+LU(VP)+'</span></div>'
  +'<div class="ld-sub">deliver &amp; claim · score at once</div>'
  +'</div>';}
// BUILDING CARD BACK — the flipped/displaced face: when your tile is overbuilt (the builder pays the 1G
// ground rent) it returns to you FACE-DOWN into an OPEN Floor slot of your one row (none open → boxed) —
// a Floor WILD stop, pure engine: flips score NOTHING. Same art + title (muted) so it's identifiable.
function buildingBack(d){   // the FLOOR side: it only says WILD
  return '<div class="btile btF" style="--c:'+BLD_FOOT+'">'
  +artLayer(d.art||('building-'+d.k+'.png'))
  +'<div class="bt-wild"><span class="bt-circ">'+LU('sparkles')+'</span><b>WILD</b></div>'
  +'<div class="bt-sub">a Floor slot &middot; none open &rarr; discard</div>'
  +'</div>';}
// SPECIALIST CARD (v10) — now a SQUARE 2in×2in card, matching the Building card's footprint (was a half-height
// 2in×1in strip). Full-bleed OBJECT art (improve-<slug>.jpg — a single trade-tool icon on a plain beige field,
// no scene) + scrim, name/icon on top, and a PURPLE foot bar carrying the effect + cost. Same art-card grammar
// as the casks/ships/buildings. Card bg = the same purple as the foot, so any html2canvas foot-edge hairline
// is purple-on-purple.
const IMP_FOOT='#4a3a6e';   // Specialist foot/base — PURPLE (the third tile type, v2.4.1; was Cellar-green)
function improveTile(d){const k=d.slug||slug(d.nm);   // v4.6: slug override — three guild tiles ride spare art as stand-ins
  return '<div class="icard" style="--c:'+IMP_FOOT+'">'
  +artLayer('improve-'+k+'.jpg')   // .jpg not .png — a flat-colour-field object shot compresses ~8x smaller as JPEG at no visible quality loss
  +'<div class="ic-top"><span class="ic-ic">'+LUX(d.ic)+'</span><span class="ic-nm">'+d.nm+'</span></div>'
  +'<div class="ic-foot"><span class="ic-act">'+d.act+'</span><span class="ic-cost">'+cost(d.g,d.h)+'</span></div>'
  +'</div>';}
// printables2 v3: a CASK is a double-sided CARD (2×3). FRONT = the buy/age side: Q+name on the top end, brew
// cost under it, the AGING TRACK in the centre (the card carries its own step count — so the player-board
// maturation track + cellar markers come off the board), and Q+action on the bottom end. BACK = the brewed
// side: Q+name + a die/presence space on the top end, the action just above the bottom end, Q on the bottom.
// (act = the drawn slot-action {ai,act}; Gruit passes its pinned Source — the printed mix IS the brew-draw.)
// ---- background ART slot (printables2) ----
// Flip ART_ON to true once the images exist in art/ (named below). Until then a faint hatch marks the slot.
// Filenames: casks → art/cask-<beer>.png (gruit/hopped/broyhan/keut/mumme/bock/gose/zerbster/duckstein/jopenbier);
//            ships → art/ship-<hull>.png (cog/hulk). Prompts to generate them: art/PROMPTS.md.
const ART_ON=true, ART_DIR='art/';
// art rides an <img> (object-fit:cover) rather than a CSS background — html2canvas rasterizes an <img> at its
// NATIVE source resolution (sharp PNG export), whereas a background-image is upscaled from the element's CSS size.
function artLayer(file){return ART_ON
  ? '<div class="artbg scrim"><img class="artbg-img" src="'+ART_DIR+file+'" alt=""></div>'
  : '<div class="artbg ph" data-art="'+ART_DIR+file+'"></div>';}
// v3.4a: the CASK is a 2.5×1in TILE. It seats on vessels (aging side up), wharf slots and SHIP
// BERTHS (wharf side up) — the tile itself travels; the berth cube proxy retires. The WHARF side
// prints the DIE SEAT the tally die parks on.
function caskCardFront(d,act){   // the AGING side: Q·name (+special) · the maturation track · brew cost + the action preview
  let c=cost(d.g,d.h);if(d.alt)c+='<span style="opacity:.85">/</span>'+cost(d.alt[0],d.alt[1]);
  let track='<div class="ct-step start">'+LU('flask-conical')+'</div>';
  for(let i=1;i<d.ready;i++)track+='<div class="ct-step">'+i+'</div>';
  track+='<div class="ct-step rdy">'+LU('undo-2')+'</div>';   // Ready → flip the tile to its wharf side
  return '<div class="ctile ctA" style="--c:'+d.c+'">'
    +'<div class="ct-art"><img src="'+ART_DIR+'cask-'+d.nm.toLowerCase()+'.png" alt=""></div>'
    +'<div class="ct-hd"><span class="ct-q">'+LU('quality-'+d.q)+'</span><span class="ct-nm">'+d.nm+'</span>'
      +'<span class="ct-cost">'+c+'</span></div>'
    +(d.tag?'<span class="ct-perk">'+d.tag.split('<br>').join(' ')+'</span>':'')
    +'<div class="ct-bot">'+track+'</div>'
    +'<div class="ct-act2" title="the load bonus — fires as the cask boards a Ship"><span class="ac">'+LU(act.ai)+'</span><span class="t">'+act.act+'</span></div>'
  +'</div>';}
function caskCardBack(d,act){const start=Math.max(1,d.q-(d.ready||0));
  // the WHARF side (round 7, designer-ruled — and COMPONENTS §4 as written): the START die FACE
  // prints IN the seat (set your die to it at brew), the numbered quality mark rides beside the
  // name (READY), and the load bonus sits at the FOOT. The start/ready text line is cut.
  return '<div class="ctile ctB" style="--c:'+d.c+'">'
    +'<div class="ct-art"><img src="'+ART_DIR+'cask-'+d.nm.toLowerCase()+'.png" alt=""></div>'
    +'<div class="ct-seat" data-die-seat title="set your quality die to THIS face at brew — aging turns it up to '+d.q+' (READY); at delivery it parks at the Kontor">'+LU('dice-'+start)+'</div>'
    +'<div class="ct-main"><div class="ct-hd2"><span class="ct-q2" title="READY at quality '+d.q+'">'+LU('quality-'+d.q)+'</span><span class="ct-nm2">'+d.nm+'</span></div>'
      +'<span class="ct-act2"><span class="ac">'+LU(act.ai)+'</span><span class="t">'+act.act+'</span></span></div>'
  +'</div>';}
// printables2 v4: a SHIP is a full-bleed 2.5″ CARD (was a small tile) — the destination's CITY is the
// background art (wharf-<dest>.png), with the cask-card treatment: hull + commission cost over the art on
// the top end, the quality gate + numbered load-order berths floating low over the wharf, and a gradient
// FOOT in the destination's colour carrying the kontor name (the ship's identity). NO action — a ship is
// just hull size · destination · quality gate · cost.
// v3.4a: the SHIP is a vertical CARRIER tile — a 1.33in details head (the identity: hull · commission ·
// kontor · gate) + cap × FULL-WIDTH 1in BERTHS. Loading seats the cask TILE itself on a berth (wharf
// side up, its die riding its printed seat) — the berth cube proxy retires. Hulk = one berth taller.
const SHIP_H=hull=>3;   // v4.9b UI pass [designer-ruled]: EVERY hull prints the SAME 2.5×3in tile (the Hulk footprint) — berth count unchanged (1in per berth from the top; the TOP berth is the TRIGGER: it prints the hull's identity, and covering it with the last cask IS the sail); the space below the berths simply shows the port art
function shipCard(hull,destNm){const cap=HULL[hull].cap;const d=SHIP_DEST[destNm];
  // v3.4b.2 — the hull speaks the cask tiles' language: full-height port art TINTED with the
  // kontor colour (port identity at a glance, across the table); every berth is a full-width
  // DASHED SEAT (the same "a component parks on this footprint" grammar as the die seat), its
  // number a small corner tag; the TOP berth is the trigger — its seat is marked with the sail
  // (cover it = the ship goes; no sentence needed) — and chevrons rise toward it.
  const fee=HULL[hull].fee;   // v4.8: the per-hull commission fee prints on the trigger berth; a free Hulk prints no chip
  let rows='<div class="st-trig">'
    +'<div class="st-toprow"><span class="st-k">'+LU('sailboat')+destNm+'</span>'
      +'<span class="st-meta"><span class="st-gate" title="boards when the cask&#39;s DIE (as boarded) shows this or more">'+LU('dices')+d.req+'+</span>'+(fee?'<span class="st-cost">'+cost(fee,0)+'</span>':'')+'</span></div>'
    +'<div class="st-seat st-tseat" title="the trigger berth — the last cask loads here and the ship sails at once"><span class="st-num">'+cap+'</span><span class="st-go">'+LU(QI)+'<b class="amp">&amp;</b>'+LU('sail')+'</span></div>'
  +'</div>';
  for(let i=cap-1;i>=1;i--)rows+='<div class="st-berth"><div class="st-seat"><span class="st-num">'+i+'</span><span class="st-ghost">'+LU(QI)+'</span></div></div>';
  rows+='<div class="st-hold"></div>';   // v4.9b: the uniform tile's remaining depth — no seat, just the port art (a Skute shows 2in of hold, a Cog 1in, a Hulk none)
  return '<div class="stile" style="--c:'+d.kc+';height:'+SHIP_H(hull)+'in">'
    +artLayer('wharf-'+destNm.toLowerCase()+'.png')+'<div class="st-wash"></div>'
    +rows
  +'</div>';}
// the SHIP card rear — one shared graphic for every ship (a Hanseatic cog at sea); ships are single-faced/neutral
// img-based art (not a CSS background) so the PNG export bakes it sharp — a CSS background gets upscaled from the
// element's CSS size by html2canvas (blurry). No scrim: the ship-at-sea graphic carries no text overlay.
function shipBack(hull){return '<div class="stile ship-back" style="background:#33445a;height:'+SHIP_H(hull||'cog')+'in">'
  +'<div class="artbg"><img class="artbg-img" src="'+ART_DIR+'ship-back.png" alt=""></div></div>';}
function tok(d){const art={wheat:'grain',sprout:'hops'}[d.ic];   // the big .7in goods tokens KEEP the art (round 4b: wheat/sprout left the map for small-size legibility)
  return '<div class="tok" style="--c:'+d.c+'">'+(art?'<img class="ai" src="art/icons/'+art+'.png" alt="">':LU(d.ic))+'</div>';}
function disc(c,ic){return '<div class="disc" style="--c:'+c+'">'+LU(ic||'circle')+'</div>';}
// (v3.4c: the owner FRAME is retired — a little player-colour HOUSE token, set on the building
// card, marks ownership; no token = neutral. Store-bought monopoly-style houses, nothing to cut.)
// UNLOCK COVER (ONE ROW) — a player-colour blank on Floor slots 3–7; each new distinct beer
// BREWED (from the 2nd) or the Coppersmith removes the next one.
function coverTile(c,w){return '<div class="cover" style="--c:'+c+';width:'+w+'in;height:'+w+'in">'+LU('lock')+'<span>locked —<br>a NEW distinct brew<br>(or the Coppersmith)<br>opens this slot</span></div>';}
function wtok(d){return '<div class="wtok" style="--c:'+d.c+'">'+LU(d.ic)+(d.nm?'<span>'+d.nm+'</span>':'')+'</div>';}


// ---- PLAYER BOARD (v4.9d — the designer's sketch): the physical 7.65×3.85in board, ONE
// generator for the print sheet AND the live app. Zones: crest+name · the ★ SCORE seat ·
// the SUPPLY ledge (dice/grain/hops tally seats) · VESSEL 1-3 wells (2.4×1in — the cask
// tile sits IN the well at true size) · SPECIALIST seats 1-2 (2×2in) · the printed FLIGHT
// ladder (beers SHIPPED: 1..5 → 0/0/4/9/16★) · the CONTRACTS pile zone. `live` (app only):
// {score,dice,grain,hops,v:[html×3],seats:[html×2],flight,contracts,vknote}.
function playerBoard(d,live){const L=live||{};
  const seatBox=(v)=>v!=null?'<b class="pbrd-num">'+v+'</b>':'<span class="pbrd-box"></span>';   // live: a bare number · print: the empty well stays
  const vsl=(i)=>'<div class="pbrd-slot pbrd-vsl">'
    +'<span class="sn">Vessel '+i+'</span>'
    +((L.v&&L.v[i-1])||'<span class="si">'+LU('beer')+LU('dices')+'</span>')+'</div>';
  const ssl=(i)=>'<div class="pbrd-slot pbrd-seat">'
    +'<span class="sn">Specialist seat '+i+'</span>'
    +((L.seats&&L.seats[i-1])||'<span class="si">'+LU('wrench')+'</span>')+'</div>';
  const FL=[1,2,3,4,5],FP={1:0,2:0,3:4,4:9,5:16};
  const flight='<div class="pbrd-flight"><div class="fl-t">'+LU('layers')+' The Flight — beers <b>shipped</b></div>'
    +'<div class="fl-row">'+FL.map(n=>'<span class="fl-cell'+(L.flight!=null&&L.flight>=n?' on':'')+'"><b>'+n+'</b><span>'+FP[n]+'★</span></span>').join('')+'</div></div>';
  const contracts='<div class="pbrd-lads"><span class="sn">Orders — claimed ★</span>'
    +(L.contracts||'<span class="si">'+LU('scroll-text')+'</span>')+'</div>';
  return '<div class="pbrd" style="--pc:'+(d.c||'#7c2128')+'">'
    +'<div class="pbrd-id">'
      +'<span class="pbrd-crest">'+LU('beer')+'</span>'
      +'<span class="pbrd-name">'+d.nm+'</span>'
      +'<span class="pbrd-score" title="the house\u2019s score">'+LU('star')+seatBox(L.score)+'</span>'
      +'<span class="pbrd-supply"><span class="pbrd-sup" title="quality dice \u2014 tray/pool">'+LU('dices')+seatBox(L.dice)+'</span>'
        +'<span class="pbrd-sup pbg" title="grain">'+LU('wheat')+seatBox(L.grain)+'</span>'
        +'<span class="pbrd-sup pbh" title="hops">'+LU('sprout')+seatBox(L.hops)+'</span>'
        +'<span class="pbrd-note">start Gruit+Hopped \u00b7 13 dice \u00b7 goods max 8</span></span>'
    +'</div>'
    +'<div class="pbrd-row">'+vsl(1)+vsl(2)+vsl(3)+'</div>'
    +'<div class="pbrd-row">'+ssl(1)+ssl(2)
      +'<div class="pbrd-right">'+flight+contracts+'</div>'
    +'</div>'
  +'</div>';}

function recipeCard(r,brewed){return '<div class="card" style="--cc:'+r.cc+'">'
  +artLayer('cask-'+r.nm.toLowerCase()+'.png')
  +(brewed?'<div class="c-brewed">'+LU('check')+'</div>':'')
  +'<div class="c-costpanel">'+(r.start
    ? '<span class="clab">starting recipe</span>'
    : '<span class="clab">wharf fee</span><span class="cbig">'+(((r.buy||{}).g||(r.buy||{}).h)?cost(r.buy.g,r.buy.h):'free')+'</span>')+'</div>'
  +'<div class="c-strip">'
    +'<div class="c-row"><span class="c-rung">'+LU('quality-'+r.L)+'</span><span class="c-nm">'+r.nm+'</span></div>'
    +'<div class="c-row"><span class="c-lbl">brew</span><span class="c-cost">'+cost(r.g,r.h)+'</span></div>'
  +'</div>'
  +'</div>';}

// charter-contract CARD (v0.16) — icon-first: the effect (a cask → a kontor) + the fare; the card IS the contract you spend
function contractCard(){return '<div class="card" style="--cc:#8a6408">'
  +'<div class="c-chart">'
    +'<span class="ci">'+LU('beer')+'</span><span class="ca">↓</span>'
    +'<span class="ci">'+LU('sailboat')+'</span><span class="ca">↓</span>'
    +'<span class="ci">'+LU('landmark')+'</span>'
    +'<span class="clab2">one cask · single voyage<br>→ a kontor</span></div>'
  +'<div class="c-strip">'
    +'<div class="c-row"><span class="c-rung">'+LU('ticket')+'</span><span class="c-nm">Charter</span></div>'
    +'<div class="c-row"><span class="c-lbl">spend + fare</span><span class="c-cost">'+cost(2,0)+'</span></div>'
  +'</div></div>';}
const slug=s=>String(s).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
// ---- the card CSS, injected once ----
var HC_CSS='/* Brewhouses of the Hanse — the shared CARD component styles (injected by components.js).\n\
   Verbatim from print.html (the vetted print kit); generic helpers are SCOPED to the\n\
   component roots so the library never restyles a host page\'s own UI (play.html). */\n\
.ccard,.bcard,.icard,.card,.tok,.disc,.frame,.cover,.wtok{--ink:#2b2018;--ink2:#5b4a37;--parch:#f3e9d2;--green:#4a6b3a;--gold:#b8860b;--red:#7c2128;--sea:#274b5c}\n\
.ccard .ic,.bcard .ic,.icard .ic,.card .ic,.tok .ic,.disc .ic,.frame .ic,.cover .ic,.wtok .ic{width:1em;height:1em;vertical-align:-.13em}\n\
.ccard .g,.bcard .g,.icard .g,.card .g{color:#ffe08a} .ccard .h,.bcard .h,.icard .h,.card .h{color:#c4e69c}\n\
.ccard .gc,.bcard .gc,.icard .gc,.card .gc{display:inline-flex;align-items:center;gap:.02in;font-size:.12in;font-weight:bold}\n\
.ccard .gc svg,.ccard .gc .ic,.bcard .gc svg,.bcard .gc .ic,.icard .gc svg,.icard .gc .ic,.card .gc svg,.card .gc .ic{width:.15in;height:.15in;flex:0 0 auto}\n\
  /* ====== SPECIALIST CARD (v10) — SQUARE, matching the 2in×2in building card: full-bleed object art + purple foot ====== */\n\
  .icard{width:2in;height:2in;background:var(--c,#46663a);color:#fff;position:relative;overflow:hidden;\n\
    display:flex;flex-direction:column;justify-content:space-between;text-shadow:0 1px 1.5px rgba(0,0,0,.55)}\n\
  .icard > *{position:relative;z-index:1}\n\
  .icard > .artbg{z-index:0}\n\
  .icard .ic-top{display:flex;align-items:center;gap:.06in;padding:.15in .17in 0}\n\
  .icard .ic-ic{flex:0 0 auto} .icard .ic-ic svg,.icard .ic-ic .ic{width:.2in;height:.2in;stroke-width:1.8;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.6))}\n\
  .icard .ic-nm{font-variant:small-caps;font-weight:bold;font-size:.16in;line-height:1.02;flex:1}\n\
  .icard .ic-foot{background:linear-gradient(to top,var(--c) 0%,var(--c) 52%,transparent 100%);\n\
    padding:.26in .17in .15in;display:flex;align-items:flex-end;gap:.06in}\n\
  .icard .ic-act{font-size:.115in;line-height:1.18;flex:1}\n\
  .icard .ic-act::first-letter{text-transform:uppercase}\n\
  .icard .ic-act .ic,.icard .ic-act svg{width:.13in;height:.13in;vertical-align:-.02in}\n\
  .icard .ic-act .g{color:#ffe08a} .icard .ic-act .h{color:#c4e69c}\n\
  .icard .ic-cost{margin-left:auto;font-weight:bold;font-size:.145in;display:inline-flex;align-items:center;flex:0 0 auto}\n\
  .icard .ic-cost .gc{gap:.02in} .icard .ic-cost .gc svg,.icard .ic-cost .gc .ic{width:.16in;height:.16in}\n\
  /* ====== printables2: BUILDING CARDS (2″, double-sided) — FRONT full-bleed building art + effect ·\n\
     BACK the generic Wild + developer ★ (displaced face). Nests in the 2.5″ player-colour owner FRAME\n\
     (the coloured edge showing around it = whose building it is). Same art-card grammar as the casks/ships. ====== */\n\
  .bcard{width:2in;height:2in;background:var(--c,#3a3342);color:#fff;position:relative;overflow:hidden;\n\
    display:flex;flex-direction:column;justify-content:space-between;text-shadow:0 1px 1.5px rgba(0,0,0,.55)}\n\
  .bcard > *{position:relative;z-index:1}\n\
  .bcard > .artbg{z-index:0}\n\
  .bcard .bc-top{display:flex;align-items:flex-start;gap:.05in;padding:.15in .17in 0}\n\
  /* (the PRIVILEGE/BUILDING verb badge is retired — the foot colour IS the type: blue pays its owner, green serves any dock) */\n\
  /* the card BACK\'s two faces of displacement: seat the Wild / +3★ & discard */\n\
  .bcard .bc-or{display:flex;align-items:center;justify-content:space-evenly;gap:.06in;width:100%}\n\
  .bcard .bc-opt{display:flex;flex-direction:column;align-items:center;gap:.015in;text-align:center}\n\
  .bcard .bc-big{display:inline-flex;align-items:center;gap:.04in;font-size:.24in;font-weight:900;line-height:1}\n\
  .bcard .bc-big svg,.bcard .bc-big .ic{width:.22in;height:.22in}\n\
  .bcard .bc-sub2{font-size:.095in;font-variant:small-caps;font-weight:normal;opacity:.92;line-height:1.2}\n\
  .bcard .bc-circ{display:inline-flex;align-items:center;justify-content:center;width:.3in;height:.3in;border-radius:50%;background:rgba(255,255,255,.92);flex:0 0 auto}\n\
  .bcard .bc-circ svg,.bcard .bc-circ .ic{width:.18in;height:.18in;color:#23201c;stroke-width:2.1}\n\
  .bcard .bc-opt.pts .bc-big svg,.bcard .bc-opt.pts .bc-big .ic{color:#e0b232}   /* the points star in the kit gold (dark-ground tint) */\n\
  .bcard .bc-slash{font-size:.3in;font-weight:300;opacity:.65}\n\
  .bcard .bc-ic{flex:0 0 auto} .bcard .bc-ic svg,.bcard .bc-ic .ic{width:.2in;height:.2in;stroke-width:1.8}\n\
  /* (v2.3: the WHARFAGE chip is retired — value = a privilege, owner-only; no delivery payments between players) */\n\
  .bcard .bc-wf{display:none;\n\
    background:rgba(0,0,0,.34);border-radius:.04in;padding:.022in .05in}\n\
  .bcard .bc-wf svg,.bcard .bc-wf .ic{width:.13in;height:.13in;stroke-width:2}\n\
  .bcard .bc-wf .st{color:#ffd24a}\n\
  .bcard .bc-nm{font-variant:small-caps;font-weight:bold;font-size:.15in;line-height:1.02;flex:1;margin-top:-.01in}\n\
  .bcard .bc-foot{background:linear-gradient(to top,var(--c) 0%,var(--c) 52%,transparent 100%);\n\
    padding:.26in .17in .15in;display:flex;flex-direction:column;gap:.055in}\n\
  .bcard .bc-eff{font-size:.155in;line-height:1.18;font-weight:600}\n\
  .bcard .bc-eff::first-letter{text-transform:uppercase}   /* sentence-case the effect (data stays lowercase) */\n\
  /* resource icons inside effect text — colour by type (gold grain / green hops), notation: +1 [icon] */\n\
  .bcard .bc-eff .ic,.bcard .bc-eff svg{width:.15in;height:.15in;vertical-align:-.025in}\n\
  .bcard .bc-eff .g{color:#ffe08a} .bcard .bc-eff .h{color:#c4e69c}\n\
  .bcard .bc-row{display:flex;align-items:center;gap:.05in}\n\
  .bcard .bc-tgt{display:inline-flex;align-items:center;justify-content:center;width:.26in;height:.26in;border-radius:50%;background:rgba(255,255,255,.92);flex:0 0 auto}\n\
  .bcard .bc-tgt svg,.bcard .bc-tgt .ic{width:.15in;height:.15in;color:#23201c;stroke-width:2}\n\
  .bcard .bc-row .gc{margin-left:auto;font-size:.14in} .bcard .bc-row .gc svg,.bcard .bc-row .gc .ic{width:.15in;height:.15in}\n\
  .bcard .bc-top svg,.bcard .bc-top .ic{filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.6))}\n\
  /* BUILDING CARD BACK (v6) — the SAME building art + title as the front (muted), plus the Wild action + the\n\
     developer ★. Reuses the front\'s bc-top/bc-foot layout so a flipped card still reads as its building. */\n\
  .bcard.bc-bk .artbg{filter:grayscale(.55) brightness(.78)}\n\
  .bcard .bc-wild{font-size:.1in;line-height:1.15;flex:1}\n\
  .bcard .bc-sub{font-variant:small-caps;font-size:.092in;opacity:.85;letter-spacing:.3px}\n\
  .bcard .bc-dev{margin-left:auto;font-weight:900;font-size:.2in;display:inline-flex;align-items:center;gap:.02in}\n\
  .bcard .bc-dev svg,.bcard .bc-dev .ic{width:.2in;height:.2in;color:#ffd24a}\n\
  /* ====== printables2: CASK CARDS (double-sided, 2×3) — FRONT buy/age (aging track) · BACK brewed (action) ====== */\n\
  .ccard{width:2.5in;height:2.5in;background:var(--c,#777);color:#fff;position:relative;overflow:hidden;\n\
    display:flex;flex-direction:column;justify-content:space-between;text-shadow:0 1px 1.5px rgba(0,0,0,.5)}\n\
  .ccard .ce{padding:.12in .17in;display:flex;flex-direction:column;gap:.035in;flex:0 0 auto}   /* content margin (the gradient/art are full-bleed on .ce/.artbg, so this insets text only) */\n\
  .ccard .ce.bot{padding-top:.05in}\n\
  .ccard .ce-row{display:flex;align-items:center;gap:.06in}\n\
  .ccard .ce-row.sb{justify-content:space-between}\n\
  .ccard .cq{display:inline-flex;align-items:center;gap:.02in;font-weight:900;font-size:.2in;line-height:1;flex:0 0 auto}\n\
  .ccard .cq svg,.ccard .cq .ic{width:.17in;height:.17in;stroke-width:2.2}\n\
  .ccard .cq.big{font-size:.4in} .ccard .cq.big svg,.ccard .cq.big .ic{width:.34in;height:.34in}   /* the front top-end quality, 2× */\n\
  .ccard .cnm{font-variant:small-caps;font-weight:bold;font-size:.165in;line-height:1.02}\n\
  .ccard .ccost{display:inline-flex;gap:.05in;font-weight:bold;font-size:.135in;align-items:center}\n\
  .ccard .ccost .gc{gap:.02in} .ccard .ccost .gc svg,.ccard .ccost .gc .ic{width:.14in;height:.14in}\n\
  .ccard .ctitle{display:flex;flex-direction:column;align-items:flex-end;gap:.02in;line-height:1.05;text-align:right}   /* title + cost stacked on the right, beside the big quality */\n\
  /* the SPECIAL (Keut presence / specialty signatures) — a centered band UNDER the aging track, aging side only */\n\
  .ccard .cc-perk{margin-top:.05in;text-align:center;font-size:.17in;font-weight:700;line-height:1.15;color:#fff;\n\
    background:rgba(20,14,8,.5);border-radius:.05in;padding:.03in .08in;align-self:center}\n\
  .ccard .cc-perk svg,.ccard .cc-perk .ic{width:.18in;height:.18in;vertical-align:-.035in}\n\
  .ccard .cc-perk b{font-size:.2in}\n\
  .ccard .cact{display:flex;align-items:center;gap:.05in;background:rgba(0,0,0,.3);border-radius:.05in;padding:.05in .06in;font-size:.155in;line-height:1.12}\n\
  .ccard .cact .ac{display:inline-flex;align-items:center;justify-content:center;width:.27in;height:.27in;border-radius:50%;background:rgba(255,255,255,.92);flex:0 0 auto}\n\
  .ccard .cact .ac svg,.ccard .cact .ac .ic{width:.15in;height:.15in;color:#23201c;stroke-width:2.1}\n\
  .ccard .cc-mark{width:.3in;height:.3in;border:1.6px dashed rgba(255,255,255,.85);border-radius:.05in;flex:0 0 auto;margin-left:auto}\n\
  /* aging track on the FRONT centre */\n\
  /* FRONT centre = the maturation track on ONE line over a brewhouse-interior illustration (light parchment scrim keeps the ink legible) */\n\
  .cc-age{margin:.04in .05in;color:#fff;border-radius:.07in;padding:.05in .05in;overflow:hidden;\n\
    background:linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.4)),url(\'art/brewhouse.png\');background-size:cover;background-position:center;\n\
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.05in;flex:1}   /* column: the track, then the special band below it */\n\
  .cc-agerow{display:flex;gap:.07in;align-items:center;justify-content:center;flex-wrap:nowrap}\n\
  .cc-step{width:.4in;height:.4in;border:1.9px solid rgba(255,255,255,.92);border-radius:.06in;display:flex;align-items:center;justify-content:center;font-size:.21in;font-weight:bold;color:#fff;background:transparent;text-shadow:0 1px 2px rgba(0,0,0,.75);flex:0 0 auto}\n\
  .cc-step.rdy{border-color:var(--green);background:var(--green);color:#fff;text-shadow:none;box-shadow:0 1px 2px rgba(0,0,0,.4)}   /* READY = flip the card to its brewed side */\n\
  .cc-step.rdy svg,.cc-step.rdy .ic{width:.26in;height:.26in;stroke-width:2.4}\n\
  .cc-step.start{border-style:dashed}   /* place the vessel marker here at brew (the Brewhouse beaker) */\n\
  .cc-step.start svg,.cc-step.start .ic{width:.25in;height:.25in;filter:drop-shadow(0 1px 2px rgba(0,0,0,.75))}\n\
  /* BACK centre */\n\
  .cc-big{flex:1;display:flex;align-items:center;justify-content:center;opacity:.32}\n\
  .cc-big svg,.cc-big .ic{width:.85in;height:.85in}\n\
  .cc-back .ce.bot{gap:.05in;padding-top:.34in;background:linear-gradient(to top,var(--c) 0%,var(--c) 38%,transparent 100%)}   /* the front\'s beer colour, solid at the foot, fading up into the illustration */\n\
  .cc-back .ce.top{padding-bottom:.3in;background:linear-gradient(to bottom,var(--c) 0%,var(--c) 36%,transparent 100%)}   /* a matching colour gradient at the top, fading down into the illustration */\n\
  .cc-actfloat{flex:1;display:flex;align-items:flex-end;justify-content:center;padding-bottom:0;transform:translateY(.13in)}   /* the action / berths float low over the illustration, dropped toward the colour foot */\n\
  /* SHIP CARD (printables2 v4) — hull + cost over the art, gate + berths floating low, the kontor name in the colour foot */\n\
  .ship-card .ce.top{background:none;padding-bottom:.08in}   /* ships keep a plain art top (no colour gradient — that\'s cask-back only) */\n\
  .ship-card .ce.top .cnm{font-size:.22in;display:inline-flex;align-items:center;gap:.05in}\n\
  .ship-card .ce.top .cnm svg,.ship-card .ce.top .cnm .ic{width:.26in;height:.26in}\n\
  .ship-card .ccost{font-size:.17in}\n\
  .ship-card .sberth{display:inline-flex;align-items:center;gap:.07in;background:rgba(0,0,0,.34);border-radius:.06in;padding:.055in .09in}\n\
  .ship-card .sbn{width:.42in;height:.42in;border:1.8px solid rgba(255,255,255,.92);border-radius:.05in;display:flex;align-items:center;justify-content:center;font-size:.18in;font-weight:900}   /* prints 0.336in — seats an 8mm cask cube; the tally die rides BESIDE the hull */\n\
  .ship-card .ce.bot .ce-row{align-items:flex-end}\n\
  .ship-card .ce.bot .sdest{font-size:.22in;font-variant:small-caps;font-weight:bold;display:inline-flex;align-items:center;gap:.06in}\n\
  .ship-card .ce.bot .sdest svg,.ship-card .ce.bot .sdest .ic{width:.2in;height:.2in}\n\
  .ship-card .ce.bot .sgate{font-weight:900;font-size:.2in;display:inline-flex;align-items:center;gap:.02in}\n\
  .ship-card .ce.bot .sgate svg,.ship-card .ce.bot .sgate .ic{width:.19in;height:.19in}\n\
  /* the BACK ends match (Q + title + a marker space), a little larger */\n\
  .cc-back .ce .cq{font-size:.24in} .cc-back .ce .cq svg,.cc-back .ce .cq .ic{width:.2in;height:.2in}\n\
  .cc-back .ce .cnm{font-size:.19in}\n\
  .cc-back .ce.top .cnm{font-size:.225in}   /* the back\'s top title a touch larger */\n\
  .cc-back .ce.top .cq{font-size:.44in}   /* big quality + beer icon on the left of the back\'s top */\n\
  .cc-back .ce.top .cq svg,.cc-back .ce.top .cq .ic{width:.38in;height:.38in}\n\
  /* ===== background ART slot (printables2): a layer behind the card/tile content. Placeholder = a faint hatch;\n\
     when ART_ON, it carries the generated image (art/cask-<beer>.png · art/ship-<hull>.png) with a scrim for legibility. ===== */\n\
  .ccard > *{position:relative;z-index:1}\n\
  .ccard > .artbg{z-index:0}\n\
  .artbg{position:absolute;inset:0;z-index:0;background-size:cover;background-position:center;background-repeat:no-repeat}\n\
  .artbg>img.artbg-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block}\n\
  .artbg.ph{background-image:repeating-linear-gradient(45deg,rgba(255,255,255,.07) 0 .09in,rgba(255,255,255,0) .09in .18in)}\n\
  .artbg.scrim::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.5),rgba(0,0,0,.12) 28%,rgba(0,0,0,.12) 72%,rgba(0,0,0,.55))}\n\
  .artbg.baked::after{content:none}   /* PNG export: scrim is baked into the art <canvas> (see bakeArt) — drop the live pseudo */\n\
  .cc-back.baked-fg .ce.top,.cc-back.baked-fg .ce.bot{background:none}   /* PNG export: the colour foot is baked into the art <canvas> too */\n\
  /* keep the white end-icons legible over busy art */\n\
  .ccard .cq svg,.ccard .cq .ic,.ccard .ccost svg,.ccard .ccost .ic{filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.6))}\n\
  /* ====== goods TOKENS — laser-cut .7in circle inside a .95in bleed disc ======\n\
     FULL-BLEED: no printed ring — the laser cuts the circle out of the bled colour; the icon reads big. */\n\
  .tok{width:.95in;height:.95in;border-radius:50%;background:var(--c);color:#fff;position:relative;\n\
    display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:.1in;text-shadow:0 1px 1px rgba(0,0,0,.4)}\n\
  .tok svg{width:.44in;height:.44in}\n\
  /* ownership DISCS — .5in cut circle inside a .65in bleed disc */\n\
  .disc{width:.65in;height:.65in;border-radius:50%;background:var(--c);color:#fff;position:relative;\n\
    display:flex;align-items:center;justify-content:center}\n\
  .disc::after{content:"";position:absolute;inset:.075in;border:.6pt solid rgba(255,255,255,.7);border-radius:50%}\n\
  .disc svg{width:.2in;height:.2in}\n\
  /* BUILDING OWNERSHIP FRAMES (printables2) — a player-colour 2.5in base the 2in Building tile sits on; the\n\
     colour border showing around the smaller tile = whose building it is. Sized to drop into a 2.5in wharf slot. */\n\
  .frame{width:2.5in;height:2.5in;background:var(--c);border-radius:.12in;position:relative;box-shadow:0 1px 3px rgba(0,0,0,.25)}\n\
  .frame::after{content:"";position:absolute;left:.25in;right:.25in;top:.59in;bottom:.59in;border:2px dashed rgba(255,255,255,.85);border-radius:.07in}   /* the 2x1.32 building tile seat */\n\
  .frame .fl{position:absolute;left:0;right:0;bottom:.07in;text-align:center;color:#fff;font-variant:small-caps;font-weight:bold;font-size:.12in;text-shadow:0 1px 1.5px rgba(0,0,0,.5)}\n\
  /* worker / marker DISCS — .8in cut circle inside a 1in bleed disc */\n\
  .wtok{width:1in;height:1in;border-radius:50%;background:var(--c);color:#fff;position:relative;\n\
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.02in;font-size:.085in;font-variant:small-caps;font-weight:bold;text-align:center;line-height:1;text-shadow:0 1px 1px rgba(0,0,0,.4)}\n\
  .wtok::after{content:"";position:absolute;inset:.1in;border:.8pt solid rgba(255,255,255,.75);border-radius:50%}\n\
  .wtok svg{width:.3in;height:.3in}\n\
  /* ====== RECIPE CARDS — 1.85×2.55in, square corners, gapless grid ====== */\n\
  .card{width:1.85in;height:2.55in;background:#f7efdc;color:var(--ink);\n\
    position:relative;padding:0;display:flex;flex-direction:column;overflow:hidden}\n\
  /* the cask art fills the face; the COST panel floats over it; the tuck strip stays at the foot */\n\
  .card>.art{position:absolute;inset:0;z-index:0}\n\
  .card>.art img{width:100%;height:100%;object-fit:cover;object-position:center}\n\
  .card .c-costpanel{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:.03in;\n\
    margin:.12in auto 0;padding:.06in .14in;background:rgba(247,239,220,.92);border:1px solid rgba(0,0,0,.18);border-radius:.06in;align-self:center;flex:0 0 auto}\n\
  .card .c-costpanel .clab{font-variant:small-caps;font-weight:bold;font-size:.13in;color:var(--ink2);letter-spacing:.5px}\n\
  .card .c-costpanel .cbig{font-size:.24in;font-weight:900}\n\
  .card .c-costpanel .cbig .gc{gap:.03in}\n\
  .card .c-costpanel .cbig svg,.card .c-costpanel .cbig .ic{width:.26in;height:.26in}\n\
  .card .c-costpanel .g{color:#9c7414} .card .c-costpanel .h{color:#5d7d34}   /* the canonical goods colours — the global .g/.h tints are for dark grounds */\n\
  /* the CHARTER: the vertical cask → ship → kontor column */\n\
  .card .c-chart{position:relative;z-index:1;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.015in;color:#8a6408}\n\
  .card .c-chart .ci svg,.card .c-chart .ci .ic{width:.34in;height:.34in}\n\
  .card .c-chart .ca{font-size:.2in;font-weight:bold;line-height:1}\n\
  .card .c-chart .clab2{margin-top:.05in;font-variant:small-caps;font-weight:bold;font-size:.1in;color:var(--ink2);text-align:center;line-height:1.25}\n\
  .card .c-buy{flex:1;margin:.06in .14in;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.04in;\n\
    background:rgba(0,0,0,.05);border:1px solid rgba(0,0,0,.14);border-radius:.06in;padding:.06in .1in;\n\
    font-size:.1in;line-height:1.2;text-align:center}\n\
  .card .c-buy .lbl{font-variant:small-caps;font-weight:bold;color:var(--ink2)}\n\
  .card .c-buy .gc{font-size:.14in} .card .c-buy .gc svg,.card .c-buy .gc .ic{width:.17in;height:.17in}\n\
  .card .c-buy .gate{font-size:.09in;font-style:italic;color:var(--red);display:flex;align-items:center;gap:.03in}\n\
  .card .c-buy .gate svg,.card .c-buy .gate .ic{width:.12in;height:.12in}\n\
  /* title + BREW-cost strip — the visible edge when the card is tucked up under the board.\n\
     FIXED two-row layout (rung+name / cost) so every card\'s bottom edge reads identically. */\n\
  .card .c-strip{position:relative;z-index:1;margin-top:auto;flex:0 0 .56in;background:var(--cc,#8a6408);color:#fff;display:flex;flex-direction:column;justify-content:center;gap:.035in;\n\
    padding:.05in .12in;text-shadow:0 1px 1.5px rgba(0,0,0,.45)}\n\
  .card .c-strip .c-row{display:flex;align-items:center;gap:.06in;line-height:1;white-space:nowrap}\n\
  .card .c-strip svg,.card .c-strip .ic{width:.14in;height:.14in;flex:0 0 auto}\n\
  .card .c-strip .c-rung{flex:0 0 auto;display:inline-flex;align-items:center;gap:.015in;\n\
    background:rgba(255,255,255,.92);color:var(--cc);border-radius:.04in;padding:.025in .05in;font-size:.115in;font-weight:bold;text-shadow:none}\n\
  .card .c-strip .c-rung svg,.card .c-strip .c-rung .ic{width:.13in;height:.13in}\n\
  .card .c-strip .c-nm{font-variant:small-caps;font-weight:bold;font-size:.16in}\n\
  .card .c-strip .c-cost{display:inline-flex;align-items:center;gap:.06in;font-weight:bold;font-size:.13in}\n\
  .card .c-strip .c-cost .gc{font-size:.13in;gap:.015in}\n\
  .card .c-strip .c-cost .gc svg,.card .c-strip .c-cost .gc .ic{width:.13in;height:.13in}\n\
  .card .c-strip .c-lbl{font-size:.085in;font-style:italic;opacity:.85}\n\
  .card .c-strip .c-gate{display:inline-flex;align-items:center;gap:.02in;font-size:.085in;font-style:italic}\n\
  .card .c-strip .c-gate svg,.card .c-strip .c-gate .ic{width:.12in;height:.12in}\n\
  /* the BREWED face (v3.2d): a big check stamped on the bottom-right corner, riding above the strip */\n\
  .card .c-brewed{position:absolute;right:.04in;bottom:.04in;width:.24in;height:.24in;border-radius:50%;z-index:2;\n\
    background:#4a6b3a;border:2px solid #f7efdc;box-shadow:0 1px 3px rgba(0,0,0,.4);color:#fff;\n\
    display:flex;align-items:center;justify-content:center}\n\
  .card .c-brewed svg,.card .c-brewed .ic{width:.15in;height:.15in;stroke-width:3.4}\n\
  /* ---- UNLOCK COVER tile ---- */\n\
  .cover{background:var(--c);border-radius:.1in;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.05in;color:#fff;box-shadow:inset 0 0 0 3px rgba(255,255,255,.35)}\n\
  .cover svg,.cover .ic{width:.42in;height:.42in;opacity:.9}\n\
  .cover span{font-variant:small-caps;font-weight:bold;font-size:.12in;text-align:center;line-height:1.25;opacity:.92}\n\
  /* ---- the one-read die chip on Privilege tiles ---- */\n\
  .diech svg,.diech .ic{width:.14in;height:.14in;vertical-align:-.025in}';
var HC_CSS2="\n/* ===== v3.4a COMPONENT REFIT \u2014 cask TILES (2.5x1) \u00b7 buildings (2x1.32) \u00b7 carrier SHIPS ===== */\n/* CASK TILE: the beer art anchors the LEFT and fades into the beer's colour (a masked img over the\n   solid ground); the info rides the colour side. */\n.ctile{width:2.4in;height:1in;position:relative;overflow:hidden;color:#fff;background:var(--c,#777);border-radius:.09in;\n  display:flex;align-items:center;gap:.08in;padding:.07in .09in;text-shadow:0 1px 1.5px rgba(0,0,0,.55)}\n.ctile>*{position:relative;z-index:1}\n.ctile>.ct-art{position:absolute;left:0;top:0;bottom:0;width:1.2in;z-index:0;overflow:hidden;\n  -webkit-mask-image:linear-gradient(90deg,#000 24%,transparent 94%);mask-image:linear-gradient(90deg,#000 24%,transparent 94%)}\n.ctile>.ct-art img{position:relative;width:112%;height:152%;left:-6%;top:-26%;object-fit:cover;display:block}\n/* AGING side: two rows on the colour \u2014 Q\u00b7name\u00b7cost up top, perk + the track + the action below\n   (the track keeps right, past the art fade) */\n.ctA{flex-direction:column;justify-content:space-between;align-items:stretch;padding:.04in .09in .05in}\n.ctA .ct-hd{display:flex;align-items:center;gap:.06in;min-width:0}\n.ctA .ct-act2{justify-content:flex-end}\n.ctA .ct-act2 .ac{width:.26in;height:.26in}\n.ctA .ct-q{display:inline-flex;align-items:center;gap:.03in;font-weight:900;font-size:.24in;line-height:1;flex:0 0 auto}\n.ctA .ct-q svg,.ctA .ct-q .ic{width:.19in;height:.19in;stroke-width:2.2;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.6))}\n.ctA .ct-nm{font-variant:small-caps;font-weight:bold;font-size:.17in;line-height:1;white-space:nowrap;overflow:hidden;flex:0 1 auto}\n.ctA .ct-cost{margin-left:auto;display:inline-flex;gap:.05in;font-weight:bold;font-size:.14in;align-items:center;flex:0 0 auto;background:rgba(0,0,0,.34);border-radius:.14in;padding:.025in .07in}\n.ctA .ct-cost .gc{gap:.02in;font-size:.14in}.ctA .ct-cost .gc svg,.ctA .ct-cost .gc .ic{width:.16in;height:.16in}\n.ctA .ct-bot{display:flex;align-items:center;justify-content:flex-end;gap:.06in;min-width:0}\n.ctA .ct-perk{position:absolute;left:.08in;bottom:.05in;z-index:1;max-width:.92in;font-size:.078in;font-style:italic;line-height:1.1;opacity:.95}\n.ctA .ct-perk b{font-size:.105in;font-style:normal}\n.ctA .ct-perk .ic,.ctA .ct-perk svg{width:.1in;height:.1in}\n.ctA .ct-step{width:.36in;height:.25in;border:1.9px solid rgba(255,255,255,.92);border-radius:.05in;\n  display:flex;align-items:center;justify-content:center;font-size:.15in;font-weight:bold;flex:0 0 auto;background:rgba(0,0,0,.14)}\n.ctA .ct-step.rdy{border-color:#4a6b3a;background:#4a6b3a;box-shadow:0 1px 2px rgba(0,0,0,.4)}\n.ctA .ct-step.rdy svg,.ctA .ct-step.rdy .ic{width:.19in;height:.19in;stroke-width:2.4}\n.ctA .ct-step.start{border-style:dashed}\n.ctA .ct-step.start svg,.ctA .ct-step.start .ic{width:.18in;height:.18in}\n/* WHARF side: the die seat LEFT (the Q prints IN it; the parked die covers it), name over action mid,\n   the art on the RIGHT fading leftward into the colour */\n.ctB{padding-right:.12in}\n.ctB>.ct-art{left:auto;right:0;-webkit-mask-image:linear-gradient(270deg,#000 24%,transparent 94%);mask-image:linear-gradient(270deg,#000 24%,transparent 94%)}\n.ctB .ct-seat{flex:0 0 auto;width:.56in;height:.56in;border:2px dashed rgba(255,255,255,.88);border-radius:.07in;\n  display:flex;align-items:center;justify-content:center;gap:.025in;font-weight:900;font-size:.24in;background:rgba(0,0,0,.18);position:relative}\n.ctB .ct-seat svg,.ctB .ct-seat .ic{width:.19in;height:.19in;stroke-width:2.2;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.6))}\n.ctB .ct-main{flex:1;display:flex;flex-direction:column;gap:.05in;min-width:0;max-width:1.54in}\n.ctB .ct-nm2{font-variant:small-caps;font-weight:bold;font-size:.18in;line-height:1;white-space:nowrap;overflow:hidden;text-align:left}\n.ctile .ct-act2{display:flex;align-items:center;gap:.05in;font-size:.13in;line-height:1.05;font-weight:600;min-width:0}\n.ctile .ct-act2 .ac{display:inline-flex;align-items:center;justify-content:center;width:.28in;height:.28in;border-radius:50%;background:rgba(255,255,255,.92);flex:0 0 auto}\n.ctile .ct-act2 .ac svg,.ctile .ct-act2 .ac .ic{width:.16in;height:.16in;color:#23201c;stroke-width:2.1}\n.seatdie{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:2}\n/* BUILDING 2x1.32 \u2014 art-forward (the reference look): big serif name over the art, ONE foot row:\n   the effect left, the cost BIG at right, in the verb colour fading up from the bottom. */\n.btile{width:2.5in;height:1.32in;position:relative;overflow:hidden;color:#fff;background:var(--c,#3a3342);\n  display:flex;flex-direction:column;justify-content:space-between;text-shadow:0 1px 2px rgba(0,0,0,.6);border-radius:.09in}\n.btile>*{position:relative;z-index:1}.btile>.artbg{position:absolute;inset:0;z-index:0}\n.btile .artbg.scrim::after{background:linear-gradient(180deg,rgba(0,0,0,.44),rgba(0,0,0,.04) 40%,rgba(0,0,0,.04) 62%,rgba(0,0,0,.35))}\n.btile .bt-top{display:flex;align-items:center;gap:.06in;padding:.08in .1in 0}\n.btile .bt-ic{flex:0 0 auto;display:inline-flex}.btile .bt-ic svg,.btile .bt-ic .ic{width:.21in;height:.21in;stroke-width:1.9;filter:drop-shadow(0 1px 2px rgba(0,0,0,.7))}\n.btile .bt-nm{font-variant:small-caps;font-weight:bold;font-size:.185in;line-height:1;flex:1;white-space:nowrap;overflow:hidden}\n.btile .bt-nm.long{font-size:.148in}\n.btile .bt-nm.xlong{font-size:.128in}\n.btile .bt-foot{background:linear-gradient(to top,var(--c) 0%,var(--c) 70%,transparent 100%);\n  padding:.12in .1in .07in;display:flex;align-items:center;gap:.07in}\n.btile .bt-eff{font-size:.15in;font-weight:600;line-height:1.1;flex:1;min-width:0}\n.btile .bt-eff::first-letter{text-transform:uppercase}\n.btile .bt-eff .ic,.btile .bt-eff svg{width:.15in;height:.15in;vertical-align:-.02in}\n.btile .bt-eff .g{color:#ffe08a}.btile .bt-eff .h{color:#c4e69c}\n.btile .bt-cost{flex:0 0 auto;display:inline-flex;align-items:center;font-weight:bold;font-size:.14in;background:rgba(0,0,0,.34);border-radius:.14in;padding:.025in .07in}\n.btile .bt-cost .gc{gap:.02in;font-size:.14in}.btile .bt-cost .gc svg,.btile .bt-cost .gc .ic{width:.16in;height:.16in}\n.btile .g,.stile .g,.ctile .g{color:#ffe08a}.btile .h,.stile .h,.ctile .h{color:#c4e69c}\n.btile .diech svg,.btile .diech .ic{width:.14in;height:.14in;vertical-align:-.025in}\n/* BUILDING \u2014 floor side: WILD, nothing else */\n.btF .artbg{filter:grayscale(.55) brightness(.72)}\n.btF .bt-wild{flex:1;display:flex;align-items:center;justify-content:center;gap:.08in;font-size:.24in;font-weight:900;letter-spacing:1px}\n.btF .bt-circ{display:inline-flex;align-items:center;justify-content:center;width:.34in;height:.34in;border-radius:50%;background:rgba(255,255,255,.92)}\n.btF .bt-circ svg,.btF .bt-circ .ic{width:.2in;height:.2in;color:#23201c;stroke-width:2.1}\n.btF .bt-sub{text-align:center;font-variant:small-caps;font-weight:bold;font-size:.095in;opacity:.9;padding-bottom:.07in}\n.stile{width:2.5in;flex:0 0 auto;position:relative;overflow:hidden;color:#fff;background:var(--c,#33445a);border-radius:.09in;\n  display:flex;flex-direction:column;text-shadow:0 1px 1.5px rgba(0,0,0,.55)}\n/* the hold: full-height port art under a kontor-colour wash + faint planking \u2014 the tile reads\n   as a ship of ITS port, never as blank board */\n.stile>.artbg{position:absolute;inset:0;z-index:0}\n.stile>.artbg.scrim::after{content:none}\n.stile>.artbg img{filter:saturate(1.12) contrast(1.06)}\n.stile .st-wash{position:absolute;inset:0;z-index:0;\n  background:var(--c);\n  -webkit-mask-image:linear-gradient(180deg,#000 0,#000 .3in,rgba(0,0,0,.3) .95in,rgba(0,0,0,.3) 100%);\n  mask-image:linear-gradient(180deg,#000 0,#000 .3in,rgba(0,0,0,.3) .95in,rgba(0,0,0,.3) 100%)}\n.stile>.st-trig,.stile>.st-berth{position:relative;z-index:1}\n/* the TRIGGER berth (top 1in): identity above, its own marked seat below \u2014 the last cask covers it and sails */\n.stile .st-trig{flex:0 0 1in;display:flex;flex-direction:column}\n.stile .st-toprow{display:flex;justify-content:space-between;align-items:center;gap:.08in;padding:.06in .1in 0;flex:0 0 auto}\n.stile .st-k{display:inline-flex;align-items:center;gap:.06in;font-variant:small-caps;font-weight:bold;font-size:.185in;min-width:0;white-space:nowrap;overflow:hidden}\n.stile .st-k svg,.stile .st-k .ic{width:.2in;height:.2in;flex:0 0 auto;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.5))}\n.stile .st-meta{display:inline-flex;align-items:center;gap:.09in;flex:0 0 auto}\n.stile .st-gate{font-weight:900;font-size:.16in;display:inline-flex;align-items:center;gap:.02in}\n.stile .st-cost{font-weight:bold;font-size:.14in;display:inline-flex;align-items:center;background:rgba(0,0,0,.34);border-radius:.14in;padding:.025in .07in}\n.stile .st-gate svg,.stile .st-gate .ic{width:.17in;height:.17in}\n.stile .gc{display:inline-flex;align-items:center;gap:.02in;font-weight:bold}\n.stile .gc svg,.stile .gc .ic{width:.16in;height:.16in;flex:0 0 auto}\n/* the SEAT \u2014 one grammar with the die seat: dashed outline = a component parks on this footprint */\n.stile .st-seat{position:relative;flex:1;margin:.055in .07in .06in;border:2px dashed rgba(255,255,255,.72);border-radius:.07in;\n  display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.12)}\n.stile .st-berth{flex:0 0 1in;display:flex;flex-direction:column}\n.stile .st-hold{flex:1 1 auto;position:relative;z-index:0}\n.stile .st-num{position:absolute;left:.05in;top:.05in;min-width:.2in;height:.2in;padding:0 .03in;border-radius:.04in;\n  background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;font-size:.13in;font-weight:900}\n.stile .st-ghost{opacity:.38}.stile .st-ghost svg,.stile .st-ghost .ic{width:.3in;height:.3in}\n.stile .st-go{display:inline-flex;align-items:center;gap:.06in}\n.stile .st-go svg,.stile .st-go .ic{width:.26in;height:.26in;filter:drop-shadow(0 1px 2px rgba(0,0,0,.6))}\n.stile .st-go .amp{font-family:Georgia,serif;font-weight:bold;font-size:.19in;line-height:1}\n";
var HC_CSS3='.ctB .ct-start{display:inline-flex;align-items:center;gap:.03in;font-size:.105in;font-weight:600;opacity:.95;background:rgba(0,0,0,.28);border-radius:.1in;padding:.015in .05in;align-self:flex-start}.ctB .ct-start b{font-size:.13in}.ctB .ct-start svg,.ctB .ct-start .ic{width:.12in;height:.12in}'
/* BUILDING standard-verb chip — the cask tiles' .ac circle, same size, same grammar */
+'.btile .bt-eff.bt-act{display:inline-flex;align-items:center;gap:.06in;font-variant:small-caps;font-weight:bold;font-size:.16in}'
+'.btile .ac{display:inline-flex;align-items:center;justify-content:center;width:.28in;height:.28in;border-radius:50%;background:rgba(255,255,255,.92);flex:0 0 auto}'
+'.btile .ac svg,.btile .ac .ic{width:.16in;height:.16in;color:#23201c;stroke-width:2.1}'
/* LADING order strip (v4.5b): kontor colour, three rows — where · what→★ · the claim reminder */
+'.ldtile{width:2in;height:.9in;position:relative;overflow:hidden;color:#fff;background:var(--c,#555);border-radius:.09in;display:flex;flex-direction:column;justify-content:space-between;padding:.06in .09in;text-shadow:0 1px 1.5px rgba(0,0,0,.55)}'
+'.ldtile .ld-hd{display:flex;align-items:center;gap:.05in;font-variant:small-caps;font-weight:bold;font-size:.16in;line-height:1}'
+'.ldtile .ld-hd svg,.ldtile .ld-hd .ic{width:.17in;height:.17in;flex:0 0 auto}'
+'.ldtile .ld-bd{display:flex;align-items:center;justify-content:center;gap:.08in;font-weight:900;font-size:.2in;line-height:1}'
+'.ldtile .ld-bd svg,.ldtile .ld-bd .ic{width:.22in;height:.22in;filter:drop-shadow(0 1px 1.5px rgba(0,0,0,.5))}'
+'.ldtile .ld-beer{display:inline-flex;align-items:center;gap:.04in;font-variant:small-caps;font-size:.18in}'
+'.ldtile .ld-die{display:inline-flex;align-items:center;gap:.03in}'
+'.ldtile .ld-arr{opacity:.85;font-size:.17in}'
+'.ldtile .ld-pts{display:inline-flex;align-items:center;gap:.03in;background:rgba(0,0,0,.32);border-radius:.12in;padding:.02in .07in}'
+'.ldtile .ld-sub{text-align:center;font-size:.085in;font-variant:small-caps;opacity:.85;line-height:1}'
/* ILLUSTRATED ICONS — the art <img> tracks the .ic sizing everywhere the CSS pairs "svg,.ic";
   these cover the few svg-only spots + give any unsized site a 1em fallback */
+'img.ai{width:1em;height:1em;object-fit:contain;vertical-align:-.13em}'
+'.tok img.ai{width:.5in;height:.5in}.disc img.ai{width:.22in;height:.22in}.wtok img.ai{width:.32in;height:.32in}'
/* round 2 (designer, 2026-08-03): the white action circles RETIRE — a cask tile shows the bare
   action icon at the full height the circle had; a building shows it at TWICE that (unmissable) */
+'.ctile .ct-act2 .ac{background:transparent;border-radius:0;width:.3in;height:.3in}'
+'.ctile .ct-act2 .ac svg,.ctile .ct-act2 .ac .ic{width:.3in;height:.3in}'
+'.ctA .ct-act2 .ac{width:.3in;height:.3in}'
+'.btile .ac{background:transparent;border-radius:0;width:.56in;height:.56in}'
+'.btile .ac svg,.btile .ac .ic{width:.56in;height:.56in}'
/* the numbered QUALITY-cask marks (the number rides the icon, age-3 style) */
+'.ctA .ct-q img.ai{width:.36in;height:.36in}'
+'.ctB .ct-seat img.ai{width:.44in;height:.44in}'
+'.card .c-strip .c-rung{background:none;padding:0}.card .c-strip .c-rung img.ai{width:.3in;height:.3in}'
/* round 4 (designer): building action rows — icon hugs the text (the sticker art carries its own
   transparent margin), and the description prints sentence case, never small-caps */
+'.btile .bt-eff.bt-act{gap:0;font-variant:normal}'
/* the die MODIFIER marks print big inline in building effects (class dlift — print.html owns .dl) */
+'.btile .bt-eff img.ai.dlift{width:.34in;height:.34in;vertical-align:-.12in;margin-right:.01in}'
/* round 5 (designer): ONE consistent big icon size on building feet; the icon pulls ~1mm left,
   the text + cost BOTTOM-ALIGN beside it and long text wraps UPWARD (flex-end) */
+'.btile .bt-foot{align-items:flex-end}'
+'.btile .bt-eff.bt-act{align-items:flex-end}'
+'.btile .ac{width:.5in;height:.5in;margin:0 .02in -.02in -.04in}'
+'.btile .ac svg,.btile .ac .ic{width:.5in;height:.5in}'
+'.btile .bt-etext{padding-bottom:.035in;min-width:0}'
+'.btile .bt-cost{margin-bottom:.02in}'
/* the cask tile action chip grows the same way — negative margins absorb the growth so the
   title and the start/ready line never move */
+'.ctile .ct-act2{gap:0}'
+'.ctile .ct-act2 .ac{width:.44in;height:.44in;margin:-.07in .025in -.07in 0}'
+'.ctile .ct-act2 .ac svg,.ctile .ct-act2 .ac .ic{width:.44in;height:.44in}'
+'.ctA .ct-act2 .ac{width:.44in;height:.44in}'
/* round 7: the seat holds the START die face; the quality mark heads the title row; the
   action sits at the foot of the main column */
+'.ctB .ct-main{justify-content:space-between;padding:.03in 0}'
+'.ctB .ct-hd2{display:flex;align-items:center;gap:.045in;min-width:0}'
+'.ctB .ct-hd2 img.ai{width:.4in;height:.4in;flex:0 0 auto;margin:-.03in 0}'
/* ship tiles (round 4): the berth imagery reads at arm\'s length — bigger cask-&-sail on the
   trigger, and the waiting berths\' cask ghost prints FULL-STRENGTH (the grey-out was invisible) */
+'.stile .st-go svg,.stile .st-go .ic{width:.42in;height:.42in}'
+'.stile .st-ghost{opacity:1}'
+'.stile .st-ghost svg,.stile .st-ghost .ic{width:.48in;height:.48in}'
/* v4.9b: the mark's start-face chip on the building top row */
+'.btile .bt-ms{flex:0 0 auto;display:inline-flex;align-items:center;margin-right:.02in}'
+'.btile .bt-ms img.ai,.btile .bt-ms svg{width:.24in;height:.24in;filter:drop-shadow(0 1px 2px rgba(0,0,0,.6))}'
+'\n/* ===== v4.9d PLAYER BOARD (7.65x3.85in) \u2014 print + live app, one component ===== */'
+'.pbrd{--pc:#7c2128;width:7.65in;height:3.85in;background:var(--parch,#f3e9d2);color:var(--ink,#2b2018);position:relative;border-radius:.14in;display:flex;flex-direction:column;gap:.07in;padding:.12in .15in;box-sizing:border-box;border:2.5px solid var(--pc);overflow:hidden}'
+'.pbrd .sn{font-variant:small-caps;font-weight:bold;font-size:.085in;opacity:.62;line-height:1.05}'
+'.pbrd-id{display:flex;align-items:center;gap:.09in;flex:0 0 .38in}'
+'.pbrd-crest{width:.32in;height:.32in;border-radius:.05in;background:var(--pc);color:#fff;display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto}'
+'.pbrd-crest svg,.pbrd-crest .ic{width:.2in;height:.2in}'
+'.pbrd-name{font-variant:small-caps;font-weight:bold;font-size:.2in;color:var(--pc);line-height:1;white-space:nowrap;overflow:hidden;max-width:1.9in}'
+'.pbrd-score{display:inline-flex;align-items:center;gap:.04in;margin-left:.12in;font-size:.16in;color:var(--pc)}'
+'.pbrd-score svg,.pbrd-score .ic,.pbrd-score img.ai{width:.26in;height:.26in}'
+'.pbrd-box{display:inline-flex;align-items:center;justify-content:center;min-width:.42in;height:.3in;border:1.6px solid var(--pc);border-radius:.05in;background:rgba(255,255,255,.5);font-size:.17in;padding:0 .04in}'
+'.pbrd-num{font-size:.21in;line-height:1;color:var(--ink,#2b2018)}'   // the live readout — no printed well around a number
+'.pbrd-supply{margin-left:auto;display:inline-flex;align-items:center;gap:.12in}'
+'.pbrd-sup{display:inline-flex;align-items:center;gap:.04in;font-size:.14in}'
+'.pbrd-sup svg,.pbrd-sup .ic,.pbrd-sup img.ai{width:.26in;height:.26in}'
+'.pbrd-sup.pbg,.pbrd-sup.pbg .pbrd-num{color:#9c7414}'   // grain rides the grain gold
+'.pbrd-sup.pbh,.pbrd-sup.pbh .pbrd-num{color:#5d7d34}'   // hops ride the hops green
+'.pbrd-note{font-size:.075in;color:var(--ink2,#5b4a37);font-variant:small-caps;max-width:1in;line-height:1.15;text-align:right}'
+'.pbrd-row{display:flex;gap:.08in;flex:0 0 auto;align-items:stretch}'
+'.pbrd-slot{position:relative;border:1.7px solid var(--pc);border-radius:.07in;background:rgba(255,255,255,.38);display:flex;align-items:center;justify-content:center}'
+'.pbrd-slot .sn{position:absolute;top:.045in;left:0;right:0;text-align:center;z-index:0}'
+'.pbrd-slot .si{display:flex;gap:.06in;opacity:.35}.pbrd-slot .si svg,.pbrd-slot .si .ic,.pbrd-slot .si img.ai{width:.3in;height:.3in}'
+'.pbrd-vsl{width:2.42in;height:1.06in;flex:0 0 auto}'
+'.pbrd-seat{width:2.06in;height:2.06in;flex:0 0 auto;border-style:dashed}'
+'.pbrd-right{flex:1;display:flex;flex-direction:column;gap:.07in;min-width:0}'
+'.pbrd-flight{border:1.6px solid var(--pc);border-radius:.07in;background:rgba(255,255,255,.45);padding:.05in .07in}'
+'.pbrd-flight .fl-t{font-variant:small-caps;font-weight:bold;font-size:.1in;color:var(--pc);display:flex;align-items:center;gap:.04in;margin-bottom:.04in}'
+'.pbrd-flight .fl-t svg,.pbrd-flight .fl-t .ic,.pbrd-flight .fl-t img.ai{width:.13in;height:.13in}'
+'.fl-row{display:flex;gap:.05in}'
+'.fl-cell{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;border:1.4px dashed var(--pc);border-radius:.05in;padding:.025in 0;line-height:1.05}'
+'.fl-cell b{font-size:.13in}.fl-cell span{font-size:.09in;color:var(--ink2,#5b4a37)}'
+'.fl-cell.on{border-style:solid;background:var(--pc);color:#fff}.fl-cell.on span{color:rgba(255,255,255,.85)}'
+'.pbrd-lads{position:relative;flex:1;min-height:.75in;border:1.7px dashed var(--pc);border-radius:.07in;background:rgba(255,255,255,.3);display:flex;flex-wrap:wrap;gap:.04in;align-items:flex-start;align-content:flex-start;padding:.17in .06in .05in}'
+'.pbrd-lads .sn{position:absolute;top:.045in;left:0;right:0;text-align:center}'
+'.pbrd-lads .si{opacity:.3;margin:auto}.pbrd-lads .si svg,.pbrd-lads .si .ic,.pbrd-lads .si img.ai{width:.26in;height:.26in}'
+'.pbrd-lad{display:inline-flex;align-items:center;gap:.03in;font-size:.1in;font-weight:bold;background:var(--pc);color:#fff;border-radius:.09in;padding:.02in .06in;z-index:1}'
+'.pbrd-lad img.ai,.pbrd-lad .ic,.pbrd-lad svg{width:.13in;height:.13in;flex:0 0 auto}';   // a claimed Order wears its Kontor's crest
if(typeof document!=='undefined'&&document.createElement){var st=document.createElement('style');st.id='hc-cards';st.textContent=HC_CSS+HC_CSS2+HC_CSS3;
  var hst=document.head||document.documentElement;if(hst&&typeof hst.appendChild==='function')hst.appendChild(st);}   // headless harness stubs skip the injection
window.HC={LU,LUX,ICON_ART,cost,ART_ON,SHIP_H,QI,VP,DIE,slug,artLayer,ART_DIR,CASK_POOL,poolFor,CASKS,HULL,SHIP_DISPLAY,SHIP_DEST,SHIP_DECK,BTGT,BUILDINGS,LADINGS,LADINGS_HALL,invitationTile,IMPROVE,GOODS,CONTRACTS,STARTERS,RECIPES,caskCardFront,caskCardBack,shipCard,shipBack,buildingCard,buildingBack,ladingTile,improveTile,tok,disc,coverTile,wtok,recipeCard,contractCard,playerBoard};
})();

// quick gate: extract play.html's script and node --check it (no DOM needed)
const fs=require('fs'),path=require('path'),{execSync}=require('child_process');
const html=fs.readFileSync(path.join(__dirname,'..','play.html'),'utf8');
const engine=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
fs.writeFileSync('/tmp/claude-0/engine-check.js',engine);
try{execSync('node --check /tmp/claude-0/engine-check.js',{stdio:'pipe'});console.log('SYNTAX OK ('+engine.split('\n').length+' lines)');}
catch(e){console.error(String(e.stderr||e));process.exit(1);}

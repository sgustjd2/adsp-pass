import assert from 'node:assert/strict';
import fs from 'node:fs';
import {QUESTIONS,ROUNDS,SOURCES} from '../dist/questions.js';
assert.equal(QUESTIONS.length,340);
assert.equal(new Set(QUESTIONS.map(q=>q.id)).size,QUESTIONS.length);
assert.equal(new Set(QUESTIONS.map(q=>q.text)).size,QUESTIONS.length);
for(const q of QUESTIONS){assert.ok(q.text&&q.explanation&&q.topic&&SOURCES[q.source],q.id);assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options).size,4,q.id);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id);assert.ok(ROUNDS.some(r=>r.number===q.round),q.id);}
for(const subject of [1,2,3])assert.ok(QUESTIONS.filter(q=>q.subject===subject).length>=(subject===3?30:10));
assert.deepEqual(ROUNDS.map(r=>r.number),Array.from({length:11},(_,i)=>50-i));
for(const round of ROUNDS){const qs=QUESTIONS.filter(q=>q.round===round.number);assert.equal(qs.length,[48,49].includes(round.number)?35:30);if(round.number<48)assert.deepEqual([1,2,3].map(s=>qs.filter(q=>q.subject===s).length),[6,6,18]);}
const manifest=JSON.parse(fs.readFileSync('dist/manifest.webmanifest','utf8'));
assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');
const assets=['index.html','app.js','core.js','questions.js','rounds-40-43.js','rounds-44-47.js','styles.css','sw.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
const worker=fs.readFileSync('dist/sw.js','utf8');
for(const p of assets){assert.ok(fs.existsSync('dist/'+p));if(p!=='sw.js')assert.ok(worker.includes(`'./${p}'`),`오프라인 캐시 누락: ${p}`);}
console.log('검증 완료: 40~50회 340문항, 고유 ID·보기·정답·출처·회차·과목 비율, PWA 캐시 파일 및 상대 경로');

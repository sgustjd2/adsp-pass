import assert from 'node:assert/strict';
import fs from 'node:fs';
import {QUESTIONS} from '../dist/questions.js';
assert.equal(QUESTIONS.length,100);
assert.equal(new Set(QUESTIONS.map(q=>q.id)).size,100);
assert.equal(new Set(QUESTIONS.map(q=>q.text)).size,100);
for(const q of QUESTIONS){assert.ok(q.text&&q.explanation&&q.topic&&q.source);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);}
for(const subject of [1,2,3])assert.ok(QUESTIONS.filter(q=>q.subject===subject).length>=(subject===3?30:10));
for(const round of [50,49,48])assert.equal(QUESTIONS.filter(q=>q.round===round).length,round===50?30:35);
const manifest=JSON.parse(fs.readFileSync('dist/manifest.webmanifest','utf8'));
assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');
for(const p of ['index.html','app.js','core.js','questions.js','styles.css','sw.js','icon.svg','icon-192.png','icon-512.png'])assert.ok(fs.existsSync('dist/'+p));
console.log('검증 완료: 100문항, 고유 ID·보기·정답·회차·과목 비율, PWA 파일 및 상대 경로');

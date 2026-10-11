import assert from 'node:assert/strict';
import fs from 'node:fs';
import {QUESTIONS,ROUNDS,SOURCES} from '../dist/questions.js';
import {STUDY_CARDS,STUDY_SOURCES} from '../dist/study-guide.js';
import {SUMMARY_NOTES,NOTE_CHAPTERS} from '../dist/summary-notes.js';
import {EASY_NOTES,renderEasyNote} from '../dist/easy-notes.js';
import {NOTE_DEPTH,CHAPTER_GUIDES} from '../dist/note-depth.js';
import {NOTE_ILLUSTRATIONS} from '../dist/note-illustrations.js';
assert.equal(QUESTIONS.length,550);
assert.equal(QUESTIONS.filter(q=>q.supplement).length,210);
assert.equal(QUESTIONS.filter(q=>!q.supplement).length,340);
assert.equal(new Set(QUESTIONS.map(q=>q.id)).size,QUESTIONS.length);
assert.equal(new Set(QUESTIONS.map(q=>q.text)).size,QUESTIONS.length);
for(const q of QUESTIONS){assert.ok(q.text&&q.explanation&&q.topic&&SOURCES[q.source],q.id);assert.equal(q.options.length,4,q.id);assert.equal(new Set(q.options).size,4,q.id);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4,q.id);assert.ok(ROUNDS.some(r=>r.number===q.round),q.id);}
for(const subject of [1,2,3])assert.ok(QUESTIONS.filter(q=>q.subject===subject).length>=(subject===3?30:10));
assert.deepEqual(ROUNDS.map(r=>r.number),Array.from({length:11},(_,i)=>50-i));
for(const round of ROUNDS){const qs=QUESTIONS.filter(q=>q.round===round.number);assert.equal(qs.length,50);assert.deepEqual([1,2,3].map(s=>qs.filter(q=>q.subject===s).length),[10,10,30]);assert.equal(qs.filter(q=>q.supplement).length,[48,49].includes(round.number)?15:20);}
const manifest=JSON.parse(fs.readFileSync('dist/manifest.webmanifest','utf8'));
assert.equal(manifest.start_url,'./');assert.equal(manifest.scope,'./');
assert.equal(STUDY_CARDS.length,48);
assert.equal(new Set(STUDY_CARDS.map(c=>c.id)).size,STUDY_CARDS.length);
assert.deepEqual([1,2,3].map(s=>STUDY_CARDS.filter(c=>c.subject===s).length),[12,12,24]);
for(const c of STUDY_CARDS){
  for(const key of ['id','title','summary','category','pitfall'])assert.ok(typeof c[key]==='string'&&c[key].trim(),`${c.id}: ${key}`);
  assert.ok(c.points.length>=3&&c.points.every(p=>typeof p==='string'&&p.trim()),c.id);
  assert.ok(c.memory.hook&&c.memory.text&&c.recall.prompt&&c.recall.answer,c.id);
  assert.ok(c.sourceKeys.length>0&&c.sourceKeys.every(k=>STUDY_SOURCES[k]&&new URL(STUDY_SOURCES[k].url).protocol==='https:'),`${c.id}: 출처`);
  if(c.compare)assert.ok(c.compare.headers.length>=2&&c.compare.rows.length>0&&c.compare.rows.every(row=>row.length===c.compare.headers.length),`${c.id}: 비교표`);
}
assert.equal(SUMMARY_NOTES.length,200);
assert.equal(new Set(SUMMARY_NOTES.map(n=>n.id)).size,SUMMARY_NOTES.length);
assert.deepEqual([1,2,3].map(s=>SUMMARY_NOTES.filter(n=>n.subject===s).length),[50,50,100]);
assert.equal(SUMMARY_NOTES.filter(n=>n.deep.length).length,100);
assert.equal(SUMMARY_NOTES.reduce((total,n)=>total+n.deep.length,0),210);
for(const id of Object.keys(NOTE_DEPTH))assert.ok(SUMMARY_NOTES.some(n=>n.id===id),`${id}: 상세 본문 연결`);
for(const s of [1,2,3])assert.equal(CHAPTER_GUIDES[s].length,NOTE_CHAPTERS[s].length,`${s}: 단원 안내`);
for(const n of SUMMARY_NOTES){
  assert.ok(n.title&&n.lead&&NOTE_CHAPTERS[n.subject]?.[n.chapter],`${n.id}: 단원·본문`);
  assert.ok(n.points.length+n.rows.length+n.steps.length+n.formulas.length>0,`${n.id}: 정리 내용`);
  for(const rows of [n.rows,n.steps])assert.ok(rows.every(row=>row.length===2&&row.every(t=>typeof t==='string'&&t.trim())),`${n.id}: 정리표`);
  assert.ok(n.deep.every(row=>row.length===2&&row.every(t=>typeof t==='string'&&t.trim())),`${n.id}: 상세 설명`);
  if(n.code)assert.ok(n.code.text.trim()&&n.code.result.trim(),`${n.id}: R 코드와 결과`);
  assert.ok(n.sourceKeys.length>0&&n.sourceKeys.every(k=>STUDY_SOURCES[k]),`${n.id}: 출처`);
  assert.ok(n.example?.question?.trim()&&n.example.solution.length>0&&n.example.solution.every(t=>typeof t==='string'&&t.trim()),`${n.id}: 예제·풀이`);
}
for(const c of STUDY_CARDS)assert.ok(SUMMARY_NOTES.some(n=>n.id===c.id&&n.subject===c.subject&&n.deep.length>=2),`${c.id}: 관련 요약노트·상세 설명 연결`);
assert.deepEqual(Object.keys(EASY_NOTES).sort(),SUMMARY_NOTES.map(n=>n.id).sort());
for(const n of SUMMARY_NOTES){
  const d=EASY_NOTES[n.id];
  for(const k of ['type','caption','say','exam'])assert.ok(typeof d[k]==='string'&&d[k].trim(),`${n.id}: 그림 설명 ${k}`);
  assert.ok(renderEasyNote(n.id).includes('<figure'),`${n.id}: 도식 렌더링`);
  assert.ok(d.items.every(row=>row.length>=2&&row.every(t=>typeof t==='string'&&t.trim())),`${n.id}: 도식 항목`);
  if(d.type==='matrix')assert.ok(d.items.length===4&&d.columns.length===2&&d.rows.length===2,`${n.id}: 두 축 4분면`);
}
assert.equal(Object.keys(NOTE_ILLUSTRATIONS).length,4);
for(const [id,illustration] of Object.entries(NOTE_ILLUSTRATIONS)){
  assert.ok(SUMMARY_NOTES.some(n=>n.id===id));
  assert.ok(illustration.alt&&illustration.caption&&illustration.footnote&&illustration.steps.length>=3,id);
  assert.ok(illustration.steps.every(row=>row.length===2&&row.every(t=>typeof t==='string'&&t.trim())),id);
  const png=fs.readFileSync('dist/'+illustration.src.slice(2));
  assert.equal(png.readUInt32BE(16),illustration.width,id);
  assert.equal(png.readUInt32BE(20),illustration.height,id);
  assert.ok(renderEasyNote(id).includes('loading="lazy"'),id);
}
const assets=['index.html','app.js','core.js','questions.js','study-guide.js','summary-notes.js','easy-notes.js','expanded-notes.js','detailed-notes.js','note-depth.js','note-illustrations.js','round-supplements.js','images/dikw-story.png','images/crisp-recipe.png','images/model-fit.png','images/confusion-matrix.png','rounds-40-43.js','rounds-44-47.js','styles.css','sw.js','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png'];
const worker=fs.readFileSync('dist/sw.js','utf8');
for(const p of assets){assert.ok(fs.existsSync('dist/'+p));if(p!=='sw.js')assert.ok(worker.includes(`'./${p}'`),`오프라인 캐시 누락: ${p}`);}
console.log('검증 완료: 40~50회 각 50문항(10·10·30) 총550, 주제340+보충210, 요약200·상세210문단·생성그림4·암기48, PWA 캐시 파일');

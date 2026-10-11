import test from 'node:test';
import assert from 'node:assert/strict';
import {QUESTIONS,ROUNDS} from '../dist/questions.js';
import {initialState,createSession,examQuestions,remainingSeconds,recordAttempt,checkSessionAnswer,isDeferredMode,finishSession,validateState,daysLeft} from '../dist/core.js';
test('모든 회차는 두 모드에서 50번까지 저장·재개되고 전체 채점에 포함된다',()=>{
  for(const round of ROUNDS)for(const mode of ['learn','batch']){
    const qs=QUESTIONS.filter(q=>q.round===round.number).sort((a,b)=>a.subject-b.subject);
    const state=initialState();state.active=createSession(qs,mode,`${round.number}회 50문제`);
    state.active.index=49;
    for(const q of qs){state.active.answers[q.id]=q.answer;}
    const restored=validateState(JSON.parse(JSON.stringify(state)));
    assert.equal(restored.active.ids.length,50);
    assert.equal(restored.active.index,49);
    assert.deepEqual(restored.active.ids,state.active.ids);
    const result=finishSession(restored);
    assert.equal(result.total,50);assert.equal(result.correct,50);assert.equal(result.score,100);
    assert.deepEqual(result.subjects.map(s=>s.total),[10,10,30]);
    assert.equal(Object.keys(restored.attempts).length,50);
    assert.equal(restored.active,null);
  }
});
test('모의고사는 중복 없이 10·10·30문제이며 90분 뒤 만료된다',()=>{
  const qs=examQuestions(),s=createSession(qs,'exam','테스트',10000);
  assert.equal(qs.length,50);assert.equal(new Set(qs.map(q=>q.id)).size,50);
  assert.deepEqual([1,2,3].map(i=>qs.filter(q=>q.subject===i).length),[10,10,30]);
  assert.equal(remainingSeconds(s,10000),5400);assert.equal(remainingSeconds(s,5410000),0);assert.equal(remainingSeconds(s,6000000),0);
});
test('총점 60점이어도 과락이면 불합격이며 미응답은 오답이다',()=>{
  const state=initialState(),qs=examQuestions();state.active=createSession(qs,'exam','과락');
  for(const q of qs.filter(q=>q.subject===3))state.active.answers[q.id]=q.answer;
  const result=finishSession(state);assert.equal(result.score,60);assert.equal(result.passed,false);assert.equal(result.subjects[0].percent,0);assert.equal(Object.values(state.attempts).filter(a=>!a.lastCorrect).length,20);assert.equal(finishSession(state),null);
});
test('각 과목 40%를 충족하고 총점 60점이면 합격',()=>{
  const state=initialState(),qs=examQuestions();state.active=createSession(qs,'exam','합격');
  for(const [subject,n] of [[1,4],[2,4],[3,22]])for(const q of qs.filter(q=>q.subject===subject).slice(0,n))state.active.answers[q.id]=q.answer;
  assert.equal(finishSession(state).passed,true);
});
test('학습 즉시 채점은 완료 시 중복 집계되지 않고 정답 복습은 오답 상태를 해제한다',()=>{
  const state=initialState(),q=QUESTIONS[0];state.active=createSession([q],'learn','1문제');
  const wrong=(q.answer+1)%4;state.active.answers[q.id]=wrong;state.active.checked[q.id]=true;recordAttempt(state,q.id,wrong);
  finishSession(state);assert.equal(state.attempts[q.id].seen,1);assert.equal(state.attempts[q.id].lastCorrect,false);
  recordAttempt(state,q.id,q.answer);assert.equal(state.attempts[q.id].lastCorrect,true);assert.equal(state.attempts[q.id].wrong,1);
});
test('백업 왕복은 응답·북마크·진행 중 풀이를 보존하고 잘못된 백업은 거부한다',()=>{
  const state=initialState(),q=QUESTIONS[0];state.active=createSession([q],'learn','이어풀기');state.active.answers[q.id]=q.answer;state.bookmarks=[q.id];recordAttempt(state,q.id,q.answer);
  assert.deepEqual(validateState(JSON.parse(JSON.stringify(state))),state);
  assert.throws(()=>validateState({...state,bookmarks:['unknown']}));
  assert.throws(()=>validateState({...state,active:{...state.active,answers:{[q.id]:99}}}));
  assert.throws(()=>validateState({...state,examDate:'2026-02-31'}));
});
test('D-day는 서울 날짜의 자정을 기준으로 계산한다',()=>{
  assert.equal(daysLeft('2026-10-31',Date.parse('2026-10-11T15:30:00Z')),19);
  assert.equal(daysLeft('2026-10-31',Date.parse('2026-10-11T05:00:00Z')),20);
});

test('한 번에 채점은 제출 전 확인과 기록을 막고 수정한 마지막 답안을 채점한다',()=>{
  const state=initialState(),qs=QUESTIONS.slice(0,3);
  state.active=createSession(qs,'batch','40회 일괄 채점',10000);
  assert.equal(isDeferredMode(state.active.mode),true);
  assert.equal(remainingSeconds(state.active,1_000_000_000),null);
  state.active.answers[qs[0].id]=(qs[0].answer+1)%4;
  assert.equal(checkSessionAnswer(state),false);
  assert.deepEqual(state.active.checked,{});
  assert.deepEqual(state.attempts,{});
  state.active.answers[qs[0].id]=qs[0].answer;
  state.active.answers[qs[1].id]=(qs[1].answer+1)%4;
  const result=finishSession(state,20000);
  assert.equal(result.correct,1);
  assert.equal(result.total,3);
  assert.equal(result.passed,false);
  assert.equal(state.attempts[qs[0].id].seen,1);
  assert.equal(state.attempts[qs[0].id].lastCorrect,true);
  assert.equal(state.attempts[qs[1].id].lastCorrect,false);
  assert.equal(state.attempts[qs[2].id].lastCorrect,false);
  assert.equal(finishSession(state),null);
});

test('문항별 확인은 바로 기록하고 한 문항을 반복 확인해도 중복 집계하지 않는다',()=>{
  const state=initialState(),q=QUESTIONS[0];
  state.active=createSession([q],'learn','즉시 해설',10000);
  assert.equal(checkSessionAnswer(state,11000),false);
  state.active.answers[q.id]=q.answer;
  assert.equal(checkSessionAnswer(state,11000),true);
  assert.equal(checkSessionAnswer(state,12000),false);
  assert.equal(state.active.checked[q.id],true);
  assert.equal(state.attempts[q.id].seen,1);
  finishSession(state,13000);
  assert.equal(state.attempts[q.id].seen,1);
});

test('기존 백업과 새 일괄 채점 답안을 복원하며 제출 전 해설 공개 상태는 거부한다',()=>{
  const old=initialState();delete old.preferredMode;
  assert.equal(validateState(old).preferredMode,'learn');
  const state=initialState(),qs=QUESTIONS.slice(0,2);
  state.preferredMode='batch';state.active=createSession(qs,'batch','이어서 풀기',10000);
  state.active.index=1;state.active.answers[qs[0].id]=qs[0].answer;
  assert.deepEqual(validateState(JSON.parse(JSON.stringify(state))),state);
  assert.throws(()=>validateState({...state,active:{...state.active,checked:{[qs[0].id]:true}}}));
  assert.throws(()=>validateState({...state,preferredMode:'unknown'}));
});

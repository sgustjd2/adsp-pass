import { QUESTIONS } from './questions.js';
export const BY_ID = new Map(QUESTIONS.map(q => [q.id,q]));
export const STORAGE_KEY = 'adsp-pocket:v1';
export const initialState = () => ({version:1, attempts:{}, bookmarks:[], history:[], active:null, examDate:'2026-10-31', fontSize:'normal', preferredMode:'learn'});
export const isDeferredMode = mode => mode==='batch'||mode==='exam';
export function shuffled(items, random=Math.random) {
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
}
export function examQuestions(random=Math.random) {
  return [1,2,3].flatMap(subject => shuffled(QUESTIONS.filter(q=>q.subject===subject),random).slice(0,subject===3?30:10));
}
export function createSession(questions,mode,title,now=Date.now()) {
  return {ids:questions.map(q=>q.id),mode,title,index:0,answers:{},checked:{},startedAt:now,deadline:mode==='exam'?now+90*60*1000:null};
}
export function remainingSeconds(session,now=Date.now()) {
  return session.deadline===null?null:Math.max(0,Math.ceil((session.deadline-now)/1000));
}
export function recordAttempt(state,id,answer,now=Date.now()) {
  const correct=answer===BY_ID.get(id).answer;
  const old=state.attempts[id]??{seen:0,correct:0,wrong:0};
  state.attempts[id]={seen:old.seen+1,correct:old.correct+(correct?1:0),wrong:old.wrong+(correct?0:1),lastCorrect:correct,lastAt:now};
}
export function checkSessionAnswer(state,now=Date.now()) {
  const session=state.active;
  if(!session||isDeferredMode(session.mode))return false;
  const id=session.ids[session.index];
  if(session.answers[id]===undefined||session.checked[id])return false;
  session.checked[id]=true;
  recordAttempt(state,id,session.answers[id],now);
  return true;
}
export function summarize(session) {
  const subjects=[1,2,3].map(subject=>{
    const ids=session.ids.filter(id=>BY_ID.get(id).subject===subject);
    const correct=ids.filter(id=>session.answers[id]===BY_ID.get(id).answer).length;
    return {subject,total:ids.length,correct,percent:ids.length?Math.round(correct/ids.length*100):null};
  });
  const correct=subjects.reduce((sum,p)=>sum+p.correct,0);
  const score=Math.round(correct/session.ids.length*100);
  return {subjects,correct,total:session.ids.length,score,passed:session.mode==='exam'&&score>=60&&subjects.every(p=>p.total>0&&p.correct/p.total>=.4)};
}
export function finishSession(state,now=Date.now()) {
  const session=state.active;
  if(!session)return null;
  for(const id of session.ids){
    if(isDeferredMode(session.mode)||!session.checked[id])recordAttempt(state,id,session.answers[id],now);
  }
  const result={...session,endedAt:now,...summarize(session)};
  state.history.unshift(result);
  state.history=state.history.slice(0,100);
  state.active=null;
  return result;
}
function isObject(value){return value!==null&&typeof value==='object'&&!Array.isArray(value);}
function validNumber(value){return Number.isFinite(value)&&value>=0;}
function validAnswers(answers,ids){return isObject(answers)&&Object.entries(answers).every(([id,n])=>ids.includes(id)&&Number.isInteger(n)&&n>=0&&n<4);}
function validSession(s){
  return isObject(s)&&Array.isArray(s.ids)&&s.ids.length>0&&s.ids.length<=QUESTIONS.length&&new Set(s.ids).size===s.ids.length&&s.ids.every(id=>BY_ID.has(id))&&['learn','review','batch','exam'].includes(s.mode)&&typeof s.title==='string'&&s.title.length<=100&&Number.isInteger(s.index)&&s.index>=0&&s.index<s.ids.length&&validAnswers(s.answers,s.ids)&&isObject(s.checked)&&Object.entries(s.checked).every(([id,b])=>s.ids.includes(id)&&b===true&&Number.isInteger(s.answers[id]))&&(!isDeferredMode(s.mode)||Object.keys(s.checked).length===0)&&validNumber(s.startedAt)&&(s.mode==='exam'?Number.isFinite(s.deadline)&&s.deadline===s.startedAt+5400000:s.deadline===null);
}
export function validateState(value) {
  if(!isObject(value)||value.version!==1)throw new Error('지원하지 않는 백업 형식입니다.');
  if(!isObject(value.attempts)||!Object.entries(value.attempts).every(([id,a])=>BY_ID.has(id)&&isObject(a)&&['seen','correct','wrong'].every(k=>Number.isSafeInteger(a[k])&&a[k]>=0)&&a.seen===a.correct+a.wrong&&typeof a.lastCorrect==='boolean'&&validNumber(a.lastAt)))throw new Error('풀이 기록이 올바르지 않습니다.');
  if(!Array.isArray(value.bookmarks)||value.bookmarks.length>QUESTIONS.length||!value.bookmarks.every(id=>BY_ID.has(id)))throw new Error('북마크가 올바르지 않습니다.');
  if(!Array.isArray(value.history)||value.history.length>100||!value.history.every(r=>validSession(r)&&validNumber(r.endedAt)&&r.endedAt>=r.startedAt))throw new Error('학습 이력이 올바르지 않습니다.');
  if(value.active!==null&&!validSession(value.active))throw new Error('진행 중인 풀이가 올바르지 않습니다.');
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value.examDate)||!Number.isFinite(Date.parse(value.examDate))||new Date(value.examDate).toISOString().slice(0,10)!==value.examDate)throw new Error('시험 날짜가 올바르지 않습니다.');
  if(!['normal','large'].includes(value.fontSize))throw new Error('글자 크기 설정이 올바르지 않습니다.');
  const preferredMode=value.preferredMode??'learn';
  if(!['learn','batch'].includes(preferredMode))throw new Error('풀이 방식 설정이 올바르지 않습니다.');
  return {...initialState(), attempts:value.attempts,bookmarks:[...new Set(value.bookmarks)],history:value.history.map(r=>({...r,...summarize(r)})),active:value.active,examDate:value.examDate,fontSize:value.fontSize,preferredMode};
}
export function stats(state) {
  const attempts=Object.values(state.attempts);
  const seen=attempts.reduce((s,a)=>s+a.seen,0);
  const correct=attempts.reduce((s,a)=>s+a.correct,0);
  return {unique:attempts.length,answered:seen,accuracy:seen?Math.round(correct/seen*100):null,wrong:attempts.filter(a=>!a.lastCorrect).length};
}
export function daysLeft(date,now=Date.now()) {
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(now));
  const get=t=>parts.find(p=>p.type===t).value;
  return Math.round((Date.parse(date+'T00:00:00+09:00')-Date.parse(`${get('year')}-${get('month')}-${get('day')}T00:00:00+09:00`))/86400000);
}

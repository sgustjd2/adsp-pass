import assert from 'node:assert/strict';
const lum=hex=>{const c=hex.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2];};
const pairs=[['본문','#202a42','#ffffff'],['보조 본문','#58647b','#ffffff'],['배경의 보조 본문','#58647b','#f7f8fc'],['버튼','#ffffff','#304f9d'],['영역 설명','#52617d','#eaf0ff'],['배지','#3f5d98','#e8eefd'],['오답','#b7433d','#fcf0ed'],['강조 버튼','#294681','#e0e8ff'],['하단 메뉴','#5f6d87','#ffffff'],['포커스 표시','#315bc5','#ffffff']];
for(const [title,fg,bg] of pairs){const a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert.ok(ratio>=4.5,`${title}: ${ratio}`);console.log(`${title}: ${ratio.toFixed(2)}:1`);}
console.log('주요 텍스트·버튼 10쌍 AA 대비 기준 통과');

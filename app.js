'use strict';

/** 電機探索島：資料依三份使用者提供之學系課程圖及輔系必修科目表整理。 */
const years = {
  1: {
    title:'大一 · 探索起點', subtitle:'FOUNDATION', icon:'✦', tag:'把基礎打好',
    desc:'從數學、物理、計算機與程式開始，踏入電機的第一年。年級課程關聯圖同時列有第一門電路學與邏輯設計。',
    quote:'「我原本以為電機只會接電線，結果第一年先和數學、物理、程式交朋友！」', name:'大一學生 · 小海',
    director:[
      '歡迎上島！大一的微積分、普通物理和程式語言，是理解後續電機課程的起點。先把工具準備好吧。',
      '大一下在附件中已出現電路學與交換電路與邏輯設計。這些概念之後會反覆用上，值得好好練習。'
    ],
    semesters:[
      {name:'上學期',courses:['計算機概論','計算機實習','普通物理','普通物理實驗','程式語言','微積分']},
      {name:'下學期',courses:['普通物理','普通物理實驗','微積分','工程數學','電路學','交換電路與邏輯設計']}
    ]
  },
  2: {
    title:'大二 · 核心啟航', subtitle:'CORE CIRCUITS',icon:'⌁',tag:'建立電機核心',
    desc:'電路、電子、電磁與工程數學逐步串在一起；訊號與系統、機率、資料結構也開始出現在課程地圖中。',
    quote:'「電路學、電子學、電磁學一起來，終於開始看見電機不同領域的連結！」',name:'大二學生 · 阿電',
    director:[
      '到了大二，我們會逐漸建立電路、電子與電磁三大基礎；這些是認識後續各領域的重要語言。',
      '注意！輔系表有註記：電路學與電子學必須依指定學期順序修習，相關規定請依適用年度確認。'
    ],
    semesters:[
      {name:'上學期',courses:['工程數學','電磁學','線性代數','電路學','電子學','電工實驗']},
      {name:'下學期',courses:['電子學','電工實驗','電磁波','訊號與系統','機率學','資料結構','複變函數']}
    ]
  },
  3: {
    title:'大三 · 領域分岔',subtitle:'SPECIALIZATION',icon:'✳',tag:'探索專業方向',
    desc:'進一步接觸自動控制、電機機械、通訊工程與電子電路等內容，開始思考自己想深入探索的電機領域。',
    quote:'「開始覺得每個領域都很有趣，是時候找出最想深入的一條路了！」',name:'大三學生 · 芯芯',
    director:[
      '大三的課程圖列出了自動控制、電機機械與通訊工程等科目。這一年很適合觀察自己的興趣。',
      '提醒：兩份附件對六項核心課程要求寫法不同，一份標「六選三」，另一份標「六選四」。本網站不代替正式修課規定。'
    ],
    semesters:[
      {name:'上學期',courses:['電子學','電工實驗','近代物理','自動控制','電機機械','通訊工程']},
      {name:'下學期',courses:['電子電路','電工實驗']}
    ],
    note:'原年級圖在大三下另標示「六選四（必選）」；另一份核心課程圖則為「六選三（必選）」，需依適用年度核對。'
  },
  4: {
    title:'大四 · 航向未來',subtitle:'YOUR DIRECTION',icon:'✧',tag:'選定你的航線',
    desc:'從課程圖列出的六大領域看見不同發展方向，將先前學到的知識連結到自己感興趣的專業主題。',
    quote:'「四年像一趟航海旅行，我終於比較清楚自己的方向，也知道還有好多值得學的事！」',name:'大四學生 · 小航',
    director:[
      '來到最後一座島，附件列出通訊與訊號處理、控制、固態電子、電力與電子電路、電波、資訊科技六個領域。',
      '想選研究、就業或繼續升學的方向？先比較六個領域的關注主題，再依正式課表規劃選修。'
    ],
    semesters:[{name:'年級圖列示',courses:['電工實驗']}],
    note:'年級圖同時列出六大專業領域，但未提供各領域完整修課清單，因此本頁不自行新增正式課程。'
  }
};

const domains = [
  {name:'通訊與訊號處理',icon:'≋',id:'01',color:'#357c9f',bg:'#e1f0f9',lead:'讓訊息穿越距離，從雜訊中找到訊號。',description:'研究訊息如何表示、傳遞、接收與分析；可先從訊號與系統、通訊工程理解基礎概念。',keywords:['訊號與系統','通訊工程'],note:'從波形、系統到訊息傳遞，認識現代通訊背後的觀念。'},
  {name:'控制',icon:'⌘',id:'02',color:'#a07a49',bg:'#faf0d8',lead:'把回饋變成行動，讓系統依目標運作。',description:'關注動態系統、回授與控制方法；可從自動控制、電機機械延伸探索。',keywords:['自動控制','電機機械'],note:'當系統會感測、判斷並調整，就是控制思維開始發揮作用的地方。'},
  {name:'固態電子',icon:'◇',id:'03',color:'#8b70b7',bg:'#eee8f9',lead:'從材料與元件看懂晶片的微小世界。',description:'關注半導體材料、元件物理與電子特性。核心課程圖另列半導體物理。',keywords:['半導體物理','電子學'],note:'如果好奇電晶體如何工作，可從元件和材料的角度深入研究。'},
  {name:'電力與電子電路',icon:'ϟ',id:'04',color:'#c17f56',bg:'#fff0df',lead:'理解電路，讓能量與訊號可靠運作。',description:'可從電路學、電子學與電子電路出發，理解電路分析、設計及相關應用。',keywords:['電路學','電子學','電子電路'],note:'這條路線把你熟悉的電壓、電流與元件分析連成更大的系統。'},
  {name:'電波',icon:'◉',id:'05',color:'#369a85',bg:'#e0f5e9',lead:'從電磁場到波的傳播，探索看不見的世界。',description:'關注電磁波與相關現象，可先從電磁學、電磁波建立理解。',keywords:['電磁學','電磁波'],note:'從看不見的電磁場出發，學習如何用模型理解波的行為。'},
  {name:'資訊科技',icon:'{ }',id:'06',color:'#5582a3',bg:'#e6f0f9',lead:'讓邏輯與程式，成為解決問題的工具。',description:'聚焦運算、程式與資料處理；可由程式語言、資料結構及邏輯設計開始探索。',keywords:['程式語言','資料結構','交換電路與邏輯設計'],note:'把抽象邏輯變成程式或數位系統，是這個方向迷人的地方。'}
];

const minorCourses = [
  {name:'程式設計',code:'B5301M33',credit:3,when:'—'},
  {name:'電磁波',code:'B5302P49',credit:3,when:'—'},
  {name:'電磁學',code:'B5302P50',credit:3,when:'—'},
  {name:'電路學',code:'B5311P48',credit:3,when:'一下'},
  {name:'電子學',code:'B5312P17',credit:3,when:'二上'},
  {name:'電子學',code:'B5322P17',credit:3,when:'二下'},
  {name:'電路學',code:'B5322P48',credit:3,when:'二上'},
  {name:'電子學',code:'B5333P17',credit:3,when:'三上'},
  {name:'工程數學(Ⅰ)',code:'B530108U',credit:3,when:'非授予工學士者加修'},
  {name:'工程數學(Ⅱ)',code:'B530208V',credit:3,when:'非授予工學士者加修'}
];

const courseExplainers = {
  '計算機概論':'建立計算機與資訊系統的入門認識；具體教學範圍請參考當年度授課大綱。',
  '計算機實習':'透過實作熟悉計算機工具，是把概念轉換為實際操作的起點。',
  '普通物理':'以物理模型理解自然現象，為後續電磁學與電子電路相關主題打底。',
  '普通物理實驗':'從觀察、測量與實驗驗證物理概念，練習記錄和分析。',
  '程式語言':'學習用程式表達邏輯、處理資料並解決問題。',
  '程式設計':'透過程式邏輯與實作，練習將問題拆解為可執行的步驟。',
  '微積分':'透過極限、微分與積分描述變化，支援後續工程數學與系統分析。',
  '工程數學':'運用微分方程等數學工具，描述與分析工程問題。',
  '工程數學(Ⅰ)':'工程數學系列課程之一；輔系表為特定學位背景加修項目。',
  '工程數學(Ⅱ)':'工程數學系列課程之二；輔系表為特定學位背景加修項目。',
  '電路學':'研究電壓、電流與電路元件的關係，理解如何分析電路。',
  '交換電路與邏輯設計':'建立布林邏輯、數位電路及相關設計觀念。',
  '電磁學':'研究電場、磁場及其相互關係，是電波領域的重要基礎。',
  '線性代數':'使用向量與矩陣描述線性關係，為多種工程分析工具打底。',
  '電子學':'認識電子元件與電路如何工作，為電子電路與相關領域建立基礎。',
  '電工實驗':'把課堂中的電機觀念帶入量測與實作，練習操作和分析。',
  '電磁波':'從波動與電磁概念出發，理解電磁波的特性與傳播。',
  '訊號與系統':'研究訊號及系統的表示與分析，是通訊與控制的重要共同語言。',
  '機率學':'理解隨機性及機率模型，能支援訊號與資料分析等領域。',
  '資料結構':'學習組織和處理資料的方式，增進程式設計能力。',
  '複變函數':'以複數與複變函數為工具，理解更進階的數學分析。',
  '近代物理':'接觸經典物理以外的觀念；實際主題以授課大綱為準。',
  '自動控制':'研究如何利用控制方法與回授，讓系統依預期目標運作。',
  '電機機械':'理解與電能、機械能轉換相關的系統及設備。',
  '通訊工程':'認識資訊如何透過通訊系統傳送與接收。',
  '電子電路':'延伸元件和電路分析，探索更完整的電子電路設計。',
  '半導體物理':'從物理角度理解半導體材料與元件現象。'
};

let selectedYear = 1;
let talkNumber = 0;
let timeIndex = 0;
const timeModes = [{name:'day',label:'白天',icon:'☀'},{name:'dusk',label:'黃昏',icon:'◕'},{name:'night',label:'夜晚',icon:'☾'}];
let visited = readVisits();
let toastTimer;

function readVisits(){try{const d=JSON.parse(localStorage.getItem('ntou-ee-island-visits')||'{}');return d&&typeof d==='object'&&!Array.isArray(d)?d:{};}catch{return {};}}
function saveVisits(){try{localStorage.setItem('ntou-ee-island-visits',JSON.stringify(visited));}catch{/* storage not available */}}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
const $ = id=>document.getElementById(id);
const sf=(n)=>Number(n).toFixed(0);

// 完全原創、免外部圖像素材的 SVG 迷你島嶼場景。
function poly(cx,cy,rx,ry,drop=0){return [[cx,cy-ry+drop],[cx+rx,cy-ry*.51+drop],[cx+rx,cy+ry*.51+drop],[cx,cy+ry+drop],[cx-rx,cy+ry*.51+drop],[cx-rx,cy-ry*.51+drop]].map(p=>p.join(',')).join(' ');}
function tree(x,y,k=1){return `<g class="tiny-tree" transform="translate(${x} ${y}) scale(${k})"><ellipse cy="10" rx="15" ry="5" fill="#547d61" opacity=".2"/><path d="M-3 5V-24H3V5" fill="#916e53"/><path d="M-20 -18Q-26 -33 -9 -41Q-7 -57 9 -51Q27 -48 23 -32Q33 -19 15 -12Q2 -4 -13 -13Z" fill="#499f83"/><path d="M-13 -27Q-13 -43 -1 -45" stroke="#a2d6a3" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;}
function campusBuilding(cx,cy,style){
  const palettes=[['#fef4dc','#8caab7','#edb874','#f8d392'],['#e2ebf1','#7e9fc4','#a6cad9','#bee7e9'],['#f2e9fa','#9784b6','#c4aadf','#bca8e0'],['#f9e8d4','#af9b87','#eac27a','#f9e5b3']];
  const p=palettes[style-1];
  let motif = '';
  if(style===1)motif='<path d="M-5 -48L-5 -65L6 -65L6 -48" stroke="#5b8b8d" stroke-width="4" fill="none"/><circle cy="-71" r="6" fill="#f4b56c"/>';
  if(style===2)motif='<path d="M-36 -70v-17m0 0 11 7m-11 -7-9 7" stroke="#5c91b3" stroke-width="3" fill="none"/><path d="m25 -54-9 12h9l-5 13 17-20h-10l7-10z" fill="#f7d272"/>';
  if(style===3)motif='<path d="M-19 -59h45v18h-45z" fill="#c3f0e2" stroke="#7860a1" stroke-width="3"/><circle cx="-6" cy="-51" r="4" fill="#715d96"/><circle cx="12" cy="-51" r="4" fill="#715d96"/>';
  if(style===4)motif='<path d="M-5 -75v-23" stroke="#936f5e" stroke-width="3"/><path d="M-5 -98Q16 -92 22 -98v17Q6 -75 -5 -80z" fill="#f1b963"/><path d="m-5 -58 15 8-15 8-15-8z" fill="#ffeed0"/>';
  return `<g class="campus-building" transform="translate(${cx} ${cy})"><ellipse cx="0" cy="11" rx="73" ry="24" fill="#376b65" opacity=".15"/><path d="M-60 -31L6 -51L63 -31L-4 -9Z" fill="${p[3]}"/><path d="M-60 -31L-4 -9V16L-60 -5Z" fill="${p[1]}"/><path d="M-4 -9L63 -31V-5L-4 16Z" fill="${p[2]}"/><path d="M-60 -42L-4 -60L63 -42L-4 -22Z" fill="${p[3]}" stroke="#f4f8de" stroke-width="2"/><path d="M-60 -42L-4 -22V-2L-60 -23Z" fill="${p[1]}"/><path d="M-4 -22L63 -42V-23L-4 -2Z" fill="${p[0]}"/><path d="M-60 -58L-4 -77L63 -58L-4 -38Z" fill="${p[3]}" stroke="#f9f6e7" stroke-width="2"/><path d="M-60 -58L-4 -38V-22L-60 -42Z" fill="${p[1]}"/><path d="M-4 -38L63 -58V-42L-4 -22Z" fill="${p[0]}"/><path d="M-28 -18v-16l14 5v17Z" fill="#4d9aa2"/><path d="M16 -35v-11l14-4v11Zm25 -7v-11l13-4v11Z" fill="#669db2"/><path d="M20 -2v-16l22-8v16Z" fill="#5a918e"/><path d="M-36 -56L-4 -67L26 -56L-5 -46Z" fill="#fff9e8" opacity=".65"/>${motif}</g>`;
}
function avatar(x,y,year){const c=['#ee9d71','#81a4da','#b893c7','#d4a75e'][year-1];const hair=['#544b4a','#433f3c','#74524b','#344c5b'][year-1];return `<g class="student-avatar" transform="translate(${x} ${y})"><ellipse cx="0" cy="7" rx="24" ry="9" fill="#315c56" opacity=".2"/><path d="M-9 -7L-15 10M9 -7L15 10" stroke="#3d6474" stroke-width="7" stroke-linecap="round"/><path d="M-16 -36Q0 -43 17 -36L20 -9Q-1 -1 -21 -9Z" fill="${c}" stroke="#f7ebd5" stroke-width="1"/><path d="M-16 -31L-25 -17M15 -31L26 -22" stroke="#e9b68c" stroke-width="7" stroke-linecap="round"/><circle cx="0" cy="-55" r="21" fill="#f3c59f"/><path d="M-21 -54Q-22 -84 6 -79Q28 -75 22 -52Q10 -67 -7 -66Q-12 -56 -21 -54Z" fill="${hair}"/><circle cx="-7" cy="-52" r="2" fill="#466063"/><circle cx="8" cy="-52" r="2" fill="#466063"/><path d="M-4 -42Q1 -38 6 -42" stroke="#b57c72" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M-7 -35L-1 -26L6 -36" stroke="#fff2d8" stroke-width="3" fill="none"/><rect x="-30" y="-6" rx="4" width="20" height="11" fill="#fff8e9" stroke="#81bcb4" stroke-width="2"/></g>`;}
function createIsland(year,cx,cy){
  const c=[null,{top:'#b6ddab',edge:'#689d7f',sand:'#f0e8bc',flower:'#ffc6a0'}, {top:'#a6d8c5',edge:'#659f93',sand:'#f0e5b3',flower:'#f8e0a1'}, {top:'#b9d6b5',edge:'#799e82',sand:'#e9e3af',flower:'#ffc6c6'}, {top:'#cfddb3',edge:'#9db089',sand:'#f5deaa',flower:'#e9c3ef'}][year];
  const rx=181,ry=97;
  const speckles = Array.from({length:17},(_,i)=>{const x=cx+Math.sin(i*2.4+year)*122, y=cy+Math.cos(i*1.9+year)*35;return `<circle cx="${sf(x)}" cy="${sf(y)}" r="${i%3===0?3:1.8}" fill="${i%2?c.flower:'#fff7d8'}" opacity=".8"/>`;}).join('');
  return `<g class="island-node ${year===selectedYear?'active':''}" data-year="${year}" role="button" tabindex="0" aria-label="前往大${['','一','二','三','四'][year]}島，${years[year].tag}">
   <title>${years[year].title}</title>
   <ellipse class="selection-halo" cx="${cx}" cy="${cy+31}" rx="205" ry="124" fill="none" stroke="#f7e4a0" stroke-width="5" stroke-dasharray="13 12" opacity="0"/>
   <ellipse cx="${cx}" cy="${cy+28}" rx="192" ry="106" fill="#43868d" opacity=".16"/>
   <polygon points="${poly(cx,cy,rx,ry,26)}" fill="${c.edge}"/><polygon points="${poly(cx,cy,rx,ry,18)}" fill="${c.sand}"/>
   <path d="M${cx-rx} ${cy-ry*.51+18}L${cx} ${cy+ry+18}L${cx} ${cy+ry+26}L${cx-rx} ${cy-ry*.51+26}Z" fill="#cfb986" opacity=".5"/>
   <polygon class="land-outline" points="${poly(cx,cy,rx,ry)}" fill="${c.top}" stroke="#e6f3b7" stroke-width="4"/>
   <path d="M${cx-130} ${cy+33}Q${cx-25} ${cy+2} ${cx+125} ${cy+15}" fill="none" stroke="#e7efca" stroke-width="14" opacity=".38" stroke-linecap="round"/>
   ${speckles}
   ${tree(cx-131,cy-25,.95)} ${tree(cx+112,cy-53,.75)} ${tree(cx-142,cy+17,.55)}
   ${campusBuilding(cx-32,cy-20,year)}
   ${avatar(cx+92,cy+8,year)}
   <text class="island-title" text-anchor="middle" x="${cx}" y="${cy+59}">大${['','一','二','三','四'][year]} · ${['','探索起點','核心啟航','領域分岔','航向未來'][year]}</text>
   <text class="island-sub" text-anchor="middle" x="${cx}" y="${cy+78}">${years[year].subtitle}</text>
   <circle cx="${cx+155}" cy="${cy+19}" r="17" fill="#fffbea" stroke="#80a69b" stroke-width="3"/><text x="${cx+155}" y="${cy+24}" text-anchor="middle" font-size="14" font-weight="900" fill="#488c88">↗</text>
  </g>`;
}
function directorStation(){
 return `<g class="director-node" id="svgDirector" role="button" tabindex="0" aria-label="和系主任聊聊">
 <title>系主任導覽站</title><ellipse cx="570" cy="371" rx="71" ry="27" fill="#548d8e" opacity=".22"/>
 <path d="M505 346L570 322L634 346L571 371Z" fill="#f1d9a5" stroke="#ffecc9" stroke-width="4"/><path d="M505 346L571 371V383L505 358Z" fill="#b7a37b"/><path d="M571 371L634 346V358L571 383Z" fill="#b5b886"/>
 <path d="M520 329L533 320L551 330L539 337Z" fill="#fff8ea"/><path d="M534 320V303" stroke="#4a8078" stroke-width="3"/>
 <g class="director-avatar" transform="translate(573 338)"><path d="M-14 -3l-10 18M10 -3l13 18" stroke="#4a6573" stroke-width="7" stroke-linecap="round"/><path d="M-21 -35Q1 -43 21 -35L18 0H-18Z" fill="#284f76"/><path d="M-19 -31L-30 -14M18 -30L29 -14" stroke="#e1b48f" stroke-width="7" stroke-linecap="round"/><circle cy="-56" r="23" fill="#eebf98"/><path d="M-23 -59Q-19 -86 2 -81Q24 -85 24 -55L14 -68Q-4 -60 -23 -59Z" fill="#56626c"/><circle cx="-8" cy="-54" r="9" fill="none" stroke="#295566" stroke-width="3"/><circle cx="11" cy="-54" r="9" fill="none" stroke="#295566" stroke-width="3"/><path d="M1 -54H3" stroke="#295566" stroke-width="3"/><path d="M-1 -42Q3 -38 7 -42" stroke="#aa7864" stroke-width="2" fill="none"/><path d="M-8 -34L0 -24L7 -34" stroke="#fcf4e8" stroke-width="4"/></g>
 <g transform="translate(640 296)"><rect x="-12" y="-24" width="125" height="35" rx="15" fill="#fffcef" stroke="#bbd6c7" stroke-width="2"/><path d="m3 10-10 15 22-14" fill="#fffcef"/><text x="49" y="-2" text-anchor="middle" fill="#427b78" font-weight="900" font-size="16">系主任導覽站</text></g></g>`;
}
function mapDeco(){
 const wave=(x,y,scale=1)=>`<path class="little-wave" d="M${x} ${y}q18 -11 36 0q18 11 36 0" fill="none" stroke="#edfdf6" stroke-width="3" opacity=".65" transform="translate(0 0) scale(${scale})"/>`;
 const dots=Array.from({length:33},(_,i)=>{const x=(i*137+47)%1120+25,y=(i*183+89)%630+15;return `<circle cx="${x}" cy="${y}" r="${i%4===0?3:1.4}" fill="#fffdf0" opacity=".3"/>`;}).join('');
 return `<defs><filter id="softGlow"><feGaussianBlur stdDeviation="6"/></filter></defs>${dots}
 ${wave(53,95)}${wave(882,100)}${wave(49,550)}${wave(1003,509)}${wave(180,591)}${wave(922,621)}
 <g class="water-fish" transform="translate(86 430) rotate(-11)"><path d="m0 0 23-13q14 15 0 30z" fill="#89cdd0"/><path d="M24 0q19-16 43 0-23 17-43 0" fill="#d8f7e7"/><circle cx="54" cy="-2" r="2" fill="#568b9a"/></g>
 <g class="water-fish" transform="translate(1047 171) scale(.6)"><path d="m0 0 23-13q14 15 0 30z" fill="#87c9cf"/><path d="M24 0q19-16 43 0-23 17-43 0" fill="#e9faf2"/></g>
 <g opacity=".6" stroke="#fbfff5" stroke-width="3" fill="none" stroke-linecap="round"><path d="M92 79q10-10 20 0q10-10 20 0"/><path d="M887 60q9-7 17 0q9-7 17 0"/></g>
 <g opacity=".7"><circle cx="1035" cy="84" r="33" fill="#fff4cd"/><circle cx="1035" cy="84" r="47" fill="#fff4cd" opacity=".2"/></g>`;
}
function buildMap(){
 $('worldMap').innerHTML=mapDeco()+
  `<path class="bridge-sub" d="M360 260Q414 208 433 204"/><path class="bridge-sub" d="M738 208Q796 228 823 264"/><path class="bridge-sub" d="M887 409Q832 461 746 477"/><path class="bridge-sub" d="M396 472Q327 421 319 399"/><path class="bridge-sub" d="M570 288V397"/>
  <path class="bridge" d="M360 260Q414 208 433 204"/><path class="bridge" d="M738 208Q796 228 823 264"/><path class="bridge" d="M887 409Q832 461 746 477"/><path class="bridge" d="M396 472Q327 421 319 399"/><path class="bridge" d="M570 288V397"/>`+
  createIsland(1,210,330)+createIsland(2,570,180)+createIsland(3,935,330)+createIsland(4,570,510)+directorStation();
 $('worldMap').addEventListener('click',e=>{
   const island=e.target.closest('[data-year]');
   if(island){chooseYear(Number(island.dataset.year));return;}
   if(e.target.closest('#svgDirector'))openDirector();
 });
 $('worldMap').addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const el=e.target.closest('[data-year],#svgDirector');if(!el)return;e.preventDefault();if(el.dataset.year)chooseYear(Number(el.dataset.year));else openDirector();});
}
function courseKey(year,semester,index){return `${year}:${semester}:${index}`;}
function yearItems(year){return years[year].semesters.flatMap((s,si)=>s.courses.map((name,ci)=>({name,semester:s.name,year,si,ci,key:courseKey(year,si,ci)})));}
function progressFor(year){const list=yearItems(year);return {total:list.length,done:list.filter(x=>visited[x.key]).length};}
function renderInspector(){
 const y=years[selectedYear],progress=progressFor(selectedYear);
 $('inspectorKicker').textContent=`YEAR 0${selectedYear} / ${y.subtitle}`;
 $('inspector-title').textContent=y.title;
 $('yearCounter').innerHTML=`0${selectedYear}<span>/04</span>`;
 $('inspectorDesc').textContent=y.desc;
 $('studentQuote').textContent=y.quote;
 $('studentName').textContent=y.name;
 $('progressText').textContent=`${progress.done} / ${progress.total}`;
 $('progressBar').style.width=`${progress.total?progress.done/progress.total*100:0}%`;
 $('courseCount').textContent=`${progress.total} 項課程標示`;
 $('yearCourseList').innerHTML=y.semesters.map((s,si)=>`<div class="semester-block"><div class="semester-label">${escapeHTML(s.name)}</div><div class="course-chips">${s.courses.map((c,ci)=>{const key=courseKey(selectedYear,si,ci);return `<button type="button" class="course-chip ${visited[key]?'visited':''}" data-course-year="${selectedYear}" data-course-sem="${si}" data-course-index="${ci}" title="查看課程介紹並記錄探索足跡">${visited[key]?'<span class="check">✓</span>':''}${escapeHTML(c)}</button>`;}).join('')}</div></div>`).join('')+(y.note?`<p class="semester-empty">※ ${escapeHTML(y.note)}</p>`:'')+(selectedYear===4?`<button type="button" class="course-chip" id="domainJump" style="margin-top:12px">探索六大領域 ↗</button>`:'');
 $('mapStatus').textContent=y.title;
 $('directorLine').textContent=y.director[talkNumber%y.director.length];
 $('nextTalk').innerHTML=talkNumber+1<y.director.length?'再聽一句 <span aria-hidden="true">→</span>':'下一站 <span aria-hidden="true">→</span>';
 document.querySelectorAll('[data-choose-year]').forEach(btn=>{const active=Number(btn.dataset.chooseYear)===selectedYear;btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));});
 document.querySelectorAll('#worldMap .island-node').forEach(g=>g.classList.toggle('active',Number(g.dataset.year)===selectedYear));
}
function chooseYear(year,{scroll=false}={}){
 selectedYear=year;talkNumber=0;renderInspector();
 if(scroll)document.getElementById('explore').scrollIntoView({behavior:'smooth',block:'start'});
 const scroller=$('mapScroller');
 if(scroller.scrollWidth>scroller.clientWidth){const approxX={1:.0,2:.30,3:1,4:.37}[year];scroller.scrollTo({left:(scroller.scrollWidth-scroller.clientWidth)*approxX,behavior:'smooth'});}
}
function openInfo(kicker,title,body,metadata){$('dialogKicker').textContent=kicker;$('dialogTitle').textContent=title;$('dialogBody').textContent=body;$('dialogMeta').replaceChildren();for(const m of metadata||[]){const tag=document.createElement('span');tag.textContent=m;$('dialogMeta').append(tag);}showDialog($('infoDialog'));}
function showDialog(el){if(!el.open)el.showModal();}
function openCourse(year,si,ci){const semester=years[year].semesters[si];if(!semester)return;const name=semester.courses[ci];if(!name)return;const key=courseKey(year,si,ci);if(!visited[key]){visited[key]=true;saveVisits();toast('✦ 解鎖一個課程探索足跡！');}if(selectedYear===year)renderInspector();openInfo('COURSE / 課程探索',name,courseExplainers[name]||'此科目列於上傳的課程關聯圖。詳細內容、學分及修課要求請依學校正式授課大綱確認。',[`大${['','一','二','三','四'][year]} · ${semester.name}`,'導覽性簡介・非正式授課大綱','已記錄探索足跡 ✓']);}
function openDirector(){openInfo('HELLO / 主任導覽','系主任的島嶼小講堂',`歡迎來到海大電機探索島！這四座島代表大一到大四：大一建立數理與程式基礎，大二學習電路、電子、電磁等核心課程，大三探索控制、通訊與電機機械等方向，大四走向六大專業領域。你可以點選島上的學生聽他們分享，也能用「下一站」循序導覽。\n\n本頁依三份上傳文件整理；正式修課規定仍要核對適用入學年度。`,['大一 → 大二 → 大三 → 大四','點擊主任導覽站可隨時回來']);}
function showDomain(d){chooseYear(4);openInfo(`PATH ${d.id} / 六大領域`,d.name,d.description+'\n\n'+d.note,[`關聯課程示例：${d.keywords.join('、')}`,'關聯課程為學習導覽示意，非官方規定']);}
function renderDomains(){$('domainGrid').innerHTML=domains.map((d,i)=>`<button type="button" class="domain-card" data-domain="${i}" style="--domain-color:${d.color};--domain-bg:${d.bg}"><div class="domain-head"><div class="domain-icon" aria-hidden="true">${escapeHTML(d.icon)}</div><span class="domain-id">PATH ${d.id}</span></div><div class="domain-name">${escapeHTML(d.name)}領域</div><p class="domain-description">${escapeHTML(d.lead)}</p><div class="domain-foot"><span>點擊探索這個方向</span><span class="domain-arrow" aria-hidden="true">↗</span></div></button>`).join('');}
function renderMinorTable(){
 $('minorTableHolder').innerHTML=`<table class="minor-table"><thead><tr><th>課程名稱</th><th>課程代碼</th><th>學分</th><th>學期／條件</th></tr></thead><tbody>${minorCourses.map((x,i)=>`<tr><td><button type="button" data-minor-course="${i}">${escapeHTML(x.name)}</button></td><td><small>${escapeHTML(x.code)}</small></td><td>${x.credit}</td><td>${escapeHTML(x.when)}</td></tr>`).join('')}</tbody></table><p class="source-inline">表中前八門為原表主要必修列示；末兩門為非授予工學士者加修的工程數學。</p>`;
}
function allIndexItems(){return [1,2,3,4].flatMap(year=>yearItems(year));}
function renderIndex(){const q=$('courseSearch').value.trim().toLocaleLowerCase('zh-Hant');const year=$('yearFilter').value;const matches=allIndexItems().filter(x=>(year==='all'||x.year===Number(year))&&(!q||x.name.toLocaleLowerCase('zh-Hant').includes(q)));$('courseIndexResults').innerHTML=matches.length?matches.map(x=>`<button class="search-result" type="button" data-index-year="${x.year}" data-index-sem="${x.si}" data-index-course="${x.ci}"><strong>${escapeHTML(x.name)}</strong><span>大${['','一','二','三','四'][x.year]} · ${escapeHTML(x.semester)} ${visited[x.key]?'✓':''}</span></button>`).join(''):'<p class="semester-empty">沒有找到相符課程，試試其他關鍵字。</p>';}
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2400);}
function bindEvents(){
 document.querySelectorAll('[data-choose-year]').forEach(btn=>btn.addEventListener('click',()=>chooseYear(Number(btn.dataset.chooseYear))));
 $('nextYear').addEventListener('click',()=>chooseYear(selectedYear%4+1));
 $('nextTalk').addEventListener('click',()=>{if(talkNumber+1<years[selectedYear].director.length){talkNumber++;renderInspector();}else{chooseYear(selectedYear%4+1);}});
 $('directorLaunch').addEventListener('click',openDirector);
 $('timeButton').addEventListener('click',()=>{timeIndex=(timeIndex+1)%timeModes.length;const mode=timeModes[timeIndex];document.body.dataset.time=mode.name;$('timeLabel').textContent=mode.label;$('timeIcon').textContent=mode.icon;toast(`島嶼切換至${mode.label}景色`);});
 $('yearCourseList').addEventListener('click',e=>{const btn=e.target.closest('[data-course-year]');if(btn){openCourse(Number(btn.dataset.courseYear),Number(btn.dataset.courseSem),Number(btn.dataset.courseIndex));return;}if(e.target.closest('#domainJump'))document.getElementById('domains').scrollIntoView({behavior:'smooth'});});
 $('domainGrid').addEventListener('click',e=>{const btn=e.target.closest('[data-domain]');if(btn)showDomain(domains[Number(btn.dataset.domain)]);});
 $('minorExpand').addEventListener('click',()=>{const box=$('minorDetails');box.hidden=!box.hidden;$('minorExpand').setAttribute('aria-expanded',String(!box.hidden));if(!box.hidden)box.scrollIntoView({behavior:'smooth',block:'nearest'});});
 $('minorTableHolder').addEventListener('click',e=>{const b=e.target.closest('[data-minor-course]');if(!b)return;const c=minorCourses[Number(b.dataset.minorCourse)];openInfo('MINOR / 輔系課程',c.name,courseExplainers[c.name]||'此課程列於上傳的輔系必修科目表；修習時程與內容請確認正式規定。',[`課程代碼：${c.code}`,`${c.credit} 學分`,c.when==='—'?'原表未另標註修習學期':`學期／條件：${c.when}`]);});
 $('closeDialog').addEventListener('click',()=>$('infoDialog').close());
 $('dialogDone').addEventListener('click',()=>$('infoDialog').close());
 $('openCourseSearch').addEventListener('click',()=>{renderIndex();showDialog($('indexDialog'));$('courseSearch').focus();});
 $('indexClose').addEventListener('click',()=>$('indexDialog').close());
 $('courseSearch').addEventListener('input',renderIndex);
 $('yearFilter').addEventListener('change',renderIndex);
 $('courseIndexResults').addEventListener('click',e=>{const b=e.target.closest('[data-index-year]');if(!b)return;const y=Number(b.dataset.indexYear),si=Number(b.dataset.indexSem),ci=Number(b.dataset.indexCourse);$('indexDialog').close();chooseYear(y);openCourse(y,si,ci);});
 [$('infoDialog'),$('indexDialog')].forEach(dlg=>dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close();}));
}
function init(){buildMap();renderDomains();renderMinorTable();renderInspector();bindEvents();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();

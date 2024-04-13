import{_ as k,u,o as r,c,b as l,n as m,t as d,F as C,e as x,d as f,f as F,k as T,r as y,g as w,h as b,i as g,w as v,p as S,j as D}from"./index.f28ead6f.js";import{t as E}from"./data.70d20842.js";const R={name:"APP",props:["pattern","startTime"],data(){return{lastTime:0,backgroundColor:["#FF0017","#0091FF","#E3E3DB","#FF00E3","#00A88A","#52A23B","#B58B00","#93908F"],fontColor:["#FFFFFF","#FFFFFF","#93908F","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"],lineHeight:[1.5,2,2.5],textType:[0,1,2],data:[],selectLineHeight:0,selectBackgroundColor:"",selectPattern:{},selectFontColor:"",patternType:[{row:12,number:8,space:1},{row:12,number:29,space:0},{row:12,number:7,space:1},{row:10,number:25,space:0}],selectElementGroup:{},targetElement:""}},methods:{selectElement(t){const e=u();let n=new Date;if(typeof this.selectElementGroup[t]>"u"){this.selectElementGroup[t]=1;let i=this.data[t]==this.targetElement?1:-1;e.eventSeq.push({tag:i,clickTime:n,clickItem:this.data[t],targetItem:this.targetElement,fromStart:n-this.startTime,fromLast:n-this.lastTime}),this.lastTime=n;let s=0,o=0;for(let p in this.selectElementGroup)this.selectElementGroup[p]&&(this.data[p]==this.targetElement?o++:s++);e.tmpAccuracy={wrong:s,right:o,sumWord:this.data.length}}},shuffleArray(t){for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t},dataProcess(t){let e=Math.floor(Math.random()*t.length),n=t[e];t=t.toSpliced(e,1);let i=8;for(let s=0;s<i-1;++s){let o=Math.floor(Math.random()*t.length);t=t.toSpliced(o,1)}t=this.shuffleArray(t);for(let s=0;s<i;++s){let o=Math.floor(Math.random()*(t.length-2*this.selectPattern.number))+this.selectPattern.number;t=t.toSpliced(o,0,n)}return[n,t]}},created(){},mounted(){let t=new Array,e=this.textType[this.pattern.textType];this.selectLineHeight=this.lineHeight[this.pattern.lineHeight],this.selectBackgroundColor=this.backgroundColor[this.pattern.backgroundColor],this.selectFontColor=this.fontColor[this.pattern.backgroundColor],this.lastTime=this.startTime,t=E[e],this.selectPattern=this.patternType[e],[this.targetElement,this.data]=this.dataProcess(t)},watch:{},components:{}},A={style:{width:"100%",height:"100%"}},B={style:{display:"flex","justify-content":"center",height:"100%","padding-top":"calc(0vh)","align-items":"center"}},P=["onClick"],M={key:0};function H(t,e,n,i,s,o){return r(),c("div",A,[l("div",B,[l("div",{style:m({"font-size":"16px",color:s.selectFontColor})},[l("span",null,"TARGET: "+d(s.targetElement),1),l("hr",{style:m({backgroundColor:s.selectFontColor,width:"100%",height:"1px",border:"none",margin:"15px 0px"})},null,4),(r(!0),c(C,null,x(s.selectPattern.row,(p,a)=>(r(),c("div",{key:"row_"+a,style:m({"line-height":s.selectLineHeight})},[(r(!0),c(C,null,x(s.selectPattern.number,(_,h)=>(r(),c("span",{key:"cnt_"+a+"_"+h,style:m({fontWeight:s.selectElementGroup[a*s.selectPattern.number+h]==1?"bolder":"normal",cursor:"pointer"}),onClick:K=>o.selectElement(a*s.selectPattern.number+h)},[f(d(s.data[a*s.selectPattern.number+h]),1),s.selectPattern.space==1?(r(),c("span",M,"\xA0")):F("",!0)],12,P))),128))],4))),128))],4)])])}const I=k(R,[["render",H]]);const j={name:"home_view",data(){return{msgH:null,pattern:[],patternCnt:0,timeCnt:30,timeNote:0,isRelax:!0,timer:null,backgroundColor:["#FF0017","#0091FF","#E3E3DB","#FF00E3","#00A88A","#52A23B","#B58B00","#93908F"],selectBackgroundColor:"#ffffff",startTime:0}},computed:{initSign(){return 1},loadingText(){return"Loading"}},mounted(){const t=u();t.allData.data=[],this.msgH=1,this.pattern=this.patternProcess(),console.log(this.pattern),this.patternCnt=0,this.selectBackgroundColor=this.backgroundColor[this.pattern[this.patternCnt].backgroundColor],this.timeCountDown()},methods:{saveData(){let e=u().allData;T.post("https://formspree.io/f/xqkrgypr",{data:JSON.stringify(e),dataType:"json"}).then(n=>{console.log(n)}).catch(n=>{console.log(n)}),this.$router.push("/end")},shuffleArray(t){for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t},patternProcess(){let t=new Array;for(let e=0;e<8;++e)for(let n=0;n<3;++n)for(let i=0;i<3;++i)t.push({backgroundColor:e,lineHeight:n,textType:i});for(let e=0;e<4;++e){let n=Math.floor(Math.random()*72);t.push(t[n])}return this.shuffleArray(t)},roundSave(t){let e=new Date-this.startTime;const n=u();typeof n.tmpAccuracy>"u"&&(n.tmpAccuracy={right:0,wrong:0,sumWord:0}),typeof n.eventSeq>"u"&&(n.eventSeq=[]),n.allData.data.push({id:n.allData.data.length,startTime:this.startTime,time:e,accuracy:n.tmpAccuracy,pattern:t,eventSeq:n.eventSeq}),n.tmpAccuracy={right:0,wrong:0,sumWord:0},n.eventSeq=[],console.log(n.allData)},nextRound(){this.roundSave(this.pattern[this.patternCnt]),this.patternCnt++,this.patternCnt!=76&&(this.isRelax=!this.isRelax),this.patternCnt==76&&this.saveData(),this.timeCountDown()},nextRoundClick(){this.isRelax?(this.isRelax=!this.isRelax,this.skipRelax()):(this.roundSave(this.pattern[this.patternCnt]),this.patternCnt++,this.patternCnt!=76&&(this.isRelax=!this.isRelax),this.patternCnt==76&&this.saveData(),this.timeCountDown()),event.preventDefault()},timeCountDown(){let t=this.timeCnt;this.timeNote=t,this.timer=setInterval(()=>{t>0?(t--,this.timeNote=t):(clearInterval(this.timer),this.startTest())},1e3)},skipRelax(){clearInterval(this.timer),this.startTest()},startTest(){this.isRelax=!1,this.startTime=new Date}},watch:{patternCnt:{handler(){this.patternCnt<this.pattern.length&&(this.selectBackgroundColor=this.backgroundColor[this.pattern[this.patternCnt].backgroundColor])}}},components:{test:I}},N=t=>(S("data-v-f2ad4443"),t=t(),D(),t),q=["element-loading-text"],G={style:{height:"100%",width:"100%"}},L={key:1,style:{width:"100%",height:"100%",display:"flex","justify-content":"center","flex-direction":"column","padding-top":"calc(0vh)"}},z={style:{"margin-bottom":"10px","font-size":"40px",color:"white"}},W={style:{"margin-bottom":"30px","font-size":"20px",color:"white"}},V=N(()=>l("div",{style:{width:"100%",display:"flex","justify-content":"center"}},[l("div",{class:"cross"})],-1)),J={style:{position:"absolute",right:"10px",bottom:"20px"}};function O(t,e,n,i,s,o){const p=y("test"),a=y("el-button"),_=w("loading");return b((r(),c("div",{class:"common-layout",style:m({width:"100%",height:"100vh",backgroundColor:s.isRelax?" #797775":s.selectBackgroundColor}),"element-loading-text":o.loadingText,"element-loading-background":"rgba(0, 0, 0, 0.8)"},[l("div",G,[s.isRelax?(r(),c("div",L,[l("div",z,"\u7B2C "+d(s.patternCnt+1)+" \u8F6E",1),l("div",W,"\u4F11\u606F "+d(s.timeNote)+" \u79D2",1),V])):(r(),g(p,{key:0,pattern:s.pattern[s.patternCnt],startTime:s.startTime},null,8,["pattern","startTime"]))]),l("div",J,[!s.isRelax&&s.patternCnt<75?(r(),g(a,{key:0,onClick:e[0]||(e[0]=h=>o.nextRound()),color:"#797775"},{default:v(()=>[f("\u4E0B\u4E00\u8F6E")]),_:1})):F("",!0),!s.isRelax&&s.patternCnt==75?(r(),g(a,{key:1,onClick:e[1]||(e[1]=h=>o.nextRound()),color:"#797775"},{default:v(()=>[f("\u7ED3\u675F\u5B9E\u9A8C")]),_:1})):F("",!0)])],12,q)),[[_,!o.initSign]])}const X=k(j,[["render",O],["__scopeId","data-v-f2ad4443"]]);export{X as default};
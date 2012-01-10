// test

for(i = 0; i < lunarInfo.length; i++) {

//	document.write( lunarInfo[i] + ',<br >');

}


// end of test




/*****************************************************************************
                                    日期计算
*****************************************************************************/

//====================================== 传回农历 y年的总天数
function lYearDays(y) {
   var i, sum = 348;
   for(i=0x8000; i>0x8; i>>=1) {


   	vv = lunarInfo[y-1900] & i;

   //	document.write( vv + ',<br >');

   	sum += (lunarInfo[y-1900] & i)? 1: 0;



	}
   return(sum+leapDays(y));
}

//====================================== 传回农历 y年闰月的天数
function leapDays(y) {
   if(leapMonth(y)) return( (lunarInfo[y-1899]&0xf)==0xf? 30: 29);
   else return(0);
}

//====================================== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
function leapMonth(y) {
   var lm = lunarInfo[y-1900] & 0xf;
   return(lm==0xf?0:lm);
}

//====================================== 传回农历 y年m月的总天数
function monthDays(y,m) {
   return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}


//====================================== 算出农历, 传入日期对象, 传回农历日期对象
//                                       该对象属性有 .year .month .day .isLeap
function Lunar(objDate) {

   var i, leap=0, temp=0;
   var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;

   for(i=1900; i<2100 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }

   if(offset<0) { offset+=temp; i--; }

   this.year = i;

   leap = leapMonth(i); //闰哪个月
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {
      //闰月
      if(leap>0 && i==(leap+1) && this.isLeap==false)
         { --i; this.isLeap = true; temp = leapDays(this.year); }
      else
         { temp = monthDays(this.year, i); }

      //解除闰月
      if(this.isLeap==true && i==(leap+1)) this.isLeap = false;

      offset -= temp;
   }

   if(offset==0 && leap>0 && i==leap+1)
      if(this.isLeap)
         { this.isLeap = false; }
      else
         { this.isLeap = true; --i; }

   if(offset<0){ offset += temp; --i; }

   this.month = i;
   this.day = offset + 1;
}

//==============================传回公历 y年某m+1月的天数
function solarDays(y,m) {
   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}
//============================== 传入 offset 传回干支, 0=甲子
function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12]);
}

//============================== 月历属性
function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {
   this.isToday    = false;
   //公历
   this.sYear      = sYear;   //西元年4位数字
   this.sMonth     = sMonth;  //西元月数字
   this.sDay       = sDay;    //西元日数字
   this.week       = week;    //星期, 1个中文
   //农历
   this.lYear      = lYear;   //西元年4位数字
   this.lMonth     = lMonth;  //农历月数字
   this.lDay       = lDay;    //农历日数字
   this.isLeap     = isLeap;  //是否为农历闰月?
   //八字
   this.cYear      = cYear;   //年柱, 2个中文
   this.cMonth     = cMonth;  //月柱, 2个中文
   this.cDay       = cDay;    //日柱, 2个中文

   this.color      = '';

   this.lunarFestival = ''; //农历节日
   this.solarFestival = ''; //公历节日
   this.solarTerms    = ''; //节气
}

//===== 某年的第n个节气为几日(从0小寒起算)
function sTerm(y,n) {
   var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
   return(offDate.getUTCDate());
}




//============================== 传回月历对象 (y年,m+1月)
/*
功能说明: 传回整个月的日期资料对象

使用方式: OBJ = new calendar(年,零起算月);

OBJ.length      传回当月最大日
OBJ.firstWeek   传回当月一日星期

由 OBJ[日期].属性名称 即可取得各项值

OBJ[日期].isToday  传回是否为今日 true 或 false

其他 OBJ[日期] 属性参见 calElement() 中的注解
*/
function calendar(y,m) {

   var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2, tmp3;
   var cY, cM, cD; //年柱,月柱,日柱
   var lDPOS = new Array(3);
   var n = 0;
   var firstLM = 0;

   sDObj = new Date(y,m,1,0,0,0,0);    //当月一日日期

   this.length    = solarDays(y,m);    //公历当月天数
   this.firstWeek = sDObj.getDay();    //公历当月1日星期几

   ////////年柱 1900年立春後为庚子年(60进制36)
   if(m<2) cY=cyclical(y-1900+36-1);
   else cY=cyclical(y-1900+36);
   var term2=sTerm(y,2); //立春日期

   ////////月柱 1900年1月小寒以前为 丙子月(60进制12)
   var firstNode = sTerm(y,m*2) //传回当月「节」为几日开始
   cM = cyclical((y-1900)*12+m+12);

   //当月一日与 1900/1/1 相差天数
   //1900/1/1与 1970/1/1 相差25567日, 1900/1/1 日柱为甲戌日(60进制10)
   var dayCyclical = Date.UTC(y,m,1,0,0,0,0)/86400000+25567+10;

   for(var i=0;i<this.length;i++) {

      if(lD>lX) {
         sDObj = new Date(y,m,i+1);    //当月一日日期
         lDObj = new Lunar(sDObj);     //农历
         lY    = lDObj.year;           //农历年
         lM    = lDObj.month;          //农历月
         lD    = lDObj.day;            //农历日
         lL    = lDObj.isLeap;         //农历是否闰月
         lX    = lL? leapDays(lY): monthDays(lY,lM); //农历当月最後一天

         if(n==0) firstLM = lM;
         lDPOS[n++] = i-lD+1;
      }

      //依节气调整二月分的年柱, 以立春为界
      if(m==1 && (i+1)==term2) cY=cyclical(y-1900+36);
      //依节气月柱, 以「节」为界
      if((i+1)==firstNode) cM = cyclical((y-1900)*12+m+13);
      //日柱
      cD = cyclical(dayCyclical+i);

      //sYear,sMonth,sDay,week,
      //lYear,lMonth,lDay,isLeap,
      //cYear,cMonth,cDay
      this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                               lY, lM, lD++, lL,
                               cY ,cM, cD );
   }

   //节气
   tmp1=sTerm(y,m*2  )-1;
   tmp2=sTerm(y,m*2+1)-1;
   this[tmp1].solarTerms = solarTerm[m*2];
   this[tmp2].solarTerms = solarTerm[m*2+1];
   if(m==3) this[tmp1].color = 'red'; //清明颜色

   //公历节日
   for(i in sFtv)
      if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            if(Number(RegExp.$2)<=this.length){
              this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
              if(RegExp.$3=='*') this[Number(RegExp.$2)-1].color = 'red';
            }
         }

   //月周节日
   for(i in wFtv)
      if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            tmp1=Number(RegExp.$2);
            tmp2=Number(RegExp.$3);
            if(tmp1<5)
               this[((this.firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
            else {
               tmp1 -= 5;
               tmp3 = (this.firstWeek+this.length-1)%7; //当月最後一天星期?
               this[this.length - tmp3 - 7*tmp1 + tmp2 - (tmp2>tmp3?7:0) - 1 ].solarFestival += RegExp.$5 + ' ';
            }
         }

   //农历节日
   for(i in lFtv)
      if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
         tmp1=Number(RegExp.$1)-firstLM;
         if(tmp1==-11) tmp1=1;
         if(tmp1 >=0 && tmp1<n) {
            tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1;
            if( tmp2 >= 0 && tmp2<this.length && this[tmp2].isLeap!=true) {
               this[tmp2].lunarFestival += RegExp.$4 + ' ';
               if(RegExp.$3=='*') this[tmp2].color = 'red';
            }
         }
      }


   //复活节只出现在3或4月
   if(m==2 || m==3) {
      var estDay = new easter(y);
      if(m == estDay.m)
         this[estDay.d-1].solarFestival = this[estDay.d-1].solarFestival+' 复活节';
   }

   //黑色星期五
   if((this.firstWeek+12)%7==5)
      this[12].solarFestival += '黑色星期五';

   //今日
   if(y==tY && m==tM) this[tD-1].isToday = true;
}

//======================================= 传回该年的复活节(春分後第一次满月周後的第一主日)
function easter(y) {
   var term2=sTerm(y,5); //取得春分日期
   var dayTerm2 = new Date(Date.UTC(y,2,term2,0,0,0,0)); //取得春分的公历日期对象(春分一定出现在3月)
   var lDayTerm2 = new Lunar(dayTerm2); //取得取得春分农历

   if(lDayTerm2.day<15) //取得下个月圆的相差天数
      var lMlen= 15-lDayTerm2.day;
   else
      var lMlen= (lDayTerm2.isLeap? leapDays(y): monthDays(y,lDayTerm2.month)) - lDayTerm2.day + 15;

   //一天等於 1000*60*60*24 = 86400000 毫秒
   var l15 = new Date(dayTerm2.getTime() + 86400000*lMlen ); //求出第一次月圆为公历几日
   var dayEaster = new Date(l15.getTime() + 86400000*( 7-l15.getUTCDay() ) ); //求出下个周日

   this.m = dayEaster.getUTCMonth();
 this.d = dayEaster.getUTCDate();
}

//====================== 中文日期
function cDay(d){
   var s;

   switch (d) {
      case 10:
         s = '初十'; break;
      case 20:
         s = '二十'; break;
         break;
      case 30:
         s = '三十'; break;
         break;
      default :
         s = nStr2[Math.floor(d/10)];
         s += nStr1[d%10];
   }
   return(s);
}

///////////////////////////////////////////////////////////////////////////////

var cld;

function drawCld(SY,SM) {
   var i,sD,s,size;
   cld = new calendar(SY,SM);

   if(SY>1874 && SY<1909) yDisplay = '光绪' + (((SY-1874)==1)?'元':SY-1874);
   if(SY>1908 && SY<1912) yDisplay = '宣统' + (((SY-1908)==1)?'元':SY-1908);
   if(SY>1911 && SY<1950) yDisplay = '民国' + (((SY-1911)==1)?'元':SY-1911);
   if(SY>1949) yDisplay = '建国' + (((SY-1949)==1)?'元':SY-1949);

   document.getElementById("GZ").innerHTML = yDisplay +'年 农历' + cyclical(SY-1900+36) + '年 【'+Animals[(SY-4)%12]+'】';

   document.getElementById("YMBG").innerHTML = "&nbsp;" + SY + "<BR>&nbsp;" + monthName[SM];

   for(i=0;i<42;i++) {

      gObj=document.getElementById('GD'+ i);
      sObj=document.getElementById('SD'+ i);
      lObj=document.getElementById('LD'+ i);


      gObj.className = '';

      sD = i - cld.firstWeek;

      if(sD>-1 && sD<cld.length) { //日期内
         sObj.innerHTML = sD+1;

         if(cld[sD].isToday) gObj.className = 'todayColor'; //今日颜色

         sObj.style.color = cld[sD].color; //国定假日颜色

         if(cld[sD].lDay==1) //显示农历月
            if(cld[sD].isLeap) //闰月
              lObj.innerHTML = '<b>闰'+cld[sD].lMonth+'月' + (leapDays(cld[sD].lYear)==29?'小':'大')+'</b>';
            else //非闰月
              lObj.innerHTML = '<b>'+cld[sD].lMonth+'月' + (monthDays(cld[sD].lYear,cld[sD].lMonth)==29?'小':'大')+'</b>';
         else //显示农历日
            lObj.innerHTML = cDay(cld[sD].lDay);

         s=cld[sD].lunarFestival;
         if(s.length>0) { //农历节日
            if(s.length>6) s = s.substr(0, 4)+'…';
            s = s.fontcolor('red');
         }
         else { //公历节日
            s=cld[sD].solarFestival;
            if(s.length>0) {
               size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?8:4;
               if(s.length>size+2) s = s.substr(0, size)+'…';
               s=(s=='黑色星期五')?s.fontcolor('black'):s.fontcolor('blue');
            }
            else { //廿四节气
               s=cld[sD].solarTerms;
               if(s.length>0) s = s.fontcolor('limegreen');
            }
         }

         if(cld[sD].solarTerms=='清明') s = '清明节'.fontcolor('red');



         if(s.length>0) lObj.innerHTML = s;

      }
      else { //非日期
         sObj.innerHTML = '';
         lObj.innerHTML = '';
      }
   }
}


function changeCld() {
   var y,m;
   y=document.CLD.SY.selectedIndex+1900;
   m=document.CLD.SM.selectedIndex;
   drawCld(y,m);
}

function pushBtm(K) {
   switch (K){
      case 'YU' :
         if(document.CLD.SY.selectedIndex>0) document.CLD.SY.selectedIndex--;
         break;
      case 'YD' :
         if(document.CLD.SY.selectedIndex<200) document.CLD.SY.selectedIndex++;
         break;
      case 'MU' :
         if(document.CLD.SM.selectedIndex>0) {
            document.CLD.SM.selectedIndex--;
         }
         else {
            document.CLD.SM.selectedIndex=11;
            if(document.CLD.SY.selectedIndex>0) document.CLD.SY.selectedIndex--;
         }
         break;
      case 'MD' :
         if(document.CLD.SM.selectedIndex<11) {
            document.CLD.SM.selectedIndex++;
         }
         else {
            document.CLD.SM.selectedIndex=0;
            if(document.CLD.SY.selectedIndex<200) document.CLD.SY.selectedIndex++;
         }
         break;
      default :
         document.CLD.SY.selectedIndex=tY-1900;
         document.CLD.SM.selectedIndex=tM;
   }
   changeCld();

   return false;

}

var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();
//////////////////////////////////////////////////////////////////////////////

var width = "130";
var offsetx = 2;
var offsety = 8;

var x = 0;
var y = 0;
var snow = 0;
var sw = 0;
var cnt = 0;

var dStyle;
//document.onmousemove = mEvn;

//显示详细日期资料
function mOvr(v) {
   var s,festival,spcday;
   var sObj=document.getElementById('SD'+ v);
   var d=sObj.innerHTML-1;

    //sYear,sMonth,sDay,week,
    //lYear,lMonth,lDay,isLeap,
    //cYear,cMonth,cDay

   if(sObj.innerHTML!='') {
      sObj.style.cursor = 's-resize';
      spcday=cld[d].sMonth==3 && cld[d].sDay==3*7?unescape('%20%u6797%u6D35%u8CE2%u7684%u751F%u65E5'):'';

      if(cld[d].solarTerms == '' && cld[d].solarFestival == '' && cld[d].lunarFestival == '' && spcday=='')
         festival = '';
      else
         festival = '<TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 BGCOLOR="#CCFFCC"><TR><TD>'+
         '<FONT COLOR="#000000" STYLE="font-size:9pt;">'+cld[d].solarTerms + ' ' + cld[d].solarFestival + ' ' + cld[d].lunarFestival+' '+spcday+'</FONT></TD>'+
         '</TR></TABLE>';



      s= '<TABLE WIDTH="120" BORDER=0 CELLPADDING="2" CELLSPACING=0 BGCOLOR="#000066" style="opacity:0.8; -moz-opacity:0.8; filter:Alpha(opacity=80)"><TR><TD>' +
         '<TABLE WIDTH=100% BORDER=0 CELLPADDING=0 CELLSPACING=0><TR><TD ALIGN="right"><FONT COLOR="#ffffff" STYLE="font-size:9pt;">'+
         cld[d].sYear+' 年 '+cld[d].sMonth+' 月 '+cld[d].sDay+' 日<br>星期'+cld[d].week+'<br>'+
         '<font color="violet">农历'+(cld[d].isLeap?'闰 ':' ')+cld[d].lMonth+' 月 '+cld[d].lDay+' 日</font><br>'+
         '<font color="yellow">'+cld[d].cYear+'年 '+cld[d].cMonth+'月 '+cld[d].cDay + '日</font>'+
         '</FONT></TD></TR></TABLE>'+ festival +'</TD></TR></TABLE>';

      document.getElementById("detail").innerHTML = s;

      if (snow == 0) {
         dStyle.left = x+offsetx-(width/2);
         dStyle.top = y+offsety;
         dStyle.visibility = "visible";
         snow = 1;
      }
   }
}

//清除详细日期资料
function mOut() {
   if ( cnt >= 1 ) { sw = 0; }
   if ( sw == 0 ) { snow = 0; dStyle.visibility = "hidden";}
   else cnt++;
}

//取得位置
function mEvn(event) {

   if(navName == 'IE') {
      x=event.x;
      y=event.y;
   }
   else {
      x=event.clientX;
      y=event.clientY;
   }


   if (document.body.scrollLeft) x+=document.body.scrollLeft;
   if (document.body.scrollTop) y+=document.body.scrollTop;

   if (snow){
      dStyle.left = x+offsetx-(width/2);
      dStyle.top = y+offsety;
   }
}



function initialize() {
   var key;



   //月历
   dStyle = document.getElementById("detail").style;
   document.CLD.SY.selectedIndex=tY-1900;
   document.CLD.SM.selectedIndex=tM;

//   alert(tY + ' ' +tM);

   drawCld(tY,tM);

}

// test

for(i = 0; i < lunarInfo.length; i++) {

//	document.write( lunarInfo[i] + ',<br >');

}


// end of test




/*****************************************************************************
                                    ���ڼ���
*****************************************************************************/

//====================================== ����ũ�� y���������
function lYearDays(y) {
   var i, sum = 348;
   for(i=0x8000; i>0x8; i>>=1) {


   	vv = lunarInfo[y-1900] & i;

   //	document.write( vv + ',<br >');

   	sum += (lunarInfo[y-1900] & i)? 1: 0;



	}
   return(sum+leapDays(y));
}

//====================================== ����ũ�� y�����µ�����
function leapDays(y) {
   if(leapMonth(y)) return( (lunarInfo[y-1899]&0xf)==0xf? 30: 29);
   else return(0);
}

//====================================== ����ũ�� y�����ĸ��� 1-12 , û�򴫻� 0
function leapMonth(y) {
   var lm = lunarInfo[y-1900] & 0xf;
   return(lm==0xf?0:lm);
}

//====================================== ����ũ�� y��m�µ�������
function monthDays(y,m) {
   return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}


//====================================== ���ũ��, �������ڶ���, ����ũ�����ڶ���
//                                       �ö��������� .year .month .day .isLeap
function Lunar(objDate) {

   var i, leap=0, temp=0;
   var offset   = (Date.UTC(objDate.getFullYear(),objDate.getMonth(),objDate.getDate()) - Date.UTC(1900,0,31))/86400000;

   for(i=1900; i<2100 && offset>0; i++) { temp=lYearDays(i); offset-=temp; }

   if(offset<0) { offset+=temp; i--; }

   this.year = i;

   leap = leapMonth(i); //���ĸ���
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {
      //����
      if(leap>0 && i==(leap+1) && this.isLeap==false)
         { --i; this.isLeap = true; temp = leapDays(this.year); }
      else
         { temp = monthDays(this.year, i); }

      //�������
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

//==============================���ع��� y��ĳm+1�µ�����
function solarDays(y,m) {
   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}
//============================== ���� offset ���ظ�֧, 0=����
function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12]);
}

//============================== ��������
function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {
   this.isToday    = false;
   //����
   this.sYear      = sYear;   //��Ԫ��4λ����
   this.sMonth     = sMonth;  //��Ԫ������
   this.sDay       = sDay;    //��Ԫ������
   this.week       = week;    //����, 1������
   //ũ��
   this.lYear      = lYear;   //��Ԫ��4λ����
   this.lMonth     = lMonth;  //ũ��������
   this.lDay       = lDay;    //ũ��������
   this.isLeap     = isLeap;  //�Ƿ�Ϊũ������?
   //����
   this.cYear      = cYear;   //����, 2������
   this.cMonth     = cMonth;  //����, 2������
   this.cDay       = cDay;    //����, 2������

   this.color      = '';

   this.lunarFestival = ''; //ũ������
   this.solarFestival = ''; //��������
   this.solarTerms    = ''; //����
}

//===== ĳ��ĵ�n������Ϊ����(��0С������)
function sTerm(y,n) {
   var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
   return(offDate.getUTCDate());
}




//============================== ������������ (y��,m+1��)
/*
����˵��: ���������µ��������϶���

ʹ�÷�ʽ: OBJ = new calendar(��,��������);

OBJ.length      ���ص��������
OBJ.firstWeek   ���ص���һ������

�� OBJ[����].�������� ����ȡ�ø���ֵ

OBJ[����].isToday  �����Ƿ�Ϊ���� true �� false

���� OBJ[����] ���Բμ� calElement() �е�ע��
*/
function calendar(y,m) {

   var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2, tmp3;
   var cY, cM, cD; //����,����,����
   var lDPOS = new Array(3);
   var n = 0;
   var firstLM = 0;

   sDObj = new Date(y,m,1,0,0,0,0);    //����һ������

   this.length    = solarDays(y,m);    //������������
   this.firstWeek = sDObj.getDay();    //��������1�����ڼ�

   ////////���� 1900��������Ϊ������(60����36)
   if(m<2) cY=cyclical(y-1900+36-1);
   else cY=cyclical(y-1900+36);
   var term2=sTerm(y,2); //��������

   ////////���� 1900��1��С����ǰΪ ������(60����12)
   var firstNode = sTerm(y,m*2) //���ص��¡��ڡ�Ϊ���տ�ʼ
   cM = cyclical((y-1900)*12+m+12);

   //����һ���� 1900/1/1 �������
   //1900/1/1�� 1970/1/1 ���25567��, 1900/1/1 ����Ϊ������(60����10)
   var dayCyclical = Date.UTC(y,m,1,0,0,0,0)/86400000+25567+10;

   for(var i=0;i<this.length;i++) {

      if(lD>lX) {
         sDObj = new Date(y,m,i+1);    //����һ������
         lDObj = new Lunar(sDObj);     //ũ��
         lY    = lDObj.year;           //ũ����
         lM    = lDObj.month;          //ũ����
         lD    = lDObj.day;            //ũ����
         lL    = lDObj.isLeap;         //ũ���Ƿ�����
         lX    = lL? leapDays(lY): monthDays(lY,lM); //ũ����������һ��

         if(n==0) firstLM = lM;
         lDPOS[n++] = i-lD+1;
      }

      //�������������·ֵ�����, ������Ϊ��
      if(m==1 && (i+1)==term2) cY=cyclical(y-1900+36);
      //����������, �ԡ��ڡ�Ϊ��
      if((i+1)==firstNode) cM = cyclical((y-1900)*12+m+13);
      //����
      cD = cyclical(dayCyclical+i);

      //sYear,sMonth,sDay,week,
      //lYear,lMonth,lDay,isLeap,
      //cYear,cMonth,cDay
      this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                               lY, lM, lD++, lL,
                               cY ,cM, cD );
   }

   //����
   tmp1=sTerm(y,m*2  )-1;
   tmp2=sTerm(y,m*2+1)-1;
   this[tmp1].solarTerms = solarTerm[m*2];
   this[tmp2].solarTerms = solarTerm[m*2+1];
   if(m==3) this[tmp1].color = 'red'; //������ɫ

   //��������
   for(i in sFtv)
      if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            if(Number(RegExp.$2)<=this.length){
              this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
              if(RegExp.$3=='*') this[Number(RegExp.$2)-1].color = 'red';
            }
         }

   //���ܽ���
   for(i in wFtv)
      if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/))
         if(Number(RegExp.$1)==(m+1)) {
            tmp1=Number(RegExp.$2);
            tmp2=Number(RegExp.$3);
            if(tmp1<5)
               this[((this.firstWeek>tmp2)?7:0) + 7*(tmp1-1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
            else {
               tmp1 -= 5;
               tmp3 = (this.firstWeek+this.length-1)%7; //��������һ������?
               this[this.length - tmp3 - 7*tmp1 + tmp2 - (tmp2>tmp3?7:0) - 1 ].solarFestival += RegExp.$5 + ' ';
            }
         }

   //ũ������
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


   //�����ֻ������3��4��
   if(m==2 || m==3) {
      var estDay = new easter(y);
      if(m == estDay.m)
         this[estDay.d-1].solarFestival = this[estDay.d-1].solarFestival+' �����';
   }

   //��ɫ������
   if((this.firstWeek+12)%7==5)
      this[12].solarFestival += '��ɫ������';

   //����
   if(y==tY && m==tM) this[tD-1].isToday = true;
}

//======================================= ���ظ���ĸ����(�������һ����������ĵ�һ����)
function easter(y) {
   var term2=sTerm(y,5); //ȡ�ô�������
   var dayTerm2 = new Date(Date.UTC(y,2,term2,0,0,0,0)); //ȡ�ô��ֵĹ������ڶ���(����һ��������3��)
   var lDayTerm2 = new Lunar(dayTerm2); //ȡ��ȡ�ô���ũ��

   if(lDayTerm2.day<15) //ȡ���¸���Բ���������
      var lMlen= 15-lDayTerm2.day;
   else
      var lMlen= (lDayTerm2.isLeap? leapDays(y): monthDays(y,lDayTerm2.month)) - lDayTerm2.day + 15;

   //һ���� 1000*60*60*24 = 86400000 ����
   var l15 = new Date(dayTerm2.getTime() + 86400000*lMlen ); //�����һ����ԲΪ��������
   var dayEaster = new Date(l15.getTime() + 86400000*( 7-l15.getUTCDay() ) ); //����¸�����

   this.m = dayEaster.getUTCMonth();
 this.d = dayEaster.getUTCDate();
}

//====================== ��������
function cDay(d){
   var s;

   switch (d) {
      case 10:
         s = '��ʮ'; break;
      case 20:
         s = '��ʮ'; break;
         break;
      case 30:
         s = '��ʮ'; break;
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

   if(SY>1874 && SY<1909) yDisplay = '����' + (((SY-1874)==1)?'Ԫ':SY-1874);
   if(SY>1908 && SY<1912) yDisplay = '��ͳ' + (((SY-1908)==1)?'Ԫ':SY-1908);
   if(SY>1911 && SY<1950) yDisplay = '���' + (((SY-1911)==1)?'Ԫ':SY-1911);
   if(SY>1949) yDisplay = '����' + (((SY-1949)==1)?'Ԫ':SY-1949);

   document.getElementById("GZ").innerHTML = yDisplay +'�� ũ��' + cyclical(SY-1900+36) + '�� ��'+Animals[(SY-4)%12]+'��';

   document.getElementById("YMBG").innerHTML = "&nbsp;" + SY + "<BR>&nbsp;" + monthName[SM];

   for(i=0;i<42;i++) {

      gObj=document.getElementById('GD'+ i);
      sObj=document.getElementById('SD'+ i);
      lObj=document.getElementById('LD'+ i);


      gObj.className = '';

      sD = i - cld.firstWeek;

      if(sD>-1 && sD<cld.length) { //������
         sObj.innerHTML = sD+1;

         if(cld[sD].isToday) gObj.className = 'todayColor'; //������ɫ

         sObj.style.color = cld[sD].color; //����������ɫ

         if(cld[sD].lDay==1) //��ʾũ����
            if(cld[sD].isLeap) //����
              lObj.innerHTML = '<b>��'+cld[sD].lMonth+'��' + (leapDays(cld[sD].lYear)==29?'С':'��')+'</b>';
            else //������
              lObj.innerHTML = '<b>'+cld[sD].lMonth+'��' + (monthDays(cld[sD].lYear,cld[sD].lMonth)==29?'С':'��')+'</b>';
         else //��ʾũ����
            lObj.innerHTML = cDay(cld[sD].lDay);

         s=cld[sD].lunarFestival;
         if(s.length>0) { //ũ������
            if(s.length>6) s = s.substr(0, 4)+'��';
            s = s.fontcolor('red');
         }
         else { //��������
            s=cld[sD].solarFestival;
            if(s.length>0) {
               size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?8:4;
               if(s.length>size+2) s = s.substr(0, size)+'��';
               s=(s=='��ɫ������')?s.fontcolor('black'):s.fontcolor('blue');
            }
            else { //إ�Ľ���
               s=cld[sD].solarTerms;
               if(s.length>0) s = s.fontcolor('limegreen');
            }
         }

         if(cld[sD].solarTerms=='����') s = '������'.fontcolor('red');



         if(s.length>0) lObj.innerHTML = s;

      }
      else { //������
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

//��ʾ��ϸ��������
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
         cld[d].sYear+' �� '+cld[d].sMonth+' �� '+cld[d].sDay+' ��<br>����'+cld[d].week+'<br>'+
         '<font color="violet">ũ��'+(cld[d].isLeap?'�� ':' ')+cld[d].lMonth+' �� '+cld[d].lDay+' ��</font><br>'+
         '<font color="yellow">'+cld[d].cYear+'�� '+cld[d].cMonth+'�� '+cld[d].cDay + '��</font>'+
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

//�����ϸ��������
function mOut() {
   if ( cnt >= 1 ) { sw = 0; }
   if ( sw == 0 ) { snow = 0; dStyle.visibility = "hidden";}
   else cnt++;
}

//ȡ��λ��
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



   //����
   dStyle = document.getElementById("detail").style;
   document.CLD.SY.selectedIndex=tY-1900;
   document.CLD.SM.selectedIndex=tM;

//   alert(tY + ' ' +tM);

   drawCld(tY,tM);

}


function MathHelper() {

	this.getMod	= function(decimal) {
		return	decimal - Math.floor(decimal);
	}

	// 广义求余
	this.getModCom	= function(x, w) {
		return	this.getMod(x / w) * w;
	}
}


//年差天数
function D(y){
  var v=(y-1)*365+Math.floor((y-1)/4);  //Julian的年差天数
  if(y>1582)
    v+=-Math.floor((y-1)/100)+Math.floor((y-1)/400);  //Gregorian的年差天数
  return v;
}

//等效标准天数
function erD(y,m,d){
  var v=(y-1)*365+Math.floor((y-1)/4)+D0(y,m,d)-2;  //Julian的等效标准天数
  if(y>1582)
    v+=-Math.floor((y-1)/100)+Math.floor((y-1)/400)+2;  //Gregorian的等效标准天数
  return v;
}

//儒略日
function JD(y,m,d,h,min,sec,zone){
  var ifG=ifGr(y,m,d,1);
  var jt=(h+(min+sec/60)/60)/24-0.5-zone/24;
  var jd=(ifG)?(erD(y,m,d)+1721425+jt):(erD(y,m,d)+1721425+jt);//儒略日
  return jd;
}

//星期
function Day(y,m,d){
  return erD(y,m,d)%7;
}


//节气函数
function S(y,n,pd){  //pd取值为0或1，分别表示平气和定气,该函数返回节气的D0值
  var juD=y*(365.2423112-6.4e-14*(y-100)*(y-100)-3.047e-8*(y-100))+15.218427*n+1721050.71301;//儒略日
  var tht=3e-4*y-0.372781384-0.2617913325*n;//角度
  var yrD=(1.945*Math.sin(tht)-0.01206*Math.sin(2*tht))*(1.048994-2.583e-5*y);//年差实均数
  var shuoD=-18e-4*Math.sin(2.313908653*y-0.439822951-3.0443*n);//朔差实均数
  var vs=(pd)?(juD+yrD+shuoD-erD(y,1,0)-1721425):(juD-erD(y,1,0)-1721425);
  return vs;
}
//判断Gregorian历还是Julian历
function ifGr(y,m,d,opt){  //阳历y年m月(1,2,..,12,下同)d日,opt=1,2,3分别表示标准日历,Gregorge历和Julian历

  if(opt==1){
    if(y>1582||(y==1582&&m>10)||(y==1582&&m==10&&d>14))
      return(1);  //Gregorian
    else
      if(y==1582&&m==10&&d>=5&&d<=14)
        return(-1);  //空
      else
        return(0);  //Julian
  }

  if(opt==2)
    return(1);  //Gregorian
  if(opt==3)
    return(0);  //Julian

}


//日差天数
function D0(y,m,d){
  var ifG=ifGr(y,m,d,1);
  var monL=new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
  if(ifG)
    if((y%100!=0&&y%4==0)||(y%400==0))
      monL[2]+=1;
    else ;
  else
    if(y%4==0)
      monL[2]+=1;
    else ;
  var v=0;
  for(var i=0;i<=m-1;i++){
    v+=monL[i];
  }
  v+=d;
  if(y==1582){
    if(ifG==1)
      v-=10;
    if(ifG==-1)
      v=1/0;  //infinity
  }
  return v;
}

//反日差天数
function antiD0(y,x){
  var m=1;
  for(var j=1;j<=12;j++){
    var mL=D0(y,j+1,1)-D0(y,j,1);
    if(x<=mL||j==12){
      var m=j;
      break;
    }
    else
       x-=mL;
  }
  return 100*m+x;
}


//天干
function gan(x){
  return x%10;
}

//地支
function zhi(x){
  return x%12;
}

//年干支
function yGz(y,m,d,h){
  if((D0(y,m,d)+h/24)<S(y,3)-1)  //判断是否过立春
    y-=1;
  return Math.round((new MathHelper()).getModCom(y-3,60));
}

//月干支
function mGz(y,m,d,h){

	var objMathHelper	= new MathHelper();

  var sN0=2*m-2;
  var sDt0=S(y,sN0,1);
  var sD0=antiD0(y,Math.floor(sDt0));
  var sM0=Math.floor(sD0/100);
  var sDate0=sD0%100+objMathHelper.getMod(sDt0);

  var sN1=2*m-1;
  var sDt1=S(y,sN1,1);
  var sD1=antiD0(y,Math.floor(sDt1));
  var sM1=Math.floor(sD1/100);
  var  sDate1=sD1%100+objMathHelper.getMod(sDt1);

  var sN2=2*m;
  var sDt2=S(y,sN2,1);
  var sD2=antiD0(y,Math.floor(sDt2));
  var sM2=Math.floor(sD2/100);
  var  sDate2=sD2%100+objMathHelper.getMod(sDt2);

  var sN3=2*m+1;
  if(sN3>24)
    sN3-=24;
  var sDt3=S(y,sN3,1);
  var sD3=antiD0(y,Math.floor(sDt3));
  var sM3=Math.floor(sD3/100);
  var  sDate3=sD3%100+objMathHelper.getMod(sDt3);

  if(sM0==m){
    sN2=sN1; sN1=sN0;
    sDt2=sDt1; sDt1=sDt0;
    sDate2=sDate1; sDate1=sDate0;
  }

  if(sM3==m){
    sN1=sN2; sN2=sN3;
    sDt1=sDt2; sDt2=sDt3;
    sDate1=sDate2; sDate2=sDate3;
  }

  sN1=objMathHelper.getModCom(sN1-1,24)+1;
  sN2=objMathHelper.getModCom(sN2-1,24)+1;

  var mL=D0(y,m,31)-D0(y,m,0);
  if(sDate2>mL)
    sDate2-=mL;

  var jqDate=(sN1%2==1)?sDate1:sDate2;  //"节气"(n为奇数)所在的阳历日数

  var gzM=((d+h/24)<jqDate)?(m-2):(m-1);   //干支月
  if(gzM<=0)
    gzM+=12;
  return Math.round(objMathHelper.getModCom(12*gan(yGz(y,m,d))+gzM-10,60));
}

//日干支
function dGz(y,m,d,h){
  var gzD=(h<23)?erD(y,m,d):erD(y,m,d)+1;
  return Math.round((new MathHelper()).getModCom(gzD+15,60));
}

//时干支
function hGz(y,m,d,h){
  var v=12*gan(dGz(y,m,d,h))+Math.floor((h+1)/2)-11;
  if(h==23)
    v-=12;
  return Math.round((new MathHelper()).getModCom(v,60));
}




//--------转换成字符串的函数--------//

//将单位天的纯小数转换成如同5:08的时间格式
function dToStr(dv){
  var h=Math.floor(dv*24);
  var min=Math.floor((dv*24-h)*60);
  if(min<10)
    min='0'+min;
  return h+':'+min;
}


//干支
function gzStr(v){
  return '癸甲乙丙丁戊己庚辛壬'.charAt(v%10)+'亥子丑寅卯辰巳午未申酉戌'.charAt(v%12);
}

//生肖
function zodStr(v){
  return '猪鼠牛虎兔龙蛇马羊猴鸡狗'.charAt(v);
}

//农历月数
function lunMStr(v){
  var v0=Math.abs(v);
  var str='一二三四五六七八九十';
  var vstr=str.charAt((v0-1)%10);
  if(v0>10)
    vstr='十'+vstr;
  if(v0==1)
    vstr='正';
  if(v<0)
    vstr='闰'+vstr;
  return vstr;
}

//农历日数
function lunDStr(v){
  var str='十一二三四五六七八九初十廿三';
  var vstr=str.charAt(Math.floor(v/10)+10)+str.charAt(v%10);
  if(v==10)
    vstr='初十';
  return vstr;
}


//朔望
function shwStr(v1,v2){
  var str='';
  if(v1==1)
    str=dToStr(v2)+'朔';
  else
    if(v2)//(v1==15||v1==16)&&v2)
      str=dToStr(v2)+'望';
    else;
  return str;
}

//日月食
function ecliStr(v){
  var str='';
  if(v==1)
    str='日食';
  if(v==2)
    str='月全食';
  if(v==3)
    str='月偏食';
  return str;
}



/*

字典

Leap Month	闰月
Lunar Month	阴历月份
Lunar Date	阴历日期

*/

function DateUtil() {

	// Contant
//	var CONST_PI			= Math.PI;

	// 记录从公元前 850 年开始
	var intBeginingYear		= -849;

	// -849 ~ 2100
	var strLeapMonthSearchMap	= '0c0080050010a0070030c0080050010a0070030c0080050020a0070030c0080050020a0070030c0090050020a0070030c0090050020a0060030c0060030c00900600c0c0060c00c00c00c0c000600c0c0006090303030006000c00c060c0006c00000c0c0c0060003030006c00009009c0090c00c009000300030906030030c0c00060c00090c0060600c0030060c00c003006009060030c0060060c0090900c00090c0090c00c006030006060003030c0c00030c0060030c0090060030c0090300c0080050020a0060030c0080050020b0070030c0090050010a0070030b0090060020a0070040c0080050020a0060030c0080050020b0070030c0090050010a0070030b0090060020a0070040c0080050020a0060030c0080050020b0070030c0090050000c00900909009009090090090090900900909009009009090090090900900900909009009090090090090900900909009009090090090090900900909009009009090090090900900900909009009090060030c0090050010a0070030b008005001090070040c0080050020a0060030c0090040010a0060030c0090050010a0070030b0080050010a008005001090050020a0060030c0080040010a0060030c0090050010a0070030b0080050010a0070030b008005001090070040c0080050020a0060030c0080040010a0060030c0090050010a0070030b008005001090070040c0080050020a0060030c0080040010a0060030c0090050010a0060030c0090050010a0070030b008005001090070040c0080050020a0060030c0080040010a0070030b0080050010a0070040c0080050020a0060030c0080040010a0070030c0090050010a0070030b0080050020a0060030c0080040010a0060030c0090050050020a0060030c0090050010b0070030c0090050010a0070040c0080040020a0060030c0080050020a0060030c0090050010a0070030b0080040020a0060040c0090050020b0070030c00a0050010a0070030b0090050020a0070030c0080040020a0060030c0090050010a0070030c0090050030b007005001090050020a007004001090060020c0070050c0090060030b0080040020a0060030b0080040010a0060030b0080050010a0050040c0080050010a0060030c0080050010b0070030c007005001090070030b0070040020a0060030c0080040020a0070030b0090050010a0060040c0080050020a0060040c0080050010b0070030c007005001090070030c0080050020a0070030c0090050020a0070030c0090050020a0060040c0090050020a0060040c0090050010b0070030c0080050030b007004001090060020c008004002090060020a008004001090050030b0080040020a0060040b0080040c00a0060020b007005001090060030b0070050020a0060020c008004002090070030c008005002090070040c0080040020a0060040b0090050010a0060030b0080050020a0060040c0080050010b00700300108005001090070030c0080050020a007003001090050030a0070030b0090050020a0060040c0090050030b0070040c0090050010c0070040c0080060020b00700400a090060020b007003002090060020a005004001090050030b007004001090050040c0080040c00a0060020c007005001090060030b0070050020a0060020c008004002090060030b008004002090060030b0080040020a0060040b0080040010b0060030b0070050010a00600400207005003080060040030700500307006004003070050030800600400307005004090060040030700500409006005002070050030a0060050030700500400206004002060050030020600400307005004090060040030700500408007005003080050040a00600500307005004002060050030800500400206005002070050040020600500307006004002070050030800600400307005004080060040a006005003080050040020700500409006004002060050030b0060050020700500308006004003070050040800600400307005004080060040020';


	// Private
	// 查找某年的闰月，如果为 0 则该年无闰月
	var getLeapingMonthByYear = function(intYear) {
		var indexOfYear	= intYear - intBeginingYear;
		return	parseInt(strLeapMonthSearchMap.charAt(indexOfYear), 16);
	}


	// 农历及日月食
	// Private
	// 角度函数
	var getAngle = function(x, t, c1, t0, t2, t3) {
		return	(new MathHelper()).getMod(c1 * x) * 2 * Math.PI
			+ t0 - t2 * t * t - t3 * t * t * t;
	}


	var getMod = function(decimal) {
		return	decimal - Math.floor(decimal);
	}




//判断Gregorian历还是Julian历
var ifGr = function (y,m,d,opt){  //阳历y年m月(1,2,..,12,下同)d日,opt=1,2,3分别表示标准日历,Gregorge历和Julian历

  if(opt==1){
    if(y>1582||(y==1582&&m>10)||(y==1582&&m==10&&d>14))
      return(1);  //Gregorian
    else
      if(y==1582&&m==10&&d>=5&&d<=14)
        return(-1);  //空
      else
        return(0);  //Julian
  }

  if(opt==2)
    return(1);  //Gregorian
  if(opt==3)
    return(0);  //Julian

}
//日差天数
var D0 = function (y,m,d){
  var ifG=ifGr(y,m,d,1);
  var monL=new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
  if(ifG)
    if((y%100!=0&&y%4==0)||(y%400==0))
      monL[2]+=1;
    else ;
  else
    if(y%4==0)
      monL[2]+=1;
    else ;
  var v=0;
  for(var i=0;i<=m-1;i++){
    v+=monL[i];
  }
  v+=d;
  if(y==1582){
    if(ifG==1)
      v-=10;
    if(ifG==-1)
      v=1/0;  //infinity
  }
  return v;
}

//等效标准天数
var erD = function(y,m,d){
  var v=(y-1)*365+Math.floor((y-1)/4)+D0(y,m,d)-2;  //Julian的等效标准天数
  if(y>1582)
    v+=-Math.floor((y-1)/100)+Math.floor((y-1)/400)+2;  //Gregorian的等效标准天数
  return v;
}


this.getLunarDateByModernObj = function (y,m,d) {
  var t=(y-1899.5)/100;
  var ms=Math.floor((y-1900)*12.3685);
  var rpi=180/Math.PI;
  var zone=8;  //时区
  var f0=getAngle(ms,t,0,0.75933,2.172e-4,1.55e-7)+0.53058868*ms-8.37e-4*t+zone/24+0.5;
  var fc=0.1734-3.93e-4*t;
  var j0=693595+29*ms;
  var aa0=getAngle(ms,t,0.08084821133,359.2242/rpi,0.0000333/rpi,0.00000347/rpi);
  var ab0=getAngle(ms,t,7.171366127999999e-2,306.0253/rpi,-0.0107306/rpi,-0.00001236/rpi);
  var ac0=getAngle(ms,t,0.08519585128,21.2964/rpi,0.0016528/rpi,0.00000239/rpi);
  var leap=0;  //闰月数,0则不闰
  var ecli=0;  //日月食
  var lunD=-1;  //农历日数
  var shuoD=0;  //本阴历月的阴历朔日数
  var shuoT=0;  //本阴历月的朔时刻
  var wangD=0;  //本阴历月的望时刻
  var wangT=0;  //本阴历月的阴历望日数

  for(var k=-1;k<=13;k+=0.5){  //k=整数为朔,k=半整数为望
    var aa=aa0+0.507984293*k;
    var ab=ab0+6.73377553*k;
    var ac=ac0+6.818486628*k;
    var f1=f0+1.53058868*k+fc*Math.sin(aa)-0.4068*Math.sin(ab)+0.0021*Math.sin(2*aa)+0.0161*Math.sin(2*ab)+0.0104*Math.sin(2*ac)-0.0074*Math.sin(aa-ab)-0.0051*Math.sin(aa+ab);
    var j=j0+28*k+f1;  //朔或望的等效标准天数及时刻

    //记录当前日期的j值
    var lunD0=erD(y,m,d)-Math.floor(j);  //当前日距朔日的差值
    if(k==Math.floor(k)&&lunD0>=0&&lunD0<=29){
      var k1=k;  //记录当前时间对应的k值
      shuoT=(new MathHelper()).getMod(j);
      lunD=lunD0+1;
    }
    if(k==(k1+0.5)){
      wangT=(new MathHelper()).getMod(j);
      wangD=Math.floor(j)-(erD(y,m,d)-lunD+1)+1;
    }

    //判断日月食
    if((lunD==1&&k==k1)||(lunD==wangD&&k==(k1+0.5))){
      if(abs(Math.sin(ac))<=0.36){
        var s=5.19595-0.0048*cos(aa)+0.002*cos(2*aa)-0.3283*cos(ab)-0.006*cos(aa+ab)+0.0041*cos(aa-ab);
        var r=0.207*Math.sin(aa)+0.0024*Math.sin(2*aa)-0.039*Math.sin(ab)+0.0115*Math.sin(2*ab)-0.0073*Math.sin(aa+ab)-0.0067*Math.sin(aa-ab)+0.0117*Math.sin(2*ac);
        var p=abs(s*Math.sin(ac)+r*cos(ac));
        var q=0.0059+0.0046*cos(aa)-0.0182*cos(ab)+0.0004*cos(2*ab)-0.0005*cos(aa+ab);
        if(p-q<=1.5572){
          ecli=1;  //日食
          if(k!=Math.floor(k)){
            if(p+q>=1.0129)
              ecli=3;  //月偏食
            else
              ecli=2;  //月全食
          }
        }
      }
     }
  }
//k循环结束

  var v=lunD;  //返回值
  if(v==1)
    v+=shuoT  //朔日则返回朔的时刻
  if(v==wangD)
    v+=wangT;  //望日则返回望的时刻

  return(v+ecli*100)
}


this.getLunarMonthByModernObj = function lunMon(y,m,d){


  var lunDt=this.getLunarDateByModernObj(y,m,d);
  var lunD=Math.floor(lunDt-Math.floor(lunDt/100)*100);  //农历日数
  var leapN=0;  //从当年到-849年的总闰月数
  for(var i=-849;i<=y;i++){
  if(getLeapingMonthByYear(i)!='0')
    leapN++;
  }
  var MonN=Math.round((erD(y,m,d)-erD(-849,1,21)-lunD)/29.530588)-leapN  //从当年到-849年的有效总月数(扣除闰月)

  if(y<=240) MonN++;
  if(y<=237) MonN--;
  if(y<24) MonN++;
  if(y<9) MonN--;
  if(y<=-255) MonN++;
  if(y<=-256) MonN+=2;
  if(y<=-722) MonN++;  //历史上的修改月建

  var lunM=Math.round((new MathHelper()).getModCom(MonN-3,12)+1);
  if(lunM==getLeapingMonthByYear(y-1)&&m==1&&d<lunD)
    lunM*=-1;    //如果y-1年末是闰月且该月接到了y年,则y年年初也是闰月
  else{
    if(lunM==getLeapingMonthByYear(y))
      lunM*=-1;
    else{
      if(lunM<getLeapingMonthByYear(y)||m<lunM&&getLeapingMonthByYear(y))
        lunM++;  //如果y年是闰月但当月未过闰月则前面多扣除了本年的闰月，这里应当补偿
      lunM=Math.round((new MathHelper()).getModCom(lunM-1,12)+1);
    }
  }

  return lunM;
}


this.getFullObj = function(y1,m1,d1,h1){

	var objMathHelper	= new MathHelper();

	var lunM1		= this.getLunarMonthByModernObj(y1,m1,d1);
	var lunDt1		= this.getLunarDateByModernObj(y1,m1,d1);

  var yL=D0(y1,12,31)-D0(y1,1,0);
  var mL=D0(y1,m1+1,1)-D0(y1,m1,1);
  var yr='公元'+y1+'年';
  if(y1<=0)
     yr='公元前'+(-y1+1)+'年';
  var mon=m1+'月';
  var dt=d1+'日';

  var gj=(ifGr(y1,m1,d1,1))?'格里历':'儒略历';


  var lunD1=Math.floor(lunDt1-Math.floor(lunDt1/100)*100);
  var lun='农历'+zodStr(yGz(y1,m1,d1,h1)%12)+'年'+lunMStr(lunM1)+'月'+lunDStr(lunD1);

  var shw=shwStr(Math.floor(lunD1),objMathHelper.getMod(lunDt1))+' '+ecliStr(Math.floor(lunDt1/100));

  var jld=Math.round(JD(y1,m1,d1,h1,0,0,8)*1000)/1000;


  var gz=gzStr(yGz(y1,m1,d1,h1))+'年'+' '+gzStr(mGz(y1,m1,d1,h1))+'日'+' '+gzStr(dGz(y1,m1,d1,h1))+'日'+' '+gzStr(hGz(y1,m1,d1,h1))+'时';


	return gz;












}



}

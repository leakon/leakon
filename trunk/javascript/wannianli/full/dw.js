var mEn=new Array( "January","February","March","April","May","June","July","August","September","October","November ","December");
var dayEn=new Array( "SUN","MON","TUE","WED","THR","FRI","SAT");
var mDx=new Array( "大","平","大","小","大","小","大","大","小","大","小","大");

function altbg(who,h){
  who.style.cursor=(h&&who.innerHTML!='')?'hand':'';
  if(who.style.backgroundColor!='#ffffee'&&who.innerHTML!=''){
      who.style.backgroundColor=(h)?'#0099cc':'';
  }
}

function altbg2(who,h){
  who.style.cursor=(h&&who.innerHTML!='')?'hand':'';
  if(who.style.backgroundColor!='#ffffee'&&who.innerHTML!=''){
      document.all["t"+nowpoint].style.backgroundColor=(h)?'':'#ffffee';
      who.style.backgroundColor=(h)?'#ffffee':'';
      nowpoint=parseFloat(who.id.substring(1,3));
  }
}

function pushBtn() {
  if(flag==1)
    if(df.yr.selectedIndex>0){
      df.yr.selectedIndex--;
      lookup();
    }
  if(flag==2)
    if(df.yr.selectedIndex<2100-(-849)){
      df.yr.selectedIndex++;
      lookup();
    }
  if(flag==3){
    if(df.mon.selectedIndex>0)
      df.mon.selectedIndex--;
    else
      df.mon.selectedIndex+=12-1;
  lookup();
  }
  if(flag==4){
    if(df.mon.selectedIndex<11)
      df.mon.selectedIndex++;
    else
      df.mon.selectedIndex-=12-1;
  lookup();
  }
  if(flag==5){
    if(ha>0)
      ha--;
    else
      ha+=23;
    clearTimeout(timer1);
//    clearTimeout(timer2);
    df.time.value=ha+':'+min0+':'+sec0;
    track(ya,ma,da,ha,lunMonth[nowpoint],lunNum[nowpoint]);
  }
  if(flag==6){
    if(ha<23)
      ha++;
    else
      ha-=23;
    clearTimeout(timer1);
//    clearTimeout(timer2);
    df.time.value=ha+':'+min0+':'+sec0;
    track(ya,ma,da,ha,lunMonth[nowpoint],lunNum[nowpoint]);
  }
}

function changeTime(){
  clearTimeout(timer1);
  ha=parseFloat(df.time.value.substring(0,2));
//  clearTimeout(timer2);
  track(ya,ma,da,ha,lunMonth[nowpoint],lunNum[nowpoint]);
}

var now,y0,m0,d0,h0,min0,sec0,ya,ma,da,ha,mina,seca,sN1,sN2,sDate1,sDate2,flag,i1,i2,nowpoint;
var dateNum=new Array(),lunMonth=new Array(),lunNum=new Array();

function ini(){
  now=new Date;
  y0=now.getYear();
  if(y0<2000)
    y0+=1900;
  m0=now.getMonth()+1;
  d0=now.getDate();
  h0=now.getHours();
  if(h0<10)
    h0='0'+h0;
  min0=now.getMinutes();
  if(min0<10)
    min0='0'+min0;
  sec0=now.getSeconds();
  if(sec0<10)
    sec0='0'+sec0;
  timer1=setTimeout("ini()",500);
}ini();

function resetnow(){
ya=y0,ma=m0,da=d0,ha=h0,mina=min0,seca=sec0;
}resetnow();

function resetall(){
  ini();
  resetnow();
//  clearTimeout(timer2);
  Dwrite(ya,ma,da,ha);
  calCyc();
  df.yr.selectedIndex=ya-(-849);
  df.mon.selectedIndex=ma-1;
  df.time.value=ha+':'+mina+':'+seca;
}

//var dw=document.write;

function dw(e) {
	document.write(e);
}

dw("<TABLE>");
dw("<TR align=left>");
dw("<TD valign=top width=200>");

var head='<form name=fm>';
var yOpt='<select name=yr>';
for(var i=-849;i<=2100;i++){
  var ifSel=(i==y0)?' selected':'';
  var yName=(i>0)?i:('前'+(-i+1));
  yOpt+='<option value='+i+ifSel+'>'+yName+'</option>';
}
yOpt+='</select>年';

var mOpt='<select name=mon>';
for(i=1;i<=12;i++){
  ifSel=(i==m0)?' selected':'';
  mOpt+='<option value='+i+ifSel+'>'+i+'</option>';
}
mOpt+='</select>月<p>';


var tInp='<input id=time value='+h0+':'+min0+':'+sec0+' size=8 onFocus="clearTimeout(timer1);clearTimeout(timer2);" onchange="changeTime();">';

var tbttn='<BUTTON onclick="flag=5;pushBtn();" style="color:#000088;border:#000000 1px solid;">时↑</BUTTON><BUTTON onclick="flag=6;pushBtn();" style="color:#000088;border:#000000 1px solid;">时↓</BUTTON><p>';
var yrbttn='<BUTTON onclick="flag=1;pushBtn();" style="color:#000088;border:#000000 1px solid;">年↑</BUTTON><BUTTON onclick="flag=2;pushBtn();" style="color:#000088;border:#000000 1px solid;">年↓</BUTTON>';
var monbttn='<BUTTON onclick="flag=3;pushBtn();" style="color:#000088;border:#000000 1px solid;">月↑</BUTTON><BUTTON onclick="flag=4;pushBtn();" style="color:#000088;border:#000000 1px solid;">月↓</BUTTON><p>';

var bttn='<input type=button value=当前时间 onclick="resetall();" style="color:#000088;border:#000000 1px solid;">';

dw(head+tInp+tbttn+yOpt+mOpt+yrbttn+monbttn+bttn);

dw('</form>');

dw('<fieldset align="center" style="BORDER-BOTTOM:#cc0000 1px solid;BORDER-LEFT:#cc0000 1px solid;BORDER-RIGHT:#cc0000 1px solid;BORDER-TOP:#cc0000 1px solid;WIDTH:200px;height=80;">');
dw('<legend style="COLOR:#cc0000;font-size:10pt;"><b>◇本日节日◇</b></legend>');
dw('<br><b id=jieri style="color:#cc8800;font-size:9pt;">&nbsp;</b><br>');
dw('</fieldset><p>');

dw('<fieldset align="center" style="BORDER-BOTTOM:#cc0000 1px solid;BORDER-LEFT:#cc0000 1px solid;BORDER-RIGHT:#cc0000 1px solid;BORDER-TOP:#cc0000 1px solid;WIDTH:200px;height=50;">');
dw('<legend style="COLOR:#cc0000;font-size:10pt;"><b>◇本月节气◇</b></legend>');
dw('<br><b id=jieqi style="color:#006666;font-size:9pt;">&nbsp;</b><br><img height=0 width=0>');
dw('</fieldset><p>');

dw("</TD>");
dw("<TD align=left valign=top width=400>");

dw('<b id=gongli style="color:#000000;font-size:12pt;font-weight:bold;">&nbsp;</b>&nbsp;&nbsp;');
dw('<b id=gorj style="color:#448800;font-size:11pt;font-family:楷体;">&nbsp;</b>&nbsp;&nbsp;&nbsp;');
dw('<b id=xz style="color:#880000;font-size:10pt;font-family:楷体;">&nbsp;</b><br>');
dw('<b id=nongli style="color:#333333;font-size:10pt;font-family:;">&nbsp;</b>');
dw('&nbsp;<q id=shwecli style="color:#0000aa;font-size:10pt;font-family:幼圆;">&nbsp;</q>');
dw('&nbsp;<q id=jd style="color:#00aaaa;font-size:10pt;font-family:幼圆;">&nbsp;</q><br>');
dw('<b id=nianhao style="color:#ccaa00;font-size:9pt;font-family:幼圆;">&nbsp;</b><br>');
dw('<b id=ganzhi style="color:#888800;font-size:9pt;background-color:;">&nbsp;</b>&nbsp;&nbsp;&nbsp;&nbsp;');

dw('<table cellspacing=0 cellpadding=0>');
  dw('<tr align=center bgcolor="#dddddd" style="font-size:11pt;color:000066;font-weight:bold;font-family:黑体;">');
  //星期
  for(var i=0;i<=6;i++){
    dw('<td>'+dayStr(i)+'<br><q style="font-size:9pt;color:9999aa;font-family:Comic Sans MS;background-color:#eeeeee;width=100%;">'+dayEn[i]+'</q></td>');
  }
  dw('</tr>');
for(var row=1;row<=6;row++){
  dw('<tr>');
  for(var col=1;col<=7;col++){
    var posIndex=(row-1)*7+col;
    dw('<td width=50 height=50 align=center id=t'+posIndex+' style="" onmouseover="altbg(this,1);" onmouseout="altbg(this,0);" onclick="altbg2(this,1);clicktd(this);">&nbsp;</td>');

  }

  dw('</tr>');
}

dw('</table>');
dw("</TD>");
dw("<TD align=center valign=top>");
dw("<table>");
dw("<tr><td>");
//=====================人体生物周期===============================
var by0,bm0,bd0;

dw('<form name=cycfm>');
dw('<b style="font-size:10pt;color:00aa00">人体生物钟查询</b><br>');

function cycini(){
  bt0=GetCookie('birth',0);
  by0=(bt0==null)?y0:parseFloat(bt0.substring(0,4));
  bm0=(bt0==null)?m0:parseFloat(bt0.substring(4,6));
  bd0=(bt0==null)?d0:parseFloat(bt0.substring(6,8));
}cycini();

var cychead='<b style="font-size:10pt;color:aa8800">出生日期(公历)<br>';
var cycyOpt='<select onchange="calCyc()" name=cycyr>';
for(var i=1900;i<=2100;i++){
  var ifSel=(i==by0)?' selected':'';
  cycyOpt+='<option value='+i+ifSel+'>'+i+'</option>';
}
cycyOpt+='</select>年';

var cycmOpt='<select onchange="calCyc()" name=cycmon>';
for(i=1;i<=12;i++){
  ifSel=(i==bm0)?' selected':'';
  cycmOpt+='<option value='+i+ifSel+'>'+i+'</option>';
}
cycmOpt+='</select>月';

var cycdtOpt='<q id=bdtSlct><select onchange="calCyc()" name=cycdt>';
for(var i=1;i<=31;i++){
  var ifSel=(i==bd0)?' selected':'';
  cycdtOpt+='<option value='+i+ifSel+'>'+i+'</option>';
}
cycdtOpt+='</select></q>日</b>';

dw(cychead+cycyOpt+cycmOpt+cycdtOpt);
dw('</form>');

dw('<table style="height:21;color:ff00aa;font-size:9pt;background:e0e0e0;width:200;">');
dw('<tr><td>智力</td><td><img id=zcyc style="background:eedd00;width:100;height:7;">');
dw('<img id=zcyc1 style="background:ffffff;width:100;height:7;"></td>');
dw('<td><span id=zv style="color:880000;font-size:9pt;"></span></td></tr>');
dw('<tr><td>体力</td><td><img id=tcyc style="background:0000ff;width:100;height:7;">');
dw('<img id=tcyc1 style="background:ffffff;width:100;height:7;"></td>');
dw('<td><span id=tv style="color:880000;font-size:9pt;"></span></td></tr>');
dw('<tr><td>情感</td><td><img id=qcyc style="background:ff8888;width:100;height:7;">');
dw('<img id=qcyc1 style="background:ffffff;width:100;height:7;"></td>');
dw('<td><span id=qv style="color:880000;font-size:9pt;"></span></td></tr>');
dw('</table>');



function checkSlct(y,m,d,slctId,slcNm){  //调整日期下拉框的日期总数使其合理
   var mL=D0(y,m+1,1)-D0(y,m,1);
   var dtOpt='<select onchange="calCyc()" name='+slcNm+'>';
   for(var i=1;i<=mL;i++){
     var ifSel=(i==d)?' selected':'';
     dtOpt+='<option value='+i+ifSel+'>'+i+'</option>';
   }
   slctId.innerHTML=dtOpt+'</select>';
}

function calCyc(){
  var yInd=cycfm.cycyr.options.selectedIndex;
  var by=parseFloat(cycfm.cycyr.options[yInd].value);
  var mInd=cycfm.cycmon.options.selectedIndex;
  var bm=parseFloat(cycfm.cycmon.options[mInd].value);
  var dInd=cycfm.cycdt.options.selectedIndex;
  var bd=parseFloat(cycfm.cycdt.options[dInd].value);

  checkSlct(by,bm,bd,bdtSlct,'cycdt');
  memBirth(by,bm,bd);  //记住选择的生日

  var zH=humanCyc(ya,ma,da,by,bm,bd,1);
  var tH=humanCyc(ya,ma,da,by,bm,bd,2);
  var qH=humanCyc(ya,ma,da,by,bm,bd,3);

  zcyc.style.width=(1+zH)*50;
  zcyc1.style.width=100-(1+zH)*50;
  tcyc.style.width=(1+tH)*50;
  tcyc1.style.width=100-(1+tH)*50;
  qcyc.style.width=(1+qH)*50;
  qcyc1.style.width=100-(1+qH)*50;
  zv.innerHTML=round(zH*100)+'%\n';
  tv.innerHTML=round(tH*100)+'%\n';
  qv.innerHTML=round(qH*100)+'%\n';
}calCyc();

function memBirth(by,bm,bd){  //记住选择的生日
  SetCookie('birth',10000*by+100*bm+bd,'forever',null,null,false);
}

dw("</tr></td>");
dw("<tr><td>");
//=======================个人日记======================
dw('<div id=rdiary>');
dw('<b style="text-align:center;background-color:e0e0e0;border:#cc0000 1px solid;width=200;color:#000088;font-size:11pt;">我的日记</b>');
dw('<span id=diaryshow style="overflow:auto;color:#0000ff;font-size:11pt;width=200;height=100;border:#cc0000 1px solid;"></span>');
dw('<br>');
dw('<center><input type=button id=read value=写日记 onclick="writeDiary(ya,ma,da)" style="color:#000088;border:#cc0000 1px dotted;">');
dw('<input type=button id=read value=删除日记 onclick="deleteDiary(ya,ma,da)" style="color:#000088;border:#cc0000 1px dotted;"></center>');
dw('</div>');

dw('<div id=floater style="position:absolute; left:250; top:200;cursor:move;z-index:100;">');
dw('<div id=wdiary style="position:absolute;z-index:100;visibility:hidden">');
dw('<table cellspacing=0 cellpadding=0 style="color:#000088;border:#0000cc 1px dotted;">');
dw('<tr bgcolor=e0e0e0 align=center><td style="color:#000088;">');
dw('<b>写日记</b>');
dw('</td></tr>');
dw('<tr><td>');
dw('<textarea id=diarytxt scrolling=no style="color:#008800;width=200;height=100;border:#0000cc 1px dotted;"></textarea><br>');
dw('</td></tr>');
dw('<tr bgcolor=e0e0e0 align=center><td>');
dw('<input type=button id=read value=完成 onclick="finishDiary(ya,ma,da)" style="color:#000088;border:#cc0000 1px dotted;">');
dw('<input type=button value=取消 onclick=cancleWDiary() style="color:#000088;border:#cc0000 1px dotted;">');

dw('</td></tr></table></div>');
dw('</div>');

dw("</tr></td>");
dw('<tr><td>');
//=====================倒计时===============================
var djshY0,djshM0,djshD0;

function djshIni(){  //记住上次所选倒计时的日期
  var v=GetCookie('countDown',0);
  if(v!=null){
    var v=v.split('!@#$%');
    djshY0=parseFloat(v[1].substring(0,4));
    djshM0=parseFloat(v[1].substring(4,6));
    djshD0=parseFloat(v[1].substring(6,8));
  }
}djshIni();

dw('<div id=djsh>');
dw('<b style="text-align:center;background-color:e0e0e0;border:#cc0000 1px solid;width=200;color:#000088;font-size:11pt;">倒计时提示</b>');
dw('<span id=showDjsh style="overflow:auto;color:#0000ff;font-size:11pt;width=200;height=100;border:#cc0000 1px solid;"></span>');
dw('<br>');
dw('<center><input type=button id=read value=设置 onclick="setDjsh()" style="color:#000088;border:#cc0000 1px dotted;">');
dw('<input type=button id=read value=删除 onclick="deleteDjsh()" style="color:#000088;border:#cc0000 1px dotted;"></center>');
dw('</div>');

dw('<div id=floater2 style="position:absolute; left:250; top:200;cursor:move;z-index:100;">');
dw('<div id=wdjsh style="position:absolute;z-index:100;visibility:hidden">');
dw('<table width=250 cellspacing=0 cellpadding=0 bgcolor=eeeeee style="color:#000088;border:#0000cc 1px dotted;">');
dw('<tr bgcolor=e0e0e0 align=center><td style="color:#000088;">');

var djshhead='<b style="font-size:12pt;">设定日期<br>';
var djshYOpt='<select onchange="checkDjshSlct()" name=djshYr>';
for(var i=2000;i<=2100;i++){
  var ifSel=(i==djshY0)?' selected':'';
  djshYOpt+='<option value='+i+ifSel+'>'+i+'</option>';
}
djshYOpt+='</select>年';

var djshMOpt='<select onchange="checkDjshSlct()" name=djshMon>';
for(i=1;i<=12;i++){
  ifSel=(i==djshM0)?' selected':'';
  djshMOpt+='<option value='+i+ifSel+'>'+i+'</option>';
}
djshMOpt+='</select>月';

var djshDtOpt='<q id=djshSlct><select name=djshDt>';
for(var i=1;i<=31;i++){
  var ifSel=(i==djshD0)?' selected':'';
  djshDtOpt+='<option value='+i+ifSel+'>'+i+'</option>';
}
djshDtOpt+='</select></q>日</b>';


dw(djshhead+djshYOpt+djshMOpt+djshDtOpt);

dw('</td></tr>');
dw('<tr><td>');
dw('<b style="font-size:12pt;">日期名称：</b><input name=djshtxt size=20>');
dw('</td></tr>');
dw('<tr bgcolor=e0e0e0 align=center><td>');
dw('<input type=button id=readdjsh value=确定 onclick="finishDjsh()" style="color:#000088;border:#cc0000 1px dotted;">');
dw('<input type=button value=取消 onclick=cancleWDjsh() style="color:#000088;border:#cc0000 1px dotted;">');

dw('</td></tr></table></div>');
dw('</div>');

function checkDjshSlct(){
  var yInd=djshYr.options.selectedIndex;
  var y1=parseFloat(djshYr.options[yInd].value);
  var mInd=djshMon.options.selectedIndex;
  var m1=parseFloat(djshMon.options[mInd].value);
  var dInd=djshDt.options.selectedIndex;
  var d1=parseFloat(djshDt.options[dInd].value);

  checkSlct(y1,m1,d1,djshSlct,'djshDt');
}

dw("</td></tr>");

dw("</TD>");
dw("</TR>");
dw("</TABLE>");

var  df=document.fm;



function track(y1,m1,d1,h1,lunM1,lunDt1){

//	dw_obj([y1,m1,d1,h1,lunM1,lunDt1]);
//	dw_obj([lunM1,lunDt1],1);



  var yL=D0(y1,12,31)-D0(y1,1,0);
  var mL=D0(y1,m1+1,1)-D0(y1,m1,1);
  var yr='公元'+y1+'年';
  if(y1<=0)
     yr='公元前'+(-y1+1)+'年';
  var mon=m1+'月';
  var dt=d1+'日';

  var gj=(ifGr(y1,m1,d1,1))?'格里历':'儒略历';

  var zoda=szodStr(sZod(m1,d1));

  var lunD1=floor(lunDt1-floor(lunDt1/100)*100);
  var lun='农历'+zodStr(yGz(y1,m1,d1,h1)%12)+'年'+lunMStr(lunM1)+'月'+lunDStr(lunD1);

  var shw=shwStr(floor(lunD1),tail(lunDt1))+' '+ecliStr(floor(lunDt1/100));

  var jld=round(JD(y1,m1,d1,h1,0,0,8)*1000)/1000;

  var mN=mEn[m1-1];

  var gz=gzStr(yGz(y1,m1,d1,h1))+'年'+' '+gzStr(mGz(y1,m1,d1,h1))+'日'+' '+gzStr(dGz(y1,m1,d1,h1))+'日'+' '+gzStr(hGz(y1,m1,d1,h1))+'时';

  var sF=sFtvl(m1,d1);

  var lF=lunFtvl(lunM1,lunD1);

  var fF=manFtvl(m1,d1);

  var stF=jqFtvl(y1,m1,d1);

  var sN0=2*m1-2;
  var sDt0=S(y1,sN0,1);
  var sD0=antiD0(y1,floor(sDt0));
  var sM0=floor(sD0/100);
  sDate0=sD0%100;

  sN1=2*m1-1;
  var sDt1=S(y1,sN1,1);
  var sD1=antiD0(y1,floor(sDt1));
  var sM1=floor(sD1/100);
  sDate1=sD1%100;

  sN2=2*m1;
  var sDt2=S(y1,sN2,1);
  var sD2=antiD0(y1,floor(sDt2));
  var sM2=floor(sD2/100);
  sDate2=sD2%100;

  var sN3=2*m1+1;
  if(sN3>24)
    sN3-=24;
  var sDt3=S(y1,sN3,1);
  var sD3=antiD0(y1,floor(sDt3));
  var sM3=floor(sD3/100);
  sDate3=sD3%100;

  if(sM0==m1){
    sN2=sN1; sN1=sN0;
    sDt2=sDt1; sDt1=sDt0;
    sDate2=sDate1; sDate1=sDate0;
  }

  if(sM3==m1){
    sN1=sN2; sN2=sN3;
    sDt1=sDt2; sDt2=sDt3;
    sDate1=sDate2; sDate2=sDate3;
  }

  sN1=rem(sN1-1,24)+1;
  sN2=rem(sN2-1,24)+1;

  if(sDate2>mL)
    sDate2-=mL;

  var sT1=sStr(sN1)+':'+m1+'月'+sDate1+'日'+dToStr(tail(sDt1));
  var sT2=sStr(sN2)+':'+m1+'月'+sDate2+'日'+dToStr(tail(sDt2));

  df.time.value=h1+':'+min0+':'+sec0;

  gongli.innerHTML=yr+mon+dt;
  gorj.innerHTML=gj;
  xz.innerHTML=zoda;
  nongli.innerHTML=lun;
  shwecli.innerHTML=shw;
  jd.innerHTML='儒略日'+jld;
  nianhao.innerHTML=nianHao(y1);
  jieri.innerHTML='<q id=sjr>'+sF+'</q> '+'<q id=ljr>'+lF+'</q><br><img height=5 width=0><br>'+'<span style="color:#666600;">'+fF+' <span style="color:#006666;">'+stF+'</span>';
  ganzhi.innerHTML=gzStr(yGz(y1,m1,d1,h1))+'年'+' '+gzStr(mGz(y1,m1,d1,h1))+'月'+' '+gzStr(dGz(y1,m1,d1,h1))+'日'+' '+gzStr(hGz(y1,m1,d1,h1))+'时';
  jieqi.innerHTML=sT1+'<br>'+sT2;

  readDiary(ya,ma,da);
  readDjsh(ya,ma,da);

  //特别处理1582年10月
  if(y1==1582&&m1==10){
    if(d1>=5&&d1<=14){
      jieri.innerHTML='';
    }
    jieqi.innerHTML=sT2;
  }

  if(sF=='元旦'||sF=='国庆节'||sF=='国际劳动节'||lF=='新年'){
    sjr.style.color='#880000';
    ljr.style.color='#880000';
  }

  var trackArgu='track('+y1+','+m1+','+d1+','+h1+','+lunM1+','+lunDt1+')';
 // timer2=setTimeout(trackArgu,500);
}

function Dwrite(y,m,d,h){

//dw_obj([y,m,d,h]);


  i1=(35+1-d+Day(y,m,d))%7;  //记录当月1号星期几
  var monthLength=D0(y,m+1,1)-D0(y,m,1);
  i2=monthLength+i1;  //当月最后一天单元格序号
  if(y==1582&&m==10)
    i2+=10;

  //农历信息
  var thislunM=lunMon(y,m,d); //当天的阴历月数
  var thislunDt=lunDate(y,m,d);
  var thislunD=floor(thislunDt-floor(thislunDt/100)*100);

  var firstlunM=lunMon(y,m,1); //当月1号的阴历月数
  var firstlunDt=lunDate(y,m,1);
  var firstlunD=floor(firstlunDt-floor(firstlunDt/100)*100);

  var secondlunM=lunMon(y,m,2); //当月2号的阴历月数
  var secondlunDt=lunDate(y,m,2);
  var secondlunD=floor(secondlunDt-floor(secondlunDt/100)*100);

  var lastlunM=lunMon(y,m,monthLength); //当月最后一天的阴历月数
  var lastlunDt=lunDate(y,m,monthLength);
  var lastlunD=floor(lastlunDt-floor(lastlunDt/100)*100);

  track(y,m,d,h,thislunM,thislunDt);  //一方面更新其他信息,一方面更新sN1,sDate1,sN2,sDate2

  //确定各日阴历日数
  var i=i2;
  do{
    lunMonth[i]=lastlunM;
    lunNum[i]=lastlunD+i-i2;
    i--;
  }while(lunNum[i+1]>=2)

  var j=i;
  for(i=i1+1;i<=j;i++){
    if(secondlunD!=1){
      lunMonth[i]=firstlunM;
      lunNum[i]=firstlunD+i-i1-1;
    }
    else{  //即一个阳历月跨三个阴历月，这个例外如：2049年5月（但例外极少）
      lunMonth[i1+1]=firstlunM;
      lunNum[i1+1]=firstlunD;
      lunMonth[i]=secondlunM;
      lunNum[i]=secondlunD+i-i1-2;
    }
  }

  for(var i=1;i<=42;i++){

    if(i>=i1+1&&i<i2+1){

      dateNum[i]=i-i1;//日期

      lunString='<br>'+lunDStr(lunNum[i]);

      if(lunNum[i]==1)
        lunString='<br>'+lunMStr(lunMonth[i])+'月';

      if(dateNum[i]==sDate1)
        lunString='<br>'+sStr(sN1);
      if(dateNum[i]==sDate2)
        lunString='<br>'+sStr(sN2);
      if(lunNum[i]==2&&(dateNum[i-1]==sDate1||dateNum[i-1]==sDate2))
        lunString='<br>'+lunMStr(lunMonth[i])+'月';

      if((m==1&&dateNum[i]==1)||(m==10&&dateNum[i]==1)||(m==5&&dateNum[i]==1)||(lunMonth[i]==1&&lunNum[i]==1))
        document.all["t"+i].style.color='#880000';

      else if(i%7==0)
        document.all["t"+i].style.color='#008800';

      else if(i%7==1)
        document.all["t"+i].style.color='#880000';
      else
        document.all["t"+i].style.color='#000000';

      //求朔望,日月食
      if(lunNum[i]==1||lunNum[i]==15||lunNum[i]==16||lunNum[i]==17)
        lunNum[i]=lunDate(y,m,dateNum[i]);

      document.all["t"+i].innerHTML='<b style="font-size:12pt;font-family:Arial Black;">'+dateNum[i]+'</b>'+'<span style="font-size:9pt;">'+lunString+'</span>';
      //确定是否有日记
      if(GetCookie(10000*y+100*m+dateNum[i],0)!=null)
        document.all["t"+i].style.textDecoration="underline";
      else
        document.all["t"+i].style.textDecoration="none";
    }

    else{
    dateNum[i]='';
    lunString='';
    document.all["t"+i].innerHTML='';
    }

    if(dateNum[i]==d){
      document.all["t"+i].style.backgroundColor='#ffffee';
      nowpoint=i;
    }
    else
      document.all["t"+i].style.backgroundColor='';
  }

}

Dwrite(y0,m0,d0,h0);


//专门用于处理格里历删除的那10天
function del10day(y,m,d,h){
  document.all["t1"].innerHTML='';
  document.all["t1"].style.backgroundColor='';

  for(var i=2;i<=5;i++){
    //日期
    dateNum[i]=i-1;

    //农历
    lunMonth[i]=9;
    lunNum[i]=14+dateNum[i];

    lunString='<br>'+lunDStr(lunNum[i]);
    document.all["t"+i].innerHTML='<b style="font-size:12pt;font-family:Arial Black;">'+dateNum[i]+'</b>'+'<span style="font-size:9pt;">'+lunString+'</span>';

    if(i==2)
      document.all["t"+i].style.color='#880000';

    else if(i%7==0)
      document.all["t"+i].style.color='#008800';

    else if(i%7==1)
      document.all["t"+i].style.color='#880000';
    else
      document.all["t"+i].style.color='#000000';

    if(dateNum[i]==da){
      document.all["t"+i].style.backgroundColor='#ffffee';
      nowpoint=i;
    }
    else
      document.all["t"+i].style.backgroundColor='';
  }

  for(var i=6;i<=22;i++){
    //日期
    dateNum[i]=i+9;

    //农历
    lunMonth[i]=9;
    lunNum[i]=4+dateNum[i];
    if(lunNum[i]>=30){
      lunNum[i]-=29;
      lunMonth[i]=10;
    }

    lunNum[3]=16.207565624965355;
    lunNum[17]=1.9675616262247786;

    lunString='<br>'+lunDStr(lunNum[i]);
    if(floor(lunNum[i])==1)
    lunString='<br>十月';
    if(floor(lunNum[i])==28)
    lunString='<br>霜降';

    document.all["t"+i].innerHTML='<b style="font-size:12pt;font-family:Arial Black;">'+dateNum[i]+'</b>'+'<span style="font-size:9pt;">'+lunString+'</span>';

    if(i%7==0)
      document.all["t"+i].style.color='#008800';

    else if(i%7==1)
      document.all["t"+i].style.color='#880000';
    else
      document.all["t"+i].style.color='#000000';

    if(dateNum[i]==da){
      document.all["t"+i].style.backgroundColor='#ffffee';
      nowpoint=i;
    }
    else
      document.all["t"+i].style.backgroundColor='';
  }

  for(var i=23;i<=42;i++){
    document.all["t"+i].innerHTML='';
    document.all["t"+i].style.backgroundColor='';
  }

  var lunMonth1=(d<26)?9:10;
  var lunDt=(d<=4||d>=15)?lunDate(1582,10,d):lunDate(1582,10,4);
  var lunD=floor(lunDt-floor(lunDt/100)*100);
  var lunDtStr=lunDStr(lunD);

  track(y,m,d,h,lunMonth1,lunDt);
}

function lookup(){
  var yInd=df.yr.options.selectedIndex;
  ya=parseFloat(df.yr.options[yInd].value);
  var mInd=df.mon.options.selectedIndex;
  ma=parseFloat(df.mon.options[mInd].value);
//  clearTimeout(timer2);
  if(ya==1582&&ma==10)
    del10day(ya,ma,da,ha);
  else
    Dwrite(ya,ma,da,ha);
}

function clicktd(who){
  if(who.style.backgroundColor=='#ffffee'){
    da=dateNum[nowpoint];
//    clearTimeout(timer2);
    track(ya,ma,da,ha,lunMonth[nowpoint],lunNum[nowpoint]);
    calCyc();
  }
}

df.yr.onchange=lookup;
df.mon.onchange=lookup;
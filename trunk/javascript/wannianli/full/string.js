//--------转换成字符串的函数--------//

//将单位天的纯小数转换成如同5:08的时间格式
function dToStr(dv){
  var h=floor(dv*24);
  var min=floor((dv*24-h)*60);
  if(min<10)
    min='0'+min;
  return h+':'+min;
}

//星期
function dayStr(v){
  return '日一二三四五六'.charAt(v%7);
}

//星座
function szodStr(v){
  return '摩羯宝瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手'.substring(2*v,2*v+2)+'座';
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
  var v0=abs(v);
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
  var vstr=str.charAt(floor(v/10)+10)+str.charAt(v%10);
  if(v==10)
    vstr='初十';
  return vstr;
}

//节气
function sStr(v){
  return '小寒大寒立春雨水惊蛰春分清明谷雨立夏小满芒种夏至小暑大暑立秋处暑白露秋分寒露霜降立冬小雪大雪冬至'.substring(2*v-2,2*v);
}

//公历类型
function ifgStr(v){
  if(v==-1){
    alert('公历历法去掉了1582年10月5日至10月14日，因而这十天在历史上不存在！');
    return('不存在');
  }
  else
    return (v)?'格里历':'儒略历';
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
function calCountDown(y,m,d,y1,m1,d1){
  return  floor(JD(y1,m1,d1,0,0,0,8)-JD(y,m,d,0,0,0,8));
}

function readDjsh(y,m,d){
  wdjsh.style.visibility='hidden';
  var v=GetCookie('countDown',0);
  if(v!=null){
    var v=v.split('!@#$%');
    var y1=parseFloat(v[1].substring(0,4));
    var m1=parseFloat(v[1].substring(4,6));
    var d1=parseFloat(v[1].substring(6,8));
  }
  
  showDjsh.innerHTML=(v==null)?'':('<center><p>距<b style="color:red;">'+v[0]+'</b></p><font size=-1 color=00aa00>（'+y1+'年'+m1+'月'+d1+'日）</font>'+'<font style="font-size:12pt;color:aa0000;">还有&nbsp;<font style="font-size:20pt;font-family:Arial Black;color:ff0000;background-color:eeeeee;">'+calCountDown(ya,ma,da,y1,m1,d1)+'</font>&nbsp;天</font></center>');
  if(calCountDown(ya,ma,da,y1,m1,d1)==0)
    showDjsh.innerHTML='<center><font style="font-size:14pt;">今天是</font><br><b style="font-size:20pt;color:red">'+v[0]+'</b></center>';
  if(calCountDown(ya,ma,da,y1,m1,d1)<0)
    showDjsh.innerHTML=(v==null)?'':('<center><b style="font-size:20pt;color:red">'+v[0]+'</b><br><font size=-1 color=00aa00>（'+y1+'年'+m1+'月'+d1+'日）</font>'+'<br><font style="font-size:12pt;color:aa0000;">已经过了&nbsp;<font style="font-size:20pt;font-family:Arial Black;color:ff0000;background-color:eeeeee;">'+(-calCountDown(ya,ma,da,y1,m1,d1))+'</font>&nbsp;天了！</font></center>')

}

function setDjsh(){
  wdjsh.style.visibility='visible';

  var v=GetCookie('countDown',0);
  if(v!=null){
    var v=v.split('!@#$%');
    djshtxt.value=v[0];
  }
  clearTimeout(timer2);
}

function finishDjsh(){
  var yInd=djshYr.options.selectedIndex;
  var y1=parseFloat(djshYr.options[yInd].value);
  var mInd=djshMon.options.selectedIndex;
  var m1=parseFloat(djshMon.options[mInd].value);
  var dInd=djshDt.options.selectedIndex;
  var d1=parseFloat(djshDt.options[dInd].value);

  SetCookie('countDown',djshtxt.value+'!@#$%'+(10000*y1+100*m1+d1),'forever',null,null,false);
  if(djshtxt.value!=''){
    SetCookie('check',djshtxt.value,'forever',null,null,false);
    var v=GetCookie('check',0);
    if(v==null){
      alert('字数已满,请精简一些,或者删掉以前的不要的日记!');
    return false;
    }
  }
  djshtxt.value='';

  track(ya,ma,da,ha,lunMon(ya,ma,da),floor(lunDate(ya,ma,da)));
}

function deleteDjsh(){
  DeleteCookie('countDown',null,null);
  showDjsh.innerHTML='';
}

function cancleWDjsh(){
  wdjsh.style.visibility="hidden"
  track(ya,ma,da,ha,lunMon(ya,ma,da),floor(lunDate(ya,ma,da)));
}

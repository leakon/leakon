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
  
  showDjsh.innerHTML=(v==null)?'':('<center><p>��<b style="color:red;">'+v[0]+'</b></p><font size=-1 color=00aa00>��'+y1+'��'+m1+'��'+d1+'�գ�</font>'+'<font style="font-size:12pt;color:aa0000;">����&nbsp;<font style="font-size:20pt;font-family:Arial Black;color:ff0000;background-color:eeeeee;">'+calCountDown(ya,ma,da,y1,m1,d1)+'</font>&nbsp;��</font></center>');
  if(calCountDown(ya,ma,da,y1,m1,d1)==0)
    showDjsh.innerHTML='<center><font style="font-size:14pt;">������</font><br><b style="font-size:20pt;color:red">'+v[0]+'</b></center>';
  if(calCountDown(ya,ma,da,y1,m1,d1)<0)
    showDjsh.innerHTML=(v==null)?'':('<center><b style="font-size:20pt;color:red">'+v[0]+'</b><br><font size=-1 color=00aa00>��'+y1+'��'+m1+'��'+d1+'�գ�</font>'+'<br><font style="font-size:12pt;color:aa0000;">�Ѿ�����&nbsp;<font style="font-size:20pt;font-family:Arial Black;color:ff0000;background-color:eeeeee;">'+(-calCountDown(ya,ma,da,y1,m1,d1))+'</font>&nbsp;���ˣ�</font></center>')

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
      alert('��������,�뾫��һЩ,����ɾ����ǰ�Ĳ�Ҫ���ռ�!');
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

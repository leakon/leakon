function readDiary(y,m,d){
  wdiary.style.visibility='hidden';
  var v=GetCookie(10000*y+100*m+d,0);
  diaryshow.innerHTML=(v==null)?'':v;
}

function writeDiary(y,m,d){
  wdiary.style.visibility='visible';
  diarytxt.value=diaryshow.innerHTML;

  clearTimeout(timer2);
}

function finishDiary(y,m,d){
  SetCookie(10000*y+100*m+d,diarytxt.value,'forever',null,null,false);
  if(diarytxt.value!=''){
    SetCookie('check',diarytxt.value,'forever',null,null,false);
    var v=GetCookie('check',0);
    if(v==null){
      alert('字数已满,请精简一些,或者删掉以前的不要的日记!');
    return false;
    }
  }
  diarytxt.value='';
  readDiary(y,m,d);
  document.all["t"+nowpoint].style.textDecoration="underline";

  track(ya,ma,da,ha,lunMon(ya,ma,da),floor(lunDate(ya,ma,da)));
}

function deleteDiary(y,m,d){
  DeleteCookie(10000*y+100*m+d,null,null);
  diaryshow.innerHTML='';
  document.all["t"+nowpoint].style.textDecoration="none";
}

function cancleWDiary(){
  wdiary.style.visibility="hidden"
  track(ya,ma,da,ha,lunMon(ya,ma,da),floor(lunDate(ya,ma,da)));
}


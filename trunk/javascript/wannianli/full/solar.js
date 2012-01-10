//---------公历--------//

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

//年差天数
function D(y){
  var v=(y-1)*365+floor((y-1)/4);  //Julian的年差天数
  if(y>1582)
    v+=-floor((y-1)/100)+floor((y-1)/400);  //Gregorian的年差天数
  return v;
}

//等效标准天数
function erD(y,m,d){
  var v=(y-1)*365+floor((y-1)/4)+D0(y,m,d)-2;  //Julian的等效标准天数
  if(y>1582)
    v+=-floor((y-1)/100)+floor((y-1)/400)+2;  //Gregorian的等效标准天数
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

//星座
function sZod(m,d){
  var zodd=new Array(1222,122,222,321,421,522,622,722,822,922,1022,1122,1222);
  if((100*m+d)>=zodd[0]||(100*m+d)<zodd[1])
    var i=0;
  else
    for(var i=1;i<12;i++){
    if((100*m+d)>=zodd[i]&&(100*m+d)<zodd[i+1])
      break;
    }
  return i;
}
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
  return round(rem(y-3,60)); 
}

//月干支
function mGz(y,m,d,h){

  var sN0=2*m-2;
  var sDt0=S(y,sN0,1);
  var sD0=antiD0(y,floor(sDt0));
  var sM0=floor(sD0/100);
  var sDate0=sD0%100+tail(sDt0);

  var sN1=2*m-1;
  var sDt1=S(y,sN1,1);
  var sD1=antiD0(y,floor(sDt1));
  var sM1=floor(sD1/100);
  var  sDate1=sD1%100+tail(sDt1);

  var sN2=2*m;
  var sDt2=S(y,sN2,1);
  var sD2=antiD0(y,floor(sDt2));
  var sM2=floor(sD2/100);
  var  sDate2=sD2%100+tail(sDt2);

  var sN3=2*m+1;
  if(sN3>24)
    sN3-=24;
  var sDt3=S(y,sN3,1);
  var sD3=antiD0(y,floor(sDt3));
  var sM3=floor(sD3/100);
  var  sDate3=sD3%100+tail(sDt3);

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

  sN1=rem(sN1-1,24)+1;
  sN2=rem(sN2-1,24)+1;

  var mL=D0(y,m,31)-D0(y,m,0);
  if(sDate2>mL)
    sDate2-=mL;

  var jqDate=(sN1%2==1)?sDate1:sDate2;  //"节气"(n为奇数)所在的阳历日数

  var gzM=((d+h/24)<jqDate)?(m-2):(m-1);   //干支月
  if(gzM<=0)  
    gzM+=12;
  return round(rem(12*gan(yGz(y,m,d))+gzM-10,60)); 
}

//日干支
function dGz(y,m,d,h){
  var gzD=(h<23)?erD(y,m,d):erD(y,m,d)+1;
  return round(rem(gzD+15,60)); 
}

//时干支
function hGz(y,m,d,h){
  var v=12*gan(dGz(y,m,d,h))+floor((h+1)/2)-11;
  if(h==23)
    v-=12; 
  return round(rem(v,60));
}

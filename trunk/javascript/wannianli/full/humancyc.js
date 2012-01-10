function humanCyc(y,m,d,by,bm,bd,n){
  var cyc=new Array(33,23,28);
  var dD=JD(y,m,d,0,0,0,8)-JD(by,bm,bd,0,0,0,8);
  return  sin(dD*2*PI()/cyc[n-1]);
}

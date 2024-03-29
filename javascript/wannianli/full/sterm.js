//节气函数
function S(y,n,pd){  //pd取值为0或1，分别表示平气和定气,该函数返回节气的D0值
  var juD=y*(365.2423112-6.4e-14*(y-100)*(y-100)-3.047e-8*(y-100))+15.218427*n+1721050.71301;//儒略日
  var tht=3e-4*y-0.372781384-0.2617913325*n;//角度
  var yrD=(1.945*sin(tht)-0.01206*sin(2*tht))*(1.048994-2.583e-5*y);//年差实均数
  var shuoD=-18e-4*sin(2.313908653*y-0.439822951-3.0443*n);//朔差实均数
  var vs=(pd)?(juD+yrD+shuoD-erD(y,1,0)-1721425):(juD-erD(y,1,0)-1721425);
  return vs;
}

function getCookieVal(offset,ifScape){   //ifScape=1表示返回值未解码，=0表示解码
  var endstr=document.cookie.indexOf(";", offset); 
  if(endstr==-1) 
    endstr=document.cookie.length; 
  return (ifScape)?document.cookie.substring(offset, endstr):unescape(document.cookie.substring(offset, endstr)); 
} 

function FixCookieDate(date){ 
  var base=new Date(0); 
  var skew=base.getTime(); // dawn of (Unix) time - should be 0 
  if (skew>0) // Except on the Mac - ahead of its time 
  date.setTime(date.getTime()-skew); 
} 

function GetCookie(name,ifScape){ 
  var arg=name+"="; 
  var alen=arg.length; 
  var clen=document.cookie.length; 
  var i = 0; 
  while (i<clen){ 
    var j = i + alen; 
    if(document.cookie.substring(i, j) == arg) 
      return getCookieVal(j,ifScape); 
    i=document.cookie.indexOf(" ", i) + 1; 
    if(i==0)
      break; 
  } 
  return null; 
} 

function SetCookie(name,value,expires,path,domain,secure) { 
  if(expires=='forever'){
    t=new Date("December 31, 2100");
    expiry="; expires="+t.toGMTString();
  }
  else
    expiry=(expires) ? "; expires="+expires.toGMTString() : "";
  document.cookie = name + "="+escape(value)+
   expiry +
   ((path) ? "; path=" + path : "") + 
   ((domain) ? "; domain=" + domain : "") + 
   ((secure) ? "; secure" : ""); 
} 

function DeleteCookie(name,path,domain){ 
  if (GetCookie(name)) { 
    document.cookie = name + "=" + 
     ((path) ? "; path=" + path : "") + 
     ((domain) ? "; domain=" + domain : "") + 
     "; expires=Thu, 01-Jan-70 00:00:01 GMT"; 
  } 
} 

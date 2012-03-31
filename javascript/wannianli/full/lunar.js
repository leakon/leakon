//----------------------------------ũ��������Ϣ------------------------------------------
var starY=-849;  //��¼�ӹ�Ԫǰ850�꿪ʼ
var leapM='0c0080050010a0070030c0080050010a0070030c0080050020a0070030c0080050020a0070030c0090050020a0070030c0090050020a0060030c0060030c00900600c0c0060c00c00c00c0c000600c0c0006090303030006000c00c060c0006c00000c0c0c0060003030006c00009009c0090c00c009000300030906030030c0c00060c00090c0060600c0030060c00c003006009060030c0060060c0090900c00090c0090c00c006030006060003030c0c00030c0060030c0090060030c0090300c0080050020a0060030c0080050020b0070030c0090050010a0070030b0090060020a0070040c0080050020a0060030c0080050020b0070030c0090050010a0070030b0090060020a0070040c0080050020a0060030c0080050020b0070030c0090050000c00900909009009090090090090900900909009009009090090090900900900909009009090090090090900900909009009090090090090900900909009009009090090090900900900909009009090060030c0090050010a0070030b008005001090070040c0080050020a0060030c0090040010a0060030c0090050010a0070030b0080050010a008005001090050020a0060030c0080040010a0060030c0090050010a0070030b0080050010a0070030b008005001090070040c0080050020a0060030c0080040010a0060030c0090050010a0070030b008005001090070040c0080050020a0060030c0080040010a0060030c0090050010a0060030c0090050010a0070030b008005001090070040c0080050020a0060030c0080040010a0070030b0080050010a0070040c0080050020a0060030c0080040010a0070030c0090050010a0070030b0080050020a0060030c0080040010a0060030c0090050050020a0060030c0090050010b0070030c0090050010a0070040c0080040020a0060030c0080050020a0060030c0090050010a0070030b0080040020a0060040c0090050020b0070030c00a0050010a0070030b0090050020a0070030c0080040020a0060030c0090050010a0070030c0090050030b007005001090050020a007004001090060020c0070050c0090060030b0080040020a0060030b0080040010a0060030b0080050010a0050040c0080050010a0060030c0080050010b0070030c007005001090070030b0070040020a0060030c0080040020a0070030b0090050010a0060040c0080050020a0060040c0080050010b0070030c007005001090070030c0080050020a0070030c0090050020a0070030c0090050020a0060040c0090050020a0060040c0090050010b0070030c0080050030b007004001090060020c008004002090060020a008004001090050030b0080040020a0060040b0080040c00a0060020b007005001090060030b0070050020a0060020c008004002090070030c008005002090070040c0080040020a0060040b0090050010a0060030b0080050020a0060040c0080050010b00700300108005001090070030c0080050020a007003001090050030a0070030b0090050020a0060040c0090050030b0070040c0090050010c0070040c0080060020b00700400a090060020b007003002090060020a005004001090050030b007004001090050040c0080040c00a0060020c007005001090060030b0070050020a0060020c008004002090060030b008004002090060030b0080040020a0060040b0080040010b0060030b0070050010a00600400207005003080060040030700500307006004003070050030800600400307005004090060040030700500409006005002070050030a0060050030700500400206004002060050030020600400307005004090060040030700500408007005003080050040a00600500307005004002060050030800500400206005002070050040020600500307006004002070050030800600400307005004080060040a006005003080050040020700500409006004002060050030b0060050020700500308006004003070050040800600400307005004080060040020';//-849-2100
function leapMon(y){
  var v=leapM.charAt(y-starY);
  if(v=='a')
    v=10;
  if(v=='b')
    v=11;
  if(v=='c')
    v=12;
  return parseInt(v);
}
//----------------------------------------------------------------------------------------

//------ũ��������ʳ------//
//�ǶȺ���
function ang(x,t,c1,t0,t2,t3){
  return tail(c1*x)*2*PI()+t0-t2*t*t-t3*t*t*t;
}

//����ũ������������ʳ��Ϣ�ĺ�������-324.57923415�����ű�ʾ���£���λ3��ʾ��ƫʳ(2Ϊ��ȫʳ,1Ϊ��ʳ0Ϊ��ʳ),��λ��ʮλ��ʾ����,С��������˷��ʱ��(��λΪ��,�����첻˷������С������Ϊ��)

function lunDate(y,m,d){
  var t=(y-1899.5)/100;
  var ms=floor((y-1900)*12.3685);
  var rpi=180/PI();
  var zone=8;  //ʱ��
  var f0=ang(ms,t,0,0.75933,2.172e-4,1.55e-7)+0.53058868*ms-8.37e-4*t+zone/24+0.5;
  var fc=0.1734-3.93e-4*t;
  var j0=693595+29*ms;
  var aa0=ang(ms,t,0.08084821133,359.2242/rpi,0.0000333/rpi,0.00000347/rpi);
  var ab0=ang(ms,t,7.171366127999999e-2,306.0253/rpi,-0.0107306/rpi,-0.00001236/rpi);
  var ac0=ang(ms,t,0.08519585128,21.2964/rpi,0.0016528/rpi,0.00000239/rpi);
  var leap=0;  //������,0����
  var ecli=0;  //����ʳ
  var lunD=-1;  //ũ������
  var shuoD=0;  //�������µ�����˷����
  var shuoT=0;  //�������µ�˷ʱ��
  var wangD=0;  //�������µ���ʱ��
  var wangT=0;  //�������µ�����������

  for(var k=-1;k<=13;k+=0.5){  //k=����Ϊ˷,k=������Ϊ��
    var aa=aa0+0.507984293*k;
    var ab=ab0+6.73377553*k;
    var ac=ac0+6.818486628*k;
    var f1=f0+1.53058868*k+fc*sin(aa)-0.4068*sin(ab)+0.0021*sin(2*aa)+0.0161*sin(2*ab)+0.0104*sin(2*ac)-0.0074*sin(aa-ab)-0.0051*sin(aa+ab);
    var j=j0+28*k+f1;  //˷�����ĵ�Ч��׼������ʱ��

    //��¼��ǰ���ڵ�jֵ 
    var lunD0=erD(y,m,d)-floor(j);  //��ǰ�վ�˷�յĲ�ֵ
    if(k==floor(k)&&lunD0>=0&&lunD0<=29){
      var k1=k;  //��¼��ǰʱ���Ӧ��kֵ
      shuoT=tail(j);
      lunD=lunD0+1;
    }
    if(k==(k1+0.5)){
      wangT=tail(j);  
      wangD=floor(j)-(erD(y,m,d)-lunD+1)+1;
    }
    
    //�ж�����ʳ
    if((lunD==1&&k==k1)||(lunD==wangD&&k==(k1+0.5))){
      if(abs(sin(ac))<=0.36){
        var s=5.19595-0.0048*cos(aa)+0.002*cos(2*aa)-0.3283*cos(ab)-0.006*cos(aa+ab)+0.0041*cos(aa-ab);
        var r=0.207*sin(aa)+0.0024*sin(2*aa)-0.039*sin(ab)+0.0115*sin(2*ab)-0.0073*sin(aa+ab)-0.0067*sin(aa-ab)+0.0117*sin(2*ac);
        var p=abs(s*sin(ac)+r*cos(ac));
        var q=0.0059+0.0046*cos(aa)-0.0182*cos(ab)+0.0004*cos(2*ab)-0.0005*cos(aa+ab);
        if(p-q<=1.5572){
          ecli=1;  //��ʳ
          if(k!=floor(k)){
            if(p+q>=1.0129)
              ecli=3;  //��ƫʳ
            else
              ecli=2;  //��ȫʳ
          } 
        }
      }
     }
  } 
//kѭ������

  var v=lunD;  //����ֵ
  if(v==1)
    v+=shuoT  //˷���򷵻�˷��ʱ��
  if(v==wangD)
    v+=wangT;  //�����򷵻�����ʱ��
    
  return(v+ecli*100)
}


function lunMon(y,m,d){
  var lunDt=lunDate(y,m,d);
  var lunD=floor(lunDt-floor(lunDt/100)*100);  //ũ������
  var leapN=0;  //�ӵ��굽-849�����������
  for(var i=-849;i<=y;i++){
  if(leapMon(i)!='0')
    leapN++;
  }
  var MonN=round((erD(y,m,d)-erD(-849,1,21)-lunD)/29.530588)-leapN  //�ӵ��굽-849�����Ч������(�۳�����)

  if(y<=240) MonN++;
  if(y<=237) MonN--;
  if(y<24) MonN++;
  if(y<9) MonN--;
  if(y<=-255) MonN++;   
  if(y<=-256) MonN+=2;
  if(y<=-722) MonN++;  //��ʷ�ϵ��޸��½�

  var lunM=round(rem(MonN-3,12)+1);
  if(lunM==leapMon(y-1)&&m==1&&d<lunD)
    lunM*=-1;    //���y-1��ĩ�������Ҹ��½ӵ���y��,��y�����Ҳ������
  else{
    if(lunM==leapMon(y))
      lunM*=-1;
    else{
      if(lunM<leapMon(y)||m<lunM&&leapMon(y))
        lunM++;  //���y�������µ�����δ��������ǰ���۳��˱�������£�����Ӧ������
      lunM=round(rem(lunM-1,12)+1);
    }
  }

  return lunM;  
}

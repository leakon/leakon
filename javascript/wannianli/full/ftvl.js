//--------���պ���--------//


//��������
function sFtvl(m,d){
var sFtv=new Array(
"0101Ԫ��",
"0202����ʪ����",
"0207������Ԯ�Ϸ���",
"0210���������",
"0214���˽�",
"0301���ʺ�����",
"0303ȫ��������",
"0305ѧ�׷���",
"0308���ʸ�Ů��",
"0312ֲ����",
"0314���ʾ�����",
"0315������Ȩ����",
"0317�й���ҽ�� ���ʺ�����",
"0321����ɭ���� �����������ӹ����� ���������",
"0322����ˮ��",
"0323����������",
"0324������ν�˲���",
"0325ȫ����Сѧ����ȫ������",
"0330����˹̹������",
"0401���˽�",
"0407����������",
"0422���������",
"0423����ͼ��Ͱ�Ȩ��",
"0424�Ƿ����Ź�������",
"0501�����Ͷ���",
"0504���������",
"0505��ȱ����������",
"0508�����ʮ����",
"0512���ʻ�ʿ��",
"0515���ʼ�ͥ��",
"0517���������",
"0518���ʲ������",
"0520ȫ��ѧ��Ӫ����",
"0523����ţ����",
"0531����������",
"0601���ʶ�ͯ��",
"0605���绷����",
"0606ȫ��������",
"0617���λ�Į���͸ɺ���",
"0623���ʰ���ƥ����",
"0625ȫ��������",
"0626���ʷ���Ʒ��",
"0701�й������������� ��ۻع������ ���罨����",
"0702��������������",
"0707�й�������ս��������",
"0711�����˿���",
"0730 ���޸�Ů��",
"0801��һ������",
"0908����ɨä��",
"0910�й���ʦ��",
"0914������������",
"0916���ʺ�ƽ�� ���ʳ����㱣����",
"0918�š�һ���±������",
"0920���ߵ����� ���ʰ�����",
"0927����������",
"1001����� ���������� �������˽�",
"1002 ���ʺ�ƽ���������ɶ�����",
"1004 ���綯����",
"1005����ס����",
"1008ȫ����Ѫѹ�� �����Ӿ���",
"1009����������",
"1010�������������� ���羫��������",
"1013���籣���� ���ʽ�ʦ��",
"1014�����׼��",
"1015����ä�˽�(�����Ƚ�)",
"1016������ʳ��",
"1017��������ƶ����",
"1022���紫ͳҽҩ��",
"1024���Ϲ��� ���緢չ��Ϣ��",
"1031�����ڼ��� ��ʥ��ǰҹ",
"1107ʮ������������������",
"1108�й�������",
"1109ȫ��������ȫ����������",
"1110���������",
"1114����������",
"1117���ʴ�ѧ���� ����ѧ����",
"1121�����ʺ��� ���������",
"1129������Ԯ����˹̹���������",
"1201���簮�̲���",
"1203����м�����",
"1205���ʾ��ú���ᷢչ־Ը��Ա��",
"1208 ���ʶ�ͯ������",
"1209����һ�������˶� ����������",
"1210������Ȩ��",
"1212�����±������",
"1213�Ͼ�����ɱ(1937��)�����գ�����Ѫ��ʷ��",
"1221����������",
"1224ƽ��ҹ",
"1220���Żع������",
"1225ʥ����",
"1229���������������");

var str=''; //��������

for(i in sFtv){
   if(parseFloat(sFtv[i].substring(0,4))==100*m+d)
      str+=sFtv[i].substring(4,100);
}
  return str;
}

//ũ������
function lunFtvl(lunM,lunD){
var lunFtv=new Array(
"0101����",
"0103�����",
"0105��·������",
"0108������",
"0109���ʵ۵�",
"0111̫�����ﵮ",
"01139ɢ���� ������",
"0115Ԫ����",
"0116��⽽� ����",
"0119�𴦻���",
"0120Ů洲����� �Ƶ��ż�",
"0125��ֽ�",
"0127���ˮ���ٵ�",
"0202��ͷ�� ̫껷����ϼ�",
"0203�Ĳ���",
"0208������ �廨��",
"0210�ʵ���",
"0212������",
"0215���ӵ�",
"0219������",
"0228������ ᷵�",
"0303���Ƚ� ̤���",
"0305������",
"0310���ֽ�",
"0315������ ������",
"0316����",
"0318������",
"0320³�൮",
"0322�������ﵮ",
"0323������浮",
"0328�����ʦ��",
"0401��ͽ�",
"0402�������",
"0408ϴ������� ţ���� ���½�",
"0410��鵮",
"0411���Ӽ�",
"0414�������� ������",
"0415����Ȩ�� ������������",
"0417��Ů��",
"0418����Ǩ�ƽ�",
"0419佻���",
"0426�׵���ũ�ϵ�",
"0428��ȵ��",
"0501Ů����",
"0504�ɻ���",
"0505�����",
"0511����",
"0513����",
"0522�ܶ���",
"0529�����",
"0606���ܽ� �̹���",
"0612�����וּ�",
"0615�����",
"0616���½�",
"0619̫���� ������",
"0623����",
"0624������",
"0707���ɽ�",
"0712����������",
"0713��ԯ��",
"0715��Ԫ��",
"0723�������",
"0727���ϵ�",
"0801��ҽ��",
"0803��٢��",
"0815�����",
"0818�۳���",
"0824����",
"0909������",
"0913��Ь��",
"0916���൮",
"0919������",
"0930�ɲν�",
"1001�ͺ��½� �����",
"1015��Ԫ�� �ĳɹ�����",
"1016�̹Ž�",
"1208���˽�",
"1212�ٸ��� �ϻ����ﵮ",
"1223ϴ����",
"1224С��",
"1225�ϵ��½�֮��")

var str=''; //ũ������

for(i in lunFtv){
   if(parseFloat(lunFtv[i].substring(0,4))==100*lunM+lunD)
      str+=lunFtv[i].substring(4,100);
}
  return str;
}

//��������
function jqFtvl(y,m,d){
  var jqFtv=new Array();
  for(var i=1;i<=24;i++){
    var ind=(i<10)?('0'+i):i;
    jqFtv[i]=ind+''+sStr(i);
  }

  addName=new Array('','','','','','','��','',' ����','','','','','','','','','','','','','','','');

  var str=''; //��������
  var thisD0=D0(y,m,d);

  for(i in jqFtv){
    if(floor(S(y,parseFloat(jqFtv[i].substring(0,2)),1))==thisD0)
      str+=jqFtv[i].substring(2,100)+addName[i-1];
  }
  
  //÷��
  var dG=gan(dGz(y,m,d,0));
  var dZ=zhi(dGz(y,m,d,0));

  var s11=floor(S(y,11,1));
  if(thisD0>=s11&&thisD0<s11+10&&dG==3)
    str+=' ��÷';
  var s13=floor(S(y,13,1));
  if(thisD0>=s13&&thisD0<s13+12&&dZ==8)
    str+=' ��÷';

  //����
  var s12=floor(S(y,12,1));
  var s15=floor(S(y,15,1));
  var n=(dG-7)%10+1;
  if(n<=0)
    n+=10;
  var firsrD0=thisD0-n+1;
  if(firsrD0>=s12+20&&firsrD0<s12+30)
    str+=' ������'+n+'��';
  if(firsrD0>=s15&&firsrD0<s15+10)
    str+=' ĩ����'+n+'��';
  else {
  if(firsrD0>=s12+30&&firsrD0<s12+40)
    str+=' �з���'+n+'��';
  if(firsrD0>=s12+40&&firsrD0<s12+50)
    str+=' �з���'+(n+10)+'��';
  }

  //�ž�
  var s24=floor(S(y,24,1));
  var s_24=floor(S(y-1,24,1));
  var d1=thisD0-s24;
  var d2=thisD0-s_24+D0(y-1,12,31)-D0(y-1,1,0);
  if(d1>=0||d2<=80){
    if(m==12){
      w=1;
      v=d1+1;
      if(v>9){
        w+=1;
        v-=9;
      }
    }
    else{
      var w=floor(d2/9)+1;
      var v=round(rem(d2,9))+1;
    }
  str+=' '+lunDStr(w).charAt(1)+'��'+'��'+v+'��';
  }

  return str;
}

//���˼�����
function manFtvl(m,d){
var manFtv=new Array(
"0104�Ÿ��������ֵ���",
"0108�ܶ�������������",
"0106ʥŮ��µ���",
"0112�ܿˡ��׶ص���",
"0115Ī�ﰧ����",
"0117�������ֵ���",
"0119���ص���",
"0122�������",
"0123��֮�򵮳�",
"0127Ī���ص���",
"0129��������������",
"0130�ʵص���",
"0131����ص���",
"0203�ŵ¶��ɵ���",
"0207�Ž��з򵮳�",
"0211�������������Ҹ�˹����",
"0212�ֿϣ�����ĵ���",
"0217��³ŵ����",
"0218���򵮳�",
"0219����ᵮ��",
"0222���ȣ��屾������ʢ�ٵ���",
"0226�������",
"0302˹�����ǵ���",
"0304���������",
"0305�ܶ�������",
"0306���������׿������޵���",
"0307�ÿ��嵮��",
"0314����˹̹����",
"0321�ͺգ�������˹������",
"0322��������",
"0328�߶�������",
"0401���٣�����������",
"0415����浮��",
"0416׿���ֵ���",
"0420���֮����",
"0422���������£��±���Ĭ����",
"0423���ʿˣ�ɯʿ���ǵ���",
"0430��˹����",
"0505����˼����",
"0507��ɷ�˹����̩�������",
"0511���Ǻ�����",
"0511���ϣ����",
"0520�Ͷ����˵���",
"0522�߸��ɵ���",
"0531����������",
"0601��������",
"0602��������",
"0608��������",
"0715�ײ��ʵ���",
"0805����������",
"0808�����˵���",
"0826���㵮��",
"0828��µ���",
"0909ë������������",
"0925³Ѹ����",
"0926�͸���򵮳�",
"0928���ӵ���",
"0929��˹�����˹������",
"1011�����ȵ���",
"1021ŵ��������",
"1022��˹�ص���",
"1026٤���ߵ���",
"1029����ȵ���",
"1007������˵���",
"1108���׵���",
"1112����ɽ����",
"1124�����浮��",
"1128����˹����",
"1201��µ���",
"1205��ɭ������",
"1211��������",
"1213��������",
"1216����ҵ���",
"1221˹���ֵ���",
"1225ţ�ٵ���",
"1226ë�󶫵���",
"1229�����ж�˹̩����");

var str=''; //���˼�����

for(i in manFtv){
   if(parseFloat(manFtv[i].substring(0,4))==100*m+d)
      str+=manFtv[i].substring(4,100);
}
  return str;
}
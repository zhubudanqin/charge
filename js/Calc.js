/**
 * 计算器
 * DOM1:计算器文本显示Input
 * DOM2:金额显示Input
 */
var FKeyPad = document.Keypad;  //获取计算器文本显示Input用于获取用户输入 
var Accum = 0;
var FlagNewNum = false;         //用于判断是否是一个新数字,默认false
var PendingOp = "";             //用于记住上一次操作运算符号：用于结果计算
var targetInput = null;
var s_leghet = 0;

//点击数字键盘,计算器文本显示Input显示数字，注意判断输入是否为新数字
function NumPressed (Num)
{   
	//新数字直接显示数字，将新数字标记置为false
    if (FlagNewNum) {
        FKeyPad.ReadOut.value  = Num;
        FlagNewNum = false;
    }else{
    	
        if(FKeyPad.ReadOut.value == "0")
            FKeyPad.ReadOut.value = Num;
        else
            FKeyPad.ReadOut.value += Num;
    }
}
//显示结果
function resultShow(obj){
	 //隐藏计算器
     $("#calc").hide();	 
     //显示Input如果为空，则显示0,不为空显示运算结果
     $("#ReadOut").val($("#ReadOut").val()==""?0:$("#ReadOut").val());
     //将结果显示金额栏
//      console.info($(obj));
     $(obj).val($("#ReadOut").val());
}
//显示关闭计算器
function CalcShow(){
    $("#calc").toggle();	
}

//撤销输入(Back)
function ClearNum ()
{   
    s_leghet = Len(FKeyPad.ReadOut.value);
    if (s_leghet>1) {
        FKeyPad.ReadOut.value = FKeyPad.ReadOut.value.substr(0,s_leghet-1);
    }
}

//+-*/运算操作
function Operation (Op)
{   
    var Readout = FKeyPad.ReadOut.value;
    alert(Readout);
    //直接输入+-*/,之前没有输入数字
    if (FlagNewNum && PendingOp != "=");  //FlagNewNum默认是false
        //nothing to do 
    else
    {   //将是否为新数标记为true
        FlagNewNum = true;
        if ( '+' == PendingOp )
            //				Accum += parseFloat(Readout);
            Accum = accAdd(Accum,Readout);
        else if ( '-' == PendingOp )
            //				Accum -= parseFloat(Readout);
            Accum = accSub(Accum,Readout);
        else if ( '/' == PendingOp )
            //				Accum /= parseFloat(Readout);
            Accum = accDiv(Accum,Readout);
        else if ( '*' == PendingOp )
            //				Accum *= parseFloat(Readout);
            Accum = accMul(Accum,Readout);
        else
            Accum = parseFloat(Readout);
        FKeyPad.ReadOut.value = Accum;
        PendingOp = Op;    //设置本次操作运算符
    }
}

//@Deprecated 过时 
function Decimal ()
{
    var curReadOut = FKeyPad.ReadOut.value;
    if (FlagNewNum)
    {
        curReadOut = "0.";
        FlagNewNum = false;
    }else{
        if (curReadOut.indexOf(".") == -1)
            curReadOut += ".";
    }

    FKeyPad.ReadOut.value = curReadOut;
}



//AC清0
function Clear ()
{
    Accum = 0;
    PendingOp = "";
    ClearEntry();
}

function ClearEntry ()
{
    FKeyPad.ReadOut.value = "0";
    FlagNewNum = true;
}

//@Deprecated 过时
function Neg ()
{
    FKeyPad.ReadOut.value = parseFloat(FKeyPad.ReadOut.value) * -1;
}
//@Deprecated 过时
function Percent ()
{
    FKeyPad.ReadOut.value = (parseFloat(FKeyPad.ReadOut.value) / 100) * parseFloat(Accum);
}
	

//@Deprecated 过时
function showCalc(target)
{		
    var position,calcObj;
    FKeyPad = document.getElementById('Keypad');
    targetInput = document.getElementById(target);	
    calcObj = document.getElementById('calc');
			
    position = fetchOffset(targetInput);	  	
    calcObj.style.display = 'block';
    calcObj.style.top = position.top+22;
    calcObj.style.left = position.left-40;	    	
    document.getElementById('ReadOut').value = '0';
}
//@Deprecated 
function HideCalc()
{
    document.getElementById('calc').style.display = 'none';
    targetInput.value = document.getElementById('ReadOut').value;
}	
 
//返回值：arg1加上arg2的精确结果
function accAdd(arg1,arg2){
    var r1,r2,m;
    try{
        r1=arg1.toString().split(".")[1].length
        }catch(e){
        r1=0
        }
    try{
        r2=arg2.toString().split(".")[1].length
        }catch(e){
        r2=0
        }
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}

//返回值：arg1减上arg2的精确结果
function accSub(arg1,arg2){
    return accAdd(arg1,-arg2);
}

//返回值：arg1乘以arg2的精确结果
function accMul(arg1,arg2)
{
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{
        m+=s1.split(".")[1].length
        }catch(e){}
    try{
        m+=s2.split(".")[1].length
        }catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

//返回值：arg1除以arg2的精确结果
function accDiv(arg1,arg2){
    var t1=0,t2=0,r1,r2;
    try{
        t1=arg1.toString().split(".")[1].length
        }catch(e){}
    try{
        t2=arg2.toString().split(".")[1].length
        }catch(e){}
    with(Math){
        r1=Number(arg1.toString().replace(".",""))
        r2=Number(arg2.toString().replace(".",""))
        return (r1/r2)*pow(10,t2-t1);
        }
}
//计算文本长度
function Len(str)
{
    var i,sum;
    sum=0;
    for(i=0;i<str.length;i++)
    {
        if ((str.charCodeAt(i)>=0) && (str.charCodeAt(i)<=255)) //ASCII表0至255(英文字符)
            sum=sum+1;
        else
            sum=sum+2;                                           //汉字则加2位
    }
    return sum;
}
	
	
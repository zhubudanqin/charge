!function(){var $=function(a){return document.getElementById(a)},qqdomain=function(){var a=/^https?:\/\/([0-9a-zA-Z\-\.]+)(?::\d+)?\//.exec(document.referrer),b=a&&a[1];return window===parent||b&&/^(?:[0-9a-zA-Z\-]+\.)*(qq|paipai|qzone|3366|gtimg|openmat|yixun|myapp)\.com$/.test(b)?!0:!1}(),followbtn=$("followbtn"),unfollowbtn=$("unfollowbtn"),followarea=$("followarea"),weibolink=$("weibo_url"),getcookie=function(a){var b=new RegExp("\\b"+a+"\\b=([^\\s;]+);?","gi").exec(document.cookie);return b&&b[1]&&unescape(b[1])},ajax={request:function(a,b){var c=b.async!==!1,d=function(){},e=(b.method||"GET").toUpperCase(),f=b.data||null,g=b.success||d,h=b.error||d,i=function(a,b,c){if(4==a.readyState){var d=a.status;d>=200&&300>d?b(a.responseText||a.response):c(a.response)}};"GET"==e&&f&&(a+=(-1==a.indexOf("?")?"?":"&")+f,f=null);var j=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");return j.onreadystatechange=function(){i(j,g,h)},j.open(e,a,c),"POST"==e&&j.setRequestHeader("Content-type","application/x-www-form-urlencoded;"),j.send(f),j}},getToken=function(){var a=5381,b=getcookie("p_skey")||getcookie("p_lskey");if(b){for(var c=0,d=b.length;d>c;++c)a+=(a<<5)+b.charCodeAt(c);return 2147483647&a}return a},showLogin=function(){var a=700,b=460,c=(screen.height-b)/2,d=(screen.width-a)/2,e={appid:46000101,daid:6,style:11,target:"self",low_login:1,hide_title_bar:1,hide_close_icon:1,self_regurl:"http://reg.t.qq.com/index.php?pref=followcomp",hln_logo:"http://mat1.gtimg.com/app/opent/images/websites/space.gif",s_url:"http://follow.v.t.qq.com/?c=follow&a=jump&rcode=1&g_tk="+getToken()},f=function(a){var b=[];for(var c in a)b.push([c,encodeURIComponent(a[c])].join("="));return b.join("&")},g="http://ui.ptlogin2.qq.com/cgi-bin/login?"+f(e),h=window.open(g,"_blank","width="+a+",height="+b+",top="+c+",left="+d+",toolbar=no,menubar=no,scrolbars=no,resizeable=no,status=no");(null==h||"undefined"==typeof h)&&alert("您的浏览器禁用了来自follow.v.t.qq.com域名的弹窗")},changeEvent=function(){weibolink.className="weibo_url"},clickhighjacking=function(){!qqdomain&&alert("收听腾讯微博用户<"+uinfo.nick+">成功")},postMsg=function(a){var b=window.top;b!==window&&(b.postMessage?b.postMessage(a,"*"):b.name=a)},postUnFollow=function(){ajax.request(app_url+"/index.php?c=follow&a=cancellisten",{data:"name="+$("name").value+"&g_tk="+getToken()+"&time="+(new Date).getTime()+"&sign="+$("sign").value+"&v="+$("version").value+"&url="+$("url").value+"&appkey="+$("appkey").value,method:"post",async:!1,success:function(response){var d=function(s){return window.JSON&&window.JSON.parse?window.JSON.parse(s):eval("("+s+")")}(response);0==d.ret?(postMsg("successUnFollow"),(100==s||101==s||1e3==s)&&($("followbtn").style.display="",$("unfollowbtn").style.display="none")):postMsg("failUnFollow")}})},postFollow=function(){ajax.request(app_url+"/index.php?c=follow&a=listen",{data:"name="+$("name").value+"&g_tk="+getToken()+"&time="+(new Date).getTime()+"&sign="+$("sign").value+"&v="+$("version").value+"&url="+$("url").value+"&appkey="+$("appkey").value,method:"post",async:!1,success:function(response){var d=function(s){return window.JSON&&window.JSON.parse?window.JSON.parse(s):eval("("+s+")")}(response);0==d.ret?(postMsg("successFollow"),1==s?(changeEvent(),followarea.innerHTML='<span class="bg action followed">&nbsp;</span>',clickhighjacking()):2==s?(changeEvent(),followbtn.innerHTML="已收听",clickhighjacking()):3==s?(changeEvent(),alert("收听成功")):4==s?(changeEvent(),followbtn.innerHTML='<span class="bg toleft noaction"></span>',clickhighjacking()):5==s?(changeEvent(),followbtn.innerHTML='<span class="bg toleft noaction"></span>',clickhighjacking()):100==s||101==s||1e3==s?($("followbtn").style.display="none",$("unfollowbtn").style.display=""):8==s||9==s||6==s||7==s?(document.getElementById("unfollow").style.display="none",document.getElementById("followed").style.display="block"):(changeEvent(),$("#followbtn").html("已收听"),$("#followbtn").unbind("click"),clickhighjacking())):1===d.ret&&5===d.errcode?(postMsg("failFollow"),alert(d.msg)):(postMsg("failFollow"),6==d.errcode?window.open("http://t.qq.com/"+$("name").value,"_blank"):alert(d.msg))},error:function(){alert("网络链接失败！")}})},initFollowEvent=function(){try{parent.location}catch(a){qqdomain=!1}followbtn&&(followbtn.onclick=function(){unlogin?showLogin():postFollow()}),unfollowbtn&&(unfollowbtn.onclick=function(){unlogin?showLogin():postUnFollow()}),uinfo.ismyidol&&changeEvent()};initFollowEvent(),window.setLoginInfo=function(){window.unlogin=!1,postFollow()}}();/*  |xGv00|37b29e17d4efe2395d8793a4e1ee3f4f */
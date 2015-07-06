Ajzhan.common.user.simple_tally={
    cur_date:"",
    selected_date:"",
    init:function(){
        var _this = this;
        this.left_chart();
         
        $('textarea,#money_text').each(function(){
            var txt =  $(this).attr('init-tip');
            $(this).focus(function(){
                if(txt === $(this).val()){
                    $(this).addClass("s_text_cur");
                    $(this).val("");
                }
            }).blur(function(){
                if($(this).val() == ""){
                    $(this).removeClass("s_text_cur");
                    $(this).val(txt);
                }
            });
        });
        $(".simple_ul li").live('click',function(){//live用绑定动态函数
            if($(this).hasClass('cur')) return;//如果当前的存在.cur类，返回
            $(".simple_ul li.cur").removeClass('cur');//先删除存在.cur的类
            $(this).addClass('cur');//再添加.cur类
            $("input[name='tally_time']").val($(this).attr('date'));//添加data属性
            if(_this.cur_date==$(this).attr('date')){
                $("#tall_btn").hide(); 
                $(".simple_ct").slideDown('slow');
            }else{
                $(".simple_ct").slideUp('slow',function(){
                    $("#tall_btn").fadeIn();  
                });
            }
            _this.selected_date = $(this).attr('date');
            _this.get_tally_list($(this).attr('date'),'');
        });
        //当我点击隐藏的那个按钮时，被点击的消失，然后.simple_ct slideDown(慢)
        $("#tall_btn input").click(function(){
            $("#tall_btn").hide(); 
            $(".simple_ct").slideDown('slow');
        });
       
        //选择消费类别
        //当我点击的时候 
        $(".simple_list li").click(function(){
            $(".simple_list li").removeClass("cur");
            $(this).addClass("cur");
            var obj = $(this).find("a");//定义一个变量用来存储当前下的所有a元素
            obj.stop(false, true);//停止当前动画，执行下一动画，并执行到最后（想要看最后的效果）
            var _o_bgcolor = obj.css("backgroundColor");
          
            obj.css({
                backgroundColor: Ajzhan.common.user.simple_tally.GetColor()
            }).animate({
                backgroundColor: _o_bgcolor
            }, 1000);
            
            $("#tally_cate").val($(this).find("a").attr("cid"));
            if($(this).hasClass('in_type')){
                $("#tally_type").val("in");
            }else{
                $("#tally_type").val("out");
            }
        });
       
        $(".lt-del").live("click",function(){
            _this.tally_del($(this).attr("sid"));	
        });
        this. init_calendar();
        this. init_tally_upload();
        this.init_tally_list();
      
    },
    init_calendar:function(){
        $(".datepicker1").live('click',function(){
            WdatePicker({isShowClear:false});
        });
        $(".simple_date").click(function(){
            WdatePicker({el:'tally_time',isShowClear:false,position:{left:-120,top:5},onpicking:function(dp){
                var formated= dp.cal.getNewDateStr();
                if(formated!=$("input[name='tally_time']").val()){
                    $("#date").hide();
                    $.ajax({
                        url:'/user/tally/simple_date_list',
                        dataType:"html",
                        data:{
                            date:formated
                        },
                        type:'POST',
                        cache:false,
                        success:function(data){
                            
                            $(".simple_ul").html(data);
                            $(".simple_date .d1").html($(".simple_ul li.cur").attr('year'));
                            $(".simple_date .d2 i").html($(".simple_ul li.cur").attr('m'));
                            $("input[name='tally_time']").val(formated);
							Ajzhan.common.user.simple_tally.selected_date=formated;
                            if(Ajzhan.common.user.simple_tally.cur_date==formated){
                                $("#tall_btn").hide(); 
                                $(".simple_ct").slideDown('slow'); 
                            }else{
                                $(".simple_ct").slideUp('slow',function(){
                                    $("#tall_btn").fadeIn();  
                                });
                            }
                            Ajzhan.common.user.simple_tally.get_tally_list(formated,'');
                        }
                    });
                }
            }});
        });
    },
    
    
    init_tally_upload:function(){
        //上传图片
        new AjaxUpload('#upload_avatar', {
            action: '/user/tally/upload_pic/', // I disabled uploads in this example for security reaaons
            name:'file',
            responseType: 'json',
            onSubmit : function(file , ext){
                if (ext && /^(jpg|png|jpeg|gif)$/.test(ext)){
                   
                } else {
                    alert('你选择的文件不属于图片文件噢！');
                    return false;
                }
                $("#upload_avatar").attr('src','/images/loading.gif');
            },
            onComplete : function(file,response){
                if(response.ret==0){
                    $("#upload_avatar").attr('src',Ajzhan.IMAGE_URL+response.html);
                    $("#tally_pic").val(response.html);
                }else{
                    alert(response.html); 
                    $("#upload_avatar").attr('src','/images/space.gif');
                }
            }
        });
    },
    
    
    
    
    init_tally_list:function(){
       
        //了表
        $(".list_div").live({
            mouseenter: function(){
                $(this).find('ul').addClass('chover');
            },
            mouseleave: function(){
                $(this).find('ul').removeClass('chover');
            }
        }).live("click",function(){
            if($(this).hasClass('seleced')){
                $(this).removeClass('seleced')
                $(this).next().slideUp();
            }else{
                $(".list-box:visible").slideUp();
                $(".list_div").removeClass("seleced");
                $(this).addClass('seleced');
                $(this).next().slideDown('slow',function(){
                    var _this = this;
                    if($(this).attr("is_open")=='0'){
                        $.ajax({
                            url:'/user/tally/ajax_edit/'+$(_this).attr('sid'),
                            dataType:"html",
                            cache:false,
                            success:function(data){
                                $(_this).attr('is_open','1');
                                $(_this).html(data);
                            }
                        });
                    }
                });
            }
        });
        $(".lt-return").live("click",function(){
           var id = $(this).attr("sid");
            $.get("/user/tally/tally_r_edit/return/"+id,function(data){
                $.dialog({
                    id:"tallyreturnadd",
                    title:'结清记录',
                    content:data,
                    lock:true,
                    fixed:true,
                    ok: function () {
                        if($("select[name=return_account],input[name=return_tallytime],input[name=return_money],input[name=return_title]").val()=='')
                        {
                            alert("帐户、金额、日期和标题不能为空！");
                            return false;
                        }
                        $.ajax({
                            url:'/user/tally/ajax_return/'+$("input[name=return_id]").val(),
                            type:'POST',
                            data:'type='+$("input[name=return_type]").val()+'&category_id='+$("input[name=return_category]").val()+'&return_id='+$("input[name=return_id]").val()+"&account_id="+$("select[name=return_account]").val()+"&tallytime="+
                            $("input[name=return_tallytime]").val()+"&title="+$("input[name=return_title]").val()+"&money="+$("input[name=return_money]").val(),
                            success:function(data){
                                $("#right-load").hide();
                                if(data=='success'){
                                    //$("input[name=money],input[name=title]").val("");
                                      Ajzhan.common.user.simple_tally.get_tally_list(Ajzhan.common.user.simple_tally.selected_date,'');
                                      Ajzhan.common.tips("结清成功！",2);
                                }else{
                                    alert("结清失败！");
                                }
                            },
                            error:function(e){
                
                            }
                        });
                    },
                    cancelVal: '关闭',
                    cancel: true
                });
            })
        });
        $(".edit_ok").live("click",function(){
            var category_id,account_id,out_account,in_account,credit_id,title,money,tallytime,type,edit_id;
            edit_id = $(this).attr("sid");
            category_id = 0;
            account_id = 0;
            out_account = 0;
            in_account = 0;
            credit_id = 0;
            type=$("input[name=edit_type"+edit_id+"]").val();
            if(type == 'out'){
                if($("select[name=edit_out_type"+edit_id+"]").val()==''){
                    alert("支出分类未选择！");
                    return false;
                }
                category_id = $("select[name=edit_out_type"+edit_id+"]").val();
                if(category_id == undefined){
                    category_id = $("input[name=edit_debit_type"+edit_id+"]").val();
                }
                type = "out";
            }else if(type == 'in'){
                if($("select[name=edit_in_type"+edit_id+"]").val()==''){
                    alert("收入分类未选择！");
                    return false;
                }
                category_id = $("select[name=edit_in_type"+edit_id+"]").val();
                if(category_id == undefined){
                    category_id = $("input[name=edit_debit_type"+edit_id+"]").val();
                }
                type = "in";
            }else if(type == 'borrow' || type=='lend'){
                category_id = $("input[name=edit_debit_type"+edit_id+"]").val();
                type = category_id == "38" ? "borrow" : "lend";
            }
            if(type =='in' || type=='out' || type=='borrow' || type=='lend'){
                if($("select[name=edit_account"+edit_id+"]").val()==''){
                    alert("帐户未选择！");
                    return false;
                }
                account_id = $("select[name=edit_account"+edit_id+"]").val();
            }
            if(type =='transfer'){
                if($("select[name=edit_out_account"+edit_id+"]").val()=='' || $("select[name=edit_in_account"+edit_id+"]").val()==''){
                    alert("转出或转入帐户未选择！");
                    return false;
                }
                out_account = $("select[name=edit_out_account"+edit_id+"]").val();
                in_account = $("select[name=edit_in_account"+edit_id+"]").val();
                category_id=37;
                type = "transfer";
            }
            if(type == 'credit'){
                if($("select[name=edit_nocredit_account"+edit_id+"]").val()==''){
                    alert("帐户未选择！");
                    return false;
                }else if($("select[name=edit_credit_account"+edit_id+"]").val()==''){
                    alert("信用卡未选择！");
                    return false;
                }
                account_id = $("select[name=edit_nocredit_account"+edit_id+"]").val();
                credit_id = $("select[name=edit_credit_account"+edit_id+"]").val();
                category_id=43;
                type = "credit";
            }
            if($("input[name=edit_money"+edit_id+"]").val()==''){
                alert("金额不能为空！");
                return false;
            }
            if($("input[name=edit_tallytime"+edit_id+"]").val()==''){
                alert("记账日期不能为空！");
                return false;
            }
            title = $("input[name=edit_title"+edit_id+"]").val();
            money =$("input[name=edit_money"+edit_id+"]").val();
            tallytime = $("input[name=edit_tallytime"+edit_id+"]").val();
            var json_m = $("input[name=json_m"+edit_id+"]").val();
            var atoa_id = $("input[name=atoa_id"+edit_id+"]").val();
            if(json_m == undefined){
                json_m = "";
            }
            if(atoa_id == undefined){
                atoa_id = "";
            }
            $("#right-load").show();
            $.ajax({
                url:'/user/tally/ajax_edit/'+edit_id,
                type:'POST',
                dataType:"html",
                cache:false,
                
           //=============
data:"title="+title+"&money="+money+"&tallytime="+tallytime+"&type="+type+"&category_id="+
                category_id+"&account_id="+account_id+"&out_account="+out_account+"&in_account="+
                in_account+"&credit_id="+credit_id+"&json_m="+json_m+"&atoa_id="+atoa_id,
                success:function(data){
                    $("#right-load").hide();
                    if(data=='success'){
                        Ajzhan.common.tips("修改成功！",2);
                        Ajzhan.common.user.simple_tally.get_tally_list(Ajzhan.common.user.simple_tally.selected_date,'');
                    }else{
                        //$.dialog.close("tallyedit");
                        alert("修改失败！");
                    }
                },
                error:function(e){
                
                }
            });
        });
        this.get_tally_list(0,'');
    },
    
    //============
    
    tally_del:function(id){
        if(!confirm("确认删除这笔记录吗？")){
            return;
        }	
        var _this = this;
        $.ajax({
            url:"/user/tally/delete/"+id,
            success:function(data){
                if(data=='success'){
                    _this.get_tally_list(_this.selected_date,'');
                }else{
                    alert("删除失败！");
                }
            },
            error:function(e){
                
            }
        });
    },
    
    //===========
    
    left_chart:function(){
        $.get('/user/tally/tally_charts/',function(json){
            $(".tally_chart").html(json);
        });
        $.get('/user/tally/cate_30_scale_chart/',function(json){
            $(".scale_chart").html(json);
        });
    },
    get_tally_list:function(date,order,by){
        $(".loading").show();
        if(order==''){
            $(".l4").find('span').removeAttr("class");
        }
        $.post('/user/tally/simple_tally_list',{
            date:date,
            order:order,
            by:by
        },function(json){
            $(".loading").hide();
            $("#right-list").html(json);
        });
    },
    
    //==================
    
    tally_list_order:function(order,by,obj){
        if(order=='money'){
            if(by=='desc'){
                $(obj).find("span").removeClass("up").addClass("down");
                $(obj).attr('onclick',"Ajzhan.common.user.simple_tally.tally_list_order('money', 'asc',this)").attr('title','金额升序');
            }else{
                
               $(obj).find("span").removeClass("down").addClass("up");
                $(obj).attr('onclick',"Ajzhan.common.user.simple_tally.tally_list_order('money', 'desc',this)").attr('title','金额降序');
            }
          this.get_tally_list(this.selected_date,order,by);  
        }
    },
    /**
     * 添加记录
     */
    add:function(){
        /*
        var category_id,account_id,out_account,in_account,credit_id,title,money,tallytime,type,tally_img;
        category_id = 0;
        account_id = 0;
        out_account = 0;
        in_account = 0;
        credit_id = 0;
        tally_img = "";
        */
        var type = $("#tally_type").val();
        var title = $("#tally_title").val()==$("#tally_title").attr("init-tip")?'':$("#tally_title").val();
        var money = $("#money_text").val();
        var category_id = $("#tally_cate").val();
        var tallytime = $("#tally_time").val();
        var account_id = $("#account_id").val();
        var tally_img = $("#tally_pic").val();
        if (isNaN(money)){
            alert("金额输入有误！");
            return;
        }
        if(parseFloat(money)==0){
            alert("记账的金额一定要大于零才行噢！！");
            return;
        }
        if(category_id==''){
            alert("请选择收支类别！");
            return;
        }
        if(title.length>20){
            alert("备注限20个字！");
            return;
        }
        var data = {
            title:title,
            money:money,
            tallytime:tallytime,
            type:type,
            category_id:category_id,
            account_id:account_id,
            tally_img:tally_img
        };
        $(".loading").show();
        $.ajax({
            url:'/user/tally/ajax_add',
            type:'POST',
            dataType:"html",
            cache:false,
            data:data,
            success:function(data){
                if(data=='zone'){
                    alert("记账的金额一定要大于零才行噢！");
                    $(".loading").hide();
                    return false;
                }
                $(".loading").hide();
                if(data=='success'){
                     Ajzhan.common.tips("操作成功！",2);
                    $(".upload_avatar").attr('src',' /images/spacer.gif');
                    $("#tally_pic").val('');
                    $("input[name='money'],textarea[name='title']").val("");
                    $("#money_text").val(0);
                   //$(".simple_ul .cur .number span").html(parseInt($(".simple_ul .cur .number span").html())+1);
                    Ajzhan.common.user.simple_tally.left_chart();
                    Ajzhan.common.user.simple_tally.get_tally_list(Ajzhan.common.user.simple_tally.selected_date,'');
                }else{
                    alert("记录失败！");
                }
            },
            error:function(e){
                alert($(e).html())
            }
        });
    },
  //结尾  
    //开头
    GetColor:function()
    {
        var r = Math.floor(Math.random() * 255).toString(16);
        var g = Math.floor(Math.random() * 255).toString(16);
        var b = Math.floor(Math.random() * 255).toString(16);
        r = r.length == 1 ? "0" + r : r;
        g = g.length == 1 ? "0" + g : g;
        b = b.length == 1 ? "0" + b : b;
        return "#" + r + g + b;
    }
    //结尾
};
Ajzhan.common.user.simple_tally.init();

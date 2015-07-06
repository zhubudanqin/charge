$(function(){
	 
	
	  var flag=true;
	$(".list_div").hover(function() {
			$(this).children().children(".list_div ul li.w05").show();
		}, function() {
			$(this).children().children(".list_div ul li.w05").hide();
		});
	
	$(".list_div").click(function(){
	   if(flag==true){
	   	  $(this).addClass("seleced");
	   	  flag=false;
	   }else{
	   	  $(this).removeClass("seleced");
	   	  flag=true;
	   }
	})
	simple_Left();
	
	function simple_Left(){
		
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
		
		
		
		
		var cur_date="2015-06-10 ";
        var selected_date="2015-06-10 ";
		var _this = this;
		//日期选择
		 $(".simple_ul li").live('click',function(){//live用绑定动态函数
//		 	alert(1);
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
//          _this.get_tally_list($(this).attr('date'),'');
        });
        
        //当我点击隐藏的那个按钮时，被点击的消失，然后.simple_ct slideDown(慢)
       
        $("#tall_btn input").click(function(){
        	$("#tall_btn").hide();
        	$(".simple_ct").slideDown("slow");
        })
        
        
        //选择消费类别
        $(".simple_list li").click(function(){
        	 $(".simple_list li").removeClass("cur");
            $(this).addClass("cur");
            var obj = $(this).find("a");//定义一个变量用来存储当前下的所有a元素
            obj.stop(false, true);//停止当前动画，执行下一动画，并执行到最后（想要看最后的效果）
            var _o_bgcolor = obj.css("backgroundColor");
            
            obj.css({
                backgroundColor: GetColor()
            }).animate({
                backgroundColor: _o_bgcolor
            }, 1000);
            
            $("#tally_cate").val($(this).find("a").attr("cid"));
            if($(this).hasClass('in_type')){
                $("#tally_type").val("in");
            }else{
                $("#tally_type").val("out");
            }
         })
        
       
        
        function GetColor()
        {
        var r = Math.floor(Math.random() * 255).toString(16);
        var g = Math.floor(Math.random() * 255).toString(16);
        var b = Math.floor(Math.random() * 255).toString(16);
        r = r.length == 1 ? "0" + r : r;
        g = g.length == 1 ? "0" + g : g;
        b = b.length == 1 ? "0" + b : b;
        return "#" + r + g + b;
        }
	}
	
	
	
})

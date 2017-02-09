//页面缩放
(function (doc, win) {
var docEl = doc.documentElement,
resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
recalc = function () {
    var clientWidth = docEl.clientWidth;
    if (!clientWidth) return;
    docEl.style.fontSize = 10 * (clientWidth / 414) + 'px';
};

if (!doc.addEventListener) return;
win.addEventListener(resizeEvt, recalc, false);
doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// 返回上一页
$(function () {   
    setTimeout(function () {
        $(".mark").hide();
    }, 1000)
// 以上是为了加载完毕消失那个加载条   思路就是这样  大家也可以用别的东西来代替 重点是 window.onload的加载 而不是jq的 $(function(){})
    $(".return-a").click(function () {
        window.history.back();
    })
});
// 选择城市
$(".adr").click(function () {
    $(".index-city").slideDown();
    var docHeight = $(document).height(); //获取窗口高度  
    $('body').append('<div id="overlay"></div>');
    $('#overlay').css('display', 'block')
    $('#overlay')
      .height(docHeight)
      .css({
          'opacity': .7, //透明度  
          'position': 'absolute',
          'top': 0,
          'left': 0,
          'background-color': 'black',
          'width': '100%',
          'z-index': 500 //保证这个悬浮层位于其它内容之上  
      });
})
$(".city-close").click(function () {
    $(".index-city").slideUp();
    $('#overlay').css('display', 'none')
})
// 首页更多
$(".index-content").click(function () {
    $('.index-more').slideUp();
})  
$('.more').click(function () {
    if ($('.index-more').is(':hidden')) {
        $('.index-more').slideDown();
    }else{
    	$('.index-more').slideUp();
    }
}) 

//点击确定弹出编辑页面
$(".bwl-add").click(function () {
    $(".bwlbj").css('display', 'block');
    $(".bwl-container").css('display', 'none')
})
$(".bwlbj-return").click(function () {
    $(".bwlbj").css('display', 'none');
    $(".bwl-container").css('display', 'block')
})
// 当前时间
$('.bwlbj-time').html(currentTime())
//当前内容

//点击添加
$(".bwlbj-qd").click(function () {
	var bwlTime = currentTime();
	var bwlWord = $('#bwlbj-word').val();
    $('#bwl-ul').prepend('<li onclick=""><span onclick="ShowDetail(this)" class="word">' + bwlWord + '</span><span class="time">' + bwlTime + '</span><span  onclick="RemoveLi(this)" class="bwl-remove">删除</span></li>');
    $('.bwl-ul li').swipe(
    {
        swipe: function (event,direction, distance, duration, fingerCount) {
            if (direction == "left") {
                $(this).find('.bwl-remove').css('display', 'block');
                $(this).css('left', '-6rem')
            }
            if (direction == "right") {
                $(this).find('.bwl-remove').css('display', 'block');
                $(this).css('left', '0')
            }
        }
    });
    $(".bwlbj").css('display', 'none');
    $(".bwl-container").css('display', 'block')
});
//显示删除按钮

$('.bwl-ul li').swipe(
{
    swipe: function (event,direction, distance, duration, fingerCount) {
        if (direction == "left") {
            $(this).find('.bwl-remove').css('display', 'block');
            $(this).css('left', '-6rem')
        }
        if (direction == "right") {
            $(this).find('.bwl-remove').css('display', 'block');
            $(this).css('left', '0')
        }
    }
});

// 删除备忘录
$('.bwl-remove').click(function () {
    RemoveLi(this);
})

// 备忘录详情
$(".bwl-ul li .word").click(function () {
	ShowDetail(this);
})
$(".bwlxq-close").click(function () {
    $(".bwlxq").css('display', 'none')
})


//分享弹出
$(".yq_icon").click(function () {
    $(".mask,.fx_btn_box").show();
});
$(".qx").click(function () {
    $(".mask,.fx_btn_box").hide();
});
//选择银行卡
$(".bank").click(function () {
    if ($("#bank").is(":hidden") == true) {
        $("#bank").addClass("bank_hov");
        $("#bank li").click(function () {
            var bank_text = $(this).text();
            $(".bank").text(bank_text);
            $("#bank").removeClass("bank_hov");
        });
    } else {
        $("#bank").removeClass("bank_hov");
    }
});
//tab切换
$(".home_nav>a,.invest_btn>input,.tz_list ul li").click(function () {
    $(this).addClass("hov").siblings().removeClass("hov");
    $(".info_tab>div:eq(" + $(this).index() + ")").show().siblings().hide();
});
$(".jy_record ul li").click(function () {
    $(this).find("a").addClass("hov").parent().siblings().find("a").removeClass("hov");
    $(".invest_one>div:eq(" + $(this).index() + ")").show().siblings().hide();
});
//仿单选框
$(".confirm_tz>label").click(function () {
    if ($(this).hasClass("hov") == false) {
        $(this).addClass("hov");
    } else {
        $(this).removeClass("hov");
    }
});

//获取当前时间
function currentTime() {
	var d = new Date(), str = '';
	var vYear = d.getFullYear()
	var vMon = d.getMonth() + 1
	var vDay = d.getDate()
	var h = d.getHours(); 
	var m = d.getMinutes(); 
	var se = d.getSeconds(); 
	str=vYear+ '/'+(vMon<10 ? "0" + vMon : vMon)+ '/'+(vDay<10 ? "0"+ vDay : vDay)+ '&nbsp;&nbsp;'+(h<10 ? "0"+ h : h)+ ':'+(m<10 ? "0" + m : m)+ ':'+(se<10 ? "0" +se : se);
	//输出时间
    return str;
}

function RemoveLi(obj) {
	var truthBeTold = window.confirm("单击“确定”继续。单击“取消”停止。");
        if (truthBeTold) {
            $(obj).parent().remove()
        } else { }
};
function ShowDetail(obj) {
	$('#bwlxq-word').html($(obj).html());
    $('.bwlxq-time').html($(obj).parent().find('.time').html())
    $(".bwlxq").css('display', 'block')
};



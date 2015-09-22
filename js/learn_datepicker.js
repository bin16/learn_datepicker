!function ($) {
	$.fn.set_date_picker = function(option) {
		
		option['color'] = 'color' in option?option['color']:"#66aadd";

		$(this).each(function() {
			var color = option.color;


			var str_date = $(this).text();
			var td = str_date.split('-');
			var y = parseInt(td[0]);
			var m = parseInt(td[1]);
			var d = parseInt(td[2]);

			// 当前日期
			var date = new Date(y,m-1,d);


			var calender_header = $('<div class="calender-header"></div>')

			var header_span = $('<span></span>');
			var header_i_l = $('<i>&lt;</i>');
			var header_i_r = $('<i>&gt;</i>');
			var header_strong = $('<strong></strong>');
			header_strong.append(date.toLocaleDateString());
			header_span.append(header_i_l);
			header_span.append(header_strong);
			header_span.append(header_i_r);
			calender_header.append(header_span);
			
			var calender_main = $('<div class="calender-main"></div>');
			var calender_main_ul = $('<ul></ul>');
			
			setMonth(y,m,d,calender_main_ul);
			
			calender_main.append(calender_main_ul);

			$(this).text("");
			$(this).append(calender_header);
			$(this).append(calender_main);


			calender_header.css("background-color",color);
			$(this).find('.focus').css("background-color",color);
			$(this).find('li.calender-li:hover').css("background-color",color);
		})
	}
	

	function setMonth(y,m,d,ulobj) {
		var days = getDaysTheMonth(y,m);
		var days_before = getDaysBeforeMonth(y,m);
		var days_after = getDaysAfterMonth(y,m);

		var tdays = days_before.concat(days);
		var tdays = tdays.concat(days_after);
		days = tdays;

		// console.log(days);
		// console.log(days.length);

		for(var i=0; i<days.length; i++) {
			var r = days[i];

			str = '<li class="calender-li';
			if (r['d']==d&&(i>days_before.length-1)&&i<days.length-days_after.length) {
				str = str + " focus";
			}
			if (i<8 && r['d']>20) {
				str = str + " ignore";
			} 
			if (i>20 && r['d']<8){ 
				str = str + " ignore";
			} 
			if (i%7==6){
				str = str + " rside";
			}
			if (i%7==0){
				str = str + " lside";
			}
			if (i<7){
				str = str + " tside";
			}
			if (i>28){
				str = str + " bside";
			}
			str = str + '">'
			str = str + r['d'];
			str = str + '</li>'

			// puts str;
			ulobj.append(str);
		}
		ulobj.append('<div style="clear:both;width:100%;height:0px;padding:0px;margin:0px;"></div>')
		return str;
	}

	function getDaysOfMonth(y,m) {
		var days;
		switch(m) {
			case 2:m%4==0||m%400==0?days=29:days=28; break;
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:days=31; break;
			default:days=30; break;
		}
		return days;
	}

	function getDaysTheMonth(y,m) {
		var t = new Date(y,m-1,1);
		days = getDaysOfMonth(y,m);
		var arr = [];
		for(var i=0; i<days; i++) {
			var obj = {};
			obj['d'] = i+1;
			arr[i] = obj;
		}
		// console.log(arr);
		return arr
	}

	function getDaysBeforeMonth(y,m) {
		var t = new Date(y,m-1<0?m-1+12:m-1,1);

		var days_before = t.getDay(); //周几 0，1，2，3 恰好为之前的天数
		if(days_before==0) {
			return [];
		}
		var days_of_last_month = getDaysOfMonth(y,m-1); //获取上个月的天数

		var days = days_of_last_month - days_before + 1;

		var arr = [{}]
		for(var i=0; i<days_before; i++) {
			var obj = {}
			obj['d']= (i+days);
			arr[i] = obj
		}
		console.log(arr);
		return arr
	}

	function getDaysAfterMonth(y,m) {
		var t = new Date(y,m-1,1);
		var days_before = t.getDay(); //天数
		var days = days_before + getDaysOfMonth(y,m); //
		days_after = 35-days;
		days_after = days_after<0?days_after+7:days_after;
		if(days_after==0) {
			return [];
		}

		var arr = [{}];
		for(var i=0; i<days_after; i++) {
			var obj = {};
			obj['d']= (i+1);
			arr[i] = obj;
		}
		return arr
	}
}(window.jQuery);
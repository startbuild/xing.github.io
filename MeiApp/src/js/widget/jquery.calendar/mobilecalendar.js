!function(t){var e,s,n=[],a=function(t){return s=t%100==0?t%400==0?1:0:t%4==0?1:0};Date.prototype.format=function(t){var e={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length)));for(var s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t};var i=function(s){this.settings={source:null,startdate:null,enddate:null,weekend:null,mouthPage:1,disabledDay:[],datetdCellClick:null},this.cheader="<div><table class='pCalendar'><thead><tr class='cheader'><td class='theader'>周日</td><td class='theader'>周一</td><td class='theader'>周二</td><td class='theader'>周三</td><td class='theader'>周四</td><td class='theader'>周五</td><td class='theader'>周六</td></tr></thead>",this.settings=t.extend(this.settings,s),e=this.settings,this.settings.disabledDay.length>0&&(n=this.settings.disabledDay),this.Init()};i.prototype={Init:function(){this.ctoday=new Date,this.cyear=this.ctoday.getFullYear(),this.daysNumPerMonth=new Array(31,28+a(this.cyear),31,30,31,30,31,31,30,31,30,31),this.cmonth=this.ctoday.getMonth(),this.tempMonth=this.cmonth,t(this.settings.source).html("");for(var e=0;e<this.settings.mouthPage;e++)this.drawCalendar(this.tempMonth+e);this.bindEvent(this.settings.datetdCellClick)},addMonth:function(){this.drawCalendar(++this.tempMonth),this.bindEvent(this.settings.datetdCellClick)},nextMonth:function(){this.tempMonth++,12==this.tempMonth&&(this.tempMonth=0,this.cyear++),this.drawCalendar(this.tempMonth),this.bindEvent(this.settings.datetdCellClick)},prevMonth:function(){this.tempMonth--,0==this.tempMonth&&(this.tempMonth=12,this.cyear--),this.drawCalendar(this.tempMonth),this.bindEvent(this.settings.datetdCellClick)},drawCalendar:function(e){var s=this.cyear;e>11&&(s+=Math.floor(e/12),e%=12);var n=null,a=null;if(null!=this.settings.startdate&&(n=new Date(this.settings.startdate.replace(/-/g,"/"))),null!=this.settings.enddate&&(a=new Date(this.settings.enddate.replace(/-/g,"/"))),!(null!=a&&new Date(s+"/"+(e+1)+"/01")>a)){for(var i,d,l=this.ctoday.getDate(),h=new Date(s,e,1),c=h.getDay(),r=this.daysNumPerMonth[e],o=Math.ceil((r+c)/7),u="",g=0;g<o;g++){u+="<tr>";for(var f=0;f<7;f++){i=7*g+f,d=i-c+1,d=d<=0||d>r?"":i-c+1;var b="",p="";if(""!=d){b=s+"-"+(e+1)+"-"+d,p="datetdCell ";var v=new Date(b.replace(/-/g,"/"));(null!=n&&v<n||null!=a&&v>a||null!=this.settings.weekend&&this.settings.weekend.indexOf(f)>=0)&&(p+="disabledtd "),t.inArray(v.format("yyyy-MM-dd"),this.settings.disabledDay)>0&&(p+="selected ")}else p="emptyCell ";""!=b&&(b=new Date(b.replace(/-/g,"/")).format("yyyy-MM-dd")),u+=d==l&&e==this.cmonth&&s==this.cyear?"<td align='center' data-value='"+b+"' class='ctoday "+p+"'><div>"+d+"</div></td>":"<td align='center' data-value='"+b+"' class='"+p+"'><div>"+d+"</div></td>"}u+="</tr>"}u+="</table></div>";var y="<div class='cal-content' id='showYear'><span class='upMonth' id='btnPrevMonth'></span><span><b id='rawYear'>"+s+"</b>年<b id='rawMonth'>"+(e+1)+"</b>月</span><span class='downMonth' id='btnNextMonth'></span></div>",M="<div class='bottom-opt'><a class='btn' id='btnSat'>本月周六日</a><a class='btn' id='btnWeek'>本月工作日</a><a class='btn clear' id='btnClear'>清除所选日</a></div>";t(this.settings.source).html(y+this.cheader+u+M)}},bindEvent:function(e){$cal=this,t(this.settings.source).find("td").unbind("click").click(function(){var s=t(this),a=s.attr("class");if(!(a.indexOf("theader")>=0||""==s.attr("data-value")||a.indexOf("disabledtd")>=0)){s.toggleClass("selected");var i=s.attr("data-value");if(null!=e){if(n.length>0)if(t(s).hasClass("selected"))t.each(n,function(e,s){t.inArray(i,n)<0&&n.push(i)});else{var d=n.indexOf(i);n.splice(d,1)}e(n)}}}),t("#btnPrevMonth").unbind("click").bind("click",function(){$cal.cmonth!==$cal.tempMonth&&$cal.prevMonth()}),t("#btnNextMonth").unbind("click").bind("click",function(){$cal.nextMonth()}),t("#btnSat").bind("click",function(){t(".pCalendar>tbody").find("tr").each(function(e,s){t(s).find("td").each(function(e,s){0!=e&&6!=e||t(s).hasClass("datetdCell")&&!t(s).hasClass("disabledtd")&&(t(s).addClass("selected"),n.push(t(s).attr("data-value")))})}),e(n)}),t("#btnWeek").bind("click",function(){t(".pCalendar>tbody").find("tr").each(function(e,s){t(s).find("td").each(function(e,s){0!=e&&6!=e&&t(s).hasClass("datetdCell")&&!t(s).hasClass("disabledtd")&&(t(s).addClass("selected"),n.push(t(s).attr("data-value")))})}),e(n)}),t("#btnClear").bind("click",function(){t(".pCalendar>tbody").find("td").removeClass("selected"),n=[],e(n)})},getSelectValue:function(){return t(this.settings.source).find(".selected").attr("data-value")},setStartDate:function(t){this.settings.startdate=t,this.Init()},setEndDate:function(t){this.settings.enddate=t,this.Init()},setDaysOfWeekDisabled:function(t){this.settings.weekend=t,this.Init()}},t.fn.extend({InitDailyPriceCalendar:function(e){e||(e={}),e.source=t(this);var s=new i(e);return s}})}(jQuery);
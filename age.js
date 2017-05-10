//<input id="date_input" type="date" onchange="yr_day()">
//output element id=datediffresult
var diff=null;
var ldc=null;
function leap(yc){
	if((yc%100!=0 && yc%4==0)||(yc%400==0)) return true;
	else return false;
}
function b4(dateobj){ //to check if date is b4 or after 28 feb
	if((dateobj.getMonth()==1 && dateobj.getDate()<29)|| dateobj.getMonth()==0) return true;
	else return false;
}
function leapcount(y1,y2){
	var lc=0;
	for(var i=(y1+1);i<y2;i++){
		if(leap(i)) lc++;
	}
	return lc;
}
function age(){
	var now= new Date();
	var birth=document.getElementById("date_input").value;
	var y1=parseInt(birth.substring(0,4));
	var mn=parseInt(birth.substring(5,7));
	var da=parseInt(birth.substring(8,10));
	var dob=new Date(mn+" "+da+", "+y1+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds());
	var y2=parseInt(now.getFullYear());
	var y2l=0;
	var y1l=0;
	if(leap(y2)){
		if(b4(now)) y2l=0;
		else y2l=1;
	}
	if(leap(y1)){
		if(b4(dob)) y1l=1;
		else y1l=0;
	}
	ldc=y2l+y1l+leapcount(y1,y2);
	diff=now-dob;
}
function yr_day(){
	age();
	var dday=Math.floor(diff/(3600*24000));
	var dank=dday-ldc;
	var dyr=Math.floor(dank/365);
	var display_day=Math.floor(dank-(dyr*365));
	if(isNaN(diff)) document.getElementById("datediffresult").innerHTML=" ";
	else{
		if(diff<0) document.getElementById("datediffresult").innerHTML="future dates not allowed";
		else document.getElementById("datediffresult").innerHTML=dyr+" "+dday+"<br>year-day<br>"+dyr+" "+display_day;
	}
}
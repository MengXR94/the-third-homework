window.onload=function(){
	move();
	menu();
}
//幻灯片
function move(){
	var row=document.getElementById('row1');
	var con=document.getElementById('cont');
	var nav=document.getElementById('nav').getElementsByTagName('li');
	var next=document.getElementById('rightarr');
	var before=document.getElementById('leftarr');
	var width=parseInt(document.getElementById('cont').getElementsByTagName('img')[0].width);
	var index=0;
	var timer=null;
	var aminate=false;
	console.log(width);
	next.onclick=function(){
		index++;
		if(index>=nav.length){index=0;}
		changenav();
		if(aminate==false){
		changecon(-1*width);}
	}
	before.onclick=function(){
		index--;
		if(index<0){
			index=nav.length-1;
		}
		changenav();
		if(aminate==false){
		changecon(width);}
	}

	for(var i=0;i<nav.length;i++){
		nav[i].id=i;
		nav[i].onclick=function(){
			var offset=-1*width*(parseInt(this.id)-index);			
			index=this.id;
			changenav();
			if(aminate==false){
			changecon(offset);}
		}
	}
	function changenav(){
		for(var i =0;i<nav.length;i++){
			if(nav[i].className=='on'){
				nav[i].className=' ';
				break;
			}
		}
		nav[index].className='on';
	}
	function changecon(offset){
		aminate=true
		var neww=parseInt(con.style.left)+offset;	
		var timer=300;
		var interval=30;
		var speed=offset/(timer/interval);
		go();
		function go(){
			if((speed<0&&parseInt(con.style.left)>neww)||(speed>0&&parseInt(con.style.left)<neww)){
					con.style.left=parseInt(con.style.left)+speed+'px';
					setTimeout(go,interval);
			}
			else{
				con.style.left=neww+'px';
				if(neww<-1*width*3){
					con.style.left=-1*width+'px';
					}
				else if(neww>-920){
					con.style.left=-1*width*3+'px';
					}
				aminate=false;
				}
			}
	}
	function autoplay(){
		if(timer){
			clearInterval(timer);
		}
		timer=setInterval(function(){
			next.onclick();
		},3000)
	}
	function stop(){
		clearInterval(timer);
	}
	row.onmouseout=autoplay;
	row.onmouseover=stop;
	autoplay();
}
//响应式菜单栏
function menu(){
	var button=document.getElementById('button');
	var silds=document.getElementById('silds');
	var ret=document.getElementById('ret');
	var nw=0;
	button.onclick=show;
	ret.onclick=hide;
	function show(){
		silds.style.display='block'
		if(nw<330){
			nw+=5;
			silds.style.width=nw+'px';
			setTimeout(show,10);
		}	
		else{
			silds.style.width=330+'px';
		}
	}
	function hide(){
		if(nw>0){
			nw-=5;
			silds.style.width=nw+'px';
			setTimeout(hide,10);
		}
		else{
			silds.style.width=0+'px';
			silds.style.display='none'
		}
	}
}
(function() {
	var up = down = left = right = false,
		x = y = 0,
		mainElem;
	document.addEventListener('DOMContentLoaded', init, false);		
	document.addEventListener('keydown', keyEvent, false);
	document.addEventListener('keyup', keyEvent, false);	

	function init() {
		mainElem = document.getElementById('main');					
	}
	
	function keyEvent(evt) {
		var press = evt.type === 'keydown' ? true : false;
		switch (evt.keyCode) {
			case 38://up
				if (press) {
					if (!up) {
						up = true;
						x = 45;
					}
				} else {
					up = false;
					x = 0;
				} 
				break;
			case 40://down
				if (press) {
					if (!down) {
						down = true;
					}
				} else {
					down = false;
				}     
				break;  
			case 37://left
				movY = -1;           
				break;	
			case 39://right
				movY = 1;
				break;
		}
		console.log([up, down, left, right]);
		setTrans();
	}
	
	function setTrans() {
		mainElem.style.webkitTransform = 'rotateX('+x+'deg) rotateY('+y+'deg)';
	}
}());
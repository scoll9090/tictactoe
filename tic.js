class Game{

	constructor(){
		
		this.b = new Board(this);
		this.b.initB();
		this.player = new Player(this,false);
		this.ai = new Player(this,true);
		this.movenumber = 0;
		this.canmove = false;
		this.difficulty = document.querySelector('input[name=difficulty]:checked'); // if inp.value == "normal" else 
		this.dif = this.dif;
		this.useDepth;
        this.sel = document.querySelector('input[name=Letter]:checked');
		this.initGame = this.initGame;
		this.initGame();
		this.user;
		this.turn;
		this.getLocation = this.getLocation;
		this.move = this.move;
		this.checkGameState = this.checkGameState;	
		this.canInteract;
		this.firstMove = 0;
		this.setUseDepth;
		this.depthProb = [.5,.5,.7,.7,.4,.4,.4,.4,.5]
		
		
	}

	setUseDepth(){

		if(this.dif == 'normal'){
			this.useDepth = Math.random() <= this.depthProb[this.movenumber];
	}
	

}	
	
	getLocation(x,y){

		if(x == 0 && y == 0){
			return 0
		}else if(x == 1 && y == 0){
			return 1;
		}else if(x == 2 && y == 0){
			return 2;
		}else if(x == 0 && y == 1){
			return 3;
		}else if(x == 1 && y == 1){
			return 4;
		}else if(x == 2 && y == 1){
			return 5;
		}else if(x == 0 && y == 2){
			return 6;
		}else if(x == 1 && y == 2){
			return 7;
		}else if(x == 2 && y == 2){
			return 8;
	}
}
	
	
	initGame(){
		this.dif = this.difficulty.value;
	if(this.dif == 'normal'){
		this.useDepth = true;
	}
	if(this.sel.value == "X"){

		this.player.piece = "X";
		this.ai.piece = "O";
		this.player.opponent = this.ai;
		this.ai.opponent = this.player;
		this.canmove = true;
		this.user = this.player;
		this.turn = this.user;
		this.canInteract = true;


}	else {

		this.player.piece = "O";
		this.ai.piece = "X";
		this.player.opponent = this.ai;
		this.ai.opponent = this.player;
		this.user = this.ai;
		this.turn = this.user;
		this.canmove = false;
		this.canInteract = false;
		this.ai.makeMove();
		this.result = 'incomplete';
		}

}

	move(){

		this.movenumber++;

		if(this.user.isEnd() > 0){
	
			this.canMove = false;
			
			if(this.user.piece == this.player.piece){
				this.result = 'Winner';
	
			
			}else{
				this.result = 'Loser';
			}
				this.user.finish();
	
	
		}else if(this.movenumber == 9){
			console.log("draw")
			this.result = 'Draw'
			this.b.ctx.font = "45px sans-serif"
			this.b.ctx.textBaseline = "middle";
			this.b.ctx.textAlign = 'center';
			this.b.ctx.fillText(this.result,this.b.canvas.width/2,this.b.canvas.height/2)
			this.canInteract = true;
	
	
		}else{
			if(this.user == this.player){
	
				this.user = this.ai;
				this.canInteract = false;
				this.ai.makeMove();
	
	
			}else{
		
				this.user = this.player;
				this.canInteract = true;
				this.canmove = true;
	
	
	}

}

}
}


class Square{
	
	constructor(){
	
		this.occupied = false;
		this.player = 0;
		this.piece = "";
	
	
	}

getOccupied(){return this.occupied;}
setPiece(pi){if(pi="O"){this.piece = "O";}else{this.piece = "X";}}


}


class Board{
	
	constructor(game){
	
		this.offset= 20;
		this.Move = this.Move.bind(this);
		this.mouseDown = this.mouseDown.bind(this);
        this.canvas = document.getElementById("board");
		this.canvas.addEventListener("mousedown",this.mouseDown,false);
		this.cellWidth = this.canvas.width/3;
	    this.cellCenter = this.cellWidth/2;
		this.initB = this.initB;
		this.boardlocations = [];
		this.drawc = this.drawc.bind(this);
		this.x = 0;
		this.y = 0;
		this.animateCircle = this.animateCircle.bind(this);
		this.animateDiagonal = this.animateDiagonal.bind(this);
		this.animateCounterDiagonal = this.animateCounterDiagonal.bind(this);
		this.animateFinish = this.animateFinish.bind(this);
		this.drawDiagonal = this.drawDiagonal.bind(this);
		this.drawCounterDiagonal = this.drawCounterDiagonal.bind(this);
		this.drawHorizontal = this.drawHorizontal.bind(this);
		this.drawVertical = this.drawVertical.bind(this);
		this.drawWinCounterDiagonal = this.drawWinCounterDiagonal.bind(this);
		this.drawWinDiagonal = this.drawWinDiagonal.bind(this);
		this.start = 0;
		this.progress = 0;
		this.animationLength = 250;
		this.offset = 20;
		this.ctx = this.canvas.getContext("2d");
		this.g = game;
		this.win = -1;
	}
	

	drawCounterDiagonal(x,y){
		this.ctx.strokeStyle = "red";
		this.ctx.lineWidth = 10;

		
		let xc = this.cellCenter+this.x*this.cellWidth;
		let yc = this.cellCenter+this.y*this.cellWidth;

		let dl = this.cellCenter - this.offset;
		let ox = Math.abs((xc+dl) - (xc-dl))
		let oy = Math.abs((yc-dl) - (yc+dl))
		let p = this.progress/this.animationLength;
		let curTime = Date.now();
		this.progress = curTime - this.start;
		let ap = this.progress/this.animationLength;

		this.ctx.beginPath();
		this.ctx.moveTo(xc+dl,yc-dl);
		this.ctx.lineTo(xc+dl-ap*ox,yc-dl+ap*oy);
		this.ctx.stroke();
	

}

	
	drawDiagonal(x,y){
		this.ctx.strokeStyle = "red";
		this.ctx.lineWidth = 10;

	
		let xc = this.cellCenter+this.x*this.cellWidth;
		let yc = this.cellCenter+this.y*this.cellWidth;
		let dl = this.cellCenter - this.offset;
		let ox = Math.abs((xc-dl) - (xc+dl))
		let oy = Math.abs((yc-dl) - (yc+dl))
		let p = this.progress/this.animationLength;
		let curTime = Date.now();
		this.progress = curTime - this.start;
		let ap = this.progress/this.animationLength;

		this.ctx.beginPath();
		this.ctx.moveTo(xc-dl,yc-dl);
		this.ctx.lineTo(xc-dl+ap*ox,yc-dl+ap*oy);
		this.ctx.stroke();
			

}

	drawHorizontal(x,y){
		this.ctx.strokeStyle = "purple";
		this.ctx.lineWidth = 10;

		let yc = this.cellCenter+this.y*this.cellWidth;
			
		let dl = this.canvas.width/2 - this.offset;
			
		let p = this.progress/this.animationLength;
		let curTime = Date.now();
		this.progress = curTime - this.start;
		let ap = this.progress/this.animationLength;

		this.ctx.beginPath();
		this.ctx.moveTo(0,yc);
		this.ctx.lineTo(this.canvas.width*ap,yc);
		this.ctx.stroke();
	

}
	drawVertical(x,y){
		this.ctx.strokeStyle = "purple";
		this.ctx.lineWidth = 10;

		let xc = this.cellCenter+this.x*this.cellWidth;

		let p = this.progress/this.animationLength;
		let curTime = Date.now();
		this.progress = curTime - this.start;
		let ap = this.progress/this.animationLength;

		this.ctx.beginPath();
		this.ctx.moveTo(xc,0);
		this.ctx.lineTo(xc,ap*this.canvas.width);
		this.ctx.stroke();
	

}

	drawWinDiagonal(x,y){
		this.ctx.strokeStyle = "purple";
		this.ctx.lineWidth = 10;

	
		let xc = this.cellCenter+this.x*this.cellWidth;
		let yc = this.cellCenter+this.y*this.cellWidth;

		let dl =  this.canvas.width/2 - this.offset;
		let ox = Math.abs((xc-dl) - (xc+dl))
		let oy = Math.abs((yc-dl) - (yc+dl))
	
		let p = this.progress/this.animationLength;
		let curTime = Date.now();
		this.progress = curTime - this.start;
		let ap = this.progress/this.animationLength;
			if(this.progress > this.animationLength){
			ap = 1;
		}

		this.ctx.beginPath();
		this.ctx.moveTo(xc-dl,yc-dl);
		this.ctx.lineTo(xc-dl+ap*ox,yc-dl+ap*oy);
		this.ctx.stroke();
	

}

	drawWinCounterDiagonal(x,y){

		this.ctx.strokeStyle = "purple";
		this.ctx.lineWidth = 10;

		
		let xc = this.cellCenter+this.x*this.cellWidth;
		let yc = this.cellCenter+this.y*this.cellWidth;
		let dl =  this.canvas.width/2 - this.offset;
		let ox = Math.abs((xc-dl) - (xc+dl))
		let oy = Math.abs((yc-dl) - (yc+dl))
			
		let p = this.progress/this.animationLength;
		let curTime = Date.now();
		this.progress = curTime - this.start;
		let ap = this.progress/this.animationLength;
		if(this.progress > this.animationLength){
			ap = 1;
			
		}
		this.ctx.beginPath();
		this.ctx.moveTo(xc-dl,yc+dl);
		this.ctx.lineTo(xc-dl+ap*ox,yc+dl-ap*oy);
		this.ctx.stroke();
			

}

	animateCircle(){
		if(this.progress < this.animationLength){
		
			this.drawc();
			requestAnimationFrame(this.animateCircle);
		}else{
			this.g.move();
		}

	}
	animateDiagonal(){
		if(this.progress < this.animationLength){
	
			this.drawDiagonal();
			requestAnimationFrame(this.animateDiagonal);
		}else{
			this.progress = 0;
			this.start = Date.now();
			this.animateCounterDiagonal();
	}

}

	animateCounterDiagonal(){
		if(this.progress < this.animationLength){
	
			this.drawCounterDiagonal();
			requestAnimationFrame(this.animateCounterDiagonal);
		}else{

			this.g.move();
	}

}

	animateFinish(){


		if(this.progress < this.animationLength ){
	
			if(this.win == 0 || this.win == 1 || this.win == 2){
				this.drawHorizontal();
		
			}else if(this.win == 3 || this.win == 4 || this.win == 5){
				this.drawVertical();
			
			}else if( this.win == 6){
				this.drawWinDiagonal();
		
			}else{
				this.drawWinCounterDiagonal();

			
		}
			requestAnimationFrame(this.animateFinish);
		}else{
			this.ctx.font = "45px sans-serif"
			this.ctx.textBaseline = "middle";
			this.ctx.textAlign = 'center';
			this.ctx.fillText(this.g.result,this.canvas.width/2,this.canvas.height/2)
			this.g.canInteract = true;
	}

}
	drawc(){
		this.ctx.strokeStyle = "red";
		this.ctx.lineWidth = 10;

	
		let xc = this.cellCenter+this.x*this.cellWidth;
		let yc = this.cellCenter+this.y*this.cellWidth;

	
		let p = this.progress/this.animationLength;
		let curTime = Date.now();
		this.progress = curTime - this.start;
		let ap = this.progress/this.animationLength;
		this.ctx.beginPath()
		this.ctx.arc(xc,yc,this.cellCenter-this.offset,(p*2*Math.PI)-.05,ap*2*Math.PI,false)
		this.ctx.stroke();

	
	
	

}
	
	mouseDown(){

		if(this.g.canmove){

		this.start = 0;
		this.progress = 0;
		let mouseX = event.pageX - this.canvas.offsetLeft;
		let mouseY = event.pageY - this.canvas.offsetTop;

	
		this.start = Date.now();

		let xSpot = Math.floor(mouseX/this.cellWidth);
		let ySpot = Math.floor(mouseY/this.cellWidth);

		this.x = xSpot;
		this.y = ySpot;

	}
		if(this.g.user == this.g.player && this.g.canmove == true){
			let spot = this.g.getLocation(this.x,this.y);
			
			if(this.g.b.boardlocations[spot].occupied == false){
				this.g.canmove = false;
				this.g.b.boardlocations[spot].occupied = true
				this.g.b.boardlocations[spot].piece = this.g.user.piece;
		
				
				if(this.g.movenumber == 0){
					this.g.firstMove = spot;
		}
				if(this.g.player.piece == "X"){
		
					this.animateDiagonal();
				}else{
					this.animateCircle();
		
		}
		
			}else{
				console.log("yo yo")
			}
		
		
		}
	
	}



	
	Move(){


		g.b.boardlocations[id].occupied = true;
		g.b.boardlocations[id].piece = g.user.piece;
		g.move();
}



	initB(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.width);
		this.ctx.strokeStyle= "aqua";
		this.ctx.lineWidth=3;
		this.ctx.beginPath();
		let w = this.canvas.width;
		let n = w/3;
		this.ctx.moveTo(0,n*1);
		this.ctx.lineTo(w,n*1);
		this.ctx.stroke();

		this.ctx.moveTo(0,n*2);
		this.ctx.lineTo(w,n*2);
		this.ctx.stroke();

		this.ctx.moveTo(n*1,0);
		this.ctx.lineTo(n*1,w);
		this.ctx.stroke();

		this.ctx.moveTo(n*2,0);
		this.ctx.lineTo(n*2,w);
		this.ctx.stroke();

		for(var i =0;i<9;i++){
		
			var s = new Square;
			this.boardlocations.push(s);
		
	
	
	}
	
	}


}
	class Player{
		constructor(game,ai){
	
		this.game = game;
		this.piece;
		this.opponent;
		this.testBoard = [];
		this.ai = ai;
		this.copyBoard = this.copyBoard;
		this.miniMax = this.miniMax;
		this.checkMoves = this.checkMoves;
		this.check = this.check;
		this.checkWin = this.checkWin;
		this.makeMove = this.makeMove;
		this.setXY = this.setXY;
		this.rand = this.rand;
		this.spot = this.spot;
		this.isEnd = this.isEnd;
		this.checkGame = this.checkGame;
		this.finish = this.finish;
		
		}
	
	finish(){
		if(this.game.b.win == 0 ){
			this.setXY(1);
		}else if(this.game.b.win == 1 || this.game.b.win == 4 || this.game.b.win == 6 || this.game.b.win == 7 ){
			this.setXY(4);
		
		}else if(this.game.b.win == 2){
			this.setXY(7);
		}else if(this.game.b.win == 3){
			this.setXY(3);
		}else if(this.game.b.win == 5){
			this.setXY(5);
		}
		this.game.b.progress = 0;
		this.game.b.start = Date.now();
		this.game.b.animateFinish();
	
	}
	
	rand(arr){
		return Math.floor(Math.random()*arr.length);
	
	}
	setXY(a){
	
		if(a == 0){
			this.game.b.x = 0;
			this.game.b.y = 0;
	    }else if(a == 1){
			this.game.b.x = 1;
			this.game.b.y = 0;

		}else if(a == 2){
			this.game.b.x = 2;
			this.game.b.y = 0;

		}else if(a == 3){
			this.game.b.x = 0;
			this.game.b.y = 1;

		}else if(a == 4){
			this.game.b.x = 1;
			this.game.b.y = 1;

		}else if(a == 5){
			this.game.b.x = 2;
			this.game.b.y = 1;

		}else if(a == 6){
			this.game.b.x = 0;
			this.game.b.y = 2;

		}else if(a == 7){
			this.game.b.x = 1;
			this.game.b.y = 2;

		}else if(a == 8){
			this.game.b.x = 2;
			this.game.b.y = 2;

		}
	

	}
	makeMove(){

		let nn = [0,2,4,6,8];
		let mm = [0,1,2,3,4,5,6,7,8];
		let cn = [0,2,6,8];
		if(this.game.movenumber == 0){

			if(this.game.difficulty.value == "normal"){
			this.spot = mm[this.rand(mm)]
			this.setXY(this.spot);
			}else{
			this.spot = nn[this.rand(nn)]
			this.setXY(this.spot);
			}
		
			this.game.b.boardlocations[this.spot].occupied = true;
			this.game.b.boardlocations[this.spot].piece = this.game.user.piece;
			this.game.b.start = Date.now();
			this.game.progress = 0;
			this.game.b.animateDiagonal();
		
		}else if(this.game.movenumber == 1){
			
			 if(this.game.firstMove == 4){
				this.spot = cn[this.rand(cn)];
			}else{
					this.spot = 4;
			
			}
			this.setXY(this.spot);
			this.game.b.boardlocations[this.spot].occupied = true;
			this.game.b.boardlocations[this.spot].piece = this.game.user.piece;
			this.game.b.start = Date.now();
			this.game.b.progress = 0;
			this.game.b.animateCircle();
		
		}else{
	
			let a = this.findBestMove();
			this.setXY(a);
			this.game.b.boardlocations[a].occupied = true;
			this.game.b.boardlocations[a].piece = this.game.user.piece;
			this.game.b.start = Date.now();
			this.game.b.progress = 0;
	
			if(this.piece == "X"){
			
			this.game.b.animateDiagonal();
			}else{
			this.game.b.animateCircle();
			}
		}
	}

	check(){
		var combinations = [
						[0,1,2],
						[3,4,5],
						[6,7,8],
						[0,3,6],
						[1,4,7],
						[2,5,8],
						[0,4,8],
						[2,4,6]
			
						];
		for(var i =0;i<combinations.length;i++){
		
			var score = this.checkWin(combinations[i][0],combinations[i][1],combinations[i][2]);

		if(score == 10 || score ==-10){
			
			return score;
		}
	}
		return 0;

}
	checkWin(a,b,c){
		if(this.testBoard[a] == this.testBoard[b] && this.testBoard[b] == this.testBoard[c] ){
	
			if(this.testBoard[a] == this.piece){
			
			return 10;
			
			}else if(this.testBoard[a] == this.opponent.piece){
			
			return -10;
		}
		
	
	}

		return 0;
}
	
	checkMoves(){

	for(var i = 0; i<this.testBoard.length;i++){
	
		if(this.testBoard[i] == ""){
			
			return true;

		}
	
	}
	return false;

}

	isEnd(){
		var combinations = [
						[0,1,2],
						[3,4,5],
						[6,7,8],
						[0,3,6],
						[1,4,7],
						[2,5,8],
						[0,4,8],
						[2,4,6]
			
						];
		for(var i =0;i<combinations.length;i++){
			
		var score = this.checkGame(combinations[i][0],combinations[i][1],combinations[i][2]);
	
		if(score == 10 || score ==-10){
			this.game.b.win = i;
			return score;
		}
	}
		return 0;

}
	checkGame(a,b,c){
		if(this.game.b.boardlocations[a].piece == this.game.b.boardlocations[b].piece && this.game.b.boardlocations[b].piece== this.game.b.boardlocations[c].piece ){
	
			if(this.game.b.boardlocations[a].piece == this.piece){
			
				return 10;
			}else if(this.game.b.boardlocations[a].piece== this.opponent.piece){
			
				return -10;
		}
		
	
	}

	return 0;
}
	miniMax(depth,isMax){

		var score = this.check();
		if(score == 10){
			
			if(this.game.dif == "normal" && !this.game.useDepth){
			return score;
		}else{
			
			return score - depth;
		}
	
	
	}
	
		if(score == -10){
		
			if(this.game.dif == "normal" && !this.game.useDepth){
				return score;
			}else{
				return score + depth;
		}
	
	}
	
	if(this.checkMoves() == false){
		
		return 0;
	
	}
	
		if(isMax){
	
			var best = -1000;
			
			for(var i=0;i<this.testBoard.length;i++){
		
			if(this.testBoard[i] ==""){
			
				this.testBoard[i] == this.piece;
				
				best = Math.max(best,this.miniMax(depth+1,!isMax));
				
				this.testBoard[i]="";
				
			}
		
		}
		
		return best;
	
	
	}else{
		
		var best = 1000;
		
		for(var i=0;i<this.testBoard.length;i++){
		
			
			if(this.testBoard[i]==""){
			
				this.testBoard[i] = this.opponent.piece;
				
				best = Math.min(best, this.miniMax(depth+1,!isMax));
				this.testBoard[i] = "";
			
			}
		
		
		}
	
	
		return best;
	
	
	}

}
	copyBoard(){
	
	
		for(var i=0;i<this.game.b.boardlocations.length;i++){
			this.testBoard.push(this.game.b.boardlocations[i].piece);
		
	
	}


}
	findBestMove(){
		var bestVal = -1000;
		var bestSquare = -1;
		this.testBoard =[];
		this.copyBoard();
		this.game.setUseDepth();
		for(var i =0;i<this.testBoard.length;i++){
			
			if(this.testBoard[i] == ""){
			
			this.testBoard[i] = this.piece;
			
			var moveVal = this.miniMax(0,false);

			this.testBoard[i] ="";
			
				if(moveVal > bestVal){
					
					bestSquare = i;
					bestVal = moveVal;
				
				}
			
		
		}
	
	}	
		return bestSquare;

}
}
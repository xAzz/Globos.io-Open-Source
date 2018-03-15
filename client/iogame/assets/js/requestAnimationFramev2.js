var me = null;

class requestAnimationFramev2 {
	
	constructor(fps, drawFunction){
		
		if(typeof(drawFunction) !== "function") throw("You must specify a drawFunction!");
		
		this.fpsLimit = fps || 120;
		this.drawFunction = drawFunction;
		
		this.fps = fps;
		this.fpsInterval = 0;
		this.startTime = 0;
		this.now = 0;
		this.then = 0;
		this.elapsed = 0;
		
	};
	
	ini(){
		
		this.fpsInterval = 1000 / this.fpsLimit;
		this.then = Date.now();
		this.startTime = this.then;
		me = this;
		
		this.animate();
		
	};
	
	animate(){
		
		setImmediate(me.animate);
		
		me.now = Date.now();
		me.elapsed = me.now - me.then;
		
		if (me.elapsed > me.fpsInterval) {

			me.then = me.now - (me.elapsed % me.fpsInterval);

			me.drawFunction();

		};
		
	};
	
};

window.requestAnimationFramev2 = requestAnimationFramev2;
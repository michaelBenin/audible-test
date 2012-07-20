/* 
Audible Carousel
Michael Benin 2012
*/

/* 	Begin App */
(function (w, d) //initialize 0 global variables - no collisions
{
	/* 	Constructor */
	function Carousel(data)
	{
		var carousel = this; //define object to access out of scope
		this.c = gId('benin_carousel');
		this.l = gId('left');
		this.r = gId('right');
		var str = "";
		this.set = [];
		this.currentSet = 0;
		this.data = data;
		
		for(var i in this.data) 
		{
			str += this.data[i].content;
			
			if((Number(i)+1) % 5 === 0)
			{
				this.set.push(str);
				str='';
			}
			
			if(Number(i) === this.data.length-1)
			{
				this.set.push(str); 
			}
		}
		
		save.call(this);

		this.keydown = d.addEventListener('keydown', function (e)
		{
			if (keys[e.keyCode])
			{
				keys[e.keyCode].call(carousel);
			}
		});
		
		this.l.onclick = function(){keys[37].call(carousel)};
		this.r.onclick = function(){keys[39].call(carousel)};
	}
		
		var keys = 
		{
			37: function()
			{
				if(this.currentSet !== 0)
				{
					this.currentSet--;
				}
				else
				{
					this.currentSet = this.set.length-1;	
				}
				save.call(this);
			},
			39: function()
			{
				if(this.currentSet !== this.set.length-1)
				{
					this.currentSet++;
				}
				else
				{
					this.currentSet = 0;
				}
				save.call(this);
			}
		};
	
	/* Methods */
	
	var gId = function(id)
	{
		return d.getElementById(id);
	}
	
	var save = function()
	{
		this.c.innerHTML = this.set[this.currentSet];	
	}
	
	/* Initialize App */
	w.addEventListener('load', function (e)
	{
		var b = d.getElementsByTagName('body')[0],
			data = {},
			ajax = new XMLHttpRequest();
		ajax.open("GET", "data.json", true);
		ajax.send(null);
		ajax.onreadystatechange = function ()
		{
			if (ajax.readyState == 4 && ajax.status == 200)
			{
				data = JSON.parse(ajax.responseText);
				var startCarousel = new Carousel(data);
			}
		}
	});
})(window, document);
/* 	End App */

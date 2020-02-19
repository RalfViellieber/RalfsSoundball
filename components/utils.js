// start game/animations
AFRAME.registerComponent("startgame", {
  init: function() {
    var scene = document.querySelector('a-scene');
    let el = this.el;
    let ph1 = document.querySelector('#pleasehit1');
    let mysterybox = document.querySelector('#mystery');
    let alogo = document.querySelector('#alogo');

    el.addEventListener('click', () => {
      mysterybox.setAttribute('visible', 'true');
      alogo.setAttribute('visible', 'false');
      setTimeout(function() {
        ph1.play();
      }, 500);
      el.emit('startgame'); // to myself

      var els = scene.querySelectorAll('.clickable');
      for (var i = 0; i < els.length; i++) {
        // console.log("emit startgame to " + els[i]);
        els[i].emit('startgame');
      }
    });
  }
});

// wait for startgame
AFRAME.registerComponent("waitstartgame", {
  init: function() {
    // console.log("in waitstartgame");
    let el = this.el;
    el.addEventListener('startgame', () => {
      // console.log("received startgame");
    });
  }
});

// listen for slurpshrink (random entity)
AFRAME.registerComponent("slurpshrink", {
  init: function() {
    let el = this.el;
    el.addEventListener('slurp', function (evt) {
      // console.log("received slurp");
    });
  }
});

// color laser red when intersect entity
AFRAME.registerComponent('pointer', {
  dependencies: ['raycaster'],
	init: function()
	{
    var el = this.el;
    el.addEventListener('raycaster-intersection', function () {
      el.setAttribute("line", "color: #db1102"); // red
    });
    // switch color back
		el.addEventListener("raycaster-intersection-cleared", function()
		{
			el.setAttribute("line", "color: #6699ff");
		});
	}
});

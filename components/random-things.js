/* generate random objects */
AFRAME.registerComponent('random-material', {
  init: function () {
    this.el.setAttribute('material', {
      color: this.getRandomColor(),
      metalness: Math.random(),
      roughness: Math.random()
    });
  },
  getRandomColor: function () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});

AFRAME.registerComponent('random-torus-knot', {
  init: function () {
    var el = this.el;
    var soundslurp = document.querySelector('#sound_slurp');

    el.setAttribute('class', 'clickable');
    el.setAttribute('geometry', {
      primitive: 'torusKnot',
      radius: Math.random() * 5,
      radiusTubular: Math.random() * .75,
      p: Math.round(Math.random() * 10),
      q: Math.round(Math.random() * 10)
    });
    el.addEventListener('click', () => {
      soundslurp.play();
      el.emit('slurp'); // start shrink animation
    });
  }
});

AFRAME.registerComponent('random-sphere', {
  init: function () {
    var el = this.el;
    var soundslurp = document.querySelector('#sound_slurp');

    el.setAttribute('class', 'clickable');
    el.setAttribute('geometry', {
      primitive: 'sphere',
      radius: Math.random() * 5
    });
    el.addEventListener('click', () => {
      console.log('in click random');
        soundslurp.play();
        el.emit('slurp'); // start shrink animation
    });
  }
});

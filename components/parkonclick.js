// move spheres to parking bay
AFRAME.registerComponent('parkonclick', {
  schema: {
    nr: {type: 'number'}, // number of hit ball
  },
  init: function()
  {
    let el = this.el;
    let hit = document.querySelector('#sound_hit');
    let hitfalse = document.querySelector('#sound_hitfalse');
    let nr = this.data.nr;
    let scene = document.querySelector('a-scene');

    el.addEventListener("click", function(event)
    {
      // stop random moving alongpath
      el.removeAttribute('alongpath');
      // hit the correct? last_sphere is global
      if (last_sphere == nr - 1) {
        last_sphere = nr;
        let nextnr = nr + 1;
        hit.play();

        // if not last ball, play "please hit the X"
        if (last_sphere != 6) {
          let thispleasehit = '#pleasehit' + nextnr;
          let phX = document.querySelector(thispleasehit);
          setTimeout(function() {
            phX.play();
          }, 500);
        }
        el.emit('park'); // move to bay
        switch(last_sphere) {
          case 1:   // hit first sphere - play all Audiotracks
            track1.volume(1.0);
            /* start in play-tracks loaded howls simultaneously */
            track1.play();
            track2.play();  // volume = 0.0
            track3.play();
            track4.play();
            track5.play();
            track6.play();
            break;
          case 2:
            track2.volume(1.0);
            break;
          case 3:
            track3.volume(1.0);
            break;
          case 4:
            track4.volume(1.0);
            break;
          case 5:
            track5.volume(1.0);
            break;
          case 6:
            track6.volume(1.0);
            setTimeout(function() { // wait for park animation
              scene.emit('win');
            }, 1000);
            break;
          default: // nothing
        }
      } else {
        if ((last_sphere + 1) < nr) { // two times same sphere or old spheres would be ok - nothing happens
          // you lose
          // console.log("You lose ls: " + last_sphere + "nr: " + nr);
          el.setAttribute('color', 'red');
          hitfalse.play();
          setTimeout(function() {
            scene.emit('lose');
          }, 100);
        }
      }
    });
  }
});

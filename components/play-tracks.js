// load audio tracks
AFRAME.registerComponent('play-tracks', {
  schema: {
  },
  init: function () {
    track1 = new Howl({
      src: ['audio/heavygeeks1.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.0,
      onload: function() {
        // console.log('loaded 1');
      } /* ,
      onend: function() {
        console.log('Finished 1!');
      } */
    });
    track2 = new Howl({
      src: ['audio/heavygeeks2.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.0,
      onload: function() {
        // console.log('loaded 2');
      }
    });
    track3 = new Howl({
      src: ['audio/heavygeeks3.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.0,
      onload: function() {
        // console.log('loaded 3');
      }
    });
    track4 = new Howl({
      src: ['audio/heavygeeks4.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.0,
      onload: function() {
        // console.log('loaded 4');
      }
    });
    track5 = new Howl({
      src: ['audio/heavygeeks5.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.0,
      onload: function() {
        // console.log('loaded 5');
      }
    });
    track6 = new Howl({
      src: ['audio/heavygeeks6.mp3'],
      autoplay: false,
      loop: true,
      volume: 0.0,
      onload: function() {
        // console.log('loaded 6');
      }
    });
    sound_bad_hit = new Howl({
      src: ['audio/bad_hit.mp3'],
      autoplay: false,
      loop: false,
      volume: 1.0,
      pool: 5, // allow 5 times simultaneously
      onload: function() {
        // console.log('loaded sound_bad_hit');
      }
    });
    wscream = new Howl({
      src: ['audio/WilhelmSpaceScream.mp3'],
      autoplay: false,
      loop: false,
      volume: 1.0,
      pool: 1,
      onload: function() {
        // console.log('loaded WilhelmSpaceScream');
      }
    });
  },
});

// avoid audio click
AFRAME.registerComponent('sound-fade', {
  schema: {
    from: {default: 0.0},
    to: {default: 1.0},
    duration: {default: 500},
  },

  init: function () {
    this.el.addEventListener('sound-loaded', ()=> {console.log('fadesound loaded')});
    if (this.el.getAttribute('sound')) {
      this.el.setAttribute('sound', 'volume', this.data.from);
      this.fadeEnded = false;
      this.diff = this.data.to - this.data.from;
    }
    else {
      this.fadeEnded = true;
    }
  },

  update: function (oldData) {
      this.endTime = undefined;
      this.fadeEnded = false;
      this.diff = this.data.to - this.data.from;
  },

  tick: function (time, delta) {
    if (this.fadeEnded) {
      return;
    }
    if (this.endTime === undefined) {
      this.endTime = time + this.data.duration;
      return;
    }

    var ease = 1 - (this.endTime - time) / this.data.duration;
    ease = Math.max(0, Math.min(1, ease * ease)); //easeQuadIn
    var vol = this.data.from + this.diff * ease;
    this.el.setAttribute('sound', 'volume', vol);
    if (ease === 1) {
      this.fadeEnded = true;
    }
  }
});

// camera animation for defeat
function freefall () {
  let itsme = document.querySelector('#itsme');
  let scene = document.querySelector('a-scene');
  let hitfalse = document.querySelector('#sound_hitfalse');

  let trackme = document.createElement('a-curve');
  trackme.setAttribute('class', 'trackme');
  scene.append(trackme);

  let point1 = document.createElement('a-curve-point');
  point1.setAttribute('position', '0 0 0');
  trackme.append(point1);
  let point2 = document.createElement('a-curve-point');
  point2.setAttribute('position', '0 3 0');
  trackme.append(point2);
  let point3 = document.createElement('a-curve-point');
  point3.setAttribute('position', '0 8 1');
  trackme.append(point3);
  let point4 = document.createElement('a-curve-point');
  point4.setAttribute('position', '0 16 2');
  trackme.append(point4);
  let point5 = document.createElement('a-curve-point');
  point5.setAttribute('position', '0 46 3');
  trackme.append(point5);
  let point6 = document.createElement('a-curve-point');
  point6.setAttribute('position', '0 96 4');
  trackme.append(point6);
  let point7 = document.createElement('a-curve-point');
  point7.setAttribute('position', '0 100 5');
  trackme.append(point7);
  let point8 = document.createElement('a-curve-point');
  point8.setAttribute('position', '0 100.1 6');
  point8.setAttribute('class', 'trigger'); // trigger scream
  trackme.append(point8);
  let point9 = document.createElement('a-curve-point');
  point9.setAttribute('position', '0 100.2 6');
  point9.addEventListener("alongpath-trigger-activated", () => {
    wscream.play();
  });
  trackme.append(point9);
  let point10 = document.createElement('a-curve-point');
  point10.setAttribute('position', '0 0.3 -4.5');
  trackme.append(point10);
  itsme.setAttribute('alongpath', 'curve: .trackme; dur: 6000; delay: 5000; loop: false;');
  itsme.setAttribute('animation__rot', 'property: rotation; to: -90 0 0; dur: 6000; delay: 5000; loop: false;');
  itsme.addEventListener("movingended", () => {
    // console.log("camera moving ended:");
    itsme.removeAttribute('alongpath');
    hitfalse.play();
  });
}

// camera animation for win
function movearound () {
  let itsme = document.querySelector('#itsme');
  let scene = document.querySelector('a-scene');
  let mysterybox = document.querySelector('#mystery');

  let trackme = document.createElement('a-curve');
  trackme.setAttribute('class', 'trackmearound');
  scene.append(trackme);

  let point1 = document.createElement('a-curve-point');
  point1.setAttribute('position', '0 0 0');
  trackme.append(point1);
  let point2 = document.createElement('a-curve-point');
  point2.setAttribute('position', '-12 0 -6');
  trackme.append(point2);
  let point3 = document.createElement('a-curve-point');
  point3.setAttribute('position', '0 0 -12');
  trackme.append(point3);
  let point4 = document.createElement('a-curve-point');
  point4.setAttribute('position', '12 0 -6');
  trackme.append(point4);
  let point5 = document.createElement('a-curve-point');
  point5.setAttribute('position', '0 0 0');
  trackme.append(point5);
  itsme.setAttribute('alongpath', 'curve: .trackmearound; dur: 12000; delay: 3000; loop: true;');
  itsme.setAttribute('animation__rot', 'property: rotation; to: 0 -360 0; dur: 12000; delay: 3000; loop: false;');
  itsme.addEventListener("movingended", () => {
    // console.log("camera moving ended:");
    itsme.removeAttribute('alongpath');
    // Play applause?!
  });
}

AFRAME.registerComponent('win-lose', {
  schema: {
  },
  init: function()
  {
    let soundgewitter = document.querySelector('#soundgewitter'); // for defeat
    let scene = document.querySelector('a-scene');
    let mysterybox = document.querySelector('#mystery');
    let el_ichplane = document.querySelector('#ichplane');
    let el_counthits = document.querySelector('#counthits');
    let el_refreshbox = document.querySelector('#refreshbox');

    this.el.addEventListener("win", function(event)
    {
      // console.log("you win event");
      // stop moving animation
      let el_ca = scene.querySelectorAll('[alongpath]');
      for (let i = 0; i < el_ca.length; i++) {
        el_ca[i].removeAttribute('alongpath');
      }

      mysterybox.parentNode.removeChild(mysterybox);
      el_counthits.parentNode.removeChild(el_counthits);

      let alogo = document.querySelector('#alogo');
      alogo.setAttribute('visible', 'true');
      // delete everything not needed for performance "beer"
      /*
      let allTK = scene.querySelectorAll('torusknot');
      for (let i = 0; i < allTK.length; i++) {
        allTK[i].parentNode.removeChild(allTK[i]);
      }
      let rS = scene.querySelectorAll('randSphere');
      for (let i = 0; i < rS.length; i++) {
        rS[i].parentNode.removeChild(rS[i]);
      }
      */

      let videoEl = document.createElement('a-video');
      videoEl.setAttribute('id', 'winVid');
      videoEl.setAttribute('src', 'images/winvideo_oA.mp4'); // not played if loaded in a-asset BUG a-frame
      videoEl.setAttribute('height', '4.9');
      videoEl.setAttribute('width', '4');
      videoEl.setAttribute('position', '0 0.01 -6');
      videoEl.setAttribute('rotation', '-90 0 0');
      videoEl.setAttribute('loop', 'true');
      videoEl.setAttribute('webkit-playsinline');
      videoEl.setAttribute('playsinline');
      videoEl.setAttribute('autoplay');

      let dancer = document.createElement('a-entity');
      dancer.setAttribute('id', 'dance');
      dancer.setAttribute('gltf-model', '#windance');
      dancer.setAttribute('position', '0 0 -5');
      dancer.setAttribute('scale', '0.02 0.02 0.02');
      dancer.setAttribute('animation-mixer', {clip: '*'}); // important: start animation
      scene.appendChild(dancer);
      setTimeout(function() {
        movearound();  // duration 3000 + 12000
      }, 8000);

      let beer = document.createElement('a-entity');
      beer.setAttribute('position', '-1 0 -8');
      beer.setAttribute('sprite-particles', 'texture: images/duff_t5.png; velocity: 1 1 .1..2 4 0.3; acceleration: 0 -1 0..0 -2 0; seed: 2; spawnRate: 8; particleSize: 300; lifeTime: 5');
      setTimeout(function() {
        dancer.parentNode.removeChild(dancer);
        el_ichplane.parentNode.removeChild(el_ichplane);
        scene.appendChild(videoEl);
        scene.appendChild(beer);
      }, 30000);
    }); // End event win

    this.el.addEventListener("lose", function(event)
    {
        // defeat
        // console.log("You lose ls: " + last_sphere);
        // stop moving spheres
        let el_a = scene.querySelectorAll('[alongpath]');
        for (let i = 0; i < el_a.length; i++) {
          // console.log('remove alongpath ' + i)
          el_a[i].removeAttribute('alongpath');
        }
        // avoid clicks
        let el_c = scene.querySelectorAll('.clickable');
        for (let i = 0; i < el_c.length; i++) {
          // console.log('remove class ' + i)
          el_c[i].removeAttribute('class');
        }
        track1.stop(); // stop music
        track2.stop();
        track3.stop();
        track4.stop();
        track5.stop();
        track6.stop();

        soundgewitter.play();
        scene.setAttribute('rain', 'color:red'); //BLOODRAIN!!!

        el_ichplane.parentNode.removeChild(el_ichplane);

        let videoEl = document.createElement('a-video');
        videoEl.setAttribute('id', 'loseVidEl');
        videoEl.setAttribute('src', 'images/losevideo_oA.mp4');
        videoEl.setAttribute('height', '4.9');
        videoEl.setAttribute('width', '4');
        videoEl.setAttribute('position', '0 0.01 -6');
        videoEl.setAttribute('rotation', '-90 0 0');
        videoEl.setAttribute('autoplay');
        videoEl.setAttribute('loop', 'true');

        scene.appendChild(videoEl);

        setTimeout(function() {
          freefall();  // duration 5000 + 6000
        }, 5000);
      });
  }
});

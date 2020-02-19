let totalBallElements = 6;
let anzPoints = 5;
let maxDiff = 6; // deviation from the standard path, greater = more difficult
var howfar = -6;  // how far is the center (z-axis)

  /**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
};

AFRAME.registerComponent("endmoving", {
  schema: {
  },
  init: function() {
    this.el.addEventListener("alongpath-trigger-activated", (e) => {
      // console.log("alongpath-trigger-activated:" + bad_hits);
      bad_hits++;
    });

    this.el.addEventListener("movingended", (e) => {
      // console.log("moving ended:" + bad_hits);
      bad_hits++;
    });
  },
});

AFRAME.registerComponent('makeballs', {
  schema: {
  },

  init: function () {
    var scene = document.querySelector('a-scene');
    var counthits = document.querySelector('#counthits');

    for(let a = 1; a <= totalBallElements; a++){
      // random path params for each sphere
      let pathStartX = getRandomNumber(-45, 45);
      let pathStartY = getRandomNumber(30, 50);
      let pathStartZ = getRandomNumber(-40, -25);
      let pathDuration = getRandomNumber(4500, 6000) - a*200; // smaller = faster
      let rotDuration = getRandomNumber(4000, 7000);
      let startdelay = a*getRandomNumber(1000, 1500) + 500;

      // to endpoint: 0 3 howfar;
      normalDiffOne = Math.floor((pathStartX - 0) / anzPoints);
      normalDiffTwo = Math.floor((pathStartY - 3) / anzPoints);
      normalDiffThree = Math.floor((pathStartZ - howfar) / anzPoints);

      // generate path and apply it
      let track = document.createElement('a-curve');
      track.setAttribute('class', `track${a}`);
      scene.append(track);

      // Start Point
      let point1 = document.createElement('a-curve-point');
      point1.setAttribute('position', `${pathStartY} ${pathStartX} ${pathStartZ}`);
      track.append(point1);
      // console.log('Startpoint one:' + pathStartX + ' two:' + pathStartY +' three:' + pathStartZ)

      for (let b = 1; b < anzPoints; b++) {
        let amaxDiff = Math.floor(maxDiff+a*1.5); // more difficult with each ballnumber
        let px = pathStartX - b*normalDiffOne + getRandomNumber(-amaxDiff, amaxDiff);
        let py = pathStartY - b*normalDiffTwo + getRandomNumber(-amaxDiff, amaxDiff);
        let pz = pathStartZ - b*normalDiffThree + getRandomNumber(-amaxDiff, amaxDiff);
        let point2 = document.createElement('a-curve-point');
        point2.setAttribute('position', `${px} ${py} ${pz}`);
        track.append(point2);
        // console.log('p' + b + ': ' + px + ' y:' + py +' z:' + pz);
      }
      // Endpoint
      let point5 = document.createElement('a-curve-point');
      point5.setAttribute('position', `0 3 ${howfar}`);
      // point5.setAttribute('class', 'trigger');
      track.append(point5);
      // console.log('p5: 0 3 -6');

      let wait_startdelay = startdelay + 100000; // wait until startgame event
      let parkPosX = -3 + (a-1)*0.5;
      let ball = document.createElement('a-sphere');
      ball.setAttribute('id', `Ball_${a}`);
      ball.setAttribute('class', 'clickable');
      ball.setAttribute('src', `#tBall_${a}`);
      ball.setAttribute('scale', '0.8');
      ball.setAttribute('animation__rot', `property: rotation; to: 360 0 0; dur: ${rotDuration}; easing: linear; loop: true`);
      ball.setAttribute('animation__pos2', `property: position; to: ${parkPosX} -1 -3.2; dur:1000; startEvents: park; autoplay: false;`);
      ball.setAttribute('animation__scale', 'property: scale; to: 0.21 0.21 0.21; dur:1000; startEvents: park; autoplay: false;');
      ball.setAttribute(`alongpath`, `curve: .track${a}; dur: ${pathDuration}; delay: ${wait_startdelay}; loop: true ;`);
      ball.addEventListener("movingended", () => {
        console.log("moving ended:" + bad_hits);
        if (bad_hits > 0)  {
          bad_hits--;
          sound_bad_hit.play();
          counthits.setAttribute('text', `value: ${bad_hits}`);
          if (bad_hits == 25) {
            counthits.setAttribute('text', `color: orange`);
          }
          if (bad_hits == 15) {
            counthits.setAttribute('text', `color: red`);
          }
          if (bad_hits == 0) {
            scene.emit('lose');
          }
          /* change color depending on bad_hits
          else {
            let g = 225- (70 - bad_hits)*3;
            let b = 225- (70 - bad_hits)*3;
            mysterycolor = "rgb(255, " + g + ", " + b + ")";
            console.log("mysterycolor:" + mysterycolor);
            let mysterybox = document.querySelector('#mystery');
            mysterybox.setAttribute("color", mysterycolor);
            mysterybox.setAttribute('animation__color', `property: material.color; startEvents: park; dur:2000; from: #00802b; to: ${mysterycolor}`);
          }
          */
        }
      });
      ball.addEventListener("startgame", () => {
        ball.setAttribute(`alongpath`, `delay: ${startdelay};`);
        bad_hits = 70;
      });
      scene.append(ball);
      ball.setAttribute('parkonclick', `nr: ${a}`);
      // ===========  Parking Spheres
      let parkinglodge = document.createElement('a-sphere');
      parkinglodge.setAttribute('id', `park_${a}`);
      parkinglodge.setAttribute('radius', '0.2');
      parkinglodge.setAttribute('color', '#1d1e1f');
      parkinglodge.setAttribute('position', `${parkPosX} -1 -3.2`);
      scene.append(parkinglodge);
    }
  },
});

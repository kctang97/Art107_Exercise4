let video;
let poseNet;
let pose;
let skeleton;
let earth;

function preload() {
  earth = loadImage('asset/Earth.gif');
}

function setup() {
  createCanvas(1024, 648, WEBGL);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    // skeleton = poses[0].skeleton;
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  translate(-width / 2, -height / 2, 0);
  ambientLight(200, 200, 200);
  pointLight(255, 220, 200, width / 4, height / 3, 50);
  image(video, 0, 0);


  if (pose) {
    let d = dist(pose.rightEar.x, pose.rightEar.y, pose.leftEar.x, pose.leftEar.y);
    // strokeWeight(0);
    // fill(255, 100, 200);
    // ellipse(pose.nose.x, pose.nose.y, d)

    push();
    translate(pose.nose.x, pose.nose.y, d);
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    texture(earth);
    box(148, 110);
    pop();
  }
}

let videoElement;
function setup() {
  videoElement = createVideo(["../videos/video-2.mp4"], onVideoLoad);
  videoElement.parent("video-2");
  var myCanvas = createCanvas(1000, 140);
  myCanvas.parent("video-position");
}
function draw() {
  background(255, 255, 255);
  textSize(20);
  text("- Frame Rate with frameRate() = " + frameRate().toFixed(3), 100, 30);
  text("- Frames that have passed with frameCount = " + frameCount, 100, 70);
  text("- Time difference between the beginning of the previous frame",100, 110);
  text("and the beginning of the current frame with deltaTime = " +deltaTime.toFixed(3),100,135);
}
function onVideoLoad() {
  videoElement.play();
  videoElement.volume(0);
  videoElement.autoplay(true);
  videoElement.size(640, 368);
  videoElement.loop();
}

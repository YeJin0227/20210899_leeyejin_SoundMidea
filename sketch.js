let music1;
let music2;

let playbutton;
let buttonPause;

let vol;
let amp;
let currentMusic; 

function preload() {
  soundFormats("mp3", "ogg");
  music1 = loadSound("jsb.mp3");
  music2 = loadSound("lmj.mp3");
}

function setup() {
  createCanvas(640, 1280);
  amp = new p5.Amplitude();
  vol = 0.5;
  
  currentMusic = music1; 
  
  playButton = createButton("PLAY");
  playButton.mousePressed(playMusic);
  playButton.position(250, 700);
  playButton.style('width', '150px');
  playButton.style('height', '50px');
  playButton.style('font-size', '30px');

  buttonPause = createButton("일시정지");
  buttonPause.mousePressed(pauseMusic);
  buttonPause.position(250,760);
  buttonPause.style('width', '150px');
  buttonPause.style('height', '50px');
  buttonPause.style('font-size', '30px');
  
}

function draw() {
  background(30, 30, 50); // 어두운 배경색
  currentMusic.setVolume(vol);
  vol = slider.value();
  currentMusic.rate(sliderRate.value());
  let level = amp.getLevel();
  let centerX = 320;  // x 좌표
  let centerY = 300;  // y 좌표
  
  let progress = map(jumpV, 0, currentMusic.duration(), 0, 540);
  progressBar.size(progress, 20); 
  
  // 중심 큰 별 (진폭에 따라 크기와 색상 변화)
  let centerSize = map(level, 0, 1, 50, 300); 
  fill(255, 204, 0);
  noStroke();
  push();
  translate(centerX, centerY);
  star(0, 0, centerSize / 2, centerSize, 7);
  pop();

  // 주변 작은 별들
  fill(100, 150, 255);
  for (let i = 0; i < 8; i++) {
    let angle = TWO_PI / 8 * i;
    let x = centerX + cos(angle) * 230;
    let y = centerY + sin(angle) * 230;
    let smallSize = map(level, 0, 1, 20, 60);  
    push();
    translate(x, y);
    star(0, 0, smallSize / 2, smallSize, 5);
    pop();
  }
}
// 별 그리는 함수
function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function playMusic() {
  if (!currentMusic.isPlaying()) {
    currentMusic.play();
    jumpV = 0;
    playButton.html("STOP");
  } else {
    currentMusic.stop();
    playButton.html("PLAY");
  }
}
function pauseMusic() {
  if (!currentMusic.isPlaying()) {

  } else {
    currentMusic.pause();
    playButton.html("PLAY");
  }
}

function jumpSong() {
  let jumpInterval;
  if (currentMusic === music1) {  
    jumpInterval = 34.4; 
  } else if (currentMusic === music2) { 
    jumpInterval = 55;
  }
  jumpV = jumpV + jumpInterval;
  if (jumpV >= currentMusic.duration()) {
    jumpV = currentMusic.duration() - 0.01;
    currentMusic.jump(jumpV);
    currentMusic.pause(); 
  } else {
    currentMusic.jump(jumpV);
  }
  console.log("After jump: ", jumpV);
  console.log("Duration: ", currentMusic.duration());
}

function jumpSong2() {
  let jumpInterval;
  currentMusic.play();
  if (currentMusic === music1) {
    jumpInterval = 34.4; 
  } else if (currentMusic === music2) {  
    jumpInterval = 55;
  }
  jumpV = jumpV - jumpInterval;
  if (jumpV < 0) {
    jumpV = 0;
  }
  currentMusic.jump(jumpV);
}



function switchToLmj() {
  if (currentMusic === music1) {
    currentMusic.stop(); 
    currentMusic = music2; 
    currentMusic.play(); 
    musicText.html("현재 재생 음악 : 이무진 '청춘 만화' ");
    musicText.position(150, 650);
  }

  else if (currentMusic === music2) {
    currentMusic.stop(); 
    currentMusic = music1;
    currentMusic.play(); 
    musicText.html("현재 재생 음악 : 재쓰비 '너와의 모든 지금'");
  }
}
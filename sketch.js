let music1;
let music2;

let playbutton;
let buttonPause;
let buttonJump1;
let buttonJump2;
let buttonSwitch;

let slider;
let sliderRate;

let vol;
let jumpV = 0;
let amp;
let currentMusic; 

let musicText; 

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
  
  musicText = createDiv("현재 재생 음악 : 재쓰비 '너와의 모든 지금'");
  musicText.position(100, 650); // 화면에 텍스트 위치
  musicText.style('font-size', '24px');
  musicText.style('color', 'white');
  
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
  
  buttonJump1 = createButton("전으로 점프");
  buttonJump1.mousePressed(jumpSong2);
  buttonJump1.position(160, 950);
  buttonJump1.style('width', '150px');
  buttonJump1.style('height', '40px');
  buttonJump1.style('font-size', '25px');
  
  buttonJump2 = createButton("후로 점프");
  buttonJump2.mousePressed(jumpSong);
  buttonJump2.position(350, 950);
  buttonJump2.style('width', '150px');
  buttonJump2.style('height', '40px');
  buttonJump2.style('font-size', '25px');
  
  buttonSwitch = createButton("노래 전환");
  buttonSwitch.mousePressed(switchToLmj);
  buttonSwitch.position(250, 1150);
  buttonSwitch.style('width', '150px');
  buttonSwitch.style('height', '50px');
  buttonSwitch.style('font-size', '30px');
  
  slider = createSlider(0, 2, 0.5, 0.1);
  slider.position(50, height - 250); 
  slider.size(250, 100); 
  let sliderText = createDiv('볼륨 조절');
  sliderText.position(slider.x+65, slider.y - 15); 
  sliderText.style('font-size', '30px');
  sliderText.style('text-align', 'center');
  sliderText.style('color', 'white');
  
  sliderRate = createSlider(0, 2, 1, 0.1);
  sliderRate.position(350, height - 250); 
  sliderRate.size(250,100);
  let sliderRateText = createDiv('속도 조절');
  sliderRateText.position(sliderRate.x+60, sliderRate.y - 15); 
  sliderRateText.style('font-size', '30px');
  sliderRateText.style('text-align', 'center');
  sliderRateText.style('color', 'white');
  
}

function draw() {
  background(30, 30, 50); // 어두운 배경색
  currentMusic.setVolume(vol);
  vol = slider.value();
  currentMusic.rate(sliderRate.value());
  let level = amp.getLevel();
  let centerX = 320;  // x 좌표
  let centerY = 300;  // y 좌표
  
  
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
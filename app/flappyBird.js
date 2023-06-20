var game = document.getElementById("game");
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var bird = document.getElementById("character");
var birdImg = document.getElementById("birdImg");
var birdImgSrc = "/app/bird0_0.png"
var scoreNumber = 0;
var speed = 4;
var historyTop = 0;
var jumping = 0;
var count = 0;

//JS Arrow function 
/*
"() =>" is the shortcut of "function()"
*/

// 生成洞口
hole.addEventListener('animationiteration', function() {
  // 随机洞口高度
  var random = Math.random() * 1;
  var top = random * 100;
  // 防止洞口过低过高 
  if (historyTop != 0) {
    if (top > 90 && historyTop < 30) {
      top = historyTop + 20;
    }
    if (top < 30 && historyTop > 90) {
      top = historyTop - 20;
    }
  }
  if (top > 99) {
    top = 99;
  }
  if (top < 33) {
    top = 33;
  }
  // 防止洞口高度重复 
  if (top == historyTop) {
    if (top >= 50) {
      top = top - 20;
    }
    if (top < 50) {
      top = top + 20;
    }
  }
  historyTop = top;
  hole.style.top = -(top) + "%";
});

// 控制小鸟
setInterval(function() {
  // 检测游戏空间高度
  var boxHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"));
  // 检测小鸟所在高度
  var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
  if (jumping == 0) {
    bird.style.top = (birdTop + 2) + "px";
  }
  // 判断小鸟是否掉出空间
  if (birdTop > boxHeight) {
    gameOver();
  }
  // 判断小鸟是否通过洞口
  if (isOverlap(bird, block)) {
    if (isOverlap(bird, hole)) {
      count++;
    } else {
      gameOver();
    }
  }
}, 10);

// 键盘控制: 所有键位均可以使用
document.addEventListener("keydown", function(event) {
  if (event.keyCode != -1) {
    jump();
  }
});

// 鸟儿跳~
function jump() {
  if (birdImgSrc == "/app/bird0_0.png") {
    birdImgSrc = "/app/bird0_2.png";
  } else {
    birdImgSrc = "/app/bird0_0.png";
  }
  birdImg.setAttribute("src", birdImgSrc);
  jumping = 1;
  let jumpCount = 0;
  var jumpInterval = setInterval(function() {
    var boxTop = parseInt(window.getComputedStyle(game).getPropertyValue("top"));
    var boxHeight = parseInt(window.getComputedStyle(game).getPropertyValue("height"));
    var birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
    if ((birdTop > boxTop) && (birdTop < boxHeight) && (jumpCount < 15)) {
      bird.style.top = (birdTop - 5) + "px";
    }
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);

  if (isOverlap(bird, hole)) {
    score();
  }
}

// 判断小鸟是否接触元素
// https://www.imsry.cn/posts/fc8b3868.html
function isOverlap(div1, div2) {
  var len1 = new Array(), len2 = new Array();
  len1[0] = div1.offsetLeft;  //左边界
  len1[1] = div1.offsetTop;   //上边界
  len1[2] = div1.offsetWidth + len1[0];   //右边界
  len1[3] = div1.offsetHeight + len1[1];  //下边界
  len2[0] = div2.offsetLeft;
  len2[1] = div2.offsetTop;
  len2[2] = div2.offsetWidth + len2[0];
  len2[3] = div2.offsetHeight + len2[1];
  if (((len1[0] >= len2[0] && len1[0] <= len2[2]) || (len1[2] >= len2[0] && len1[2] <= len2[2])) && ((len1[1] >= len2[1] && len1[3] <= len2[3]) || (len1[3] >= len2[1] && len1[3] <= len2[3]))) {
    return true;
  } else {
    return false;
  }
}

// 分数
function score() {
  if (count >= 0) {
    count = 0;
    scoreNumber++;
    level();
  }
  document.getElementById("score").innerHTML = scoreNumber;
}

// 等级
function level() {
  if(scoreNumber >= 20) {
    setTimeout('block.style.width = "200px"', 1000);
    hole.style.width = "200px";
  }
  if(scoreNumber >= 40) {
    setTimeout('hole.style.height = "20%"', 1000);
  }
  if(scoreNumber >= 60) {
    setTimeout('hole.style.height = "15%"', 1000);
    block.style.width = "100px";
    hole.style.width = "100px";
  }
}

function gameOver() {
  window.location.href = "/";
  window.alert("Game Over! Score: " + scoreNumber);
  bird.style.top = 50 + "%";
  count = 0;
}
function pause() {
  window.alert("Pause");
}
var $el = $("#loading-page");

// 啟用 ripples 水波效果
$el.ripples({
  resolution: 512,
  interactive: false,
});

// 產生隨機水波的函數
function createRandomRipple() {
  var x = Math.random() * $el.outerWidth();
  var y = Math.random() * $el.outerHeight();
  var dropRadius = 20 + Math.random() * 20; // 隨機大小 20-40
  var strength = 5 + Math.random() * 5; // 隨機強度 5-10

  $el.ripples("drop", x, y, dropRadius, strength);
}

function triggerAnimation() {
  // 1. 頁面載入後 logo 先淡入 (1s)
  $(".logo").css("opacity", "1");

  // 2. 1s 後，水滴落下的同時讓 circle-logo 淡入 (2s)
  setTimeout(() => {
    var x = $el.outerWidth() / 2;
    var y = $el.outerHeight() / 2;
    var dropRadius = 30;
    var strength = 8;

    $el.ripples("drop", x, y, dropRadius, strength);
    $(".circle-logo").css("opacity", "1");
  }, 1500);

  // 3. 等待 1s，確保 circle-logo 停留一點時間
  setTimeout(() => {
    // 4. logo 淡出，circle-logo 旋轉 + 放大，背景顏色變化
    $(".logo").css("opacity", "0");

    $(".circle-logo").css({
      transform: "translate(-70%, -45%) scale(2.2) rotate(15deg)",
      opacity: "1",
    });

    $(".circle-logo img").css("filter", "blur(0.07vw)");
    $("#loading-page").css("background-color", "rgba(213, 210, 210, 0.35)");

    // 5. 最後讓 loading-container 淡出，並顯示 wave-text
    setTimeout(() => {
      $(".loading-container").css("opacity", "100");
      $(".wave-text").css("opacity", "1");
      
      // 開始每5秒產生一個隨機水波
      setInterval(createRandomRipple, 5000);
    }, 1000);
  }, 3000);
}

$(document).ready(function () {
  setTimeout(triggerAnimation, 100);
});

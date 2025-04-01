var vw = 600;
var vh = 450;

var app = new PIXI.Application(vw, vh, {
  view: document.getElementById("water-effect"),
  transparent: true,
});

var loader = new PIXI.loaders.Loader()
  // 位移貼圖
  .add("displacementMap", "assets/displacementmap.png")
  .add("light", "assets/water-light-gray.jpg")
  .load(init);

function init(loader, resources) {
  var container = new PIXI.Container();
  var background = new PIXI.Sprite(resources.light.texture);

  // 調整背景圖片尺寸，稍微放大一些以覆蓋邊緣
  background.width = vw + 50; // 加寬 50px
  background.height = vh + 50; // 加高 50px
  background.position.x = -25; // 向左移 25px
  background.position.y = -25; // 向上移 25px

  var displacementSprite = new PIXI.Sprite(resources.displacementMap.texture);
  var displacementFilter = new PIXI.filters.DisplacementFilter(
    displacementSprite
  );

  container.filterArea = new PIXI.Rectangle(0, 0, vw, vh);
  container.filters = [displacementFilter];
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

  container.position.set(0);
  container.addChild(background);
  container.addChild(displacementSprite);
  app.stage.addChild(container);

  TweenMax.to(displacementSprite, 5, {
    ease: Linear.easeNone,
    repeat: -1,
    x: 512,
    y: 512,
  });
}

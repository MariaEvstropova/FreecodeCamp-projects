"use strict";
var background_1 = require("./components/background/background");
var img = require("./images/spritesheet.png");
document.addEventListener("DOMContentLoaded", function (event) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var background = new background_1.Background(context, canvas.width, canvas.height);
    var spriteSheet = new Image();
    background.drawLevel();
    spriteSheet.onload = function () {
    };
    spriteSheet.src = img;
});
//# sourceMappingURL=main.js.map
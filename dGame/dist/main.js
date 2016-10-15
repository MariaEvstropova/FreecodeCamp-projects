"use strict";
var background_1 = require("./components/background");
document.addEventListener("DOMContentLoaded", function (event) {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var background = new background_1.Background(context, canvas.width, canvas.height);
    background.drawLevel();
});
//# sourceMappingURL=main.js.map
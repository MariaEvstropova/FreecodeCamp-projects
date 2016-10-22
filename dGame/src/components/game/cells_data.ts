const CAT_CELLS_WIDTH = 32, CAT_CELLS_HEIGHT = 32;

var catCells_front = [
       { left: 0,   top: 0, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 32,  top: 0, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 64,  top: 0, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
];
//Кот бежит налево
var catCells_left = [
       { left: 0,   top: 32, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 32,  top: 32, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 64,  top: 32, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
];
//Кот бежит направо
var catCells_right = [
       { left: 0,   top: 64, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 32,  top: 64, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 64,  top: 64, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
];
//Кот бежит назад
var catCells_back = [
       { left: 0,   top: 96, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 32,  top: 96, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 64,  top: 96, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
];

const DOG_CELLS_WIDTH = 32, DOG_CELLS_HEIGHT = 32;

var dog_barks_right = [
       { left: 0,   top: 162, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 42,  top: 162, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 76,  top: 162, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 118,  top: 162, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
];

var dog_barks_left = [
       { left: 0,   top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 42,  top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 76,  top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 118,  top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
];

var dog_sleeps = [
       { left: 34,   top: 140, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT }
];

const BONE_CELLS_WIDTH = 25, BONE_CELLS_HEIGHT = 25;

var bone_flying = [
       { left: 0,   top: 134, width: BONE_CELLS_WIDTH, height: BONE_CELLS_HEIGHT }
];

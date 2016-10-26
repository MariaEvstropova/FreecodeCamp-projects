export const CAT_CELLS_WIDTH = 32, CAT_CELLS_HEIGHT = 32;

export var catCells_front = [
       { left: 0,   top: 0, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 32,  top: 0, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 64,  top: 0, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
];
// Кот бежит налево
export var catCells_left = [
       { left: 0,   top: 32, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 32,  top: 32, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 64,  top: 32, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
];
// Кот бежит направо
export var catCells_right = [
       { left: 0,   top: 64, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 32,  top: 64, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 64,  top: 64, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
];
// Кот бежит назад
export var catCells_back = [
       { left: 0,   top: 96, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 32,  top: 96, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
       { left: 64,  top: 96, width: CAT_CELLS_WIDTH, height: CAT_CELLS_HEIGHT },
];

export const DOG_CELLS_WIDTH = 32, DOG_CELLS_HEIGHT = 32;

export var dog_barks_right = [
       { left: 0,   top: 161, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 40,  top: 161, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 80,  top: 161, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 120,  top: 161, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
];

export var dog_barks_left = [
       { left: 0,   top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 40,  top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 80,  top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
       { left: 120,  top: 192, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT },
];

export var dog_sleeps = [
       { left: 34,   top: 127, width: DOG_CELLS_WIDTH, height: DOG_CELLS_HEIGHT }
];

export const BONE_CELLS_WIDTH = 25, BONE_CELLS_HEIGHT = 25;

export var bone_flying = [
       { left: 0,   top: 134, width: BONE_CELLS_WIDTH, height: BONE_CELLS_HEIGHT }
];

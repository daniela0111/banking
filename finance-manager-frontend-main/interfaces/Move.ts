export interface Move {
    move(): void;
}

export class Cat implements Move {
    move(): void {
        console.log("I am a cat and I am running!");
    }
}

export class Bird implements Move {
    move(): void {
        console.log("I am a bird and i fly!");
    }
}

const movingAnimal1: Move = new Cat()
movingAnimal1.move();

const bird1: Move = new Bird();
bird1.move();


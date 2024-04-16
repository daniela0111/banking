export class TodoEntity {
    constructor(public text: string, public done: boolean, public id: number) {}
}

export class CreateTodoDTO {
    constructor(public text: string, public done: boolean) { }
}
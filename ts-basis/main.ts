// const firstName = 'John';

// console.log(firstName);



// let firstName: string = 'John';
// let age: number = 10;
// firstName = 10;
// age = 'Test';

// let lastName = 'Smith';


// let lastName: any = 'Smith';
// lastName = 10;


// let age: number | string = 10;
// age = '200';
// age = true;


// let names: (string | number)[] = ['David', 'Mike', 'John'];

// type User = {
//     name: string,
//     age: number,
//     street?: string
// }

// let user1: User = {
//     name: 'Name',
//     age: 20,
//     street: 'Main str.',
// }

// function calculateSum(num1: number, num2?: number) {
//     return num1 + num2;
// }

// calculateSum(10, 20);

class Car {
    readonly name: string = 'DEFAULT';
    readonly year: number;


    constructor(name: string, year: number) {
        this.name = name;
        this.year = year;
    }

    private getInfo(): string {
        return `Name:${name}, year${this.year}`
    }

}


// class BMW extends Car { 

// }

const car1 = new Car('BMW', 30);


console.log(car1.name);
console.log(car1.year)
"use strict";

class User {
  constructor(name, surname, books, pets) {
    this.name = name;
    this.surname = surname;
    this.books = books;
    this.pets = pets;
  }

  getFullName() {
    return `${this.name} ${this.surname}`;
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  countPets() {
    return this.pets.length;
  }

  addBook(name, author) {
    this.books.push({ name, author });
  }

  getBookNames() {
    return this.books.map((book) => book.name);
  }
}

// New Instance of user class
const user = new User("Guillermo", "Martinez", [], []);

// Show full Name
console.log(`Full Name: ${user.getFullName()}`);

// Add new pets
user.addPet("cat");
user.addPet("dog");

// Show pets count
console.log(`Pets count: ${user.countPets()}`);

// Add new books
user.addBook("Fundamentos de Programación", "Luis Joyanes Aguilar");
user.addBook("Fundacion", "Isaac Asimov");

// Show books names
console.log(user.getBookNames());
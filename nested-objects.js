class Person{
  
  constructor(name, age, ...address){
    this.name = name; 
    this.age = age;
    this.address = new Address(...address);
  }
}

class Address{

  constructor(street, city, country){
    this.street = street;
    this.city = city;
    this.country = country;
  }
}

const person1 = new Person("Spongebog", 30, "124 Conch Street", "Bikini Bottom", "International Waters");

const person2 = new Person("Patrick", 37, "128 Conch Street", "Bikini Bottom", "International Waters");

const person3 = new Person("Squidward", 45, "126 Conch Street", "Bikini Bottom", "International Waters");


console.log(person2.address.street)
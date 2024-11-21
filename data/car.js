class Car{
    #brand ;
    #model;
  speed=0;
  isTrunkOpen=false;
  constructor(carDetails)
  {
    this.#brand=carDetails.brand ;
    this.#model=carDetails.model ;
  }
  getBrand()
  {
    return this.#brand;
  }
  getModel()
  {
    return this.#model;
  }
  displayInfo()
  { 
    const trunkStatus=this.isTrunkOpen?'open':'closed' ;
    console.log(`${this.#brand} ${this.#model}  Speed:${this.speed}km/hr  Trunk is ${trunkStatus}`);
  }
  go()
  { 
    if(!this.isTrunkOpen)
    {
      this.speed+=5;
    }
    if(this.speed>200)
    {
      this.speed=200;
    }
    

  }
    
  break()
  {
    this.speed-=5 ;
    if(this.speed<0)
    {
      this.speed=0;
    }
  }
    
    

  openTrunk()
  {   
    if(this.speed===0)
      {
        this.isTrunkOpen=true;
      }
      
  }
  closeTrunk()
  {
     this.isTrunkOpen=false ;
  }
}
const car1=new Car({brand:'Toyota',model:'corolla'});
const car2 =new Car({brand:'Tesla',model:'model 3'});

console.log(car1);

//car1 speed is zero and trunk is closed ;
car1.openTrunk();
//car1 speed is zero and trunk is open means car is standing still and is not moving ;
car1.go();
car1.displayInfo();
car1.closeTrunk();
car1.go();
car1.displayInfo();


class RaceCar extends Car{
  accelaration ;

  constructor(carDetails)
  { 
    super(carDetails);
    this.accelaration=carDetails.accelaration ;
  }
  go()
  {
    this.speed+=this.accelaration ;
    if(this.speed>300)
    {
      this.speed=300;
    }
  }
  openTrunk()
  {
    console.log('Race cars do not have trunk');
  }
  closeTrunk()
  {
    console.log('Race Cars do not have trunk');
  }
  displayInfo()
  {
    console.log(`${this.getBrand()} ${this.getModel()}  Speed:${this.speed}km/h`);
  }
}
 const raceCar=new RaceCar({brand:'Mclaren',model:'F1',accelaration:20});
 raceCar.go();
raceCar.displayInfo();
const raceCar1=new RaceCar({brand:'mercedez',model:'C class',accelaration:30});
raceCar1.go();
raceCar1.displayInfo();
//here brand and model are private fields but we can access them outside of the clas using getter and setter methods as RaceCar is the child of Car class and all tha methods in the class car are applicable to the RaceCar
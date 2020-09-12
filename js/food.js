class Food{
    constructor(){
        this.foodStock = 0;
        this.lastFed;
        this.bedroom = loadImage("images/Bed room.png");
        this.garden = loadImage("images/Garden.png");
        this.bathroom = loadImage("images/Wash Room.png");
        this.image = loadImage("images/milk.png");

}
getFoodStock(){
  return this.foodStock;
}


updateFoodStock(x){
this.foodStock = x
}

deductStock(){
    if (this.foodStock > 0) {
        this.foodStock = this.foodStock - 1;
      }
}



display(){
    var x = 80;
    var y = 100;
      imageMode(CENTER);
    if (this.foodStock != 0) {
        for (var i = 0; i < this.foodStock; i++) {
        if (i % 10 === 0) {
            x = 80;
            y = y + 50;
        } 
        image(this.image,x,y,width,height);
        x = x + 30           
        }
    }
    }
getFeedTime(lastFed)
{
this.lastFed = lastFed;
}
}
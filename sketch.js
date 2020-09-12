var dog,foodS,foodStock,database,sadogimg;
var FeedTheDog,AddFood;
var lastFed;
var fedTime;
var gameState = "full";
var chGameState;
var readGameState;
var garden,bathroom,bedroom;
 
function preload()
{
happyDogImg = loadImage("images/happy dog.png");
dogImg = loadImage("images/Dog.png");
sadogimg = loadImage("images/sad dog.png");
garden = loadImage("images/Garden.png");
bedroom = loadImage("images/Bed Room.png");
bathroom = loadImage("images/Wash Room.png");
}
 
function setup() {
  createCanvas(1000, 700);

  database = firebase.database();

  dog = createSprite(800,350);
  dog.addImage(dogImg);
  dog.scale = 0.3;

  food1 = new Food();

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

  gameState = database.ref('gameState');
  gameState.on("value",function(data){
    gameState = data.val();
  })

  FeedTheDog = createButton("Feed The Dog");
  FeedTheDog.position(700,95);
  
  AddFood = createButton("Add Food")
  AddFood.position(800,95);

  FeedTheDog.mousePressed(feedDog);
  AddFood.mousePressed(addFood);
 
}
 
 
function draw() {  
  background(46,139,87);

  console.log(gameState);

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
    }
  )

  


  fill(0,0,0);
   if (lastFed>=12) {
        text(" Last Feed : " +lastFed%12 + "PM" ,350,30);
    } else if(lastFed === 0){
        text("Last Feed : 12 AM",350,30);
    }
      else{
          text("Last Feed : " + lastFed + "AM",350,30);
      } 

    


  drawSprites();
  
 
 
  textSize(20);
  text("foodStock " + foodS,750,230);
  text(mouseX + " " + mouseY,700,50);


  if (gameState === "hungry") {
    FeedTheDog.hide();
    AddFood.hide();
    dog.remove();
    }
  else{
    FeedTheDog.show();
    AddFood.show();
    dog.addImage(sadogimg);
    
      }

      if (hour() == (lastFed + 1)) {
        update("Playing");
        background(bathroom,550,550);
      } 
      else if (fedTime == (lastFed + 2)) {
        update("Sleeping");
        background(bedroom,550,550);
      }
      else if (hour() > (lastFed + 2) && hour() <= (lastFed + 4)) {
        update("Bathing");
        background(bathroom,550,550);
      }
      else {
        update("Hungry");
        food1.display();
      }

}

function readStock(data){
  foodS = data.val();
  food1.updateFoodStock(foodS);
}

function feedDog() {
  food1.updateFoodStock(food1.getFoodStock() - 1);
  database.ref("/").update({
    Food:food1.getFoodStock(),
    feedTime:hour()
  })
}

function addFood(){
  foodS++
  database.ref("/").update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}






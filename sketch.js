var dog, happyDog, database, foodS, foodStock;
var dogImage, happyDogImage;


function preload()
{
	dogImage = loadImage("Images/Dog.png")
  happyDogImage = loadImage("Images/happyDog.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250, 250)
  dog.addImage(dogImage)
  dog.scale = 0.2;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }



  if(foodS === 0){
    foodS = 20;
  }
  

  drawSprites();
  fill("red");
  textSize(25);
  stroke("black");
  strokeWeight(2);
  text("Press UP Aroow to feed the dog", 20, 30);
  text("Food Remaining = "+foodS, 150, 150);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x >= 0){
    x= x-1;
  }

  database.ref('/').update({
      Food: x
    })
}
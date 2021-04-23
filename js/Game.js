class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      passed = false;
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    player.finishedCount();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);

      //index of the array
      var index =0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200 + allPlayers[plr].xPosition + (index * 200);
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
        if(cars[index - 1].isTouching(obstaclesGroup)){
          xVelocity = xVelocity * 0.985;
          yVelocity = yVelocity * 0.985;
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(player.distance < 3800){

    if(keyIsDown(38) && player.index !== null){
      yVelocity += 0.9;

      if(keyIsDown(37) && player.index !== null){
        xVelocity -= 0.2;
      }
      if(keyIsDown(39) && player.index !== null){
        xVelocity += 0.2;
      }
      
    }
  }
  else if(passed === false){
    finishedPlayers += 1;
    player.updateFinishedCount(finishedPlayers);

    player.position += finishedPlayers;
    player.update();

    xVelocity = xVelocity * 0.985;
    yVelocity = yVelocity * 0.985; 

    passed = true;
  }
  else{
    xVelocity = xVelocity * 0.985;
    xVelocity = xVelocity * 0.985;
  }
    xVelocity = xVelocity * 0.985;
    yVelocity = yVelocity * 0.985; 
      
    player.distance += yVelocity;
    player.xPosition += xVelocity;
    player.update();
   /*
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance > 3860){
      gameState = 2;
    }
   */

    drawSprites();
  }
  displayRanks(){
      camera.position.x = displayWidth/2;
      camera.position.y = displayHeight/2;
      imageMode(CENTER);
      image(goldImage, displayWidth/2, displayHeight/2 - 100, 250, 300);
      image(silverImage, displayWidth/2 - 300, displayHeight/2 + 150, 250, 300);
      image(bronzeImage, displayWidth/2 + 300, displayHeight/2 + 250, 250, 300);
      textSize(18);
      textAlign(CENTER);
      Player.getPlayerInfo();
      for(var plr in allPlayers){
        if(allPlayers[plr].position === 1){
          text(allPlayers[plr].name, displayWidth/2, displayHeight/2 +50);
        }
        if(allPlayers[plr].position === 2){
          text(allPlayers[plr].name, displayWidth/2 - 300, displayHeight/2 +200);
        }
        if(allPlayers[plr].position === 3){
          text(allPlayers[plr].name, displayWidth/2 + 300, displayHeight/2 +400);
        }
      }
      
  }

  /*end(){
    console.log("Game Ended");
  }*/
}

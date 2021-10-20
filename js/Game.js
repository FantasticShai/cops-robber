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
      background(rgb(198,135,103));
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }


    robberPlr = createSprite(300, 500);
    robberPlr.addImage(robberImg);
    robberPlr.visible = false;

    
    copPlr = createSprite(500, 200);
    copPlr.addImage(copImg);
    copPlr.visible = false;
    

    //car4 = createSprite(700,200);
    //car4.addImage("car4",car4_img);
    vehicles = [robberPlr, copPlr];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    //player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      //background(rgb(198,135,103));
      image(track, displayWidth/2, displayHeight/2, displayWidth, displayHeight*5);
     
      robberPlr.visible = true;
      copPlr.visible = true;
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        vehicles[index-1].x = x;
        vehicles[index-1].y = y;
       // console.log(index, player.index)

       
          camera.position.x = displayWidth/2;
          camera.position.y = vehicles[index-1].y;
        
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    /*if(player.distance > 4500){
      gameState = 2;
      player.rank+=1;
      Player.updateCarsAtEnd(player.rank);
    }*/

    if(copPlr.isTouching(robberPlr)){
      gameState = 2;
      /*stroke("red");
      strokeWeight(3);
      fill("yellow");
      textSize(30);
      text("Robber has been Caught!", displayWidth/2 - 50, displayHeight/2);*/

    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    //console.log(player.rank);
    stroke("red");
      strokeWeight(3);
      fill("yellow");
      textSize(30);
      text("Robber has been Caught!", displayWidth/2 - 50, displayHeight/2);
  }
}

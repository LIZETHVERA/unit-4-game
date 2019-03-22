    var chooseAttacker = true;
    var chooseDefender = true;
    var enemiesLeft;
    var defender;
    var attacker;
    var winner;
    var counter = 0;
    var counterdefender = 0;
    var wins = 0;

var characters = {
   char1: {
        name: 'Obi',
        healthPower: 120,
        attackPower: 7,
        imageUrl: "assets/images/obi.jpg",
    },
    char2: {
        name: "Luke",
        healthPower: 140,
        attackPower: 6,
        imageUrl: "assets/images/luke.jpg",
    },
    char3: {
        name: "Sidious",
        healthPower: 130,
        attackPower: 5,
        imageUrl: "assets/images/sidious.jpg",
    },
    char4: {
        name: "Maul",
        healthPower: 90,
        attackPower: 9,
        imageUrl: "assets/images/maul.jpg",
    }
};

// the i in the fuction is index and the character is the value.
$.each(characters, function(index,character) {
    var charDiv = $("<div class='character'>");

    // Set data attributes 
    charDiv.data('char', index);
    charDiv.data('name', character.name);
    charDiv.data('healthPower', character.healthPower);
    charDiv.data('attackPower', character.attackPower);
    charDiv.data('counter', character.counter);{}

    var charName = $("<div class='character-name'>").text("Fighter: " + character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-healthPower'>").text("Health: " + character.healthPower);

     // Append image and name divs
    charDiv.append(charName).append(charImage).append(charHealth);
    charDiv.appendTo('#characters-section');
});


$(".character").on("click", function() {

	//check for startgame conditions
	if (chooseAttacker) {
        // flags that user needs to choose opponent next
        chooseAttacker = false;
        
        // removes user from available
        attacker = $(this).detach();

        // adds user to fight
        attacker.appendTo("#selected-character");
     
        attacker.off("click");

        //move the enemies left to the enemies available to attack. 
        $("#characters-section").appendTo("#enemies_left");

        } else if (chooseDefender) { //user is alive and needs a new opponent ** chooseDefender
                
            //flags functionality of fight and reset buttons, disables characters ** chooseDefender
            
            chooseDefender = false;
                    
            // gameOn = true; 
            $("#gameMessage").html(""); // clears any alerts, if any
            
            // $(this).css("border-color", "#B9161A");
            // Removes opponent from available
            defender = $(this).detach();
            
            defender.appendTo("#defender");
            
            enemiesLeft = $("#characters-section").appendTo("#enemies_left"); 
            console.log("enemies left" + enemiesLeft);
            $(".character").css("background-color", "white");
            
            //move the enemies left to the enemies available to attack. 
            $(".character","#enemies_left").css("background-color", "red");
            
        }
});

function fight (){
    counter ++;
    counterdefender ++;
    console.log(counter);
    // Attacter power
    var attackerAttack = parseInt(attacker.data("attackPower")); 
    attackerAttack = attackerAttack * counter;    

    var healthPower = defender.data('healthPower');
    var defenderHealth = parseInt(healthPower);
  

    // To get the attacker heatlh value.
    var healthPowerAttacker = attacker.data('healthPower');
    var attackerHealth = parseInt(healthPowerAttacker);
    
        
    // Decrese the defender power.
    defenderHealth-= attackerAttack; 
 
    //change data on defender healthPower
    defender.data("healthPower", defenderHealth); 

   // defender attack power. 
    var defenderAttack = parseInt(defender.data("attackPower"));
   
    attackerHealth -= defenderAttack;
    var damage = defenderAttack * counterdefender;
  
    //change data on user attack 

    // to find the healthPower character 
     $("#defender").find(".character-healthPower").html(defenderHealth);
     $("#selected-character").find(".character-healthPower").html(attackerHealth);
    console.log("attack to defender inicio" + attackerAttack);
    //messsge to the user
    $("#gameMessage").html('');
    $("#gameMessage").append("You did: " + attackerAttack + " damage to " + defender.data("name") + ". "); 
    $("#gameMessage").append( defender.data("name") + "  damage to you by: " + damage); 

    // update attack power
     
    //change data on attacker healthPower
    attacker.data("healthPower", attackerHealth); 

    console.log("attack to defender final" + attackerAttack);

    if (defenderHealth <= 0){

        $("#gameMessage").html('');
        $("#gameMessage").append("You have defeated " + defender.data("name") + "  Your power attack now is: " + attackerAttack + " . Choose a new character");
        
        defender.remove();
        chooseDefender = true; //** chooseDefender
        counterdefender = 0;
        wins++;
    
        } else if (chooseAttacker) {
              $("#gameMessage").text("Please select a character");
    
            }  else if (attackerHealth <= 0 ){
                $("#gameMessage").html('');
                $("#gameMessage").append("GAME OVER");
                $("#attack-button").detach();
                $("#defender").detach();
                $("#enemies_left").detach();

    }

    if (wins == Object.keys(characters).length - 1){
        $("#gameMessage").html('');
        $("#gameMessage").append("You Win!");
        $("#attack-button").detach();
        $("#defender").detach();
        $("#enemies_left").detach();
    }

}
 
$("#attack-button").on("click", function() {
    if (!chooseDefender && !chooseAttacker) {
        
        fight();   

    } else {

        $("#gameMessage").text("please select a character");
    
    }
     
})


$("#restart-button").on("click", function() {
    window.location.reload();

})












































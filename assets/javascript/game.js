   var gameOn = false;
    var chooseChar = false;
    var enemiesLeft = false;
    var userDeath = false;
    var computerDeath = false;
    var defender;
    var attacker;
    var winner;
    var userDied = [];
    var counter = 0;
    var counterdefender = 0;

var characters = {
   char1: {
        name: 'obi',
        healthPower: 120,
        attackPower: 8,
        counter: 6,
        imageUrl: "assets/images/obi.jpg",
    },
    char2: {
        name: "luke",
        healthPower: 100,
        attackPower: 5,
        counter: 8,
        imageUrl: "assets/images/luke.jpg",
    },
    char3: {
        name: "sidious",
        healthPower: 100,
        attackPower: 3,
        counter: 8,
        imageUrl: "assets/images/sidious.jpg",
    },
    char4: {
        name: "maul",
        healthPower: 100,
        attackPower: 9,
        counter: 8,
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
    charDiv.data('counter', character.counter);

    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-healthPower'>").text(character.healthPower);

    //var charAttackPower = $("<div class='character-attack' data-attackPower='" + character.attackPower + "'>");
    //var charCounter = $("<div class='character-counter' data-counter='" + character.counter + "'>");

    // Append image and name divs
    charDiv.append(charName).append(charImage).append(charHealth);
    charDiv.appendTo('#characters-section');
});

$(".character").on("click", function() {
	//check for startgame conditions
	if (!(gameOn) && !(chooseChar)) {
        // flags that user needs to choose opponent next
        chooseChar = true;
        
        // $(this).css("border-color", "#320B68");

        // removes user from available
        attacker = $(this).detach(); 

        // adds user to fight
        attacker.appendTo("#selected-character");

        //move the enemies left to the enemies available to attack. 
        $("#characters-section").appendTo("#enemies_left");

    } else if (chooseChar) { //user is alive and needs a new opponent
        
        //flags functionality of fight and reset buttons, disables characters
		chooseChar = false;
        
        gameOn = true; 
        $("#alerts").html(""); // clears any alerts, if any
        
        // $(this).css("border-color", "#B9161A");
        // Removes opponent from available
		defender = $(this).detach();
        
        defender.appendTo("#defender");
        
        $("#characters-section").appendTo("#enemies_left"); 
        
        $(".character").css("background-color", "white");
        
        //move the enemies left to the enemies available to attack. 
        $(".character","#enemies_left").css("background-color", "red");
        
console.log(defender);
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
    console.log("defender healt1" + defenderHealth);

    // To get the attacker heatlh value.
    var healthPowerAttacker = attacker.data('healthPower');
    var attackerHealth = parseInt(healthPowerAttacker);
    console.log("attacker healt1" + attackerHealth);
    
    
        // Decrese the defender power.
    defenderHealth-= attackerAttack; 
 
    //change data on defender healthPower
    defender.data("healthPower", defenderHealth); 

   // defender attack power. 
    var defenderAttack = parseInt(defender.data("attackPower"));
    console.log("defender attack: " + defenderAttack);
    attackerHealth -= defenderAttack;
    var damage = defenderAttack * counterdefender;
    console.log("attacker healh" +  attackerHealth);
    //change data on user attack 

    
    // to find the healthPower character 
     $("#defender").find(".character-healthPower").html(defenderHealth);
     $("#selected-character").find(".character-healthPower").html(attackerHealth);
    console.log("attack to defender inicio" + attackerAttack);
    //messsge to the user
    $("#gameMessage").html('');
    $("#gameMessage").append("You did " + attackerAttack + " damage to " + defender.data("name") + ". "); 
    $("#gameMessage").append( defender.data("name") + "damage to you " + damage); 

     // update attack power
      
   
    //change data on attacker healthPower
    attacker.data("healthPower", attackerHealth); 

    console.log("attack to defender final" + attackerAttack);

    if (defenderHealth <= 0){
             $("#gameMessage").html('');
             $("#gameMessage").append("You have defeated " + defender.data("name") + ". Choose a new character");
               
             defender.remove();
             
             chooseChar = true;
             counterdefender = 0;
             
    } else if (chooseChar) {
        $("#gameMessage").text("please select a character");
    
    }

}
 

$("#attack-button").on("click", function() {
    if (chooseChar) {
        $("#gameMessage").text("please select a character");
        
    }
		fight();

})










































$(document).ready(function () {

    var gameOn = false;
    var chooseChar = false;
    var enemiesLeft = false;
    var userDeath = false;
    var computerDeath = false;
    var defender;
    var attacker;
    var winner;
    var userDied = [];
    var turnCounter =1;

var characters = {
   char1: {
        name: 'obi',
        health: 120,
        attackPower: 6,
        counter: 6,
        imageUrl: "assets/images/obi.jpg",
    },
    char2: {
        name: "luke",
        health: 100,
        attackPower: 8,
        counter: 8,
        imageUrl: "assets/images/luke.jpg",
    },
    char3: {
        name: "sidious",
        health: 100,
        attackPower: 8,
        counter: 8,
        imageUrl: "assets/images/sidious.jpg",
    },
    char4: {
        name: "maul",
        health: 100,
        attackPower: 8,
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
    charDiv.data('health', character.health);
    charDiv.data('attackPower', character.attackPower);
    charDiv.data('counter', character.counter);

    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);

    //var charAttackPower = $("<div class='character-attack' data-attackPower='" + character.attackPower + "'>");
    //var charCounter = $("<div class='character-counter' data-counter='" + character.counter + "'>");

    // Append image and name divs
    charDiv.append(charName).append(charImage).append(charHealth);
    charDiv.appendTo('#characters-section');
});

$(".character").on("click", function() {
	//check for startgame conditions
	if (!(gameOn) && !(chooseChar)) {
		chooseChar = true; // flags that user needs to choose opponent next
		// $(this).css("border-color", "#320B68");
		$("#choose").html("Enemy"); //changes choose Jedi prompt
		attacker = $(this).detach(); // removes user from available
        attacker.appendTo("#action"); // adds user to fight
        $("#characters-section").appendTo("#enemies_left");
         //move the enemies left to the enemies available to attack. 
         $(".character").css("background-color", "white");

	} else if (chooseChar) { //user is alive and needs a new opponent
		chooseChar = false;
		gameOn = true; //flags functionality of fight and reset buttons, disables characters
		$("#alerts").html(""); // clears any alerts, if any
		// $(this).css("border-color", "#B9161A");
		defender = $(this).detach(); // removes opponent from available
        defender.appendTo("#defender");
        $("#characters-section").appendTo("#enemies_left");  //move the enemies left to the enemies available to attack. 
        $(".character","#enemies_left").css("background-color", "red");
        
console.log(defender);
    }
});

 function fight (){
     var defenderHealth = defender.data('health');
     console.log(defenderHealth);
     var healthPower = parseInt(defenderHealth); // The health power
     console.log(healthPower);
     var attack = parseInt(attacker.data("attackPower")); // my attact power
     healthPower-= attack; // decrese the defender porwer.
     console.log(attack);
     defender.data("health",healthPower); //change data on defender health
 
     $("#defender").find(".character-health").html(healthPower);
     $("#gameMessage").html("You did " + attack + "damage to " + defender.data("name") + ". "); //messsge to the user
     attack += attack; // update attack power
     attacker.data("attackPower",attack); //change data on user attack


     console.log(healthPower);
    if (healthPower <= 0){
         function userDied(){
             userDied.push(defender.detach());
             $("#gameMessage").text(" And you kill him! ");
             checkForWin();
         }
     }

 };


$("#attack-button").on("click", function() {
	// if (userDeath || !(gameOn)) {
	// 	reset();
	// } else {
		fight();
	//}
})









































});
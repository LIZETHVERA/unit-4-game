// Flag to know if player already choose a character
var chooseAttacker = true;

// Flat to know if player already choose a defender
var chooseDefender = true;

// Flag to know if there are enemies left
var enemiesLeft = true;

// Flag to know if the user is death
var userDeath = false;

// Stores defender div reference
var defender;

// Stores defender attributes
var defenderAttributes;

// Stores attacker div
var attacker;

// Store attacker attributes
var attackerAttributes;

var winner;

// Store characters information
var characters = resetCharacters();

function resetCharacters() {

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

     return characters;
     
}

function resetGame() {

    chooseChar = false;
    enemiesLeft = false;
    userDeath = false;
    computerDeath = false;
    defender = null;
    attacker = null;
    winner = null;
    characters = resetCharacters();

}

// Display each character
$.each(characters, function(index, character) {
    var charDiv = $("<div class='character'>");

    // Set data attributes, creates data-char(x) attribute
    // so you can 'bind' Javascript and UI
    charDiv.data('char', index);

    // Display char name
    var charName = $("<div class='character-name'>").text("Name: " + character.name);
    // Display char image
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    // Display char health
    var charHealth = $("<div class='character-health'>").text("Health:" + character.health);

    // Append image and name divs
    charDiv.append(charName).append(charImage).append(charHealth);
    charDiv.appendTo('#characters-section');
});

$(".character").on("click", function() {

	//check for start game conditions
	if (chooseAttacker) {

        // Flags that user needs to choose opponent next
        chooseAttacker = false; 

        // Removes user from available characters
        attacker = $(this).detach(); 

        // Adds user to fight
        attacker.appendTo("#selected-character");

        // Get the data-char value from the div, this returns a string
        // that later will be used to access the characters' data
        var char = attacker.data('char');
        console.log('Selected char is ' + char);

        // Get attacker attributes
        attackerAttributes = characters[char];
        console.log('Attacker attributes ' + JSON.stringify(attackerAttributes));

        // Move the enemies left to the enemies available to attack. 
        $("#characters-section").appendTo("#enemies_left"); 
	
    } else if (chooseDefender) { //user is alive and needs a new opponent

        // Set the chooseDefender to false because player selected the defender
        chooseDefender = false;

		$("#alerts").html(""); // clears any alerts, if any

        // Removes opponent from available
        defender = $(this).detach(); 

        // Append defender div to the defender div
        defender.appendTo("#defender");

        // Extract the data-char(x) value in order to get the char's attributes
        var char = defender.data('char');
        console.log('Selected defender char is ' + char);

        // Get the defender attributes from the characters object. This is a reference.
        defenderAttributes = characters[char];
        console.log('Defender attributes ' + JSON.stringify(defenderAttributes));

        // Move the enemies left to the enemies available to attack.
        $("#characters-section").appendTo("#enemies_left");

        $(".character","#enemies_left").css("background-color", "red");
    }
});

function fight () {

    // Get attackers power
    var attackerPower = attackerAttributes['attackPower'];

    // Get defender's health
    var defenderHealth = defenderAttributes['health'];

    // Update defender's health
    defenderAttributes['health'] = defenderHealth - attackerPower;

    // Option 2
    // defenderAttributes['health'] -= attackerPower;

    // Option 3
    // defenderAttributes['health'] -= attackerAttributes['attackPower'];

    // Now defender attacks attacker, update attacker's health
    attackerAttributes['health'] -= defenderAttributes['attackPower'];

    // Update view
    // Update attacker's health
    $("#selected-character").find(".character-health").html(attackerAttributes['health']);

    // Update defender's health
    $("#defender").find(".character-health").html(defenderAttributes['health']);

    // Display attack message
    // Clean message area
    $("#gameMessage").html('');

    // Display attacker's damage to defender
    $("#gameMessage").append("You did " + attackerAttributes['attackPower'] + " damage to " + defenderAttributes["name"] + ". ");

    // Display defender's damage to attacker
    $("#gameMessage").append(defenderAttributes["name"] + " damaged you " + defenderAttributes['attackPower']);
    
    // Update attacker's power
    attackerAttributes['attackPower'] += attackerAttributes['attackPower'];
    console.log('Attacker attributes ' + JSON.stringify(attackerAttributes));

    // For debuggin purposes
    console.log('Display characters info');
    console.log('Defender attributes ' + JSON.stringify(characters));

    // If attacker dies then display game over and restart button
    if (attackerAttributes['health'] <= 0) {
        
        // Display game over message
        $("#gameMessage").html("You lost");

        // Display restart button

    }

    if (defenderAttributes['health'] <= 0) {
        
        // Remove defender div
        defender.remove();

        // Display defeat message
        // Clean message area
        $("#gameMessage").html('');
        $("#gameMessage").append("You have defeated " + defenderAttributes["name"] + ". Choose a new character");

        chooseDefender = true;
        //remove #enemies_left
        //append #defenfer

    } 



}

$("#attack-button").on("click", fight);
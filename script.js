function hello()
{
  console.log('helloooooo');
}

let clickTimes = 0;

function ouchAnimation()
{
  let ouch = document.querySelector("#ouch");
  ouch.innerHTML = "OUCH!!!";
  example1 = new Crono(returnNormal, 1000, 1);
}

function returnNormal()
{
  console.log("called");
  let ouch = document.querySelector("#ouch");
  ouch.innerHTML = "Click Me!";
}

function clickCounter()
{
  if(example2.checkDelay() == true)
  {
    clickTimes++;
    let clickButton = document.querySelector("#clickButton");
    clickButton.innerHTML = "Button times pressed every 3 seconds: " + clickTimes;
  }
}

let magicPoints = 10;
let magicButton = document.querySelector("#magicButton");
magicButton.innerHTML = "Magic left you can use per two seconds: " + magicPoints;
function castMagic()
{
  if(magicPoints > 0 && example4.checkDelay() == true)
  {
    magicPoints--;
    
    magicButton.innerHTML = "Magic left you can use per two seconds: " + magicPoints;
  }
  else if(magicPoints <= 0)
  {
    alert("Sorry, you used all the magic :(");
    let magicButton = document.querySelector("#magicButton");
    magicButton.innerHTML = "There is no more magic left :( ";
  }
}

let seconds = 0;
let secondsExtra = 0;
function clockSimulation()
{
  seconds++;
  let clockButton = document.querySelector("#clockButton");
  clockButton.innerHTML = "Seconds you passed on this website page: " + seconds;
}

function clockSimulation2()
{
  secondsExtra++;
  let clockButton2 = document.querySelector("#clockButton2");
  clockButton2.innerHTML = "Seconds you passed on this website page +1: " + secondsExtra;
}

let hitPoints = 100;
let hitPointsMax = 100;
let regenerationPoints = 5;
let swordDamage = 30;
let regenerationDelay = 1000;
let swordDelay = 3000;
let isAlive = true;
let example6_regeneration = new Crono(regenerationSpell, regenerationDelay, 0);
let example6_damage = new Crono(simulateDamage, swordDelay, "swordAttack");
let example6_button = document.querySelector("#swordGame");

function regenerationSpell()
{
  if(hitPoints < hitPointsMax || isAlive == true)
  {
    hitPoints += regenerationPoints;
    if(hitPoints > hitPointsMax)
    {
      hitPoints = hitPointsMax;
    }
  }
  example6_button.innerHTML = "Hit Points Left: " + hitPoints + " / " + hitPointsMax;
}

function simulateDamage()
{
  if(example6_damage.checkDelay() == true && isAlive == true)
  {
    hitPoints -= swordDamage;
    if(hitPoints <= 0)
    {
      hitPoints = 0;
      isAlive = false;
      alert("Game Over! Refresh the page to play again!");
    }
    example6_button.innerHTML = "Hit Points Left: " + hitPoints + " / " + hitPointsMax;
  }
}

function pauseGame()
{
  example6_damage.pause();
  example6_regeneration.pause();
}

let countArray = ["one!", "two!", "three!"];
let countButton = document.querySelector("#countButton");
let countValue = 0;

function counting()
{
  countButton.innerHTML = countArray[countValue];
  countValue++;  
}

function restartCounting()
{
  countValue = 0;
  countButton.innerHTML = "Let's Count!";
  example7.restart();
}

let money = 0;
let moneyButton = document.querySelector("#moneyButton");

function moneyCollected()
{
  money++;
  moneyButton.innerHTML = "Money Collected: " + money;
}

function pauseLoop()
{
  moneyButton.innerHTML = "The loop is paused. Click to resume";
  example8.pause();
}

let example1;
let example2 = new Crono(clickCounter, 3000, "clickCounter");
let example3 = new Crono(clockSimulation, 1000, 0);
let example4 = new Crono(castMagic, 2000, "castMagic");
let example5 = new Crono(clockSimulation2, 1000, 0, true);
let example7 = new Crono(counting, 2000, 3);
let example8 = new Crono(moneyCollected, 500, 0, false, true);

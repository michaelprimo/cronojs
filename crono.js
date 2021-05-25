/*
- CRONO.JS -

Made by: Michael Primo

This Javascript framework allows you to have more control of the delays of the loops on your website, game, application, or animation.

*/

/*The main object with everything.
Callback: the function we put in the loop;
Delay: milliseconds of delay for every iteration of the loop;
Property: this will decide if the loop is finite, infinite or a check for an input;
isFirstLoop: select with true or false if you want to run the function before the loop or not;
isPause: decide if the loop start on pause or immediately.
*/
function Crono(callback, delay, property, isFirstLoop, isPause) 
{
/*Initialize the rest of the variables. "timerId" store the id of setTimeout, 
"start" the date milliseconds,
"remaining" can set the difference between the time before and after pressing pause and also change the delay time.
*/
  let timerId, start, remaining = delay;
  //this will run the callback function once if isFirstLoop is true.
  this.initialSwitch = true;
  //this will decide if the loop will restart or not..
  this.restartSwitch = false;
  //this is used for keep note of the actual loop when will be sended as a finite one.
  let iCounter = 0;

  //This is used for executing the loop or pausing it. False: not paused. True: paused. 
  if(isPause == undefined)
  {
    //isPause is false if this optional parameter.
    isPause = false;
  }

  //Here is the code for pausing the loop.
  this.pause = function() 
  { 
    isPause = !isPause;
    //after unlocked the switch, create the pause for when the property is a loop.
    if(typeof(property) === "number" && isPause == true)
    {
      //delete the loop      
      window.clearTimeout(timerId);
      //set the delay time for when the loop will be resumed.
      remaining -= new Date() - start;
    }
    if(typeof(property) === "number" && isPause == false)
    {
      //call the resume function.
      this.resume();
    }
    //create then the pause for when the property is a input delay (passing a string instead of number).
    else if(typeof(property) === "string" && isPause == true)
    {
      //register the time when the user paused the loop.
      start = new Date();
    }
    else if(typeof(property) === "string" && isPause == false)
    {
      //get the difference in milliseconds between when the pause was pressed and when the loop is resumed.
      remaining = Date.now() - start;
      //let's make sure this[property] is a int (number).
      this[property] = parseInt(this[property]);
      //add the difference to the property value.
      this[property] += remaining;
      //call the checkDelay function.
      checkDelay();
    }
  };

  //This function is useful for executing infinite/finite loops.
  let resume = function() 
  {
    //we execute only one time the callback at the beginning if the isFirstLoop parameter is true and defined when this function is called.
    if(isFirstLoop == true && this.initialSwitch == true)
    {
      //execute the function
      callback();
      //reset the switch to false, so we don't need to call again when we resume the loop.
      this.initialSwitch = false;
    }
      //set the time where the function is called.
      start = new Date();
      //we use setTimeout on timerId for looping the callback and get an id from the loop. 
      timerId = window.setTimeout(function() 
      {
        remaining = delay;
        //if the user call the function with 0 as a property, then the loop will be endless unless the timeout is cleared/paused.
        if(property == 0)
        {
          //we do recursion here
          resume();
          //and call the function of the user.
          callback();
        }
        else
        {
          // this if is called the first time we call the resume() method and when we call the restart() method.
          if(iCounter == undefined || this.restartSwitch == true)
          {
            //reset the counter and the restartSwitch.
            iCounter = 0;
            this.restartSwitch = false;
          }
          //it's like a for, but for executing delayed functions. This is used for finite loops when the property is a positive number > 0.
          if(iCounter < property)
          {
            iCounter++;
            resume();
            callback();
          }
        }
        //we use remaining instead delay, so if we pause the loop we don't reset the delay time.
      }, remaining);
  };

  //this function is used for delay an input.
  let checkDelay = function()
  {
    //for avoiding initialization problems, we call start as a var and set the time.
    var start = new Date();
    var start = start.getTime();
    
    //this code works only if the loop is not paused.
    if(isPause == false)
    {
      //we do the same thing as the resume() method, remember the difference between time paused and time when the loop is resumed
      //for avoiding a delay time reset.
      this.remaining = delay;
      //give a value to the new property if it's undefined.
      if(this[property] == undefined)
      {
        this[property] = 0;
      }
  
      //the user can do the action if start have a value bigger than the called property.
      if(start >= this[property])
      {
        //if yes, the user can do the action he want and we set a new value for the property.
        this[property] = parseInt(start + this.remaining);
        return true;
      }
      else
      {
        //otherwise he need to wait when the time is like or more than the time setted on number of this[property]. 
        return false;
      }
    }
    
  }

  //this is called from the user when he need to restart a finite loop.
  this.restart = function()
  {
    //activate the switch, so we call the restart code inside resume.
    this.restartSwitch = true;
    //reset the counter and call the resume function.
    iCounter = 0;
    this.resume();
  }

  //we need to use these two properties for executing the code in other scripts.
  this.checkDelay = checkDelay;
  this.resume = resume;

  //check only the input delay if property is a string.
  if(typeof(property) === "string" && isPause == false)
  {
    this.checkDelay();
  }
  //resume if the property parameter is a number.
  else if(typeof(property) === "number" && isPause == false)
  {
    this.resume();
  }
  //pause the function.
  else if(isPause == true)
  {
    isPause = !isPause;
    this.pause();
  }
}
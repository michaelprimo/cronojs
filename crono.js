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
  this.restartSwitch = false;
  let iCounter = 0;

  if(isPause == undefined)
  {
    isPause = false;
  }
  this.isPause = isPause;

  this.pause = function() 
  { 
    isPause = !isPause;
    this.isPause = isPause;
    if(typeof(property) === "number" && this.isPause == true)
    {
      window.clearTimeout(timerId);
      remaining -= new Date() - start;
    }
    if(typeof(property) === "number" && this.isPause == false)
    {
      this.resume();
    }

    else if(typeof(property) === "string" && this.isPause == true)
    {
      start = new Date();
      console.log(start);
    }
    else if(typeof(property) === "string" && this.isPause == false)
    {
      remaining = Date.now() - start;
      this[property] = parseInt(this[property]);
      this[property] += remaining;
      checkDelay();
    }
    
  };

  let resume = function() 
  {
      if(isFirstLoop == true && this.initialSwitch == true)
      {
        callback();
        this.initialSwitch = false;
      }
      
        start = new Date();
        timerId = window.setTimeout(function() 
        {
            remaining = delay;
            if(property == 0)
            {
              resume();
              callback();
            }
            else
            {
              if(iCounter == undefined || this.restartSwitch == true)
              {
                iCounter = 0;
                this.restartSwitch = false;
              }
              if(iCounter < property)
              {
                iCounter++;
                resume();
                callback();
              }
            }
        }, remaining);
  };

  let checkDelay = function()
  {
    var start = new Date();
    var start = start.getTime();
    
    if(isPause == false)
    {
      this.remaining = delay;
      if(this[property] == undefined)
      {
        this[property] = 0;
      }
  
      if(start >= this[property])
      {
        this[property] = parseInt(start + this.remaining);
        return true;
      }
      else
      {
        return false;
      }
    }
    
  }

  this.restart = function()
  {
    this.restartSwitch = true;
    iCounter = 0;
    this.resume();
  }

  this.checkDelay = checkDelay;
  this.resume = resume;
  if(typeof(property) === "string" && isPause == false)
  {
    this.checkDelay();
  }
  else if(typeof(property) === "number" && isPause == false)
  {
    this.resume();
  }
  else if(isPause == true)
  {
    isPause = !isPause;
    this.pause();
  }
}
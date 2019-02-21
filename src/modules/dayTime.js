/******************************************************************************
 * dayTime.js
 *
 * With this module a updatable background which reflects the daytime can
 * be created.
 *
 * There are four types of daytime (morning, day, night, afternoon). Each 
 * daytime is one div-Element and has his own background-color. By changing
 * the opacity of each div, the current daytime can be reflect and two 
 * daytimes can be fading into each other. 
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

/* modules */

var CosmosControl = require('./cosmosControl');
var DayTimeTypes = require('./dayTimeTypes');

/**
 *  @param {HTMLElement} domElement - root element
 */
const DayTime = function (options){

  /* new instance */

  const dayTime = {

    /**
     *  Colors for day, night, morning and afternoon.
     * 
     *  @type {object}
     *  @public
     */
    colors: options.colors,

    cosmosControl: undefined,

    /* HTMLElements for each daytime */
    $day       : document.createElement('div'), //  6 - 18
    $night     : document.createElement('div'), // 18 -  6 
    $morning   : document.createElement('div'), //  3 -  9 
    $afternoon : document.createElement('div'), // 15 - 21

    currentSetHour: undefined,

    lastSetHour: -1,

    /**
     *  Initialize daytime instance
     *  @private
     */
    init: () => {
      dayTime.createDom()
    },

    /**
     *  Appends each daytime the root element
     *  @private
     */
    createDom: () => {
      dayTime.appendChild(dayTime.$day       , dayTime.colors.day)
      dayTime.appendChild(dayTime.$night     , dayTime.colors.night)
      dayTime.appendChild(dayTime.$morning   , dayTime.colors.morning)
      dayTime.appendChild(dayTime.$afternoon , dayTime.colors.afternoon)

      if (options.renderCss) {
        var css = ".rm_atmo-day-color{color:"+dayTime.colors.day+"}";
        css    += ".rm_atmo-day-background-color{background-color:"+dayTime.colors.day+"}"; 
        css    += ".rm_atmo-day-border-color{border-color:"+dayTime.colors.day+"}"; 

        css    += ".rm_atmo-night-color{color:"+dayTime.colors.night+"}";
        css    += ".rm_atmo-night-background-color{background-color:"+dayTime.colors.night+"}";
        css    += ".rm_atmo-night-border-color{border-color:"+dayTime.colors.night+"}"; 

        css    += ".rm_atmo-morning-color{color:"+dayTime.colors.morning+"}";
        css    += ".rm_atmo-morning-background-color{background-color:"+dayTime.colors.morning+"}"; 
        css    += ".rm_atmo-morning-border-color{border-color:"+dayTime.colors.morning+"}"; 

        css    += ".rm_atmo-afternoon-color{color:"+dayTime.colors.afternoon+"}";
        css    += ".rm_atmo-afternoon-background-color{background-color:"+dayTime.colors.afternoon+"}"; 
        css    += ".rm_atmo-afternoon-border-color{border-color:"+dayTime.colors.afternoon+"}"; 

        var style = document.createElement("style");
        style.type = 'text/css';
        style.id = "rm_atmo_static_styles";
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);
      }

      if (options.enableCosmosControl) {
        dayTime.addCosmosControl(dayTime.getHours());
      }
    },

    /**
     *  Append element to the root element
     *  
     *  @private
     *  @param {HTMLElement} child - child to add to the DOM
     *  @param {string} color - CSS background-color
     */
    appendChild: (child, color) => {

      child.style.position        = 'absolute'

      child.style.left            = 0
      child.style.right           = 0
      child.style.top             = 0
      child.style.bottom          = 0

      child.style.zIndex          = -1000000
      child.style.opacity         = 0
      child.dataset.color         = color;
      child.style.backgroundColor = color

      options.domElement.appendChild(child)
    },

    setHours: function (hour) {
      if (dayTime.cosmosControl) {
        dayTime.cosmosControl.show_reset();
      }
      dayTime.currentSetHour = Number.isInteger(hour) ? Math.min(23, Math.max(0, Math.floor(hour))) : undefined;
    },

    setToLocalTime: function () {
      if (dayTime.cosmosControl) {
        dayTime.cosmosControl.hide_reset();
      }
      dayTime.currentSetHour = undefined
    },
    
    getHours:         () => typeof dayTime.currentSetHour === 'undefined' ? dayTime.getLocalTimeHour() : dayTime.currentSetHour,
    
    getLocalTimeHour: () => new Date().getHours(),

    getDayTime: function () {
      var hour = dayTime.getHours();
      if      (hour >= 3  && hour <= 9)  return DayTimeTypes.MORNING;
      else if (hour >= 15 && hour <= 21) return DayTimeTypes.AFTERNOON;
      else if (hour >= 6  && hour <= 18) return DayTimeTypes.DAY;
      else                               return DayTimeTypes.NIGHT;
    },

    addCosmosControl: function () {
      dayTime.cosmosControl = CosmosControl(options);
      dayTime.cosmosControl.createDom();
      dayTime.cosmosControl.onUpdateDay(hour => dayTime.currentSetHour = hour);
      dayTime.cosmosControl.onResetClick(() => { dayTime.setToLocalTime(); });
    },



    /**
     *  Entity update method to change daytime status.
     *
     *  @public
     */
    update: () => {
      const hour = dayTime.getHours()
      
      if (dayTime.cosmosControl) {
        dayTime.cosmosControl.updateDay(hour, dayTime.getLocalTimeHour());
      }

      if (dayTime.lastSetHour != hour) {

        dayTime.$day.style.opacity       = (hour >= 6  && hour <= 18) ? 1                                   : 0
        dayTime.$night.style.opacity     = (hour >= 6  && hour <= 18) ? 0                                   : 1
        dayTime.$morning.style.opacity   = (hour >= 3  && hour <= 9 ) ? (-0.1 * Math.pow(hour - 6 , 2)) + 1 : 0 
        dayTime.$afternoon.style.opacity = (hour >= 15 && hour <= 21) ? (-0.1 * Math.pow(hour - 18, 2)) + 1 : 0

        if (options.renderCss) {

          var color;

          if (dayTime.$day.style.opacity > 0) {
            if (dayTime.$morning.style.opacity > 0) {
              color = calculateTransparentColor(
                dayTime.$morning.dataset.color,
                dayTime.$day.dataset.color,
                dayTime.$morning.style.opacity);
            } else {
              color = calculateTransparentColor(
                dayTime.$afternoon.dataset.color,
                dayTime.$day.dataset.color,
                dayTime.$afternoon.style.opacity);
            }
          } else {
            if (dayTime.$morning.style.opacity > 0) {
              color = calculateTransparentColor(
                dayTime.$morning.dataset.color,
                dayTime.$night.dataset.color,
                dayTime.$morning.style.opacity);
            } else {
              color = calculateTransparentColor(
                dayTime.$afternoon.dataset.color,
                dayTime.$night.dataset.color,
                dayTime.$afternoon.style.opacity);
            }
          }
          
          dayTime.updateDynamicStyles(color);
        }
        dayTime.lastSetHour = hour;
      }
    },

    updateDynamicStyles: function (color) {

      var oldStyles = document.getElementById("rm_atmo_dynamic_styles");
      if (oldStyles) {
        oldStyles.remove();
      }

      var css = ".rm_atmo-daytime-color{color:"+color+"}";
      css    += ".rm_atmo-daytime-background-color{background-color:"+color+"}"; 
      css    += ".rm_atmo-daytime-border-color{border-color:"+color+"}";

      var style = document.createElement("style");
      style.type = 'text/css';
      style.id = "rm_atmo_dynamic_styles";
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    },

    hideCosmosControl: () => {
      if (dayTime.cosmosControl) {
        dayTime.cosmosControl.hide()
      } 
    },

    showCosmosControl: () => {
      if (dayTime.cosmosControl) {
        dayTime.cosmosControl.show()
      } 
    }
  }

  dayTime.init()

  return dayTime

  function calculateTransparentColor(
    foregroundColor, 
    backgroundColor, 
    opacity
  ) {
      if (opacity < 0.0 || opacity > 1.0) {
          alert("assertion, opacity should be between 0 and 1");
      }
  
      opacity = opacity * 1.0; // to make it float
      var foregroundRGB = colorHexToRGB(foregroundColor);
      var backgroundRGB = colorHexToRGB(backgroundColor);
      var finalRed   = Math.round(backgroundRGB.r * (1-opacity) + foregroundRGB.r * opacity);
      var finalGreen = Math.round(backgroundRGB.g * (1-opacity) + foregroundRGB.g * opacity);
      var finalBlue  = Math.round(backgroundRGB.b * (1-opacity) + foregroundRGB.b * opacity);
      return colorRGBToHex(finalRed, finalGreen, finalBlue);
  }
  
  function colorHexToRGB (htmlColor) {
      var COLOR_REGEX = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;
      var arrRGB = htmlColor.match(COLOR_REGEX);
      if (arrRGB == null) {
          alert("Invalid color passed, the color should be in the html format. Example: #ff0033");
      }
      var red   = parseInt(arrRGB[1], 16);
      var green = parseInt(arrRGB[2], 16);
      var blue  = parseInt(arrRGB[3], 16);
      return {"r":red, "g":green, "b":blue};
  }

  function colorRGBToHex(red, green, blue) {
      if (red < 0 || red > 255 || green < 0 || green > 255 || blue < 0 || blue > 255) {
          alert("Invalid color value passed. Should be between 0 and 255.");
      }

      var hexRed   = formatHex(red.toString(16));
      var hexGreen = formatHex(green.toString(16));
      var hexBlue  = formatHex(blue.toString(16));

      return "#" + hexRed + hexGreen + hexBlue;
  }

  function formatHex(value) {
      value = value + "";
      if (value.length == 1) {
          return "0" + value;
      }
      return value;
  }
}

module.exports =  DayTime

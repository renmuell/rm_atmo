/******************************************************************************
 * cosmosControl.js
 *
 * @author Rene Müller <rene.mueller.code@gmail.com>
 *****************************************************************************/

require('./../css/cosmosControl.css');

/**
 *  
 */
const CosmosControl = function (options){

    /* new instance */
  
    const cosmosControl = {
  
        sunSvg: require('./../svgs/sun.svg'),
        moonSvg: require('./../svgs/moon.svg'),
        cloudSvg: require('./../svgs/cloud.svg'),
        
        isTouching: false,
        touch_last_pos:{
            x:undefined,
            y:undefined
        },
        current_rotation: 0,
        
        max_speed: 5,
        rotation_speed: 0,
        
        onUpdateDayCallbacks: [],

        createDom: (hours) => {

            cosmosControl.$cosmosControl = document.createElement("div");
            cosmosControl.$cosmosControl.classList = "cosmosControl";

            cosmosControl.windowResizeEventHandler();

            options.domElement.appendChild(cosmosControl.$cosmosControl);

            cosmosControl.$sun_wrapper = document.createElement("div");
            cosmosControl.$sun_wrapper.id = "sun-wrapper";
            cosmosControl.$sun_wrapper.innerHTML = cosmosControl.sunSvg;
            cosmosControl.$cosmosControl.appendChild(cosmosControl.$sun_wrapper);

            cosmosControl.$moon_wrapper = document.createElement("div");
            cosmosControl.$moon_wrapper.id = "moon-wrapper";
            cosmosControl.$moon_wrapper.innerHTML = cosmosControl.moonSvg;
            cosmosControl.$cosmosControl.appendChild(cosmosControl.$moon_wrapper);

            cosmosControl.updateDay(hours);
        
            cosmosControl.addEventListeners();
        },

        addEventListeners: function () {
            cosmosControl.$sun_wrapper.addEventListener("mousedown", cosmosControl.mousedownEventHandler);
            cosmosControl.$moon_wrapper.addEventListener("mousedown", cosmosControl.mousedownEventHandler);
            window.addEventListener("mousemove", cosmosControl.mousemoveEventHandler);
            window.addEventListener("mouseup"  , cosmosControl.mouseupEventHandler);

            cosmosControl.$sun_wrapper.addEventListener('touchstart', cosmosControl.touchstartEventHandler)
            cosmosControl.$moon_wrapper.addEventListener('touchstart', cosmosControl.touchstartEventHandler)
            window.document.addEventListener('touchmove', cosmosControl.touchmoveEventHandler)
            window.document.addEventListener('touchend', cosmosControl.touchendEventHandler)
            window.document.addEventListener('touchcancel', cosmosControl.touchendEventHandler)
            window.addEventListener("resize", cosmosControl.windowResizeEventHandler);
        },

        windowResizeEventHandler: function () {
            var boundingClientRect = options.domElement.getBoundingClientRect();
            cosmosControl.$cosmosControl.style.width = (Math.min(boundingClientRect.height, boundingClientRect.width)*0.9) + "px";
            cosmosControl.$cosmosControl.style.height = cosmosControl.$cosmosControl.style.width;
        },

        /* Mouse Interaction */

        mousedownEventHandler: function (event) {
            if (event.which == 1 && !cosmosControl.isTouching) {
                event.preventDefault();
                cosmosControl.touchStart(event.clientX, event.clientY);
            }
        },
        mousemoveEventHandler: function (event) {
            if (event.which == 1 && cosmosControl.isTouching) {
                event.preventDefault();
                cosmosControl.touchMove(event.clientX, event.clientY);
            }
        },
        mouseupEventHandler: function (event) {
            if (event.which == 1 && cosmosControl.isTouching) {
                event.preventDefault();
                cosmosControl.touchEnd(event.clientX, event.clientY)
            }
        },

        /* Touch Interaction */

        touchstartEventHandler: function (event) {
            if (!cosmosControl.isTouching) {
                event.preventDefault();
                cosmosControl.touchStart(event.touches[0].clientX, event.touches[0].clientY);
            }
        },
        touchmoveEventHandler: function (event) {
            if (cosmosControl.isTouching) {
                event.preventDefault()
                cosmosControl.touchMove(event.touches[0].clientX, event.touches[0].clientY);
            }
        },
        touchendEventHandler: function (event) {
            if (cosmosControl.isTouching) {
                event.preventDefault();
                cosmosControl.touchEnd(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            }
        },

        /* General Interaction */

        touchStart: function (clientX, clientY) {
            var boundingClientRect = options.domElement.getBoundingClientRect();
            clientX -= boundingClientRect.x;
            clientY -= boundingClientRect.y;

            cosmosControl.isTouching = true;
            cosmosControl.setActive();
            
            cosmosControl.touch_last_pos.x = clientX;
            cosmosControl.touch_last_pos.y = clientY;
            cosmosControl.start_current_rotation = cosmosControl.current_rotation;
            
            cosmosControl.rotation_speed = 0;
        },
        touchMove: function (clientX, clientY) {
            var boundingClientRect = options.domElement.getBoundingClientRect();
            clientX -= boundingClientRect.x;
            clientY -= boundingClientRect.y;

            var alt_rotation = cosmosControl.current_rotation;
            
            cosmosControl.calculateCurrentRotation(clientX, clientY);
            
            /* Rotation Speed */

            cosmosControl.rotation_speed = cosmosControl.current_rotation - alt_rotation;
            if (Math.abs(cosmosControl.rotation_speed) > cosmosControl.max_speed) {
                cosmosControl.rotation_speed = (cosmosControl.rotation_speed > 0 ? 1 : -1) * cosmosControl.max_speed;
            }

            /* Emit */

            cosmosControl.emitUpdateDay();
        },
        touchEnd: function (clientX, clientY) {
            var boundingClientRect = options.domElement.getBoundingClientRect();
            clientX -= boundingClientRect.x;
            clientY -= boundingClientRect.y;

            cosmosControl.calculateCurrentRotation(clientX, clientY);

            /* Emit */

            cosmosControl.emitUpdateDay();

            cosmosControl.isTouching = false;
            cosmosControl.clearActive();
        },

        setActive: function () {
            cosmosControl.$sun_wrapper.firstElementChild.classList.add('active')
            cosmosControl.$moon_wrapper.firstElementChild.classList.add('active')
            cosmosControl.$cosmosControl.classList.add('active')
        },
        clearActive: function () {
            cosmosControl.$sun_wrapper.firstElementChild.classList.remove('active')
            cosmosControl.$moon_wrapper.firstElementChild.classList.remove('active')
            cosmosControl.$cosmosControl.classList.remove('active')
        },

        calculateCurrentRotation: function (clientX, clientY) {
            var cosmosControlTopLeftX = cosmosControl.$cosmosControl.offsetLeft - (cosmosControl.$cosmosControl.offsetWidth * 0.5)
            var cosmosControlTopLeftY = cosmosControl.$cosmosControl.offsetTop  + (cosmosControl.$cosmosControl.offsetWidth * 0.5)

            var middleX = cosmosControlTopLeftX + (cosmosControl.$cosmosControl.offsetWidth  / 2);
            var middleY = cosmosControlTopLeftY + (cosmosControl.$cosmosControl.offsetHeight / 2);

            var dAx = middleX - cosmosControl.touch_last_pos.x;
            var dAy = middleY - cosmosControl.touch_last_pos.y;
            var dBx = middleX - clientX;
            var dBy = middleY - clientY;
            var angle = Math.atan2(dAx * dBy - dAy * dBx, dAx * dBx + dAy * dBy);
            var degree_angle = angle * (180 / Math.PI);

            cosmosControl.current_rotation = cosmosControl.start_current_rotation + degree_angle;
            cosmosControl.current_rotation = cosmosControl.current_rotation % 360;

            if (cosmosControl.current_rotation < 0 ) {
                cosmosControl.current_rotation += 360;
            }
        },

        /* Update Handler */

        updateDay: function(hour){
           
            if (!cosmosControl.isTouching) {

                if (cosmosControl.rotation_speed != 0) {

                    cosmosControl.current_rotation = (cosmosControl.current_rotation + cosmosControl.rotation_speed) % 360;
    
                    if (cosmosControl.current_rotation < 0 ) {
                        cosmosControl.current_rotation += 360;
                    }
    
                    cosmosControl.emitUpdateDay();

                    if (cosmosControl.rotation_speed > 0) {
                        cosmosControl.rotation_speed -= 0.01;
                    } else {
                        cosmosControl.rotation_speed += 0.01;
                    }
    
                    if (Math.abs(cosmosControl.rotation_speed) < 0.1) {
                        cosmosControl.rotation_speed = 0;
                    }
    
                } else {
                    cosmosControl.current_rotation = cosmosControl.convertHourToAngle(hour);
                }
            }

            cosmosControl.updateAngle();
        },
        updateAngle: function () {
            cosmosControl.$cosmosControl.style.transform = "translate(-50%,50%) rotateZ(" + cosmosControl.current_rotation + "deg)"; 

            if (cosmosControl.current_rotation < 180) {
                cosmosControl.$sun_wrapper.style.transform = "translate(-50%,-50%) rotateZ(" + -cosmosControl.current_rotation + "deg) scaleX(-1)"; 
            } else {
                cosmosControl.$sun_wrapper.style.transform = "translate(-50%,-50%) rotateZ(" + -cosmosControl.current_rotation + "deg)"; 
            }
            if (cosmosControl.current_rotation < 180) {
                cosmosControl.$moon_wrapper.style.transform = "translate(-50%,-50%) rotateZ(" + -cosmosControl.current_rotation + "deg) scaleX(-1)"; 
            } else {
                cosmosControl.$moon_wrapper.style.transform = "translate(-50%,-50%) rotateZ(" + -cosmosControl.current_rotation + "deg)"; 
            }
        },

        convertAngleToHour: function (angle) {
            if (angle > 180) {
                angle -= 360;
            }

            return (angle / (360 / 24)) + 12;
        },
        convertHourToAngle: function (hour) {
            var angle = (hour / 24) * 360;
            return (angle + 180) % 360;
        },

        /* Events */

        onUpdateDay: function(callback){
            cosmosControl.onUpdateDayCallbacks.push(callback)
        },
        emitUpdateDay:function(){
            var hour = cosmosControl.convertAngleToHour(cosmosControl.current_rotation);
            cosmosControl.onUpdateDayCallbacks.forEach(callback => callback(hour));
        }
    }

    return cosmosControl
}
  
module.exports =  CosmosControl
  
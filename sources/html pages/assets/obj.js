import { canvas, ctx } from "./canvas.js";
import { Second } from "./deltatime.js";
export class Obj {
    static objects = [];
    x = 0;
    y = 0;
    timer = 0;
    color = "white";
    constructor(x, y, timer, color) {
        this.x = x;
        this.y = y;
        this.timer = timer * Second;
        this.color = color;
        Obj.objects.push(this);
    }
    update() {
        console.log(this.timer);
            this.timer -= 17;
            this.moveRandom();
    }
    moveRandom() {
        let posx = (Math.random() - 0.5) * 1.5;
        let posy = (Math.random() - 0.5) * 1.5;

        if (this.x + posx < 0 || this.x + posx > canvas.width) {
            posx = -posx;
        }
        if (this.y + posy < 0 || this.y + posy > canvas.height) {
            posy = -posy;
        }

        this.x += posx;
        this.y += posy;
    }
    destroy() {
        // Remove the object from the objects array
        let index = Obj.objects.indexOf(this);
        if (index !== -1) {
            Obj.objects.splice(index, 1);
        }
    }
}

export function ObjectSize(){
    return Obj.objects.length;
}
export function ObjectAtIndex(index){
    if(index < 0 || index >= Obj.objects.length - 1){
        return null;
    }
    return Obj.objects[index];
}

export const colors = ["brown", "white"];
let priorityColor = colors[0];
export const lifeSpanInput = document.getElementById("lifeSpanInput").value;
let timer = lifeSpanInput * Second;
export function getTime(){
    return timer;
}
export function setTime(newTime){
    timer = newTime * Second;
}
export function getPriorityColor(){
    return priorityColor;
}

// Helper functions 
export function drawAll() {
    for (let i = ObjectSize() - 1; i >= 0; i--) {
        if(ObjectAtIndex(i) == null || ObjectAtIndex(i).timer <= 0){
            continue;
        }
        ObjectAtIndex(i).update();
        ctx.fillStyle = ObjectAtIndex(i).color;
        ctx.beginPath();
        ctx.arc(ObjectAtIndex(i).x, ObjectAtIndex(i).y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}
export let randomTime = (colorType) => {
    let randomTimerVal;
    if(priorityColor == colorType){
        randomTimerVal = Math.floor((Math.random() - .2) * timer + timer);
    }else{
        randomTimerVal = Math.floor((Math.random() - .5) * timer + timer);
    }
    return randomTimerVal;
}

export function countType(colorType){
    let colorCount = {
        brown: 0,
        white: 0
    }
    for(let i = 0; i < ObjectSize(); i++){
        if(ObjectAtIndex(i) && ObjectAtIndex(i).color == colorType){
            colorCount[colorType]++;
        }
    }
    return colorCount[colorType];
}

export function ColorAddObjects(colorType){
    let count = countType(colorType);
    for(let i = 0; i < Math.floor(count / 2); i++){
        let rTime = randomTime(colorType);
        new Obj(Math.random() * canvas.width, Math.random() * canvas.height, rTime, colorType);
    }
}

export function changePriorityColor() {
    let label = document.querySelector("label[for='changeColorBtn']");
    if(priorityColor == colors[0]){
        priorityColor = colors[1];
        label.textContent = "Current Color: White";
    }else{
        priorityColor = colors[0];
        label.textContent = "Current Color: Brown";
    }
}
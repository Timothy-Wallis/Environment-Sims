import { canvas, ctx } from "./assets/canvas.js";
import { DeltaTime, Second } from "./assets/deltatime.js";
import { Obj, drawAll, randomTime, countType, ColorAddObjects, changePriorityColor, colors, lifeSpanInput, getTime, setTime, ObjectSize, ObjectAtIndex } from "./assets/obj.js";

let animationController = null;
let animationEnable = false;
let prgmRun = false;
let iterationCount = 1;
let timeline = [];
let ΔTime = new DeltaTime();
let globalTimer = lifeSpanInput;
let lastFrameTime = null;
let fpsDisplay = 0;
let frameMs = 0;

//main loop
function main(timestamp){
    animationController = requestAnimationFrame(main);

    // Compute delta time and smooth FPS
    if(lastFrameTime === null) lastFrameTime = timestamp;
    const deltaMs = timestamp - lastFrameTime;
    frameMs = deltaMs;
    const instantFps = deltaMs > 0 ? 1000 / deltaMs : 0;
    const smoothing = 0.1;
    fpsDisplay = fpsDisplay ? (fpsDisplay * (1 - smoothing) + instantFps * smoothing) : instantFps;
    lastFrameTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAll();
    ctx.fillStyle = "skyblue";
    ctx.font = "24px Arial";
    ctx.textAlign = "left";
    ctx.fillText(`Current Year: ${iterationCount} | White: ${countType("white")} | Brown: ${countType("brown")}`, 20, 40);

    // Draw FPS/debug in top-right
    const fpsText = `FPS: ${fpsDisplay.toFixed(1)} | Δ: ${frameMs.toFixed(1)}ms`;
    ctx.font = "16px Arial";
    ctx.textAlign = "right";
    const padding = 8;
    const textWidth = ctx.measureText(fpsText).width;
    const boxWidth = textWidth + padding * 2;
    const boxHeight = 22 + padding;
    const boxX = canvas.width - boxWidth - 10;
    const boxY = 10;
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
    ctx.fillStyle = "white";
    ctx.fillText(fpsText, canvas.width - 10 - padding, boxY + 20);
    ctx.textAlign = "left";

    if(globalTimer <= 0){
        globalTimer = lifeSpanInput;
        iterationCount++;
        timeline.push({year: iterationCount, brown: countType("brown"), white: countType("white")});
        ColorAddObjects(colors[0]);
        ColorAddObjects(colors[1]);
    }
}


//Start the simulation
function startSim() {
    if(!prgmRun){
        prgmRun = true;
        updateRenderArray();
    }
    if(!animationEnable){
        animationEnable = true;
        // A fancier timeout function 
        ΔTime.onTick(() => {
            globalTimer--;
            for(let i = ObjectSize() - 1; i >= 0; i--){
                let currentObj = ObjectAtIndex(i);
                if(currentObj.timer > 0){
                    currentObj.timer--;
                }else{
                    currentObj.destroy();
                }
            }
        }, globalTimer * Second);
        main();
        return;
    }
}

function updateRenderArray(){
    //Updates render array based on the amount to be generated
    let amount = document.getElementById("amountInput").value;
    if(Obj.objects.length > 0){
        Obj.objects = [];
    }
    for(let i = 0; i < amount; i++ ){
        let tempCount = amount/2;
        let tempColor = colors[0];
        let rTime;
        if(i < tempCount){
            tempColor = colors[0];
        }else{
            tempColor = colors[1];
        }
        rTime = randomTime(tempColor);
       new Obj(Math.random() * canvas.width, Math.random() * canvas.height, rTime, tempColor);
    }
}

//Pause the simulation
function pauseSim() {
    cancelAnimationFrame(animationController);
    animationEnable = false;
    ΔTime.destroy();
    lastFrameTime = null;
    fpsDisplay = 0;
    frameMs = 0;
}

function resetSim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    Obj.objects = [];
    pauseSim();
    prgmRun = false;
    iterationCount = 0;
}

document.getElementById("startBtn").addEventListener("click", startSim);
document.getElementById("pauseBtn").addEventListener("click", pauseSim);
document.getElementById("changeColorBtn").addEventListener("click", changePriorityColor);
document.getElementById("resetBtn").addEventListener("click", resetSim);

//Correct current input values
function checkNumberInput(inputElement, min, max){
    let currVal = parseInt(inputElement.value);
    if(currVal < min){
        inputElement.value = min;
    }else if(currVal > max){
        inputElement.value = max;
    }
}

document.getElementById("amountInput").addEventListener("change", () => checkNumberInput(document.getElementById("amountInput"), 4, 50));
document.getElementById("lifeSpanInput").addEventListener("change", () => checkNumberInput(document.getElementById("lifeSpanInput"), 1, 20));
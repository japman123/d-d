function preload() {
classifier = ml5.imageClassifier("doodleNet")
}

function setup() {
canvas = createCanvas(400,400);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
} 

function draw() {
strokeWeight(4);
stroke("blue");   
if(mouseIsPressed){
     line(pmouseX, pmouseY, mouseX, mouseY)
}
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if(error){console.error(error)}
    else{
        console.log(results)
        document.getElementById("label").innerHTML = "label: "+results[0].label;
        document.getElementById("confidence").innerHTML = "confidence: "+Math.round(results[0].confidence * 100)+"%";
        utterthis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterthis)
    }
}

function clearCanvas() {
    background("white");
} 
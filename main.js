objects = [];
video = "";
status = "";

function preload(){
}

function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function modelLoaded(){
    console.log("Model is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function setup(){
    canvas = createCanvas(540,420);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }

    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video,0,0,540,420);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("no_of_objects").innerHTML = "Number of Objects Detected: " + objects.length;
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" ,objects[i].x + 15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
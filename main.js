status_1 = "";
song = "";
objects = [];

function preload(){
   song = loadSound("old_telephone.mp3");
}

function setup(){
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380 , 380);
    video.hide();
    object_detect = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status_1 = true;
    
}

function gotResult(error , results){
    
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video , 0 , 0 , 380 , 380);
    if(status_1 != ""){
        object_detect.detect(video , gotResult);
        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected : " + objects.length;
            percent = floor(objects[i].confidence * 100);
            fill(r,g,b);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);

            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML = "Baby Detected";
                song.stop();
            }
            else{
                document.getElementById("status").innerHTML = "Baby not Detected";
                song.play(); 
            }
        }

        if(objects[i].length == 0){
            document.getElementById("status").innerHTML = "Baby not Detected";
            song.play();
        }
    }
}
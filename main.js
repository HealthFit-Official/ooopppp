status = "";
objects =[];
input_text = "";



function preload(){
    audio = loadSound("001.mp3");
   }
   


function setup(){
    canvas= createCanvas(300, 290);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300,290);
    video.hide();
    
   
}


function start(){
       
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status : Dectecting";
    input_text = document.getElementById("input_id").ariaValueMax;
    
}


function modelLoaded(){
    console.log("Model Loaded!")
    status = true;
}

function draw() {
    image(video, 0, 0,300,290);

    if(status !="")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i< objects.length; i++)
        {
          document.getElementById('status').innerHTML = 'Status : Object Detected';document.getElementById("number_of_objects").innerHTML = "Baby found"+ objects.length;
          console.log(objects.length);
          fill("#ff0000");
          percent = floor(objects[i].confidence*100);
          text(objects[i].label+"" + percent + "%" ,objects[i].x + 15,objects[i].y + 15);
          noFill();
          stroke("#ff0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

          if(objects[i].label == input_text) {
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("object_found").innerHTML == input_text+"  Found";
            var synth = window.speechSynthesis;
            var utteerThis = new SpeechSynthesisUtterance(input_text + "found");
            synth.speak(utterThis);
          }
          else {
            document.getElementById("object_found").innerHTML == input_text+"  not Found";  
          }
          
           

        }
    }
   
    
}

function gotResult(error,results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
    objects = results; 
    }
   
}
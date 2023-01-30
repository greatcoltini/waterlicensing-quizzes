// Initialization of global variables
const questionsArr = [
    ["What units are used to measure water pressure?", "Kilopascals", "Kilowatts", "Horsepower", "Head units"],
    ["Which of the following is NOT an example of PPE (Personal Protective Equipment)?"," Exhaust fan", "SCBA", "Face shield", "Traffic vest"],
    ["Which of the following are operators-in-training NOT allowed to do?", "Be the operator with overall operational responsibility of the system", "There are no restrictions on the duties of an operator-in-training", "Any operational duties if not in the presence of another operator", "Anything which could effect the quality of the water/wastewater"],
    ["Define the term 'head' as used in hydraulic systems.", "The height or energy of water above a specified point", "The block of an internal combustions engine", "The ability of a piston pump to overcome the force of gravity", "The distance between the liquid level and the cover of a well"],
    ["Which of the following statements accurately describes some of the properties of chlorine?", "Is a greenish/yellow gas with a penetrating odour; is heavier than air", "Is a colourless gas which is toxic to plants and animals; is flammable and explosive", "Is a yellowish gas with an irritating odour; insoluble in water", "Is lighter than air; soluble in water and forms a salt which is lethal to microorganisms"],
    ["What happens when two or more different elements combine?", "chemical compound is formed", "atom is created", "molecule is formed", "concentration is created"]
]

// Create function to generate a template for a MC button selection

const targetNode = document.getElementById('mc_container');

var score = 0;
var total;

function generate_mc() {
    total = questionsArr.length;
    for (let i = 0; i < total; i++){
         multipleChoiceTemplate(i);
    }
}

// generate multiple choice section
function multipleChoiceTemplate(counter) {

    let container_buttons = [];

    let q_con = document.createElement("container");
    let q_sec = document.createElement("section");
    let q_header = document.createElement("h2");
    let q_hr = document.createElement('hr');
    q_header.innerHTML = "QUESTION " + (counter + 1);
    q_header.classList.add('text-center');
    let q_h3 = document.createElement("h3");
    q_h3.innerHTML = questionsArr[counter][0];
    q_h3.classList.add("q" + counter);
    let q_h4 = document.createElement("h4");

    targetNode.append(q_con);
    q_con.append(q_sec);
    q_con.classList.add("container");
    q_sec.append(q_header);
    q_sec.classList.add("section");
    q_header.classList.add("h2");
    q_sec.append(q_hr);
    q_sec.append(q_h3);
    q_sec.append(q_h4);

    // insert questions into the container
    for (let i = 0; i < questionsArr.length - 2; i++)
    {
        let opt = document.createElement("button");
        opt.classList.add("button");
        opt.classList.add("btngrp" + counter);
        opt.innerHTML = questionsArr[counter][i + 1];
        opt.setAttribute('name', questionsArr[counter][i + 1]);

        //  add conditional for success
        if (i == 0)
        {
            opt.onclick = function() {buttonLogic(opt, counter, true)}
        }
        else {
            opt.onclick = function() {buttonLogic(opt, counter, false)};
        }
  
        container_buttons.push(opt);
    }

    shuffle(container_buttons);

    for (const button of container_buttons){
        q_sec.append(button);
    }
}



// Function returns a random integer between min and max inclusive
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function shuffles array; for randomizing question boxes
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

// Logic for MC buttons generic
function buttonLogic(target, id, success) {

    var buttons = document.getElementsByClassName("btngrp" + id);

    target.style.background = "red";

    if (success)
    {
        target.style.background = "green";
        score = score + 1;
    }

    for (let i = 0; i <= buttons.length; i++){
        buttons[i].disabled = true;
        results();
    }

};



// results function .. appears on all disabled
function results() {
    var all_disabled = true;
    var list = []
    $('[class]').each(function() {
      this.classList.forEach(function(className) {
        if (!className.indexOf('btngrp') && !list.includes(className)) {
          list.push(className)
        }
      })
    })

    for (const item of list){
        var elements = document.getElementsByClassName(item);

        for (const element of elements) {
            if (element.disabled != true)
            {
                all_disabled = false;
            }
        }
    }

    if (all_disabled == true){
        document.getElementById("answer_cont").hidden = false;
        document.getElementById("answers").innerHTML = score + "/10";
        document.getElementById("answers").hidden = false;
        document.getElementById("refresh").hidden = false;
    }
}

// cleans window
function clean_window(){
    parent = document.getElementById("mc_container");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    all_disabled = false;
    score = 0;
    document.getElementById("answer_cont").hidden = true;
    document.getElementById("answers").innerHTML = score + "/10";
    document.getElementById("answers").hidden = true;
    document.getElementById("refresh").hidden = true;
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// refreshes the mc .
function refreshButtons(){
    clean_window();
    generate_mc();
}


window.addEventListener('load', (event) => {
  generate_mc();
});
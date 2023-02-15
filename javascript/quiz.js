// Create function to generate a template for a MC button selection
const TARGET_NODE = document.getElementById('mc_container');

// const for dropdowns
const DROPDOWN_MENUS = ["treatment-dropdown", "distribution-dropdown", "collection-dropdown", "wastewater-dropdown"];

// const outlining number of buttons to present
const QUESTION_OPTIONS = 4;

// variables instantiation
let score = 0;
let questionCounter = 0;
let question_type = [questions_OIT, questions_WTI, questions_WTII];
let active_question_type = 0;
let total;
let buttonContainersContainers = [];
let question_quantity = 10;
let questions_done = 0;


// generates the multiple choice optipons; based on the number of questions
function generate_mc(questions_type, question_num) {

    total = questions_type.length;

    for (let i = 0; i < total; i++){
         multipleChoiceTemplate(i, questions_type);
    }

    add_to_main(question_num);
}


// add event listener; for reading files in
function add_read_event(element)
{
    element.addEventListener('change', (event) =>
    {
        alert('here');
        const file = event.target.files[0];
        const reader = new FileReader();
    
        reader.onload = (event) => {
            const file = event.target.result;
            const allLines = file.split(/\r\n|\n/);
            //  read line by line
            allLines.forEach((line) => {
                questions_OIT.push(line);
            })
        }
    
        reader.onerror = (event) => {
            alert(event.target.error.name);
        }
    
        reader.readAsText(file);  
    })
}


// generate multiple choice section
function multipleChoiceTemplate(counter, questions_type) {

    questionCounter = questionCounter + 1;

    let container_buttons = [];

    let q_sec = document.createElement("section");
    let q_header = document.createElement("h2");
    let q_hr = document.createElement('hr');
    // q_header.innerHTML = "QUESTION " + (questionCounter);
    q_header.classList.add('text-center');
    let q_h3 = document.createElement("h3");
    q_h3.innerHTML = questions_type[counter][0];
    q_h3.classList.add("q" + counter);
    let q_h4 = document.createElement("h4");

    q_sec.append(q_header);
    q_sec.classList.add("section");
    q_header.classList.add("h2");
    q_sec.append(q_hr);
    q_sec.append(q_h3);
    q_sec.append(q_h4);

    // insert questions into the container
    for (let i = 0; i < QUESTION_OPTIONS; i++)
    {
        let opt = document.createElement("button");
        opt.classList.add("button");
        opt.classList.add("btngrp" + counter);
        opt.innerHTML = questions_type[counter][i + 1];
        
        if (questions_type[counter][i + 1] == "undefined")
        {
            opt.style.display = 'none';
        }

        opt.setAttribute('name', questions_type[counter][i + 1]);

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

    // shuffles the array of buttons 
    shuffle(container_buttons);

    // appends the buttons to the container
    for (const button of container_buttons){
        q_sec.append(button);
    }

    // adjust q_sec to be put into a class list; then add all q_secs to main container
    buttonContainersContainers.push(q_sec);
}


// add to main container
function add_to_main(question_num)
{
    // shuffle the button containers
    shuffle(buttonContainersContainers);

    // do once for each button container
    for (let i = 0; i < question_num; i++)
    {
        // make container for this buttons section
        let question_container = document.createElement("container");
        TARGET_NODE.append(question_container);
        question_container.classList.add("container");
        question_container.append(buttonContainersContainers[i]);
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

    // get variables
    let buttons = document.getElementsByClassName("btngrp" + id);

    let button_og = buttons[0];

    let parent = button_og.parentElement;

    // fade parents
    parent.style.opacity = "0.5";
    parent.style.backgroundColor = "lightgrey";


    pbar_update();

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

// logic for updating progress bar
function pbar_update(){
    questions_done += 1;
    pbar = document.getElementById("pbar");
    bar_percent = questions_done / question_quantity * 100;

    pbar.innerHTML = questions_done + "/" + question_quantity;

    if (bar_percent == 100)
    {
        pbar.innerHTML = "All Questions Complete. See Bottom For Results";
        pbar.addEventListener("click", function(event) {
            window.scrollTo(document.getElementById("answers"));
        })
    }

    pbar.style.width = bar_percent + "%";
}


// results function .. appears on all disabled
function results() {
    let all_disabled = true;
    let list = []
    $('[class]').each(function() {
      this.classList.forEach(function(className) {
        if (!className.indexOf('btngrp') && !list.includes(className)) {
          list.push(className)
        }
      })
    })

    for (const item of list){
        let elements = document.getElementsByClassName(item);

        for (const element of elements) {
            if (element.disabled != true)
            {
                all_disabled = false;
            }
        }
    }

    if (all_disabled == true){
        document.getElementById("answer_cont").hidden = false;
        document.getElementById("answers").innerHTML = score + "/" + question_quantity;
        document.getElementById("answers").hidden = false;
        document.getElementById("refresh").hidden = false;
    }

}

// cleans window
function clean_window(){

    // reset vars && progress bar
    questions_done = -1;
    questionCounter = 0;
    pbar_update();
    buttonContainersContainers = [];

    parent = document.getElementById("mc_container");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
    all_disabled = false;
    score = 0;
    document.getElementById("answer_cont").hidden = true;
    document.getElementById("answers").innerHTML = score + "/" + question_quantity;
    document.getElementById("answers").hidden = true;
    document.getElementById("refresh").hidden = true;
    window.scrollTo({top: 0, behavior: 'smooth'});

}


// refreshes the mc .
function refreshButtons(){
    clean_window();
    generate_mc(question_type[active_question_type], question_quantity);
}


// generate quiz at specific quantity; adjusting buttons accordingly
function generate_quiz(element){

     // generate number of questions based on selected option
     for (let child=document.getElementById("quiz_quantity").firstChild; child!==null; child=child.nextSibling){
        child.disabled = false;

        // properly select button for opacity adjustment
        if (child.nodeType == 1)
        {
            child.style.opacity = 1;
        }
    }

    element.disabled = true;
    element.style.opacity = 0.5;
    question_quantity = element.innerHTML;

    clean_window();
    generate_mc(question_type[active_question_type], question_quantity);
}


// category switch
function category_function(element)
{
    // change active question type
    active_question_type = element.id;


    // changes active dropdown text
    document.getElementById("defaultDropdown").innerHTML = element.innerHTML;
    active_dropdown = element.parentElement.parentElement.parentElement;

    // reset dropdowns

    active_dropdown.style.backgroundColor = "green";


    // disable selected question type btn
    let nodes = document.getElementById("navbar-btns").getElementsByTagName("a");
    for (let i = 0; i < nodes.length; i++)
    {
        if (nodes[i] == element)
        {
            nodes[i].disabled = true;
            nodes[i].classList.add("btn-primary", "text-dark");
            nodes[i].classList.remove("btn-primary-outline")
        }
        else {
            nodes[i].disabled = false;
            nodes[i].classList.remove("btn-primary", "text-dark");
            nodes[i].classList.add("btn", "btn-outline-primary");
        }
    }


    // generate number of questions based on selected option
    for (let child=document.getElementById("quiz_quantity").firstChild; child!==null; child=child.nextSibling){
        if (child.disabled)
        {
            generate_quiz(child);
        }
    }
}

function reset_dropdowns(){
    for (let i = 0; i < 4; i ++)
    {
        
    }
}


// on load ; we generate a quiz; starting with OIT
window.addEventListener('load', (event) => {
    add_read_event(document.getElementById("file-selector"));
  generate_quiz(document.getElementById("10"));
});
const startSim = () => {
    document.getElementById('init').style.display = 'none';
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

const laws = {
    bracket: '<img src="assets/bracket.png" />',
    division: '<img src="assets/division.png" />',
    fractional_index: '<img src="assets/fraction.png" />',
    multiplication: '<img src="assets/multiplication.png" />',
    negative_index: '<img src="assets/negative_index.PNG" />',
    zero_index: '<img src="assets/zero_index.PNG" />',
}

let picked;
const laws_array = ['bracket', 'division', 'fractional_index', 'multiplication', 'negative_index', 'zero_index'];

const spin = () => {
    picked = laws_array[Math.floor(Math.random() * Math.floor(laws_array.length - 1))];
    document.getElementById('example').innerHTML = laws[picked];
    console.log(picked);
};
spin();

window.onload = () => {
    let reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        startSim();
    }
}

const reset = () => {
    sessionStorage.setItem("reloading", "true");
    location.reload();
}

const backToSim = (boolean) => {
    document.getElementById('shade').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
    reset();
}

const congratulations = () => {
    document.getElementById('shade').style.display = 'block';
    document.getElementById('feedback').style.display = 'block';
    document.getElementById('feedback').style.backgroundColor = 'green';
    document.getElementById('feedback').innerHTML = `
    <img src="assets/congratulations.gif" class="congrats-img"/>
    <br/>
    CONGRATULATIONS !!! 
    <br/>
    <button onclick="backToSim(true);">Play again</button>`;
}

const tryAgain = () => {
    document.getElementById('shade').style.display = 'block';
    document.getElementById('feedback').style.display = 'block';
    document.getElementById('feedback').style.backgroundColor = 'red';
    document.getElementById('feedback').innerHTML = `
    You are not correct!! 
    <br/>
    The correct answer is ${picked.replace(/_/g,' ')} law
    <br/>
    <button onclick="backToSim(false);">Try Again</button>`;
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log(picked, data);
    setTimeout(function(){ 
            if(picked === data){
                congratulations();
            } else {
                tryAgain();
            }
        }, 1000);
}
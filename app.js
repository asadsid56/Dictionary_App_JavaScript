let input = document.querySelector("#input"); 
let searchBtn = document.querySelector("#search"); 
let notfound = document.querySelector(".not-found");
let defBox = document.querySelector(".def");
let audioBox = document.querySelector(".audio");
let loading = document.querySelector(".loadng");

searchBtn.addEventListener('click',function (e) {
    e.preventDefault(); 

    // Clear Data 
    audioBox.innerHTML = ""; 
    notfound.innerText = ""; 
    defBox.innerText = ""; 

   // Get Input Value
    let word = input.value; 
    // If input is empty show a msg
    if (word === '') {
        alert('Please write something in input')
        return
    }
    getData(word); 
})


// API Info

const Key = "d57a3b0b-6464-4118-af45-564a775ccfbb";


// Get Data from API
async function getData(word) {
    
    // Fetch Data 
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${Key}`);   
    const data = await response.json(); 
    console.log(data);

    // If no result found
    if (!data.length) {
        notfound.innerText = 'No Result Found'; 
        return
    }

    // If result is suggestion
    if (typeof data[0] === 'string') {
        let heading = document.createElement('h3'); 
        heading.innerText = 'Did you mean ?'; 
        notfound.appendChild(heading); 

        // Create a span
        data.forEach((element) => {
            notfound.insertAdjacentHTML("beforeend",`<span class="suggested">${element}</span>`);
        });     
        return
    } 
    // If result Found for defination 
    let defination = data[0].shortdef[0]; 
    defBox.innerText = defination; 

    // If Sound found
    const soundName = data[0].hwi.prs[0].sound.audio; 
    if (soundName) {
        renderSound(soundName)
    }
}

function renderSound(soundName) {
    let subFolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${Key}`;

    // Display Audio
    let aud = document.createElement('audio'); 
    aud.src = soundSrc; 
    aud.controls = true; 
    audioBox.appendChild(aud)


}
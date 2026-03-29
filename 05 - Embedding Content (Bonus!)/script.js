const pages = [ /* like in python, we can have lists of lists too! we have 3 arrays for each page of our soundboard and each array contains objects (or in python they would be dictionaries) that have a name and a src for the sound file */
    [
        { name: "ah ha", src: "./assets/ah-ha.mp3" },
        { name: "back of the net", src: "./assets/back-of-the-net.mp3" },
        { name: "bang out of order", src: "./assets/bangoutoforder.mp3" },
        { name: "dan", src: "./assets/dan.mp3" },
        { name: "email of the evening", src: "./assets/emailoftheevening.mp3" },
        { name: "hello partridge", src: "./assets/hellopartridge.mp3" },
        { name: "i ate a scotch egg", src: "./assets/iateascotchegg.mp3" },
        { name: "im confused", src: "./assets/imconfused.mp3" },
        { name: "jurassic park", src: "" }, /* some sounds dont have a file attached because they werent given in the original folder! so the first page really is the only one with working sounds! */
    ],
    [
        { name: "smell my cheese", src: "" },
        { name: "goal", src: "" },
        { name: "kiss my face", src: "" },
        { name: "ummm", src: "" },
        { name: "wut da", src: "" },
        { name: "chuu", src: "" },
        { name: "what do i put", src: "" },
        { name: "", src: "" },
        { name: "", src: "" },
    ],
    [
        { name: "alright", src: "" },
        { name: "gayl", src: "" },
        { name: "poopbutt", src: "" },
        { name: "", src: "" },
        { name: "", src: "" },
        { name: "", src: "" },
        { name: "", src: "" },
        { name: "", src: "" },
        { name: "", src: "" },
    ],
];

let page = 0; /* our page numbers start at zero because its 0-indexed, so this is our page 1! */

function creategrid() { /* our first function is how we make the grid. this is also possible in the html but it would be very repetitive and not very efficient, so with some help from some videos i figured out how to do that */
    const grid = document.getElementById("grid"); /* it starts by creating a variable for the grid in our html so we can add the buttons to the rows and columns */
    grid.innerHTML = ""; /* the content of the grid is cleared everytime we change the page so they can be replaced with the new buttons */
    pages[page].forEach(sound => { /* for each sound thats in the current page, a button is created with the name of the sound and if there is a source file attached to it, an event listener is added to play the sound when the button is clicked */
        const btn = document.createElement("button"); /* this is where the button is created */
        btn.className = "btn" + (sound.name ? "" : " empty"); /* this basically means that if a sound has a name, it will just be classified as a btn, but if it doesnt have a name which automatically means it wouldnt have a file attached to it, it will be classed as a btn and empty */
        btn.textContent = sound.name || "?"; /* if its empty, itll show a question mark and be formatted as an empty button, but if it does, itll put the name! */ 
        if (sound.name && sound.src) btn.onclick = () => new Audio(sound.src).play(); /* wow its playing */
        grid.appendChild(btn); /* when the button is classed, it will then get added to the grid! */
    });
    document.getElementById("page-name").textContent = 'Page ${page+1} / ${pages.length}'; /* this part confused me a bit but this is how we update the page number when clicking the arrows. i didnt come up with this myself but i found it on a forum and i had to fiddle with it to fully understand */
    document.getElementById("prev").disabled = page === 0; /* to add more to the top line, the dollar sign is used to insert the value of the page variable into the string, and we add 1 to it because our page variable starts at 0 but we want to show the user that they are on page 1 when page is 0. the part after the slash just shows how many pages there are in total by adding the number of arrays we have */
    document.getElementById("next").disabled = page === pages.length - 1; /* the prev and next buttons are disabled when the user is on the first and last page! by checking if the page number is equal to 0 or equal to the last page array */
}

function pageturn(dir) { page += dir; creategrid(); } /* this function is for when the user clicks the arrow buttons to change the page. it takes in a direction (either 1 or -1) and adds that to the page variable, then it calls the creategrid function again and the process goes through for the next or previous page! */
 
function omgitstalking() { /* this is how we do the text to speech logic! with the help of SpeechSynthesisUtterance, which is a built in text-to-speech function in javascript */
    const btn = document.getElementById("say"); /* we make a variable for our button so we can edit whats written on it */
    const box = document.getElementById("text"); /* this variable lets us get the text the user types in the textarea */
    const text = box.value.trim(); /* i learnt about this function in a forum cause when i would accidentally click the say it button without typing anything, it would read out a blank space which was really weird, so this trim function just removes any extra spaces at the beginning or end of the text, so if the user clicks the button without typing anything or just types spaces, it will be counted as an empty string and we can make the browser prompt them to type something instead of reading out blank space! */

    const utterance = new SpeechSynthesisUtterance(text); /* this is how we create a new speech synthesis utterance, which is basically the object that will handle the text to speech functionality. we pass in the text that the user typed in as an argument so it knows what to read out */

    speechSynthesis.speak(utterance); /* this is how we actually make the browser speak the text. we call the speak method of the speechSynthesis object and pass in our utterance object that we just created */
}

creategrid(); /* this makes our grid show once the page loads */
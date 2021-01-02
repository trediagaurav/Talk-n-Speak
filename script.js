const synth = window.speechSynthesis;

const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body')


//Init voices array

let voices = [];

const getVoices = () =>{
    voices = synth.getVoices();
    
    //Loop through Voices and create option for each one

    voices.forEach(voice =>{
        //create an option element
        const option = document.createElement('option');
        //Fill option with voice and language
        option.textContent = voice.name + '('+ voice.lang +')';

        //set needed options attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    }) 
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices
}

//Speak

const speak = () =>{
    
    if (synth.speaking) {
        console.error('Already speaking ...')
        return;
    }
    if (textInput.value !=='') {

        // Add background animation
        body.style.background = '#141414 url(./assets/waves.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        //Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //speak end 
        speakText.onend = e => {
            console.log('Done Speaking...')
            body.style.background = '#141414';
        }

        //speak error
        speakText.onerror = e =>{
            console.log('something went wrong');
        }

        //Select a voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //Loop through Voices
        voices.forEach(voice =>{
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        })

        //Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        //Speak 
        synth.speak(speakText);
    }
}

//Event Listeners


//Text form submit 
textForm.addEventListener('submit', e =>{
    e.preventDefault();
    speak();
    textInput.blur();
})

// Rate value change 
rate.addEventListener('change', e => rateValue.textContent = rate.value);

// pitch value change 
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);

//Voice  select change
voiceSelect.addEventListener('change', e => speak());

const synth=window.speechSynthesis;
console.log(synth);
// DOM elements

const textForm=document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const rateValue=document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchValue=document.querySelector('#pitch-value');

// Init voices array
let voices=[];

const getVoices =()=>{
    voices=synth.getVoices();
    // console.log(voices);
    // Loop through voices

    voices.forEach(voice=>{
        // Create option element 
        const option =document.createElement('option');
        console.log(typeof(option));

        // Fill the option with voice  and languge

        option.textContent=voice.name+'('+voice.lang+')';

        // set needed option attribute

        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);

    });
};

getVoices();
if(synth.onvoiceschanged!==undefined){
    synth.onvoiceschanged= getVoices;

}

const speak =()=>{
    // Check if speaking
   if(synth.speaking) {
       console.error('Already speaking..');
       return;
   }
   if(textInput.value!==''){
    //    Get speak text(Jb kuch empty na ho tbhi continue)

    const speakText=new SpeechSynthesisUtterance(textInput.value);

    // SpeakText end
    speakText.onend= e=>{
        console.log('Done speaking');
    }

    // Speak error

    speakText.onerror=e=>{
        console.error('Something went wrong');
    }

    // select voice

    const selectedVoice=voiceSelect.selectedOptions[0].getAttribute('data-name');

    // Loop through voices 

    voices.forEach(voice=>{
        if(voice.name==selectedVoice){
            speakText.voice=voice;
        }
    });

    // Set pitch and rate 
    speakText.rate=rate.value;
    speakText.pitch=pitch.value;

    // speak
    synth.speak(speakText);

   }
};

// Event Listener
// Text-form submit

textForm.addEventListener('submit', e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change

rate.addEventListener('change',e=>rateValue.textContent=rate.value);


// pitch value change
pitch.addEventListener('change', e => 
    pitchValue.textContent = pitch.value
);

// as soon as we select the voice change we want it to speak
// voice select change
voiceSelect.addEventListener('change', e => speak());

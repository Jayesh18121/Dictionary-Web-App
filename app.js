let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let notFound = document.querySelector(".not__found");
let defBox = document.querySelector(".def");
let headerBox = document.querySelector(".header_def");
let audioBox = document.querySelector(".audio");
let loading = document.querySelector(".loading");
let audioErr = document.querySelector(".audio_section");
let synBox = document.querySelector(".synonym_list");
let anBox = document.querySelector(".anonym_list");
let audio_err = document.createElement("h2");
let syn_err = document.querySelector(".syn_error");
let ant_err = document.querySelector(".ant_error");
let wrapBox = document.querySelector(".nym_wrap");
let syn_list = document.createElement("h3");
let an_list = document.createElement("h3");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // clear data
  audioBox.innerHTML = "";
  notFound.innerText = "";
  defBox.innerText = "";
  headerBox.innerText = "";
  audioBox.src = "";
  audio_err.innerText = "";
  syn_err.innerHTML = "";
  ant_err.innerHTML = "";
  an_list.innerHTML = "";
  syn_list.innerHTML = "";

  // Get input data
  let word = input.value;
  // call API get data
  if (word === "") {
    audioBox.style.display = "none";
    alert("Word is required");
    return;
  }

  getData(word);
});

async function getData(word) {
  loading.style.display = "block";
  // Ajax call
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );
  const data = await response.json();
  console.log(data);
  // if empty result
  if (typeof data.title === "string") {
    audioBox.style.display = "none";
    wrapBox.style.display = "none";
    loading.style.display = "none";
    notFound.innerText = data.message;
    return;
  }

  // Result found
  else {
    loading.style.display = "none";
    const arr = data[0].meanings;
    headerBox.innerText = arr[0].partOfSpeech;
    // console.log(data);

    for (var i = 0; i <= 2; i++) {
      if (i <= arr[0].definitions.length - 1) {
        console.log(arr[0].definitions.length);
        let def_mean = document.createElement("h2");
        const define = arr[0].definitions;
        def_mean.innerText = define[i].definition;
        defBox.appendChild(def_mean);
      }
    }

    // console.log("hi");

    // Sound
    const soundName = data[0].phonetics[0].audio;
    console.log(soundName);
    if (soundName) {
      audioBox.style.display = "block";
      audio_err.innerText = "";
      renderSound(soundName);
    } else {
      audioBox.style.display = "block";
      alert("audio not found");
      audio_err.innerText = "Audio not found";
      audioErr.appendChild(audio_err);
      audio_err.classList.add("err_aud");
      console.log(audioErr);
    }

    // synonym and antonym

    wrapBox.style.display = "block";
    const synData = arr[0].synonyms;
    const anData = arr[0].antonyms;

    if (synData.length > 0) {
      for (var i = 0; i < synData.length; i++) {
        syn_list.innerText = synData[i];
        synBox.appendChild(syn_list);
      }
    } else {
      syn_err.innerHTML = "Synonyms not found";
    }

    if (anData.length > 0) {
      for (var i = 0; i < anData.length; i++) {
        an_list.innerText = anData[i];
        anBox.appendChild(an_list);
      }
    } else {
      ant_err.innerHTML = "Anonyms not found";
    }
  }
}

function renderSound(soundName) {
  audioBox.src = soundName;
  audioBox.controls = true;
}

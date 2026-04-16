const wavesurfer = WaveSurfer.create({
container: '#waveform',
waveColor: '#444',
progressColor: '#1db954',
height: 80
})

const playBtn = document.getElementById("play")
const title = document.getElementById("title")
const time = document.getElementById("time")
const volume = document.getElementById("volume")
const cover = document.getElementById("cover")

const tracks = [
{
title:"Akwid Type",
src:"beats/beat1.mp3",
cover:"cover.jpg",
bpm:94,
genre:"Boom Bap",
price:"$30"
},
{
title:"Melancholiah",
src:"beats/beat8.mp3",
cover:"cover.jpg",
bpm:87,
genre:"Boom Bap",
price:"$35"
},
{
title:"Strings in the Shadows",
src:"beats/beat9.mp3",
cover:"cover.jpg",
bpm:72,
genre:"Boom Bap",
price:"$35"
},
{
title:"Silent Pain",
src:"beats/beat2.mp3",
cover:"cover.jpg",
bpm:90,
genre:"Boom Bap",
price:"$30"
},
{
title:"Villa Flow Session",
src:"beats/beat10.mp3",
cover:"cover.jpg",
bpm:90,
genre:"Boom Bap",
price:"$25"
},
{
title:"The Low End Swamp",
src:"beats/beat3.mp3",
cover:"cover.jpg",
bpm:86,
genre:"Boom Bap",
price:"$30"
},
{
title:"Ghost Chords",
src:"beats/beat5.mp3",
cover:"cover.jpg",
bpm:89,
genre:"Boom Bap",
price:"$30"
},
{
title:"Key Pressure",
src:"beats/beat6.mp3",
cover:"cover.jpg",
bpm:89,
genre:"Boom Bap",
price:"$30"
},
{
title:"Flow 2000",
src:"beats/beat4.mp3",
cover:"cover.jpg",
bpm:95,
genre:"Reggaeton",
price:"$25"
},
{
title:"Heart in 808",
src:"beats/beat7.mp3",
cover:"cover.jpg",
bpm:143,
genre:"Trap",
price:"$25"
}
]

let current = 0

/* ▶ LOAD */
function loadTrack(i){
current = i
wavesurfer.load(tracks[i].src)
title.innerText = tracks[i].title
cover.src = tracks[i].cover
updateActive()
addPlayCount(i)
}

/* ▶ PLAY */
playBtn.onclick = ()=>{
wavesurfer.playPause()
playBtn.innerText = wavesurfer.isPlaying() ? "⏸" : "▶"
}

/* ⏱ TIME */
wavesurfer.on('audioprocess', updateTime)
wavesurfer.on('ready', updateTime)
wavesurfer.on('finish', nextTrack)

function updateTime(){
let c = wavesurfer.getCurrentTime()
let d = wavesurfer.getDuration()
time.innerText = format(c)+" / "+format(d)
}

function format(sec){
let m = Math.floor(sec/60)
let s = Math.floor(sec%60)
if(s<10) s="0"+s
return m+":"+s
}

/* 🔁 NEXT */
function nextTrack(){
current = (current+1)%tracks.length
loadTrack(current)
wavesurfer.play()
}

/* 🔊 VOLUME */
volume.oninput = ()=>{
wavesurfer.setVolume(volume.value)
}

/* ❤️ FAVORITOS */
function toggleFav(i){
let favs = JSON.parse(localStorage.getItem("favs")||"[]")

if(favs.includes(i)){
favs = favs.filter(f=>f!==i)
}else{
favs.push(i)
}

localStorage.setItem("favs", JSON.stringify(favs))
renderList()
}

/* 📊 PLAY COUNT */
function addPlayCount(i){
let plays = JSON.parse(localStorage.getItem("plays")||"{}")
plays[i] = (plays[i]||0)+1
localStorage.setItem("plays", JSON.stringify(plays))
}

/* 🔗 SHARE */
function shareTrack(track){
navigator.clipboard.writeText(location.href+"?beat="+track.title)
alert("Link copiado 🔗")
}

/* 💰 BUY */
function buyTrack(track){
alert("Comprar: "+track.title+" ("+track.price+")")
}

/* 🎯 ACTIVE */
function updateActive(){
document.querySelectorAll(".track").forEach((el,i)=>{
el.classList.toggle("active", i===current)
})
}

/* 🎼 LISTA */
function renderList(){

const list = document.getElementById("tracklist")
list.innerHTML=""

let favs = JSON.parse(localStorage.getItem("favs")||"[]")
let plays = JSON.parse(localStorage.getItem("plays")||"{}")

tracks.forEach((t,i)=>{

const div = document.createElement("div")
div.className="track"

const isFav = favs.includes(i)

div.innerHTML=`
<div class="track-left">
<strong>${t.title}</strong>
<span>${t.genre} • ${t.bpm} BPM • ${plays[i]||0} plays</span>
</div>

<div class="track-right">
<button class="icon-btn">${isFav?"❤️":"🤍"}</button>
<button class="icon-btn">▶</button>
<button class="icon-btn">🔗</button>
<button class="buy-btn">${t.price}</button>
</div>
`

// PLAY
div.querySelectorAll(".icon-btn")[1].onclick=()=>{
loadTrack(i)
wavesurfer.play()
}

// SHARE
div.querySelectorAll(".icon-btn")[2].onclick=()=>{
shareTrack(t)
}

// FAV
div.querySelectorAll(".icon-btn")[0].onclick=()=>{
toggleFav(i)
}

// BUY
div.querySelector(".buy-btn").onclick=()=>{
buyTrack(t)
}

// CLICK GENERAL
div.querySelector(".track-left").onclick=()=>{
loadTrack(i)
wavesurfer.play()
}

list.appendChild(div)

})

updateActive()
}

renderList()
loadTrack(0)

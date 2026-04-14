const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: '#444',
  progressColor: '#1db954',
  height: 80,
  responsive: true
})

const playBtn = document.getElementById("play")
const title = document.getElementById("title")
const time = document.getElementById("time")
const volume = document.getElementById("volume")
const cover = document.getElementById("cover")

const tracks = [
{
title:"West Coast Type Beat",
src:"beats/beat1.mp3",
cover:"cover.jpg",
bpm:90,
genre:"West Coast"
},
{
title:"Boom Bap Beat",
src:"beats/beat2.mp3",
cover:"cover.jpg",
bpm:85,
genre:"Boom Bap"
},
{
title:"Trap Beat",
src:"beats/beat3.mp3",
cover:"cover.jpg",
bpm:140,
genre:"Trap"
}
]

let current = 0

function loadTrack(i){
current = i
wavesurfer.load(tracks[i].src)
title.innerText = tracks[i].title
cover.src = tracks[i].cover
}

playBtn.onclick = () => {
wavesurfer.playPause()
playBtn.innerText = wavesurfer.isPlaying() ? "⏸" : "▶"
}

wavesurfer.on('ready', () => {
updateTime()
})

wavesurfer.on('audioprocess', () => {
updateTime()
})

wavesurfer.on('finish', () => {
nextTrack()
})

function updateTime(){
let currentTime = wavesurfer.getCurrentTime()
let duration = wavesurfer.getDuration()

time.innerText = formatTime(currentTime) + " / " + formatTime(duration)
}

function formatTime(sec){
let m = Math.floor(sec / 60)
let s = Math.floor(sec % 60)
if(s < 10) s = "0" + s
return m + ":" + s
}

function nextTrack(){
current = (current + 1) % tracks.length
loadTrack(current)
wavesurfer.play()
}

volume.oninput = () => {
wavesurfer.setVolume(volume.value)
}

function renderList(){
const list = document.getElementById("tracklist")
list.innerHTML = ""

tracks.forEach((t,i)=>{

const div = document.createElement("div")
div.className="track"

div.innerHTML = `
<div>
${t.title}
<br>
<span>${t.genre} • ${t.bpm} BPM</span>
</div>
<div>▶</div>
`

div.onclick = () => {
loadTrack(i)
wavesurfer.play()
}

list.appendChild(div)

})
}

renderList()
loadTrack(0)

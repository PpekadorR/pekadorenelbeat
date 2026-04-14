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
title:"Akwid Type",
meta:"94 BPM • G Minor • Boom Bap",
genre:"Rap",
src:"beats/beat1.mp3"
},
{
title:"Melancholiah",
meta:"87 BPM • C Minor • Boom Bap",
genre:"Rap",
src:"beats/beat8.mp3"
},
{
title:"Silent Pain",
meta:"90 BPM • B Minor • Boom Bap",
genre:"Rap",
src:"beats/beat2.mp3"
},
{
title:"The Low End Swamp",
meta:"86 BPM • F# Minor • Boom Bap",
genre:"Rap",
src:"beats/beat3.mp3"
},
{
title:"Ghost Chords",
meta:"89 BPM • F# Minor • Boom Bap",
genre:"Rap",
src:"beats/beat5.mp3"
},
{
title:"Key Pressure",
meta:"89 BPM • E Minor • Boom Bap",
genre:"Rap",
src:"beats/beat6.mp3"
},
{
title:"Flow 2000",
meta:"95 BPM • F Minor • Reggaeton",
genre:"Reggaeton",
src:"beats/beat4.mp3"
},
{
title:"Heart in 808",
meta:"143 BPM • B Major • Trap",
genre:"Trap",
src:"beats/beat7.mp3"
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

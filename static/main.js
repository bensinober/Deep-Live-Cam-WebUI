let isRecording = false
const liveUrl = "live"
const startRecordUrl = "/record/start"
const stopRecordUrl = "/record/stop"
let sourceImg = document.getElementById("sourceImg")
let streamImg = document.getElementById("streamImg")
const streamDiv = document.querySelector(".stream")
const progressBar = document.getElementById("progressBar")
const stopLiveBtn = document.getElementById("stopLiveBtn")
const msgDiv = document.getElementById("message")

async function uploadFace(evt) {
  //const formData = new FormData()
  const formData = new FormData(document.getElementById("uploadForm"))
  try {
    const res = await fetch("/uploadFace", {
      method: "POST",
      body: formData,
    })
    if (res.ok) {
      stopLiveBtn.disabled = false
      const fileInput = document.getElementById("face")
      let storedFilename = document.getElementById("storedFilename")
      const file = fileInput.value.split("\\").pop()
      storedFilename.value = file
      sourceImg.src = URL.createObjectURL(evt.target.files[0])
      sourceImg.onload = function() {
        sourceImg.display = "block"
        URL.revokeObjectURL(sourceImg.src)
      }
      msgDiv.innerText = "File uploaded successfully!"

      setTimeout(function() {
          msgDiv.innerText = ""
      }, 5000)
    }
  } catch(err) {
    console.log(err)
    msgDiv.innerText = "An error occurred during file upload."
  }
}

function startLive() {
    progressBar.style.display = "block"
    streamImg.style.display = "none"
    stopLiveBtn.disabled = false

    streamImg.onload = function() {
        progressBar.style.display = "none"
        streamImg.style.display = "block"
    }

    streamImg.src = liveUrl
}

function stopLive() {
    streamImg.src = ""
    streamImg.style.display = "none"
    stopLiveBtn.disabled = true
}

function toggleFullScreen() {
  const fullscreenApi = streamDiv.requestFullscreen || streamDiv.webkitRequestFullScreen || streamDiv.mozRequestFullScreen || streamDiv.msRequestFullscreen
  if (!document.fullscreenElement) {
    fullscreenApi.call(streamDiv)
  } else {
    document.exitFullscreen()
  }
}

export { uploadFace, startLive, stopLive, toggleFullScreen }

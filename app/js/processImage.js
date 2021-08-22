const path = require("path");
const os = require("os");
const { ipcRenderer } = require("electron");

document.getElementById("output-path").innerText = path.join(
  os.homedir(),
  "imageshrink"
);

const form = document.getElementById("image-form");
const slider = document.getElementById("slider");
const image = document.getElementById("img");

//OnSubmit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const imgPath = image.files[0].path;
  const quality = slider.value;

  ipcRenderer.send("image:minimize", {
    imgPath,
    quality,
  });
  document.getElementById("overlay").style.display = "block";
});

ipcRenderer.on("image:done", () => {
  M.toast({
    html: `Image resized to ${slider.value}% quality`,
  });
  document.getElementById("overlay").style.display = "none";
});

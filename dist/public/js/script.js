// Play audio
const aplayer = document.getElementById("aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  dataSong = JSON.parse(dataSong);
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSinger = JSON.parse(dataSinger);

  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        lrc: dataSong.lyrics
      },
    ],
    autoplay: true,
  });

  const avatar = document.querySelector(".singer-detail .inner-avatar");

  // Count listen
  const audioElement = document.getElementById("myAudio");

  if (audioElement) {
    audioElement.load();

    audioElement.onloadedmetadata = function () {
      const audioDuration = audioElement.duration;
      console.log(audioDuration);
      setTimeout(function () {
        ap.on("ended", function () {
          const link = `/songs/listen/${dataSong._id}`;

          fetch(link, { method: "PATCH" })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              const spanListen = document.querySelector("[data-listen]");

              spanListen.innerHTML = data.listen;
            });
        });
      }, audioDuration * 1000);
    };
  }
  // End Count listen

  ap.on("play", function () {
    avatar.style.animationPlayState = "running";
  });

  ap.on("pause", function () {
    avatar.style.animationPlayState = "paused";
  });
}
// End Play audio

// Button like
const buttonLike = document.querySelector("[button-like]");
if (buttonLike) {
  buttonLike.addEventListener("click", () => {
    const isActive = buttonLike.classList.contains("active");
    const type = isActive ? "unlike" : "like";

    const idSong = buttonLike.getAttribute("button-like");

    const link = `/songs/like/${type}/${idSong}`;

    fetch(link, { method: "PATCH" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.code == 200);
        if (data.code == 200) {
          const spanLike = document.querySelector("[data-like]");

          spanLike.innerHTML = data.like;
          buttonLike.classList.toggle("active");
        }
      });
  });
}
// End Button like

// Button favorite
const listButtonFavorite = document.querySelectorAll("[button-favorite]");
if (listButtonFavorite.length > 0) {
  listButtonFavorite.forEach((buttonFavorite) => {
    buttonFavorite.addEventListener("click", () => {
      const isActive = buttonFavorite.classList.contains("active");
      const type = isActive ? "no" : "yes";

      const idSong = buttonFavorite.getAttribute("button-favorite");

      const link = `/songs/favorite/${type}/${idSong}`;

      fetch(link, { method: "PATCH" })
        .then((response) => response.json())
        .then((data) => {
          if (data.code == 200) {
            buttonFavorite.classList.toggle("active");
          }
        });
    });
  });
}
// End Button favorite

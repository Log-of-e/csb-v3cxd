var playlist = playlist || {};

function vidListinit() {
  const vidList = [
    "https://d2ufudlfb4rsg4.cloudfront.net/cnettv/hcgBWevF/adaptive/hcgBWevF_master.m3u8",

    "https://d2ufudlfb4rsg4.cloudfront.net/fox9minneapolis/RDWN15EC/adaptive/RDWN15EC_master.m3u8",

    "https://d2ufudlfb4rsg4.cloudfront.net/i24news/btiiAgOKj/adaptive/btiiAgOKj_master.m3u8",

    "https://d2ufudlfb4rsg4.cloudfront.net/bloomberg/Thy6p8Ftc/adaptive/Thy6p8Ftc_master.m3u8"
  ];

  return vidList;
}

fillList("#video-picker");
function fillList(_id, vidList = vidListinit(), playerId = "playerId") {
  const picker = document.querySelector(_id);

  picker.innerHTML = `<ol>
   ${vidList
     .map(
       (v, k) => `<a href=${v}>
   <li>video${k}</li>
   </a>`
     )
     .join("\n")}
  </ol>`;

  picker.onclick = (evt) => {
    evt.preventDefault();

    performance.mark(`user-select-video`);
    const videoSrc = evt.target.parentElement?.href
      ? evt.target.parentElement.href
      : null;
    if (window["videojs"] && videoSrc) {
      // const player00 = document.querySelector("video");
      const player = videojs(playerId);
      player.src(videoSrc);
      player.play();
    } else if (window["hls"]) {
      const hls = window["hls"];
      hls.loadSource(videoSrc);
      const player = document.getElementById(playerId);
      player.play();
    }

    // console.log(
    //   "t::",
    //   evt.target.parentElement?.href ? evt.target.parentElement.href : null
    // );
  };
}

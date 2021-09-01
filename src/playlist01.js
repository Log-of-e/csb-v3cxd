var playlist = playlist || {};

function vidListinit() {
  const vidList = [
    "https://d2ufudlfb4rsg4.cloudfront.net/cnettv/hcgBWevF/adaptive/hcgBWevF_master.m3u8",

    "https://d2ufudlfb4rsg4.cloudfront.net/fox9minneapolis/RDWN15EC/adaptive/RDWN15EC_master.m3u8",

    "https://d2ufudlfb4rsg4.cloudfront.net/i24news/btiiAgOKj/adaptive/btiiAgOKj_master.m3u8",

    "https://d2ufudlfb4rsg4.cloudfront.net/bloomberg/Thy6p8Ftc/adaptive/Thy6p8Ftc_master.m3u8",
    "https://livevideo01.12newsnow.com/hls/live/2017379/newscasts/live.m3u8"
  ];

  return vidList;
}

fillList("#video-picker");
function fillList(_id, vidList = vidListinit(), playerId = "playerId") {
  const picker = document.querySelector(_id);

  picker.innerHTML = `<ul style="list-style: none;">
   ${vidList
     .map(
       (v, k) => `<li><a href=${v}>video${k}</a></li>
   `
     )
     .join("\n")}
  </ul>`;

  picker.addEventListener("click", picker_click, false);

  function picker_click(evt) {
    evt.preventDefault();

    if (!evt.target?.matches("li>a")) return;

    performance.mark(`user-select-video`);
    const videoSrc = evt.target?.href;

    if (window["videojs"] && videoSrc) {
      const videojs = window["videojs"];
      const player = videojs(playerId);
      player.src(videoSrc);
      player.play();
    } else if (window["hls"]) {
      const hls = window["hls"];
      hls.loadSource(videoSrc);
      const player = document.getElementById(playerId);
      player.play();
    }
  }
}

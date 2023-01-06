const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "f9cfa79e0fmsh8dd788ab27668c8p13655ajsnc142bee1819e",
    "X-RapidAPI-Host": "yt-api.p.rapidapi.com",
  },
};
let displayarea = document.getElementById("links");
let btn = document.getElementById("btn");
let inurl = document.getElementById("inurl");
let getbtn = document.getElementById("getid");
let vidname = document.getElementById("name");
let id = "";
let thumbarea = document.getElementById("thumb");
btn.addEventListener("click", function () {
  let vurl = inurl.value;
  id = youtube_parser(vurl);
  console.log(id);
  //   `https://yt-api.p.rapidapi.com/dl?id=${id}`;
  fetch(`https://yt-api.p.rapidapi.com/dl?id=${id}`, options)
    .then((response) => response.json())
    .then((data) => {
      //   let url = inurl.value;
      //   id = youtube_parser(url);
      let hd = data.formats[2].url;
      let medium = data.formats[1].url;
      let low = data.formats[0].url;
      vidname.innerHTML = `<h1>${data.title}</h1>`;
      displayarea.innerHTML = `<div><a href="${hd}">HD Quality</a></div><div><a href="${medium}">Medium Quality</a></div><div><a href="${low}">Low Quality</a></div>`;
      thumbarea.innerHTML = `<img src="${data.thumbnail[1].url}"/>`;
    })
    .catch((err) => console.error(err));
});
// getbtn.addEventListener("click", () => {
//   id = youtube_parser(vurl);
// });
function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

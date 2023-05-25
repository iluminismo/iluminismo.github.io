// ########################################################
//   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
// ########################################################

$("#app").load("/template/nav.html");

function importTextFiles(callback) {
  var max = 5;
  var fileContents = [];
  var fileIndex = 0;
  importTextFiles();
  // make it create all objects of a page then check load and retreave the info
  console.log(fileContents);
  function importTextFiles() {
    var fileName = "/posts/" + fileIndex + ".txt";

    var object = document.createElement("object");
    object.data = fileName;
    document.body.appendChild(object);

    object.onload = function () {
      var fileContent = object.contentDocument.body.innerText.trim();

      // Continue importing files if the file exists
      if (fileContent !== "") {
        fileContents.push(fileContent);
        fileIndex++;
      } else {
        // Output the list of file contents
        console.log("error");
      }
      object.remove();
      console.log(fileIndex);
      if (fileIndex < max) {
        importTextFiles();
      } else {
        loadNav();

        postList = extractHTMLInfo(fileContents);
        console.log(postList);
        Featured("#home", postList[0]);
        Highlight("#home", postList[1]);
        Highlight("#home", postList[2]);
        loadPostsCard("#home", postList);
        loadPosts(postList);

        loadCategorys();
      }
    };
  }
}
// Call the function to import the text files
importTextFiles();

function extractHTMLInfo(htmlList) {
  const infoList = [];

  for (let i = 0; i < htmlList.length; i++) {
    const html = markdown(htmlList[i]);
    const doc = new DOMParser().parseFromString(html, "text/html");
    const img = doc.querySelector("img");
    const h1 = doc.querySelector("h1");
    const p = doc.querySelector("p:nth-of-type(3)");

    const small = doc.querySelector("small");

    const id = i;
    const title = h1 ? h1.textContent : "";
    const imgSrc = img ? img.getAttribute("src") : "";
    const resume = p ? p.textContent : "";
    const category = small ? small.textContent : "";
    const content = html;

    const info = { id, title, img: imgSrc, resume, category, content };
    infoList.push(info);
  }

  return infoList;
}

var postList = [];
function loadPostsCard(id, list) {
  for (let i = 3; i < list.length; i++) {
    const e = list[i];
    $(id + " .postList").append(Post(e));
  }
}

function loadPosts(list) {
  for (let i = 0; i < list.length; i++) {
    const e = list[i];
    const page =
      '<div id="page' + i + '" class="tab-content">' + e.content + "</div>";

    $(page).insertBefore("#home");
  }
}

function Post(e) {
  const post =
    '<div class="col-md-4 "><div class="card mb-4 box-shadow"><img  class="card-img-top" src="' +
    e.img +
    '" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block" src=""    data-holder-rendered="true"/><div class="card-body"><h5 class="card-title">' +
    e.title +
    '</h5><p class="card-text resume">' +
    e.resume +
    '</p><div class="d-flex justify-content-between align-items-center"><div  class="text-white font-weight-bold">Continue reading...</div> <small class="text-muted">' +
    e.category +
    '</small></div></div><a href="#page' +
    e.id +
    '" class="post-link"></a></div></div>';
  return post;
}

function Featured(id, e) {
  const template =
    '<div class="jumbotron p-3 p-md-5 text-white rounded bg-dark" style="background-image: url(' +
    e.img +
    '); background-repeat: no-repeat;    background-size: cover;background-position: center;">  <a href="#page' +
    e.id +
    '" class="link-nul"><div class="col-md-6 px-0 featured-card">    <h1 class="display-4 font-italic">' +
    e.title +
    '</h1>    <p class="lead my-3 resume">' +
    e.resume +
    '</p>    <p class="lead mb-0">      <a  class="text-white font-weight-bold">Continue reading...</a>   <small class="text-muted">' +
    e.category +
    "</small> </p>  </div></div></a>";
  $(id + " .featured").append(template);
}

function Highlight(id, e) {
  const template =
    '<div class="col-md-6 ">  <div class="card flex-md-row mb-4 box-shadow h-md-250 ">    <div class="card-body d-flex flex-column align-items-start">      <strong class="d-inline-block mb-2 text-primary">' +
    e.category +
    '</strong>      <h5 class="mb-0">        <a class="text-dark" href="#">' +
    e.title +
    '</a>      </h5>      <div class="mb-1 text-muted">Nov 12</div>      <p class="card-text mb-auto resume">' +
    e.resume +
    '</p>      <a >Continue reading</a>    </div>    <img      class="card-img-right flex-auto d-none d-md-block"      data-src="holder.js/200x250?theme=thumb"      alt="Thumbnail [200x250]"      style="width: 200px; height: 250px"      src="' +
    e.img +
    '"      data-holder-rendered="true"    /><a href="#page' +
    e.id +
    '" class="post-link"></a>  </div></div>';
  $(id + " .highlight").append(template);
}

function loadCategoryCards(category) {
  var newList = [];
  for (let i = 0; i < postList.length; i++) {
    const e = postList[i];
    if (category == e.category) {
      newList.push(e);
    }
  }
  if (newList.length >= 1) {
    Featured("#" + category, newList[0]);
  } else if (newList.length >= 3) {
    Highlight("#" + category, newList[1]);
    Highlight("#" + category, newList[2]);
  } else if (newList.length > 3) {
    loadPostsCard("#" + category, postList);
  }
}

function loadCategorys() {
  $("#category-posts").html("");

  for (let i = 0; i < nav.length; i++) {
    const e = nav[i];
    const template =
      '<div id="' +
      e +
      '" class="tab-content">    <div class="row mb-2 featured"></div>    <div class="row mb-2 highlight"></div>    <div class="row mb-2 postList"></div>  </div>';

    $(template).insertBefore("#home");

    loadCategoryCards(e);
  }
}
const nav = ["Art", "Books", "Legends", "Ideas"];
function loadNav() {
  for (let i = 0; i < nav.length; i++) {
    const e = nav[i];

    const tab = '<a class="p-2 text-muted" href="#' + e + '" >' + e + "</a>";
    $("#menu").append(tab);
  }
}

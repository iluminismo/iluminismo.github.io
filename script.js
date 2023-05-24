$("#app").load("/template/nav.html");

function getTextFilesFromFolder() {
  var currentIndex = 0;
  var textFiles = [];
  var path =
    "https://raw.githubusercontent.com/TechArcade/techarcade.github.io/main/posts/";
  function fetchTxtFile(index) {
    var url = path + index + ".txt";

    $.ajax({
      url: url,
      type: "GET",
      success: function (data) {
        textFiles.push(data);
        // Fetch the next file
        fetchTxtFile(index + 1);
      },
      error: function (xhr) {
        if (xhr.status === 404) {
          // No more files found, do something with txtFiles
          postList = extractHTMLInfo(textFiles);
          console.log(postList);
          Featured(postList[0]);
          Highlight(postList[1]);
          Highlight(postList[2]);
          loadPosts(postList);
        }
      },
    });
  }

  // Start fetching the first file
  fetchTxtFile(currentIndex);
}

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
function loadPosts(list) {
  for (let i = 3; i < list.length; i++) {
    const e = list[i];
    $("#posts").append(Post(e));
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
    '</small></div></div><div onclick="toggleElements(event, ' +
    e.id +
    ')"  class="post-link"></div></div></div>';
  return post;
}
function Featured(e) {
  const template =
    '<div class="jumbotron p-3 p-md-5 text-white rounded bg-dark" style="background-image: url(' +
    e.img +
    '); background-repeat: no-repeat;    background-size: cover;background-position: center;">  <div class="col-md-6 px-0 featured" onclick="toggleElements(event, ' +
    e.id +
    ')">    <h1 class="display-4 font-italic">' +
    e.title +
    '</h1>    <p class="lead my-3 resume">' +
    e.resume +
    '</p>    <p class="lead mb-0">      <a  class="text-white font-weight-bold">Continue reading...</a>   <small class="text-muted">' +
    e.category +
    "</small> </p>  </div></div>";
  $("#featured").append(template);
}
function Highlight(e) {
  const template =
    '<div class="col-md-6 ">  <div class="card flex-md-row mb-4 box-shadow h-md-250 ">    <div class="card-body d-flex flex-column align-items-start">      <strong class="d-inline-block mb-2 text-primary">' +
    e.category +
    '</strong>      <h5 class="mb-0">        <a class="text-dark" href="#">' +
    e.title +
    '</a>      </h5>      <div class="mb-1 text-muted">Nov 12</div>      <p class="card-text mb-auto resume">' +
    e.resume +
    '</p>      <a >Continue reading</a>    </div>    <img      class="card-img-right flex-auto d-none d-md-block"      data-src="holder.js/200x250?theme=thumb"      alt="Thumbnail [200x250]"      style="width: 200px; height: 250px"      src="' +
    e.img +
    '"      data-holder-rendered="true"    /><div onclick="toggleElements(event, ' +
    e.id +
    ')"  class="post-link"></div>  </div></div>';
  $("#highlight").append(template);
}
getTextFilesFromFolder();

function loadCategory(category) {
  $("#category-posts").html("");
  for (let i = 0; i < postList.length; i++) {
    const e = postList[i];
    if (category == e.category) {
      $("#category-posts").append(Post(e));
    }
  }
}

var nav = ["Home", "", "", "", ""];

function loadNav() {
  for (let i = 0; i < nav.length; i++) {
    const e = nav[i];
    var tab =
      '<a class="p-2 text-muted" href="#" onclick="toggleElements(event, ' +
      i +
      ')">' +
      e[i] +
      "</a>";
    $("#nav").append(tab);
  }
}
loadNav();
function toggleElements(event, id) {
  event.preventDefault(); // Prevent any default behavior of the event

  const homeElement = document.getElementById("home");

  const category = document.getElementById("category");
  const categoryPosts = document.getElementById("category-posts");

  const pageElement = document.getElementById("page");
  const pageContent = document.getElementById("content");

  if (id === -1) {
    close();
    homeElement.style.display = "block"; // Show the home element
  } else if (id === -2) {
    close();
    loadCategory("Ideas");
    category.style.display = "block"; // Hide the page element
  } else if (id === -3) {
    close();
    loadCategory("Games");
    category.style.display = "block"; // Hide the page element
  } else if (id === -4) {
    close();
    loadCategory("Tech");
    category.style.display = "block"; // Hide the page element
  } else {
    console.log(id);
    pageContent.innerHTML = postList[id].content;
    close();
    pageElement.style.display = "block"; // Show the page element
  }

  function close() {
    homeElement.style.display = "none";
    category.style.display = "none";
    pageElement.style.display = "none";
  }
}

/*
function getTextFilesFromFolder() {
  const folderPath = "/posts/";
  const textFiles = [];
  const q = 5;
  for (let i = 0; i < q; i++) {
    const href =
      "https://raw.githubusercontent.com/TechArcade/techarcade.github.io/main/posts/" +
      i +
      ".txt";
    if (href.endsWith(".txt")) {
      const filePath = href;
      console.log(href);
      // Fetch the text file
      $.get(filePath, function (text) {
        textFiles.push(text);

        if (i == q - 1) {
          postList = extractHTMLInfo(textFiles);
          console.log(postList);
          Featured(postList[0]);
          Highlight(postList[1]);
          Highlight(postList[2]);
          loadPosts(postList);
        }
      });
    }
  }

  /*
  $.ajax({
    url: folderPath,
    success: function (data) {
      const links = $(data).find("a");
      const q = links.length;
      $(links).each(function (i) {
        const href = $(this).attr("href");
        if (href.endsWith(".txt")) {
          const filePath = href;

          // Fetch the text file
          $.get(filePath, function (text) {
            textFiles.push(text);

            if (i == q - 1) {
              postList = extractHTMLInfo(textFiles);
              console.log(postList);
              Featured(postList[0]);
              Highlight(postList[1]);
              Highlight(postList[2]);
              loadPosts(postList);
            }
          });
        }
      });
    },
    error: function (error) {
      console.error("Error loading folder:", error);
    },
  });

  return textFiles;
}*/

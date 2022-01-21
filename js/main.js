//#############################################################################
//                                    quotes
//#############################################################################
var quotes = JSON.parse(quote);

document.getElementById("quot").innerHTML = quotes[Math.floor(Math.random() * quotes.length)][0];


//#############################################################################
//                                    legendes
//#############################################################################
var legends = JSON.parse(jsonLegends);
var legendsContent = document.getElementById("legendsContent");
console.log(legends);
for (var key in legends) {
    if (!legends.hasOwnProperty(key)) continue;
    var legendLi = document.createElement('li');
    var legendLink = document.createElement('a');
    var legendDiv = document.createElement('div');
    var legendImg = document.createElement('img');
    var legendH3 = document.createElement('h3');
    var legendSmall = document.createElement('small');
    var legendP = document.createElement('p');


    legendImg.setAttribute("src", legends[key][2]);
    legendImg.setAttribute("alt", key);
    legendLink.setAttribute("href", "#");

    legendH3.appendChild(document.createTextNode(key));
    legendSmall.appendChild(document.createTextNode(legends[key][0]));
    legendP.appendChild(document.createTextNode(legends[key][1]));


    legendDiv.appendChild(legendImg);

    legendLink.appendChild(legendDiv);
    legendLink.appendChild(legendH3);
    legendLink.appendChild(legendSmall);
    legendLink.appendChild(legendP);

    legendLi.appendChild(legendLink);

    legendsContent.appendChild(legendLi);
}



//#############################################################################
//                              categ
//#############################################################################
/*
fazer sistema de paginação e categoria quando tiver mais de 12 posts completos
var categ = JSON.parse(jsonCateg);
var categorias = document.getElementById("categ");

for (var x = 0; x < categ.length; x++) {
    var catD = document.createElement('div');
    catD.appendChild(document.createTextNode(categ[x]));
    categorias.appendChild(catD);
}*/


var posts = JSON.parse(jsonPosts);

var menu = document.getElementById("linkPosts");
var folder = document.getElementById("folder");

for (var key in posts) {
    if (!posts.hasOwnProperty(key)) continue;

    //var lista = document.createElement('li');

    //#############################################################################
    //                                    links
    //#############################################################################

    var link = document.createElement('div');
    link.setAttribute("class", "link");
    var linkA = document.createElement('a');
    linkA.setAttribute("href", "#" + key);

    linkH = document.createElement('h2');

    linkH.appendChild(document.createTextNode(posts[key][0]));

    var linkP = document.createElement('p');
    linkP.appendChild(document.createTextNode(posts[key][4]));


    var linkT = document.createElement('small');

    //date

    var postDate = new Date(posts[key][2]);
    postDate = postDate.toLocaleString();
    linkT.appendChild(document.createTextNode(postDate));

    linkA.appendChild(linkH);
    linkA.appendChild(linkP);
    linkA.appendChild(linkT);

    link.appendChild(linkA);

    var linkD = document.createElement('div');
    linkD.setAttribute("class", "categ");
    var linkC = document.createElement('a');
    linkC.setAttribute("href", "#categ" + posts[key][1][0]);
    linkC.appendChild(document.createTextNode(categ[posts[key][1][0]]));

    linkD.appendChild(linkC);
    link.appendChild(linkD);

    menu.appendChild(link);


    //#############################################################################
    //                              pages
    //#############################################################################

    var page = document.createElement('div');

    page.setAttribute("class", "tab-content post");
    page.setAttribute("id", key);

    var titulo = document.createElement('h1');
    var conteudo = document.createElement('div');
    titulo.innerHTML = posts[key][0];
    //var back = document.createElement('a');

    page.appendChild(titulo);
    
    conteudo.innerHTML = posts[key][6];
    page.appendChild(conteudo);
    folder.prepend(page);

}

/*

    console.log(key);


page.innerHTML = ;
*/

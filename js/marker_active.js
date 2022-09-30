//-------------Date code---------------------
setInterval(function () {
  let myDate = new Date();
  let newDate = `${myDate.getDate()} - ${
    myDate.getMonth() + 1
  } - ${myDate.getFullYear()}`;
  let newTime = `${myDate.getHours()}:${myDate.getMinutes()}:${myDate.getSeconds()}`;
  document.getElementById("year").innerHTML = newDate;
  document.getElementById("time").innerHTML = newTime;
}, 1);

//-----------------------form---------------------

window.onload = toSite();

function valid(siteName, siteUrl) {
  let x = true,
    y = true;
  if (siteName == "") {
    document.getElementById("namerror").style.display = "block";
    document.getElementById("namerror").innerHTML = "Please enter site name";
    x = false;
  }
  if (siteUrl == "") {
    document.getElementById("urlerror").style.display = "block";
    document.getElementById("urlerror").innerHTML = "Please enter site url";
    y = false;
  }
  if (x == false || y == false) {
    return false;
  }
  return true;
}

let sites = [];
function toLocal(e) {
  var siteName = document.getElementById("sitename").value;
  var siteUrl = document.getElementById("siteurl").value;
  if (!valid(siteName, siteUrl)) {
    return;
  }
  var object = {
    name: siteName,
    url: siteUrl,
  };

  if (localStorage.getItem("sites") === null) {
    sites = [];
    sites.push(object);
    localStorage.setItem("sites", JSON.stringify(sites));
  } else {
    sites = [];
    sites = JSON.parse(localStorage.getItem("sites"));
    let count = 0;
    for (let i = 0; i < sites.length; i++) {
      if (
        object.url.slice(
          object.url.indexOf(".") + 1,
          object.url.lastIndexOf(".")
        ) ==
        sites[i].url.slice(
          object.url.indexOf(".") + 1,
          object.url.lastIndexOf(".")
        )
      ) {
        count++;
      }
    }
    if (count == 0) {
      sites.push(object);
      localStorage.setItem("sites", JSON.stringify(sites));
    }
  }

  toSite();
  e.preventDefault();
}

function toSite() {
  var sites = JSON.parse(localStorage.getItem("sites"));
  var result = document.getElementById("result");
  result.innerHTML = "";
  for (let i = 0; i < sites.length; i++) {
    result.innerHTML += `<div class="table"> <h2>${sites[i].name}
   <button class="visitbtn"> <a href="${sites[i].url}" target="_blank">Visit</a></button>
    <a href="#" onclick=delSite("${sites[i].url}")><i class="material-icons">delete</i></a>
    </h3> 
    </div>`;
  }
}

function delSite(url) {
  var sites = JSON.parse(localStorage.getItem("sites"));
  for (let i = 0; i < sites.length; i++) {
    if (sites[i].url == url) {
      sites.splice(i, 1);
    }
  }
  localStorage.setItem("sites", JSON.stringify(sites));
  toSite();
}

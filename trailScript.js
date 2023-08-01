let go = document.querySelector("#go");
let main = document.querySelector(".main");

var firstBeach;
var firstBeachID;
var secondBeach;
var thirdBeach;
var usrCounty;
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
async function logBeaches() {
  const response = await fetch(
    "https://api.coastal.ca.gov/access/v1/locations"
  );
  const beaches = await response.json();
  return beaches;
}
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
async function searchTrails() {
  var beaches = await logBeaches();
  console.log(beaches);

  //usrCounty = document.getElementById("county").value;

  var select = document.querySelector("#select");
  var index = select.selectedIndex;
  var usrCounty = select.options[index].value;
  console.log(usrCounty);

  firstBeach = beaches.find((item) => item.COUNTY === usrCounty);
  firstBeachID = firstBeach.ID;
  console.log(firstBeachID);
  console.log(firstBeach);

  secondBeach = beaches.find((item) => item.ID === firstBeachID + 1);
  thirdBeach = beaches.find((item) => item.ID === firstBeachID + 2);

  displayBeaches();
}

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function displayBeaches() {
  main.innerHTML = `
         <article class="message is-warning">
            <div class="message-header" id="name1">
            Name:  <p id="name1">${firstBeach.NameMobileWeb} </p>
            <button class="button is-primary is-inverted" id="save1">Save</button>
            </div>
            <div class="message-body" id="desc1">
            Description: ${firstBeach.DescriptionMobileWeb}<br/>
            Location: ${firstBeach.LocationMobileWeb}<br/>
            Fee: ${firstBeach.FEE}<br/>
            Fishing: ${firstBeach.FISHING}<br/>
            Parking: ${firstBeach.PARKING}
            </div>
        </article>
        <article class="message is-warning">
            <div class="message-header" id="name2">
            Name:  <p id="name2">${secondBeach.NameMobileWeb} </p>
            <button class="button is-primary is-inverted" id="save2">Save</button>
            </div>
            <div class="message-body" id="desc2">
            Description: ${secondBeach.DescriptionMobileWeb}<br/>
            Location: ${secondBeach.LocationMobileWeb}<br/>
            Fee: ${secondBeach.FEE}<br/>
            Fishing: ${secondBeach.FISHING}<br/>
            Parking: ${secondBeach.PARKING}
            </div>
        </article>
        <article class="message is-warning">
            <div class="message-header" id="name3">
            Name:  <p id="name1">${thirdBeach.NameMobileWeb} </p>
            <button class="button is-primary is-inverted" id="save3">Save</button>
            </div>
            <div class="message-body" id="desc3">
            Description: ${thirdBeach.DescriptionMobileWeb}<br/>
            Location: ${thirdBeach.LocationMobileWeb}<br/>
            Fee: ${thirdBeach.FEE}<br/>
            Fishing: ${thirdBeach.FISHING}<br/>
            Parking: ${thirdBeach.PARKING}
            </div>
        </article>

    `;

  let btn1 = document.getElementById("save1");
  let btn2 = document.getElementById("save2");
  let btn3 = document.getElementById("save3");

  btn1.addEventListener("click", function () {
    saveTrailsData(firstBeach);
    getTrailData();
  });

  btn2.addEventListener("click", function () {
    saveTrailsData(secondBeach);
    getTrailData();
  });

  btn3.addEventListener("click", function () {
    saveTrailsData(thirdBeach);
    getTrailData();
  });
}
go.addEventListener("click", function () {
  searchTrails();
});
//save data to localstorage
function saveTrailsData(val) {
  let trailData = JSON.parse(localStorage.getItem("trailData")) || [];
  const index = trailData.findIndex((item) => item.ID === val.ID);
  // if index >= 0, val already exists then return nothing; otherwise,push val to trailData and save to localstorage
  if (index >= 0) {
    return;
  } else {
    trailData.push(val);
    localStorage.setItem("trailData", JSON.stringify(trailData));
    getTrailData();
  }
}
//render data from localstorage
function getTrailData() {
  let options = document.querySelector("#option");
  //clear the options
  options.innerHTML = "";
  let trailData = JSON.parse(localStorage.getItem("trailData")) || [];
  console.log(trailData);
  for (let i = 0; i < trailData.length; i++) {
    options.innerHTML += `<a class="navbar-item" id='bookmarks'> ${trailData[i].NameMobileWeb}</a><br/>`;
  }

  let bookmarks = document.querySelectorAll("#bookmarks");
  bookmarks.forEach(function (list, index) {
    list.addEventListener("click", function () {
      console.log("!!!!!!");

      main.innerHTML += `
                <article class="message is-warning">
                    <div class="message-header" id="name3">
                        Name:  <p id="name1">${trailData[index].NameMobileWeb} </p>
                        <button class="button is-primary is-inverted" id="save3">Save</button>
                    </div>
                    <div class="message-body" id="desc3">
                        Description: ${trailData[index].DescriptionMobileWeb}<br/>
                        Location: ${trailData[index].LocationMobileWeb}<br/>
                        Fee: ${trailData[index].FEE}<br/>
                        Fishing: ${trailData[index].FISHING}<br/>
                        Parking: ${trailData[index].PARKING}
                    </div>
                </article>
            `;
    });
  });
}
getTrailData();
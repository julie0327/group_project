var firstBeach;
var firstBeachID;
var secondBeach;
var thirdBeach;

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
async function logBeaches() {
    const response = await fetch("https://api.coastal.ca.gov/access/v1/locations");
    const beaches = await response.json();
    return beaches
  }
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  async function searchTrails(){
    event.preventDefault();

    var beaches = await logBeaches();

    usrCounty = document.getElementById("county").value;    

    firstBeach = beaches.find(item => item.COUNTY == usrCounty);
    firstBeachID = firstBeach.ID;

    secondBeach = beaches.find(item => item.ID == firstBeachID + 1);
    thirdBeach = beaches.find(item => item.ID == firstBeachID + 2);

    displayBeaches();

  }
//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function displayBeaches(){
  document.getElementById("name1").innerHTML = firstBeach.NameMobileWeb;
  document.getElementById("name2").innerHTML = secondBeach.NameMobileWeb;
  document.getElementById("name3").innerHTML = thirdBeach.NameMobileWeb;

  document.getElementById("desc1").innerHTML = firstBeach.DescriptionMobileWeb;
  document.getElementById("desc2").innerHTML = secondBeach.DescriptionMobileWeb;
  document.getElementById("desc3").innerHTML = thirdBeach.DescriptionMobileWeb;

  document.getElementById("locat1").innerHTML = firstBeach.LocationMobileWeb;
  document.getElementById("locat2").innerHTML = secondBeach.LocationMobileWeb;
  document.getElementById("locat3").innerHTML = thirdBeach.LocationMobileWeb;
}

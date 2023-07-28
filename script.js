async function logBeaches() {
    const response = await fetch("https://api.coastal.ca.gov/access/v1/locations");
    const beaches = await response.json();
    return beaches
  }

  async function searchTrails(){
    event.preventDefault();

    var beaches = await logBeaches();

    usrCounty = document.getElementById("county").value;    

    var firstBeach = beaches.find(item => item.COUNTY == usrCounty);
    var firstBeachID = firstBeach.ID;

    console.log(beaches.find(item => item.ID == firstBeachID));
    console.log(beaches.find(item => item.ID == firstBeachID + 1));
    console.log(beaches.find(item => item.ID == firstBeachID + 2));

    console.log("-=-=-=-=-=-=-=-=-");
    console.log(firstBeach.DescriptionMobileWeb);

  }


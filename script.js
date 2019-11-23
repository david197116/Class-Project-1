// Geographical location
  navigator.geolocation.getCurrentPosition(function (position){
    // console.log(position);
    // console.log(position.coords.latitude);
    window.latitude = (position.coords.latitude); 
    window.longitude = (position.coords.longitude);
    console.log(window.longitude)
  });
  
  // Sidenav
  var sideNav = document.querySelector('.sidenav');
  M.Sidenav.init(sideNav, {});

  // Slider
  const slider = document.querySelector('.slider');
  M.Slider.init(slider, {
    indicators: false,
    height: 500,
    transition: 500,
    interval: 4000
  });

  // Material Boxed
  const mb = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(mb, {});

  // ScrollSpy
  const ss = document.querySelectorAll('.scrollspy');
  M.ScrollSpy.init(ss, {});


  $("#add_ingredients").on("click", function(event) {  
    event.preventDefault();
    var ingredients = $("#search-item").val();
      console.log(ingredients)
    $("#list").text(ingredients);
    
  });

  $("#add_d-ingredients").on("click", function(event) {  
    event.preventDefault();
    var ingredients = $("#search-item").val();
      console.log(ingredients)
    $("#d-list").text(ingredients);
    
  });

  $('#drink-recipe-list').click(function() {
    var drinkClick = $(event.target).text().replace(/\s/g, '');
    var drQuery = "https://google-search1.p.rapidapi.com/google-search?q=" + drinkClick + "%252BEndgame&hl=en&gl=us";
    console.log(drQuery);
    var settings = {
	"async": true,
	"crossDomain": true,
	"url": drQuery,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "google-search1.p.rapidapi.com",
		"x-rapidapi-key": "58a123ce77msh9e0a297c2162053p1c58d9jsn37d013719c3d"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});
    });


// API request for recipe by ingredients 

$("#find_recipe").on("click", function(event) {  
  event.preventDefault();
  var ingredients = $("#list").text();
    console.log(ingredients)
  var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients="+ ingredients,
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "58a123ce77msh9e0a297c2162053p1c58d9jsn37d013719c3d"
      }
    }

  $.ajax(settings).then(function (response) {
      // console.log(response);
      
      console.log(response);
      console.log(settings);
      $(".img").html(`

      <h5>${response.length}</h5>
      ${response.map(function(list){
       return `
       <div class="ingredients">
       <h6>${list.title}</h6>
       
       
         
 
      </div>
       `
      }).join('')}
 
      
      `);
      $("#img2").html(`

      
      ${response.map(function(list){
       return `
       
       <img class="Ingr photo" src = "${list.image}">
       
       
         
 
             `
      }).join('')}
 
      
      `);
      var summary = {
        "async": true,
        "crossDomain": true,
        "url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + response[0].id+ "/analyzedInstructions?stepBreakdown=false",
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          "x-rapidapi-key": "58a123ce77msh9e0a297c2162053p1c58d9jsn37d013719c3d",
          "Content-Type": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      
    }
    $.ajax(summary).then(function (response2) {
      console.log('response2')
      console.log(response2)
      window.response2 = response2;
      console.log(summary)
      $("#instruc").html(` <h5>${response2.length}</h5>
      ${response2[0].steps.map(function(step){
       return `
       <div class="ingredients">
       <h6>${step.number}</h6><h6>${step.step}</h6>
       
         
 
      </div>
       `
      }).join('')}
 
      
      `);
      
     
    });
  
});
$.ajax(settings).then(function (response) {
  // console.log(response);
  console.log(response);
  $("#top10_recipe0").text(response[0].title);
  $("#top10_recipe1").text(response[1].title);
  $("#top10_recipe2").text(response[2].title);
  $("#top10_recipe3").text(response[3].title);
  $("#top10_recipe4").text(response[4].title);
  $("#top10_recipe5").text(response[5].title);
  $("#top10_recipe6").text(response[6].title);
  $("#top10_recipe7").text(response[7].title);
  $("#top10_recipe8").text(response[8].title);
  $("#top10_recipe9").text(response[9].title);

  $("#pic1").html(` <img src="${response[0].image}">`);

});
});


$("#find_d-recipe").on("click", function(event) {  
event.preventDefault();
var dIngredients = [];
dIngredients = $("#d-list").text();
console.log(dIngredients);
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + dIngredients,
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
    "x-rapidapi-key": "58a123ce77msh9e0a297c2162053p1c58d9jsn37d013719c3d"
  }
  
}

$.ajax(settings).done(function (response) {
  console.log(response);
  $("#drink_recipe0").text(response.drinks[0].strDrink);
  $("#drink_recipe1").text(response.drinks[1].strDrink);
  $("#drink_recipe2").text(response.drinks[2].strDrink);
  $("#drink_recipe3").text(response.drinks[3].strDrink);
  $("#drink_recipe4").text(response.drinks[4].strDrink);
  $("#drink_recipe5").text(response.drinks[5].strDrink);
  $("#drink_recipe6").text(response.drinks[6].strDrink);
  $("#drink_recipe7").text(response.drinks[7].strDrink);
  $("#drink_recipe8").text(response.drinks[8].strDrink);
  $("#drink_recipe9").text(response.drinks[9].strDrink);
});

});


// Google Map Div

var map;
var location_flag;  // name of grocery store

$("#HEB-button").on("click", function initialize (){
  var center = new google.maps.LatLng(window.latitude, window.longitude); //Austin
  console.log("hi")
  map = new google.maps.Map(document.getElementById('map'),{
      center: center,
      zoom: 11,
  });
  // Use google Places API to get list of grocery stores
  var request = {             // google requ-est to find desired place
      location: center,
      radius: 26100, // ~10 mile radius
      // types: ['supermarket'],
      name:['H-E-B'],
      // name:['HEB', 'Whole Foods', 'Trader Joes', 'Wheatsville Food Co-op','Sprouts Farmers Market','Natural Grocers','Royal Blue Grocery','Central Market','Avenue B Grocery & Market'],
  };

  location_flag =  new google.maps.InfoWindow();  // open info window on google map
  var service = new google.maps.places.PlacesService(map); // request search based on request obj
  service.nearbySearch(request, callback);
});

$("#WholeFoods-button").on("click", function initialize (){
var center = new google.maps.LatLng(window.latitude, window.longitude); //Austin
map = new google.maps.Map(document.getElementById('map'),{
    center: center,
    zoom: 10,
});
// Use google Places API to get list of grocery stores
var request = {             // google requ-est to find desired place
    location: center,
    radius: 26100, // ~10 mile radius
    types: ['supermarket'],
    name:['Whole Foods Market'],
    // name:['HEB', 'Whole Foods', 'Trader Joes', 'Wheatsville Food Co-op','Sprouts Farmers Market','Natural Grocers','Royal Blue Grocery','Central Market','Avenue B Grocery & Market'],
};

location_flag =  new google.maps.InfoWindow();  // open info window on google map
var service = new google.maps.places.PlacesService(map); // request search based on request obj
service.nearbySearch(request, callback);
});

$("#T-button").on("click", function initialize (){
  var center = new google.maps.LatLng(window.latitude, window.longitude); //Austin
  map = new google.maps.Map(document.getElementById('map'),{
      center: center,
      zoom: 10,
  });
  // Use google Places API to get list of grocery stores
  var request = {             // google requ-est to find desired place
      location: center,
      radius: 26100, // ~10 mile radius
      // types: ['supermarket'],
      name:['trader joes'],
      // name:['HEB', 'Whole Foods', 'Trader Joes', 'Wheatsville Food Co-op','Sprouts Farmers Market','Natural Grocers','Royal Blue Grocery','Central Market','Avenue B Grocery & Market'],
  };
  
  location_flag =  new google.maps.InfoWindow();  // open info window on google map
  var service = new google.maps.places.PlacesService(map); // request search based on request obj
  service.nearbySearch(request, callback);
  });


$("#F-button").on("click", function initialize (){
  var center = new google.maps.LatLng(window.latitude, window.longitude); //Austin
  map = new google.maps.Map(document.getElementById('map'),{
      center: center,
      zoom: 10,
  });
  // Use google Places API to get list of grocery stores
  var request = {             // google requ-est to find desired place
      location: center,
      radius: 26100, // ~10 mile radius
      // types: ['supermarket'],
      name:['fiesta mart'],
      // name:['HEB', 'Whole Foods', 'Trader Joes', 'Wheatsville Food Co-op','Sprouts Farmers Market','Natural Grocers','Royal Blue Grocery','Central Market','Avenue B Grocery & Market'],
  };
  
  location_flag =  new google.maps.InfoWindow();  // open info window on google map
  var service = new google.maps.places.PlacesService(map); // request search based on request obj
  service.nearbySearch(request, callback);
  });

  $("#S-button").on("click", function initialize (){
    var center = new google.maps.LatLng(window.latitude, window.longitude); //Austin
    map = new google.maps.Map(document.getElementById('map'),{
        center: center,
        zoom: 10,
    });
    // Use google Places API to get list of grocery stores
    var request = {             // google requ-est to find desired place
        location: center,
        radius: 26100, // ~10 mile radius
        // types: ['supermarket'],
        name:['Sprouts Farmers Market'],
        // name:['HEB', 'Whole Foods', 'Trader Joes', 'Wheatsville Food Co-op','Sprouts Farmers Market','Natural Grocers','Royal Blue Grocery','Central Market','Avenue B Grocery & Market'],
    };
    
    location_flag =  new google.maps.InfoWindow();  // open info window on google map
    var service = new google.maps.places.PlacesService(map); // request search based on request obj
    service.nearbySearch(request, callback);
    });


function callback(results, status){         // checks for legit response and servor errors
  if(status == google.maps.places.PlacesServiceStatus.OK){
    console.log("HERE")
      for (var i =0; i < results.length; i++){        // gets all grocery-store locations
          createMarker(results[i]);                   // adds to array 'results'
      }
  }
}

function createMarker(place){     // create red markers in map based on resulst from callback function
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function(){
      location_flag.setContent(place.name);
      location_flag.open(map, this);
  })
}
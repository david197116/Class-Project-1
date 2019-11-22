
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

});



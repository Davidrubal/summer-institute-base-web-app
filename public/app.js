//.map is used to do stuff with array

window.onload = () => 
{
  updateCarousel();
};

function updateCarousel() {
    
    const configElement = document.getElementById('project_config');
    if(configElement === null)
    {
        return; 
    }
    
    const directory = configElement.dataset.directory;
    console.log(`Looking for images in ${directory}`);
    
    const url = `/pun/sys/dashboard/files/fs/${directory}`;
    const options= {
        headers: {
            'Accept': 'application/json'
                 }
                   };  //key value pairs in {}
    
    fetch(url, options)  //promises to do something in the future, returns a promise
        .then((response) => {console.log(`fetch resolved at ${new Date().toISOString()}.`);
            return response;
        }).then((response) => response.json())
          .then((json) => json['files'])
          .then((files) => files.map((file) => file['name']))
          .then((files) => files.filter((file) => file.endsWith('png')))      //filter is select in ruby
          .then((files) => files.splice(0,9))
          .then((files) => {
              
              for(const file of files)
              {
                  
                  const image = document.getElementById(file);
                  
                  if(image !== null) //triple equals is strict equality, must be exactly the same thing, not just mathmatically equal
                  {
                      console.log(`skipping ${file} because its already on the page`);
                      continue;
                  }
                  
                  const imageUrl = `/pun/sys/dashboard/files/fs/${directory}/${file}`;
                  console.log(`Adding ${file} to the DOM`);   //Document object model
                  const newImage = document.createElement('div');
                  newImage.classList.add('carousel-item');
                  newImage.innerHTML = `<img class ="d-block w-100" src="${imageUrl}">`;
                  newImage.id = file;
                  
                  const parent = document.getElementById('image_carousel_inner');
                  parent.append(newImage);
                  
                  const indicators = document.getElementById('image_carousel_indicators');
                  const slideTo = indicators.children.length;
                  
                  const newIndicator = document.createElement('li');
                  newIndicator.setAttribute('data-target', '#image_carousel');
                  newIndicator.setAttribute('data-slide-to', slideTo);
                  
                  indicators.append(newIndicator);
              }
              
              
          });
          
          
    // "#{variable}"    
    // is the now "${variable}"
    
    console.log(`fetch called at ${new Date().toISOString()}.`);
    setTimeout(updateCarousel, 10000); //do this thing later (miliseconds)
}
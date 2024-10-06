//get the slider
const slider = document.getElementById('slider');

//get slider items (array.from)
var sliderImages = Array.from(document.querySelectorAll('.slider-container img'))

//get the number of the slides
var slidesNumbers = sliderImages.length

//current slide
var currentSlide = 1

//slide number
var slidesNumberElement = document.getElementById('slide-number')

//Controls Buttons
var nextButton = document.getElementById('next')
var prevButton = document.getElementById('prev')

//click on Controls Buttons
nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

//creat ul element
var paginationElement = document.createElement('ul')

//set id attribute for Ul
paginationElement.setAttribute('id' , 'pagin-ul')

//loop for li based on slides number
for(var i=1 ; i<= slidesNumbers ; i++) {
    //creat li
    var paginationItem = document.createElement('li')

    //set custom attribute for li
    paginationItem.setAttribute('data-index' , i)

    //set li Item content
    paginationItem.appendChild(document.createTextNode(i))

    //add the li Items to the main ul list
    paginationElement.appendChild(paginationItem)

}

//add  the ul element to the page
document.getElementById('indicators').appendChild(paginationElement);

//get the new ul
var paginationUl = document.getElementById('pagin-ul')

//get pagination items (array.from)
var paginationButtons = Array.from(document.querySelectorAll('#pagin-ul li'))

//loop through all pagination items
for(var i=0 ; i<paginationButtons.length ; i++){
    paginationButtons[i].onclick = function(){

        currentSlide = parseInt(this.getAttribute('data-index')); 

        checker();
    }
}


//trigger the checker function
checker();







//next slide function
function nextSlide(){
        currentSlide++;

        // Check if the current slide is greater than the total number of slides
        if (currentSlide > slidesNumbers) {
            currentSlide = 1; // Go back to the first slide
        }

        checker();
}

//previos slide function
function prevSlide(){
    if(prevButton.classList.contains('disabled')){
        //do nothing
        return false;
    }else{
        currentSlide--;
        checker();
    }

}



//create function for check the slide number
function checker(){
    //set the number of the slide
    slidesNumberElement.textContent = 'Slide #' + (currentSlide) + ' of ' + (slidesNumbers)

    //remove active classes
    removeActive()

    //set the active class on the current slide
    sliderImages[currentSlide-1].classList.add('active')

    //set the active class on the current pagination item
    paginationUl.children[currentSlide-1].classList.add('active')

    //check if current slide if the first
    if (currentSlide == 1){

        //add disable class on prev button
        prevButton.classList.add('disabled')
    }
    else{
        //remove disable class on prev button
        prevButton.classList.remove('disabled')
    }

    //check if current slide if the last
    if (currentSlide == slidesNumbers){

        //add disable class on next button
        nextButton.classList.add('disabled')
    }
    else{
        //remove disable class on next button
        nextButton.classList.remove('disabled')
    }

}

//remove active class from the image and pagination
function removeActive(){
    //loop through the images array
    sliderImages.forEach(function (image){
        image.classList.remove('active')
    });

    //loop through the buttons of the pagination array
    paginationButtons.forEach(function(buttons){
        buttons.classList.remove('active')
    }); 
}

let interval
// Automatic transition every 3 seconds
var startAutoSlide = () => {
    interval = setInterval(() => {
        nextSlide();
    }, 4000); // Change slide every 4 seconds
};

  // Stop the auto transition
var stopAutoSlide = () => {
    clearInterval(interval);
};

  // Start auto transition on page load
startAutoSlide();

  // Pause auto transition on hover
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);

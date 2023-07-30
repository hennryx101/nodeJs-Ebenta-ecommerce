import { Places } from "./places.js";

// select all the container 
const regionContainer = document.querySelector(".region");
const provinceContainer = document.querySelector(".province");
const municipalityContainer = document.querySelector(".municipality");
const baranggayContainer = document.querySelector(".baranggay");
const streetContainer = document.querySelector(".street");

const circle1 = document.querySelector(".circle1");
const circle2 = document.querySelector(".circle2");
const circle3 = document.querySelector(".circle3");
const circle4 = document.querySelector(".circle4");
const circle5 = document.querySelector(".circle5");

const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");
const line4 = document.querySelector(".line4");
const line5 = document.querySelector(".line5");

// this object store all the current selected address
let objKeys = {
    region: undefined,
    province: undefined,
    municipality: undefined,
    baranggay: undefined,
}

// first we look for the keys in the object then store it in a variable called regions then render the options
// function that responsible for displaying all the region
function displayRegion(){
    const regions = Object.keys(Places);
    createOption(regions, regionContainer);
}
// instantiate the function for displaying the region
displayRegion();

// function that responsible for displaying all the province
function displayProvince(){
    const region = objKeys.region;
    return Object.keys(Places[region].province_list);
}

// function that responsible for displaying all the municipalities
function displayMunicipality(){
    const region = objKeys.region;
    const province = objKeys.province;
    return Object.keys(Places[region].province_list[province].municipality_list);
}

// function that responsible for displaying all the baranggay
function displayBaranggay(){
    const region = objKeys.region;
    const province = objKeys.province;
    const municipality = objKeys.municipality;
    return Places[region].province_list[province].municipality_list[municipality].barangay_list;
}

// here is all the event listener that will look for changes

// this listener is responsible for any changes you do if you select in region field
// if theres any changes in the region field this functions fire

regionContainer.addEventListener("change", e => {
    e.preventDefault();
    // here i get the value of the target element
    objKeys.region = e.target.value;

    if(circle1.classList.contains("active")){
        circle1.classList.remove("active");
        circle2.classList.remove("active");
        circle3.classList.remove("active");
        circle4.classList.remove("active");
        circle5.classList.remove("active");

        line1.classList.remove("animate-line");
        line2.classList.remove("animate-line");
        line3.classList.remove("animate-line");
        line4.classList.remove("animate-line");
        line5.classList.remove("animate-line");

        line1.classList.add("remove-line");
        line2.classList.add("remove-line");
        line3.classList.add("remove-line");
        line4.classList.add("remove-line");
        line5.classList.add("remove-line");

    }
    line1.classList.remove("remove-line");
    circle1.classList.add("active");
    line1.classList.add("animate-line");

    // then we first remove all its child element
    provinceContainer.replaceChildren();
    municipalityContainer.replaceChildren();
    baranggayContainer.replaceChildren();

    // after we select then we called the display province to get all the province in your selected region this has a return value 
    // and we store it in a variable
    const provinces = displayProvince();
    // then create a element by calling the createOption
    createOption(provinces, provinceContainer);
});

// this listener is responsible for any changes you do if you select in province field
provinceContainer.addEventListener("change", e => {
    e.preventDefault();
    objKeys.province = e.target.value;

    if(circle2.classList.contains("active")){
        circle2.classList.remove("active");
        circle3.classList.remove("active");
        circle4.classList.remove("active");
        circle5.classList.remove("active");
        
        line2.classList.remove("animate-line");
        line3.classList.remove("animate-line");
        line4.classList.remove("animate-line");
        line5.classList.remove("animate-line");

        line2.classList.add("remove-line");
        line3.classList.add("remove-line");
        line4.classList.add("remove-line");
        line5.classList.add("remove-line");
    }
    line2.classList.remove("remove-line");
    circle2.classList.add("active");
    line2.classList.add("animate-line");

    municipalityContainer.replaceChildren();
    baranggayContainer.replaceChildren();

    const municipalities = displayMunicipality();
    createOption(municipalities, municipalityContainer);
});

// this listener is responsible for any changes you do if you select in municipality field
municipalityContainer.addEventListener("change", e => {
    e.preventDefault();
    objKeys.municipality = e.target.value;

    if(circle3.classList.contains("active")){
        circle3.classList.remove("active");
        circle4.classList.remove("active");
        circle5.classList.remove("active");
        
        line3.classList.remove("animate-line");
        line4.classList.remove("animate-line");
        line5.classList.remove("animate-line");

        line3.classList.add("remove-line");
        line4.classList.add("remove-line");
        line5.classList.add("remove-line");
    }

    line3.classList.remove("remove-line");
    line3.classList.add("animate-line");
    circle3.classList.add("active");
    
    baranggayContainer.replaceChildren();
    const baranggayList = displayBaranggay();
    createOption(baranggayList, baranggayContainer);
});

baranggayContainer.addEventListener("change", e => {
    e.preventDefault();
    
    if(circle4.classList.contains("active")){
        circle4.classList.remove("active");
        circle5.classList.remove("active");

        line4.classList.remove("animate-line");
        line5.classList.remove("animate-line");
        line4.classList.add("remove-line");
        line5.classList.add("remove-line");
    }
    line4.classList.remove("remove-line");
    circle4.classList.add("active");
    line4.classList.add("animate-line");
});

streetContainer.addEventListener("focusout", e => {
    e.preventDefault();
    
    if(circle4.classList.contains("active")){
        circle5.classList.remove("active");

        line5.classList.remove("animate-line");
        line5.classList.add("remove-line");
    }
    line5.classList.remove("remove-line");
    circle5.classList.add("active");
    line5.classList.add("animate-line");
});


// this function is a dynamic create element it is responsible for creating the option element then append to the parent elemenent
function createOption(list, parent){

    const option1 = document.createElement("option");
    option1.textContent = "Select";
    option1.setAttribute("hidden", '');
    parent.appendChild(option1);

    for(const name of list){ 
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        parent.appendChild(option);
    }
    
}
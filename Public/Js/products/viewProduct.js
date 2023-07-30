const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const viewProductForm = document.querySelector(".viewProductForm");
const delContainer = document.querySelector(".del");
const ulContainer = document.querySelector("ul");
const circleContainer = document.querySelector(".circleContainer");
const columnContainer = document.querySelector(".column");

// this runs when the page load.
document.addEventListener('DOMContentLoaded', function() {
        
    fetchProduct();
});

// fetch the product that is been selected.
async function fetchProduct() {
    const submitBtn = viewProductForm.querySelector("button");
    const nameField = viewProductForm.querySelector("#name");
    const priceField = viewProductForm.querySelector("#price");
    const stockField = viewProductForm.querySelector("#stock");
    const descriptionField = viewProductForm.querySelector("#description");
    const ratingField = viewProductForm.querySelector("#ratings");
    const originField = viewProductForm.querySelector("#origins");
    const div = document.createElement("div");

    div.addEventListener('click', (e) => deleteFunc(e));
    div.textContent = "DELETE";
    delContainer.appendChild(div);


    try {
        const res = await fetch(`/api/products/getProduct/${id}`, {
            method: "GET"
        });

        const data = await res.json();
        console.log(data);

        if(data.product){
            nameField.value = data.product.name;
            priceField.value = data.product.price;
            stockField.value = data.product.stock;
            descriptionField.value = data.product.description;
            originField.value = data.product.origins;
            createImage(data.product.gallery);
        }
       
    } catch (error) {
        console.log(error);
    }

}

// this runs when there is a changes on input file.
document.querySelector("#files").addEventListener('change', async (e) => {
    e.preventDefault();
    renderNewImage();
});

// this function render the image comming from the input file.
async function renderNewImage(){
    const files = document.querySelector("#files").files;
    console.log(files.files);
    if (circleContainer.hasChildNodes()) {
        const circles = document.querySelectorAll(".circle");
        circles.forEach(cr => {
            cr.remove();
        })
    }
    const imagesLi = ulContainer.querySelectorAll("li");
    imagesLi.forEach(img => {
        img.remove();
    });

    const addSlide = (file, index) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const src = e.target.result;

                console.log(src);
                generateImage(src, index);
                resolve();
            }
            reader.onerror = function(e) {
                reject(e);
            }
            reader.readAsDataURL(file);
        });
    };
    for (let i = 0; i < files.length; i++) {
        await addSlide(files[i], i);
    }
}

// for creating the image and feed to generate image function. 
function createImage(gallery) {
    let dataIndex = 0;
    gallery.forEach(image => {
        const src = `../../Imgs/${image}`;
        console.log(src);
        generateImage(src, dataIndex)
        dataIndex++
    });

    const inputHidden = document.createElement('input');
    inputHidden.setAttribute('type', 'file');
    inputHidden.setAttribute('name', 'file');
    inputHidden.setAttribute('multiple', '');
    inputHidden.classList.add("fileHidden");
    inputHidden.style.display = "none";

    let imageArray = [];
    gallery.forEach((img) => {
        imageArray.push(img);
    });

    const files = imageArray.map(async (filename) => {
        const imageUrl = `../../../Imgs/${filename}`;
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new File([blob], filename);
    });
    
    Promise.all(files)
    .then((fileArray) => {
            console.log(fileArray);
            const dataTransfer = new DataTransfer();
            for (const file of fileArray) {
                dataTransfer.items.add(file);
            }
            console.log(dataTransfer.files);
            inputHidden.files = dataTransfer.files;
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    columnContainer.appendChild(inputHidden);
}

// for generating a image.
function generateImage(fileNames, indexNo){

    const images = document.createElement("img");
    const slide = document.createElement("li");
    const circle = document.createElement("div");

    circle.classList.add("circle");
    
    slide.classList.add("slide");
    slide.setAttribute("data-current-slide", indexNo + 1);
    circle.setAttribute("data-current", indexNo + 1);

    if (indexNo === 0) {
        slide.setAttribute("data-active", "");
        circle.classList.add("active");
    }
    
    images.src = fileNames;
    slide.appendChild(images);
    circleContainer.appendChild(circle);
    ulContainer.appendChild(slide);
}

// for updating data.
viewProductForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updBtn = viewProductForm.querySelector("button");
    updBtn.textContent = "Updating...";
    const files = viewProductForm.querySelector("#files");
    const formData = new FormData();
    
    formData.append('name', viewProductForm.name.value);
    formData.append('price', viewProductForm.price.value);
    formData.append('stock', viewProductForm.stock.value);
    formData.append('description', viewProductForm.description.value);
    formData.append('origins', viewProductForm.origins.value);

    if(files.files.length > 0){
    for(let i = 0; i < files.files.length; i++){
            console.log(files.files, "----------", typeof(files.files));
            formData.append("files", files.files[i]);
        }
    }
    
    console.log(...formData);

    try {
        const res = await fetch(`/api/products/getProduct/${id}`, {
            method: "PATCH",
            body: formData
        });
    
        const data = await res.json();

        if(data.product){
            location.reload();
        }

        if(data.errors){
            updBtn.textContent = "Update";

            console.log(data.errors);
            Object.keys(data.errors).forEach((key) => {
                switch (key) {
                  case 'gallery':
                    imageE.textContent = data.errors[key].message;
                    break;
                  case 'name':
                    nameE.textContent = data.errors[key].message;
                    break;
                  case 'price':
                    priceE.textContent = data.errors[key].message;
                    break;
                  case 'stock':
                    stockE.textContent = data.errors[key].message;
                    break;
                  case 'description':
                    descriptionE.textContent = data.errors[key].message;
                    break;
                  case 'origins':
                    originE.textContent = data.errors[key].message;
                    break;
                  default:
                    break;
                }
            });
        }
        updBtn.textContent = "Update";

    } catch (error) {
        console.log(error);
    }
});

// for deleting data.
async function deleteFunc(e){
    try {
        const res = await fetch(`/api/products/getProduct/${id}`, {
            method: "DELETE"
        });
        const data = await res.json();

        if(data.result){
            window.location.href = "/products/products.html";
        }

    } catch (error) {
        console.log(error);
    }
}

// this is just a test function to remove image and update automatically
async function hiddenFunctionIfImgDeleteUpdateTheProduct(){
    
    const files = viewProductForm.querySelector("#files");
    const formData = new FormData();
    
    formData.append('name', viewProductForm.name.value);
    formData.append('price', viewProductForm.price.value);
    formData.append('stock', viewProductForm.stock.value);
    formData.append('description', viewProductForm.description.value);
    formData.append('origins', viewProductForm.origins.value);

    if(files.files.length > 0){
    for(let i = 0; i < files.files.length; i++){
            console.log(files.files, "----------", typeof(files.files));
            formData.append("files", files.files[i]);
        }
    }
    
    console.log(...formData);
    
    try {
        const res = await fetch(`/api/products/${id}`, {
            method: "PATCH",
            body: formData
        });
    
        const data = await res.json();

        if(data.product){
            console.log("product Updated");
            fetchProduct();
        }
    } catch (error) {
        console.log(error);
    }
}

export default  renderNewImage;

async function fetchAllProducts() {
    const tbody = document.querySelector(".tbody");

    try {
        const res = await fetch("/api/products/", {
            method: "GET"
        });

        const productData = await res.json();
        if(productData){
            productData.products.forEach(product => {
                const tr = document.createElement("tr");
                const tdname = document.createElement("td");
                tdname.setAttribute("data-cell", "Product");

                const tdprice = document.createElement("td");
                tdprice.setAttribute("data-cell", "Price");

                const tdstock = document.createElement("td");
                tdstock.setAttribute("data-cell", "Stock");

                const tdDescription = document.createElement("td");
                tdDescription.setAttribute("data-cell", "Description");

                const tdorigin = document.createElement("td");
                tdorigin.setAttribute("data-cell", "Origin");

                const tdratings = document.createElement("td");
                tdratings.setAttribute("data-cell", "Ratings");

                const tdView = document.createElement("td");
                tdView.setAttribute("data-cell", "View");
                
                const a = document.createElement("a");
                a.classList.add("btn-View");


                a.href = `viewproducts.html?id=${product._id}`;
                a.textContent = "Edit";
                
                tdname.textContent = product.name;
                tdprice.textContent = product.price;
                tdstock.textContent = product.stock;
                tdratings.textContent = product.ratings;
                tdorigin.textContent = product.origins;
                
                tdView.appendChild(a);
                tr.append(tdname, tdprice, tdstock, tdratings, tdorigin, tdView);

                tbody.appendChild(tr);
            });
        }
    } catch (error) {
        console.log(error);
    }
}

fetchAllProducts();
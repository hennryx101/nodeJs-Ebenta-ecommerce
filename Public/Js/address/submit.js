
    const addressForm = document.querySelector(".addressForm");
    const params = window.location.search;
    const id = new URLSearchParams(params).get("id");
    
    addressForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const regionContainer = document.querySelector(".region");
        const provinceContainer = document.querySelector(".province");
        const municipalityContainer = document.querySelector(".municipality");
        const baranggayContainer = document.querySelector(".baranggay");
        const streetContainer = document.querySelector(".street");
        
        // const circle1 = document.querySelector(".circle1");
        // const circle2 = document.querySelector(".circle2");
        // const circle3 = document.querySelector(".circle3");
        // const circle4 = document.querySelector(".circle4");
        // const circle5 = document.querySelector(".circle5");                        
    
        // if(regionContainer.value === '' || regionContainer.value === 'Select'){
        //     regionContainer.style.border = "1px solid red";
        //     circle1.style.opacity = 1;
        //     circle1.style.border = "1px solid red";
        //     circle1.style.backgroundColor = "red";
        // }
        // if(provinceContainer.value === '' || provinceContainer.value === 'Select'){
        //     provinceContainer.style.border = "1px solid red";
        //     circle2.style.opacity = 1;
        //     circle2.style.border = "1px solid red";
        //     circle2.style.backgroundColor = "red";
        // }
        // if(municipalityContainer.value === '' || municipalityContainer.value === 'Select'){
        //     municipalityContainer.style.border = "1px solid red";
        //     circle3.style.opacity = 1;
        //     circle3.style.border = "1px solid red";
        //     circle3.style.backgroundColor = "red";
        // }
        // if(baranggayContainer.value === '' || baranggayContainer.value === 'Select'){
        //     baranggayContainer.style.border = "1px solid red";
        //     circle4.style.opacity = 1;
        //     circle4.style.border = "1px solid red";
        //     circle4.style.backgroundColor = "red";
        // }
        // if(streetContainer.value === ''){
        //     streetContainer.style.border = "1px solid red";
        //     circle5.style.opacity = 1;
        //     circle5.style.border = "1px solid red";
        //     circle5.style.backgroundColor = "red";
        //     return;
        // }

        const address = {
            userid: id,
            region: regionContainer.value,
            province: provinceContainer.value,
            municipality: municipalityContainer.value,
            baranggay: baranggayContainer.value,
            street: streetContainer.value
        }
        
        try {
            const res = await fetch(`/api/auth/signup/${id}`, {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(address)
            });
            
            const data = await res.json();
            setTimeout(()=> {
                console.log(data.message);
                // if(data.message === "success"){
                    //     location.href = "/";
                    // }
            }, 1000);

        } catch (error) {
            console.log(error);
        }
        
    });

let title =document.getElementById("title");
let price =document.getElementById("price");
let taxes =document.getElementById("taxes");
let ads =document.getElementById("ads");
let discount =document.getElementById("discount");
let total =document.getElementById("total");
let count =document.getElementById("count");
let category =document.getElementById("category");
let submit =document.getElementById("submit");
let mood = "creat";
let tmp;//great global function

// upgdshvdjgs
//get total
function gettotal(){
    if(price.value!=""){
        let result =(+price.value+ +taxes.value+ +ads.value)
        - +discount.value
        total.innerHTML = result
        total.style.background ="#040"
    }else{
        total.innerHTML = ""
        total.style.background ="#a00d02"
    }
}


//creat product
if(localStorage.product != null){
    datapro =JSON.parse(localStorage.product)//to transform strand into object
}else{
    datapro = [];
}


submit.onclick = function(){
    let newpro = {
        title: title.value,  
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML, 
        count: count.value,
        category: category.value,
    };
    if(title.value !="" && price.value != "" && category.value !="" ){
        if(mood === "creat"){
            if(newpro.count > 1){
                for(let i = 0; i < newpro.count;i++){
                    datapro.push(newpro)// data in object will delete but in array push mylte objects
                }
            }else{
                datapro.push(newpro);
            }
        }else{
            datapro[ tmp ] = newpro;
            mood = "creat"
            submit.innerHTML="creat";
            count.style.display="block";
        }
        cleardata()
    }


    
    //save localstorage
    localStorage.setItem("product",   JSON.stringify(datapro));//to transform object into string 

   
    showdata()
    
    
}


//clear inputs

function cleardata(){

    title.value = "";
    price.value = "";
    taxes.value = "";
    discount.value = "";
    total.innerHTML ="";
    count.value = "";
    category.value = "";
    ads.value= "";
}


//read

function showdata(){
    let table = "";

    for(let i = 0; i < datapro.length; i++ ){
        table += `<tr>
                    <th>${i+1}</th>
                    <th>${datapro[i].title}</th>
                    <th>${datapro[i].price}</th>
                    <th>${datapro[i].taxes}</th>
                    <th>${datapro[i].ads}</th>
                    <th>${datapro[i].discount}</th>
                    <th>${datapro[i].total}</th>
                    <th>${datapro[i].category}</th>
                    <th><button onclick="updatedata(${i})" id="update">update</button></th>
                    <th><button onclick="deletedata(${i})" id="delete">delete</button></th>
                </tr>`
    }
    document.getElementById("tbody").innerHTML = table ; 
    let btndelete = document.getElementById("deleteall")
    if(datapro.length > 0){
        btndelete.innerHTML = `<button onclick = " deleteall()">delete All(${datapro.length})</button`
    }else{
        btndelete.innerHTML = ""
    }
    gettotal()
}
showdata()


//delete

function deletedata(i){
    datapro.splice(i,1) // splice used to delete item in araay by index
    localStorage.product = JSON.stringify(datapro)//delete from localStorage
    showdata() //refreach html
}

//deleteall

function deleteall(){
    localStorage.clear()//delete all iteam in localStorage
    datapro.splice(0)//delete all iteam in array
    showdata()//refreach html
}


//update

function updatedata(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    gettotal()
    count.style.display="none";
    discount.value = datapro[i].discount;
    category.value = datapro[i].category;
    submit.innerHTML = "update";
    mood = "update"
    tmp = i
    scroll({
        top:0,
        behavior: "smooth"
    })
}


//search
let searchmood= "title" ;

function getsearchmood(id){
    let search = document.getElementById("search")
    if(id === "searchtitle"){
        searchmood = "title";
    }else{
        searchmood = "Category";
    }
    search.placeholder = "Search By "+searchmood;
    search.focus()
    search.value ="";
    showdata()
}


function searchData(value) {
    let table = "";
    if (searchmood == "title") {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].title.toLowerCase().includes(value.toLowerCase())) {  // Corrected toLowerCase() here
                table += `<tr>
                    <th>${i}</th>
                    <th>${datapro[i].title}</th>
                    <th>${datapro[i].price}</th>
                    <th>${datapro[i].taxes}</th>
                    <th>${datapro[i].ads}</th>
                    <th>${datapro[i].discount}</th>
                    <th>${datapro[i].total}</th>
                    <th>${datapro[i].category}</th>
                    <th><button onclick="updatedata(${i})" id="update">update</button></th>
                    <th><button onclick="deletedata(${i})" id="delete">delete</button></th>
                </tr>`;
            }
        }

    } else {
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].category.toLowerCase().includes(value.toLowerCase())) {  // Corrected toLowerCase() here
                table += `<tr>
                    <th>${i}</th>
                    <th>${datapro[i].title}</th>
                    <th>${datapro[i].price}</th>
                    <th>${datapro[i].taxes}</th>
                    <th>${datapro[i].ads}</th>
                    <th>${datapro[i].discount}</th>
                    <th>${datapro[i].total}</th>
                    <th>${datapro[i].category}</th>
                    <th><button onclick="updatedata(${i})" id="update">update</button></th>
                    <th><button onclick="deletedata(${i})" id="delete">delete</button></th>
                </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}


//clean Data
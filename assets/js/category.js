var mytable =  "";

function onLoad(){
    

    const obj=JSON.parse(localStorage.getItem('category'));

    for (let i=0; i< obj.length; i++){
        mytable +=  "<tr>";
        mytable +=  "<td>"+ obj[i].id + "</td>";
        mytable +=  "<td><a class=\"" + obj[i].id + "\" href=\"#\">"+ obj[i].name + "</a> </td>";
        mytable +=  "<td class=\"" + obj[i].id + "\">" + obj[i].date + "</td>";
        mytable +=  "<td >"+ obj[i].user + "</td>";
        mytable +=  "<td> <a href=\"#\" data-id=\"" + obj[i].id + "\"onclick=\"edit_modal(this)\"> <button class=\"btn btn-sm\"> <i class=\"bi bi-pencil-square\"></i></button></a><a data-id=\"" + obj[i].id + "\"onclick=\"deleteData(this);\" href=\"#\"> <button type=\"button\" class=\"btn btn-sm btn-square btn-neutral text-danger-hover\"><i class=\"bi bi-trash\"></i></button></a> </td>";
        mytable +=  "</tr>";
    }
    document.getElementById("row-sent").innerHTML = mytable;
}

var current_name = "";

function updateData(){

    let categories = JSON.parse(localStorage.getItem("category"));
    let news = JSON.parse(localStorage.getItem("news"));

    var current_id = document.getElementById('id_update').value;
    var new_name = document.getElementById('name_update').value;
    
    const category_update ={
        'id': current_id,
        'name': new_name,
        'date': new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
        'user': 'Thành Đạt',
    };

    let text = "Are you sure you want to update?"
    if (confirm(text) == true) {
        for (let i=0; i< categories.length; i++){
            
            if (categories[i].id === category_update.id){
                categories[i].name = category_update.name;
                categories[i].date = category_update.date;
            }
        }

        for (let i=0; i< news.length; i++){
            if (news[i].category === current_name){
                news[i].category = category_update.name;
            }
        }

        $('#editModal').modal('hide');

        document.getElementsByClassName(current_id)[0].innerHTML = new_name;
        document.getElementsByClassName(current_id)[1].innerHTML = category_update.date;

        mytable = document.getElementById("row-sent").innerHTML;

        localStorage.setItem("category", JSON.stringify(categories));
        localStorage.setItem("news", JSON.stringify(news));
        alert("Successfully");
        
    }

}

function deleteData(btndel){
    var new_categories = [];
    let categories = JSON.parse(localStorage.getItem("category"));
    let news = JSON.parse(localStorage.getItem("news"));
    var idDelete = btndel.getAttribute('data-id');

    var name_delete = document.getElementsByClassName(idDelete)[0].innerHTML;

    for (let i=0; i< categories.length; i++){
        if (categories[i].id !== idDelete){
            new_categories.push(categories[i]);
        }
    }

    let text = "Are you sure you want to delete ID = " + idDelete;
    if (confirm(text) == true) {
        text = "You pressed OK!";
        if (typeof(btndel) == "object") {
            $(btndel).closest("tr").remove();
            mytable = document.getElementById("row-sent").innerHTML;

            for (let i=0; i< news.length; i++){
                if (news[i].category === name_delete){
                    news[i].category = "None";
                }
            }
            localStorage.setItem("category", JSON.stringify(new_categories));
            localStorage.setItem("news", JSON.stringify(news));
            alert("Successfully");
        } 
        else {
            return false;
        }
    } 
    else {
        
    }     

}

function saveData(){

    if (document.getElementById('name').value == ''){
        alert("Please fill the name!");
    }
    else{

        const category ={
            'id': 'ID'+ Math.floor(Math.random() * 100).toString(),
            'name': document.getElementById('name').value,
            'date': new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
            'user': 'Thành Đạt',
        };


        let categories = JSON.parse(localStorage.getItem("category"));

        if(categories===null){
            categories = [];
            categories.push(category);
            const setjson = JSON.stringify(categories);
            localStorage.setItem('category', setjson);   
        }
        else{
            categories.push(category);
            const setjson = JSON.stringify(categories);
            localStorage.setItem('category', setjson);   
        }
        
        alert("Successfully");
        $('#addModal').modal('hide');
        document.getElementById('name').value = "";


        mytable +=  "<tr>";
        mytable +=  "<td>"+ category.id + "</td>";
        mytable +=  "<td><a class=\"" + category.id + "\" href=\"#\">"+ category.name + "</a> </td>";
        mytable +=  "<td class=\"" + category.id + "\">" + category.date + "</td>";
        mytable +=  "<td >"+ category.user + "</td>";
        mytable +=  "<td> <a href=\"#\" data-id=\"" + category.id + "\"onclick=\"edit_modal(this)\"> <button class=\"btn btn-sm\"> <i class=\"bi bi-pencil-square\"></i></button></a><a data-id=\"" + category.id + "\"onclick=\"deleteData(this);\" href=\"#\"> <button type=\"button\" class=\"btn btn-sm btn-square btn-neutral text-danger-hover\"><i class=\"bi bi-trash\"></i></button></a> </td>";
        mytable +=  "</tr>";

        document.getElementById("row-sent").innerHTML = mytable;
    }
    
}


function add_modal(){
    $('#addModal').modal('toggle');
}


function edit_modal(id){
    var idData = id.getAttribute('data-id');

    var dataList = document.getElementsByClassName(idData);


    var nameData = dataList[0].innerHTML;


    $('#editModal').modal('toggle');
    $('#id_update').attr('value', idData);
    $('#name_update').attr('value', nameData);

    current_name = document.getElementById('name_update').value;
    
    
}

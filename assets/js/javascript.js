var mytable =  "";

function onLoad(){
    

    const obj=JSON.parse(localStorage.getItem('category'));

    for (let i=0; i< obj.length; i++){
        mytable +=  "<tr>";
        mytable +=  "<td>"+ obj[i].id + "</td>";
        mytable +=  "<td><a class=\"text-heading font-semibold\" id=\"" + obj[i].id + "\" href=\"#\">"+ obj[i].name + "</a> </td>";
        mytable +=  "<td>" + obj[i].date + "</td>";
        mytable +=  "<td>"+ obj[i].user + "</td>";
        mytable +=  "<td> <a href=\"#\" data-id=\"" + obj[i].id + "\"onclick=\"edit_modal(this)\"> <button class=\"btn btn-sm\"> <i class=\"bi bi-pencil-square\"></i></button></a><a data-id=\"" + obj[i].id + "\"onclick=\"deleteData(this);\" href=\"#\"> <button type=\"button\" class=\"btn btn-sm btn-square btn-neutral text-danger-hover\"><i class=\"bi bi-trash\"></i></button></a> </td>";
        mytable +=  "</tr>";
    }
    document.getElementById("row-sent").innerHTML = mytable;
}

function updateData(){

    let categories = JSON.parse(localStorage.getItem("category"));
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
            }
        }

        $('#editModal').modal('hide');
        document.getElementById(current_id).innerHTML = new_name;
        mytable = document.getElementById("row-sent").innerHTML;
        localStorage.setItem("category", JSON.stringify(categories));
        alert("Successfully");
        
    }

}

function deleteData(btndel){
    var new_categories = [];
    let categories = JSON.parse(localStorage.getItem("category"));
    var idDelete = btndel.getAttribute('data-id');

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
            localStorage.setItem("category", JSON.stringify(new_categories));
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
        $('#exampleModalCenter').modal('hide');
        document.getElementById('name').value = "";


        mytable +=  "<tr>";
        mytable +=  "<td>"+ category.id + "</td>";
        mytable +=  "<td><a class=\"text-heading font-semibold\" id=\"" + category.id + "\" href=\"#\">"+ category.name + "</a> </td>";
        mytable +=  "<td>" + category.date + "</td>";
        mytable +=  "<td>"+ category.user + "</td>";
        mytable +=  "<td> <a href=\"#\" data-id=\"" + category.id + "\"onclick=\"edit_modal(this)\"> <button class=\"btn btn-sm\"> <i class=\"bi bi-pencil-square\"></i></button></a><a data-id=\"" + category.id + "\"onclick=\"deleteData(this);\" href=\"#\"> <button type=\"button\" class=\"btn btn-sm btn-square btn-neutral text-danger-hover\"><i class=\"bi bi-trash\"></i></button></a> </td>";
        mytable +=  "</tr>";

        document.getElementById("row-sent").innerHTML = mytable;
    }
    
}


function add_modal(){
    $('#exampleModalCenter').modal('toggle');
}


function edit_modal(id){
    var idData = id.getAttribute('data-id');
    var nameData = document.getElementById(idData).innerHTML;

    $('#editModal').modal('toggle');
    $('#id_update').attr('value', idData);
    $('#name_update').attr('value', nameData);
    
}

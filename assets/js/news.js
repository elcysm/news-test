var mytable =  "";

function onLoad(){
    
    const news=JSON.parse(localStorage.getItem('news'));

    for (let i=0; i< news.length; i++){
        mytable +=  "<tr>";
        mytable +=  "<td>"+ news[i].id + "</td>";
        mytable +=  "<td><a class=\"text-heading font-semibold\" id=\"" + news[i].id + "\" href=\"#\">"+ news[i].title + "</a> </td>";
        mytable +=  "<td> <textarea cols=\"30\" rows=\"1\">" + news[i].content + "</textarea></td>";
        mytable +=  "<td> <img src=\""+ news[i].image + "\"></td>";
        mytable +=  "<td>" + news[i].date + "</td>";
        mytable +=  "<td> <span class=\"badge badge-success\">" + news[i].category + "</span></td>";
        mytable +=  "<td> <a href=\"#\" data-id=\"" + news[i].id + "\"onclick=\"edit_modal(this)\"> <button class=\"btn btn-sm\"> <i class=\"bi bi-pencil-square\"></i></button></a><a data-id=\"" + category.id + "\"onclick=\"deleteData(this);\" href=\"#\"> <button type=\"button\" class=\"btn btn-sm btn-square btn-neutral text-danger-hover\"><i class=\"bi bi-trash\"></i></button></a> </td>";
        mytable +=  "</tr>";
    }
    document.getElementById("row-sent").innerHTML = mytable;
}

// function getFilePath(){
//     $('input[type=file]').change(function () {
//         alert(this.files[0].mozFullPath);
//     });
// }
function saveData(){

    if (document.getElementById('title').value == ''){
        alert("Please fill all the black!");
    }
    else{

        const new_ ={
            'id': 'ID'+ Math.floor(Math.random() * 100).toString(),
            'title': document.getElementById('title').value,
            'content': document.getElementById('content').value,
            'image': './assets/img/favicon.png',
            'date': new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
            'category': document.getElementById('category').value,
        };



        let news = JSON.parse(localStorage.getItem("news"));

        if(news===null){
            news = [];
            news.push(new_);
            const setjson = JSON.stringify(news);
            localStorage.setItem('news', setjson);   
        }
        else{
            news.push(new_);
            const setjson = JSON.stringify(news);
            localStorage.setItem('news', setjson);   
        }
        
        alert("Successfully");
        $('#addModal').modal('hide');
        $("#addModal").on("hidden.bs.modal", function(){
            $(".modal-body").html("");
        });


        mytable +=  "<tr>";
        mytable +=  "<td>"+ new_.id + "</td>";
        mytable +=  "<td><a class=\"text-heading font-semibold\" id=\"" + new_.id + "\" href=\"#\">"+ new_.title + "</a> </td>";
        mytable +=  "<td> <textarea cols=\"30\" rows=\"1\">" + new_.content + "</textarea></td>";
        mytable +=  "<td> <img src=\""+ new_.image + "\"></td>";
        mytable +=  "<td>" + new_.date + "</td>";
        mytable +=  "<td> <span class=\"badge badge-success\">" + new_.category + "</span></td>";
        mytable +=  "<td> <a href=\"#\" data-id=\"" + new_.id + "\"onclick=\"edit_modal(this)\"> <button class=\"btn btn-sm\"> <i class=\"bi bi-pencil-square\"></i></button></a><a data-id=\"" + category.id + "\"onclick=\"deleteData(this);\" href=\"#\"> <button type=\"button\" class=\"btn btn-sm btn-square btn-neutral text-danger-hover\"><i class=\"bi bi-trash\"></i></button></a> </td>";
        mytable +=  "</tr>";

        document.getElementById("row-sent").innerHTML = mytable;
    }
    
}

function updateData(){

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




function add_modal(){
    $('#addModal').modal('toggle');
}


function edit_modal(id){
    var idData = id.getAttribute('data-id');
    var nameData = document.getElementById(idData).innerHTML;

    $('#editModal').modal('toggle');
    $('#id_update').attr('value', idData);
    $('#name_update').attr('value', nameData);
    
}

var mytable =  "";

function onLoad(){
    
    const news = JSON.parse(localStorage.getItem('news'));

    for (let i=0; i< news.length; i++){
        mytable +=  "<tr>";
        mytable +=  "<td>"+ news[i].id + "</td>";
        mytable +=  "<td> <a class=\"" + news[i].id + "\" href=\"#\">"+ news[i].title + "</a> </td>";
        mytable +=  "<td> <a id=\"content-news\" class=\"" + news[i].id + "\" readonly>" + news[i].content + "</a><a><i class=\"content-news bi bi-eye-fill\" data-id=\"" + news[i].id + "\" onclick=\"watch_content(this)\"></i></a></td>";
        mytable +=  "<td> <img id=\"img-display\" class=\"" + news[i].id + "\" src=\""+ news[i].image + "\"></td>";
        mytable +=  "<td class=\"" + news[i].id + "\">" + news[i].date + "</td>";
        mytable +=  "<td> <span class=\"badge badge-success " + news[i].id + "\">" + news[i].category + "</span></td>";
        mytable +=  "<td> <a href=\"#\" data-id=\"" + news[i].id + "\"onclick=\"edit_modal(this)\"> <button class=\"btn btn-sm\"> <i class=\"bi bi-pencil-square\"></i></button></a><a data-id=\"" + news[i].id + "\"onclick=\"deleteData(this);\" href=\"#\"> <button type=\"button\" class=\"btn btn-sm btn-square btn-neutral text-danger-hover\"><i class=\"bi bi-trash\"></i></button></a> </td>";
        mytable +=  "</tr>";
    }
    document.getElementById("row-sent").innerHTML = mytable;
}


        

function saveData(){


    if (document.getElementById('title').value == ''){
        alert("Please fill all the black!");
    }
    else{

        const new_ ={
            'id': 'ID'+ Math.floor(Math.random() * 100).toString(),
            'title': document.getElementById('title').value,
            'content': document.getElementById('text').value,
            'image': document.getElementById('image').value,
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
        document.getElementById('title').value = "";
        document.getElementById('text').value = "";
        document.getElementById('image').value = "";

        mytable +=  "<tr>";
        mytable +=  "<td>"+ new_.id + "</td>";
        mytable +=  "<td> <a class=\"" + new_.id + "\" href=\"#\">"+ new_.title + "</a> </td>";
        mytable +=  "<td> <a id=\"content-news\" class=\"" + new_.id + "\" readonly>" + new_.content + "</a><a><i class=\"content-news bi bi-eye-fill\"></i></a></td>";
        mytable +=  "<td> <img id=\"img-display\" class=\"" + new_.id + "\" src=\""+ new_.image + "\"></td>";
        mytable +=  "<td class=\"" + new_.id + "\">" + new_.date + "</td>";
        mytable +=  "<td> <span class=\"badge badge-success " + new_.id + "\">" + new_.category + "</span></td>";
        mytable +=  "<td> <a href=\"#\" data-id=\"" + new_.id + "\"onclick=\"edit_modal(this)\"> <button class=\"btn btn-sm\"> <i class=\"bi bi-pencil-square\"></i></button></a><a data-id=\"" + new_.id + "\"onclick=\"deleteData(this);\" href=\"#\"> <button type=\"button\" class=\"btn btn-sm btn-square btn-neutral text-danger-hover\"><i class=\"bi bi-trash\"></i></button></a> </td>";
        mytable +=  "</tr>";

        document.getElementById("row-sent").innerHTML = mytable;
    }
    
}

function updateData(){

    let news = JSON.parse(localStorage.getItem("news"));

    var current_id = document.getElementById('id_update').value;
    var new_title = document.getElementById('title_update').value;
    var new_content = document.getElementById('text_update').value;
    var new_image = document.getElementById('image_update').value;
    var new_category = document.getElementById('category_update').value;
    
    const new_update ={
        'id': current_id,
        'title': new_title,
        'content': new_content,
        'image': new_image,
        'date': new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }),
        'category': new_category,
    };

    let text = "Are you sure you want to update?"
    if (confirm(text) == true) {
        for (let i=0; i< news.length; i++){
            
            if (news[i].id === new_update.id){
                news[i].title = new_update.title;
                news[i].content = new_update.content;
                news[i].image = new_update.image;
                news[i].date = new_update.date;
                news[i].category = new_update.category;
            }
        }

        $('#editModal').modal('hide');

        document.getElementsByClassName(current_id)[0].innerHTML = new_title;
        document.getElementsByClassName(current_id)[1].innerHTML = new_content;
        document.getElementsByClassName(current_id)[2].src = new_image;
        document.getElementsByClassName(current_id)[3].innerHTML = new_update.date;
        document.getElementsByClassName(current_id)[4].innerHTML = new_category;

        mytable = document.getElementById("row-sent").innerHTML;
        localStorage.setItem("news", JSON.stringify(news));
        alert("Successfully");
        
    }

}

function deleteData(btndel){
    var news_delete = [];
    let news = JSON.parse(localStorage.getItem("news"));
    var idDelete = btndel.getAttribute('data-id');

    for (let i=0; i< news.length; i++){
        if (news[i].id !== idDelete){
            news_delete.push(news[i]);
        }
    }

    let text = "Are you sure you want to delete ID = " + idDelete;
    if (confirm(text) == true) {
        text = "You pressed OK!";
        if (typeof(btndel) == "object") {
            $(btndel).closest("tr").remove();
            mytable = document.getElementById("row-sent").innerHTML;
            localStorage.setItem("news", JSON.stringify(news_delete));
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

    let categories = JSON.parse(localStorage.getItem("category"));

    var options = "";

    for (let i=0; i < categories.length; i++){
        options += "<option value=\""+ categories[i].name +"\">" + categories[i].name + "</option>";
    }

    document.getElementById("category").innerHTML = options;

}

function watch_content(id){

    var idData = id.getAttribute('data-id');

    var dataList = document.getElementsByClassName(idData);

    var contentData = dataList[1].innerHTML;
    
    $('#view_content').val(contentData);


    $('#watchContent').modal('toggle');

}


function edit_modal(id){


    var idData = id.getAttribute('data-id');
    // alert(idData)
    
    var dataList = document.getElementsByClassName(idData);


    var titleData = dataList[0].innerHTML;
    var contentData = dataList[1].innerHTML;
    var imageData = dataList[2].getAttribute('src');
    var categoryData = dataList[4].innerHTML;


    
    $('#id_update').attr('value', idData);
    $('#title_update').attr('value', titleData);
    $('#text_update').val(contentData);
    $('#image_update').val(imageData);

    option_edit = "";
    let categories = JSON.parse(localStorage.getItem("category"));
    option_edit += "<option selected value=\""+ categoryData +"\">" + categoryData + "</option>";
    for (let i=0; i < categories.length; i++){
        if (categories[i].name !== categoryData){
            option_edit += "<option value=\""+ categories[i].name +"\">" + categories[i].name + "</option>";
        }
    }
    
    document.getElementById("category_update").innerHTML = option_edit;

    $('#editModal').modal('toggle');
    
}

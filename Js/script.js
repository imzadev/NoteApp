
const addThemebtn = document.querySelector('.add__note');
const cardThems = document.querySelector('.note__colors');
const cardTheme = cardThems.querySelectorAll('.note__color');
const cardThemcont = document.querySelector('.card_container');


var editable =[];
var count = 0;
addThemebtn.addEventListener('click' ,()=>{
    if(count%2 ==0){
        for(let i=0; i<cardTheme.length; i++) {
            setTimeout(function(){
                cardTheme[i].style.transform = 'translateY(0px)' ;
                cardTheme[i].style.display ='block' ;
            }, 50 * i);
        }
    }
    else {
        for(let i=0; i<cardTheme.length; i++) {
            setTimeout(function(){
                cardTheme[cardTheme.length -1 - i].style.transform = 'translateY(calc(${cardTheme.length -1 - i} * -40px))' ;
                cardTheme[cardTheme.length -1 - i].style.display ='none' ;
            }, 50 * i);
        }
    }
    count += 1;
})

cardTheme.forEach(elem =>{
    elem.addEventListener('click', ()=>{
        if(document.querySelector('.card_template')){
            document.querySelector('.card_template').remove();
        }

        let backcolor = elem.style.backgroundColor;
        let color = elem.style.color;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let cardDate = months[month]+" " +day+", " + year;

        addTasktoArray("add your notes her" , cardDate ,backcolor ,color );

    })
})


//empty array to store the tasks
let arrayOfTasks = [];

//check if theres tasks in local storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//trigger get data frome local storage fonction
getDataFromeLocalStorage();


//clic on task element 
cardThemcont.addEventListener('click', (e)=> {
    const card =  e.target.parentElement.parentElement.parentElement.parentElement ;

    //delet btn
    if (e.target.classList.contains("fa-trash")) {
        //remove element frome page
        card.remove();
        //remove task from local storage
        deleteTaskWith(card.getAttribute("card-id"))
    }
    
    if (e.target.classList.contains("btn-edit")){
        
            if(editable[cardThemcont] ){
                card.querySelector('.card__title').contentEditable = 'false';
                editable[cardThemcont] =false;
                card.querySelector('.card__edit').innerHTML = '<i class="fas fa-pen btn-edit"></i>';
                const titleEdited = card.querySelector('.card__title').innerHTML ;
                toggelStatuTaskWith(card.getAttribute("card-id") , titleEdited);
            }
            else {
                card.querySelector('.card__title').contentEditable = 'true';
                editable[cardThemcont] =true;
                card.querySelector('.card__edit').innerHTML = '<i class="fas fa-save btn-edit"></i>';
            }

        }
 

})


function addTasktoArray(taskText ,card_date ,card_background ,card_color) {
    //task data
    const task = {
        id:Date.now(),
        title: taskText,
        date: card_date,
        background: card_background,
        color: card_color,
        complet: false,
    }
    //push task to array tasks
    arrayOfTasks.push(task);
    //add task to page
    addElementsToPagesFrom(arrayOfTasks);
    //add task to local storage
    addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPagesFrom(arrayOfTasks) {
    cardThemcont.innerHTML =" "
        
    arrayOfTasks.forEach((task) => {
        let div = document.createElement('div');
        div.className= "card"; 
        div.setAttribute('card-id' , task.id);
    
        div.innerHTML =`
        <span class="card__title">
            <div>
            ${task.title}
            </div>
        </span>
        <span class="card__footer">
            <small class = "card__date">${task.date}</small>
            <span>
                <button class="card__edit"><i class="fas fa-pen btn-edit"></i></button>
                <button class="card__delit"><i class="fa-solid fa-trash"></i></button>
            </span>
        </span>
        `;
    
        const cardTitle = div.querySelector('.card__title');
    
        div.style.backgroundColor = task.background;
        div.style.color = task.color;
        cardTitle.style.color = task.color;
            
    
        cardThemcont.appendChild(div);
        })
}


function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromeLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementsToPagesFrom(tasks);
    }
}


function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
}

function toggelStatuTaskWith(taskId , taskTitleEdited) {
    for (let i = 0; i < arrayOfTasks.length ; i++) {
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].title == arrayOfTasks[i].title ?  (arrayOfTasks[i].title = taskTitleEdited ): (arrayOfTasks[i].title = arrayOfTasks[i].title);

        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}
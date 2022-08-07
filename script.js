//*************************** Practice and learn API in javascript ****************************
// const BDURL = "https://www.breakingbadapi.com/api/";

// fetch(BDURL).then((response)=>{
//     return response;    
// }).then((data)=>{
//     console.log(data);
// })

// const API = "https://www.breakingbadapi.com/api/characters"
// async function get(){
//     try{
//         const response = await fetch(API);
//         const data = await response.json();
//         // const x = Object.entries(data).map(v=>v);
//         // console.log(x)
//         printData(data);
//     }catch(e){
//         console.log("Error : ",e)
//     }
// }

// function printData(data){
//     let selectdiv = document.getElementById('select');

//     selectdiv.innerHTML=`
//         <select class='form-control w-50 ml-5 mt-3' onchange="getActor(this.value)">
//             <option>Select a character</option>
//             ${data.map(actor=>`<option>${actor.name}</option>`)}
//         </select>
//     `;

//     console.log(data)
// }

// async function getActor(name){
//     if(name != "Select a character"){
//         const response = await fetch(`${API}?name=${name}`);
//         const data = await response.json();
        
//         let actorElt = document.querySelector('#actorElt');
    
//         actorElt.innerHTML=`
//             <h1 style='margin:20px 30px;'>${data[0].name} (${data[0].nickname})</h1>
//             <h4 style='margin:10px 30px;'>${data[0].portrayed}</h4>
//             <img class="rounded mx-auto d-block" style='height:500px;' src="${data[0].img}">
//         `;   
//     }    
// }
// get();


// const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${Math.floor(Math.random() * 100) + 1}`;

// const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=3`;

const SEARCHAPIURL = "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const main = document.querySelector('main');
const search = document.querySelector('#search');
const searchbtn = document.querySelector('#searchbtn');
const footer = document.querySelector(' #footer');

getData(APIURL);
async function getData(url){
   try{
       const response = await fetch(url);
       const data = await response.json();
       console.log(data);
       console.log(data.page)
       showmovies(data.results);
       getpagination(data.page);
   }catch(e){
       console.log(e.message);
   }
}   

function showmovies(movies){
  
   main.innerHTML='';
   movies.forEach((movie) => {
       // const img=document.createElement('img');
       // img.src=IMGPATH+movie.poster_path;
       // document.body.appendChild(img);
       const movieEl = document.createElement('div');
       movieEl.classList.add('movie');
       movieEl.innerHTML = `
           <img src="${IMGPATH+movie.poster_path}" alt="${movie.title}">
           <div class="img-info">
               <h3>${movie.title}</h3>
               <span class='${getClassbyrate(movie.vote_average)}'>${movie.vote_average}</span>
           </div>
           <div class="overview">
               <h3>Overview</h3>
               ${movie.overview}
           </div>
       `;
       main.appendChild(movieEl);
   });
}

function getClassbyrate(vote){
   if(vote>=8){
       return 'green'
   }
   if(vote>=5){
       return 'orange'
   }
   if(vote>=0){
       return 'red'
   }
}

// search.onkeyup = (e)=>{
//     e.preventDefault();
//     if(search){
//         getData(SEARCHAPIURL+search.value);
//     }else{
//         getData(APIURL);
//     }
// }

function getpagination(page){
    let totalpages = page;
    footer.innerHTML='';
    const F_content = document.createElement('div');
    F_content.classList.add('footer-content');

    F_content.insertAdjacentHTML('afterbegin',"<button class='paginbtn'>Previous</button>");
    
    for(let i=0;i<totalpages;i++){
        if(i<4){
            F_content.innerHTML+=`
            <button class='paginbtn'>${i}</button>
        `;
        }     
        
    }
    F_content.innerHTML+=`<span style="color:#fff;">...</span><button class='paginbtn' style="margin-right:0.3rem; margin-left:0.3rem;">${totalpages}</button>`;
    F_content.insertAdjacentHTML('beforeend',"<button class='paginbtn'>Next</button>");
    footer.appendChild(F_content);

    return page;
}

searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(search.value.trim()!=""){
        getData(SEARCHAPIURL+search.value);
    }
    const numPage = getpagination();
    getpagination(numPage);
    
 })
const accessKey = 'R4e7ldjqkpMpP7jf27j5z1NowS-fKut8S14nHb1JXRU ';

const formEl=document.querySelector('form');
const inputEl=document.getElementById('serachInput');
const searchResultEl=document.querySelector(".searchResults");
const showMoreEl=document.getElementById('showMore');

let inputData='';
let page=1;

async function searchImages(){
    
    inputData= inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);
    const responce = await fetch(url);
    const data = await responce.json();  // this json formate holding all the date on the url

    const results=data.results;
    if (page===1){
        searchResultEl.innerHTML='';
    }

    results.map((results)=>{
        const imageWapper = document.createElement('div');
       imageWapper.classList.add('searchResult');
       const image = document.createElement('img');
       image.src = results.urls.small;
       image.alt=results.alt_description;
       const imageLink = document.createElement('a');
       imageLink.href = results.links.html;
       imageLink.target = '_blank';
       imageLink.textContent=results.alt_description;

       //apped child elements
       imageWapper.appendChild(image);
       imageWapper.appendChild(imageLink);
       searchResultEl.appendChild(imageWapper);
    });
    page++;
    if(page>1){
        showMoreEl.style.display='block';
    }
}

formEl.addEventListener('submit',(event)=>{
    event.preventDefault()
    page=1;
    searchImages();
});

showMoreEl.addEventListener('click',()=>{
    
    searchImages();
});
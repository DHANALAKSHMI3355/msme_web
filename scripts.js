const search=document.getElementById("search");

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

const links=document.querySelectorAll(".scheme-container a");

links.forEach(link=>{

if(link.textContent.toLowerCase().includes(value))
{
link.style.display="block";
}
else
{
link.style.display="none";
}

});

});
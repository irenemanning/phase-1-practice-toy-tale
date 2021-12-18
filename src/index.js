let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  //fetch andy's toys
  const fetchToys = () => {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => {
      
      let toysArray = data
      
      toysArray.forEach(obj => {
         addToytoCollection(obj)
      })
    })
  }
  fetchToys()

   function addToytoCollection(obj, key) {
      let toyCollection = document.getElementById('toy-collection')
      let toyCard = document.createElement('div')
      toyCard.className = 'card'
      toyCollection.append(toyCard)
      
      toyCard.innerHTML = 
        `<h2>${obj.name}</h2>` +
        `<img src=${obj.image} class="toy-avatar" />`+
        `<p>${obj.likes} Likes<p>`+
        `<button class="like-btn" id=${obj.id}>Like ❤️</button>`
        // update likes
      let likebuttons= document.getElementById(`${obj.id}`)
      likebuttons.addEventListener('click', () => {
        obj.likes++
        likebuttons.parentElement.parentElement.querySelector('p').innerText= `${obj.likes} Likes`
        updateLikes(obj)
      })
       
      
  //update likes
   const updateLikes = (obj) => {
     fetch(`http://localhost:3000/toys/${obj.id}`, {
       method: 'PATCH',
       headers:{
       "Content-Type": "application/json",
       Accept: "application/json"
      },
       body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
   }
//Help
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    console.log("click" + addToy)
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  toyFormContainer.addEventListener('submit', (e) => {
    e.preventDefault()
    postToy(e.target.name.value, e.target.image.value)
  })

   //create new toy with post
   const postToy = (name, imageUrl) => {
     fetch('http://localhost:3000/toys', {
       method: 'POST',
       headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "image": imageUrl,
          "likes": 0
        })
     })
     .then(resp => resp.json())
     .then(data => console.log(data))
   }
      
  }

});

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//Writing my code below:
//Fetch Andy's Toys & Add Toy info to the card:
fetch("http://localhost:3000/toys")
  .then((res)=>res.json())
  .then(function(data){
    const oldDiv = document.getElementById("toy-collection");
    for(const item of data){
      const newDiv = document.createElement("div");
      newDiv.className = "card";
      newDiv.setAttribute("id", item.id);
      oldDiv.appendChild(newDiv);
      //
      let h2 =  document.createElement("h2");
      let img = document.createElement("img");
      let p = document.createElement("p");
      let button = document.createElement("button");
      //
      newDiv.append(h2, img, p, button);
      //
      h2.textContent = item.name;
      img.src = item.image;
      img.className = "toy-avatar";
      p.textContent = item.likes + " Likes";
      button.className = "like-btn";
      button.id = item.id;
      button.textContent = "Like"
    }
  });

//Add A New Toy:
const form = document.querySelector(".add-toy-form");

form.addEventListener("submit", function(event){
  event.preventDefault();
  //Getting the values from the form:
  const name = form.querySelector("[name='name']").value;
  const image = form.querySelector("[name='image'").value;
  //Now JSON:
  const body = JSON.stringify({
    name: name,
    image: image,
    likes: 0
  });
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: body
    })
    .then((res)=>res.json())
    .then(function(data){
      const oldDiv = document.getElementById("toy-collection");
      const newDiv = document.createElement("div");
      newDiv.className = "card";
      newDiv.setAttribute("id", data.id);
      //
      let h2 =  document.createElement("h2");
      let img = document.createElement("img");
      let p = document.createElement("p");
      let button = document.createElement("button");
      //
      h2.textContent = data.name;
      img.src = data.image;
      img.className = "toy-avatar";
      p.textContent = data.likes + " Likes";
      button.className = "like-btn";
      button.id = data.id;
      button.textContent = "Like"
      //
      newDiv.append(h2, img, p, button);
      oldDiv.appendChild(newDiv);
    })
  });

//Increase a Toy's Likes
function likeCallback(e) {
  console.log("Like button was clicked");
  const card = e.target.closest(".card");
  const id = card.getAttribute("id");
  const p = card.querySelector("p");
  const likes = parseInt(p.textContent) + 1;

  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  })
    .then((res) => res.json())
    .then(function (data) {
      p.textContent = data.likes + " Likes";
    });
}

const toyCollection = document.getElementById("toy-collection");
toyCollection.addEventListener("click", function (e) {
  if (e.target.classList.contains("like-btn")) {
    likeCallback(e);
  }
});














// function likeCallback(e) {
//   console.log("Like button was clicked");
//   const card = e.target.closest(".card");
//   const id = card.getAttribute("id");
//   const p = card.querySelector("p.likes");
//   const likes = parseInt(p.textContent) + 1;

//   fetch(`http://localhost:3000/toys/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       "likes": likes
//     })
//   })
//     .then((res) => res.json())
//     .then(function (data) {
//       p.textContent = data.likes + " Likes";
//     });
// }

// const likeBtn = document.getElementsByClassName("like-btn");
// // console.log(likeBtn)
// const likeBtnArray = Array.from(likeBtn);

// likeBtnArray.forEach(function(item){
//   item.addEventListener("click", likeCallback);
// })

// for (const item of likeBtn){
//   item.addEventListener("click", likeCallback);
// }


// likeBtn.forEach(function (likeItem) {
//   likeItem.addEventListener("click", likeCallback);
// });





// for(const likeItem of likeBtn){
//   likeItem.addEventListener("click", likeCallback);
// }


// function likeCallback(e){
//   fetch(`http://localhost:3000/toys/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify({
//       "likes": likes
//     })
//   })
//     .then((res) => res.json())
//     .then(function (data){
//       const likeBtn = document.querySelectorAll(".like-btn");
//       const card = e.target.closest(".card");
//       const id = card.getAttribute("id");
//       const p = card.querySelector("p.likes");
//       const likes = parseInt(p.textContent) + 1;
//       p.textContent = data.likes + " Likes";
//     })
// }
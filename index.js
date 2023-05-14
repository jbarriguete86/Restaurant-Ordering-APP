import{ menuArray }  from "./data.js"

const completeBtn = document.getElementById('complete-order')
const totalPrice = document.getElementById('total-price')
const closeBtn = document.getElementById('close-modal-btn')
let priceArray=[]

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
})

function handleAddClick(itemSelected){
const chosenMenu = menuArray.filter(function(item){
   return item.id === parseInt(itemSelected)
})[0]

const orderContainer = document.getElementById('ordered-items-container')
let itemFeedHtml = ''
itemFeedHtml=
`
<div class="items-added">
                <div class="order-item">
                    <h1>${chosenMenu.name}</h1>
                    <p>remove</p>
                    <h3>$${chosenMenu.price}</h3>
                </div>
            </div>
`
priceArray.push(chosenMenu.price)
orderContainer.innerHTML += itemFeedHtml
 totalPrice.innerHTML = `$${calculateTotal()}` 
} 

function calculateTotal() {
    let total = 0;
    for (let i = 0; i < priceArray.length; i++) {
      total += priceArray[i];
    }
    return total;
  }
  
  completeBtn.addEventListener('click', function(){
      const Total = calculateTotal()
      if (Total === 0){
           console.log("cannot complete as you don't have anything in the cart")
      } else {
          document.getElementById('payment-details').classList.remove('modal')
      }
  })


function getFeedHtml(){  
let FeedHtml = ''

menuArray.forEach(function(element){
    let ingredientFeed =''

    if(element.ingredients.length > 0){
        element.ingredients.forEach(function(ingredientelem){
            ingredientFeed +=`
            <span>${ingredientelem},</span>
            `
        })
    }

FeedHtml+=`
<div class="item-container item-${element.id}">
                <div class="emoji-container">
                    <p class="food-emoji ${element.name}">${element.emoji}</p>
                </div>
                <div class="inner-text-cont">
                    <h1 class="food-title" data-name="${element.id}">${element.name}</h1>
                    <p class="food-description">${ingredientFeed}</p>
                    <h3 class="food-price" data-price="${element.id}">${element.price}</h3>
                </div>
                <div class="add-container">
                    <h1 class="add-btn"><a class="add-link" data-add="${element.id}" href="#">+</a></h1>
                </div>
            </div>
`

})

return FeedHtml
}

function render(){
    document.getElementById('feed').innerHTML= getFeedHtml()
 }
 
 render()
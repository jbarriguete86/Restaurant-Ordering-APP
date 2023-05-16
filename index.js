import{ menuArray }  from "./data.js"
import{ discountArray} from "./data.js"

const completeBtn = document.getElementById('complete-order')
const totalPrice = document.getElementById('total-price')
const paymentContainer = document.getElementById('payment-details')
const closeBtn = document.getElementById('modal-close-btn')
const payBtn = document.getElementById('pay-btn')
const discountBtn = document.getElementById('code-btn')
let priceArray=[]



// ADD AND REMOVEELEMENT TO THE ORDER
document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddClick(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        handleRemoveClick(e.target.dataset.remove)
    }
})

const orderContainer = document.getElementById('ordered-items-container')
let itemFeedHtml = ''

function handleAddClick(itemSelected){
const chosenMenu = menuArray.filter(function(item){
   return item.id === parseInt(itemSelected)
})[0]
itemFeedHtml=
`
<div class="items-added">
                <div class="order-item">
                    <h1>${chosenMenu.name}</h1>
                    <p data-remove="${chosenMenu.id}">remove</p>
                    <h3>$${chosenMenu.price}</h3>
                </div>
            </div>
`
priceArray.push(chosenMenu.price)
orderContainer.innerHTML += itemFeedHtml
 totalPrice.innerHTML = `$${calculateTotal()}` 
} 


function handleRemoveClick(itemSelected){
    const chosenMenu = menuArray.filter(function(item){
   return item.id === parseInt(itemSelected)
})[0]
    const itemToRemove = document.querySelector(`[data-remove="${itemSelected}"]`);
    const itemContainer = itemToRemove.closest('.items-added');
    itemContainer.remove();
    priceArray.pop(chosenMenu.price)
    totalPrice.innerHTML = `$${calculateTotal()}`
    handleDiscountCode()
}


// USE THE DISCOUNT CODE
discountBtn.addEventListener('click', function(){
   handleDiscountCode()
})

function handleDiscountCode(){
     let discountCode = document.getElementById('discount-code').value
    if (discountCode) {
        const chosenCode = discountArray.find(function(code) {
            return code.name === discountCode
         })

        if (chosenCode) {
            const filteredMenu = menuArray.filter(function(number){
            return  parseInt(chosenCode.id) === number.id
        })[0]
        const discountedPrice = (chosenCode.value*filteredMenu.price)/100
        if(calculateTotal()-discountedPrice >= 0){
            totalPrice.innerHTML = `$${calculateTotal()-discountedPrice}`
            }      
            } 
            discountCode =''
  } 
}
// EVENT LISTENERS TO THE DIFFERENT BUTTONS

completeBtn.addEventListener('click', function(){
    const Total = calculateTotal()
    if (Total === 0){
         console.log("cannot complete as you don't have anything in the cart")
    } else {
        paymentContainer.classList.remove('modal')
    }
})

closeBtn.addEventListener('click', function(){
    closeModalWindow()
})

function calculateTotal() {
  let total = 0;
  for (let i = 0; i < priceArray.length; i++) {
    total += priceArray[i];
  }
  return total;
}

payBtn.addEventListener('click', function(){
    const nameInput = document.getElementById('name-input')
    const cardNumber = document.getElementById('card-number')
    const CVV = document.getElementById('cvv-number')
    const orderContainer = document.getElementById('order')
    const paymentConfirmation = document.getElementById('payment-confirmation')
    
    if(nameInput.value && cardNumber.value && CVV.value ){
        let nameVar = nameInput.value
        paymentConfirmation.innerHTML=`
        <h1>Thanks ${nameVar}! Your order is on its way!</h1>`
        orderContainer.style.display = 'none'
        paymentConfirmation.style.display = 'flex'
        closeModalWindow()
        nameInput.value=''
        cardNumber.value=''
        CVV.value=''
        
    }  
})

function closeModalWindow(){
    paymentContainer.classList.add('modal')
}

//GENERATE THE FEED USING THE IMPORTED ARRAY

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
 

let tabBtn = document.querySelectorAll('.tab-btn'),
    foodContainer = document.querySelectorAll('.food-container'),
    filters = document.querySelector('#filters'),
    main = document.querySelector('.main');
sortByWork();

tabBtn.forEach(function (element) {
    element.addEventListener('click', function (event) {
        for (let button = 0; button < tabBtn.length; button++) {
            tabBtn[button].className = 'tab-btn';
        }
        this.className = 'tab-btn tab-btn-active';
        let categoryValue = this.getAttribute('data-for');
        let categoryItems = [];

        for (let i = 0; i < foodContainer.length; i++) {
            foodContainer[i].style.display = 'none';
            if (foodContainer[i].getElementsByClassName('category-input')[0].value.includes(categoryValue)) {
                foodContainer[i].style.display = 'flex';
            }
        }
        searchItem();
    })
})



// SEARCH BTN WORKING

let searchBtn = document.querySelector('#search-item');
searchBtn.addEventListener('input', searchItem)

function searchItem() {
    let searchInputVal = searchBtn.value.toLowerCase();

    let activeTab = document.querySelector('.tab-btn-active');

    for (let i = 0; i < foodContainer.length; i++) {
        if (foodContainer[i].getElementsByClassName('category-input')[0].value.includes(activeTab.getAttribute('data-for'))) {
            let foodName = foodContainer[i].getElementsByClassName('food-name')[0].innerText.toLowerCase();
            if (foodName.includes(searchInputVal)) {
                foodContainer[i].style.display = 'flex';
            } else {
                foodContainer[i].style.display = 'none';
            }
        }
    }
}








// SORT BY FUNCTIONALITY

let sortyByBtn = document.querySelector('.sorty-by');

sortyByBtn.addEventListener('click', sortByWork);

function sortByWork() {
    let fitlerVal = filters.value;

    if (fitlerVal == 'name') {
        let newValues = sortElements('food-name', foodContainer);
        main.innerHTML = "";
        for (let i = 0; i < newValues.length; i++) {
            main.appendChild(newValues[i]);
        }
    } else if (fitlerVal == 'pricedesc') {
        let newValues = sortElements('price-rate', foodContainer);
        main.innerHTML = "";
        for (let i = 0; i < newValues.length; i++) {
            main.appendChild(newValues[i]);
        }
    } else if(fitlerVal == 'priceasc'){
        let newValues = sortElements('price-rate', foodContainer);
        newValues.reverse();
        main.innerHTML = "";
        for (let i = 0; i < newValues.length; i++) {
            main.appendChild(newValues[i]);
        }
    }else if(fitlerVal == 'rating'){
        let newValues = sortElements('rating', foodContainer);
        main.innerHTML = "";
        for (let i = 0; i < newValues.length; i++) {
            main.appendChild(newValues[i]);
        }
    }
}



function sortElements(sortbyvalue, allelementsArr) {
    foodItemsArray = [];
    for (let j = 0; j < allelementsArr.length; j++) {
        foodItemsArray.push(allelementsArr[j].getElementsByClassName(sortbyvalue)[0].innerText);
    }
    // console.log(foodItemsArray)
    foodItemsArray = foodItemsArray.sort();
    if (parseInt(foodItemsArray[0])) {
        let newArray = [];
        for (let j = 0; j < foodItemsArray.length; j++) {
            newArray.push(parseInt(foodItemsArray[j]));
        }
        newArray.sort((a, b) => b - a);
        let ultraArr = [];
        for (let j = 0; j < newArray.length; j++) {
            if (!ultraArr.includes(newArray[j])) {
                ultraArr.push(newArray[j]);
            }
        }
        foodItemsArray = ultraArr;
    }

    let newitems = [];
    let nameItems = [];
    if (parseInt(allelementsArr[0].getElementsByClassName(sortbyvalue)[0].innerText)) {
        for (let i = 0; i < foodItemsArray.length; i++) {
            for (let j = 0; j < allelementsArr.length; j++) {
                if (parseInt(allelementsArr[j].getElementsByClassName(sortbyvalue)[0].innerText) == foodItemsArray[i]) {
                    newitems.push(allelementsArr[j]);
                    // console.log(allelementsArr[j].getElementsByClassName(sortbyvalue)[0].innerText)
                }
            }
        }
    } else {
        for (let i = 0; i < foodItemsArray.length; i++) {
            for (let j = 0; j < allelementsArr.length; j++) {
                if (allelementsArr[j].getElementsByClassName(sortbyvalue)[0].innerText.includes(foodItemsArray[i])) {
                    nameItems.push(allelementsArr[j]);
                }
            }
        }
    }
    if (newitems.length > 0) {
        return newitems;
    } else if (nameItems.length > 0) {
        return nameItems;
    } else {
        console.log("oops error");
    }
}

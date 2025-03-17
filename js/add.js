const containerSavingLoading = document.querySelector('.containerSavingLoading');
const overlayLoading = document.querySelector('.overlayLoading');

window.addEventListener('load', () => {
    const getData = JSON.parse(localStorage.getItem('getData')) || [];

    const cartbox = document.querySelector('.cartbox');
    getData.forEach(item => {

        const cartItem = document.createElement('div');
        cartItem.setAttribute('data-id', item.id);
        cartItem.setAttribute('data-price', item.originalP);
        cartItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'py-4', 'cartItem', 'border-bottom');
        cartItem.innerHTML = `
            <div class='containerImgCreate'><img src="${item.img}" width="60px" height="60px"> <div class="vr"></div></div>
            <div class='contianerContentCreate text-center'>
            <div class="d-flex align-items-center gap-2">
            <h6 class="titleCreate" style="font-size:15px;">${item.title}</h6>
            <h6 class="colorCreate" style="font-size:15px;">-${item.color}</h6>
            </div>

            <div class='containerSize d-flex align-items-center justify-content-center gap-4'>
            <h6 class="sizeTitle">Size:</h6>
            <h6 class="sizeCreate" data-id-size="${item.sizeId}">${item.size}</h6>
            </div>

            <div class="containerCountCreate btn-group btn-group-md">
                        <button class="btn btn-outline-secondary" id="decreaseCreaet">-</button>
                        <button class="btn btn-outline-secondary quantityCreate">${item.quantity}</button>
                        <button class="btn btn-outline-secondary" id="increaseCreate">+</button>
                    </div>
            </div>

            <div class="containerRemove d-block">

            <i class="bi bi-trash-fill removeCart"></i>

            <h6 class="priceCreate" style="font-size:14px; margin-top:10px;">${item.price}</h6>
            </div>
            `


        cartbox.appendChild(cartItem);
        updateCount();
        updateContainerNoItem();
        updatePrice();
        totalPrice();
        subTotalPrice();

        cartItem.querySelector('.removeCart').addEventListener('click', () => {

            overlayLoading.classList.add('active');
            containerSavingLoading.classList.remove('hidden');
            document.body.classList.add('active');

            setTimeout(() => {

                overlayLoading.classList.remove('active');
                containerSavingLoading.classList.add('hidden');
                document.body.classList.remove('active');

                cartItem.remove();

                let getData = JSON.parse(localStorage.getItem('getData')) || [];
                let getDataStock = JSON.parse(localStorage.getItem('getDataStock')) || [];
                let title = cartItem.querySelector('.titleCreate').textContent.trim();
                let size = cartItem.querySelector('.sizeCreate').textContent.trim();
                let colorCreate = cartItem.querySelector('.colorCreate').textContent.replace("-", "").trim();
                let idItem = cartItem.dataset.id;
                let quantity = cartItem.querySelector('.quantityCreate').textContent;
                let idSize = cartItem.querySelector('.sizeCreate').dataset.idSize;

                getData = getData.filter(item => !(item.title === title && item.size === size && item.color === colorCreate && item.id === idItem));
                localStorage.setItem('getData', JSON.stringify(getData));
                updateCount();
                updateContainerNoItem();
                totalPrice();
                subTotalPrice();
            }, 1500)

        });

        cartItem.querySelector('.containerCountCreate').addEventListener('click', event => {
            const quantity = cartItem.querySelector('.quantityCreate');
            let count = quantity.textContent;
            let getData = JSON.parse(localStorage.getItem('getData')) || [];
            let getDataStock = JSON.parse(localStorage.getItem('getDataStock')) || [];
            let title = cartItem.querySelector('.titleCreate').textContent.trim();
            let size = cartItem.querySelector('.sizeCreate').textContent.trim();
            let colorCreate = cartItem.querySelector('.colorCreate').textContent.replace("-", "").trim();
            let idItem = cartItem.dataset.id;

            if (event.target.id === 'decreaseCreaet' && count > 1) {

                overlayLoading.classList.add('active');
                containerSavingLoading.classList.remove('hidden');
                document.body.classList.add('active');

                setTimeout(() => {
                    overlayLoading.classList.remove('active');
                    containerSavingLoading.classList.add('hidden');
                    document.body.classList.remove('active');

                    count--;

                    const existItem = getData.findIndex(item => item.title === title && item.size === size && item.color === colorCreate && item.id === idItem);
                    if (existItem !== -1) {
                        getData[existItem].quantity = count;
                        localStorage.setItem('getData', JSON.stringify(getData));

                        console.log(getData[existItem])
                        updateCount();
                    }
                    quantity.textContent = count;
                    updatePrice();
                    totalPrice();
                    subTotalPrice();
                }, 1500)

            } else if (event.target.id === 'increaseCreate') {

                overlayLoading.classList.add('active');
                containerSavingLoading.classList.remove('hidden');
                document.body.classList.add('active');

                setTimeout(() => {
                    overlayLoading.classList.remove('active');
                    containerSavingLoading.classList.add('hidden');
                    document.body.classList.remove('active');

                    count++;

                    const existItem = getData.findIndex(item => item.title === title && item.size === size && item.color === colorCreate && item.id === idItem);
                    if (existItem !== -1) {
                        getData[existItem].quantity = count;
                        localStorage.setItem('getData', JSON.stringify(getData));

                        console.log(getData[existItem])
                        updateCount();
                    }
                    quantity.textContent = count;
                    updatePrice();
                    totalPrice();
                    subTotalPrice();
                }, 1500)
            }

            // const existItem = getData.findIndex(item => item.title === title && item.size === size && item.color === colorCreate && item.id === idItem);

            // if (existItem !== -1) {

            //     getData[existItem].quantity = count;
            //     localStorage.setItem('getData', JSON.stringify(getData));

            //     console.log(getData[existItem])
            //     updateCount();
            // }
            // quantity.textContent = count;

            // updatePrice();
            // totalPrice();
        })

    })



})

// update count shopping

const updateCount = () => {
    const countShopping = document.querySelector('.countShopping');

    let getData = JSON.parse(localStorage.getItem('getData')) || [];

    let count = 0;
    getData.forEach(item => {
        let quantity = parseInt(item.quantity);
        count += quantity;
    })

    countShopping.textContent = count;
}


// update containerNoItem 

const updateContainerNoItem = () => {
    const containerNoItem = document.querySelector('.containerNoItem');
    const contianerContentCreate = document.querySelectorAll('.contianerContentCreate');
    const containerGoShopping = document.querySelector('.containerGoShopping');
    const containerTotalCart = document.querySelector('.containerTotalCart');

    contianerContentCreate.length > 0 ? containerNoItem.classList.add('active') : containerNoItem.classList.remove('active');
    contianerContentCreate.length > 0 ? containerGoShopping.classList.add('active') : containerGoShopping.classList.remove('active');
    contianerContentCreate.length > 0 ? containerTotalCart.classList.add('active') : containerTotalCart.classList.remove('active');
}

// update price 

const updatePrice = () => {
    const cartItem = document.querySelectorAll('.cartItem');
    cartItem.forEach(item => {
        let priceOriginal = parseFloat(item.dataset.price.replace('$', ""));
        let quantity = parseInt(item.querySelector('.quantityCreate').textContent);
        let priceCreate = item.querySelector('.priceCreate');

        let total = priceOriginal * quantity;

        priceCreate.textContent = `$${total.toFixed(2)}`;
    })

}


// update price total 

const totalPrice = () => {
    const cartItem = document.querySelectorAll('.cartItem');

    let total = 0;

    cartItem.forEach(item => {
        let price = parseInt(item.querySelector('.priceCreate').textContent.replace('$', ''));
        total += price;
    })

    document.querySelector('.total').textContent = `$${total.toFixed(2)}`;
}

// sub total

const subTotalPrice = () => {
    const cartItem = document.querySelectorAll('.cartItem');
    let total = 0;
    cartItem.forEach(item => {
        let price = parseInt(item.querySelector('.priceCreate').textContent.replace('$', ''));
        total += price;
    })

    document.querySelector('.subTotal').textContent = `$${total.toFixed(2)}`;
}
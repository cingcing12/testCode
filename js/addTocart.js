// add cart

// color click
const color = document.querySelectorAll('.color');

color.forEach(item => {
    item.addEventListener('click', () => {

        color.forEach(item => item.classList.remove('activeColor'))
        item.classList.add('activeColor');

        addToCart.removeAttribute('disabled', '')
    })
})


const sizes = document.querySelectorAll('.size');

sizes.forEach(item => {
    item.addEventListener('click', () => {
        sizes.forEach(size => size.classList.remove('active'));
        item.classList.add('active');
        console.log(item)

    });
});


const cartbox = document.querySelector('.cartbox');
const addToCart = document.querySelector('.addToCart');
// addToCart.setAttribute('disabled', '');

// loading 

const containerSavingLoading = document.querySelector('.containerSavingLoading');
const overlayLoading = document.querySelector('.overlayLoading');


addToCart.addEventListener('click', event => {

    const containerAddCart = event.target.closest('.containerAddCart');
    const imgAddtoCart = containerAddCart.querySelectorAll('.imgAddToCart');
    const dataId = containerAddCart.dataset.id;
    const colorActive = containerAddCart.querySelector('.color.activeColor');
    const allColor = containerAddCart.querySelectorAll('.color');
    const dataPrice = containerAddCart.dataset.price;
    const title = containerAddCart.querySelector('.title').textContent;
    const sizeActive = containerAddCart.querySelector('.size.active');
    // const quantity = containerAddCart.querySelector('.quantity');
    const price = containerAddCart.querySelector('.price').textContent;

    if (!sizeActive || !colorActive) {
        alert('You need to select size and color first!');
        return;
    }

    addToCart.textContent = "Adding...";

    overlayLoading.classList.add('active');
    containerSavingLoading.classList.remove('hidden');
    document.body.classList.add('active');



    setTimeout(() => {
        addToCart.textContent = 'Add to cart'

        overlayLoading.classList.remove('active');
        containerSavingLoading.classList.add('hidden');
        document.body.classList.remove('active');


        let getdata = JSON.parse(localStorage.getItem('getData')) || [];

        const colorMacth = colorActive.dataset.color;
        const dataSize = sizeActive.dataset.name;

        const existItem = getdata.findIndex(item => item.title === title && item.size === sizeActive.textContent.trim() && item.color === colorActive.dataset.color);

        if (existItem !== -1) {

            getdata[existItem].quantity = parseInt(getdata[existItem].quantity) + 1;

            localStorage.setItem('getData', JSON.stringify(getdata));

            updateCount();

            let containerCountCreate = cartbox.querySelectorAll('.containerCountCreate');
            let itemExist = containerCountCreate[existItem];
            itemExist.querySelector('.quantityCreate').textContent = getdata[existItem].quantity;

            updatePrice();
            totalPrice();
            subTotalPrice();
            return;
        }
        let idDataSize = document.querySelector('.size.active').dataset.idSize;

        imgAddtoCart.forEach(item => {

            const imgData = item.dataset.color;

            if (imgData === colorMacth) {
                const img = item.src;


                const getdataStorage = {
                    id: dataId,
                    img: img,
                    title: title,
                    originalP: dataPrice,
                    size: dataSize,
                    quantity: 1,
                    color: colorMacth,
                    price: price,
                    sizeId: idDataSize
                }
                getdata.push(getdataStorage);

                localStorage.setItem('getData', JSON.stringify(getdata));
                const cartItem = document.createElement('div');
                cartItem.setAttribute('data-id', dataId);
                cartItem.setAttribute('data-price', dataPrice)
                cartItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'py-4', 'cartItem', 'border-bottom');
                cartItem.innerHTML = `
            <div class='containerImgCreate'><img src="${img}" width="60px" height="60px"> <div class="vr"></div></div>
            <div class='contianerContentCreate text-center'>
            <div class="d-flex align-items-center gap-2">
            <h6 class="titleCreate" style="font-size:15px;">${title}</h6>
            <h6 class="colorCreate" style="font-size:15px;">-${colorMacth}</h6>
            </div>

            <div class='containerSize d-flex align-items-center justify-content-center gap-4'>
            <h6 class="sizeTitle">Size:</h6>
            <h6 class="sizeCreate" data-id-size="${idDataSize}">${dataSize}</h6>
            </div>

            <div class="containerCountCreate btn-group btn-group-md">
                        <button class="btn btn-outline-secondary" id="decreaseCreaet">-</button>
                        <button class="btn btn-outline-secondary quantityCreate">1</button>
                        <button class="btn btn-outline-secondary" id="increaseCreate">+</button>
                    </div>
            </div>

            <div class="containerRemove d-block">

            <i class="bi bi-trash-fill removeCart"></i>

            <h6 class="priceCreate" style="font-size:14px; margin-top:10px;">${price}</h6>
            </div>
            `


                cartbox.appendChild(cartItem);

                updateCount();
                updateContainerNoItem();
                totalPrice();
                subTotalPrice();

                cartItem.querySelector('.removeCart').addEventListener('click', () => {

                    overlayLoading.classList.add('active');
                    containerSavingLoading.classList.remove('hidden');
                    document.body.classList.add('active');

                    setTimeout(() => {
                        cartItem.remove();

                        overlayLoading.classList.remove('active');
                        containerSavingLoading.classList.add('hidden');
                        document.body.classList.remove('active');

                        let getData = JSON.parse(localStorage.getItem('getData')) || [];
                        let getDataStock = JSON.parse(localStorage.getItem('getDataStock')) || [];
                        let title = cartItem.querySelector('.titleCreate').textContent.trim();
                        let size = cartItem.querySelector('.sizeCreate').textContent.trim();
                        let colorCreate = cartItem.querySelector('.colorCreate').textContent.replace("-", "").trim();
                        let idItem = cartItem.dataset.id;
                        let quantity = cartItem.querySelector('.quantityCreate').textContent;
                        let idSize = cartItem.querySelector('.sizeCreate').dataset.idSize;

                        let sizeAddStock = document.querySelectorAll('.size');

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
                    let title = cartItem.querySelector('.titleCreate').textContent.trim();
                    let size = cartItem.querySelector('.sizeCreate').textContent.trim();
                    let colorCreate = cartItem.querySelector('.colorCreate').textContent.replace("-", "").trim();
                    let idItem = cartItem.dataset.id;
                    // let sizeActive = parseInt(containerAddCart.querySelector('.size.active').dataset.stock);
                    let idSize = cartItem.querySelector('.sizeCreate').dataset.idSize;

                    if (event.target.id === 'decreaseCreaet' && count > 1) {
                        overlayLoading.classList.add('active');
                        containerSavingLoading.classList.remove('hidden');
                        document.body.classList.add('active');

                        setTimeout(() => {
                            count--;
                            overlayLoading.classList.remove('active');
                            containerSavingLoading.classList.add('hidden');
                            document.body.classList.remove('active');

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
                            count++;

                            overlayLoading.classList.remove('active');
                            containerSavingLoading.classList.add('hidden');
                            document.body.classList.remove('active');

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

                })

            }
        })
    }, 1500);
})


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

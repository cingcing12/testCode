const containerProduct = document.querySelectorAll('.containerProduct');

containerProduct.forEach(item => {
    const color = item.querySelectorAll('.color');
    let imgChange = ["https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-001-b-300x366.jpg", 'https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-01-c-300x366.jpg', 'https://websitedemos.net/t-shirts-store-04/wp-content/uploads/sites/1115/2022/07/product-01-d-300x366.jpg'];
    let img = item.querySelector('img');

    color.forEach((item, i) => {
        item.addEventListener('click', () => {

            img.src = imgChange[i];

            color.forEach(item => item.classList.remove('activeColor'))
            item.classList.add('activeColor');
        })
    })
    
})



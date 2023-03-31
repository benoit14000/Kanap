/*Plan

1) Aller chercher les canapés sur l'API

2) Aller chercher les données sur l'API

3) Injecter les canapés et les données sur la page principale

*/
let a = fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {

        let display = ''
        for (let article of data) {

            display += `
                        <a href="./product.html?id=${article._id}">
                        <article>
                        <img src="${article.imageUrl}" alt="${article.altTxt}">
                        <h3 class="productName">${article.name}</h3>
                        <p class="productDescription">${article.description}</p>
                        </article>
                        </a>
                        `
        }

        console.log(display)

        document.querySelector('#items').insertAdjacentHTML('beforeend', display)
    })

    .catch(err => console.log(err))
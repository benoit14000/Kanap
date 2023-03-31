//aller chercher les données des canapés sur local storage

let a = fetch("http://localhost:3000/api/products")
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("productData", JSON.stringify(data));
        const kanapData = JSON.parse(localStorage.getItem("productData"));


        //relier la page aux données de l'api

        let url = new URL(window.location.href);

        let id = url.searchParams.get("id");

        // Conformité de l'array de l'api avec l'id de la page


        let i = 0;
        while (id != (kanapData[i]._id)) {
            i++;
        }

        let imgUrl = kanapData[i].imageUrl
        let imgTxt = kanapData[i].altTxt
        let kanapName = kanapData[i].name
        let price = kanapData[i].price
        let desc = kanapData[i].description
        let colors = document.getElementById('colors');
        let quantite = parseInt(document.getElementById('quantity').value)

        // titre de la page du canapé
        let title = document.querySelector('title')
        title.innerText = kanapName

        // différents élements html du canapé
        document.querySelector('.item__img')
            .insertAdjacentHTML('afterbegin', `<img src="${imgUrl}" alt="${imgTxt}"></img>`);
        document.getElementById('title')
            .insertAdjacentHTML('afterbegin', `${kanapName}`);
        document.getElementById('price')
            .insertAdjacentHTML('afterbegin', `${price}`);
        document.getElementById('description')
            .insertAdjacentHTML('afterbegin', `${desc}`);

        // elements de la liste en fonction du nombre d'elements disponible   
        let c = 0
        for (let color of kanapData[i].colors) {
            colors
                .insertAdjacentHTML('afterbegin', `<option value=${kanapData[i].colors[c]}>${kanapData[i].colors[c]}</option>`);
            c++;
        }

        //décompte du nombre de canapés et export des données dans le localStorage
        let bouton = document.getElementById("addToCart")
        bouton.addEventListener('click', validation)

        // verification de la validité des elements choisis et ajout au panier
        function validation() {
            let quantite = parseInt(document.getElementById('quantity').value)
            if (!colors.value) {
                alert("Veuillez choisir une couleur")
                return
            }
            if (quantite <= 0 || quantite > 100) {
                alert("Veuillez choisir un nombre d'article compris entre 1 et 100")
                return
            }
            if (estEntier() === true) {
                isItemInCart()
            } else {
                alert("Veuillez choisir un nombre d'article")
            }
        }

        // chiffre entier
        function estEntier() {
            let quantite = Number(document.getElementById('quantity').value)
            if (Number.isInteger(quantite)) {
                return true
            }
            return false
        }

        //recuperation du panier existant ou renvoi d'une array vide
        function getCart() {
            let cartData = localStorage.getItem('Panier')
            if (!cartData) {
                return []
            }
            try {
                return JSON.parse(cartData)
            } catch {
                return []
            }
        }

        //verification du choix d'un canapé et édition de la quantité
        function isItemInCart() {
            let cart = getCart()
            for (let x = 0; x < cart.length; x++) {
                if (cart[x].ProductID === id && cart[x].color === colors.value) {
                    let newQty = parseInt(document.getElementById('quantity').value) + parseInt(cart[x].qty)
                    let kanapUpdate = {
                        ProductID: id,
                        color: colors.value,
                        qty: newQty
                    }
                    cart.splice(x, 1, kanapUpdate)
                    localStorage.setItem('Panier', JSON.stringify(cart))
                    return alert(`La quantité a bien été modifiée`)
                }
            }
            checkID()
        }

        // verification de la presence d'un canapé dans l'ID et regroupement des canapés et de l'id
        function checkID() {
            let cart = getCart()
            for (let x = 0; x < cart.length; x++) {
                if (cart[x].ProductID === id) {
                    let kanapUpdate = {
                        ProductID: id,
                        color: colors.value,
                        qty: parseInt(document.getElementById('quantity').value)
                    }
                    cart.splice(x, 0, kanapUpdate)
                    localStorage.setItem('Panier', JSON.stringify(cart))
                    validationAjout()
                    return
                }
            }
            addProduct()
        }

        // ajout de produit dans le panier
        function addProduct() {
            let kanapData = {
                ProductID: id,
                color: colors.value,
                qty: parseInt(document.getElementById('quantity').value)
            }
            let cart = getCart()
            cart.push(kanapData)
            localStorage.setItem('Panier', JSON.stringify(cart))
            validationAjout()
        }

        // notification d'un produit ajouté au panier
        function validationAjout() {
            if (document.getElementById('quantity').value > 1) {
                alert(`${document.getElementById('quantity').value} canapés ${kanapName} ${colors.value} ont été ajoutés au panier`)
            } else {
                alert(`${document.getElementById('quantity').value} canapé ${kanapName} ${colors.value} a été ajouté au panier`)
            }
        }

    })
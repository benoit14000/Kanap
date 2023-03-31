//vider le panier

localStorage.clear();

//confirmation de la commande et affichage du numéro de la commande

let url = new URL(window.location.href);
let id = url.searchParams.get("id");

document.getElementById("orderId").innerHTML = `${id}`;
const icon = document.querySelector('.carticon');
const items = document.querySelector('.itemquantity');
const cards = document.querySelector('.cards');
const bag = document.querySelector('.bag');
const cart = document.querySelector('.cart');
let flag = true;

let cartitems = [];

const init = async ()=>{
    const data =await fetch('data.json').then(res => res.json());
    console.log(data);
    addToCards(data);
}
init();

const addToCards = (data)=>{
        // let card = document.createElement('div');
        // let img = document.createElement('img');
        // let title = document.createElement('h3');
        // let price = document.createElement('h4');

        // title.innerText=`${data[0].name}`;
        // price.innerText = `${data[0].price}`;

        // card.append(title);
        // card.append(price);

    data.forEach(element => {
        let card = document.createElement('div');
        let img = document.createElement('img');
        let title = document.createElement('h3');
        let price = document.createElement('h4');
        let buybtn = document.createElement('button');

        buybtn.addEventListener('click',(()=>{
            addToCart(element);
        }))

        img.src = `${element.image}` ;
        title.innerText=`${element.name}`;
        price.innerText = `${element.price}$`;
        buybtn.innerText = "Add to Bag";    
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(buybtn);
        card.classList.add('card');
        cards.append(card);
    });

}

const addToCart = (ele)=>{
    if(cartitems[ele.id]){
        cartitems[ele.id]+=1 ;
    }
    else{
        cartitems[ele.id] = 1;
    }
    addingToCart(ele,cartitems);
}

const addingToCart = (ele,cartitems)=>{
    let name = document.createElement('h3');
    name.innerText = ele.name ;
    if(cartitems[ele.id]>1){
        let updatecount = document.getElementsByClassName(`${ele.id}`);
        updatecount[0].innerText = parseInt(updatecount[0].innerText)+1;
    }
    else{    
        let count = document.createElement('h3');
        count.innerText = cartitems[ele.id]
        let oneitem = document.createElement('li');

        oneitem.append(name);
        count.classList.add(`${ele.id.toString()}`);
        oneitem.append(count);
        bag.appendChild(oneitem);
    }
}

cart.addEventListener('click',()=>{
    if(!flag){
        bag.classList.add('hide');
        bag.classList.remove('show');
        flag = true;
        return;
    }
    bag.classList.add('show');
    bag.classList.remove('hide');
    flag = false;
})
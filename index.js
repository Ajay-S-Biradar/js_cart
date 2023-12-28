const icon = document.querySelector('.carticon');
const items = document.querySelector('.itemquantity');
const cards = document.querySelector('.cards');
const bag = document.querySelector('.bag');
const cart = document.querySelector('.cart');
const total = document.querySelector('.total');
const numberofitems = document.querySelector('.itemquantity');

let totalamt = 0;
let flag = true;

let cartitems = [];

const init = async ()=>{
    const data =await fetch('data.json').then(res => res.json());
    addToCards(data);
}
init();

const addToCards = (data)=>{
    data.forEach(element => {
        let card = document.createElement('div');
        let img = document.createElement('img');
        let title = document.createElement('h3');
        let price = document.createElement('h4');
        let buybtn = document.createElement('button');
        let rmbtn = document.createElement('button');
        rmbtn.innerText = "remove";
        buybtn.addEventListener('click',(()=>{
            addToCart(element);
        }))

        rmbtn.addEventListener('click',(()=>{
            removefromcart(element);
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
        card.appendChild(rmbtn);
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
    updatenoitem();
  }


const removefromcart = (ele) => {
    let i = 3;
    let count = parseInt(numberofitems.innerText);
    if(cartitems[ele.id]){
        while(i<bag.childNodes.length){
            if(bag.childNodes[i].classList.contains(ele.id)){
                bag.removeChild(bag.childNodes[i]);
                count-=1;
                numberofitems.innerText = count ;
                cartitems[ele.id]=0 ;
                // let nitem = parseInt
                console.log(bag.childNodes);
                // console.log(nitem);
                totalamt = totalamt - ele.price;
                // console.log(totalamt);
                total.innerText = totalamt;
                return ;
            }
            i+=1;
        }
    }
}

const subcartitem = (ele)=>{
    let i = 3;
    let count = parseInt(numberofitems.innerText);
    if(cartitems[ele.id]){
        while(i<bag.childNodes.length){
            if(bag.childNodes[i].classList.contains(ele.id)){
                let nitem = parseInt(bag.childNodes[i].childNodes[2].innerText);
                if(nitem==1){
                    bag.removeChild(bag.childNodes[i]);
                    numberofitems.innerText = count-1 ;
                    cartitems[ele.id]=0 ;
                    return ;
                }
                else{
                    bag.childNodes[i].childNodes[2].innerText = nitem-=1;
                    bag.childNodes[i].childNodes[4].innerText=nitem*ele.price;
                }
                return ;
            }
            i+=1;
        }
    }
}


const addingToCart = (ele,cartitems)=>{
    let name = document.createElement('h3');
    name.innerText = ele.name ;
    if(cartitems[ele.id]>1){
        let update = document.getElementsByClassName(`${ele.id}`);
        let count = (update[0]?.childNodes[2]) ;
        count.innerText = parseInt(count.innerText) + 1;
        let amt = (update[0].childNodes[4]);
        amt.innerText = ele.price * parseInt(count.innerText) ; 
        totalamt = totalamt - ele.price + ele.price * parseInt(count.innerText);
        total.innerHTML = 
        `<h3>Total Price: ${totalamt}</h3>`
    }
    else{    
        let count = document.createElement('h3');
        let inc = document.createElement('h4');
        let dcr = document.createElement('h4');
        let amt = document.createElement('h3');

        count.innerText = cartitems[ele.id]
        let oneitem = document.createElement('li');
        inc.classList.add('add');
        dcr.classList.add('sub');
        inc.addEventListener('click', () => {
            addToCart(ele);
        });

        dcr.addEventListener('click',(()=>{
            subcartitem(ele);
        }))

        inc.innerText = '>';
        dcr.innerText = '<';
        totalamt += ele.price ;
        amt.innerText = ele.price;
        oneitem.append(name);
        oneitem.classList.add(`${ele.id.toString()}`);
        oneitem.append(dcr)
        oneitem.append(count);
        oneitem.classList.add('bagitem');
        oneitem.append(inc)
        oneitem.append(amt);
        bag.appendChild(oneitem);

        total.innerHTML = 
        `<h3>Total Price: ${totalamt}</h3>`

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

const updatenoitem = ()=>{
    numberofitems.innerText = (bag.childNodes.length-3);
}
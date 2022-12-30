const API = 'https://api.giphy.com/v1/gifs/search?api_key='
const KEY = 'sTdCJjIAUz2fNDMUob8nqHx6G50HnUzP'
const limit = '&limit='
const rest = '&q='


const text = document.querySelector('.text')
const count = document.querySelector('.count')
const range = document.querySelector('.range')
const search = document.querySelector('.search')
const categoriesWrap = document.querySelector('.categoriesWrap')
const output = document.querySelector('.output')
const col = document.createElement('div')
const box = document.createElement('div')
// const box = document.createElement('.box')
// const control = document.createElement('div')

col.className = 'col'
box.className = 'box'
// control.className = 'control'

// document.body.append(control)
// control.append(text,range,)

const searchGiphy = async (cnt = 1,txt = 'marvel') => {
    try {
        const url = API + KEY + limit + cnt + rest + txt
        const request = await fetch(url)
        const response = await request.json()
        console.log(url);
        renderGiphy(response.data);
    } catch (err){
        console.log('error', err);
    }
}
searchGiphy()

const renderGiphy = (data) => {
    box.innerHTML = ''
    console.log(data);
    data.forEach(el => {
        const iframe = document.createElement('iframe')
        const title = document.createElement('h3')
        iframe.src = el.embed_url
        title.textContent = el.title
        // ? title.length>10
        // : `${title.length=10}...`
        // console.log(el.title.length);
        output.append(col)
        col.append(box)
        box.append(iframe,title)
    });
}


search.addEventListener('click', () => {

    let txt = text.value
    let cnt = count.value
    // console.log(txt,cnt);
    searchGiphy(cnt, txt)
    // console.log(txt);

})


const rangeN = () => {
    range.addEventListener('change', () => {
        countN()
        let val = range.value
        // console.log(val)
        document.getElementById('count').value=`${parseInt(val)}`;
        // console.log(document.getElementById('count'));
        // countN()
    })
    
}
rangeN()

const countN = () => {
    count.addEventListener('change', () => {
        let val2 = count.value
        console.log(val2)
        document.getElementById('range').value=`${parseInt(val2)}`;
        // console.log(document.getElementById('range'));
    })
}
countN()



const categories = ['batman', 'spiderman', 'pokemon', 'marvel']

let active = ''
let val = ''
const categoriesRender = () => {
    categoriesWrap.innerHTML = ''
    categories.forEach(el => {
        const button = document.createElement('button')
        button.textContent = el
        button.classList = 'shine-button'
        button.style.background = el === active ? 'red' : ''
        button.addEventListener('click', () => {
            active = el
            val = range.value
            categoriesRender()
            searchGiphy(val,el)
            console.log(active)
            console.log(searchGiphy(val,el))
        })
        categoriesWrap.append(button)
    })
}
categoriesRender()


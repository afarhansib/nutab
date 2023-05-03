
window.onload = async () => {
  // console.log()
  getQuote()

  apiKeyInput.value = localStorage.getItem("apikey")

  const headers = {
    "x-apikey": apiKeyInput.value,
    "content-type": "application/json",
    "cache-control": "no-cache"
  }

  const response = await fetch('https://nutab-4474.restdb.io/rest/links', { headers })
  const data = await response.json()
  console.log(data)

  for (const site of data) {
    // console.log()
    document.querySelector('body>main>div>div:last-child>button').insertAdjacentHTML("beforebegin", composeHTML(site))
  }
}

const composeHTML = site => {
  return `
      <a href="${site.link}">
        <img src="${site.img}" alt="${site.name}">
        <span>${site.name}</span>
      </a>
  `
}

const getQuote = () => {
  const qod = quotes[Math.floor(Math.random() * quotes.length)]
  if (qod.quote.length > 100) {
    getQuote()
    return
  }
  document.querySelector('blockquote>p').innerText = qod.quote
  document.querySelector('blockquote>div span').innerText = qod.author
}

const modalElement = document.querySelector('body>div')
const apiKeyInput = document.querySelector('body>div input')

document.querySelector('main>div>button').onclick = (e) => {
  modalElement.style.display = 'grid'
}

document.querySelector('body>div>main>div>button').onclick = (e) => {
  modalElement.style.display = 'none'
}
document.querySelector('body>div>main>div>button:last-child').onclick = (e) => {
  localStorage.setItem("apikey", apiKeyInput.value)
  location.reload()
}

document.querySelector('blockquote button').onclick = (e) => {
  getQuote()
}

document.querySelector('main>div>form').onsubmit = e => {
  const query = document.querySelector('main>div>form>input').value
  // alert(query)
  window.location.href = 'https://google.com/search?q=' + escape(query)
  e.preventDefault()
}
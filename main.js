const form = document.querySelector('.searchForm');//возвращает первый элемент который соответствует переданному selector 

function fetchResults(searchQuery) {
    const endpoint = `https://ru.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    fetch(endpoint)
        .then(response => response.json()
        ).then(data => {
            const results = data.query.search;
    displayResults(results);
    });
}

function displayResults(results) {
    const searchResults = document.querySelector('.searchResults');//сохранение ссылки в '.searchResults'
    searchResults.innerHTML = '';
    results.forEach(result => { //цикл по массиву результатов
        const url = encodeURI(`https://ru.wikipedia.org/wiki/${result.title}`)
        
        searchResults.insertAdjacentHTML('beforeend',
        `<div class="resultItem">
          <h3 class="resultItem-title">
            <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
          </h3>
          <span class="resultItem-snippet">${result.snippet}</span><br>
        </div>`
      );
    });
}

function searchResult(event) {

    event.preventDefault(); 
    const input = document.querySelector('.searchInput').value;//получение введенного значения
    const searchQuery = input.trim();
    fetchResults(searchQuery);
}

form.addEventListener('submit', searchResult);//отловить поисковый запрос при отправке формы


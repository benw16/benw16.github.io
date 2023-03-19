async function fetchDeals(url, containerId) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '19c42b1206msh2642f8552c5d027p13730fjsn37bad55b13d0',
            'X-RapidAPI-Host': 'scrapeninja.p.rapidapi.com'
        },
        body: `{"url":"${url}","headers":["X-Header: some-random-header"],"retryNum":2,"geo":"default","followRedirects":0,"timeout":8,"textNotExpected":["random-captcha-text-which-might-appear"],"statusNotExpected":[403,502]}`
    };

    const res = await fetch('https://scrapeninja.p.rapidapi.com/scrape', options);
    const json = await res.json();
    const html = json.body;
    const regex = /<p class="text-sm mb-none whitespace-pre-wrap">(.*?)<\/p>/s;
    const match = html.match(regex);
    const text = match[1];

    const textArray = text.split('\n');
    const formattedText = '<ul>' + textArray.map(item => {
        if (item !== '') {
          return `<li>${item}</li>`;
        }
      }).join('') + '</ul>';
      
    document.getElementById(containerId).innerHTML = formattedText;
}

fetchDeals('https://www.leafly.com/dispensary-info/nirvana-center-tempe/deals', 'nirvana-deals');
fetchDeals('https://www.leafly.com/dispensary-info/the-good-dispensary/deals', 'good-deals');
fetchDeals('https://www.leafly.com/dispensary-info/sol-flower-tempe/deals', 'sol-deals');



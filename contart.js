
// const flagImg = document.querySelector('.country-details img');  // Corrected selector
// fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
//     .then((res) => res.json())
//     .then((data) => {
//         console.log(data[0]);
//         flagImg.src = data[0].flags.svg;
//     })
//     .catch(error => console.error('Error fetching country details:', error));








document.addEventListener('DOMContentLoaded', () => {

    const countryName = new URLSearchParams(window.location.search).get('name');
    const flagImg = document.querySelector('.country-details img');
    const countryNameh1 = document.querySelector('.country-details h1')
    const nativename = document.querySelector('.native-name')
    const poluations = document.querySelector('.poluation');
    const regions = document.querySelector('.region');
    const subregion = document.querySelector('.sub-region');
    const capitals = document.querySelector('.capital');
    const Topleveldomain = document.querySelector('.Top-level-domain');
    const currencys = document.querySelector('.currency');
    const languagess = document.querySelector('.languages')
    const bordercuntriess=document.querySelector('.border-cuntries');
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then((res) => res.json())
        .then(([country]) => {

            flagImg.src = country.flags.svg;
            countryNameh1.innerText = country.name.common
            poluations.innerText = country.population.toLocaleString('en-IN')
            capitals.innerText = country.capital?.[0];
            regions.innerText = country.region

            Topleveldomain.innerText = country.tld.join(', ');

            if (country.capital) {
                capitals.innerText = country.capital?.[0];
            }

            if (country.subregion) {
                subregion.innerText = country.subregion
            }

            if (country.currencies) {
                currencys.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
            }

            if (country.languages) {
                languagess.innerText = Object.values(country.languages).join(', ')
            }


            if (country.name.nativeName) {
                nativename.innerHTML = Object.values(country.name.nativeName)[0].common
            }
            else {
                nativename.innerHTML = country.name.common
            }

          if(country.borders){
            country.borders.forEach((border)=>{
                console.log(border);
                 fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                 .then((res)=>res.json())
                 .then(([bordercountry])=>{
                    const borderCountrytag=document.createElement('a');
                    borderCountrytag.innerText=bordercountry.name.common;
                    borderCountrytag.href=`contary.html?name=${bordercountry.name.common}`
                    bordercuntriess.append(borderCountrytag);
                 })
            })
          }

        })
        .catch((error) => {
            console.error('Error fetching country details:', error);
        });
});


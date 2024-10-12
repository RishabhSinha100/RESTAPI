

const countryContainer = document.querySelector('.countries-container')
const filterbyregion=document.querySelector('.filter-by-region')
const searchinput=document.querySelector('.search-container');
const themechanger=document.querySelector('.theme-change')
 let allCountriesdata


fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data)=>{
       renderCountries(data) 
       allCountriesdata=data;
    })

    filterbyregion.addEventListener('change',(e)=>{
        fetch(`https://restcountries.com/v3.1/region/${filterbyregion.value}`)
        .then((res) => res.json())
        .then(renderCountries)
        });

    
function renderCountries(data){
    countryContainer.innerHTML=' '
    data.forEach(country => {
      
        const contryCard = document.createElement('a');
        contryCard.classList.add('country-card');
        contryCard.href = `contary.html?name=${country.name.common}`
        contryCard.innerHTML = `  
        <img src="${country.flags.svg}" alt="flag">
                    <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                        <p><b>Region: </b>${country.region} </p>
                        <p><b>Capital: </b>${country.capital?.[0]}</p>
                    </div>`
        countryContainer.append(contryCard)


    });
}
searchinput.addEventListener('input',(e)=>{
    console.log(e.target.value)
    
    const filteredCountries = allCountriesdata.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
   renderCountries(filteredCountries)
 
})

themechanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
})

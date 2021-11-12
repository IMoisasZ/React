import Item from '../components/Item'
export default function Country({children: country = null}) {
    if(!country){
        return <div>Impossível renderizr o país</div>
    }

    const demograficDensity = country.population / country.area
    const {flag, name, capital, region, population, area} = country

    return (
        <div className='border p-2 m-2 flex flex-row items-center space-x-2'>
            <img className='w-48' src={flag} alt={name} />
            <ul>
                <li><Item label='Nome:'>{name}</Item></li>
                <li><Item label='Capital:'>{capital}</Item></li>
                <li><Item label='Região:'>{region}</Item></li>
                <li><Item label='População:'>{population}</Item></li>
                <li><Item label='Area:'>{area}</Item></li>
                <li><Item label='Densidade demografica:'>{parseFloat(demograficDensity).toFixed(2)}</Item></li>
            </ul>
        </div>
    )
}
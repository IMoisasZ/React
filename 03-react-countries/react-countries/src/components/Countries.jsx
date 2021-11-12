import Country from "./Country"
export default function Countries({children: countries = []}) {
    let qtdePais = countries.length
    return (
        <div className='border p-2'>
            <h2 className='text-center'>{qtdePais > 1 ? qtdePais +' países' : qtdePais +' país'}</h2>

            {countries.map(country => {
               return <Country key={country.id}>{country}</Country>
            })}
        </div>
    )
}
function Test(props) {
    console.log(props);
    return (
        <div>Teste</div>
    )
}

export default Test

// Exemplo de utilização de props
/* <Test number={10} string='Teste' visible data={{a:1, b:2}} onclick={()=> console.log('Teste')}/> */
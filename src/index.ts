import { Calculadora } from "./Calculadora"
import { ExpresionAritmetica } from "./ExpresionAritmetica"
import { Fraccion } from "./Fraccion"
import { Signo } from "./types"

function main() {
    const expresion = new ExpresionAritmetica(
        new Fraccion(Signo.MAS, 2, 3),
        new Fraccion(Signo.MENOS, 7, 15)
    )

    const calculadora = new Calculadora(expresion)
    calculadora.resolver()
}

main()
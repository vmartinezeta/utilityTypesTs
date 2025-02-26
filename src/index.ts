type Signo = -1 | 1

type FraccionPura = {
    signo: Signo
    numerador: number
    denominador: number
    mas: (otra: FraccionPura) => FraccionPura
    toNumber: () => number
    toShortString:() => string
    toLargeString: () => string
}

type FraccionPuraOrNull = FraccionPura | null

type LargeString = `${string} ${number} / ${number}`

type ShortString = `${string}${number}`


interface IReducible {
    reducir: () => FraccionPura
}

type FraccionReducible = FraccionPura & IReducible

class Maxcd {
    static calcular(numero:number, otro:number) {
        const tabla = [numero, otro]
        let factorPrimo = 2
        const factores = []
        while(tabla.every(n => n>= factorPrimo)) {
            if (tabla.every(n => n % factorPrimo===0)){
                tabla[0] = tabla[0] / factorPrimo
                tabla[1] = tabla[1] / factorPrimo
                factores.push(factorPrimo)
            } else if (tabla.some(n => n % factorPrimo!==0)&& factorPrimo===2){
                factorPrimo++
            } else if (tabla.some(n => n % factorPrimo!==0)&& factorPrimo>2){
                factorPrimo +=2
            }
        }
        return factores.reduce((result:number, numero:number) => result*numero,1)
    }
}

class Fraccion implements FraccionReducible {
    public signo: Signo
    public numerador: number
    public denominador: number

    public constructor(signo: Signo, numerador: number, denominador: number) {
        this.signo = signo
        this.numerador = numerador
        this.denominador = denominador
        this.updateSigno()
    }

    updateSigno() {
        if (this.toNumber() < 0) {
            this.signo *= -1
            if (this.numerador < 0) {
                this.numerador *= -1
            } else if (this.denominador < 0) {
                this.denominador *= -1
            }
        }
    }

    toNumber() {
        return this.numerador / this.denominador
    }

    reducir() {
        const maxcd = Maxcd.calcular(this.numerador, this.denominador)
        return new Fraccion(this.signo, this.numerador/maxcd, this.denominador/maxcd)
    }

    mas(otra: FraccionPura) {
        const { signo, numerador } = otra
        this.numerador += signo * numerador
        this.updateSigno()
        return this
    }

    toLargeString(): LargeString {
        return `${this.signo > 0 ? "+" : "-"} ${this.numerador} / ${this.denominador}`
    }

    toShortString(): ShortString {
        return `${this.signo>0?"+":"-"}${this.toNumber()}`
    }

}

class Calculadora implements IReducible{
    public expresion: FraccionPura[]

    constructor(...expresion: FraccionPura[]) {
        this.expresion = expresion
    }

    reducir(): FraccionReducible {
        return this.expresion.reduce((result: FraccionPuraOrNull, fraccion: FraccionPura) => {
            if (!result) {
               return fraccion
            }
            return result.mas(fraccion)
        }, null) as FraccionReducible
    }
}


function main() {
    const SIGNO_MAS = 1 as const
    const SIGNO_MENOS = -1 as const

    const calculadora = new Calculadora(
        new Fraccion(SIGNO_MAS, 7, 3),
        new Fraccion(SIGNO_MENOS, 4, 3),
        new Fraccion(SIGNO_MENOS, 1, 3),
    )

    const fraccion = calculadora.reducir()
    const reducida = fraccion.reducir()
    console.log("Resultado: ", fraccion.toLargeString())
    console.log("Simplificada: ", reducida.toLargeString())
    console.log("Numero real: ", reducida.toShortString())
}

main()
import { Divisibilidad } from "./Divisibilidad"
import { Fraccion } from "./Fraccion"
import { TFraccionPura, TFraccionPuraOrNull, TFraccionReducible, TReducible} from "./types"


export class ExpresionAritmetica implements TReducible{
    public expresion: TFraccionPura[]

    constructor(...expresion: TFraccionPura[]) {
        this.expresion = expresion
    }

    reducir(): TFraccionReducible {
        this.homogenizar()
        return this.expresion.reduce((result: TFraccionPuraOrNull, fraccion: TFraccionPura) => {
            if (!result) return fraccion
            return result.mas(fraccion)
        }, null) as TFraccionReducible
    }

    homogenizar() {
        const mincm = this.expresion.reduce((r:number, b:TFraccionPura) => {
            return Divisibilidad.mincm(r,b.denominador)
        }, 1)

        this.expresion = this.expresion.map(t => {
            const antes = t.newInstance()
            const cociente = mincm / antes.denominador
            const numerador = antes.numerador*cociente
            return new Fraccion(antes.signo, numerador, mincm)
        }) 
    }
}
import { TReducible} from "./types";

export class Calculadora {
    constructor(public expresion:TReducible) {}

    resolver() {
        const fraccion = this.expresion.reducir()
        const reducida = fraccion.reducir()
        console.log("Resultado: ", fraccion.toLargeString())
        console.log("Simplificada: ", reducida.toLargeString())
        console.log("Numero real: ", reducida.toShortString())
    }
}
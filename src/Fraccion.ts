import { Divisibilidad } from "./Divisibilidad"
import { TFraccionPura, TFraccionReducible, TLargeString, TShortString, TSigno } from "./types"

export class Fraccion implements TFraccionReducible {
    public signo: TSigno
    public numerador: number
    public denominador: number

    public constructor(signo: TSigno, numerador: number, denominador: number) {
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
        const maxcd = Divisibilidad.maxcd(this.numerador, this.denominador)
        return new Fraccion(this.signo, this.numerador/maxcd, this.denominador/maxcd)
    }

    mas(otra: TFraccionPura) {
        const { signo, numerador } = otra
        this.numerador += signo * numerador
        this.updateSigno()
        return this
    }

    newInstance() {
        return new Fraccion(this.signo, this.numerador, this.denominador)
    }

    toLargeString(): TLargeString {
        return `${this.signo > 0 ? "+" : "-"} ${this.numerador} / ${this.denominador}`
    }

    toShortString(): TShortString {
        return `${this.signo>0?"+":"-"}${this.toNumber()}`
    }

}
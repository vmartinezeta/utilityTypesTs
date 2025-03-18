export enum Signo {
    MAS=1,
    MENOS=-1
}

export type TSigno = Signo

export type TFraccionPura = {
    signo: TSigno
    numerador: number
    denominador: number
    mas: (otra: TFraccionPura) => TFraccionPura
    toNumber: () => number
    toShortString:() => string
    toLargeString: () => string
    newInstance: () => TFraccionPura
}

export type TFraccionPuraOrNull = TFraccionPura | null

export type TLargeString = `${string} ${number} / ${number}`

export type TShortString = `${string}${number}`

export type TReducible = {
    reducir: () => TFraccionReducible
}

export type TFraccionReducible = TFraccionPura & TReducible
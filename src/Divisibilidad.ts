export class Divisibilidad {
    static maxcd(numero:number, otro:number) {
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

    static mincm(numero:number, otro:number) {
        let tabla = [numero, otro]
        let factor = 2
        const factores =[]
        while (tabla.reduce((total:number, actual:number)=>total+actual, 0)!==2) {
            if (tabla.every(n => n%factor!==0)){
                if (factor===2) {
                    factor++
                } else {
                    factor +=2
                }
            } else {
                factores.push(factor)
                tabla = tabla.map((n:number) => {
                    if (n % factor === 0) {
                        return n / factor
                    }
                    return n
                })
            }
        }
        return factores.reduce((producto:number, actual:number)=>producto*actual, 1)
    }
}
export interface Movimiento {
    "id":number,
    "cantidad":number,
    "tipo": 'ingreso' | 'gasto',
    "concepto": string,
}

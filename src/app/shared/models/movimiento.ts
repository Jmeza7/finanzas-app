export interface Movimiento {
    "id": string,
    "cantidad":number,
    "tipo": 'ingreso' | 'gasto',
    "concepto": string,
}

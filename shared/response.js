/**
 * Función genérica que maneja una petición de forma 
 * directa y sin procesado previo de la misma. 
 * @param {Object} data Objeto con los datos entregados 
 * por el usuario (si existe). 
 * @param {Object} error Objeto con el error entregado 
 * por el usuario (si existe). 
 * @returns error si no es nulo o indefinido, o de lo 
 * contrario, retorna data. 
 */
export default function(data, error){
    if(error){
        return error;
    } else {
        return data;
    }
}
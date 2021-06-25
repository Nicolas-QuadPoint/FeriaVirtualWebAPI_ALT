import Entity from './Entity.js';

import util from '../utilities/utilities.js';

class ResultadoID extends Entity{

    id_resultado = 0;

    constructor(){
        super();
    }

    buildFromArray(arr = []){

        this.id_resultado = arr[0];
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id_resultado = util.isNullOrUndefined(obj.id_resultado)? 0 : obj.id_resultado;

        } else {

            this.id_resultado = obj.id_resultado;

        }

    }

}

export default ResultadoID;
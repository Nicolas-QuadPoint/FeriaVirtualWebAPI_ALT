import Entity from './Entity.js';

class ParClaveValor extends Entity{

    id = 0;
    valor = 'valor'

    constructor(){
        super();
    }

    buildFromArray(arr = []){

        this.id = arr[0];
        this.valor = arr[1];
    }

    clone(obj={},safe=false){
        
        if(safe){

            this.id = util.isNullOrUndefined(obj.id)? 0 : obj.id;
            this.value = util.isNullOrUndefined(obj.value)? ' ' : obj.value;

        } else {

            this.id = obj.id;
            this.value = obj.value;

        }

    }

}

export default ParClaveValor;
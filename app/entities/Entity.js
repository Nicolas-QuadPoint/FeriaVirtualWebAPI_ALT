class Entity {

    constructor(){
    }

    //https://stackoverflow.com/a/52315304
/*
    constructor(props = {}){
        Object.assign(this,props);
    }
*/

    buildFromObject(obj = {}){
        Object.assign(this,obj);
    }

    buildFromArray(arr = []){
        //Do nothing
    }

    clone(obj = {},safe=false){
        //Do nothing
    }

    validate(){
        return false;
    }


}

export default Entity;
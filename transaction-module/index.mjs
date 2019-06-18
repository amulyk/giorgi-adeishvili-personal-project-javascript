export class Transaction{
    constructor(){
        this.store = {};
        this.scenario = [];
        this.logs = [];
    }

    async dispatch(scenario){
        this.scenario = scenario;
        let id = this.getIndex();
        this.checkProperties();
            let i = 0;
            let count = 0;
            let len = id.length;
            
            while(i != len){
                try {
                let logObj = {}
               if(this.scenario[count].index === id[i]){
                let index = this.scenario[count].index;
                let storeBefore = this.scenario[count];
                let storeAfter = await this.scenario[count].call(this.scenario);
                let meta = this.scenario[count].meta;
                let error = null;
                logObj = {
                    index: index,
                    meta: meta, 
                    storeBefore: storeBefore,
                    storeAfter: storeAfter,
                    error: error
                }
                this.logs.push(logObj);
                logObj = {};
                   i++;
                   count = 0;
               }
               else count++;
            }  catch (err){  
                let index = this.scenario[count].index;
                        let meta = this.scenario[count].meta;
                        let name = err.name;
                        let message = err.message;
                        let stack = err;
                        let error = {name, message, stack};
                let logObj = {
                    index: index,
                    meta: meta, 
                    error: error
                }       
                this.logs.push(logObj);
                while(i < len){
                    try{
                        let logObj = {};
                    if(this.scenario[count] !== undefined && this.scenario[count].index === id[i]){
                       
                        if(this.scenario[count].restore){
                                let restore = await this.scenario[count].restore(this.scenario[count]);
                                    let index = this.scenario[count].index;
                                    let storeBefore = this.scenario[count];
                                    let storeAfter = restore;
                                    let meta = this.scenario[count].meta;
                                    this.store = null;
                                    logObj = {
                                        index: index,
                                        meta: meta, 
                                        storeBefore: storeBefore,
                                        storeAfter: storeAfter,
                                        error: null
                                    }
                                    this.logs.push(logObj);
                                    logObj = {};
                                i++;
                                count = 0;
                        }
                    } else {
                        count++;
                    }
                    } catch (err) {
                        throw err;
                    }
                }
        }
    }
    };

    getIndex(){
        let indexes = [];
        this.scenario.forEach(element => {
            indexes.push(element.index);
        }); 
        indexes.sort();
        return indexes;
    }

    checkProperties(){
        this.scenario.forEach(element => {
            if(!element.index){
                throw new Error('Please, add index in scenario');
            }

            if(!element.meta){
                throw new Error('Please, add information to scenario');
            } else if(element.meta){
                let keys = Object.getOwnPropertyNames(element.meta);
                const title = keys.indexOf('title');
                const description = keys.indexOf('description');
                if(!(keys.length === 2 && keys[title] === 'title' && keys[description] === 'description')){
                    throw new Error('Wrong meta');
                }
            }
            if(!element.call){
                throw new Error('call method is required');
            } 
        });  
    }
}

export class Transaction{
    constructor(){
        this.store = {};
        this.scenario = [];
        this.logs = [];
    }

    async dispatch(scenario){
        this.scenario = scenario;
        let id = this.getIndex();
        const exists = this.checkProperties();
        
        if(exists){
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
        let exists = false;
        let cpElement;
        this.scenario.forEach(element => {
            if(!element.index){
                let err = new Error('Please, add index to scenario');
                cpElement = element;
                cpElement.error = {};
                cpElement.error.name = err.name;
                cpElement.error.message = err.message;
                cpElement.error.stack = err.stack;
                this.logs.push(cpElement);
                throw err;
            }

            if(!element.meta){
                let err = new Error('Please, add information to scenario');
                cpElement = element;
                cpElement.error = {};
                cpElement.error.name = err.name;
                cpElement.error.message = err.message;
                cpElement.error.stack = err.stack;
                this.logs.push(cpElement);
                throw err;
            } else if(element.meta){
                let keys = Object.getOwnPropertyNames(element.meta);
                const title = keys.indexOf('title');
                const description = keys.indexOf('description');
                if(title === 0 && description === 1){
                    exists = true;
                }
            }

            if(!element.call){
                exists = false;
            }
        });

        if(exists){
            return true;
        } else return false;   
    }
}

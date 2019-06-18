import { schema } from './schema.mjs';
import { Validate } from './validate.mjs';
export class Transaction extends Validate{
    constructor(){
        super();
        this.store = {};
        this.scenario = [];
        this.logs = [];
    }
    async dispatch(scenario){
        this.scenario = scenario;
        let id = this.getIndex();
        super.validateScenarios(scenario, schema);
            let i = 0;
            let count = 0;
            let len = id.length;
            while(i < len){
                if(count === len){
                    count = 0;
                }
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
                if(this.scenario[count].index === 1 || this.scenario[count].index === id[len-1]){
                    throw err;
                }    
                if(scenario[count].silent == false || scenario[count].silent == undefined){
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
                let i1 = i;
                    let len1 = len;
                while(i1 < len){
                    try{
                        let logObj = {};
                    if(this.scenatio[count] !== undefined && this.scenario[count].index === id[i1]){
                        if(this.scenario[count].restore !== undefined){
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
                                count = 0;
                        }
                    } else {
                        count++;
                        
                    }
                    } catch (err) {
                        throw err;
                    }
                    i1++;
                }
            } else if(scenario[count].silent == true){
                try{
                await scenario[count].call(this.scenario);
                count++;
            }catch {
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
                count++;
             }
            }    
            i++;   
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
}



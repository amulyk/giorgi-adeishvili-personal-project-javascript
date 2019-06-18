import { Transaction } from './transaction-module';

const scenario = [
    {
        index: 2,
        meta: {
            title: 'Read popular customers 2',
            description: 'This action is responsible for reading the most popular customers',
            // age: 5
        },
        // callback for main execution
        call: async (store) => {            
            let obj = store
            return obj;          
        },
        restore: async () => {

        }
    },
    {
        index: 1,
        meta: {
            title: 'Read popular customers 1',
            description: 'This action is responsible for reading the most popular customers'
        },
        // callback for main execution
        call: async (store) => {
            throw new Error('Something is wrong');
        },
        restore: async () => {
            return 'restored';     
          }
    },
    {
        index: 3,
        meta: {
            title: 'Read popular customers 3',
            description: 'This action is responsible for reading the most popular customers'
        },
        // callback for main execution
        call: async (store) => {

            return 'great';  
        },        
        restore: async () => {
            return 'great';          
        }
    }
];

const transaction = new Transaction();
(async() => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store; // {} | null
        const logs = transaction.logs; // []
        console.log(store);
        console.log(logs);
    } catch (err) {
        console.log(err);
        // Send email about broken transaction
    }
})();

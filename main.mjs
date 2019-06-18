import { Transaction } from './transaction-module';

const scenario = [
    {
        index: 2,
        meta: {
            title: 'Read popular customers 2',
            description: 'This action is responsible for reading the most popular customers',
        },
        silent: true,
        // callback for main execution
        call: async (store) => {            
            throw new Error('Transaction Failed');        
        },
        restore: async () => {
            return 'restored';
        }
    },
    {
        index: 1,
        meta: {
            title: 'Read popular customers 1',
            description: 'This action is responsible for reading the most popular customers'
        },
        silent: true,
        // callback for main execution
        call: async (store) => {
            let obj = store
            return obj; 
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
             let obj = store
            return obj;  
        }   
    },
    {
        index: 4,
        meta: {
            title: 'Read popular customers 3',
            description: 'This action is responsible for reading the most popular customers'
        },
        // callback for main execution
        silent: false,
        call: async (store) => {
             let obj = store
            return obj;  
        },        
    },
    {
        index: 5,
        meta: {
            title: 'Read popular customers 3',
            description: 'This action is responsible for reading the most popular customers'
        },
        // callback for main execution
        silent: false,
        call: async (store) => {
             let obj = store
            return obj;  
        },        
    }
];

const transaction = new Transaction();
(async() => {
    try {
        await transaction.dispatch(scenario);
        const store = transaction.store; // {} | null
        const logs = transaction.logs; // []
        console.log(logs);
    } catch (err) {
        console.log(err);
    }
})();

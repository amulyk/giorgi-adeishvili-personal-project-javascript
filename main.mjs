export {scenario};

const scenario = [
    {
        index: 2,
        meta: {
            title: 'Read popular customers 2',
            description: 'This action is responsible for reading the most popular customers'
        },
        // callback for main execution
        call: async (store) => {            
            let obj = store
            return obj;          
        },
        restore: async (store) => {

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
        restore: async (store) => {
            let obj = store;
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

            return 'great';  
        },        
        restore: async (store) => {
            return 'great';          
        }
    }
];

const popularCustomers = [
    {
        name: 'john',
        country: 'USA',
        id: '28721949201'
    }
];




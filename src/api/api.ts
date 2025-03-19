// --host=192.168.0.107

//const BASE_API = 'http://192.168.0.104:3000';
//const BASE_API = 'https://taxibraz.onrender.com';
//const BASE_API = 'http://192.168.1.9:8000/api';
//const BASE_API = 'http://192.168.1.12:3333';
const BASE_API = 'https://expense-tracker-adonis.up.railway.app'


export default {

    validateToken: async (token:string) => {
        const response = await fetch(`${BASE_API}/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },

     login: async (email:string, password:string) => {
        const response = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
       
        return response;
    },
/*
    cadastro: async (name,email,password) => {
       
        const response = await fetch(`${BASE_API}/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email, password})
        });
              
        return response;
    },
    */
    getTransactions: async (data:string,token:string) => {
        const response = await fetch(`${BASE_API}/transactions/?data=${data}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getCategories: async (token:string) => {
        const response = await fetch(`${BASE_API}/categories`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    getAccounts: async (token:string) => {
        const response = await fetch(`${BASE_API}/accounts`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    addCategory: async (token:string,name:string) => {
        const response = await fetch(`${BASE_API}/categories`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({name})
        });
        return response;
    },
    updateCategory: async (token: string,id:string,name:string) => {
        const response = await fetch(`${BASE_API}/categories/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({name})
        });
        return response;
    },
    deleteCategory: async (token:string,id:string) => {
        const response = await fetch(`${BASE_API}/categories/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
    addAccount: async (token:string,name:string) => {
        const response = await fetch(`${BASE_API}/accounts`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({name})
        });
        return response;
    },
    updateAccount: async (token:string,id:string,name:string) => {
        const response = await fetch(`${BASE_API}/accounts/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({name})
        });
        return response;
    },
    deleteAccount: async (token:string,id:string) => {
        const response = await fetch(`${BASE_API}/accounts/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
    addTransaction: async (token:string,fd:any) => {
        const response = await fetch(`${BASE_API}/transactions`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fd)
        });
        return response;
    },
    updateTransaction: async (token:string,id:string,fd:any) => {
        const response = await fetch(`${BASE_API}/transactions/${id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fd)
        });
        return response;
    },
    deleteTransaction: async (token:string,id:string) => {
        const response = await fetch(`${BASE_API}/transactions/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            
        });
        return response;
    },
    search: async (token:string,qs:string) => {
        const response = await fetch(`${BASE_API}/transactions/search?${qs}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    weekChart: async (token:string,week:string) => {
        const response = await fetch(`${BASE_API}/transactions/summary/week?week_number=${week}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    donutChart: async (token:string,month:string,year:string) => {
        const response = await fetch(`${BASE_API}/transactions/summary/category?month=${month}&year=${year}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
    pieChart: async (token:string,month:string,year:string) => {
        const response = await fetch(`${BASE_API}/transactions/summary/account?month=${month}&year=${year}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        return response;
    },
  
  
   
};
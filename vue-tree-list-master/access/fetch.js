import env from '../helpers/index'
import axios from 'axios';

export async function deleteProdcate(item, Fetchdata) {
    const count = typeof item.count !== 'undefined' ? true : null;
    const id = typeof item.id_2 !== 'undefined' ? item.id_2 : null;
    const url = count ? `${env.DB_HOST}product/${id}` : `${env.DB_HOST}category/${id}`;
    await fetch(url, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting product');
            }
            return response.json();
        })
        .then(data => {
            console.log('Member deleted successfully', data);
            return data; // Return the response data if needed
        })
        .catch(error => {
            console.error('Error deleting product', error);
            throw error; // Rethrow the error to be handled by the calling code
        });
    Fetchdata();
}

export async function AddNewMember(DATA, options, Fetchdata) {

    if (options.role === 'category') { DATA.parent_id = options.category_data.id }
    else if (options.role === 'product') { DATA.num = parseInt(options.count), DATA.category_id = options.category_data.id }
    console.log("options", options)
    console.log("DATA", DATA)
    console.log("DB_HOST", env.DB_HOST + options.role)
    await axios.post(env.DB_HOST + options.role, DATA, {
        headers: { 'Content-Type': 'application/json' }
    }).then(response => { console.log('AddNewMember has been successfully added', response); })
    Fetchdata();
}
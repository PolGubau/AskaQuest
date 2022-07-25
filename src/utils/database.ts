import {Pool} from 'pg';

let conn:any;

if(!conn){
    conn=new Pool({
        host: 'localhost',
        database: 'askaquest',
        port: 5432,
        user: 'pol',
        password: 'pol'
    });
    
}
export {conn};
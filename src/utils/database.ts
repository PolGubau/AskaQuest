import {Pool} from 'pg';

let conn:any;

if(!conn){
    conn=new Pool({
        host: 'postgresql-pol.alwaysdata.net',
        database: 'pol_askaquest',
        port: 5432,
        user: 'pol',
        password: 'gubaupol2002'
    });
    
}
export {conn};
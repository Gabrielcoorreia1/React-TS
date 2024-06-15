import axios from "axios";

const KEY = '$2a$10$bn47RydDz9ycWCKD.F6uO.D3AS08Acp1KQ3ttXWWzbtBgPQOukVFe'


export const api = axios.create({
    baseURL: 'https://api.jsonbin.io/v3/b/666e03c4ad19ca34f8798546',
    headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': KEY,
    }
})
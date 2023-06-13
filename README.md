# pesilat__2023_laundry_api

## Cara Setup

1. run `npm i` di cmd
2. sesuaikan database di file `.env` dan pastikan database yg sudah dibuat di mysql nya kosong.
3. run `npm run "migrate:fresh --seed"` di cmd
4. jalankan `npm start`
5. untuk melihat contoh request body, silahkan import collection yang ada di repository ini dengan nama file `thunder-collection_laundry.json` 

## Note 
- Project ini dibuat dengan library nodemon, jadi silahkan install nodemon secara global. Jika belum install silahkan jalankan perintah `npm install --global nodemon` di cmd. jika sudah tidak perlu menjalanlkan perintah trsbt
- Hook ada di model transaksi

## Open the backend folder present in this folder with powershell vs code or any shell and run the command 

now run this command 
### cd ../backend/

and then run this command
### npm install

and now create a file but now in the 'data' folder named as "config.env" with values

- PORT=4000

- MONGO_URI=mongodb://localhost:27017

- FRONTEND_URL=http://localhost:3000
  
- SECRET_KEY=kaldfadladfkldad 

and finally run the command 
* npm run dev


Now,
## Open one more powershell window for the frontend folder

after this command 
run 
### npm install

and then in the root folder only create a file named as .env 

and content of the file will be 
### VITE_BASE_URL=http://localhost:4000/api/v1

and then run the command 
* npm run dev

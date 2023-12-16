-From given repository of Front end and backend download files separately in separate folder.


-in backend folder, from terminal run 'npm install' command .


-in backend repository, i have given questions.json file , from which just copy paste it to local mongodb server by using following commands (--> go to mongoshell --> run command "use language_game"--> show collections command ---> if Exercise colection present or not present run next command ---> db.exercises.insertMany('copy paste json file of questions.json') and click enter


-in server.js , in mongoose.connect('your mongo string',{}) enter your mongoserver url

-if any error arises when running front end code, run npm install command from frontend folder 

-if any error occurs then check console and kindly change those urls based on your local computer

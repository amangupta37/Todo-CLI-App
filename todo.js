
// RUN THE FILE BY USING COMMAND "$ node ./todo.js help"

var fs = require('fs');


//constants
var TASK_JSON_PATH = "./database.json";


function init(){
	//create file if it's present.
	if(!fs.existsSync(TASK_JSON_PATH)){
		console.log("Initialising storage.\n Creating `database.json` file");
		setData([]);	
	}
	
}

function getData(){
	//read file contents
	var contents = fs.readFileSync(TASK_JSON_PATH);

	//parse contents
	var data = JSON.parse(contents);

	return data;
}


function setData(data){
	//strigify JSON
	var dataString = JSON.stringify(data);

	//write to  file
	
	fs.writeFileSync(TASK_JSON_PATH,dataString);
}

//display usage
function usage() {
	
	console.log(`Usage :-

    $ node ./todo.js add "todo item"  # Add a new todo 
    $ node ./todo.js ls               # Show remaining todos
    $ node ./todo.js del NUMBER       # Delete a todo
    $ node ./todo.js done NUMBER      # Complete a todo
    $ node ./todo.js help             # Show usage
   `);
}

//add task
function add(task) {
	//get data
	var data = getData();

	//add item
	data.push({task:task,completed:false});

	//set data
	setData(data);

	//list
	list();
}

//check task
function check(task) {
	//get data
	var data = getData();

	//modify the data (toggle)
	data[task].completed = !data[task].completed;

	//set data
	setData(data);

	//list
	list();
}

//delete task
function del(task){
	//get data
	var data = getData();

	//delete item
	data.splice(task,task+1);

	//set data
	setData(data);

	//list
	list();
}

//list all tasks
function list() {
	
	//data
	var data = getData();
	
	if(data.length > 0){
		//print the list. using ANSI colors and formating
		console.log("\x1b[93m\x1b[4mTask list:\x1b[24m");
		data.forEach(function (task,index){
			console.log(index+1+"."," ["+(task.completed ? "\x1b[92m✓\x1b[93m" : " ")+"] ",task.task);
		});
		
	}else{
		console.log("\x1b[91mNo tasks added!!");
	}

}



var command = process.argv[2];
var argument = process.argv[3];

init();

switch(command){
	case "add":
		add(argument);
		break;
	case "done":
		check(argument-1);
		break;
	case "del":
		del(argument-1);
		break;
	case "help":
		usage();
		break;
	case "ls":
		list();
		break;
	default:
		console.log("\x1b[91mCommand not found!!\x1b[0m");
		usage();
		break;
}
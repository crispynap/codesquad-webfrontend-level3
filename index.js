var r = require("./config/readline")();

var SECOND = 1000;
var MINUTE = SECOND * 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;

var tasks = {
	taskList: [],
	idPointer: 0,
	addTask: function (name) {
		var task = {
			id: this.idPointer,
			name: name,
			state: "todo",
			startTime: 0,
			elapsedTime: 0
		}
		this.taskList.push(task);
		this.idPointer++;
		return task.id;
	},
	showDoing: function () { //"id, taskName", "id, taskName" ...
		let doingTasksString = "";
		for (task in this.taskList) {
			if (this.taskList[task].state == "doing") {
				let taskString = "";
				if (doingTasksString != "") {
					taskString += ", ";
				}
				taskString += "\"" + this.taskList[task].id + ", " + this.taskList[task].name + "\""
				doingTasksString += taskString;
			}
		}
		if (doingTasksString == "") {
			doingTasksString = "하고 있는 일이 없습니다.";
		}
		console.log(doingTasksString);
	},
	showDone: function () { //"taskName, elapsedTime", "taskName, elapsedTime" ...
		let doneTasksString = "";
		for (task in this.taskList) {
			if (this.taskList[task].state == "done") {
				let taskString = "";
				if (doneTasksString != "") {
					taskString += ", ";
				}
				taskString += "\"" + this.taskList[task].name + ", "
					+ Math.round(this.taskList[task].elapsedTime / SECOND) + "초\""
				doneTasksString += taskString;
			}
		}
		if (doneTasksString == "") {
			doneTasksString = "마친 일이 없습니다.";
		}
		console.log(doneTasksString);
	},
	showAddedTask: function (taskId) { //id: 5,  "자바스크립트 공부하기" 항목이 새로 추가됐습니다. 
		console.log("id: " + taskId + ", \"" + this.taskList[taskId].name + "\" 항목이 새로 추가됐습니다.");
	},
	showState: function () { // "현재상태: todo:n개, doing:n개, done:n개"
		let todo = 0, doing = 0, done = 0;
		for (task in this.taskList) {
			if (this.taskList[task].state == "todo") {
				todo++;
			} else if (this.taskList[task].state == "doing") {
				doing++;
			} else if (this.taskList[task].state == "done") {
				done++;
			}
		}
		console.log("현재상태: todo:" + todo + "개, doing:" + doing + "개, done:" + done + "개");
	},
	updateToDoing: function (taskId) {
		if (this.taskList[taskId].state == 'done') {
			console.log("이미 끝마친 일입니다.")
		}
		try {
			this.taskList[taskId].state = "doing";
			this.taskList[taskId].startTime = new Date();
		}
		catch (e) {
			console.log("id를 잘못 지정하였습니다.");
		}
	},
	updateToDone: function (taskId) {
		try {
			this.taskList[taskId].state = "done";
			if (this.taskList[taskId].startTime == 0) { //todo에서 바로 done으로 update했을 경우
				this.taskList[taskId].elapsedTime = 0;
			} else {
				this.taskList[taskId].elapsedTime = new Date().getTime() - this.taskList[taskId].startTime.getTime();
			}
		}
		catch (e) {
			console.log("id를 잘못 지정하였습니다.");
		}
	}
};


r.on("line", function (line) {
	if (line == "exit") {
		r.close();
	}

	var commandStart = 0, commandEnd = 0;
	var command = [];
	for (var i = 0; i < 5; i++) {
		commandEnd = line.indexOf("$", commandStart);
		if (commandEnd == -1) {
			command.push(line.substring(commandStart));
			break;
		}
		command.push(line.substring(commandStart, commandEnd));
		commandStart = commandEnd + 1;
	}

	if (command[0] == "add") {
		taskId = tasks.addTask(command[1]);
		tasks.showAddedTask(taskId);
		tasks.showState();
	} else if (command[0] == "show") {
		if (command[1] == "doing") {
			tasks.showDoing();
		} else if (command[1] == "done") {
			tasks.showDone();
		} else {
			console.log("잘못된 명령입니다.");
		}
	} else if (command[0] == "update") {
		if (command[2] == "doing") {
			tasks.updateToDoing(command[1]);
			setTimeout(function () {
				tasks.showState();
				r.prompt();
			}, 3000);
		} else if (command[2] == "done") {
			tasks.updateToDone(command[1]);
			setTimeout(function () {
				tasks.showState();
				r.prompt();
			}, 3000);
		} else {
			console.log("잘못된 명령입니다.");
		}
	} else {
		console.log("잘못된 명령입니다.");
	}

	r.prompt();
});
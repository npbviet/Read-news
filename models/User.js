"use strict";
class User {
  constructor(firstname, lastname, username, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.pageSize = 5;
    this.category = "General";
  }
}

class TodoData {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = false;
  }
}

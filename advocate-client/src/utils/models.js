export const homepageErrorModel = {
  login: "",
  registerUsername: "",
  registerPassword: "",
  registerFirstName: "",
  registerLastName: ""
};

export const loginModel = {
  username: '',
  password: ''
};

export const registrationModel = {
  username: '',
  password: '',
  firstName: '',
  lastName: '',
};

export const goalFormErrorModel = {
  goalName: "",
  goal: "",
  masteryDate: "",
  startDate: "",
  benchmarks: ""
};

export const classroomErrorModel = {
  className: "",
  students: ""
};

export const trialErrorsModel = {
  dateStarted: "",
  label: "",
  tracking: ""
};

export class CardColumnModel {
  constructor(goal, benchmark, desc){
    this.Goal = goal;
    this.Benchmark = benchmark;
    this["Benchmark Description"] = desc;
  }
}

export class GraphDataPoint{
  constructor(x = 0, y = 0, total = 0, label = "", color = "#51bcda", labels = null){
    this.x = x;
    this.y = y;
    this.total = total;
    this.label = label;
    this.color = color;
    this.labels = labels;
  }
}

export const templateOptionsModel = {
  "Score & Accuracy": "score",
  "Frequency": "frequency",
  "Duration": "duration",
  "Other": "other"
};

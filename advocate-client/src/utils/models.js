import { EditorState } from 'draft-js';

/*
export const TEACHER_MODEL = {
  id: "",
  dateCreated: "",
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  description: "",
  enabled: 0,
  classrooms: [
    {
      id: "",
      className: "",
      teacherId: "",
      enabled: 0,
      students: [
        {
          id: "",
          classroomId: "",
          name: "",
          age: "",
          grade: "",
          enabled: 0,
          goals: [
            {
              id: "",
              goal: "",
              goalName: "",
              enabled: 0,
              monitor: 0,
              startDate: "",
              masteryDate: "",
              studentId: "",
              completionDate: "",
              complete: 0,
              benchmarks: [
                {
                  id: "",
                  goalId: "",
                  enabled: 0,
                  complete: 0,
                  label: "",
                  description: "",
                  tracking: "",
                  masteryDate: "",
                  metDate: "",
                  trials: [
                    {
                      id: "",
                      trialNumber: 0,
                      dateStarted: "",
                      dateCompleted: "",
                      comments: "",
                      benchmarkId: "",
                      enabled: 0,
                      trackings: [
                        {
                          id: "",
                          label: "",
                          cueCount: 0,
                          permanentProduct: "",
                          durationInSeconds: 0,
                          accuracyPercentage: 0.0,
                          trialId: "",
                          enabled: 0,
                          correct: 0,
                          frequency: 0
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
*/

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

export const goalModel = {
  goalName: "",
  startDate: "",
  masteryDate: "",
  monitor: 0,
  benchmarks: [],
  studentId: "",
  goal: EditorState.createEmpty()
};

export const benchmarkModel = {
  label: "",
  description: EditorState.createEmpty(),
  masteryDate: "",
  tracking: ""
};

export const classroomErrorModel = {
  className: "",
  students: ""
};

export const blankClassroomModel = {
  className: "",
  students: []
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

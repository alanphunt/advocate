const TEACHER_MODEL = {
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
              process: "",
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

export default TEACHER_MODEL;

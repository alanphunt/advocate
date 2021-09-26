import {EditorState} from "draft-js";

export class AccountDetails{
  constructor(username = "", dateCreated = "", accountNonExpired = 0, accountNonLocked = 0, credentialsNonExpired = 0, role = ""){
    this.username = username;
    this.dateCreated = dateCreated;
    this.accountNonExpiredc = accountNonExpired;
    this.accountNonLocked = accountNonLocked;
    this.credentialsNonExpired = credentialsNonExpired;
    this.role = role;
  }
}

export class Teacher {
  constructor (id = "", enabled = 0, firstName = "", lastName = "", description = "", classroomIds = []) {
    this.id = id;
    this.enabled = enabled;
    this.firstName = firstName;
    this.lastName = lastName;
    this.description = description;
    this.classroomIds = classroomIds;
  }
}

export class Classroom {
  constructor (id = "", enabled = 0, className = "", teacherId = "", studentIds = []) {
    this.id = id;
    this.enabled = enabled;
    this.className = className;
    this.teacherId = teacherId;
    this.studentIds = studentIds;
  }
}

export class Student {
  constructor (id = "", name = "", grade = "", age = "", classroomId = "", enabled = 0, goalIds = [], baselineIds = []) {
    this.id = id;
    this.enabled = enabled;
    this.name = name;
    this.grade = grade;
    this.age = age;
    this.classroomId = classroomId;
    this.goalIds = goalIds;
    this.baselineIds = baselineIds;
  }
}

export class Baseline{
  constructor(
    id = "",
    studentId = "",
    documentIds = [],
    label = "",
    comments = "",
    baselineTemplate = "",
    dateStarted = "",
    enabled = 0,
    trackingId = ""
  ) {
    this.id = id;
    this.studentId = studentId;
    this.documentIds = documentIds;
    this.label = label;
    this.comments = comments;
    this.baselineTemplate = baselineTemplate;
    this.dateStarted = dateStarted;
    this.enabled = enabled;
    this.trackingId = trackingId;
  }
}

export class Goal {
  constructor (id = "", goal = EditorState.createEmpty(), goalName = "", enabled = 0, monitor = 0, startDate = "", masteryDate = "", studentId = "", completionDate = "", complete = 0, benchmarkIds = [], benchmarks = []) {
    this.id = id;
    this.goal = goal;
    this.goalName = goalName;
    this.enabled = enabled;
    this.monitor = monitor;
    this.startDate = startDate;
    this.masteryDate = masteryDate;
    this.studentId = studentId;
    this.completionDate = completionDate;
    this.complete = complete;
    this.benchmarkIds = benchmarkIds;
    this.benchmarks = benchmarks;
  }
}

export class Benchmark {
  constructor (id = "", goalId = "", enabled = 0, complete = 0, label = "", description =  EditorState.createEmpty(), tracking = "", masteryDate = "", metDate = "", trialIds = [], trialAverage = 0.0) {
    this.id = id;
    this.enabled = enabled;
    this.complete = complete;
    this.label = label;
    this.description = description;
    this.tracking = tracking;
    this.masteryDate = masteryDate;
    this.metDate = metDate;
    this.trialIds = trialIds;
    this.trialAverage = trialAverage;
  }
}

export class Trial {
  constructor (id = "", label = "", trialNumber = 0, dateStarted = "", dateCompleted = "", comments = "", benchmarkId = "", enabled = 0, documentIds = [], trialTemplate = "", trackingId = "") {
    this.id = id;
    this.enabled = enabled;
    this.label = label;
    this.trialNumber = trialNumber;
    this.dateStarted = dateStarted;
    this.dateCompleted = dateCompleted;
    this.comments = comments;
    this.benchmarkId = benchmarkId;
    this.documentIds = documentIds;
    this.trialTemplate = trialTemplate;
    this.trackingId = trackingId;
  }
}

export class Tracking {
  constructor (id = "",
               label = "",
               cueCount = 0,
               permanentProduct = null,
               durationInSeconds = 0,
               accuracyPercentage = 0,
               trialId = "",
               baselineId = "",
               enabled = 0,
               correct = 0,
               frequency = 0,
               best = 0,
               outOf = 0,
               trackingMetaIds = []
  ) {
    this.id = id;
    this.label = label;
    this.enabled = enabled;
    this.cueCount = cueCount;
    this.permanentProduct = permanentProduct;
    this.durationInSeconds = durationInSeconds;
    this.accuracyPercentage = accuracyPercentage;
    this.trialId = trialId;
    this.baselineId = baselineId;
    this.correct = correct;
    this.frequency = frequency;
    this.best = best;
    this.outOf = outOf;
    this.trackingMetaIds = trackingMetaIds;
  }
}

export class TrackingMeta {
  constructor(id = "", trackingId = "", label = "", correct = 0, enabled = 0) {
    this.id = id;
    this.trackingId = trackingId;
    this.label = label;
    this.correct = correct;
    this.enabled = enabled;
  }
}

export class Document {
  constructor (id = "", trialId = "", baselineId = "", name = "", type = "", size = 0, formattedSize = "", path = "", uploadDate = "", lastModified = 0, enabled = 0) {
    this.id = id;
    this.enabled = enabled;
    this.trialId = trialId;
    this.baselineId = baselineId;
    this.name = name;
    this.type = type;
    this.size = size;
    this.formattedSize = formattedSize;
    this.path = path;
    this.uploadDate = uploadDate;
    this.lastModified = lastModified;
  }
}

export class ContextModel {
  accountDetails = new AccountDetails();
  teacher = new Teacher();
  classrooms = Array.of(new Classroom());
  students = Array.of(new Student());
  baselines = Array.of(new Baseline());
  goals = Array.of(new Goal());
  benchmarks = Array.of(new Benchmark());
  trials = Array.of(new Trial());
  trackings = Array.of(new Tracking());
  trackingMeta = Array.of(new TrackingMeta());
  documents = Array.of(new Document());
  
  constructor(accountDetails, teacher, classrooms, students, baselines, goals, benchmarks, trials, trackings, trackingMeta, documents) {
    this.accountDetails = accountDetails;
    this.teacher = teacher;
    this.classrooms = classrooms;
    this.students = students;
    this.baselines = baselines;
    this.goals = goals;
    this.benchmarks = benchmarks;
    this.trials = trials;
    this.trackings = trackings;
    this.trackingMeta = trackingMeta;
    this.documents = documents;
  }
}
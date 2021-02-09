export class ContextModel {
    teacher = new Teacher();
    classrooms = Array.of(new Classroom());
    students = Array.of(new Student());
    goals = Array.of(new Goal());
    benchmarks = Array.of(new Benchmark());
    trials = Array.of(new Trial());
    trackings = Array.of(new Tracking());
    documents = Array.of(new Document());

    constructor(teacher, classrooms, students, goals, benchmarks, trials, trackings, documents) {
        this.teacher = teacher;
        this.classrooms = classrooms;
        this.students = students;
        this.goals = goals;
        this.benchmarks = benchmarks;
        this.trials = trials;
        this.trackings = trackings;
        this.documents = documents;
    }
}

export class Teacher {
    classroomIds = Array.of("");
    constructor (id, username, enabled, dateCreated, firstName, lastName, description, classroomIds) {
        this.id = id;
        this.enabled = enabled;
        this.dateCreated = dateCreated;
        this.firstName = firstName;
        this.lastName = lastName;
        this.description = description;
        this.classroomIds = classroomIds;
    }
}

export class Classroom {
    studentIds = Array.of("");
    constructor (id, enabled, className, teacherId, studentIds) {
        this.id = id;
        this.enabled = enabled;
        this.className = className;
        this.teacherId = teacherId;
        this.studentIds = studentIds;
    }
}

export class Student {
    goalIds = Array.of("");
    constructor (id, name, grade, age, classroomId, enabled, goalIds) {
        this.id = id;
        this.enabled = enabled;
        this.name = name;
        this.grade = grade;
        this.age = age;
        this.classroomId = classroomId;
        this.goalIds = goalIds;
    }
}

export class Goal {
    benchmarkIds = Array.of("");
    constructor (id, goalName, enabled, monitor, startDate, masteryDate, studentId, completionDate, complete, benchmarkIds) {
        this.id = id;
        this.goalName = goalName;
        this.enabled = enabled;
        this.monitor = monitor;
        this.startDate = startDate;
        this.masteryDate = masteryDate;
        this.studentId = studentId;
        this.completionDate = completionDate;
        this.complete = complete;
        this.benchmarkIds = benchmarkIds;
    }
}

export class Benchmark {
    trialIds = Array.of("");
    constructor (id, goalId, enabled, complete, label, description, tracking, masteryDate, metDate, trialIds) {
        this.id = id;
        this.enabled = enabled;
        this.complete = complete;
        this.label = label;
        this.description = description;
        this.tracking = tracking;
        this.masteryDate = masteryDate;
        this.metDate = metDate;
        this.trialIds = trialIds;
    }
}

export class Trial {

    constructor() {
        this.documentIds = [];
        this.trackingIds = [];
        this.label = "";
        this.id = "";
        this.enabled = 0;
        this.trialNumber = -1;
        this.dateStarted = "";
        this.dateCompleted = "";
        this.comments = "";
        this.benchmarkId = "";
        this.trialTemplate = "";
    }

/*    constructor (id, label, trialNumber, dateStarted, dateCompleted, comments, benchmarkId, enabled, documentIds, trackingIds) {
        this.id = id;
        this.enabled = enabled;
        this.label = label;
        this.trialNumber = trialNumber;
        this.dateStarted = dateStarted;
        this.dateCompleted = dateCompleted;
        this.comments = comments;
        this.benchmarkId = benchmarkId;
        this.documentIds = documentIds;
        this.trackingIds = trackingIds;
    }*/
}

export class Tracking {
    constructor (id, label, cueCount, permanentProduct, durationInSeconds, accuracyPercentage, trialId, enabled, correct, frequency) {
        this.id = id;
        this.label = label;
        this.enabled = enabled;
        this.cueCount = cueCount;
        this.permanentProduct = permanentProduct;
        this.durationInSeconds = durationInSeconds;
        this.accuracyPercentage = accuracyPercentage;
        this.trialId = trialId;
        this.correct = correct;
        this.frequency = frequency;
    }
}

export class Document {
    constructor (id, trialId, name, type, size, formattedSize, path, uploadDate, lastModified, enabled) {
        this.id = id;
        this.enabled = enabled;
        this.trialId = trialId;
        this.name = name;
        this.type = type;
        this.size = size;
        this.formattedSize = formattedSize;
        this.path = path;
        this.uploadDate = uploadDate;
        this.lastModified = lastModified;
    }
}
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
    constructor (id = "", username = "", enabled = 0, dateCreated = "", firstName = "", lastName = "", description = "", classroomIds = []) {
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
    constructor (id = "", enabled = 0, className = "", teacherId = "", studentIds = []) {
        this.id = id;
        this.enabled = enabled;
        this.className = className;
        this.teacherId = teacherId;
        this.studentIds = studentIds;
    }
}

export class Student {
    constructor (id = "", name = "", grade = "", age = "", classroomId = "", enabled = 0, goalIds = []) {
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
    constructor (id = "", goalName = "", enabled = 0, monitor = 0, startDate = "", masteryDate = "", studentId = "", completionDate = "", complete = 0, benchmarkIds = []) {
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
    constructor (id = "", goalId = "", enabled = 0, complete = 0, label = "", description = "", tracking = "", masteryDate = "", metDate = "", trialIds = []) {
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
    constructor (id = "", label = "", trialNumber = 0, dateStarted = "", dateCompleted = "", comments = "", benchmarkId = "", enabled = 0, documentIds = [], trackingIds = []) {
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
                 enabled = 0,
                 correct = 0,
                 frequency = 0,
                 best = 0,
                 outOf = 0
    ) {
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
        this.best = best;
        this.outOf = outOf;
    }
}

export class Document {
    constructor (id = "", trialId = "", name = "", type = "", size = 0, formattedSize = "", path = "", uploadDate = "", lastModified = 0, enabled = 0) {
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
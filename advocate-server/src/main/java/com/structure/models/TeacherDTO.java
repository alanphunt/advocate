package com.structure.models;

import java.util.Map;

public class TeacherDTO {

    private Teacher teacher;
    private Map<String, Classroom> classrooms;
    private Map<String, Student> students;
    private Map<String, Goal> goals;
    private Map<String, Benchmark> benchmarks;
    private Map<String, Trial> trials;
    private Map<String, Tracking> trackings;
    private Map<String, Document> documents;

    public TeacherDTO() {
    }

    public void setTeacher(Teacher teacher){
        this.teacher = teacher;
    }
    public Teacher getTeacher(){
        return this.teacher;
    }

    public Map<String,Classroom> getClassrooms() {
        return this.classrooms;
    }

    public void setClassrooms(Map<String,Classroom> classrooms) {
        this.classrooms = classrooms;
    }

    public Map<String,Student> getStudents() {
        return this.students;
    }

    public void setStudents(Map<String,Student> students) {
        this.students = students;
    }

    public Map<String,Goal> getGoals() {
        return this.goals;
    }

    public void setGoals(Map<String,Goal> goals) {
        this.goals = goals;
    }

    public Map<String,Benchmark> getBenchmarks() {
        return this.benchmarks;
    }

    public void setBenchmarks(Map<String,Benchmark> benchmarks) {
        this.benchmarks = benchmarks;
    }

    public Map<String,Trial> getTrials() {
        return this.trials;
    }

    public void setTrials(Map<String,Trial> trials) {
        this.trials = trials;
    }

    public Map<String,Tracking> getTrackings() {
        return this.trackings;
    }

    public void setTrackings(Map<String,Tracking> trackings) {
        this.trackings = trackings;
    }

    public Map<String,Document> getDocuments() {
        return this.documents;
    }

    public void setDocuments(Map<String,Document> documents) {
        this.documents = documents;
    }

    @Override
    public String toString() {
        return "{" +
            " teacher='" + getTeacher() + "'" +
            ", classrooms='" + getClassrooms() + "'" +
            ", students='" + getStudents() + "'" +
            ", goals='" + getGoals() + "'" +
            ", benchmarks='" + getBenchmarks() + "'" +
            ", trials='" + getTrials() + "'" +
            ", trackings='" + getTrackings() + "'" +
            ", documents='" + getDocuments() + "'" +
            "}";
    }


}

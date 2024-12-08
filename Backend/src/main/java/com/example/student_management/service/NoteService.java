package com.example.student_management.service;


import com.example.student_management.dao.NoteRepository;
import com.example.student_management.dao.StudentRepository;
import com.example.student_management.model.Note;
import com.example.student_management.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<Note> getNotesByStudentId(Long studentId) {
        return noteRepository.findAll().stream()
                .filter(note -> note.getStudent().getId().equals(studentId))
                .toList();
    }

    public Note createNoteForStudent(Long studentId, Note note) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        note.setStudent(student);
        return noteRepository.save(note);
    }
}

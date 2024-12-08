package com.example.student_management.controller;
import com.example.student_management.model.Note;
import com.example.student_management.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students/{studentId}/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public List<Note> getNotesForStudent(@PathVariable Long studentId) {
        return noteService.getNotesByStudentId(studentId);
    }

    @PostMapping
    public Note createNoteForStudent(@PathVariable Long studentId, @RequestBody Note note) {
        return noteService.createNoteForStudent(studentId, note);
    }
}

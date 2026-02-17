import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {

  suggestionForm!: FormGroup;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  initForm(): void {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('fr-FR');

    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z ]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: formattedDate, disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });
  }

  get f() {
    return this.suggestionForm.controls;
  }

  onSubmit(): void {
    if (this.suggestionForm.invalid) {
      Object.keys(this.suggestionForm.controls).forEach(key => {
        this.suggestionForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = this.suggestionForm.getRawValue();
    
    const suggestion: Suggestion = {
      id: Date.now(), 
      title: formValue.title,
      description: formValue.description,
      category: formValue.category,
      date: new Date(),
      status: 'en attente',
      nbLikes: 0 
    };

    if (this.isBrowser()) {
      const existingSuggestions = localStorage.getItem('suggestions');
      const suggestions: Suggestion[] = existingSuggestions 
        ? JSON.parse(existingSuggestions) 
        : [];
      
      suggestions.push(suggestion);
      localStorage.setItem('suggestions', JSON.stringify(suggestions));
    }

    this.router.navigate(['/suggestions']);
  }
}
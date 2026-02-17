import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrl: './list-suggestion.component.css'
})
export class ListSuggestionComponent implements OnInit {
  search: string = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  // Initial mock data
  private initialSuggestions: Suggestion[] = [
    {
      id: 1,
      title: 'Organiser une journée team building',
      description: 'Suggestion pour organiser une journée de team building.',
      category: 'Événements',
      date: new Date('2025-01-20'),
      status: 'acceptee',
      nbLikes: 10
    },
    {
      id: 2,
      title: 'Améliorer le système de réservation',
      description: 'Améliorer la gestion des réservations en ligne.',
      category: 'Technologie',
      date: new Date('2025-01-15'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 3,
      title: 'Créer un système de récompenses',
      description: 'Programme de récompenses pour les employés.',
      category: 'Ressources Humaines',
      date: new Date('2025-01-25'),
      status: 'refusee',
      nbLikes: 0
    },
    {
      id: 4,
      title: "Moderniser l'interface utilisateur",
      description: "Refonte complète de l'interface.",
      category: 'Technologie',
      date: new Date('2025-01-30'),
      status: 'en_attente',
      nbLikes: 0
    }
  ];

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    const stored = localStorage.getItem('suggestions');
    
    if (stored) {
      // Load from localStorage and parse dates
      this.suggestions = JSON.parse(stored).map((s: any) => ({
        ...s,
        date: new Date(s.date) // Convert date strings back to Date objects
      }));
    } else {
      // Use initial mock data if nothing in localStorage
      this.suggestions = [...this.initialSuggestions];
      // Save initial data to localStorage
      this.saveSuggestions();
    }
  }

  likeSuggestion(s: Suggestion): void {
    s.nbLikes++;
    this.saveSuggestions();
  }

  addToFavorites(s: Suggestion): void {
    if (!this.favorites.includes(s)) {
      this.favorites.push(s);
    }
  }

  deleteSuggestion(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion ?')) {
      this.suggestions = this.suggestions.filter(s => s.id !== id);
      this.saveSuggestions();
    }
  }

  private saveSuggestions(): void {
    localStorage.setItem('suggestions', JSON.stringify(this.suggestions));
  }

  get filteredSuggestions(): Suggestion[] {
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(this.search.toLowerCase()) ||
      s.category.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
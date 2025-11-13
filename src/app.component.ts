import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private apiService = inject(ApiService);
  
  landingPageData = toSignal(this.apiService.getLandingPageData());

  isDarkMode = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      this.isDarkMode.set(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }

  toggleDarkMode() {
    this.isDarkMode.update(value => !value);
  }

  // O estado interativo permanece no componente
  chatDemo = signal<{
    messages: { from: 'bot' | 'user'; text: string }[];
    options: { text: string; response: string }[];
    typing: boolean;
  }>({
    messages: [
      { from: 'bot', text: 'Olá! Eu sou o Julius. Como posso te ajudar hoje?' }
    ],
    options: [
      { text: 'Registrar um gasto', response: 'Claro! Diga-me o valor e a categoria. Por exemplo: "R$ 50 em alimentação".' },
      { text: 'Qual foi meu maior gasto este mês?', response: 'Seu maior gasto este mês foi com "Transporte", totalizando R$ 350,00.' },
      { text: 'Como estão meus investimentos?', response: 'Seus investimentos tiveram um rendimento de 1.2% este mês. Ótimo progresso!' }
    ],
    typing: false
  });

  handleChatOption(option: { text: string; response: string }) {
    if (this.chatDemo().typing) return;

    this.chatDemo.update(demo => ({
      ...demo,
      messages: [...demo.messages, { from: 'user', text: option.text }],
      typing: true
    }));

    setTimeout(() => {
      this.chatDemo.update(demo => ({
        ...demo,
        messages: [...demo.messages, { from: 'bot', text: option.response }],
        typing: false
      }));
    }, 1500);
  }

  goalAmount = signal<number>(25000);
  monthlySaving = signal<number>(500);

  timeToGoal = computed(() => {
    const goal = this.goalAmount();
    const saving = this.monthlySaving();
    if (saving <= 0 || goal <= 0) {
      return { years: 0, months: 0, text: 'Por favor, insira valores válidos.' };
    }
    const totalMonths = Math.ceil(goal / saving);
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    
    let resultText = '';
    if (years > 0) {
      resultText += `${years} ano${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (years > 0) resultText += ' e ';
      resultText += `${months} m${months > 1 ? 'eses' : 'ês'}`;
    }

    return { years, months, text: resultText };
  });

  onGoalAmountChange(event: Event) {
    this.goalAmount.set(Number((event.target as HTMLInputElement).value));
  }
  
  onMonthlySavingChange(event: Event) {
    this.monthlySaving.set(Number((event.target as HTMLInputElement).value));
  }

  openFaqIndex = signal<number | null>(0);

  toggleFaq(index: number) {
    this.openFaqIndex.set(this.openFaqIndex() === index ? null : index);
  }
}

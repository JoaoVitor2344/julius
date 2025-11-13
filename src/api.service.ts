import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Define uma interface para a estrutura de dados para garantir a tipagem
export interface LandingPageData {
  project: {
    name: string;
  };
  heroSection: {
    title: string;
    subtitle: string;
    cta_button: {
      text: string;
      link: string;
    };
    image: string;
  };
  features: {
    title: string;
    description: string;
  }[];
  benefits: string[];
  aboutSection: {
    title: string;
    text: string;
  };
  integrations: {
    telegram: {
      enabled: boolean;
      description: string;
    };
    whatsapp: {
      enabled: boolean;
      description: string;
    };
  };
  footer: {
    cta_text: string;
    cta_button: {
      text: string;
      link: string;
    };
    links: {
      text: string;
      link: string;
    }[];
  };
  testimonials: {
    name: string;
    role: string;
    quote: string;
    avatar: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  // A variável de ambiente `process.env.BACKEND_URL` deve ser configurada no seu processo de build.
  // Usamos um valor padrão como fallback para desenvolvimento.
  private backendUrl = (process.env as any).BACKEND_URL || 'https://api.mock.io';

  /**
   * Realiza uma requisição GET genérica.
   * @param endpoint O caminho do recurso.
   * @returns Um Observable com a resposta.
   */
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.backendUrl}/${endpoint}`);
  }

  /**
   * Realiza uma requisição POST genérica.
   * @param endpoint O caminho do recurso.
   * @param body O corpo da requisição.
   * @returns Um Observable com a resposta.
   */
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.backendUrl}/${endpoint}`, body);
  }

  /**
   * Realiza uma requisição PUT genérica.
   * @param endpoint O caminho do recurso.
   * @param body O corpo da requisição.
   * @returns Um Observable com a resposta.
   */
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.backendUrl}/${endpoint}`, body);
  }

  /**
   * Realiza uma requisição DELETE genérica.
   * @param endpoint O caminho do recurso.
   * @returns Um Observable com a resposta.
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.backendUrl}/${endpoint}`);
  }


  // --- Exemplo de uso específico para a landing page ---

  /**
   * Busca os dados de conteúdo da landing page.
   * Em um aplicativo real, isso faria uma chamada http.get('/landing-page-data').
   * Aqui, estamos simulando a resposta da API com dados estáticos.
   */
  getLandingPageData(): Observable<LandingPageData> {
    const mockData: LandingPageData = {
      project: {
        name: "Julius",
      },
      heroSection: {
        title: "Conheça o Julius. Seu assistente financeiro inteligente.",
        subtitle: "O jeito mais simples de controlar seus gastos, acompanhar ganhos e planejar investimentos. Tudo direto no seu Telegram ou WhatsApp.",
        cta_button: {
          text: "Comece agora",
          link: "#integrations"
        },
        image: "https://picsum.photos/seed/apple-tech/1200/800"
      },
      features: [
        {
          title: "Controle de Despesas",
          description: "Acompanhe suas despesas automaticamente e descubra para onde seu dinheiro está indo."
        },
        {
          title: "Gestão de Ganhos",
          description: "Monitore suas fontes de renda e visualize seus ganhos mensais em gráficos claros e intuitivos."
        },
        {
          title: "Investimentos Inteligentes",
          description: "Receba insights sobre investimentos e veja como seu patrimônio pode crescer ao longo do tempo."
        },
        {
          title: "Alertas via Chat",
          description: "Receba notificações, lembretes e relatórios financeiros diretamente no Telegram ou WhatsApp."
        }
      ],
      benefits: [
        "Organize suas finanças em um só lugar",
        "Tenha relatórios automáticos e personalizados",
        "Defina metas e alcance seus objetivos financeiros",
        "Receba avisos instantâneos sobre gastos e ganhos no seu mensageiro preferido"
      ],
      aboutSection: {
        title: "Por que usar o Julius?",
        text: "Criado para simplificar a vida financeira, o Julius utiliza inteligência artificial para oferecer controle total sobre seus gastos, ganhos e investimentos. Além disso, envia relatórios e notificações diretamente pelo Telegram e WhatsApp, tornando o gerenciamento financeiro muito mais prático e acessível."
      },
      integrations: {
        telegram: {
          enabled: true,
          description: "Envie comandos e receba relatórios do Julius diretamente pelo Telegram."
        },
        whatsapp: {
          enabled: true,
          description: "Converse com o Julius no WhatsApp e receba alertas e insights sobre suas finanças em tempo real."
        }
      },
      footer: {
        cta_text: "Pronto para dominar suas finanças?",
        cta_button: {
          text: "Experimente o Julius gratuitamente",
          link: "#integrations"
        },
        links: [
          { text: "Política de Privacidade", link: "#privacidade" },
          { text: "Termos de Uso", link: "#termos" },
          { text: "Contato", link: "#contato" }
        ]
      },
      testimonials: [
        {
          name: 'Ana Silva',
          role: 'Desenvolvedora de Software',
          quote: 'O Julius transformou a maneira como eu lido com meu dinheiro. É simples, intuitivo e os relatórios no WhatsApp são geniais!',
          avatar: 'https://i.pravatar.cc/150?img=1'
        },
        {
          name: 'Carlos Oliveira',
          role: 'Designer Freelancer',
          quote: 'Finalmente uma ferramenta que entende a vida de um freelancer. Consigo registrar ganhos e despesas em segundos, direto do chat.',
          avatar: 'https://i.pravatar.cc/150?img=3'
        },
        {
          name: 'Mariana Costa',
          role: 'Estudante Universitária',
          quote: 'Comecei a usar o Julius para controlar minha mesada e pequenos trabalhos. Me sinto muito mais no controle e aprendendo a investir.',
          avatar: 'https://i.pravatar.cc/150?img=5'
        }
      ],
      faqs: [
        {
          question: 'O Julius é gratuito?',
          answer: 'Sim! As funcionalidades principais do Julius são totalmente gratuitas. Planejamos introduzir recursos premium no futuro, mas o controle essencial de finanças sempre será acessível a todos.'
        },
        {
          question: 'Meus dados financeiros estão seguros?',
          answer: 'A segurança é nossa maior prioridade. Utilizamos criptografia de ponta para proteger suas informações e seguimos as melhores práticas de segurança de dados. Seus dados nunca são compartilhados sem sua permissão.'
        },
        {
          question: 'Como o Julius se conecta com meu banco?',
          answer: 'Atualmente, o Julius funciona com base nos registros que você faz manualmente através do chat. Isso garante sua privacidade, pois não exigimos acesso direto à sua conta bancária. Estamos explorando integrações seguras para o futuro.'
        },
        {
          question: 'Posso usar o Julius em ambos Telegram e WhatsApp?',
          answer: 'Sim! Você pode interagir com o Julius em qualquer uma das plataformas, ou em ambas. Suas informações são sincronizadas para que você tenha uma experiência contínua.'
        }
      ]
    };
    // Simula um atraso de rede de 500ms para demonstrar o estado de carregamento
    return of(mockData).pipe(delay(500));
  }
}

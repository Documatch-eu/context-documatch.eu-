export type Language = 'FR' | 'ES' | 'EN';

export interface TranslationSet {
  header: {
    solutions: string;
    features: string;
    howItWorks: string;
    contact: string;
    getStarted: string;
  };
  hero: {
    titleHighlight: string;
    titleRest: string;
    subtitle: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    bullet4: string;
    getStarted: string;
    mockupTitle: string;
    labels: {
      erp: string;
      industry: string;
      constraints: string;
      volume: string;
      docsPerMonth: string;
      recommendedGed: string;
      compatibilityHigh: string;
      compatibilityMedium: string;
      compatibilityLow: string;
    };
  };
  section2: {
    title: string;
    intro: string;
    point1: string;
    point2: string;
    point3: string;
    point4: string;
    body1: string;
    body2: string;
    outro: string;
  };
  section3: {
    title: string;
    subtitle: string;
    steps: {
      number: string;
      title: string;
      details: string[];
    }[];
  };
  section4: {
    title: string;
    subtitle: string;
    profileLabel: string;
    industryLabel: string;
    erpLabel: string;
    usersLabel: string;
    processLabel: string;
    countryLabel: string;
    analysisLabel: string;
    compatLabel: string;
    exampleProfile: {
      industry: string;
      erp: string;
      users: string;
      process: string;
      country: string;
    };
  };
  section5: {
    title: string;
    subtitle: string;
    cards: {
      title: string;
      description: string;
    }[];
  };
  section6: {
    title: string;
    subtitle: string;
    categories: {
      title: string;
      items: string[];
    }[];
  };
  section7: {
    title: string;
    subtitle: string;
    headers: {
      without: string;
      with: string;
    };
    rows: {
      without: string;
      with: string;
    }[];
  };
  section8: {
    title: string;
    stats: {
      value: string;
      label: string;
      desc: string;
    }[];
  };
  section9: {
    title: string;
    subtitle: string;
    faqs: {
      question: string;
      answer: string;
    }[];
  };
  finalCta: {
    title: string;
    subtitle1: string;
    subtitle2: string;
    button: string;
  };
  footer: {
    tagline: string;
    solutions: string;
    legal: string;
    privacy: string;
    cookies: string;
    terms: string;
    contact: string;
    copyright: string;
  };
  wizard: {
    title: string;
    stepOf: string;
    next: string;
    prev: string;
    calculate: string;
    analyzing: string;
    done: string;
    resultsTitle: string;
    reset: string;
    fields: {
      companyName: string;
      usersCount: string;
      primaryNeed: string;
      allocatedBudget: string;
    };
    needsOptions: string[];
  };
}

export const translations: Record<Language, TranslationSet> = {
  FR: {
    header: {
      solutions: 'Solutions',
      features: 'Fonctionnalités',
      howItWorks: 'Comment ça marche',
      contact: 'Contact',
      getStarted: 'Commencer gratuitement',
    },
    hero: {
      titleHighlight: 'Choisissez la meilleure GED',
      titleRest: ' pour votre entreprise.',
      subtitle: 'Sans perdre des semaines à comparer des dizaines de solutions. Documatch analyse votre contexte métier, vos processus, votre ERP et vos contraintes afin de vous recommander les logiciels de gestion documentaire les plus adaptés.',
      bullet1: 'Comparaison objective',
      bullet2: 'Analyse alimentée par l\'IA',
      bullet3: 'Recommandations contextualisées',
      bullet4: 'Gain de temps considérable',
      getStarted: 'Commencer gratuitement',
      mockupTitle: 'Simulateur de GED Contextuelle',
      labels: {
        erp: 'ERP / Système',
        industry: 'Métier / Secteur',
        constraints: 'Contraintes réglementaires',
        volume: 'Volume mensuel',
        docsPerMonth: 'documents / mois',
        recommendedGed: 'GED Recommandée',
        compatibilityHigh: 'Très forte compatibilité',
        compatibilityMedium: 'Compatible',
        compatibilityLow: 'Compatibilité modérée',
      },
    },
    section2: {
      title: "Pourquoi tant d'entreprises choisissent encore leur GED au hasard ?",
      intro: "Aujourd'hui, la plupart des projets GED commencent par :",
      point1: "des recherches Google fastidieuses",
      point2: "des comparatifs de fonctionnalités incomplets",
      point3: "plusieurs démonstrations commerciales chronophages",
      point4: "des semaines entières perdues",
      body1: "Pourtant, chaque entreprise possède des besoins totalement différents.",
      body2: "Le meilleur logiciel pour une entreprise tierce n'est pas forcément le meilleur pour la vôtre.",
      outro: "Documatch change radicalement cette approche.",
    },
    section3: {
      title: "Comment fonctionne Documatch ?",
      subtitle: "Quatre étapes simples pour trouver la solution de gestion documentaire idéale",
      steps: [
        {
          number: "1",
          title: "Vous décrivez votre entreprise",
          details: ["ERP & Connecteurs", "Secteur d'activité", "Processus clés", "Volumes de documents", "Contraintes de conformité", "Budget cible"]
        },
        {
          number: "2",
          title: "Notre IA analyse votre contexte",
          details: ["Plus de 150 critères techniques et fonctionnels sont comparés simultanément pour identifier les logiciels réellement adaptés."]
        },
        {
          number: "3",
          title: "Vous obtenez un classement personnalisé",
          details: ["Chaque logiciel de GED reçoit un score de compatibilité transparent, accompagné des justifications de la recommandation."]
        },
        {
          number: "4",
          title: "Vous contactez uniquement les meilleurs",
          details: ["Moins de démonstrations inutiles.", "Plus de pertinence et d'efficacité.", "Un projet GED bouclé en un temps record."]
        }
      ]
    },
    section4: {
      title: "Exemple concret de Matching",
      subtitle: "Voyez comment notre algorithme filtre et trie instantanément les solutions",
      profileLabel: "Votre Entreprise",
      industryLabel: "Secteur d'activité",
      erpLabel: "Connecteur ERP",
      usersLabel: "Utilisateurs",
      processLabel: "Processus clé",
      countryLabel: "Localisation",
      analysisLabel: "Analyse IA Contextuelle",
      compatLabel: "Score de Compatibilité",
      exampleProfile: {
        industry: "Industrie Manufacturière",
        erp: "SAP S/4HANA",
        users: "15 utilisateurs actifs",
        process: "Validation Factures Fournisseurs",
        country: "France",
      }
    },
    section5: {
      title: "Pourquoi Documatch est différent ?",
      subtitle: "Un comparateur nouvelle génération axé sur la réussite de votre projet",
      cards: [
        {
          title: "Analyse Contextuelle",
          description: "Nous ne comparons pas uniquement des cases à cocher. Nous analysons en profondeur votre environnement métier, vos flux opérationnels et vos intégrations systèmes existantes."
        },
        {
          title: "Recommandation IA",
          description: "Chaque recommandation est 100% personnalisée selon vos besoins réels et vos contraintes uniques, éliminant les biais commerciaux habituels."
        },
        {
          title: "Comparaison 100% Objective",
          description: "Pas de classement sponsorisé, pas de mise en avant commerciale cachée. Uniquement de la pertinence technique et de la cohérence fonctionnelle."
        }
      ]
    },
    section6: {
      title: "Plus de critères que n'importe quel comparateur classique",
      subtitle: "Une base de connaissances GED exhaustive mise à jour en temps réel",
      categories: [
        {
          title: "ERP & Systèmes intégrés",
          items: ["SAP S/4HANA", "Microsoft Dynamics", "Sage 100 / 1000", "Oracle NetSuite", "IFS Applications", "Cegid", "Odoo", "Salesforce"]
        },
        {
          title: "Secteurs Métiers",
          items: ["Industrie & Logistique", "BTP / Construction", "Finance & Assurances", "Santé & Pharma", "Collectivités Publiques", "Immobilier & Notariat", "Sociétés de Services"]
        },
        {
          title: "Fonctionnalités avancées",
          items: ["Reconnaissance Automatique (OCR)", "Workflows de validation complexes", "Signature électronique native", "Archivage légal à valeur probante", "IA Générative d'extraction", "Capture multicanale", "Indexation automatique"]
        },
        {
          title: "Normes & Conformité",
          items: ["RGPD (Protection des données)", "ISO 27001 (Sécurité)", "NF203 (Coffre-fort numérique)", "Facture Électronique (Portails/PPF)", "eIDAS (Règlement signature)"]
        }
      ]
    },
    section7: {
      title: "Comparez les méthodes",
      subtitle: "Comment Documatch révolutionne votre recherche de logiciel",
      headers: {
        without: "Sans Documatch",
        with: "Avec Documatch",
      },
      rows: [
        {
          without: "8 démonstrations commerciales de 2h",
          with: "2 démonstrations ultra-ciblées",
        },
        {
          without: "Comparatifs Excel complexes à maintenir",
          with: "Tableau de bord de comparaison interactif",
        },
        {
          without: "Recherche manuelle sur des dizaines de sites",
          with: "Analyse instantanée en quelques minutes",
        },
        {
          without: "Discours marketing biaisé des éditeurs",
          with: "Recommandations IA neutres et objectives",
        },
        {
          without: "Décision subjective basée sur l'apparence",
          with: "Décision rationnelle basée sur la compatibilité technique",
        },
        {
          without: "Plusieurs semaines voire mois de recherche",
          with: "Gain de temps considérable (projet plié en 48h)",
        },
      ]
    },
    section8: {
      title: "La GED en quelques chiffres",
      stats: [
        {
          value: "50+",
          label: "Solutions GED analysées",
          desc: "De l'éditeur mondial aux spécialistes régionaux."
        },
        {
          value: "70+",
          label: "Fonctionnalités par outil",
          desc: "Cartographiées avec précision dans notre base."
        },
        {
          value: "20+",
          label: "Connecteurs ERP",
          desc: "Pour une intégration fluide sans développements."
        },
        {
          value: "IA",
          label: "Analyse Contextuelle",
          desc: "Algorithme intelligent d'évaluation de la compatibilité."
        }
      ]
    },
    section9: {
      title: "Foire Aux Questions",
      subtitle: "Tout ce que vous devez savoir sur Documatch Context",
      faqs: [
        {
          question: "Documatch est-il gratuit ?",
          answer: "Oui, la première simulation et le rapport de compatibilité initial sont entièrement gratuits. Notre objectif est de vous faire gagner du temps dès le premier jour."
        },
        {
          question: "Comment les scores sont-ils calculés ?",
          answer: "Ils sont basés sur une analyse pondérée croisant vos réponses (ERP utilisé, secteur d'activité, volume de documents, contraintes de sécurité) avec une base de critères approfondie de chaque GED du marché."
        },
        {
          question: "Les éditeurs peuvent-ils influencer le classement ?",
          answer: "Absolument pas. L'algorithme de Documatch fonctionne de manière totalement indépendante. Les classements sont calculés uniquement selon la compatibilité réelle avec vos spécifications techniques."
        },
        {
          question: "Combien de temps faut-il pour obtenir un rapport ?",
          answer: "Le simulateur interactif affiche un premier aperçu instantanément. Le questionnaire guidé complet prend moins de 3 minutes et génère votre rapport d'analyse dans la foulée."
        }
      ]
    },
    finalCta: {
      title: "Prêt à trouver la GED qui correspond réellement à votre entreprise ?",
      subtitle1: "Évitez des semaines de comparaison fastidieuse et de réunions stériles.",
      subtitle2: "Obtenez un classement personnalisé et argumenté en quelques minutes.",
      button: "Commencer gratuitement",
    },
    footer: {
      tagline: "Comparateur intelligent et impartial de logiciels GED.",
      solutions: "Solutions comparées",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      cookies: "Politique des cookies",
      terms: "Conditions d'utilisation",
      contact: "Contactez-nous",
      copyright: "© 2026 Documatch. Tous droits réservés.",
    },
    wizard: {
      title: "Assistant d'Analyse GED Contextuelle",
      stepOf: "Étape",
      next: "Suivant",
      prev: "Précédent",
      calculate: "Lancer l'analyse IA",
      analyzing: "Analyse de votre contexte en cours...",
      done: "Analyse terminée !",
      resultsTitle: "Vos Recommandations Personnalisées",
      reset: "Refaire un test",
      fields: {
        companyName: "Nom de l'entreprise",
        usersCount: "Nombre d'utilisateurs prévus",
        primaryNeed: "Processus / Besoin prioritaire",
        allocatedBudget: "Budget d'équipement alloué (Annuel)",
      },
      needsOptions: ["Validation Factures", "Gestion RH / Dossiers Salariés", "Contrats Juridiques", "Courriers Entrants (LAD/RAD)", "Plans Techniques & CAO", "Archivage Général"],
    }
  },
  ES: {
    header: {
      solutions: 'Soluciones',
      features: 'Características',
      howItWorks: 'Cómo funciona',
      contact: 'Contacto',
      getStarted: 'Empezar gratis',
    },
    hero: {
      titleHighlight: 'Elige el mejor GED',
      titleRest: ' para tu empresa.',
      subtitle: 'Sin perder semanas comparando decenas de soluciones. Documatch analiza tu contexto empresarial, tus procesos, tu ERP y tus requisitos para recomendarte el software de gestión documental más adecuado.',
      bullet1: 'Comparación objetiva',
      bullet2: 'Análisis impulsado por IA',
      bullet3: 'Recomendaciones contextualizadas',
      bullet4: 'Ahorro de tiempo considerable',
      getStarted: 'Empezar gratis',
      mockupTitle: 'Simulador de GED Contextual',
      labels: {
        erp: 'ERP / Sistema',
        industry: 'Sector / Negocio',
        constraints: 'Requisitos normativos',
        volume: 'Volumen mensual',
        docsPerMonth: 'documentos / mes',
        recommendedGed: 'GED Recomendado',
        compatibilityHigh: 'Compatibilidad muy alta',
        compatibilityMedium: 'Compatible',
        compatibilityLow: 'Compatibilidad moderada',
      },
    },
    section2: {
      title: "¿Por qué tantas empresas siguen eligiendo su GED al azar?",
      intro: "Hoy en día, la mayoría de los proyectos de GED comienzan con:",
      point1: "búsquedas tediosas en Google",
      point2: "comparativas de características incompletas",
      point3: "múltiples demostraciones comerciales que consumen tiempo",
      point4: "semanas enteras perdidas",
      body1: "Sin embargo, cada empresa tiene necesidades totalmente diferentes.",
      body2: "El mejor software para otra empresa no es necesariamente el mejor para la tuya.",
      outro: "Documatch cambia radicalmente este enfoque.",
    },
    section3: {
      title: "¿Cómo funciona Documatch?",
      subtitle: "Cuatro pasos sencillos para encontrar la solución de gestión documental ideal",
      steps: [
        {
          number: "1",
          title: "Describes tu empresa",
          details: ["ERP y Conectores", "Sector de actividad", "Procesos clave", "Volúmenes de documentos", "Requisitos de cumplimiento", "Presupuesto objetivo"]
        },
        {
          number: "2",
          title: "Nuestra IA analiza tu contexto",
          details: ["Se comparan simultáneamente más de 150 criterios técnicos y funcionales para identificar el software que realmente se adapta."]
        },
        {
          number: "3",
          title: "Obtienes una clasificación personalizada",
          details: ["Cada software de GED recibe una puntuación de compatibilidad transparente, junto con los motivos de la recomendación."]
        },
        {
          number: "4",
          title: "Contactas solo a los mejores",
          details: ["Menos demostraciones inútiles.", "Más relevancia y eficiencia.", "Un proyecto de GED completado en tiempo récord."]
        }
      ]
    },
    section4: {
      title: "Ejemplo real de Matching",
      subtitle: "Observa cómo nuestro algoritmo filtra y ordena instantáneamente las soluciones",
      profileLabel: "Tu Empresa",
      industryLabel: "Sector de actividad",
      erpLabel: "Conector ERP",
      usersLabel: "Usuarios",
      processLabel: "Proceso clave",
      countryLabel: "Ubicación",
      analysisLabel: "Análisis IA Contextual",
      compatLabel: "Puntuación de Compatibilidad",
      exampleProfile: {
        industry: "Industria Manufacturera",
        erp: "SAP S/4HANA",
        users: "15 usuarios activos",
        process: "Validación de Facturas de Proveedores",
        country: "España",
      }
    },
    section5: {
      title: "¿Por qué Documatch es diferente?",
      subtitle: "Un comparador de nueva generación centrado en el éxito de tu proyecto",
      cards: [
        {
          title: "Análisis Contextual",
          description: "No solo comparamos casillas de verificación. Analizamos en profundidad tu entorno de negocio, tus flujos operativos y tus integraciones de sistemas existentes."
        },
        {
          title: "Recomendación IA",
          description: "Cada recomendación está 100% personalizada según tus necesidades reales y tus limitaciones únicas, eliminando los sesgos comerciales habituales."
        },
        {
          title: "Comparación 100% Objetiva",
          description: "Sin clasificaciones patrocinadas ni promociones comerciales ocultas. Solo relevancia técnica y coherencia funcional."
        }
      ]
    },
    section6: {
      title: "Más criterios que cualquier comparador clásico",
      subtitle: "Una base de conocimientos de GED exhaustiva y actualizada en tiempo real",
      categories: [
        {
          title: "ERP y Sistemas integrados",
          items: ["SAP S/4HANA", "Microsoft Dynamics", "Sage 100 / 1000", "Oracle NetSuite", "IFS Applications", "Cegid", "Odoo", "Salesforce"]
        },
        {
          title: "Sectores empresariales",
          items: ["Industria y Logística", "Construcción / BTP", "Finanzas y Seguros", "Salud y Farma", "Administración Pública", "Inmobiliaria y Notaría", "Empresas de Servicios"]
        },
        {
          title: "Funcionalidades avanzadas",
          items: ["Reconocimiento Automático (OCR)", "Flujos de aprobación complejos", "Firma electrónica nativa", "Archivo digital con valor probatorio", "IA Generativa de extracción", "Captura multicanal", "Indexación automática"]
        },
        {
          title: "Normas y Cumplimiento",
          items: ["RGPD (Protección de datos)", "ISO 27001 (Seguridad)", "Factura electrónica obligatoria", "eIDAS (Firma digital estándar)", "Certificación tributaria local"]
        }
      ]
    },
    section7: {
      title: "Compara los métodos",
      subtitle: "Cómo revoluciona Documatch tu búsqueda de software",
      headers: {
        without: "Sin Documatch",
        with: "Con Documatch",
      },
      rows: [
        {
          without: "8 demostraciones comerciales de 2 horas",
          with: "2 demostraciones súper enfocadas",
        },
        {
          without: "Hojas de Excel complejas de mantener",
          with: "Panel interactivo de comparación",
        },
        {
          without: "Búsqueda manual en decenas de sitios web",
          with: "Análisis instantáneo en pocos minutos",
        },
        {
          without: "Discurso comercial sesgado de los proveedores",
          with: "Recomendaciones de IA neutrales y objetivas",
        },
        {
          without: "Decisión subjetiva basada en la apariencia",
          with: "Decisión racional basada en compatibilidad técnica",
        },
        {
          without: "Varias semanas o meses de investigación",
          with: "Ahorro de tiempo sustancial (proyecto listo en 48h)",
        },
      ]
    },
    section8: {
      title: "La gestión documental en cifras",
      stats: [
        {
          value: "50+",
          label: "Soluciones GED analizadas",
          desc: "Desde líderes mundiales hasta especialistas locales."
        },
        {
          value: "70+",
          label: "Características por herramienta",
          desc: "Mapeadas con precisión en nuestra base de datos."
        },
        {
          value: "20+",
          label: "Conectores ERP",
          desc: "Para una integración sin fisuras ni desarrollos costosos."
        },
        {
          value: "IA",
          label: "Análisis Contextual",
          desc: "Algoritmo inteligente para evaluar la compatibilidad real."
        }
      ]
    },
    section9: {
      title: "Preguntas Frecuentes",
      subtitle: "Todo lo que necesitas saber sobre Documatch Context",
      faqs: [
        {
          question: "¿Documatch es gratuito?",
          answer: "Sí, la primera simulación y el informe de compatibilidad inicial son completamente gratuitos. Nuestro objetivo es ahorrarte tiempo desde el primer día."
        },
        {
          question: "¿Cómo se calculan las puntuaciones?",
          answer: "Se basan en un análisis ponderado que cruza tus respuestas (ERP, sector, volumen de documentos y restricciones de seguridad) con la base de especificaciones técnicas de cada GED."
        },
        {
          question: "¿Pueden los proveedores influir en el ranking?",
          answer: "En absoluto. El algoritmo de Documatch opera de manera totalmente independiente. Las puntuaciones se calculan basándose únicamente en la compatibilidad técnica y funcional con tus requisitos."
        },
        {
          question: "¿Cuánto tiempo se tarda?",
          answer: "El simulador interactivo te da un primer resultado al instante. El cuestionario guiado completo dura menos de 3 minutos y genera tu informe detallado de inmediato."
        }
      ]
    },
    finalCta: {
      title: "¿Listo para encontrar el GED que realmente se adapta a tu empresa?",
      subtitle1: "Evita semanas de comparaciones aburridas y reuniones improductivas.",
      subtitle2: "Obtén una clasificación personalizada y argumentada en pocos minutos.",
      button: "Empezar gratis",
    },
    footer: {
      tagline: "Comparador inteligente e imparcial de software de gestión documental (GED).",
      solutions: "Soluciones comparadas",
      legal: "Aviso legal",
      privacy: "Política de privacidad",
      cookies: "Política de cookies",
      terms: "Condiciones de uso",
      contact: "Contacto",
      copyright: "© 2026 Documatch. Todos los derechos reservados.",
    },
    wizard: {
      title: "Asistente de Análisis de GED Contextual",
      stepOf: "Paso",
      next: "Siguiente",
      prev: "Anterior",
      calculate: "Iniciar análisis de IA",
      analyzing: "Analizando tu contexto en tiempo real...",
      done: "¡Análisis completado!",
      resultsTitle: "Tus Recomendaciones Personalizadas",
      reset: "Volver a empezar",
      fields: {
        companyName: "Nombre de la empresa",
        usersCount: "Número de usuarios previstos",
        primaryNeed: "Proceso / Necesidad prioritaria",
        allocatedBudget: "Presupuesto asignado de equipamiento (Anual)",
      },
      needsOptions: ["Validación de Facturas", "Gestión de Recursos Humanos / Expedientes", "Contratos Legales", "Correspondencia Entrante", "Planos Técnicos e Ingeniería", "Archivo General"],
    }
  },
  EN: {
    header: {
      solutions: 'Solutions',
      features: 'Features',
      howItWorks: 'How it Works',
      contact: 'Contact',
      getStarted: 'Get started free',
    },
    hero: {
      titleHighlight: 'Choose the best DMS',
      titleRest: ' for your business.',
      subtitle: 'Without wasting weeks comparing dozens of solutions. Documatch analyzes your business context, processes, ERP, and constraints to recommend the most suitable document management software.',
      bullet1: 'Objective comparison',
      bullet2: 'AI-powered analysis',
      bullet3: 'Contextual recommendations',
      bullet4: 'Considerable time savings',
      getStarted: 'Get started free',
      mockupTitle: 'Contextual DMS Simulator',
      labels: {
        erp: 'ERP / System',
        industry: 'Industry / Sector',
        constraints: 'Regulatory constraints',
        volume: 'Monthly volume',
        docsPerMonth: 'documents / month',
        recommendedGed: 'Recommended DMS',
        compatibilityHigh: 'Very high compatibility',
        compatibilityMedium: 'Compatible',
        compatibilityLow: 'Moderate compatibility',
      },
    },
    section2: {
      title: "Why do so many companies still choose their DMS at random?",
      intro: "Today, most Document Management System (DMS) projects start with:",
      point1: "tedious Google searches",
      point2: "incomplete feature checklists",
      point3: "multiple time-consuming sales demos",
      point4: "weeks of wasted time",
      body1: "Yet every business has entirely different operational requirements.",
      body2: "The best software for another company is not necessarily the best for yours.",
      outro: "Documatch completely changes this approach.",
    },
    section3: {
      title: "How does Documatch work?",
      subtitle: "Four simple steps to find your ideal document management solution",
      steps: [
        {
          number: "1",
          title: "Describe your company",
          details: ["ERP & Connectors", "Industry Sector", "Core Processes", "Document Volumes", "Compliance Constraints", "Target Budget"]
        },
        {
          number: "2",
          title: "Our AI analyzes your context",
          details: ["Over 150 technical and functional criteria are compared simultaneously to identify systems that truly fit."]
        },
        {
          number: "3",
          title: "Get your custom ranking",
          details: ["Each DMS software receives a transparent compatibility score accompanied by detailed reasons for the match."]
        },
        {
          number: "4",
          title: "Contact only the best matches",
          details: ["Fewer useless demos.", "Higher relevance and productivity.", "Your DMS project finished in record time."]
        }
      ]
    },
    section4: {
      title: "Real Matching Example",
      subtitle: "See how our algorithm instantly filters and sorts matching solutions",
      profileLabel: "Your Company",
      industryLabel: "Industry Sector",
      erpLabel: "ERP Connector",
      usersLabel: "Users",
      processLabel: "Core Process",
      countryLabel: "Location",
      analysisLabel: "Contextual AI Analysis",
      compatLabel: "Compatibility Score",
      exampleProfile: {
        industry: "Manufacturing Industry",
        erp: "SAP S/4HANA",
        users: "15 active users",
        process: "Accounts Payable Invoice Validation",
        country: "Germany",
      }
    },
    section5: {
      title: "Why is Documatch different?",
      subtitle: "A next-generation comparison platform focused on your project's success",
      cards: [
        {
          title: "Contextual Analysis",
          description: "We don't just compare tick boxes. We deeply analyze your business environment, operational workflows, and existing systems integration."
        },
        {
          title: "AI Recommendation",
          description: "Each recommendation is 100% personalized to your actual needs and unique constraints, eliminating usual sales biases."
        },
        {
          title: "100% Objective Comparison",
          description: "No sponsored listings, no hidden vendor promotions. Just technical relevance and functional coherence."
        }
      ]
    },
    section6: {
      title: "More criteria than any classic comparison tool",
      subtitle: "A comprehensive DMS knowledge base updated in real-time",
      categories: [
        {
          title: "ERP & Integrated Systems",
          items: ["SAP S/4HANA", "Microsoft Dynamics", "Sage 100 / 1000", "Oracle NetSuite", "IFS Applications", "Cegid", "Odoo", "Salesforce"]
        },
        {
          title: "Business Sectors",
          items: ["Manufacturing & Logistics", "Construction / BTP", "Finance & Insurance", "Healthcare & Pharma", "Public Administration", "Real Estate & Notary", "Professional Services"]
        },
        {
          title: "Advanced Features",
          items: ["Automated OCR", "Complex approval workflows", "Native e-Signatures", "Legally binding digital archiving", "Generative AI extraction", "Multi-channel capture", "Auto-indexing"]
        },
        {
          title: "Standards & Compliance",
          items: ["GDPR (Data privacy)", "ISO 27001 (Security)", "SOC 2 Type II", "HIPAA Healthcare", "eIDAS Digital Signature", "Electronic Invoicing portals"]
        }
      ]
    },
    section7: {
      title: "Compare the methods",
      subtitle: "How Documatch revolutionizes your software search",
      headers: {
        without: "Without Documatch",
        with: "With Documatch",
      },
      rows: [
        {
          without: "8 commercial demos of 2 hours each",
          with: "2 highly targeted demos",
        },
        {
          without: "Complex, hard-to-maintain Excel checklists",
          with: "Interactive comparison dashboard",
        },
        {
          without: "Manual research on dozens of websites",
          with: "Instant analysis in just a few minutes",
        },
        {
          without: "Biased sales pitches from software vendors",
          with: "Neutral and objective AI recommendations",
        },
        {
          without: "Subjective decisions based on visual design",
          with: "Rational decisions based on technical fit",
        },
        {
          without: "Several weeks or months of researching",
          with: "Substantial time savings (project ready in 48h)",
        },
      ]
    },
    section8: {
      title: "Document management in numbers",
      stats: [
        {
          value: "50+",
          label: "DMS Solutions analyzed",
          desc: "From global market leaders to specialized local options."
        },
        {
          value: "70+",
          label: "Features per software",
          desc: "Mapped with extreme precision in our database."
        },
        {
          value: "20+",
          label: "ERP Connectors",
          desc: "For smooth out-of-the-box system integration."
        },
        {
          value: "AI",
          label: "Contextual Analysis",
          desc: "Smart algorithm for assessing real-world compatibility."
        }
      ]
    },
    section9: {
      title: "Frequently Asked Questions",
      subtitle: "Everything you need to know about Documatch Context",
      faqs: [
        {
          question: "Is Documatch free?",
          answer: "Yes, the first simulation and your initial compatibility report are completely free. Our goal is to save you time from day one."
        },
        {
          question: "How are the compatibility scores calculated?",
          answer: "They are based on a weighted analysis cross-referencing your inputs (ERP in use, industry sector, document volume, and security guidelines) with an intensive database of criteria for each software."
        },
        {
          question: "Can publishers or vendors influence the results?",
          answer: "Absolutely not. The Documatch algorithm operates completely independently. Rankings are computed solely based on direct functional match against your specifications."
        },
        {
          question: "How long does it take?",
          answer: "The interactive simulator shows initial ratings instantly. The guided step-by-step wizard takes less than 3 minutes and delivers your complete report immediately."
        }
      ]
    },
    finalCta: {
      title: "Ready to find the DMS that actually matches your company?",
      subtitle1: "Avoid weeks of boring comparisons and unproductive sales meetings.",
      subtitle2: "Get a custom, reasoned ranking in just a few minutes.",
      button: "Get started free",
    },
    footer: {
      tagline: "Intelligent and impartial Document Management System (DMS) comparisons.",
      solutions: "Compared Solutions",
      legal: "Legal notice",
      privacy: "Privacy policy",
      cookies: "Cookie policy",
      terms: "Terms of Use",
      contact: "Contact",
      copyright: "© 2026 Documatch. All rights reserved.",
    },
    wizard: {
      title: "Contextual DMS Analysis Assistant",
      stepOf: "Step",
      next: "Next",
      prev: "Previous",
      calculate: "Run AI Analysis",
      analyzing: "Analyzing your company context in real-time...",
      done: "Analysis Completed!",
      resultsTitle: "Your Personalized Recommendations",
      reset: "Run a new test",
      fields: {
        companyName: "Company Name",
        usersCount: "Estimated Users",
        primaryNeed: "Key Process / Requirement",
        allocatedBudget: "Allocated Equipment Budget (Annual)",
      },
      needsOptions: ["Invoice Validation / AP", "HR Management / Employee Records", "Legal Contracts", "Incoming Mail / Correspondence", "Engineering Plans & CAD", "General Archiving"],
    }
  }
};

export const ERP_OPTIONS = [
  'SAP S/4HANA',
  'SAP Business One',
  'Microsoft Dynamics 365 Business Central',
  'Microsoft Dynamics 365 Finance & Operations',
  'Sage 100',
  'Sage X3',
  'Cegid Quadra / Cegid XRP',
  'Oracle NetSuite',
  'Oracle ERP Cloud (EBS)',
  'Infor LN / M3',
  'EBP Horizon',
  'Odoo',
  'Wave / Cegid Izi',
  'IFS Applications',
  'Divalto',
  'Proginov',
  'Ekon / Sage Murano',
  'Silae',
  'Lucca',
  'Asys / Chronos'
];

export const INDUSTRY_OPTIONS: Record<Language, string[]> = {
  FR: [
    'Finance & Secrétariat', 
    'Industrie & Logistique', 
    'BTP / Construction', 
    'Santé, Pharma & Cliniques', 
    'Immobilier, Promoteurs & Notaire', 
    'Collectivité, Public & Éducation', 
    'Services Professionnels & Conseil',
    'Distribution, Commerce & E-commerce',
    'Agroalimentaire & FMCG',
    'Énergie, Utilities & Environnement',
    'Transport & Transitaires',
    'Cabinets Juridiques & Avocats'
  ],
  ES: [
    'Finanzas y Administración', 
    'Industria y Logística', 
    'Construcción / BTP', 
    'Salud, Farmacia y Clínicas', 
    'Inmobiliaria, Promotores y Notaría', 
    'Administración Pública y Educación', 
    'Servicios Profesionales y Consultoría',
    'Distribución, Retail y Comercio Electrónico',
    'Sector Agroalimentario',
    'Energía, Utilities y Medio Ambiente',
    'Transporte y Transitarios',
    'Despachos de Abogados y Asesorías'
  ],
  EN: [
    'Finance & Administration', 
    'Manufacturing & Logistics', 
    'Construction & Real Estate', 
    'Healthcare, Pharma & Clinics', 
    'Real Estate, Developers & Notary', 
    'Public Sector, Gov & Education', 
    'Professional Services & Consulting',
    'Retail, Wholesale & E-commerce',
    'Food, Beverage & Agriculture',
    'Energy, Utilities & Cleantech',
    'Transportation & Freight Forwarding',
    'Legal Services & Law Firms'
  ],
};

export const CONSTRAINT_OPTIONS: Record<Language, string[]> = {
  FR: [
    'Facture Électronique 2026 (France)',
    'NF203 (France - Archivage Inaltérable)',
    'HDS (Hébergement Données de Santé - France)',
    'Piste d\'Audit Fiable (PAF - France/Europe)',
    'RGPD strict / GDPR (France, Belgique, Luxembourg)',
    'eIDAS (Belgique, Luxembourg - Signature & Cachet Électronique)',
    'nLPD - Protection des Données (Suisse)',
    'GeBüV - Ordonnance sur la tenue et la conservation des livres (Suisse)',
    'PEPPOL & e-Invoicing (Belgique, Luxembourg, Suisse)',
    'ISO 27001 (Sécurité & Cloud)',
    'Archivage Légal (SAE - Système d\'Archivage Électronique)'
  ],
  ES: [
    'Ley Crea y Crece / Reglamento Veri*factu (España)',
    'ENS (Esquema Nacional de Seguridad - España)',
    'LOPDGDD & RGPD (España - Protección de Datos)',
    'Factura Electrónica Obligatoria B2B (España)',
    'eIDAS (España/UE - Firma electrónica avanzada)',
    'Certificación de Software de Facturación (AEAT - España)',
    'Ley de Firma Electrónica y Sello de Tiempo (España)',
    'Pista de Auditoría Fiable (España)',
    'ISO 27001 (España/UE - Seguridad y Cloud)'
  ],
  EN: [
    'GoBD Compliance (Germany - Bookkeeping Standards)',
    'ZUGFeRD / Factur-X Format (Germany - e-Invoicing)',
    'IDW PS 880 (Germany - Software Audit Standards)',
    'Strict DSGVO / GDPR Compliance (Germany & Netherlands)',
    'Dutch Civil Code Art. 2:10 (Netherlands - Retention & Admin Duties)',
    'PEPPOL Connection & e-Invoicing (Germany & Netherlands)',
    'Belastingdienst Guidelines (Netherlands Tax Authority Compliance)',
    'ISO 27001 (Information Security Standards)',
    'eIDAS Regulations (Germany & Netherlands - E-Signatures)',
    'Data Sovereignty & EU Cloud (Germany & Netherlands)'
  ],
};

export const CONSTRAINT_MAPPINGS: Record<Language, number[]> = {
  FR: [0, 4, 7, 15, 2, 5, 2, 4, 13, 3, 6],
  ES: [1, 8, 2, 1, 5, 1, 14, 15, 3],
  EN: [4, 10, 3, 2, 16, 13, 15, 3, 5, 17]
};

export const VOLUME_OPTIONS = [
  '100 - 500 documents / mois',
  '500 - 800 documents / mois',
  '800 - 1,000 documents / mois',
  '1,000 - 1,400 documents / mois',
  '1,400 - 1,500 documents / mois',
  '1,500 - 2,000 documents / mois',
  '2,000 - 5,000 documents / mois',
  '5,000 - 10,000 documents / mois',
  '10,000 - 20,000 documents / mois',
  '20,000 - 50,000 documents / mois',
  '50,000+ documents / mois'
];

export interface ProcessOption {
  id: string;
  title: string;
  description: string;
}

export const PROCESS_OPTIONS: Record<Language, ProcessOption[]> = {
  FR: [
    { id: 'fact_prov', title: 'Factures fournisseurs', description: 'Factures d\'achat, factures de prestations de services et justificatifs fournisseurs.' },
    { id: 'fact_cli', title: 'Factures clients', description: 'Factures de vente, factures d\'acompte, avoirs et relevés de facturation émis.' },
    { id: 'alb_env', title: 'Bons de livraison (Expédition)', description: 'Documents d\'accompagnement des marchandises expédiées et albarans d\'envoi.' },
    { id: 'recibos', title: 'Reçus, tickets et notes de frais', description: 'Tickets de caisse, reçus de paiement, notes de restaurant et frais de déplacement.' },
    { id: 'planos', title: 'Plans et dessins techniques (CAO/DAO)', description: 'Plans de construction, schémas techniques, fichiers CAO et dessins industriels.' },
    { id: 'fiscales', title: 'Documents fiscaux et déclarations', description: 'Déclarations de TVA, liasses fiscales, impôts sur les sociétés et taxes diverses.' },
    { id: 'economicos', title: 'Documents économiques et financiers', description: 'Rapports annuels, budgets prévisionnels, grands livres comptables et analyses financières.' },
    { id: 'contratos', title: 'Contrats commerciaux et d\'achat', description: 'Contrats de partenariat, contrats d\'achat, accords de confidentialité et baux.' },
    { id: 'nominas', title: 'Bulletins de paie (Nóminas)', description: 'Fiches de paie mensuelles des salariés, déclarations sociales et charges patronales.' },
    { id: 'exp_personal', title: 'Dossiers du personnel (RH)', description: 'Dossiers d\'embauche, cv, diplômes, certificats de travail et évaluations annuelles.' },
    { id: 'pedidos', title: 'Bons de commande (Purchasing)', description: 'Bons de commande émis aux fournisseurs ou reçus des clients.' },
    { id: 'correspondencia', title: 'Courriers et correspondances', description: 'Lettres d\'affaires, courriers postaux numérisés, courriels officiels et télécopies.' },
    { id: 'manuales_calidad', title: 'Manuels de qualité et procédures ISO', description: 'Manuels qualité, procédures opérationnelles, consignes de sécurité et fiches de contrôle.' },
    { id: 'notariales', title: 'Actes notariés et documents juridiques', description: 'Statuts de l\'entreprise, actes de propriété, jugements et procurations légales.' },
    { id: 'alb_rec', title: 'Bons de réception (Entrée)', description: 'Bons de livraison fournisseurs, bons de réception de matériel et contrôles qualité d\'entrée.' },
    { id: 'medicos', title: 'Dossiers médicaux et cliniques', description: 'Rapports médicaux, ordonnances, imageries médicales et dossiers de suivi de patients.' }
  ],
  ES: [
    { id: 'fact_prov', title: 'Facturas de proveedores', description: 'Facturas de compras, facturas de servicios y justificantes de pago a proveedores.' },
    { id: 'fact_cli', title: 'Facturas de clientes', description: 'Facturas de ventas, facturas rectificativas, abonos y estados de facturación emitidos.' },
    { id: 'alb_env', title: 'Albaranes de envío (Salida)', description: 'Documentos de entrega de mercancías enviadas y comprobantes de transporte.' },
    { id: 'recibos', title: 'Recibos, tickets y notas de gastos', description: 'Tickets de caja, recibos de pago, tiques de restaurante y gastos de kilometraje.' },
    { id: 'planos', title: 'Planos y diseños técnicos (CAD)', description: 'Planos de construcción, esquemas de ingeniería, archivos CAD y diseños industriales.' },
    { id: 'fiscales', title: 'Documentos fiscales e impuestos', description: 'Declaraciones de IVA, Modelos de Hacienda, impuesto sobre sociedades y tasas.' },
    { id: 'economicos', title: 'Documentos económicos y financieros', description: 'Cuentas anuales, presupuestos consolidados, libros mayores y balances contables.' },
    { id: 'contratos', title: 'Contratos comerciales y de compra', description: 'Contratos con clientes, acuerdos de confidencialidad, convenios y contratos de alquiler.' },
    { id: 'nominas', title: 'Nóminas de empleados', description: 'Recibos de salarios mensuales de la plantilla, cotizaciones a la Seguridad Social (TC1, TC2).' },
    { id: 'exp_personal', title: 'Expedientes de personal (RRHH)', description: 'Fichas de empleados, currículum vitae, titulaciones, bajas médicas y evaluaciones de desempeño.' },
    { id: 'pedidos', title: 'Pedidos de compra y suministro', description: 'Órdenes de compra enviadas a proveedores o solicitudes de pedidos de clientes.' },
    { id: 'correspondencia', title: 'Correspondencia y cartas', description: 'Cartas comerciales, correos electrónicos corporativos oficiales y notificaciones físicas escaneadas.' },
    { id: 'manuales_calidad', title: 'Manuales de calidad y normas ISO', description: 'Manuales de calidad, procedimientos operativos normalizados (PNT) e instrucciones de seguridad.' },
    { id: 'notariales', title: 'Escrituras y documentos notariales', description: 'Escrituras de constitución de la sociedad, poderes notariales, contratos públicos y actas.' },
    { id: 'alb_rec', title: 'Albaranes de recepción (Entrada)', description: 'Albaranes de proveedores, comprobantes de recepción de mercancía y controles de calidad de entrada.' },
    { id: 'medicos', title: 'Expedientes clínicos e informes médicos', description: 'Informes médicos, recetas, historias clínicas de pacientes y resultados de analíticas.' }
  ],
  EN: [
    { id: 'fact_prov', title: 'Supplier Invoices', description: 'Accounts payable invoices, vendor bills, and purchase receipts.' },
    { id: 'fact_cli', title: 'Customer Invoices', description: 'Sales invoices, credit notes, account statements, and billing summaries.' },
    { id: 'alb_env', title: 'Delivery Notes (Outbound)', description: 'Shipping documents, packing slips, and proofs of delivery.' },
    { id: 'recibos', title: 'Receipts, Tickets & Expense Notes', description: 'Payment receipts, retail tickets, restaurant receipts, and mileage logs.' },
    { id: 'planos', title: 'Blueprints & Technical Drawings (CAD)', description: 'Construction plans, engineering schematics, CAD files, and technical specs.' },
    { id: 'fiscales', title: 'Tax Documents & Filings', description: 'VAT declarations, annual tax returns, corporate tax filings, and custom duties.' },
    { id: 'economicos', title: 'Financial & Economic Reports', description: 'Annual accounts, corporate budgets, general ledgers, and profit & loss statements.' },
    { id: 'contratos', title: 'Commercial Contracts & Agreements', description: 'Vendor agreements, sales contracts, non-disclosure agreements (NDAs), and leases.' },
    { id: 'nominas', title: 'Payslips & Payroll Records', description: 'Monthly employee paychecks, social security declarations, and payroll summaries.' },
    { id: 'exp_personal', title: 'Employee Files (HR Records)', description: 'Employment applications, resumes, certifications, medical clearance, and appraisals.' },
    { id: 'pedidos', title: 'Purchase Orders (PO)', description: 'Inbound customer orders or outbound supplier purchase sheets.' },
    { id: 'correspondencia', title: 'Correspondence & Letters', description: 'Business letters, scanned physical mail, official corporate emails, and fax records.' },
    { id: 'manuales_calidad', title: 'Quality Manuals & ISO Procedures', description: 'Quality standard operating guidelines, ISO manuals, and compliance worksheets.' },
    { id: 'notariales', title: 'Notary Deeds & Legal Filings', description: 'Articles of incorporation, power of attorney documents, court filings, and deeds.' },
    { id: 'alb_rec', title: 'Receiving Slips (Inbound)', description: 'Inbound vendor delivery notes, warehouse receiving reports, and incoming inspection logs.' },
    { id: 'medicos', title: 'Medical Reports & Clinical Records', description: 'Patient histories, clinical findings, lab results, prescriptions, and medical imaging logs.' }
  ]
};

export interface GedResult {
  name: string;
  score: number;
  badge: 'high' | 'medium' | 'low';
  reasons: Record<Language, string>;
  logoBg: string;
  accentColor: string;
  rating: number;
  reviewsCount: number;
}

interface GedEngineConfig {
  name: string;
  logoBg: string;
  accentColor: string;
  rating: number;
  reviewsCount: number;
  processStrengths: string[];
  calculateScore: (erp: string, indIdx: number, consIdx: number, volIdx: number) => number;
  getReasons: (erp: string, indIdx: number, consIdx: number, volIdx: number) => Record<Language, string>;
}

const GED_ENGINE_DATABASE: GedEngineConfig[] = [
  {
    name: 'Doxis (SER Group)',
    logoBg: 'bg-gradient-to-br from-blue-700 to-slate-900',
    accentColor: 'text-blue-400',
    rating: 4.5,
    reviewsCount: 215,
    processStrengths: ['planos', 'manuales_calidad', 'economicos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 52;
      if (erp.includes('SAP')) s += 30;
      else if (erp.includes('Infor') || erp.includes('IFS') || erp.includes('Proginov') || erp.includes('Dynamics')) s += 18;
      else s -= 12;
      if (ind === 1 || ind === 2 || ind === 9) s += 20; // Manufacturing/Construction/Energy
      if (cons === 3) s += 15; // ISO 27001
      if (cons === 4) s += 18; // NF203
      if (vol >= 7) s += 15; // High volume
      else if (vol <= 4) s -= 15; // Not for small volumes
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: erp.includes('SAP') 
        ? `Liaison certifiée SAP de haut niveau. Parfaitement adaptée aux volumes d'entreprise industrielle sous contrainte NF203.`
        : `Moteur ECM haut de gamme d'origine allemande, recommandé pour sa robustesse industrielle et ses coffres-forts immuables.`,
      ES: erp.includes('SAP')
        ? `Integración certificada con SAP de alta gama. Idóneo para corporaciones industriales y requisitos estrictos NF203.`
        : `Potente motor ECM alemán, idóneo para grandes cuentas industriales por su robustez técnica y archivo inalterable.`,
      EN: erp.includes('SAP')
        ? `Top-tier certified SAP gateway. Perfectly suited for industrial enterprises requiring strict NF203 archiving.`
        : `Premium German ECM engine built for heavy industrial compliance, deep system integrations, and audit-proof storage.`
    })
  },
  {
    name: 'DocuWare',
    logoBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    accentColor: 'text-amber-500',
    rating: 4.7,
    reviewsCount: 624,
    processStrengths: ['fact_prov', 'fact_cli', 'alb_env', 'recibos', 'contratos', 'nominas', 'exp_personal', 'pedidos', 'economicos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 58;
      if (erp.includes('Sage') || erp.includes('Cegid') || erp.includes('Odoo') || erp.includes('Divalto') || erp.includes('EBP')) s += 25;
      else if (erp.includes('Dynamics')) s += 15;
      if (ind === 0 || ind === 6 || ind === 7 || ind === 4) s += 18; // Finance / Services / Retail / Real Estate
      if (cons === 1) s += 20; // Ley Crea y Crece (very strong homologated)
      if (cons === 19) s += 16; // Offline/Sync
      if (vol <= 7) s += 12; // Mid market sweet spot
      else s -= 10;
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: cons === 1 
        ? `Homologuée AEAT en Espagne avec conformité absolue Ley Crea y Crece. Interface très ergonomique.`
        : `Excellent outil polyvalent pour PME. S'intègre sans développement complexe à votre ERP grâce à ses connecteurs natifs.`,
      ES: cons === 1
        ? `Software homologado por la AEAT para digitalización certificada y adaptado nativamente a la Ley Crea y Crece.`
        : `Líder en el mercado de Pymes con flujos de aprobación visuales extremadamente fáciles de usar y rápida implantación.`,
      EN: cons === 1
        ? `Fully AEAT-homologated software ensuring total compliance with Ley Crea y Crece and anti-fraud guidelines.`
        : `Top-rated versatile DMS for Mid-market firms, featuring visual workflow builders and easy out-of-the-box connectors.`
    })
  },
  {
    name: 'Yooz',
    logoBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    accentColor: 'text-emerald-500',
    rating: 4.6,
    reviewsCount: 412,
    processStrengths: ['fact_prov', 'recibos', 'pedidos', 'fiscales'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 54;
      if (erp.includes('Sage') || erp.includes('Cegid') || erp.includes('EBP') || erp.includes('Wave')) s += 30;
      else if (erp.includes('Odoo') || erp.includes('SAP')) s += 12;
      else s -= 10;
      if (ind === 0 || ind === 7) s += 25; // Finance / Accounts Payable focus
      if (cons === 0) s += 22; // Facture Electronique 2026 (PDP Candidate)
      if (cons === 1) s += 16; // Ley Crea y Crece
      if (cons === 10 || cons === 15) s += 15; // Factur-X / PAF
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Spécialiste absolu du traitement des factures (OCR IA). Candidat PDP officiel pour la réforme de la facture électronique 2026.`,
      ES: `Especialista en la automatización de facturas (OCR inteligente). Integración ideal con Sage, Cegid y flujos de cuentas a pagar.`,
      EN: `Unrivaled leader in accounts payable automation with advanced AI OCR, fully prepared for 2026 European electronic invoicing.`
    })
  },
  {
    name: 'M-Files',
    logoBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    accentColor: 'text-indigo-500',
    rating: 4.6,
    reviewsCount: 588,
    processStrengths: ['contratos', 'manuales_calidad', 'correspondencia', 'economicos', 'notariales'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 54;
      if (erp.includes('Dynamics')) s += 30;
      else if (erp.includes('Oracle') || erp.includes('SAP')) s += 15;
      if (ind === 1 || ind === 11 || ind === 6) s += 20; // Industrie / Juridique / Services
      if (cons === 2) s += 20; // GDPR strict
      if (cons === 16) s += 15; // Retention policies
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Gestion documentaire innovante basée sur le contexte ("ce que c'est" et non "où c'est") avec un moteur de métadonnées robuste.`,
      ES: `Gestión documental avanzada estructurada mediante metadatos en lugar de carpetas tradicionales. Excelente para Office 365.`,
      EN: `Innovative context-driven document management, organizing files by "what they are" rather than "where they are" via metadata.`
    })
  },
  {
    name: 'Neoledge',
    logoBg: 'bg-gradient-to-br from-cyan-600 to-sky-700',
    accentColor: 'text-cyan-500',
    rating: 4.3,
    reviewsCount: 96,
    processStrengths: ['exp_personal', 'nominas', 'medicos', 'contratos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 48;
      if (ind === 3 || ind === 5) s += 30; // Healthcare / Public Sector
      if (cons === 17 || cons === 7) s += 25; // Soberanía / HDS (french cloud)
      if (erp.includes('Lucca') || erp.includes('Silae') || erp.includes('Asys')) s += 30;
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Hébergement souverain Cloud en Europe (certifié HDS pour la santé). Parfait pour le secteur public et la gestion des RH.`,
      ES: `Garantiza la soberanía del dato con alojamiento europeo. Muy enfocada en el sector salud, administración pública y recursos humanos.`,
      EN: `Sovereign European cloud hosting (HDS certified). Specifically optimized for Public Sector, health structures, and HR files.`
    })
  },
  {
    name: 'OpenKM',
    logoBg: 'bg-gradient-to-br from-rose-600 to-pink-700',
    accentColor: 'text-rose-500',
    rating: 4.4,
    reviewsCount: 124,
    processStrengths: ['correspondencia', 'planos', 'manuales_calidad'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 50;
      if (erp.includes('Odoo') || erp.includes('Standard')) s += 25;
      if (cons === 8) s += 25; // ENS Spain
      if (cons === 5) s += 15; // eIDAS
      if (ind === 6 || ind === 5) s += 20; // Consulting/Public
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Plateforme Open Source hautement personnalisable avec API ouverte. Idéale pour des intégrations sur mesure et certifiée ENS en Espagne.`,
      ES: `Sólido software Open Source con API abierta para integraciones a medida. Certificado bajo el Esquema Nacional de Seguridad (ENS).`,
      EN: `Robust Open Source DMS platform. Highly appreciated for its open API, custom database integrations, and strict Spanish ENS certification.`
    })
  },
  {
    name: 'Zeendoc',
    logoBg: 'bg-gradient-to-br from-violet-600 to-fuchsia-700',
    accentColor: 'text-violet-500',
    rating: 4.7,
    reviewsCount: 342,
    processStrengths: ['fact_prov', 'fact_cli', 'recibos', 'nominas', 'exp_personal', 'contratos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 45;
      if (erp.includes('Sage 100') || erp.includes('EBP') || erp.includes('Wave') || erp.includes('Cegid')) s += 35;
      else s -= 15;
      if (ind === 4 || ind === 7 || ind === 0) s += 20; // Real Estate / Retail / Finance
      if (cons === 0 || cons === 4) s += 18; // Facture Electronique / NF203
      if (vol <= 4) s += 25; // small volume sweet spot
      else if (vol >= 7) s -= 30; // negative penalty for enterprise volumes
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Le champion français des TPE et PME. Facile d'utilisation, économique et taillé pour archiver les pièces comptables en toute légalité.`,
      ES: `Ideal para micro-pymes y despachos comerciales por su bajo coste. Muy intuitivo para la digitalización ágil de facturas.`,
      EN: `The French champion for smaller businesses. Low entry costs, simple onboarding, and highly structured for compliant tax archiving.`
    })
  },
  {
    name: 'Alfresco (Hyland)',
    logoBg: 'bg-gradient-to-br from-emerald-700 to-slate-900',
    accentColor: 'text-emerald-500',
    rating: 4.2,
    reviewsCount: 395,
    processStrengths: ['correspondencia', 'medicos', 'contratos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 48;
      if (erp.includes('Oracle') || erp.includes('SAP')) s += 25;
      if (ind === 5) s += 25; // Public Gov
      if (cons === 2) s += 15; // GDPR
      if (vol >= 7) s += 20; // massive volume
      else s -= 15;
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Plateforme d'archivage d'entreprise hautement évolutive. Utilisée historiquement par les grandes administrations publiques.`,
      ES: `Plataforma ECM robusta e histórica de código abierto, muy extendida en administraciones públicas y corporaciones complejas.`,
      EN: `Legacy open-source enterprise content platform, highly scalable and traditionally trusted by public government sectors.`
    })
  },
  {
    name: 'OnBase (Hyland)',
    logoBg: 'bg-gradient-to-br from-blue-800 to-indigo-950',
    accentColor: 'text-blue-400',
    rating: 4.5,
    reviewsCount: 284,
    processStrengths: ['medicos', 'contratos', 'economicos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 46;
      if (erp.includes('SAP') || erp.includes('Oracle')) s += 25;
      if (ind === 3) s += 30; // Healthcare
      if (cons === 7 || cons === 9) s += 20; // HDS/SOC 2
      if (vol >= 7) s += 20;
      else s -= 15;
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Structure ECM très robuste, leader mondial pour les secteurs de la santé, des mutuelles et des assurances.`,
      ES: `Arquitectura robusta de gestión documental con excelente implantación en el sector de la salud y seguros a nivel corporativo.`,
      EN: `Highly structured and secure ECM platform, globally recognized for its deep functional vertical modules in Health and Insurance.`
    })
  },
  {
    name: 'OpenText Content Suite',
    logoBg: 'bg-gradient-to-br from-slate-800 to-zinc-950',
    accentColor: 'text-slate-400',
    rating: 4.1,
    reviewsCount: 448,
    processStrengths: ['correspondencia', 'fiscales', 'planos', 'economicos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 38;
      if (erp.includes('SAP S/4HANA') || erp.includes('Oracle ERP Cloud')) s += 45;
      else s -= 20;
      if (vol >= 8) s += 30; // Huge volume
      else s -= 30;
      if (cons === 3 || cons === 9) s += 20; // Security standards
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Le leader mondial incontesté de l'ECM d'entreprise. Destiné aux multinationales gérant des millions de documents SAP.`,
      ES: `El líder mundial corporativo en gestión de contenido. Ideal para infraestructuras masivas y archivo crítico SAP.`,
      EN: `The undisputed global leader in enterprise content management, designed for major conglomerates with deep SAP/Oracle ties.`
    })
  },
  {
    name: 'Efalia',
    logoBg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    accentColor: 'text-teal-500',
    rating: 4.2,
    reviewsCount: 88,
    processStrengths: ['fiscales', 'correspondencia', 'contratos', 'notariales'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 50;
      if (erp.includes('Cegid') || erp.includes('Sage 100') || erp.includes('EBP')) s += 25;
      if (ind === 5 || ind === 6) s += 25; // Public / Services
      if (cons === 6) s += 25; // SAE legal archiving
      if (cons === 4) s += 16; // NF203
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Éditeur français spécialisé dans l'archivage légal à valeur probante (SAE) et la dématérialisation pour collectivités locales.`,
      ES: `Software francés especialista en archivo digital de valor probatorio (normas SAE/NF) e integración con administración pública local.`,
      EN: `French specialist in legally-binding digital archiving (SAE standard) and optimized paperless workflows for public sectors.`
    })
  },
  {
    name: 'ELO Digital Office',
    logoBg: 'bg-gradient-to-br from-orange-500 to-amber-600',
    accentColor: 'text-orange-500',
    rating: 4.4,
    reviewsCount: 182,
    processStrengths: ['manuales_calidad', 'fact_prov', 'contratos', 'economicos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 50;
      if (erp.includes('SAP') || erp.includes('Microsoft')) s += 25;
      if (cons === 4 || cons === 2) s += 20; // NF203 / GDPR Compliance
      if (ind === 1 || ind === 8) s += 20; // Manufacturing / Food
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Rigueur de conformité d'origine allemande. Conforme GoBD et NF203 pour un archivage immuable des écritures comptables.`,
      ES: `Rigor técnico alemán. Excelente para cumplir con normativas de auditoría estrictas y flujos de aprobación seguros.`,
      EN: `German-engineered DMS built around audit compliance (GoBD / NF203 standards) and highly secure structured document release.`
    })
  },
  {
    name: 'Therefore (Canon)',
    logoBg: 'bg-gradient-to-br from-red-600 to-rose-700',
    accentColor: 'text-red-500',
    rating: 4.3,
    reviewsCount: 145,
    processStrengths: ['correspondencia', 'fact_cli', 'alb_env', 'recibos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 48;
      if (erp.includes('Dynamics 365')) s += 30;
      if (cons === 14) s += 18; // qualified timestamping
      if (ind === 0 || ind === 7) s += 20;
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Propriété du groupe Canon, s'intègre nativement avec le matériel d'impression/numérisation et l'éco-système Microsoft.`,
      ES: `Solución de Canon que conecta de manera excepcional los escáneres y copiadoras físicas con el entorno Microsoft 365.`,
      EN: `Owned by the Canon Group, offering flawless connectivity with hardware scanners and deep Microsoft Office integration.`
    })
  },
  {
    name: 'Maarch',
    logoBg: 'bg-gradient-to-br from-emerald-600 to-lime-700',
    accentColor: 'text-emerald-500',
    rating: 4.1,
    reviewsCount: 66,
    processStrengths: ['correspondencia', 'contratos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 46;
      if (erp.includes('Odoo') || erp.includes('Standard')) s += 25;
      if (ind === 5) s += 35; // Public / Collectivités
      if (cons === 6) s += 22; // SAE digital archiving
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Solution Open Source spécialisée dans la gestion du courrier entrant/sortant (LAD/RAD) et la correspondance publique.`,
      ES: `Plataforma de código abierto de referencia para la gestión de correspondencia física digitalizada y archivo municipal.`,
      EN: `A popular Open Source document platform specifically designed for mailroom automation and public mail tracking.`
    })
  },
  {
    name: 'SharePoint (Microsoft 365)',
    logoBg: 'bg-gradient-to-br from-sky-500 to-blue-700',
    accentColor: 'text-sky-500',
    rating: 4.3,
    reviewsCount: 1845,
    processStrengths: ['contratos', 'exp_personal'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 42;
      if (erp.includes('Dynamics 365')) s += 35;
      if (ind === 6 || ind === 4) s += 20; // Services / Real estate
      if (cons === 2) s += 12; // standard compliance
      if (vol <= 5) s += 25; // SMB collaborative spot
      else s -= 20;
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `La plateforme collaborative par défaut incluse dans Office 365. Idéale pour le partage de documents entre collaborateurs internes.`,
      ES: `Infraestructura colaborativa estándar incluida en Microsoft 365, perfecta para el intercambio interno y flujos básicos.`,
      EN: `The default document collaboration layer in Microsoft 365, ideal for internal team sharing and standard workflows.`
    })
  },
  {
    name: 'Laserfiche',
    logoBg: 'bg-gradient-to-br from-indigo-700 to-blue-900',
    accentColor: 'text-indigo-400',
    rating: 4.5,
    reviewsCount: 312,
    processStrengths: ['fact_cli', 'alb_env', 'contratos'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 48;
      if (erp.includes('Dynamics') || erp.includes('NetSuite')) s += 25;
      if (ind === 5 || ind === 11) s += 20; // Gov / Legal
      if (cons === 16) s += 18; // multi-level retention
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Solution internationale réputée pour sa modélisation visuelle des processus et ses formulaires de capture internes.`,
      ES: `Potente motor visual de flujos de trabajo e interfaces web de captura muy valoradas para agilizar procesos de oficina.`,
      EN: `Renowned for its robust visual workflow designer, smart web-based forms, and flexible automated file routing.`
    })
  },
  {
    name: 'Nuxeo',
    logoBg: 'bg-gradient-to-br from-purple-700 to-pink-800',
    accentColor: 'text-purple-400',
    rating: 4.4,
    reviewsCount: 118,
    processStrengths: ['planos', 'manuales_calidad'],
    calculateScore: (erp, ind, cons, vol) => {
      let s = 45;
      if (erp.includes('Oracle') || erp.includes('NetSuite')) s += 30;
      if (ind === 1 || ind === 9) s += 30; // Industry / Energy (media asset/engineering)
      if (cons === 17) s += 18; // sovereignty
      return s;
    },
    getReasons: (erp, ind, cons, vol) => ({
      FR: `Plateforme Cloud native hautement extensible, spécialisée dans la gestion de documents complexes, de plans CAO et de ressources multimédias (DAM).`,
      ES: `Plataforma nativa Cloud muy potente para activos digitales masivos (DAM), planos de ingeniería y gestión documental estructurada.`,
      EN: `Highly scalable Cloud-native content platform built for engineering schemas, CAD files, and complex digital assets (DAM).`
    })
  }
];

// A dynamic simulation algorithm returning deterministic results based on parameters
export function getGedRecommendations(
  erp: string,
  industryIndex: number,
  constraintIndex: number | number[],
  volumeIndex: number,
  selectedProcessIds: string[] = [],
  lang: Language = 'FR'
): GedResult[] {
  
  const constraintIdxs = Array.isArray(constraintIndex) ? constraintIndex : [constraintIndex];
  const primaryConstraintIdx = constraintIdxs.length > 0 ? constraintIdxs[0] : -1;

  const rawResults: GedResult[] = GED_ENGINE_DATABASE
    .filter(ged => {
      // Zeendoc is only active/available in French-speaking European countries
      if (ged.name === 'Zeendoc' && lang !== 'FR') {
        return false;
      }
      return true;
    })
    .map(ged => {
    // Calculate the base score without any constraints (using -1)
    const baseScore = ged.calculateScore(erp, industryIndex, -1, volumeIndex);
    
    // Sum up the boosts from each selected constraint
    let constraintBoostSum = 0;
    constraintIdxs.forEach(c => {
      const scoreWithConstraint = ged.calculateScore(erp, industryIndex, c, volumeIndex);
      const boost = scoreWithConstraint - baseScore;
      if (boost > 0) {
        constraintBoostSum += boost;
      }
    });
    
    let rawScore = baseScore + constraintBoostSum;
    
    // Process-based compatibility boost
    if (selectedProcessIds.length > 0 && ged.processStrengths) {
      let matchCount = 0;
      selectedProcessIds.forEach(procId => {
        if (ged.processStrengths.includes(procId)) {
          matchCount++;
        }
      });
      // Add up to 18 points boost depending on matches
      if (matchCount > 0) {
        rawScore += Math.min(18, matchCount * 6);
      }
    }
    
    // Cap score between 45% and 98%
    const finalScore = Math.max(45, Math.min(98, rawScore));
    
    // Assign generic initial badge
    let badge: 'high' | 'medium' | 'low' = 'low';
    if (finalScore >= 80) badge = 'high';
    else if (finalScore >= 65) badge = 'medium';

    return {
      name: ged.name,
      score: finalScore,
      badge,
      logoBg: ged.logoBg,
      accentColor: ged.accentColor,
      reasons: ged.getReasons(erp, industryIndex, primaryConstraintIdx, volumeIndex),
      rating: ged.rating,
      reviewsCount: ged.reviewsCount
    };
  });

  // Sort by score descending
  const sorted = rawResults.sort((a, b) => b.score - a.score);

  // Assign correct badges dynamically based on rankings
  sorted.forEach((item, idx) => {
    if (idx < 3) {
      item.badge = 'high';
    } else if (idx < 8) {
      item.badge = 'medium';
    } else {
      item.badge = 'low';
    }
  });

  return sorted;
}


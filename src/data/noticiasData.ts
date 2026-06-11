export interface Author {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Comment {
  id: string;
  authorName: string;
  content: string;
  date: string;
}

export interface Article {
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  tag: string;
  image: string;
  date: string;
  readTime: string;
  authorId: string;
  comments: Comment[];
  views: number;
}

const DEFAULT_AUTHORS: Author[] = [
  {
    id: "santi-cabrera",
    name: "Santiago Cabrera",
    role: "Periodista de Tecnología",
    avatar: "SC"
  },
  {
    id: "eliana-gomez",
    name: "Eliana Gómez",
    role: "Redactora de Cultura y Sociedad",
    avatar: "EG"
  },
  {
    id: "marcos-juarez",
    name: "Marcos Juárez",
    role: "Corresponsal Policial y Deportes",
    avatar: "MJ"
  }
];

const DEFAULT_ARTICLES: Article[] = [
  {
    slug: "impacto-digitalizacion-resistencia-2026",
    title: "El impacto de la digitalización en los comercios de Resistencia: ¿Por qué tener una web ya no es opcional?",
    subtitle: "Los negocios locales de la capital chaqueña aceleran su transición a plataformas móviles para retener clientes y agilizar ventas frente a la competencia de grandes cadenas.",
    content: `En los últimos meses, el panorama comercial en Resistencia ha experimentado un giro notable. Cada vez más rotiserías, gimnasios, ferreterías y consultorios médicos están dejando atrás los tradicionales cuadernos y las demoras por mensajería manual para adoptar sistemas ágiles en la web.

Esta transición no solo responde a un deseo de innovación, sino a una necesidad competitiva directa. Con la llegada de grandes plataformas logísticas y franquicias nacionales, los comercios locales se enfrentan al reto de ofrecer una experiencia igual de veloz e interactiva.

"El cliente quiere inmediatez", comenta Santiago Cabrera, analista tecnológico local. "Si una persona en Resistencia tiene que esperar veinte minutos para recibir una respuesta por un menú o para reservar un turno médico, probablemente busque otra opción. Las Progressive Web Apps (PWAs) optimizadas para carga rápida y funcionamiento sin internet resuelven este problema sin obligar al usuario a descargar pesadas apps de tiendas oficiales".

El beneficio no es solo para el consumidor. Para los dueños de locales, contar con un panel donde controlar el stock, ver el flujo de caja y mantener un registro de clientes permite tomar decisiones informadas y optimizar los costos diarios de operación.`,
    category: "Economía",
    tag: "Comercio Local",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-09T10:30:00Z",
    readTime: "4 min",
    authorId: "santi-cabrera",
    comments: [
      {
        id: "c1",
        authorName: "Juan Carlos",
        content: "Excelente artículo. En mi ferretería implementamos un catálogo autogestionado y las consultas a WhatsApp se redujeron a la mitad, solo nos contactan para comprar directamente.",
        date: "2026-06-09T14:20:00Z"
      }
    ],
    views: 142
  },
  {
    slug: "bienal-esculturas-chaco-preparativos",
    title: "Resistencia se prepara para la Bienal de Esculturas: El impacto en el turismo y la economía regional",
    subtitle: "El evento cultural más importante del nordeste argentino promete reunir a artistas internacionales y movilizar la hotelería y gastronomía local.",
    content: `La ciudad de Resistencia ultima los detalles para dar inicio a una nueva edición de su emblemática Bienal Internacional de Esculturas. Con escultores confirmados de Europa, Asia y América Latina, el predio del Domo del Centenario se convertirá una vez más en un taller a cielo abierto.

El evento, que se ha consolidado como un motor cultural único en el país, atrae a miles de turistas y genera un impacto económico directo en la gastronomía, la hotelería y los servicios de transporte locales. 

Eliana Gómez, especialista en cultura local, destaca: "La Bienal no es solo arte, es el momento en que toda la cadena de valor de Resistencia se activa. Desde el artesano que vende sus productos regionales hasta el hotelero que ve colmadas sus plazas, el impacto en el empleo chaqueño es inmenso".

Este año, la organización del evento ha hecho foco en la digitalización, lanzando plataformas de información turística rápidas y accesibles directamente desde códigos QR en las calles para guiar a los visitantes en alojamiento, gastronomía y recorridos artísticos por la ciudad de las esculturas.`,
    category: "Cultura",
    tag: "Bienal 2026",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-09T08:15:00Z",
    readTime: "3 min",
    authorId: "eliana-gomez",
    comments: [],
    views: 310
  },
  {
    slug: "periodismo-digital-tendencias-2026",
    title: "El fin de la saturación publicitaria: Hacia portales de noticias limpios y rápidos",
    subtitle: "Lectores rechazan los diarios llenos de pop-ups invasivos. Portales modernos ganan espacio priorizando el diseño Bento y la velocidad.",
    content: `La fatiga del usuario en internet ha llegado a su punto más alto. Abrir un portal de noticias promedio hoy significa enfrentarse a una avalancha de anuncios invasivos, videos que se reproducen solos y ventanas emergentes que tapan el texto.

Esta mala práctica no solo ahuyenta a los lectores, sino que destruye la velocidad de carga de las páginas, algo fundamental para el posicionamiento en buscadores (SEO). Google penaliza severamente a los sitios lentos o inestables.

Frente a esto, surge una fuerte tendencia de medios digitales que adoptan un diseño 'Bento' limpio, de alto impacto visual y sin luces estridentes. El objetivo es volver a las bases del periodismo: el texto, la fotografía de calidad y la legibilidad.

"La velocidad es contenido", afirma Santiago Cabrera. "Si tu página tarda más de tres segundos en cargar porque tiene cincuenta scripts de anuncios, perdiste la mitad de tu audiencia. Los medios locales que apuesten por plataformas livianas e instalables lograrán una retención y fidelización de lectores muy superior a los medios tradicionales".`,
    category: "Tecnología",
    tag: "Medios Digitales",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-08T15:45:00Z",
    readTime: "5 min",
    authorId: "santi-cabrera",
    comments: [
      {
        id: "c2",
        authorName: "Patricia R.",
        content: "Qué alivio leer algo sobre esto. Ya es imposible informarse en la mayoría de los diarios provinciales por la cantidad de publicidad que te traba el celular.",
        date: "2026-06-08T18:10:00Z"
      }
    ],
    views: 95
  },
  {
    slug: "deporte-chaco-for-ever-campeonato",
    title: "Chaco For Ever busca consolidar su racha ganadora en la Primera Nacional",
    subtitle: "El albinegro de Resistencia se prepara para enfrentar a su próximo rival con el regreso de piezas clave en el equipo titular.",
    content: `El gigante de la avenida 9 de Julio, Chaco For Ever, vive un gran presente futbolístico. Con tres victorias consecutivas, el conjunto de Resistencia se ubica en los puestos de vanguardia de su zona de la Primera Nacional, ilusionando a toda su hinchada.

El director técnico ha logrado consolidar un esquema defensivo sólido, complementado por la efectividad en ataque de sus delanteros. Para el partido del próximo domingo, el equipo contará con la reincorporación de su mediocampista creativo, recuperado de una molestia física.

"El grupo está muy metido y los resultados en el Gigante de la Avenida nos están acompañando gracias al empuje de la gente", expresó Marcos Juárez, analista deportivo del portal. La expectativa es enorme y se espera un estadio colmado para defender la localía.`,
    category: "Deportes",
    tag: "Chaco For Ever",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    date: "2026-06-08T11:20:00Z",
    readTime: "3 min",
    authorId: "marcos-juarez",
    comments: [],
    views: 205
  }
];

const DB_KEY = "sec_noticias_db";

function getDB(): { articles: Article[]; authors: Author[] } {
  if (typeof window === "undefined") {
    return { articles: DEFAULT_ARTICLES, authors: DEFAULT_AUTHORS };
  }
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    const initial = { articles: DEFAULT_ARTICLES, authors: DEFAULT_AUTHORS };
    localStorage.setItem(DB_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return { articles: DEFAULT_ARTICLES, authors: DEFAULT_AUTHORS };
  }
}

function saveDB(db: { articles: Article[]; authors: Author[] }) {
  if (typeof window !== "undefined") {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }
}

export async function getArticles(): Promise<Article[]> {
  const db = getDB();
  // Sort articles by date descending
  return [...db.articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const db = getDB();
  const article = db.articles.find((a) => a.slug === slug);
  return article || null;
}

export async function getAuthors(): Promise<Author[]> {
  const db = getDB();
  return db.authors;
}

export async function getAuthorById(id: string): Promise<Author | null> {
  const db = getDB();
  return db.authors.find((a) => a.id === id) || null;
}

export async function createArticle(articleData: Omit<Article, "comments" | "views" | "date" | "slug">): Promise<Article> {
  const db = getDB();
  const slug = articleData.title
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

  const newArticle: Article = {
    ...articleData,
    slug,
    date: new Date().toISOString(),
    views: 0,
    comments: []
  };

  // Avoid duplicates
  const index = db.articles.findIndex((a) => a.slug === slug);
  if (index !== -1) {
    db.articles[index] = { ...newArticle, slug: `${slug}-${Date.now().toString().slice(-4)}` };
  } else {
    db.articles.push(newArticle);
  }

  saveDB(db);
  return newArticle;
}

export async function deleteArticle(slug: string): Promise<boolean> {
  const db = getDB();
  const initialLen = db.articles.length;
  db.articles = db.articles.filter((a) => a.slug !== slug);
  saveDB(db);
  return db.articles.length < initialLen;
}

export async function addComment(slug: string, authorName: string, content: string): Promise<Comment | null> {
  const db = getDB();
  const articleIndex = db.articles.findIndex((a) => a.slug === slug);
  if (articleIndex === -1) return null;

  const newComment: Comment = {
    id: `c-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    authorName,
    content,
    date: new Date().toISOString()
  };

  db.articles[articleIndex].comments.push(newComment);
  saveDB(db);
  return newComment;
}

export async function deleteComment(articleSlug: string, commentId: string): Promise<boolean> {
  const db = getDB();
  const articleIndex = db.articles.findIndex((a) => a.slug === articleSlug);
  if (articleIndex === -1) return false;

  const initialLen = db.articles[articleIndex].comments.length;
  db.articles[articleIndex].comments = db.articles[articleIndex].comments.filter((c) => c.id !== commentId);
  saveDB(db);
  return db.articles[articleIndex].comments.length < initialLen;
}

export async function incrementViews(slug: string): Promise<void> {
  const db = getDB();
  const articleIndex = db.articles.findIndex((a) => a.slug === slug);
  if (articleIndex !== -1) {
    db.articles[articleIndex].views += 1;
    saveDB(db);
  }
}

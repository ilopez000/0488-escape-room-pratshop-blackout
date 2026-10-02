// =====================================================================
//  PRATSHOP · BLACKOUT · Escape room de repàs de les sessions 1-6 del MP 0488
//  Tot el contingut del joc és aquí: narrativa, teoria, reptes i punts.
//  Per canviar una pregunta o afegir-ne una, només cal tocar aquest fitxer.
// =====================================================================

export type Categoria = string;

/** Classificar cada element en una de les categories. */
export interface ProvaClassificar {
  tipus: 'classificar';
  titol: string;
  enunciat: string;
  categories: Categoria[];
  elements: { text: string; correcta: Categoria; perque: string }[];
  /** Els elements són fragments de codi (es pinten en lletra monoespaiada). */
  codi?: boolean;
  pista: string;
}

/** Marcar totes les targetes que compleixen una condició (o les línies amb error d'un programa). */
export interface ProvaSeleccionar {
  tipus: 'seleccionar';
  titol: string;
  enunciat: string;
  /** Text que surt a la targeta quan està marcada. */
  etiqueta: string;
  missatgeOk: string;
  /** Les targetes són línies d'un mateix programa (caça d'errors): no es barregen. */
  codi?: boolean;
  elements: { text: string; sector: string; correcta: boolean; perque: string }[];
  pista: string;
}

/** Relacionar cada fila amb una opció de cada columna (desplegables). */
export interface ProvaAparellar {
  tipus: 'aparellar';
  titol: string;
  enunciat: string;
  columnes: { nom: string; opcions: string[] }[];
  files: { text: string; correctes: string[]; perque: string }[];
  /** El text de cada fila és codi (lletra monoespaiada). */
  codi?: boolean;
  pista: string;
}

/** Construir una cadena en l'ordre correcte triant blocs (pot tenir blocs intrusos). */
export interface ProvaSequencia {
  tipus: 'sequencia';
  titol: string;
  enunciat: string;
  inici: string;
  final: string;
  missatgeOk: string;
  codi?: boolean;
  ordre: string[];
  intrusos: { text: string; perque: string }[];
  pista: string;
}

/** Preguntes de resposta única, una darrere l'altra. */
export interface ProvaQuiz {
  tipus: 'quiz';
  titol: string;
  enunciat: string;
  preguntes: { pregunta: string; codi?: string; opcions: string[]; correcta: number; perque: string }[];
  pista: string;
}

/** Completar un fragment de codi: cada [[n]] del codi és un desplegable. */
export interface ProvaCompletar {
  tipus: 'completar';
  titol: string;
  enunciat: string;
  fitxer: string;
  codi: string;
  buits: { opcions: string[]; correcta: string; perque: string }[];
  pista: string;
}

export type Prova = ProvaClassificar | ProvaSeleccionar | ProvaAparellar | ProvaSequencia | ProvaQuiz | ProvaCompletar;

export interface Sala {
  id: number;
  /** Rètol curt: «PLANTA 1». */
  codi: string;
  nom: string;
  /** Sessió que es repassa. */
  lloc: string;
  /** Sistema de la botiga que es restaura en superar la planta. */
  sistema: string;
  icona: string;
  transmissio: string[];
  /** Fitxes de teoria. «codi» es pinta ressaltat; «linies» fa una taula fragment → explicació. */
  teoria: { titol: string; html: string; codi?: string; linies?: { codi: string; explica: string }[] }[];
  ideaClau: string;
  proves: Prova[];
  fragment: { posicio: number; lletra: string };
  missatgeFinal: string;
}

export const CLAU_MESTRA = 'RENDER';

export const INTRO = {
  titol: 'PRATSHOP · BLACKOUT',
  subtitol: 'Escape room de repàs · MP 0488 · sessions 1 a 6',
  transmissio: [
    'ALERTA · Divendres negre a PratShop. El centre de dades s\'ha quedat a les fosques.',
    'Un sabotejador, L\'ESBORRADOR, ha entrat al repositori i ha fet un commit devastador: «delete UI».',
    'Sense entorn, sense estils, sense rutes, sense estat. La botiga ha d\'obrir i la pantalla és en blanc.',
    'Formes part de la Unitat Front-end. L\'edifici té sis plantes, una per cada sessió del mòdul. A cada planta restauraràs un sistema i recuperaràs un mòdul de codi amb una lletra.',
    'Amb les sis lletres compilaràs l\'ordre que reinicia la botiga i pujaràs al terrat a enfrontar-te a L\'Esborrador. Encén els llums.',
  ],
};

export const SALES: Sala[] = [
  // ------------------------------------------------------------------ PLANTA 1
  {
    id: 1,
    codi: 'PLANTA 1',
    nom: 'La sala de màquines',
    lloc: 'Sessió 1 · L\'entorn: React + TypeScript amb Vite',
    sistema: 'Generador i servidor de desenvolupament',
    icona: '⚙',
    transmissio: [
      'Planta 1. Els generadors estan aturats: sense entorn no arrenca res.',
      'Repassa com es crea un projecte amb Vite, com és per dins i les regles del JSX. L\'Esborrador ha deixat trampes al codi.',
    ],
    teoria: [
      {
        titol: 'L\'entorn de treball i les ordres de npm',
        html: `<p>Per treballar amb React necessitem <strong>Node.js</strong> (que porta <strong>npm</strong>, el gestor de paquets), un editor com <strong>VS Code</strong> i <strong>Git</strong>. El projecte el crea <strong>Vite</strong>, que és alhora l'eina que crea l'esquelet, el servidor de desenvolupament i l'empaquetador.</p>`,
        codi: `node -v
npm create vite@latest pratshop -- --template react-ts
cd pratshop
npm install
npm run dev
npm run build
npm run preview`,
        linies: [
          { codi: 'node -v', explica: 'Mostra la versió de Node instal·lada. Si l\'ordre no es reconeix, Node no està instal·lat o no és al PATH.' },
          { codi: 'npm create vite@latest pratshop -- --template react-ts', explica: 'Crea la carpeta pratshop amb l\'esquelet d\'un projecte React + TypeScript. El -- separa les opcions de npm de les de Vite.' },
          { codi: 'npm install', explica: 'Llegeix el package.json i descarrega totes les dependències a la carpeta node_modules.' },
          { codi: 'npm run dev', explica: 'Arrenca el servidor de desenvolupament a http://localhost:5173. Cada cop que deses, la pàgina s\'actualitza sola.' },
          { codi: 'npm run build', explica: 'Comprova els tipus i genera la versió de producció, optimitzada, a la carpeta dist/.' },
          { codi: 'npm run preview', explica: 'Serveix la carpeta dist/ per provar la versió de producció abans de publicar-la.' },
        ],
      },
      {
        titol: 'L\'esquelet d\'un projecte Vite',
        html: `<ul>
<li><code>index.html</code>: l'única pàgina HTML de l'aplicació. Té un <code>&lt;div id="root"&gt;</code> buit i carrega <code>/src/main.tsx</code>.</li>
<li><code>src/main.tsx</code>: el <strong>punt d'entrada</strong>. Munta React dins del <code>div#root</code>.</li>
<li><code>src/App.tsx</code>: el component arrel; d'aquí pengen tots els altres.</li>
<li><code>package.json</code>: nom del projecte, <strong>scripts</strong> (<code>dev</code>, <code>build</code>, <code>preview</code>) i dependències.</li>
<li><code>node_modules/</code>: les dependències descarregades. <strong>No es puja mai a GitHub</strong> (és al <code>.gitignore</code>): es regenera amb <code>npm install</code>.</li>
</ul>`,
        codi: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);`,
        linies: [
          { codi: `import App from './App';`, explica: 'Importa el component arrel. No cal posar l\'extensió .tsx.' },
          { codi: `document.getElementById('root')!`, explica: 'Busca el div buit de l\'index.html. El ! diu a TypeScript que segur que existeix.' },
          { codi: 'createRoot(...).render(...)', explica: 'Crea l\'arrel de React en aquell div i hi dibuixa l\'aplicació.' },
          { codi: '<StrictMode>', explica: 'Mode estricte de desenvolupament: fa comprovacions extra i avisa de males pràctiques. No es veu a la pantalla.' },
        ],
      },
      {
        titol: 'Un component és una funció que retorna JSX',
        html: `<p>Un component és una <strong>funció</strong> que comença amb <strong>majúscula</strong> i retorna <strong>JSX</strong>, una sintaxi que s'assembla a l'HTML però que és JavaScript. Les regles que més es despisten:</p>
<ul>
<li>Un sol element arrel. Si en necessites dos, embolcalla'ls amb un <code>&lt;div&gt;</code> o amb un fragment <code>&lt;&gt;…&lt;/&gt;</code>.</li>
<li><code>className</code> en lloc de <code>class</code>, i <code>htmlFor</code> en lloc de <code>for</code>.</li>
<li>Totes les etiquetes es tanquen: <code>&lt;img /&gt;</code>, <code>&lt;input /&gt;</code>, <code>&lt;br /&gt;</code>.</li>
<li>Les claus <code>{ }</code> obren una finestra a JavaScript: variables, càlculs, crides.</li>
<li><code>style</code> rep un <strong>objecte</strong>, no un text: <code>style={{ color: 'red' }}</code>.</li>
<li>Els esdeveniments van en camelCase: <code>onClick</code>, <code>onChange</code>.</li>
</ul>`,
        codi: `type Props = { nom: string; punts?: number };

export default function Salutacio({ nom, punts = 0 }: Props) {
  return (
    <>
      <h2 className="titol">Hola, {nom}!</h2>
      <p>Tens {punts} punts.</p>
    </>
  );
}`,
        linies: [
          { codi: 'type Props = { nom: string; punts?: number };', explica: 'Les props tipades amb TypeScript. El ? vol dir que punts es pot ometre.' },
          { codi: 'export default function Salutacio(...)', explica: 'El component: una funció amb nom en majúscula que s\'exporta per poder-la importar.' },
          { codi: '{ nom, punts = 0 }: Props', explica: 'Desestructura les props i dona un valor per defecte a punts.' },
          { codi: '<> … </>', explica: 'Fragment: agrupa dos elements sense afegir cap etiqueta extra al DOM.' },
          { codi: '{nom}', explica: 'Les claus insereixen el valor de la variable dins del JSX.' },
        ],
      },
      {
        titol: 'TypeScript t\'avisa abans d\'executar',
        html: `<p>Els fitxers de components són <code>.tsx</code> (TypeScript + JSX). Si les props tenen tipus, l'editor marca l'error <strong>abans</strong> d'arrencar l'aplicació, i <code>npm run build</code> no deixa generar la versió de producció mentre hi hagi errors de tipus.</p>
<ul>
<li><code>variant?: 'primari' | 'secundari'</code>: unió de literals; qualsevol altre text és un error.</li>
<li><code>onClick?: () =&gt; void</code>: una funció que no rep res i no retorna res.</li>
<li><code>children: ReactNode</code>: qualsevol cosa que React pugui dibuixar.</li>
</ul>`,
      },
    ],
    ideaClau: 'Vite crea i serveix el projecte; main.tsx munta App dins del div#root; un component és una funció en majúscula que retorna un sol element JSX.',
    proves: [
      {
        tipus: 'aparellar',
        titol: 'Repte 1A · Engega els generadors',
        enunciat: 'L\'Esborrador ha barrejat el manual d\'ordres. Relaciona cada ordre amb el que fa.',
        codi: true,
        columnes: [
          {
            nom: 'Què fa',
            opcions: [
              'Crea l\'esquelet d\'un projecte React + TS',
              'Descarrega les dependències a node_modules',
              'Arrenca el servidor de desenvolupament',
              'Genera la versió de producció a dist/',
              'Serveix dist/ per provar-la',
              'Mostra la versió de Node',
              'Afegeix una dependència nova al projecte',
            ],
          },
        ],
        files: [
          { text: 'npm create vite@latest pratshop -- --template react-ts', correctes: ['Crea l\'esquelet d\'un projecte React + TS'], perque: 'create vite fa l\'esquelet; --template react-ts tria React amb TypeScript.' },
          { text: 'npm install', correctes: ['Descarrega les dependències a node_modules'], perque: 'Llegeix el package.json i omple node_modules.' },
          { text: 'npm run dev', correctes: ['Arrenca el servidor de desenvolupament'], perque: 'És el que deixem obert mentre programem (localhost:5173).' },
          { text: 'npm run build', correctes: ['Genera la versió de producció a dist/'], perque: 'Comprova tipus i empaqueta l\'aplicació optimitzada.' },
          { text: 'npm run preview', correctes: ['Serveix dist/ per provar-la'], perque: 'Permet veure la build abans de publicar-la.' },
          { text: 'node -v', correctes: ['Mostra la versió de Node'], perque: 'La primera comprovació de l\'entorn.' },
          { text: 'npm i react-router', correctes: ['Afegeix una dependència nova al projecte'], perque: 'i és l\'abreviatura d\'install: descarrega el paquet i l\'apunta al package.json.' },
        ],
        pista: 'Fixa\'t en la paraula clau de cada ordre: create, install, dev, build, preview.',
      },
      {
        tipus: 'seleccionar',
        titol: 'Repte 1B · Caça les trampes del JSX',
        enunciat: 'Aquest component no compila: l\'Esborrador hi ha deixat 4 errors. Marca les línies que estan malament.',
        etiqueta: 'ERROR',
        missatgeOk: 'Trampes desactivades! El component ja compila.',
        codi: true,
        elements: [
          { sector: '1', text: `import estils from './Marcador.module.css';`, correcta: false, perque: 'Correcte: importa el CSS Module del component.' },
          { sector: '2', text: 'type Props = { nom: string; punts?: number };', correcta: false, perque: 'Correcte: props tipades, punts opcional.' },
          { sector: '3', text: 'export default function marcador({ nom, punts = 0 }: Props) {', correcta: true, perque: 'El nom d\'un component ha de començar amb majúscula (Marcador). En minúscula, React el tracta com una etiqueta HTML.' },
          { sector: '4', text: '  return (', correcta: false, perque: 'Correcte.' },
          { sector: '5', text: '    <section className={estils.caixa}>', correcta: false, perque: 'Correcte: un sol element arrel amb la classe del CSS Module.' },
          { sector: '6', text: '      <h2 class="titol">Hola, {nom}</h2>', correcta: true, perque: 'En JSX és className, no class.' },
          { sector: '7', text: '      <label for="punts">Punts</label>', correcta: true, perque: 'En JSX és htmlFor, no for.' },
          { sector: '8', text: '      <input id="punts" value={punts} readOnly>', correcta: true, perque: 'En JSX totes les etiquetes es tanquen: <input ... />.' },
          { sector: '9', text: `      <p style={{ color: 'red' }}>{punts > 100 && 'Rècord!'}</p>`, correcta: false, perque: 'Correcte: style rep un objecte i && mostra el text només si la condició és certa.' },
          { sector: '10', text: '    </section>', correcta: false, perque: 'Correcte.' },
          { sector: '11', text: '  );', correcta: false, perque: 'Correcte.' },
          { sector: '12', text: '}', correcta: false, perque: 'Correcte.' },
        ],
        pista: 'Busca diferències entre HTML i JSX: atributs amb un altre nom, etiquetes sense tancar i el nom del component.',
      },
      {
        tipus: 'quiz',
        titol: 'Repte 1C · Prova de càrrega',
        enunciat: 'Cinc preguntes per tornar a posar en marxa la sala de màquines.',
        preguntes: [
          {
            pregunta: 'Quin fitxer munta React dins del div#root de l\'index.html?',
            opcions: ['src/main.tsx', 'src/App.tsx', 'src/index.css', 'vite.config.ts'],
            correcta: 0,
            perque: 'main.tsx és el punt d\'entrada: crida createRoot(...).render(<App />).',
          },
          {
            pregunta: 'Per què node_modules no es puja a GitHub?',
            opcions: [
              'Perquè es regenera amb npm install a partir del package.json',
              'Perquè conté contrasenyes',
              'Perquè GitHub no accepta carpetes',
              'Perquè només serveix a Windows',
            ],
            correcta: 0,
            perque: 'És enorme i reproduïble: per això és al .gitignore.',
          },
          {
            pregunta: 'Què es veu a la pantalla?',
            codi: `const nom = 'Anna';
return <p>Hola, {nom.toUpperCase()}</p>;`,
            opcions: ['Hola, ANNA', 'Hola, {nom.toUpperCase()}', 'Hola, nom', 'Un error de compilació'],
            correcta: 0,
            perque: 'Les claus executen l\'expressió de JavaScript i n\'insereixen el resultat.',
          },
          {
            pregunta: 'Per què aquest component no compila?',
            codi: `function Fitxa() {
  return <h1>Teclat</h1><p>79,90 €</p>;
}`,
            opcions: [
              'Retorna dos elements arrel: cal embolcallar-los en un div o en un fragment <>…</>',
              'Falta posar className',
              'Els preus no poden portar coma',
              'Un component no pot retornar un h1',
            ],
            correcta: 0,
            perque: 'Un component retorna un sol element arrel.',
          },
          {
            pregunta: 'El Boto té variant?: \'primari\' | \'secundari\'. Què passa si escrius <Boto variant="terciari">?',
            opcions: [
              'TypeScript marca l\'error a l\'editor i npm run build falla',
              'Es dibuixa un botó sense estil',
              'React ho converteix a "primari"',
              'No passa res fins que algú hi clica',
            ],
            correcta: 0,
            perque: 'Els tipus detecten l\'error abans d\'executar.',
          },
        ],
        pista: 'main.tsx és l\'entrada; node_modules es regenera; un sol element arrel; TypeScript avisa abans d\'executar.',
      },
    ],
    fragment: { posicio: 1, lletra: 'R' },
    missatgeFinal: 'Generadors en marxa. El servidor de desenvolupament torna a respondre a localhost:5173.',
  },

  // ------------------------------------------------------------------ PLANTA 2
  {
    id: 2,
    codi: 'PLANTA 2',
    nom: 'El taller d\'estils',
    lloc: 'Sessió 2 · CSS a React',
    sistema: 'Aparador i tema visual',
    icona: '◐',
    transmissio: [
      'Planta 2. L\'aparador de la botiga s\'ha quedat sense estils: tot és Times New Roman sobre blanc.',
      'Per vestir-lo cal dominar la cascada, l\'especificitat, Flexbox, Grid, els tokens i els CSS Modules.',
    ],
    teoria: [
      {
        titol: 'Cascada i especificitat',
        html: `<p>Quan dues regles diuen coses diferents al mateix element, guanya la més <strong>específica</strong>. L'especificitat es compta com a tres xifres <strong>(id, classe, element)</strong>: les classes, pseudoclasses (<code>:hover</code>, <code>:not()</code>) i atributs sumen a la segona xifra; les etiquetes i pseudoelements, a la tercera. Si empaten, guanya la regla que va <strong>més avall</strong>. L'atribut <code>style</code> en línia guanya a tots els selectors.</p>
<table class="taula-linies"><thead><tr><th>Selector</th><th>Especificitat</th></tr></thead><tbody>
<tr><td><code>p</code></td><td>(0,0,1)</td></tr>
<tr><td><code>.preu</code></td><td>(0,1,0)</td></tr>
<tr><td><code>.enllac:hover</code></td><td>(0,2,0)</td></tr>
<tr><td><code>#oferta .preu</code></td><td>(1,1,0)</td></tr>
</tbody></table>
<p>Per això, a la capçalera, <code>.enllac:hover</code> tapava el fons de <code>.actiu</code>, i la solució va ser <code>.enllac:hover:not(.actiu)</code>.</p>`,
      },
      {
        titol: 'Model de caixa i unitats',
        html: `<ul>
<li>Cada element és una caixa: <strong>contingut + padding + border</strong>, i el <strong>margin</strong> fora. Per defecte, <code>width</code> només mesura el contingut.</li>
<li>Amb <code>box-sizing: border-box</code>, el <code>width</code> ja inclou padding i vora. Per això el reinici el posa a tots els elements.</li>
<li>Els marges verticals de dos blocs seguits <strong>es col·lapsen</strong>: es queda el més gran.</li>
<li><code>rem</code>: relatiu a la mida de lletra de l'arrel (16px per defecte). <code>em</code>: relatiu a l'element. <code>%</code>: al pare. <code>vw</code>/<code>dvh</code>: a la finestra. <code>fr</code>: fracció de l'espai lliure a Grid.</li>
<li><code>clamp(mínim, preferit, màxim)</code>: una mida fluida amb límits.</li>
</ul>`,
      },
      {
        titol: 'Flexbox per a una dimensió, Grid per a dues',
        html: `<p><strong>Flexbox</strong> col·loca elements en una fila o columna: <code>justify-content</code> alinea a l'<strong>eix principal</strong>, <code>align-items</code> a l'<strong>eix creuat</strong>, i <code>gap</code> separa. <strong>Grid</strong> treballa en files i columnes alhora.</p>`,
        codi: `.graella {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--espai-4);
}

.peu {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}`,
        linies: [
          { codi: 'repeat(auto-fit, minmax(240px, 1fr))', explica: 'Posa tantes columnes com hi càpiguen, de 240px com a mínim, i reparteix la resta. Graella adaptativa sense cap media query.' },
          { codi: 'gap: var(--espai-4);', explica: 'L\'espai entre targetes surt d\'un token, no d\'un número escrit a mà.' },
          { codi: 'justify-content: space-between;', explica: 'Envia el preu a un costat i el botó a l\'altre (eix principal).' },
          { codi: 'margin-top: auto;', explica: 'Dins d\'una targeta flex en columna, empeny el peu a baix: tots els botons queden alineats.' },
        ],
      },
      {
        titol: 'Tokens, tema fosc i accessibilitat',
        html: `<p>Els colors, espais i radis es declaren un sol cop com a <strong>variables CSS</strong> a <code>:root</code> i es fan servir amb <code>var()</code>. El tema fosc només <strong>redefineix les variables</strong>: no cal tocar cap component.</p>`,
        codi: `:root {
  --color-marca: #e02018;
  --color-fons: #ffffff;
  --color-text: #1a1a1a;
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-fons: #121212;
    --color-text: #f2f2f2;
  }
}

:focus-visible { outline: 3px solid var(--color-text); }

@media (prefers-reduced-motion: reduce) {
  .targeta { transition: none; }
}`,
        linies: [
          { codi: ':root { --color-marca: … }', explica: 'Els tokens: un sol lloc on canviar l\'aspecte de tota la botiga.' },
          { codi: '@media (prefers-color-scheme: dark)', explica: 'S\'aplica si el sistema de l\'usuari està en mode fosc.' },
          { codi: ':focus-visible', explica: 'Contorn visible quan es navega amb el teclat, sense molestar qui fa servir el ratolí.' },
          { codi: '@media (prefers-reduced-motion: reduce)', explica: 'Treu les animacions a qui ha demanat menys moviment al sistema.' },
        ],
      },
      {
        titol: 'CSS dins de React: la norma del mòdul',
        html: `<p>Hi ha cinc maneres de posar CSS en React (full global, CSS Modules, <code>style</code>, CSS-in-JS i utilitats). Al mòdul fem servir <strong>tokens al full global + un <code>.module.css</code> per component</strong>. L'atribut <code>style</code> queda només per a valors calculats en temps d'execució.</p>`,
        codi: `import clsx from 'clsx';
import estils from './TargetaProducte.module.css';

export default function TargetaProducte({ nom, esgotat }: Props) {
  return (
    <article className={clsx(estils.targeta, esgotat && estils.esgotat)}>
      <h3 className={estils.titol}>{nom}</h3>
    </article>
  );
}`,
        linies: [
          { codi: `import estils from './TargetaProducte.module.css';`, explica: 'Vite converteix cada classe en un nom únic (_targeta_a1b2c): no pot xocar amb cap altre component.' },
          { codi: 'className={estils.targeta}', explica: 'Es fa servir com una propietat de l\'objecte estils.' },
          { codi: 'clsx(estils.targeta, esgotat && estils.esgotat)', explica: 'clsx ajunta les classes i descarta les falses: esgotat només s\'afegeix si el producte no té estoc.' },
        ],
      },
    ],
    ideaClau: 'Guanya el selector més específic; els valors viuen en tokens a :root; cada component té el seu .module.css i style només per a valors calculats.',
    proves: [
      {
        tipus: 'sequencia',
        titol: 'Repte 2A · La torre de l\'especificitat',
        enunciat: 'Ordena els selectors de menys a més específic. Compte: n\'hi ha dos que no són selectors i no hi han de ser.',
        inici: 'MENYS ESPECÍFIC',
        final: 'MÉS ESPECÍFIC',
        missatgeOk: 'Torre construïda! Ja saps qui guanya cada batalla de la cascada.',
        codi: true,
        ordre: [
          'p',
          'article p',
          '.preu',
          '.targeta .preu',
          '.targeta:hover .preu',
          '#oferta .preu',
          `style={{ color: 'red' }}`,
        ],
        intrusos: [
          { text: '--color-marca', perque: 'És una variable CSS, no un selector: no té especificitat.' },
          { text: '@media (min-width: 768px)', perque: 'És una regla condicional: no suma especificitat als selectors de dins.' },
        ],
        pista: 'Compta (id, classe, element). Les pseudoclasses com :hover compten com una classe. L\'estil en línia guanya a tots.',
      },
      {
        tipus: 'completar',
        titol: 'Repte 2B · Vesteix la targeta',
        enunciat: 'Completa la targeta de producte amb el seu CSS Module i les classes condicionals.',
        fitxer: 'components/TargetaProducte.tsx',
        codi: `import clsx from 'clsx';
import estils from './TargetaProducte.[[0]]';

type Props = { nom: string; preu: number; esgotat: boolean; oferta: boolean };

export default function TargetaProducte({ nom, preu, esgotat, oferta }: Props) {
  return (
    <article className={[[1]](estils.targeta, esgotat && estils.esgotat)}>
      {oferta && <span className={[[2]]}>Oferta</span>}
      <h3 className={estils.titol}>{nom}</h3>
      <p className={estils.preu}>{preu.toFixed(2)} €</p>
      <div style={{ [[3]]: \`\${Math.min(100, preu)}%\` }} className={estils.barra} />
    </article>
  );
}`,
        buits: [
          { opcions: ['module.css', 'css', 'module.ts', 'style.css'], correcta: 'module.css', perque: 'Els CSS Modules acaben en .module.css: Vite hi genera noms de classe únics.' },
          { opcions: ['clsx', 'estils', 'className', 'style'], correcta: 'clsx', perque: 'clsx ajunta classes i descarta les que són false.' },
          { opcions: ['estils.etiqueta', '"etiqueta"', 'etiqueta', 'estils[".etiqueta"]'], correcta: 'estils.etiqueta', perque: 'Les classes d\'un CSS Module es llegeixen de l\'objecte estils.' },
          { opcions: [`'--progres'`, `'progres'`, `--progres`, `'var(--progres)'`], correcta: `'--progres'`, perque: 'Una variable CSS en línia es passa com a clau de text: style={{ \'--progres\': \'40%\' }}. És un valor calculat en temps d\'execució, l\'únic cas en què fem servir style.' },
        ],
        pista: 'Fitxer .module.css, la funció de classes condicionals, l\'objecte estils i una variable CSS entre cometes.',
      },
      {
        tipus: 'completar',
        titol: 'Repte 2C · Restaura el full global',
        enunciat: 'L\'Esborrador ha fet forats a index.css. Torna-hi a posar el tema fosc, la graella i el focus.',
        fitxer: 'src/index.css',
        codi: `:root {
  --color-marca: #e02018;
  --color-fons: #ffffff;
  --color-text: #1a1a1a;
}

@media ([[0]]: dark) {
  :root {
    --color-fons: #121212;
    --color-text: #f2f2f2;
  }
}

*, *::before, *::after {
  box-sizing: [[1]];
}

body {
  color: [[2]](--color-text);
  background: var(--color-fons);
}

.graella {
  display: [[3]];
  grid-template-columns: repeat([[4]], minmax(240px, 1fr));
}

.boto:[[5]] {
  outline: 3px solid var(--color-text);
}`,
        buits: [
          { opcions: ['prefers-color-scheme', 'prefers-reduced-motion', 'color-mode', 'theme'], correcta: 'prefers-color-scheme', perque: 'És la consulta que llegeix si el sistema està en mode clar o fosc.' },
          { opcions: ['border-box', 'content-box', 'padding-box', 'auto'], correcta: 'border-box', perque: 'Així el width ja inclou el padding i la vora.' },
          { opcions: ['var', 'calc', 'env', 'attr'], correcta: 'var', perque: 'var() llegeix el valor d\'una variable CSS.' },
          { opcions: ['grid', 'flex', 'block', 'table'], correcta: 'grid', perque: 'grid-template-columns només funciona amb display: grid.' },
          { opcions: ['auto-fit', 'auto', '100%', 'fr'], correcta: 'auto-fit', perque: 'auto-fit crea tantes columnes com hi càpiguen.' },
          { opcions: ['focus-visible', 'hover', 'visited', 'checked'], correcta: 'focus-visible', perque: 'Mostra el contorn quan s\'hi arriba amb el teclat.' },
        ],
        pista: 'Tema fosc = prefers-color-scheme. Graella adaptativa = grid + auto-fit. Contorn per al teclat = focus-visible.',
      },
      {
        tipus: 'quiz',
        titol: 'Repte 2D · Endevina com es pinta',
        enunciat: 'Quatre preguntes sobre el que acabarà veient l\'usuari.',
        preguntes: [
          {
            pregunta: 'L\'enllaç té les classes "enllac actiu" i hi passes el ratolí per sobre. De quin color és el fons?',
            codi: `.enllac:hover { background: gray; }
.actiu { background: red; }`,
            opcions: [
              'Gris: .enllac:hover (0,2,0) és més específic que .actiu (0,1,0)',
              'Vermell: .actiu va més avall',
              'Vermell: les classes guanyen a les pseudoclasses',
              'Cap dels dos: es barregen',
            ],
            correcta: 0,
            perque: 'L\'ordre només desempata. Per això a la capçalera vam escriure .enllac:hover:not(.actiu).',
          },
          {
            pregunta: 'Sense box-sizing: border-box, quant fa d\'ample aquesta caixa a la pantalla?',
            codi: `.caixa {
  width: 200px;
  padding: 20px;
  border: 5px solid;
}`,
            opcions: ['250px', '200px', '225px', '240px'],
            correcta: 0,
            perque: '200 + 20 × 2 de padding + 5 × 2 de vora = 250px. Amb border-box seria 200px.',
          },
          {
            pregunta: 'Si la lletra de l\'arrel és de 16px, quant fa font-size: 1.5rem?',
            opcions: ['24px', '15px', '16px', '1.5px'],
            correcta: 0,
            perque: '1.5 × 16 = 24px. rem sempre es mesura respecte de l\'arrel.',
          },
          {
            pregunta: 'Segons la norma del mòdul, quan fem servir l\'atribut style en un component?',
            opcions: [
              'Només per a valors calculats en temps d\'execució, com una amplada en %',
              'Per a tots els colors',
              'Sempre: és el més ràpid',
              'Mai: està prohibit a React',
            ],
            correcta: 0,
            perque: 'Tokens al full global, un .module.css per component i style només per al que es calcula.',
          },
        ],
        pista: 'Compta l\'especificitat, suma padding i vora, multiplica per 16 i recorda la norma dels tres llocs.',
      },
    ],
    fragment: { posicio: 2, lletra: 'E' },
    missatgeFinal: 'L\'aparador torna a brillar: tokens restaurats i tema fosc en marxa.',
  },

  // ------------------------------------------------------------------ PLANTA 3
  {
    id: 3,
    codi: 'PLANTA 3',
    nom: 'El laberint de rutes',
    lloc: 'Sessió 3 · Navegació amb React Router',
    sistema: 'Ascensors i passadissos (rutes)',
    icona: '⇄',
    transmissio: [
      'Planta 3. Els ascensors no saben a quina planta anar: totes les URL porten a la pàgina en blanc.',
      'Repara la taula de rutes, els enllaços i els hooks del router.',
    ],
    teoria: [
      {
        titol: 'Per què necessitem un router',
        html: `<p>Una SPA (<em>single page application</em>) té un sol <code>index.html</code>. Si canviem de «pàgina» amb un estat i un <code>if</code>, la URL no canvia: no es pot compartir l'enllaç, el botó <strong>enrere</strong> del navegador no funciona i en recarregar tornem a l'inici. <strong>React Router</strong> fa que cada URL dibuixi un component.</p>
<p>Fem servir React Router 8, paquet <code>react-router</code> (el <code>react-router-dom</code> es va quedar a la versió 7), en mode declaratiu. <code>&lt;BrowserRouter&gt;</code> escolta la URL i embolcalla tota l'aplicació a <code>main.tsx</code>.</p>`,
        codi: `import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);`,
      },
      {
        titol: 'La taula de rutes',
        html: `<p>A <code>App.tsx</code> declarem quina URL dibuixa quin component.</p>`,
        codi: `<Routes>
  <Route element={<Disposicio />}>
    <Route index element={<Inici />} />
    <Route path="cataleg" element={<Cataleg />} />
    <Route path="producte/:id" element={<Producte />} />
    <Route path="contacte" element={<Contacte />} />
    <Route path="*" element={<NoTrobada />} />
  </Route>
</Routes>`,
        linies: [
          { codi: '<Route element={<Disposicio />}>', explica: 'Ruta pare sense path: només aporta la disposició comuna (capçalera i peu) a totes les filles.' },
          { codi: '<Route index … />', explica: 'La pàgina que es veu quan la URL és exactament /.' },
          { codi: 'path="producte/:id"', explica: ':id és un tros variable: /producte/1, /producte/2…' },
          { codi: 'path="*"', explica: 'Atrapa qualsevol URL que no hagi coincidit abans: la pàgina 404.' },
        ],
      },
      {
        titol: 'Link, NavLink i Outlet',
        html: `<ul>
<li><code>&lt;a href&gt;</code> <strong>recarrega tota la pàgina</strong> i es perd l'estat. <code>&lt;Link to="/cataleg"&gt;</code> canvia la URL sense recarregar.</li>
<li><code>&lt;NavLink&gt;</code> és un Link que sap si està <strong>actiu</strong>: a <code>className</code> li passem una funció que rep <code>{ isActive }</code>.</li>
<li><code>end</code> al NavLink de <code>/</code>: sense, l'enllaç d'inici surt actiu a totes les pàgines.</li>
<li><code>&lt;Outlet /&gt;</code>: el lloc de la disposició on es dibuixa la pàgina filla.</li>
</ul>`,
        codi: `export default function Disposicio() {
  const classe = ({ isActive }: { isActive: boolean }) => (isActive ? 'enllac actiu' : 'enllac');
  return (
    <div className="pagina">
      <nav>
        <NavLink to="/" end className={classe}>Inici</NavLink>
        <NavLink to="/cataleg" className={classe}>Catàleg</NavLink>
      </nav>
      <main><Outlet /></main>
    </div>
  );
}`,
      },
      {
        titol: 'Els hooks del router',
        html: `<ul>
<li><code>useParams()</code>: els trossos variables de la ruta. <strong>Sempre arriben com a text</strong>: <code>Number(id)</code> per convertir-los.</li>
<li><code>useNavigate()</code>: navegar des de codi. <code>navega('/carro')</code>, <code>navega(-1)</code> (enrere), <code>navega('/', { replace: true })</code>.</li>
<li><code>useSearchParams()</code>: la part de la URL després de <code>?</code>. Un cercador que viu a la URL es pot compartir.</li>
<li><code>&lt;Navigate to="/no-trobada" replace /&gt;</code>: redirigeix mentre es dibuixa; <code>replace</code> evita que la pàgina dolenta quedi a l'historial.</li>
</ul>`,
        codi: `const { id } = useParams();
const navega = useNavigate();
const producte = buscaProducte(Number(id));
if (!producte) return <Navigate to="/no-trobada" replace />;

const [parametres, setParametres] = useSearchParams();
const cerca = parametres.get('cerca') ?? '';`,
        linies: [
          { codi: 'const { id } = useParams();', explica: 'Llegeix el :id de la ruta. Per a /producte/3, id val "3" (text).' },
          { codi: 'buscaProducte(Number(id))', explica: 'Converteix el text a número abans de buscar.' },
          { codi: '<Navigate to="/no-trobada" replace />', explica: 'Si el producte no existeix, redirigeix a la 404 sense deixar rastre a l\'historial.' },
          { codi: `parametres.get('cerca') ?? ''`, explica: 'Si a la URL no hi ha ?cerca=, get() retorna null i el convertim en text buit.' },
        ],
      },
    ],
    ideaClau: 'Cada URL dibuixa un component: BrowserRouter escolta, Routes decideix, Link navega sense recarregar, Outlet és el forat de la disposició i useParams sempre torna text.',
    proves: [
      {
        tipus: 'completar',
        titol: 'Repte 3A · Repara els ascensors',
        enunciat: 'Completa la taula de rutes i la disposició perquè cada URL torni a portar a la seva pàgina.',
        fitxer: 'App.tsx · components/Disposicio.tsx',
        codi: `// App.tsx
import { Routes, Route } from '[[0]]';

export default function App() {
  return (
    <Routes>
      <Route element={<Disposicio />}>
        <Route [[1]] element={<Inici />} />
        <Route path="cataleg" element={<Cataleg />} />
        <Route path="producte/[[2]]" element={<Producte />} />
        <Route path="[[3]]" element={<NoTrobada />} />
      </Route>
    </Routes>
  );
}

// components/Disposicio.tsx
export default function Disposicio() {
  return (
    <div className="pagina">
      <Capcalera />
      <main className="contingut">
        <[[4]] />
      </main>
    </div>
  );
}`,
        buits: [
          { opcions: ['react-router', 'react-router-dom', 'react-dom', 'vite-router'], correcta: 'react-router', perque: 'A React Router 8 tot surt del paquet react-router.' },
          { opcions: ['index', 'path="/inici"', 'end', 'default'], correcta: 'index', perque: 'index marca la pàgina de l\'arrel de la ruta pare (/).' },
          { opcions: [':id', '{id}', '$id', '*id'], correcta: ':id', perque: 'Els dos punts marquen un tros variable de la URL.' },
          { opcions: ['*', '404', 'error', '/'], correcta: '*', perque: 'L\'asterisc atrapa qualsevol URL que no ha coincidit abans.' },
          { opcions: ['Outlet', 'Routes', 'Link', 'Navigate'], correcta: 'Outlet', perque: 'Outlet és on la disposició dibuixa la pàgina filla.' },
        ],
        pista: 'Paquet de la versió 8, la pàgina d\'inici, un tros variable, la 404 i el forat de la disposició.',
      },
      {
        tipus: 'aparellar',
        titol: 'Repte 3B · Quina planta s\'obre?',
        enunciat: 'Amb la taula de rutes del repte anterior, què es dibuixa a cada URL i què val useParams().id?',
        codi: true,
        columnes: [
          { nom: 'Pàgina', opcions: ['Inici', 'Cataleg', 'Producte', 'NoTrobada'] },
          { nom: 'useParams().id', opcions: ['no n\'hi ha', '"3" (text)', '3 (número)', '"cataleg"'] },
        ],
        files: [
          { text: '/', correctes: ['Inici', 'no n\'hi ha'], perque: 'La ruta index. No hi ha cap tros variable.' },
          { text: '/cataleg', correctes: ['Cataleg', 'no n\'hi ha'], perque: 'Ruta fixa: no té :id.' },
          { text: '/cataleg?cerca=tassa', correctes: ['Cataleg', 'no n\'hi ha'], perque: 'El que va després de ? no forma part del path: es llegeix amb useSearchParams.' },
          { text: '/producte/3', correctes: ['Producte', '"3" (text)'], perque: 'useParams sempre retorna text: cal Number(id).' },
          { text: '/carro', correctes: ['NoTrobada', 'no n\'hi ha'], perque: 'No hi ha cap ruta /carro: l\'atrapa l\'asterisc.' },
          { text: '/producte/3/opinions', correctes: ['NoTrobada', 'no n\'hi ha'], perque: 'producte/:id només encaixa amb un tros després de producte/. Aquesta URL en té dos: va a *.' },
        ],
        pista: 'El que va després de ? no compta per a les rutes. useParams no converteix mai a número.',
      },
      {
        tipus: 'quiz',
        titol: 'Repte 3C · El tauler de l\'ascensor',
        enunciat: 'Cinc preguntes sobre enllaços i hooks del router.',
        preguntes: [
          {
            pregunta: 'Amb quin hook llegeixes «tassa» de la URL /cataleg?cerca=tassa?',
            opcions: ['useSearchParams', 'useParams', 'useNavigate', 'useState'],
            correcta: 0,
            perque: 'parametres.get(\'cerca\') retorna "tassa".',
          },
          {
            pregunta: 'La URL és /producte/3. Què mostra aquest codi?',
            codi: `const { id } = useParams();
return <p>{id === 3 ? 'És el 3' : 'No és el 3'}</p>;`,
            opcions: ['No és el 3', 'És el 3', 'Un error de compilació', 'Res'],
            correcta: 0,
            perque: 'id val el text "3", i "3" === 3 és fals. Calia Number(id) === 3.',
          },
          {
            pregunta: 'Per què a la capçalera no fem servir <a href="/cataleg">?',
            opcions: [
              'Perquè recarrega tota la pàgina i es perd l\'estat de l\'aplicació',
              'Perquè no funciona a Chrome',
              'Perquè TypeScript no ho permet',
              'Perquè els enllaços han de ser botons',
            ],
            correcta: 0,
            perque: 'Link canvia la URL sense recarregar: React només redibuixa el que canvia.',
          },
          {
            pregunta: 'Què fa el botó «Torna» de la fitxa?',
            codi: `const navega = useNavigate();
<button onClick={() => navega(-1)}>Torna</button>`,
            opcions: [
              'El mateix que el botó enrere del navegador',
              'Va a la pàgina d\'inici',
              'Torna a carregar la pàgina',
              'Va al producte anterior de la llista',
            ],
            correcta: 0,
            perque: '-1 vol dir un pas enrere a l\'historial.',
          },
          {
            pregunta: 'Què passa si treus end del NavLink de "/"?',
            codi: `<NavLink to="/" end className={classe}>Inici</NavLink>`,
            opcions: [
              'L\'enllaç Inici surt marcat com a actiu a totes les pàgines',
              'L\'enllaç deixa de funcionar',
              'Es recarrega la pàgina en clicar-hi',
              'No canvia res',
            ],
            correcta: 0,
            perque: 'Totes les rutes comencen per /: sense end, / es considera actiu sempre.',
          },
        ],
        pista: 'Paràmetres de consulta, text contra número, Link contra a, l\'historial i el NavLink d\'inici.',
      },
    ],
    fragment: { posicio: 3, lletra: 'N' },
    missatgeFinal: 'Ascensors operatius: cada URL torna a portar a la seva planta.',
  },

  // ------------------------------------------------------------------ PLANTA 4
  {
    id: 4,
    codi: 'PLANTA 4',
    nom: 'L\'obrador',
    lloc: 'Sessió 4 · Taller: una web de zero (PratViatges)',
    sistema: 'Línia de muntatge de components',
    icona: '✈',
    transmissio: [
      'Planta 4. La línia de muntatge de components està aturada i les peces de PratViatges són per terra.',
      'Recorda com vas construir una web sencera de zero: l\'ordre dels passos, els components amb props i on va cada fitxer.',
    ],
    teoria: [
      {
        titol: 'El mètode del taller',
        html: `<p>PratViatges es construeix en <strong>13 passos</strong>, cadascun amb una comprovació: crear el projecte amb Vite · netejar l'esquelet · tokens i estils globals · primer component (<code>Peu</code>) amb CSS Module · component amb props (<code>Boto</code>) · dades tipades · component que rep dades (<code>TargetaDestinacio</code>) · les pàgines · instal·lar React Router · taula de rutes · capçalera, <code>Outlet</code> i el canvi d'<code>&lt;a&gt;</code> a <code>&lt;Link&gt;</code> · ruta dinàmica amb <code>useParams</code> i 404 · revisió final amb <code>npm run build</code>.</p>
<p>Carpetes: <code>src/components</code> (peces reutilitzables i els seus <code>.module.css</code>), <code>src/pagines</code> (una per URL) i <code>src/dades</code> (les dades i els seus tipus).</p>`,
      },
      {
        titol: 'Un component amb props: el Boto',
        html: `<p>Les <strong>props</strong> són els paràmetres del component. <code>children</code> és el que escrivim entre <code>&lt;Boto&gt;</code> i <code>&lt;/Boto&gt;</code>.</p>`,
        codi: `import type { ReactNode } from 'react';
import estils from './Boto.module.css';

type Props = {
  children: ReactNode;
  variant?: 'primari' | 'secundari';
  onClick?: () => void;
};

export default function Boto({ children, variant = 'primari', onClick }: Props) {
  const classes =
    variant === 'secundari' ? \`\${estils.boto} \${estils.secundari}\` : estils.boto;

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}`,
        linies: [
          { codi: `import type { ReactNode } from 'react';`, explica: 'Importa només el tipus: qualsevol cosa que React pugui dibuixar (text, elements, llistes).' },
          { codi: `variant?: 'primari' | 'secundari';`, explica: 'Prop opcional que només accepta aquests dos textos.' },
          { codi: `variant = 'primari'`, explica: 'Valor per defecte si qui fa servir el Boto no posa variant.' },
          { codi: '`${estils.boto} ${estils.secundari}`', explica: 'Ajunta dues classes del CSS Module en un sol text, separades per un espai.' },
          { codi: 'onClick={onClick}', explica: 'Passa la funció rebuda tal qual al botó real, sense cridar-la.' },
          { codi: '{children}', explica: 'Dibuixa el contingut que hi hagi entre les etiquetes del Boto.' },
        ],
      },
      {
        titol: 'Dades tipades i un component que les rep',
        html: `<p>Les dades es declaren amb el seu <code>type</code> a <code>src/dades</code>. Cada targeta rep <strong>una</strong> destinació per props i no sap res de la resta de la llista.</p>`,
        codi: `export type Destinacio = { id: number; nom: string; pais: string; preu: number };

export function buscaDestinacio(id: number): Destinacio | undefined {
  return destinacions.find((d) => d.id === id);
}

// pagines/Destinacions.tsx
{destinacions.map((d) => (
  <TargetaDestinacio key={d.id} destinacio={d} />
))}`,
        linies: [
          { codi: 'Destinacio | undefined', explica: 'find pot no trobar res: el tipus obliga a comprovar-ho abans de fer-la servir.' },
          { codi: 'destinacions.map((d) => …)', explica: 'Converteix cada dada en una targeta.' },
          { codi: 'key={d.id}', explica: 'Cada element d\'una llista necessita una clau única i estable: l\'id de la dada.' },
          { codi: 'destinacio={d}', explica: 'La destinació baixa com a prop.' },
        ],
      },
      {
        titol: 'Els errors típics del taller',
        html: `<table class="taula-linies"><thead><tr><th>Missatge</th><th>Causa</th></tr></thead><tbody>
<tr><td><code>Cannot find module './Boto.module.css'</code> (TS2307)</td><td>Falta <code>src/vite-env.d.ts</code> amb <code>/// &lt;reference types="vite/client" /&gt;</code>.</td></tr>
<tr><td><code>useHref() may be used only in the context of a &lt;Router&gt;</code></td><td>Hi ha un <code>Link</code> fora del <code>BrowserRouter</code>.</td></tr>
<tr><td><code>Each child in a list should have a unique "key" prop</code></td><td>Falta la <code>key</code> al <code>map</code>.</td></tr>
<tr><td><code>does not provide an export named 'default'</code></td><td>El component no té <code>export default</code>.</td></tr>
<tr><td>El hover tapa l'enllaç actiu</td><td>Especificitat: cal <code>.enllac:hover:not(.actiu)</code>.</td></tr>
</tbody></table>`,
      },
    ],
    ideaClau: 'Una web es construeix per capes: tokens, components amb props tipades, dades, pàgines i rutes. Cada peça a la seva carpeta i npm run build com a revisió final.',
    proves: [
      {
        tipus: 'sequencia',
        titol: 'Repte 4A · Torna a muntar la línia',
        enunciat: 'Ordena els passos del taller PratViatges. Dos dels blocs són trampes de l\'Esborrador.',
        inici: 'CARPETA BUIDA',
        final: 'PRATVIATGES PUBLICABLE',
        missatgeOk: 'Línia de muntatge en marxa!',
        ordre: [
          'Crear el projecte amb Vite i netejar l\'esquelet',
          'Tokens i estils globals a index.css',
          'Primer component amb CSS Module (Peu)',
          'Component amb props (Boto)',
          'Dades tipades (destinacions.ts)',
          'Component que rep dades (TargetaDestinacio)',
          'Les pàgines (Inici, Destinacions, Sobre, Contacte)',
          'Instal·lar React Router i escriure la taula de rutes',
          'Capçalera, Outlet i canviar <a> per <Link>',
          'Ruta dinàmica amb useParams i pàgina 404',
          'Revisió final amb npm run build',
        ],
        intrusos: [
          { text: 'Instal·lar Bootstrap per als estils', perque: 'Al mòdul fem tokens + CSS Modules, sense frameworks d\'estils.' },
          { text: 'Pujar node_modules a GitHub', perque: 'node_modules no es puja mai: es regenera amb npm install.' },
        ],
        pista: 'Primer l\'aspecte (tokens), després les peces petites, després les dades, les pàgines i, al final, les rutes que les connecten.',
      },
      {
        tipus: 'completar',
        titol: 'Repte 4B · Forja el Boto',
        enunciat: 'Completa el component Boto tal com el vam fer al taller.',
        fitxer: 'components/Boto.tsx',
        codi: `import type { [[0]] } from 'react';
import estils from './Boto.module.css';

type Props = {
  children: ReactNode;
  variant[[1]]: 'primari' | 'secundari';
  onClick?: () => void;
};

export default function Boto({ children, variant = [[2]], onClick }: Props) {
  const classes =
    variant === 'secundari' ? \`\${estils.boto} \${estils.secundari}\` : estils.boto;

  return (
    <button className={classes} onClick={[[3]]}>
      {[[4]]}
    </button>
  );
}`,
        buits: [
          { opcions: ['ReactNode', 'JSX', 'string', 'HTMLElement'], correcta: 'ReactNode', perque: 'ReactNode és el tipus de tot el que React pot dibuixar: el que va a children.' },
          { opcions: ['?', '!', '*', '&'], correcta: '?', perque: 'El ? fa la prop opcional.' },
          { opcions: [`'primari'`, 'primari', 'null', `'boto'`], correcta: `'primari'`, perque: 'El valor per defecte és el text \'primari\', entre cometes.' },
          { opcions: ['onClick', 'onClick()', '() => onClick', 'estils.onClick'], correcta: 'onClick', perque: 'Es passa la funció, no se la crida. onClick() l\'executaria en dibuixar; () => onClick no l\'executaria mai.' },
          { opcions: ['children', 'props.children', 'variant', 'classes'], correcta: 'children', perque: 'El contingut entre <Boto> i </Boto>. props no existeix: les props ja estan desestructurades.' },
        ],
        pista: 'El tipus de children, una prop opcional, un text per defecte, passar la funció sense cridar-la i dibuixar el contingut.',
      },
      {
        tipus: 'classificar',
        titol: 'Repte 4C · Endreça el magatzem',
        enunciat: 'L\'Esborrador ha buidat totes les carpetes de PratViatges. Torna cada fitxer al seu lloc.',
        codi: true,
        categories: ['src/components', 'src/pagines', 'src/dades', 'arrel'],
        elements: [
          { text: 'Boto.tsx', correcta: 'src/components', perque: 'Peça reutilitzable.' },
          { text: 'Capcalera.module.css', correcta: 'src/components', perque: 'L\'estil va al costat del seu component.' },
          { text: 'TargetaDestinacio.tsx', correcta: 'src/components', perque: 'Peça que es repeteix a la llista.' },
          { text: 'Disposicio.tsx', correcta: 'src/components', perque: 'La disposició comuna amb Outlet és un component.' },
          { text: 'Destinacions.tsx', correcta: 'src/pagines', perque: 'Té URL pròpia: /destinacions.' },
          { text: 'DetallDestinacio.tsx', correcta: 'src/pagines', perque: 'La fitxa de /destinacions/:id.' },
          { text: 'NoTrobada.tsx', correcta: 'src/pagines', perque: 'La pàgina 404.' },
          { text: 'destinacions.ts', correcta: 'src/dades', perque: 'Les dades i el tipus Destinacio.' },
          { text: 'package.json', correcta: 'arrel', perque: 'Configuració del projecte: va a l\'arrel.' },
          { text: 'index.html', correcta: 'arrel', perque: 'L\'única pàgina HTML va a l\'arrel en un projecte Vite.' },
        ],
        pista: 'Si té URL pròpia és una pàgina; si es reutilitza és un component; si són dades van a dades; la configuració va a l\'arrel.',
      },
      {
        tipus: 'quiz',
        titol: 'Repte 4D · Diagnòstic d\'avaries',
        enunciat: 'La consola escup errors. Tria la causa de cadascun.',
        preguntes: [
          {
            pregunta: 'TypeScript diu: Cannot find module \'./Boto.module.css\' (TS2307). Què falta?',
            opcions: [
              'src/vite-env.d.ts amb /// <reference types="vite/client" />',
              'Instal·lar el paquet css-modules',
              'Canviar l\'extensió a .scss',
              'Posar el CSS dins de l\'index.html',
            ],
            correcta: 0,
            perque: 'Aquella línia ensenya a TypeScript que els .module.css són mòduls vàlids.',
          },
          {
            pregunta: 'La pantalla queda en blanc i la consola diu: useHref() may be used only in the context of a <Router> component. Què passa?',
            opcions: [
              'Hi ha un Link fora del BrowserRouter',
              'Falta una ruta *',
              'El Link apunta a una URL que no existeix',
              'S\'ha d\'instal·lar react-router-dom',
            ],
            correcta: 0,
            perque: 'Link i NavLink necessiten tenir el BrowserRouter per sobre (a main.tsx).',
          },
          {
            pregunta: 'Avís: Each child in a list should have a unique "key" prop. On és el problema?',
            opcions: ['Al map que dibuixa la llista', 'Al useState', 'Al fitxer CSS', 'A la taula de rutes'],
            correcta: 0,
            perque: 'Cada element que surt d\'un map necessita key={d.id}.',
          },
          {
            pregunta: 'Error: The requested module \'/src/components/Peu.tsx\' does not provide an export named \'default\'. Què falta?',
            opcions: [
              'export default a la funció Peu',
              'Un fitxer Peu.module.css',
              'Tornar a fer npm install',
              'Posar Peu dins d\'un fragment',
            ],
            correcta: 0,
            perque: 'import Peu from \'./Peu\' espera una exportació per defecte.',
          },
        ],
        pista: 'Tipus dels CSS Modules, Router per sobre dels Link, key als map i export default.',
      },
    ],
    fragment: { posicio: 4, lletra: 'D' },
    missatgeFinal: 'La línia de muntatge torna a produir components. PratViatges està llest per publicar.',
  },

  // ------------------------------------------------------------------ PLANTA 5
  {
    id: 5,
    codi: 'PLANTA 5',
    nom: 'El cor de l\'estat',
    lloc: 'Sessió 5 · Estat, esdeveniments i formularis',
    sistema: 'Caixes i carro de la compra',
    icona: '⟳',
    transmissio: [
      'Planta 5. El cor de la botiga ha deixat de bategar: el carro no suma, el cercador no filtra i el formulari recarrega la pàgina.',
      'És la planta més perillosa. Repassa bé useState, les seves regles, els formularis controlats i useEffect.',
    ],
    teoria: [
      {
        titol: 'Per què una variable normal no serveix',
        html: `<p>Si canvies una variable normal, React <strong>no se n'assabenta</strong> i no torna a dibuixar el component. <code>useState</code> retorna el valor i una funció per canviar-lo; cada crida a aquesta funció fa que React <strong>torni a dibuixar</strong> el component amb el valor nou.</p>`,
        codi: `const [punts, setPunts] = useState(0);

<button onClick={() => setPunts(punts + 1)}>Suma</button>
<p>Tens {punts} punts</p>`,
        linies: [
          { codi: 'useState(0)', explica: 'Crea un estat que comença valent 0.' },
          { codi: 'const [punts, setPunts]', explica: 'Desestructura l\'array: el valor actual i la funció per canviar-lo.' },
          { codi: 'setPunts(punts + 1)', explica: 'Demana el valor nou. React torna a dibuixar el component i punts ja val 1.' },
        ],
      },
      {
        titol: 'Les tres regles de useState',
        html: `<ol>
<li><strong>Els ganxos, a dalt de tot.</strong> Mai dins d'un <code>if</code>, d'un bucle o d'una funció interna: React identifica cada <code>useState</code> per l'<strong>ordre</strong>.</li>
<li><strong>No mutis l'estat.</strong> <code>llista.push(x)</code> modifica el mateix array: React veu el mateix objecte i no repinta. Crea'n un de nou: <code>[...llista, x]</code>, <code>.filter()</code>, <code>.map()</code>, <code>{ ...objecte, camp: valor }</code>.</li>
<li><strong>El canvi no és immediat.</strong> El valor nou arriba al dibuixat següent. Si encadenes canvis que depenen de l'anterior, fes servir la <strong>forma funcional</strong>.</li>
</ol>`,
        codi: `// Suma 1, no 3: punts val 0 a les tres línies
setPunts(punts + 1);
setPunts(punts + 1);
setPunts(punts + 1);

// Suma 3: cada crida rep el valor de l'anterior
setPunts((p) => p + 1);
setPunts((p) => p + 1);
setPunts((p) => p + 1);`,
      },
      {
        titol: 'Esdeveniments, llistes filtrades i la key',
        html: `<ul>
<li><code>onClick={() =&gt; onAfegir(producte)}</code>: passem una funció que cridarà l'altra <strong>en clicar</strong>. <code>onClick={onAfegir(producte)}</code> la crida <strong>en dibuixar</strong>.</li>
<li>L'objecte d'esdeveniment porta el valor del camp: <code>e.target.value</code>.</li>
<li>La llista visible <strong>no és estat</strong>: es calcula a cada dibuixat amb <code>filter</code> a partir de les dades i del text del cercador (<strong>estat derivat</strong>). El mateix amb el total del carro.</li>
<li>La <code>key</code> és l'<strong>id de la dada</strong>, mai l'índex: si la llista es filtra o s'ordena, l'índex canvia d'element.</li>
</ul>`,
        codi: `const [text, setText] = useState('');
const visibles = productes.filter((p) =>
  p.nom.toLowerCase().includes(text.trim().toLowerCase()),
);

<input value={text} onChange={(e) => setText(e.target.value)} />
{visibles.map((p) => (
  <TargetaProducte key={p.id} producte={p} onAfegir={onAfegir} />
))}`,
      },
      {
        titol: 'Formularis controlats',
        html: `<p>Un camp <strong>controlat</strong> té <code>value</code> lligat a l'estat i un <code>onChange</code> que l'actualitza: React és qui mana. Si poses <code>value</code> sense <code>onChange</code>, el camp no deixa escriure.</p>`,
        codi: `const BUIT = { nom: '', correu: '', missatge: '' };
const [dades, setDades] = useState(BUIT);

function canvia(camp: keyof Formulari, valor: string) {
  setDades({ ...dades, [camp]: valor });
}

function envia(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const trobats = validar(dades);
  setErrors(trobats);
  if (Object.keys(trobats).length === 0) {
    setEnviat(true);
    setDades(BUIT);
  }
}`,
        linies: [
          { codi: '{ ...dades, [camp]: valor }', explica: 'Objecte nou amb tots els camps d\'abans i només el que toca canviat.' },
          { codi: 'e.preventDefault();', explica: 'Sense això, el navegador envia el formulari i recarrega la pàgina.' },
          { codi: 'validar(dades)', explica: 'Funció a part que retorna un objecte d\'errors. Es pot provar sola.' },
          { codi: 'Object.keys(trobats).length === 0', explica: 'Si no hi ha cap error, es dona per enviat i es buida el formulari.' },
        ],
      },
      {
        titol: 'Aixecar l\'estat i useEffect',
        html: `<p>Si dos components necessiten la mateixa dada (la capçalera i el catàleg necessiten el carro), l'estat <strong>puja al pare comú</strong> (<code>App</code>). Les dades baixen com a props; les accions baixen com a funcions.</p>
<p><code>useEffect</code> executa codi <strong>després</strong> de dibuixar. La llista de dependències diu quan: <code>[carro]</code> = cada cop que canvia el carro; <code>[]</code> = només el primer cop.</p>`,
        codi: `const [carro, setCarro] = useState<LiniaCarro[]>(carregaCarro);
const unitats = carro.reduce((suma, linia) => suma + linia.unitats, 0);

useEffect(() => {
  localStorage.setItem(CLAU, JSON.stringify(carro));
}, [carro]);`,
        linies: [
          { codi: 'useState(carregaCarro)', explica: 'Passem la funció (sense parèntesis): React només la crida el primer cop per llegir el carro desat.' },
          { codi: 'carro.reduce(…, 0)', explica: 'Estat derivat: les unitats es calculen, no es guarden a part.' },
          { codi: 'JSON.stringify(carro)', explica: 'localStorage només guarda text: convertim l\'array a JSON.' },
          { codi: '}, [carro]);', explica: 'L\'efecte s\'executa després de cada dibuixat en què el carro ha canviat.' },
        ],
      },
    ],
    ideaClau: 'L\'estat és memòria que provoca un redibuixat: ganxos a dalt, mai mutar, el canvi arriba al dibuixat següent. El que es pot calcular no es guarda, i l\'estat compartit puja al pare.',
    proves: [
      {
        tipus: 'quiz',
        titol: 'Repte 5A · Endevina el batec',
        enunciat: 'Cinc fragments. Què passa realment?',
        preguntes: [
          {
            pregunta: 'punts val 0 i cliques un cop el botó que crida suma3(). Quant val punts després?',
            codi: `function suma3() {
  setPunts(punts + 1);
  setPunts(punts + 1);
  setPunts(punts + 1);
}`,
            opcions: ['1', '3', '0', 'Error'],
            correcta: 0,
            perque: 'A les tres línies punts encara val 0: les tres demanen 0 + 1.',
          },
          {
            pregunta: 'I amb la forma funcional?',
            codi: `function suma3() {
  setPunts((p) => p + 1);
  setPunts((p) => p + 1);
  setPunts((p) => p + 1);
}`,
            opcions: ['3', '1', '0', 'Error'],
            correcta: 0,
            perque: 'Cada crida rep el valor que ha deixat l\'anterior.',
          },
          {
            pregunta: 'talles val [\'S\', \'M\']. Què veu l\'usuari després de clicar?',
            codi: `function afegeix() {
  talles.push('L');
  setTalles(talles);
}`,
            opcions: [
              'La pantalla no canvia: és el mateix array i React no repinta',
              'S · M · L',
              'Un error a la consola',
              'L',
            ],
            correcta: 0,
            perque: 'S\'ha mutat l\'estat. Calia setTalles([...talles, \'L\']).',
          },
          {
            pregunta: 'Què passa amb aquest botó?',
            codi: `<button onClick={afegeix(producte)}>Afegeix</button>`,
            opcions: [
              'afegeix s\'executa en dibuixar, no en clicar',
              'Funciona perfectament',
              'No compila mai',
              'Afegeix el producte dos cops',
            ],
            correcta: 0,
            perque: 'Calia passar una funció: onClick={() => afegeix(producte)}.',
          },
          {
            pregunta: 'Quan s\'executa aquest efecte?',
            codi: `useEffect(() => {
  console.log('Hola');
}, []);`,
            opcions: [
              'Només un cop, després del primer dibuixat',
              'Cada vegada que es dibuixa el component',
              'Abans de dibuixar',
              'Mai',
            ],
            correcta: 0,
            perque: 'Amb la llista de dependències buida no hi ha res que el torni a disparar. (En desenvolupament, StrictMode el pot executar dos cops per detectar errors.)',
          },
        ],
        pista: 'El valor de l\'estat no canvia fins al dibuixat següent; push muta; onClick vol una funció; [] vol dir el primer cop.',
      },
      {
        tipus: 'seleccionar',
        titol: 'Repte 5B · Els cinc sabotatges',
        enunciat: 'L\'Esborrador ha sabotejat aquest catàleg en cinc punts. Marca les línies amb error.',
        etiqueta: 'SABOTATGE',
        missatgeOk: 'Sabotatges neutralitzats! El catàleg torna a respondre.',
        codi: true,
        elements: [
          { sector: '1', text: 'export default function Cataleg() {', correcta: false, perque: 'Correcte.' },
          { sector: '2', text: `  const [text, setText] = useState('');`, correcta: false, perque: 'Correcte: estat del cercador, a dalt de tot.' },
          { sector: '3', text: `  if (text === '') {`, correcta: false, perque: 'L\'if en si no és l\'error; el problema és el que hi ha a dins.' },
          { sector: '4', text: `    const [categoria, setCategoria] = useState('totes');`, correcta: true, perque: 'Un ganxo dins d\'un if: trenca la regla 1. Els ganxos sempre a dalt i en el mateix ordre.' },
          { sector: '5', text: '  }', correcta: false, perque: 'Correcte.' },
          { sector: '6', text: '  const [preferits, setPreferits] = useState<number[]>([]);', correcta: false, perque: 'Correcte.' },
          { sector: '7', text: '  const [visibles, setVisibles] = useState(productes);', correcta: true, perque: 'Estat derivat guardat com a estat: la llista visible s\'ha de calcular amb filter a cada dibuixat.' },
          { sector: '8', text: '  function marca(id: number) {', correcta: false, perque: 'Correcte.' },
          { sector: '9', text: '    preferits.push(id); setPreferits(preferits);', correcta: true, perque: 'Muta l\'estat: React no repinta. Calia setPreferits([...preferits, id]).' },
          { sector: '10', text: '  }', correcta: false, perque: 'Correcte.' },
          { sector: '11', text: '  return (', correcta: false, perque: 'Correcte.' },
          { sector: '12', text: '    <>', correcta: false, perque: 'Correcte: fragment.' },
          { sector: '13', text: '      <input value={text} aria-label="Cerca" />', correcta: true, perque: 'Camp amb value però sense onChange: no deixa escriure. Falta onChange={(e) => setText(e.target.value)}.' },
          { sector: '14', text: '      <ul>', correcta: false, perque: 'Correcte.' },
          { sector: '15', text: '        {visibles.map((p, i) => (', correcta: false, perque: 'Correcte (el map en si).' },
          { sector: '16', text: '          <li key={i} onClick={() => marca(p.id)}>{p.nom}</li>', correcta: true, perque: 'La key és l\'índex: quan la llista es filtra, canvia d\'element. Ha de ser key={p.id}.' },
          { sector: '17', text: '        ))}', correcta: false, perque: 'Correcte.' },
          { sector: '18', text: '      </ul>', correcta: false, perque: 'Correcte.' },
          { sector: '19', text: '    </>', correcta: false, perque: 'Correcte.' },
          { sector: '20', text: '  );', correcta: false, perque: 'Correcte.' },
          { sector: '21', text: '}', correcta: false, perque: 'Correcte.' },
        ],
        pista: 'Repassa les tres regles de useState, l\'estat derivat, els camps controlats i la key.',
      },
      {
        tipus: 'classificar',
        titol: 'Repte 5C · Estat, prop o derivat?',
        enunciat: 'A la PratShop de la sessió 5, cada dada viu en un lloc. Classifica-les.',
        categories: ['Estat', 'Prop', 'Derivat'],
        elements: [
          { text: 'El text del cercador, dins de Cataleg', correcta: 'Estat', perque: 'Canvia quan l\'usuari escriu i ningú més el necessita: useState a Cataleg.' },
          { text: 'La llista de productes visibles', correcta: 'Derivat', perque: 'Es calcula amb filter a partir dels productes i del text.' },
          { text: 'unitatsAlCarro, dins de Capcalera', correcta: 'Prop', perque: 'La capçalera només rep un número del pare.' },
          { text: 'El total del carro', correcta: 'Derivat', perque: 'Es calcula amb reduce: no es guarda.' },
          { text: 'El carro, dins d\'App', correcta: 'Estat', perque: 'L\'estat aixecat al pare comú.' },
          { text: 'onAfegir, dins de TargetaProducte', correcta: 'Prop', perque: 'L\'acció baixa del pare com a funció.' },
          { text: 'exhaurit (producte.estoc === 0)', correcta: 'Derivat', perque: 'Un booleà calculat a partir de la dada.' },
          { text: 'Els errors del formulari de Contacte', correcta: 'Estat', perque: 'Canvien en enviar: useState a Contacte.' },
          { text: 'El producte que rep TargetaProducte', correcta: 'Prop', perque: 'Baixa del Cataleg a cada targeta.' },
        ],
        pista: 'Si canvia amb el temps i el component el recorda: estat. Si ve del pare: prop. Si es pot calcular: derivat.',
      },
      {
        tipus: 'completar',
        titol: 'Repte 5D · Reanima el carro',
        enunciat: 'Completa App.tsx perquè el carro torni a sumar unitats, a desar-se i a rebre productes.',
        fitxer: 'App.tsx',
        codi: `export default function App() {
  const [carro, setCarro] = useState<LiniaCarro[]>(carregaCarro);

  // Estat derivat: es calcula, no es guarda
  const unitats = carro.[[0]]((suma, linia) => suma + linia.unitats, 0);

  useEffect(() => {
    localStorage.setItem(CLAU, [[1]](carro));
  }, [[2]]);

  function afegeix(producte: Producte) {
    setCarro((anterior) => {
      const jaHiEs = anterior.find((linia) => linia.producte.id === producte.id);
      if (jaHiEs) {
        return anterior.[[3]]((linia) =>
          linia.producte.id === producte.id ? { [[4]], unitats: linia.unitats + 1 } : linia,
        );
      }
      return [...anterior, { producte, unitats: 1 }];
    });
  }

  return (
    <>
      <Capcalera unitatsAlCarro={unitats} />
      <Cataleg onAfegir={[[5]]} />
    </>
  );
}`,
        buits: [
          { opcions: ['reduce', 'map', 'filter', 'forEach'], correcta: 'reduce', perque: 'reduce acumula: suma les unitats de totes les línies partint de 0.' },
          { opcions: ['JSON.stringify', 'JSON.parse', 'String', 'Object.keys'], correcta: 'JSON.stringify', perque: 'localStorage guarda text: stringify converteix l\'array en JSON.' },
          { opcions: ['[carro]', '[]', '[unitats]', '[CLAU]'], correcta: '[carro]', perque: 'Es desa cada cop que el carro canvia.' },
          { opcions: ['map', 'forEach', 'push', 'filter'], correcta: 'map', perque: 'map crea un array nou on només la línia del producte canvia.' },
          { opcions: ['...linia', 'linia', '...anterior', 'producte'], correcta: '...linia', perque: 'Objecte nou amb tot el de la línia i les unitats sumades: no es muta.' },
          { opcions: ['afegeix', 'afegeix()', 'setCarro', 'carro'], correcta: 'afegeix', perque: 'L\'acció baixa com a funció, sense cridar-la.' },
        ],
        pista: 'Acumular, convertir a text, quan es desa, un array nou, un objecte nou i passar la funció.',
      },
    ],
    fragment: { posicio: 5, lletra: 'E' },
    missatgeFinal: 'El cor de PratShop torna a bategar: el carro suma, es desa i la capçalera ho sap.',
  },

  // ------------------------------------------------------------------ PLANTA 6
  {
    id: 6,
    codi: 'PLANTA 6',
    nom: 'La biblioteca',
    lloc: 'Sessió 6 · Activitat guiada PratLlibres',
    sistema: 'Sala de proves (tot en verd)',
    icona: '▤',
    transmissio: [
      'Planta 6. A la biblioteca de PratLlibres totes les proves estan en vermell.',
      'Recorda l\'activitat guiada: deu TODO, deu proves de Vitest. Fes que tot torni a estar en verd.',
    ],
    teoria: [
      {
        titol: 'Una aplicació que ja funciona, amb forats',
        html: `<p>PratLlibres és un catàleg de llibres (React 19 + TypeScript + Vite) amb un cercador, preferits amb globus a la capçalera i un formulari d'opinió. Té <strong>10 TODO</strong> d'una a tres línies i <strong>10 proves de Vitest</strong> que els comproven.</p>
<ul>
<li><code>npm run dev</code> en una terminal, per veure l'aplicació.</li>
<li><code>npm test</code> en una altra, per executar les proves: cada prova diu quin TODO comprova.</li>
<li>Es treballa de <strong>vermell a verd</strong>: fer un TODO, passar les proves, el següent.</li>
</ul>`,
      },
      {
        titol: 'El que demanaven els TODO',
        html: `<table class="taula-linies"><thead><tr><th>TODO</th><th>Concepte</th></tr></thead><tbody>
<tr><td>1 i 2 · Cataleg</td><td><code>useState</code> del cercador i <code>onChange</code> del camp</td></tr>
<tr><td>3 · Cataleg</td><td>Condició del <code>filter</code>: títol <strong>o</strong> autor</td></tr>
<tr><td>4 · Cataleg</td><td>La <code>key</code> de cada element de la llista</td></tr>
<tr><td>5 · App</td><td>Afegir o treure un preferit <strong>sense mutar</strong></td></tr>
<tr><td>6 · Capcalera</td><td>Globus amb el recompte: renderitzat condicional</td></tr>
<tr><td>7 · Opinio</td><td>Fer el camp «Títol del llibre» controlat</td></tr>
<tr><td>8 · Opinio</td><td><code>preventDefault</code>, desar els errors i marcar l'enviament</td></tr>
<tr><td>9 · Cataleg</td><td>Missatge de llista buida</td></tr>
<tr><td>10 · App</td><td><code>useEffect</code> + <code>localStorage</code></td></tr>
</tbody></table>`,
      },
      {
        titol: 'Dues eines per a tot el que queda',
        html: `<p><strong>Renderitzat condicional.</strong> Per mostrar o amagar una part de la pantalla segons una condició:</p>
<ul>
<li><code>{condicio &amp;&amp; &lt;Element /&gt;}</code>: només si és certa.</li>
<li><code>{condicio ? &lt;A /&gt; : &lt;B /&gt;}</code>: una cosa o l'altra.</li>
</ul>
<p><strong>Alternar un element d'una llista sense mutar-la.</strong> Si hi és, se'n fa una de nova sense ell amb <code>filter</code>; si no hi és, una de nova amb ell al final amb l'spread.</p>`,
        codi: `{preferits.length > 0 && <span className="globus">{preferits.length}</span>}

setPreferits(
  preferits.includes(id)
    ? preferits.filter((x) => x !== id)
    : [...preferits, id],
);`,
        linies: [
          { codi: 'preferits.length > 0 && …', explica: 'El globus només es dibuixa si hi ha algun preferit.' },
          { codi: 'preferits.includes(id)', explica: 'Cert si l\'id ja és a la llista.' },
          { codi: 'preferits.filter((x) => x !== id)', explica: 'Llista nova amb tots menys aquest id.' },
          { codi: '[...preferits, id]', explica: 'Llista nova amb tots els d\'abans i l\'id al final.' },
        ],
      },
    ],
    ideaClau: 'Es treballa de vermell a verd: cada TODO aplica un concepte de la sessió 5 i cada prova et diu si està bé. Renderitzat condicional i llistes noves en lloc de mutar.',
    proves: [
      {
        tipus: 'aparellar',
        titol: 'Repte 6A · Llegeix les proves en vermell',
        enunciat: 'Cada missatge és el que veuries si un TODO estigués malament. Quin TODO és el culpable?',
        columnes: [
          {
            nom: 'TODO culpable',
            opcions: ['TODO 1 i 2', 'TODO 3', 'TODO 4', 'TODO 5', 'TODO 6', 'TODO 7', 'TODO 8', 'TODO 9', 'TODO 10'],
          },
        ],
        files: [
          { text: 'Escrius «rodoreda» al cercador i el camp continua buit', correctes: ['TODO 1 i 2'], perque: 'Prova 1: sense estat ni onChange, el camp no recorda el que escrius.' },
          { text: 'Cerques «pedrolo» i continuen sortint tots els llibres', correctes: ['TODO 3'], perque: 'Prova 2: la condició del filter retorna sempre true.' },
          { text: 'La consola avisa: Each child in a list should have a unique "key" prop', correctes: ['TODO 4'], perque: 'Prova 3: falta key={llibre.id}.' },
          { text: 'Cliques l\'estrella de «Solitud» i no queda marcat com a preferit', correctes: ['TODO 5'], perque: 'Prova 4: alternaPreferit no crea la llista nova.' },
          { text: 'Tens dos preferits però a la capçalera no surt cap globus', correctes: ['TODO 6'], perque: 'Prova 5: falta el renderitzat condicional del globus.' },
          { text: 'No pots escriure res al camp «Títol del llibre»', correctes: ['TODO 7'], perque: 'Prova 6: el camp té value però l\'onChange no fa res.' },
          { text: 'Envies el formulari buit i no surt cap missatge d\'error', correctes: ['TODO 8'], perque: 'Prova 7: no es desen els errors (i potser recarrega la pàgina).' },
          { text: 'Cerques «zzz» i la pantalla queda en blanc, sense cap missatge', correctes: ['TODO 9'], perque: 'Prova 8: la branca de la llista buida retorna null.' },
          { text: 'Marques preferits, recarregues la pàgina i han desaparegut', correctes: ['TODO 10'], perque: 'Prova 9: no hi ha cap useEffect que els desi a localStorage.' },
        ],
        pista: 'Mira la taula del manual: cada símptoma correspon a un concepte.',
      },
      {
        tipus: 'completar',
        titol: 'Repte 6B · Prova 1 a 3 en verd',
        enunciat: 'Completa el catàleg de PratLlibres: cercador, filtre, key i preferits.',
        fitxer: 'pagines/Cataleg.tsx',
        codi: `export default function Cataleg({ preferits, onAlternarPreferit }: Props) {
  // TODO 1
  const [text, setText] = [[0]]('');

  const visibles = llibres.filter((llibre) => {
    const cerca = text.trim().toLowerCase();
    // TODO 3
    return llibre.titol.toLowerCase().includes(cerca) [[1]] llibre.autor.toLowerCase().includes(cerca);
  });

  return (
    <main>
      <input
        aria-label="Cerca"
        value={text}
        // TODO 2
        onChange={(e) => setText([[2]])}
      />
      {visibles.length === 0 ? (
        <p className="buit">Cap llibre coincideix amb «{text}».</p>
      ) : (
        <div className={estils.graella}>
          {visibles.map((llibre) => (
            <TargetaLlibre
              // TODO 4
              key={[[3]]}
              llibre={llibre}
              esPreferit={preferits.[[4]](llibre.id)}
              onAlternarPreferit={onAlternarPreferit}
            />
          ))}
        </div>
      )}
    </main>
  );
}`,
        buits: [
          { opcions: ['useState', 'useEffect', 'useParams', 'useRef'], correcta: 'useState', perque: 'El text del cercador és estat del component.' },
          { opcions: ['||', '&&', '??', '|'], correcta: '||', perque: 'Ha de sortir si coincideix el títol O l\'autor.' },
          { opcions: ['e.target.value', 'e.value', 'e.target', 'text'], correcta: 'e.target.value', perque: 'El valor escrit és a e.target.value.' },
          { opcions: ['llibre.id', 'index', 'llibre.titol', 'Math.random()'], correcta: 'llibre.id', perque: 'L\'id és únic i estable. Math.random() canvia a cada dibuixat i l\'índex canvia en filtrar.' },
          { opcions: ['includes', 'find', 'push', 'indexOf'], correcta: 'includes', perque: 'includes retorna true o false, que és el que espera esPreferit.' },
        ],
        pista: 'L\'estat, una O lògica, el valor del camp, una clau estable i un mètode que retorna un booleà.',
      },
      {
        tipus: 'completar',
        titol: 'Repte 6C · Les últimes proves',
        enunciat: 'Completa els trossos d\'App, Capcalera i Opinio que falten perquè les proves 4 a 10 passin a verd.',
        fitxer: 'App.tsx · Capcalera.tsx · Opinio.tsx',
        codi: `// App.tsx · TODO 10
useEffect(() => {
  localStorage.setItem(CLAU, JSON.stringify(preferits));
}, [[0]]);

// App.tsx · TODO 5
function alternaPreferit(id: number) {
  setPreferits(
    preferits.includes(id)
      ? preferits.[[1]]((x) => x !== id)
      : [[2]],
  );
}

// Capcalera.tsx · TODO 6
{preferits.length [[3]] 0 && (
  <span className={estils.globus} data-testid="globus-preferits">{preferits.length}</span>
)}

// Opinio.tsx · TODO 8
function envia(esdeveniment: React.FormEvent<HTMLFormElement>) {
  esdeveniment.[[4]]();
  const trobats: Partial<Formulari> = {};
  if (dades.titol.trim().length < 3) trobats.titol = 'Escriu el títol del llibre (mínim 3 caràcters).';
  if (dades.comentari.trim().length < 10) trobats.comentari = 'El comentari ha de tenir almenys 10 caràcters.';
  setErrors(trobats);
  if (Object.keys(trobats).length === [[5]]) {
    setEnviat(true);
    setDades(BUIT);
  }
}`,
        buits: [
          { opcions: ['[preferits]', '[]', '[CLAU]', '[setPreferits]'], correcta: '[preferits]', perque: 'Es desa cada cop que canvien els preferits.' },
          { opcions: ['filter', 'map', 'splice', 'find'], correcta: 'filter', perque: 'filter crea una llista nova sense l\'id. splice mutaria la llista.' },
          { opcions: ['[...preferits, id]', 'preferits.push(id)', '[preferits, id]', '[id]'], correcta: '[...preferits, id]', perque: 'Llista nova amb els d\'abans i l\'id. push muta i retorna un número; [preferits, id] fa un array dins d\'un array; [id] perd els altres.' },
          { opcions: ['>', '===', '<', '='], correcta: '>', perque: 'El globus surt si n\'hi ha més de zero.' },
          { opcions: ['preventDefault', 'stopPropagation', 'reset', 'submit'], correcta: 'preventDefault', perque: 'Evita que el navegador recarregui la pàgina.' },
          { opcions: ['0', '1', '-1', 'null'], correcta: '0', perque: 'Zero claus d\'error vol dir que el formulari és correcte.' },
        ],
        pista: 'Quan es desa, treure sense mutar, afegir sense mutar, més de zero, no recarregar i cap error.',
      },
    ],
    fragment: { posicio: 6, lletra: 'R' },
    missatgeFinal: 'Deu de deu en verd! La biblioteca torna a tenir llum i l\'últim mòdul és teu.',
  },
];

/** Combat final contra L'Esborrador: cada encert li treu vida. */
export const PROVA_FINAL: ProvaQuiz = {
  tipus: 'quiz',
  titol: 'L\'Esborrador · combat final',
  enunciat: 'Cada resposta correcta és un cop de codi. Cada error, un contraatac que et treu vida.',
  preguntes: [
    {
      pregunta: 'L\'Esborrador ha esborrat la carpeta dist/. Quina ordre la torna a generar?',
      opcions: ['npm run build', 'npm run dev', 'npm install', 'npm create vite@latest'],
      correcta: 0,
      perque: 'build genera la versió de producció a dist/.',
    },
    {
      pregunta: 'Vol trencar el tema fosc. On ha de viure perquè cap component s\'hagi de tocar?',
      opcions: [
        'Redefinint les variables de :root dins de @media (prefers-color-scheme: dark)',
        'Un .module.css fosc per a cada component',
        'Amb style={{ background: \'black\' }} a cada element',
        'Duplicant tots els selectors amb .fosc davant',
      ],
      correcta: 0,
      perque: 'Els components fan servir var(): canviant les variables canvia tot.',
    },
    {
      pregunta: 'Què fa aquesta línia?',
      codi: 'grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));',
      opcions: [
        'Tantes columnes de 240px com a mínim com hi càpiguen, sense media queries',
        'Exactament 240 columnes',
        'Una sola columna de 240px',
        'Columnes que s\'amaguen en mòbil',
      ],
      correcta: 0,
      perque: 'És la graella adaptativa de PratShop.',
    },
    {
      pregunta: 'L\'Esborrador entra a /admin/secret. Quina ruta l\'atura?',
      codi: '<Route path="*" element={<NoTrobada />} />',
      opcions: [
        'La de path="*": atrapa qualsevol URL que no coincideixi amb cap altra',
        'Cap: es queda la pàgina en blanc',
        'La ruta index',
        'La ruta producte/:id',
      ],
      correcta: 0,
      perque: 'L\'asterisc és la xarxa de seguretat: la 404.',
    },
    {
      pregunta: 'Què és <Outlet /> dins de la disposició?',
      opcions: [
        'El lloc on es dibuixa la pàgina filla que coincideix amb la URL',
        'Un enllaç a la pàgina anterior',
        'La pàgina 404',
        'Un component que tanca l\'aplicació',
      ],
      correcta: 0,
      perque: 'Capçalera i peu queden fixos; Outlet és el forat que canvia.',
    },
    {
      pregunta: 'Què arriba a children en aquest cas?',
      codi: '<Boto variant="secundari">Torna</Boto>',
      opcions: ['El text «Torna»', 'El text «secundari»', 'Res: children sempre és buit', 'La funció onClick'],
      correcta: 0,
      perque: 'children és el que hi ha entre l\'etiqueta d\'obrir i la de tancar.',
    },
    {
      pregunta: 'Per què escrivim setCarro([...carro, nou]) i no carro.push(nou)?',
      opcions: [
        'Perquè React compara l\'objecte i només repinta si és un array nou',
        'Perquè push és més lent',
        'Perquè push no existeix a TypeScript',
        'És igual: les dues funcionen',
      ],
      correcta: 0,
      perque: 'Regla 2: no mutis l\'estat.',
    },
    {
      pregunta: 'Quan s\'executa aquest efecte?',
      codi: `useEffect(() => {
  localStorage.setItem(CLAU, JSON.stringify(preferits));
}, [preferits]);`,
      opcions: [
        'Després de cada dibuixat en què preferits ha canviat',
        'Abans de cada dibuixat',
        'Només el primer cop',
        'Cada segon',
      ],
      correcta: 0,
      perque: 'La llista de dependències diu quan s\'ha de tornar a executar.',
    },
    {
      pregunta: 'Últim cop. Quina ordre executa les proves de Vitest de PratLlibres?',
      opcions: ['npm test', 'npm run dev', 'npm run build', 'npx vite'],
      correcta: 0,
      perque: 'npm test llança Vitest i diu quines proves passen a verd.',
    },
  ],
  pista: 'Repassa la idea clau de cada planta: build, tokens, graella, *, Outlet, children, no mutar, dependències i npm test.',
};

export const RANGS = [
  { minim: 90, nom: 'Arquitecte/a React', text: 'Has dominat les sis plantes i has esborrat L\'Esborrador. El RA1 és teu.' },
  { minim: 75, nom: 'Tech lead del front', text: 'Partida molt sòlida: domines components, estils, rutes i estat.' },
  { minim: 55, nom: 'Front-end developer', text: 'Botiga reiniciada. Repassa les plantes on has perdut més vida.' },
  { minim: 35, nom: 'Junior en pràctiques', text: 'Ho has aconseguit, però amb esforç. Torna als recursos de les plantes amb més errors.' },
  { minim: 0, nom: 'Becari/ària del DOM', text: 'Has guanyat amb molt poca vida. Torna a jugar i revisa els recursos de les sessions 1 a 6.' },
];

export const CHECKLIST = [
  'Sé crear un projecte React + TypeScript amb Vite i explicar què fa cada fitxer de l\'esquelet.',
  'Sé escriure un component que retorni JSX vàlid (className, htmlFor, un sol arrel, etiquetes tancades).',
  'Sé calcular l\'especificitat d\'un selector i fer servir tokens, Flexbox i Grid.',
  'Sé estilar un component amb un CSS Module i classes condicionals amb clsx.',
  'Sé muntar una taula de rutes amb disposició, Outlet, rutes dinàmiques i pàgina 404.',
  'Sé fer servir Link, NavLink, useParams, useNavigate i useSearchParams.',
  'Sé crear components amb props tipades, children i valors per defecte.',
  'Sé fer servir useState sense mutar l\'estat i distingir estat, props i estat derivat.',
  'Sé fer un formulari controlat amb validació i preventDefault.',
  'Sé aixecar l\'estat al pare i desar dades amb useEffect i localStorage.',
];

/** Punts: cada repte dona 100 XP; cada error en treu i cada pista també. Les ratxes donen bonus. */
export const PUNTS = {
  pany: 100,
  error: 10,
  pista: 30,
  minimPany: 30,
  integritatError: 4,
  /** XP extra per repte superat en ratxa (es multiplica per la ratxa - 1, amb màxim). */
  bonusRatxa: 10,
  bonusRatxaMaxim: 50,
  /** Cada quants reptes perfectes seguits es guanya un escut. */
  escutCada: 3,
  escutsMaxims: 2,
};

/** Correu del docent al qual s'envia l'informe. */
export const CORREU_DOCENT = 'ilopez@pratfp.com';

# PratShop · Blackout · escape room de repàs del MP 0488

Escape room en línia i gamificat per repassar les **sessions 1 a 6** del mòdul **0488 Desenvolupament d'interfícies**
(DAM2). Fet amb **Astro**. Tot el joc funciona al navegador de l'alumne.

## La història

Divendres negre a PratShop. Un sabotejador, **L'Esborrador**, ha fet un commit «delete UI» i el centre de dades s'ha
quedat a les fosques. L'alumnat forma part de la Unitat Front-end i ha de tornar la llum a les **sis plantes** de
l'edifici, una per sessió. A cada planta llegeix el manual (la teoria, amb el codi explicat fragment a fragment) i
supera els reptes. Cada planta dona un mòdul amb una lletra; amb els sis es compila l'ordre de reinici (**RENDER**) i
es puja al terrat a combatre L'Esborrador.

## Les plantes

| Planta | Sessió | Reptes |
|---|---|---|
| 1 · La sala de màquines | 1 · Entorn React + TS amb Vite | Ordres de npm · caça els 4 errors de JSX · 5 preguntes |
| 2 · El taller d'estils | 2 · CSS a React | Torre d'especificitat (amb intrusos) · completar un component amb CSS Module i clsx · completar el full global · 4 preguntes |
| 3 · El laberint de rutes | 3 · React Router | Completar la taula de rutes i l'Outlet · URL → pàgina i `useParams` · 5 preguntes |
| 4 · L'obrador | 4 · Taller PratViatges | Ordenar els passos del taller · completar el `Boto` · cada fitxer a la seva carpeta · diagnòstic d'errors |
| 5 · El cor de l'estat | 5 · Estat, esdeveniments i formularis | Endevina el resultat · caça 5 sabotatges · estat, prop o derivat · completar el carro |
| 6 · La biblioteca | 6 · Activitat guiada PratLlibres | Símptoma → TODO · completar el catàleg · completar App, Capcalera i Opinio |
| Terrat · L'Esborrador | Repàs | Ordre RENDER + combat de 9 preguntes amb barra de vida del boss |

## Gamificació

- **XP**: 100 per repte; cada error en treu 10 i cada pista 30 (mínim 30). Nivell de desenvolupador cada 400 XP.
- **Vida**: cada error en treu un 4% (no hi ha «game over»).
- **Ratxes**: reptes perfectes seguits donen XP extra i, cada 3, un **escut** que absorbeix un error.
- **16 assoliments**, estrelles per planta, edifici que s'il·lumina, boss amb vida i frases, sons i confeti.
- Sense cap compte enrere ni referència a temps.

## L'informe per al professor

Al final surt un informe amb rang, rendiment, plantes, reptes on més s'ha fallat, assoliments i una autoavaluació.
L'alumne l'envia a **ilopez@pratfp.com** amb Gmail o amb el seu programa de correu (text ja preparat), o el copia,
el descarrega en `.html` o el desa en PDF.

Cada informe porta un **codi de verificació** i un **segell**. A **`/verifica/`** el professor hi enganxa el text del
correu i comprova que les xifres no s'han tocat a mà. (Tot passa al navegador: dissuadeix retocs casuals, no és una
garantia criptogràfica.)

## Com s'executa al teu ordinador

Cal **Node.js 22 o superior**. Doble clic a `executa-escape-room.bat` (o `npm install` i `npm run dev`). S'obre a
`http://localhost:4324`.

## Com canviar el contingut

Tot el text, el codi i les respostes són a **`src/data/joc.ts`**. Als reptes de completar, cada `[[n]]` del codi és un
forat i `buits[n]` en diu les opcions i la resposta correcta. El correu del docent és `CORREU_DOCENT`.

## Publicació

Preparat per a **Cloudflare Pages**: repositori connectat, `npm run build`, carpeta `dist`, Node 22 (fitxer
`.node-version`). Cada canvi pujat al repositori es torna a publicar sol.

---

Ignasi López Aylagas · Prat FP · MP 0488 Desenvolupament d'interfícies · curs 2026-27

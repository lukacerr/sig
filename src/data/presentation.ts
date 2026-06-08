// Single source of truth for the GIS presentation.
// The deck (/, /1.../N), the speaker-notes page (/notas) and Notas.md all
// derive from this file so they never drift apart.

export const REPO_URL = "https://github.com/lukacerr/sig";
export const DOCUMENT_URL = `${REPO_URL}/blob/main/Document.pdf`;

export type PresentationIcon =
	| "users"
	| "grid"
	| "leaf"
	| "ruler"
	| "alert"
	| "target"
	| "satellite"
	| "vector"
	| "window"
	| "scissors"
	| "layers"
	| "sprout"
	| "map"
	| "drop"
	| "gear"
	| "chart"
	| "check";

export type SlideVariant =
	| "cover"
	| "split"
	| "cards"
	| "flow"
	| "formula"
	| "environments"
	| "thanks";

export type SlideTone = "green" | "lime" | "earth" | "sky";

export interface SlideImage {
	src: string;
	alt: string;
	caption?: string;
}

export interface SlideCard {
	title: string;
	description: string;
	icon: PresentationIcon;
	tag?: string;
}

export interface EnvironmentItem {
	code: string;
	name: string;
	description: string;
	/** 1 = menor vigor … 4 = mayor vigor (drives the colour ramp). */
	level: 1 | 2 | 3 | 4;
}

export interface SlideLink {
	label: string;
	href: string;
	external?: boolean;
}

/** High-level speaker note: who talks, for how long, and the ideas to cover. */
export interface SpeakerNote {
	/** Presenter number (1..6), see `integrantes`. */
	persona: number;
	seconds: number;
	points: string[];
}

export interface Slide {
	eyebrow: string;
	title: string;
	lead?: string;
	variant: SlideVariant;
	tone: SlideTone;
	team?: string[];
	image?: SlideImage;
	cards?: SlideCard[];
	flow?: { label: string; icon: PresentationIcon }[];
	formula?: {
		expr: string;
		legend: { sym: string; meaning: string }[];
	};
	environments?: EnvironmentItem[];
	stat?: { value: string; label: string };
	links?: SlideLink[];
	note: SpeakerNote;
}

/** Presenters — persona N in the notes maps to `integrantes[N - 1]`. */
export const integrantes: string[] = [
	"Cerrutti Luka",
	"Parrondo Bastos Felipe",
	"Pascual Lucas Mauricio",
	"Tisch Facundo Erwin",
	"Varela Angeles",
	"Williams Agustín",
];

export const presentationSlides: Slide[] = [
	// 1 — Portada (P1)
	{
		eyebrow: "Actividad N°5 · SIG",
		title: "Aplicación de SIG para la Agricultura de Precisión en Campo Díaz",
		lead: "Sistemas de Información Geográfica e imágenes satelitales para identificar la variabilidad dentro del lote y delimitar ambientes productivos.",
		variant: "cover",
		tone: "green",
		team: integrantes,
		image: {
			src: "/img/gis/cover.jpg",
			alt: "Cultivo de maíz visto desde el lote.",
		},
		note: {
			persona: 1,
			seconds: 15,
			points: [
				"Presentar el título del trabajo y el equipo.",
				"Anticipar la idea: SIG aplicado a la agricultura de precisión en Campo Díaz.",
			],
		},
	},

	// 2 — ¿Por qué SIG? (P1)
	{
		eyebrow: "¿Por qué SIG en Campo Díaz?",
		title: "La variabilidad espacial dentro del lote",
		lead: "Dentro de un mismo lote el cultivo no se desarrolla de forma homogénea: hay diferencias de desarrollo vegetativo entre sectores.",
		variant: "split",
		tone: "earth",
		image: {
			src: "/img/gis/aerial.jpg",
			alt: "Vista aérea del campo con un río atravesando el lote.",
			caption:
				"El lote no es uniforme: se observan diferencias entre sectores.",
		},
		cards: [
			{
				title: "Variabilidad espacial",
				description:
					"El lote presenta zonas con distinto comportamiento productivo.",
				icon: "grid",
			},
			{
				title: "Distinto desarrollo vegetativo",
				description: "El cultivo crece con diferente vigor según el sector.",
				icon: "leaf",
			},
		],
		note: {
			persona: 1,
			seconds: 40,
			points: [
				"En un mismo lote existe variabilidad espacial: el cultivo no se desarrolla igual en todos lados.",
				"Apoyarse en la imagen aérea para mostrar las diferencias entre sectores.",
				"Introducir que el SIG nos ayuda a ver y cuantificar esas diferencias.",
			],
		},
	},

	// 3 — El problema (P1)
	{
		eyebrow: "El problema",
		title: "Manejar todo el lote por igual genera pérdidas de eficiencia",
		lead: "El manejo uniforme ignora las diferencias internas del lote. Identificar ambientes productivos permite tomar mejores decisiones.",
		variant: "cards",
		tone: "green",
		image: {
			src: "/img/gis/field-001.jpg",
			alt: "Campo agrícola visto desde adentro del cultivo.",
		},
		cards: [
			{
				title: "Manejo uniforme",
				description:
					"Tratar todo el lote igual desaprovecha las zonas de mayor potencial.",
				icon: "ruler",
			},
			{
				title: "Pérdida de eficiencia",
				description:
					"Insumos mal distribuidos: de más donde no hace falta y de menos donde sí.",
				icon: "alert",
			},
			{
				title: "Identificar ambientes",
				description:
					"Reconocer zonas productivas para mejorar la toma de decisiones.",
				icon: "target",
			},
		],
		note: {
			persona: 1,
			seconds: 35,
			points: [
				"El problema central es el manejo uniforme y la pérdida de eficiencia que provoca.",
				"La meta es identificar ambientes productivos para decidir mejor.",
				"Transición: para lograrlo necesitamos ciertos datos espaciales.",
			],
		},
	},

	// 4 — Datos espaciales (P2)
	{
		eyebrow: "Datos espaciales",
		title: "Los insumos del análisis: ráster, vectoriales y software",
		lead: "El trabajo combina imágenes satelitales, capas vectoriales del lote y software SIG libre.",
		variant: "cards",
		tone: "sky",
		image: {
			src: "/img/gis/sat-wide.jpg",
			alt: "Imagen satelital de gran angular.",
		},
		cards: [
			{
				title: "Sentinel-2",
				tag: "Ráster",
				description:
					"Imágenes satelitales. Banda Roja (B4) e Infrarrojo Cercano (B8).",
				icon: "satellite",
			},
			{
				title: "Capas del lote",
				tag: "Vectorial",
				description: "Límites del lote y polígonos de trabajo.",
				icon: "vector",
			},
			{
				title: "QGIS",
				tag: "Software",
				description: "Procesamiento y análisis en un SIG de código abierto.",
				icon: "window",
			},
		],
		note: {
			persona: 2,
			seconds: 45,
			points: [
				"Tres tipos de datos: ráster, vectorial y software.",
				"Ráster: imágenes Sentinel-2; destacar B4 (Roja) y B8 (Infrarrojo Cercano), que después usaremos para el NDVI.",
				"Vectorial: límites del lote y polígonos de trabajo. Software: QGIS, libre y gratuito.",
			],
		},
	},

	// 5 — Flujo de procesamiento (P2)
	{
		eyebrow: "Procesamiento SIG",
		title: "El flujo de trabajo, paso a paso",
		lead: "Desde la imagen satelital cruda hasta las zonas de manejo del lote.",
		variant: "flow",
		tone: "green",
		image: {
			src: "/img/gis/field-000.jpg",
			alt: "Vista del lote agrícola.",
		},
		flow: [
			{ label: "Imagen Sentinel-2", icon: "satellite" },
			{ label: "Recorte del lote", icon: "scissors" },
			{ label: "Cálculo del NDVI", icon: "gear" },
			{ label: "Clasificación por ambientes", icon: "layers" },
			{ label: "Zonas de manejo", icon: "map" },
		],
		note: {
			persona: 2,
			seconds: 45,
			points: [
				"Recorrer el flujo completo: Sentinel-2 → recorte → NDVI → clasificación → zonas de manejo.",
				"Aclarar que cada paso se detalla en las próximas diapositivas.",
			],
		},
	},

	// 6 — Adquisición y recorte (P3)
	{
		eyebrow: "Adquisición y recorte",
		title: "De la escena satelital al lote de trabajo",
		lead: "Se descarga la imagen Sentinel-2 y se recorta a los límites del lote usando las capas vectoriales.",
		variant: "split",
		tone: "sky",
		image: {
			src: "/img/gis/sentinel.png",
			alt: "Imagen Sentinel-2 en falso color recortada al lote.",
			caption: "Imagen Sentinel-2 (falso color) recortada al lote.",
		},
		cards: [
			{
				title: "Composición espectral",
				description:
					"Las bandas B4 y B8 resaltan la vegetación en falso color.",
				icon: "satellite",
			},
			{
				title: "Recorte al lote",
				description: "Los polígonos vectoriales delimitan el área de análisis.",
				icon: "scissors",
			},
		],
		note: {
			persona: 3,
			seconds: 45,
			points: [
				"Mostrar la imagen Sentinel-2 en falso color.",
				"El falso color (infrarrojo) resalta la vegetación.",
				"Se recorta al límite del lote con las capas vectoriales para aislar el área de estudio.",
			],
		},
	},

	// 7 — NDVI fórmula (P3)
	{
		eyebrow: "Índice NDVI",
		title: "Cómo se calcula el NDVI",
		lead: "El NDVI combina la banda Roja (B4) y el Infrarrojo Cercano (B8). Se aplica con la calculadora ráster de QGIS.",
		variant: "formula",
		tone: "green",
		formula: {
			expr: "NDVI = (B8 − B4) / (B8 + B4)",
			legend: [
				{ sym: "B8", meaning: "Infrarrojo Cercano (NIR)" },
				{ sym: "B4", meaning: "Banda Roja" },
			],
		},
		image: {
			src: "/img/gis/ndvi-calc.png",
			alt: "Calculadora ráster de QGIS con la fórmula del NDVI.",
			caption: "Calculadora ráster de QGIS aplicando la fórmula.",
		},
		note: {
			persona: 3,
			seconds: 45,
			points: [
				"Presentar la fórmula: NDVI = (B8 − B4) / (B8 + B4).",
				"B8 es Infrarrojo Cercano y B4 la banda Roja.",
				"Se aplica con la calculadora ráster de QGIS sobre la imagen recortada; da una capa con un valor por píxel.",
			],
		},
	},

	// 8 — Interpretación NDVI (P4)
	{
		eyebrow: "Interpretación del NDVI",
		title: "Qué nos dice cada valor",
		lead: "Los valores altos indican vegetación vigorosa; los bajos, menos vegetación o suelo desnudo.",
		variant: "split",
		tone: "lime",
		image: {
			src: "/img/gis/ndvi.png",
			alt: "Mapa de NDVI del lote con escala de color.",
			caption: "Ejemplo de NDVI visualizado mediante gradiente de colores.",
		},
		cards: [
			{
				title: "Valores altos",
				description: "Vegetación vigorosa y mayor desarrollo del cultivo.",
				icon: "leaf",
			},
			{
				title: "Valores bajos",
				description: "Menos vegetación o suelo desnudo.",
				icon: "sprout",
			},
		],
		note: {
			persona: 4,
			seconds: 45,
			points: [
				"Interpretar el mapa de NDVI: altos = vegetación vigorosa, bajos = poca vegetación o suelo desnudo.",
				"Señalar el gradiente de color sobre el lote.",
				"El NDVI revela la variabilidad de forma cuantitativa.",
			],
		},
	},

	// 9 — Clasificación por ambientes (P4)
	{
		eyebrow: "Clasificación",
		title: "Del NDVI continuo a ambientes discretos",
		lead: "Se agrupan los valores de NDVI en clases para delimitar ambientes con comportamiento similar.",
		variant: "split",
		tone: "green",
		image: {
			src: "/img/gis/classes.png",
			alt: "NDVI clasificado en ambientes sobre el lote.",
			caption: "Clasificación del NDVI en ambientes.",
		},
		cards: [
			{
				title: "Agrupar zonas similares",
				description:
					"Los píxeles con NDVI parecido se reúnen en un mismo ambiente.",
				icon: "layers",
			},
			{
				title: "Cuatro ambientes",
				description:
					"El lote queda dividido en cuatro clases de productividad.",
				icon: "grid",
			},
		],
		note: {
			persona: 4,
			seconds: 45,
			points: [
				"Pasamos del NDVI continuo a clases discretas agrupando valores similares.",
				"El resultado son cuatro ambientes; apoyarse en la imagen clasificada.",
				"Transición: describir cada ambiente.",
			],
		},
	},

	// 10 — Los 4 ambientes (P5)
	{
		eyebrow: "Delimitación de ambientes",
		title: "Los cuatro ambientes del lote",
		lead: "Cada ambiente agrupa zonas con un nivel de vigor y variabilidad característico.",
		variant: "environments",
		tone: "earth",
		environments: [
			{
				code: "A1",
				name: "Menor vigor",
				description: "Menor vigor y mayor heterogeneidad.",
				level: 1,
			},
			{
				code: "A2",
				name: "Vigor intermedio",
				description: "Vigor intermedio y variabilidad moderada.",
				level: 2,
			},
			{
				code: "A3",
				name: "Desarrollo uniforme",
				description: "Desarrollo relativamente uniforme.",
				level: 3,
			},
			{
				code: "A4",
				name: "Mayor vigor",
				description: "Mayor vigor y mejor desempeño productivo.",
				level: 4,
			},
		],
		note: {
			persona: 5,
			seconds: 50,
			points: [
				"Describir los cuatro ambientes uno por uno.",
				"A1: menor vigor y más heterogéneo. A2: intermedio, variabilidad moderada.",
				"A3: desarrollo uniforme. A4: mayor vigor y mejor desempeño.",
				"Relacionar cada ambiente con su nivel de NDVI.",
			],
		},
	},

	// 11 — Mapa de zonas de manejo (P5)
	{
		eyebrow: "Zonas de manejo",
		title: "El mapa final de ambientes",
		lead: "Cada ambiente queda delineado sobre el lote, listo para un manejo diferenciado.",
		variant: "split",
		tone: "green",
		image: {
			src: "/img/gis/zones.png",
			alt: "Mapa del lote con los ambientes delineados por color.",
			caption: "Ambientes delineados sobre el lote.",
		},
		cards: [
			{
				title: "Zonas delimitadas",
				description: "Cada color representa un ambiente de manejo.",
				icon: "map",
			},
			{
				title: "Base para decidir",
				description: "El mapa orienta dónde y cómo intervenir.",
				icon: "target",
			},
		],
		note: {
			persona: 5,
			seconds: 40,
			points: [
				"Mostrar el mapa final con los ambientes delineados sobre el lote.",
				"Este es el producto del SIG y la base del manejo diferenciado.",
				"Transición: para qué sirve en la práctica.",
			],
		},
	},

	// 12 — Aplicaciones (P6)
	{
		eyebrow: "Agricultura de precisión",
		title: "Aplicaciones de los ambientes",
		lead: "Con el lote dividido en ambientes, las decisiones se vuelven específicas para cada zona.",
		variant: "cards",
		tone: "lime",
		image: {
			src: "/img/gis/field-001.jpg",
			alt: "Aplicación de insumos en el campo.",
		},
		cards: [
			{
				title: "Fertilización diferenciada",
				description: "Dosis ajustadas según el potencial de cada ambiente.",
				icon: "drop",
			},
			{
				title: "Monitoreo dirigido",
				description: "Recorridas y muestreos enfocados en zonas clave.",
				icon: "target",
			},
			{
				title: "Optimización de insumos",
				description: "Usar los recursos donde generan mayor retorno.",
				icon: "gear",
			},
			{
				title: "Sectores problemáticos",
				description: "Identificar y atender zonas de bajo desempeño.",
				icon: "alert",
			},
		],
		note: {
			persona: 6,
			seconds: 40,
			points: [
				"Enumerar las aplicaciones: fertilización diferenciada, monitoreo dirigido, optimización de insumos e identificación de sectores problemáticos.",
				"Conectar con el ahorro de insumos y la eficiencia.",
			],
		},
	},

	// 13 — Conclusiones (P6)
	{
		eyebrow: "Conclusiones",
		title: "Qué logramos con el SIG",
		lead: "Del análisis espacial a decisiones concretas que mejoran la eficiencia productiva.",
		variant: "cards",
		tone: "green",
		image: {
			src: "/img/gis/zones.png",
			alt: "Mapa final del lote con los ambientes de manejo delineados.",
		},
		cards: [
			{
				title: "Variabilidad identificada",
				description:
					"El SIG permitió detectar la variabilidad espacial del lote.",
				icon: "grid",
			},
			{
				title: "NDVI como guía",
				description: "El NDVI facilitó dividir el lote en ambientes.",
				icon: "leaf",
			},
			{
				title: "Información aplicable",
				description: "Los resultados se aplican a la agricultura de precisión.",
				icon: "map",
			},
			{
				title: "Decisiones por datos",
				description: "Decidir con datos mejora la eficiencia productiva.",
				icon: "chart",
			},
		],
		note: {
			persona: 6,
			seconds: 35,
			points: [
				"Cerrar con las conclusiones: el SIG identificó la variabilidad y el NDVI permitió dividir en ambientes.",
				"La información es aplicable a la agricultura de precisión.",
				"Decidir con datos mejora la eficiencia.",
			],
		},
	},

	// 14 — Gracias (P6)
	{
		eyebrow: "Muchas gracias",
		title: "¿Preguntas?",
		lead: "Gracias por su atención. Quedamos abiertos a sus preguntas.",
		variant: "thanks",
		tone: "green",
		stat: {
			value: "SIG + NDVI",
			label: "datos que se transforman en decisiones de manejo",
		},
		links: [
			{
				label: "Ver documento del proyecto",
				href: DOCUMENT_URL,
				external: true,
			},
		],
		note: {
			persona: 6,
			seconds: 15,
			points: [
				"Agradecer y abrir el espacio de preguntas.",
				"Mencionar que el documento del proyecto está disponible.",
			],
		},
	},
];

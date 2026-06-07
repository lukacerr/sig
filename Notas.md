# Notas del orador

Aplicación de SIG para la Agricultura de Precisión en Campo Díaz.
Notas de alto nivel: conceptos a mencionar en cada diapositiva (no es el texto exacto a leer).

Tiempo total estimado: ~9 min 0 s · 14 diapositivas · 6 integrantes.

Integrantes (persona N):
1. Cerrutti Luka
2. Parrondo Bastos Felipe
3. Pascual Lucas Mauricio
4. Tisch Facundo Erwin
5. Varela Angeles
6. Williams Agustín

---

#### Slide 1 (persona 1, 15s)

- Presentar el título del trabajo y el equipo.
- Anticipar la idea: SIG aplicado a la agricultura de precisión en Campo Díaz.

#### Slide 2 (persona 1, 40s)

- En un mismo lote existe variabilidad espacial: el cultivo no se desarrolla igual en todos lados.
- Apoyarse en la imagen aérea para mostrar las diferencias entre sectores.
- Introducir que el SIG nos ayuda a ver y cuantificar esas diferencias.

#### Slide 3 (persona 1, 35s)

- El problema central es el manejo uniforme y la pérdida de eficiencia que provoca.
- La meta es identificar ambientes productivos para decidir mejor.
- Transición: para lograrlo necesitamos ciertos datos espaciales.

#### Slide 4 (persona 2, 45s)

- Tres tipos de datos: ráster, vectorial y software.
- Ráster: imágenes Sentinel-2; destacar B4 (Roja) y B8 (Infrarrojo Cercano), que después usaremos para el NDVI.
- Vectorial: límites del lote y polígonos de trabajo. Software: QGIS, libre y gratuito.

#### Slide 5 (persona 2, 45s)

- Recorrer el flujo completo: Sentinel-2 → recorte → NDVI → clasificación → zonas de manejo.
- Aclarar que cada paso se detalla en las próximas diapositivas.

#### Slide 6 (persona 3, 45s)

- Mostrar la imagen Sentinel-2 en falso color.
- El falso color (infrarrojo) resalta la vegetación.
- Se recorta al límite del lote con las capas vectoriales para aislar el área de estudio.

#### Slide 7 (persona 3, 45s)

- Presentar la fórmula: NDVI = (B8 − B4) / (B8 + B4).
- B8 es Infrarrojo Cercano y B4 la banda Roja.
- Se aplica con la calculadora ráster de QGIS sobre la imagen recortada; da una capa con un valor por píxel.

#### Slide 8 (persona 4, 45s)

- Interpretar el mapa de NDVI: altos = vegetación vigorosa, bajos = poca vegetación o suelo desnudo.
- Señalar el gradiente de color sobre el lote.
- El NDVI revela la variabilidad de forma cuantitativa.

#### Slide 9 (persona 4, 45s)

- Pasamos del NDVI continuo a clases discretas agrupando valores similares.
- El resultado son cuatro ambientes; apoyarse en la imagen clasificada.
- Transición: describir cada ambiente.

#### Slide 10 (persona 5, 50s)

- Describir los cuatro ambientes uno por uno.
- A1: menor vigor y más heterogéneo. A2: intermedio, variabilidad moderada.
- A3: desarrollo uniforme. A4: mayor vigor y mejor desempeño.
- Relacionar cada ambiente con su nivel de NDVI.

#### Slide 11 (persona 5, 40s)

- Mostrar el mapa final con los ambientes delineados sobre el lote.
- Este es el producto del SIG y la base del manejo diferenciado.
- Transición: para qué sirve en la práctica.

#### Slide 12 (persona 6, 40s)

- Enumerar las aplicaciones: fertilización diferenciada, monitoreo dirigido, optimización de insumos e identificación de sectores problemáticos.
- Conectar con el ahorro de insumos y la eficiencia.

#### Slide 13 (persona 6, 35s)

- Cerrar con las conclusiones: el SIG identificó la variabilidad y el NDVI permitió dividir en ambientes.
- La información es aplicable a la agricultura de precisión.
- Decidir con datos mejora la eficiencia.

#### Slide 14 (persona 6, 15s)

- Agradecer y abrir el espacio de preguntas.
- Mencionar que el documento del proyecto está disponible.


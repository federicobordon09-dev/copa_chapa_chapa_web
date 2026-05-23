Actúa como un desarrollador senior frontend especializado en Next.js, UI/UX y manejo de datos complejos. Tu tarea es refactorizar y mejorar la web existente de Copa Chapa Chapa (https://copachapachapa.vercel.app/) sin romper el diseño actual, manteniendo estilos, identidad visual, colores y estructura base.

Objetivo principal:
Eliminar la separación entre las secciones “CLASIFICACION” y “PILOTOS” y reemplazarlas por una única sección/página llamada “Copa Chapa Chapa”, que centralice toda la información relevante del campeonato en un solo lugar, de forma clara, ordenada y escalable.

Requisitos funcionales:

Nueva sección única “Copa Chapa Chapa”
Debe contener:
a) Tabla del campeonato general (ordenada por puntos de mayor a menor).
b) Resultados por splits (Comodoro y Buenos Aires, Split 1 y Split 2).
c) Grilla completa de pilotos.
Mantener el mismo estilo visual que ya tiene la sección “Grilla completa”.
No romper el layout general de la web.
Eliminación de secciones duplicadas
Eliminar completamente las secciones “CLASIFICACION” y “PILOTOS”.
Toda su funcionalidad debe migrarse a la nueva sección única.
Tabla general del campeonato
Ordenar estrictamente por puntos descendente.
Incluir TODOS los pilotos, incluso los que tengan 0 puntos.
Respetar exactamente los nombres y puntos proporcionados.
Marcar visualmente pilotos con estado especial (ej: “SUSPENDIDO”).
Permitir paginación (igual a la actual).
Agregar buscador por nombre o apellido (case insensitive, tolerante a errores simples).
Resultados por fecha y splits
Mostrar claramente:
Split 2 - Comodoro
Split 1 - Comodoro
Split 2 - Buenos Aires
Split 1 - Buenos Aires
Mantener formato tipo ranking (posición + nombre + puntos).
Diseño consistente con el resto de la web.
Estos datos no deben recalcularse, deben renderizarse exactamente como se proveen.
Grilla completa de pilotos
Incluir TODOS los pilotos listados (sin excepciones).
Mostrar:
Nombre completo
Equipo
Mantener el estilo visual actual (cards/listado).
Ordenar agrupando por equipo (no en una sola celda, sino listados consecutivos).
Si un piloto no tiene equipo, mostrar “Sin equipo”.
Sistema de campeonato de equipos
Crear una nueva tabla de “Campeonato de Equipos”.
Sumar los puntos de todos los pilotos pertenecientes a cada equipo.
Normalizar nombres de equipos (ej: “Overtake Racing” y “overtake racing” deben unificarse).
Ordenar por puntos descendente.
Sistema de puntos:
Usar los mismos puntos que ya tiene cada piloto (no inventar nuevos por posición).
Es un sistema acumulativo puro (suma de puntos de pilotos).
Mostrar ranking de equipos con:
Posición
Nombre del equipo
Puntos totales
Buscador global
Debe filtrar en tiempo real:
Tabla general
Grilla de pilotos
Buscar por nombre o apellido.
No debe romper la paginación.
Paginación
Implementar paginación reutilizable (componente único).
Aplicar tanto a:
Tabla general
Grilla de pilotos
Calidad de código
Código limpio, tipado si usas TypeScript.
Componentización clara (Table, Pagination, SearchBar, etc.).
Sin lógica duplicada.
Manejo de estados consistente.
Preparado para escalar a más fechas.
Fuente de datos (OBLIGATORIO)
Usar EXACTAMENTE los siguientes datos hardcodeados (no inventar ni modificar nombres):

[ SPLIT 2 - COMODORO	SPLIT 1 - COMODORO	SPLIT 2 - BUENOS AIRES	SPLIT 1 - BUENOS AIRES	TABLA GENERAL ( 2 FECHAS )
Damian Ludueña — 25 pts	1° Fabian Gamero — 25 pts	1° Alejandro Rodriguez — 25 pts (SUSPENDIDO) 	Bruno Koller — 25 pts	Damian Ludueña — 44 pts
Brian Campos — 22 pts	2° Marcos Turri — 22 pts	2° Joaquin Gutierrez — 22 pts	Santino Casciano — 22 pts	Santino Casciano — 35 pts
Franco Perez — 19 pts	3° Bernardo Morico — 19 pts	3° Damian Ludueña — 19 pts	Matteo Viñas — 19 pts	Alejandro Rodriguez — 25 pts ( SUSPENDIDO)
Julian Varlas — 17 pts	4° Nacho Davin — 17 pts	4° Agustin Carreras — 17 pts	Franco Perez — 17 pts	Fabian Gamero — 34 pts
Fernando Ali — 15 pts	5° Agustin Rojas — 15 pts	5° Agustin Moles — 15 pts	Julian Varlas — 15 pts	Franco Perez — 36 pts
Kevin Lhuillier — 13 pts	6° Santino Casciano — 13 pts	6° Uriel Manzanelli — 13 pts	Gonzalo Alonso — 13 pts	Bruno Koller — 25 pts
Lucio Focaccia — 11 pts	7° Juan Jose Sanchez — 11 pts	7° Matias Pacheco — 11 pts	Agustin Chijanoski — 11 pts	Marcos Turri — 23 pts
Franco Guerreros — 9 pts	8° Patricio Aguerreche — 9 pts	8° Matias Cayrus Riffel — 9 pts	Fabian Gamero — 9 pts	Matteo Viñas — 20 pts
Lucas Nin — 7 pts	9° Julian Valiñas — 7 pts	9° Nico Valero — 7 pts	Agustin Savone — 7 pts	Agustin Carreras — 22 pts
Matias Pacheco — 5 pts	10° Agustin Carreras — 5 pts	10° Franco Guerreros — 5 pts	Eric Priemer — 5 pts	Julian Varlas — 32 pts
Luka Sanchez — 3 pts	11° Agustin Savone — 3 pts	11° Agustin Rojas — 3 pts	Santiago Ortiz Ocampo — 3 pts	Agustin Moles — 15 pts
Nico Valero — 1 pt	12° Matteo Viñas — 1 pt	12° Lucas Morel — 1 pt	Marcos Turri — 1 pt	Joaquin Gutierrez — 22 pts
				Resto de pilotos con puntos
				Fernando Ali — 15 pts
				Kevin Lhuillier — 13 pts
				Gonzalo Alonso — 13 pts
				Matias Pacheco — 16 pts
				Lucio Focaccia — 11 pts
				Agustin Rojas — 18 pts
				Juan Jose Sanchez — 11 pts
				Patricio Aguerreche — 9 pts
				Matias Cayrus Riffel — 9 pts
				Franco Guerreros — 14 pts
				Nico Valero — 8 pts
				Lucas Nin — 7 pts
				Agustin Savone — 10 pts
				Eric Priemer — 5 pts
				Santiago Ortiz Ocampo — 3 pts
				Luka Sanchez — 3 pts
				Nacho Davin — 17 pts
				Bernardo Morico — 19 pts
				Julian Valiñas — 7 pts
				Uriel Manzanelli — 13 pts
				Agustin Chijanoski — 11 pts
				Lucas Morel — 1 pt
                Bruno koller	Sport team
Marcos Turri	MJ Racing
Matteo Viñas	Viñas Competicion
Agustin Carreras	Bull competicion
Julian Varlas	Overtake Racing
Agustin Moles	Agustin Moles
Joaquin Gutierrez	Tres razones para abortar
Fernando Ali	Kattru’s
Kevin lhuillier 	KL
Gonzalo Alonso	overtake racing
Matias Pacheco	Seguro pero lento
Lucio Focaccia	TK
Agustin Rojas	La Mafilia
Juan Jose Sanchez	Jäger Team
Patricio Aguerreche	
Matias Cayrus Riffel	enano maldito team
Franco Guerreros	guerreros racing
Nico Valero	ADTC team
Lucas Nin	PRO CARS#1
Agustin Savone	SVN
Eric Priemer	Pañalera
Santiago Ortiz Ocampo	Panchos Racing
Luka Sanchez	Luka Sanchez TK
Nacho Davin	Tío Nacho Manzanilla
Bernardo Morico	Motorock Racing
Julian Valiñas	MJ Racing
Uriel Manzanelli	sparking team
Agustin Chijanoski	Prema Esports
Lucas Morel	CM Racing
Brian Campos	Sociedad de Fomento Vikingos
Joaquin Campolieti 	CamposRR
Maximiliano Dieringer				SIET	Ninguno
Luciano Bravo				GSW3	ninguno
Fede Landa				Petaca Racing Team	Ninguno
Nicolas Picone				Cokimbo Racing	Ninguno
Gustavo Corrales				Villaguay competiciones	Ninguno
Gonzalo Bariffuzza				BFZ Racing	Ninguno
Marcos Donner				Turdera Racing	Ninguno
Jonathan Molleker				Joni Fps	Ninguno
Luca Díaz				PREMA E-Sports	Agustin Chijanoski , Samir Monier
Nicolas Marsilio				NM Racing	Ninguno
Valentin Corts				MENDUCO	NINGUNO
Ignacio Aprikian				No Doblo	Sebastian "Deku"
Daniel Castro				Lento Pero Seguro	NINGUNO
Samir Monier				PREMA eSports	lukas diaz, agustin chijanoski
Nicolas Davin				kotorra	Ninguno
Mariano Sale				Goticas Qlonas Racing Team	Ninguno
Mateo Magri				LaTripleta	ninguno
Francisco Piccinini				Franchuke22	ninguno
Martin Diaz				APL	Damian Ludueña
Marcelo Haase				Haase motorsport	Ninguno
Manuel Camarero				pipón team	Ninguno
alejandro jara|				aleJara	Ninguno
Lucas Berti				show	Ninguno
Ramiro Grazzini				Grazzini racing	Ninguno
Matias Dowojak				Coso tim	Ninguno
Juan Ignacio Kuchen				JK Competicion	Ninguno
Julian Reynoso				Sparking Team	Uriel Manzanelli
Luciano Bogado				Overtake Racing	Julian Varlas, Gonzalo Alonso
Facundo Toledo				toledo racing	Ninguno
Alejandro Guerrero				WarriorTeam	Ninguno]

Consideraciones UX
Mantener coherencia visual total con la web actual.
Evitar sobrecargar la UI.
Separar visualmente cada bloque:
Campeonato general
Resultados por fecha
Grilla
Equipos
Scroll fluido o navegación interna si es necesario.

Resultado esperado:
Una única sección “Copa Chapa Chapa” que reemplace completamente “CLASIFICACION” y “PILOTOS”, centralizando toda la información del campeonato, con mejor organización, buscador, paginación, tabla de equipos y sin perder el diseño original.
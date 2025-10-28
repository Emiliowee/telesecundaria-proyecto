# METODOLOGÍA SCRUM APLICADA AL SISTEMA DE GESTIÓN ESCOLAR TELESECUNDARIA

## ANÁLISIS Y JUSTIFICACIÓN DE LA METODOLOGÍA UTILIZADA

### 1. INTRODUCCIÓN A LAS METODOLOGÍAS ÁGILES

En el desarrollo moderno de software, las metodologías ágiles han revolucionado la forma en que los equipos construyen aplicaciones y sistemas informáticos. Estas metodologías surgieron como respuesta a las limitaciones de los enfoques tradicionales en cascada, donde cada fase del proyecto debía completarse antes de pasar a la siguiente. Las metodologías ágiles proponen un enfoque iterativo e incremental que permite mayor flexibilidad, mejor comunicación con el cliente y entregas tempranas de valor.

El Manifiesto Ágil, publicado en 2001, estableció cuatro valores fundamentales que guían todas las metodologías ágiles:

Primero, se valoran los individuos y las interacciones por encima de los procesos y las herramientas. Esto significa que la comunicación efectiva entre los miembros del equipo es más importante que seguir procesos rígidos o utilizar herramientas complejas. En el contexto de un equipo de desarrollo de seis personas, esta filosofía es particularmente relevante, ya que permite que el equipo se adapte rápidamente a los cambios y resuelva problemas mediante la colaboración directa.

Segundo, se prefiere el software funcionando sobre la documentación exhaustiva. Aunque la documentación es importante, el objetivo principal debe ser entregar un producto que funcione y aporte valor al usuario final. Esto no significa eliminar la documentación, sino encontrar un equilibrio donde se documente lo necesario sin que esto retrase la entrega de funcionalidad.

Tercero, se favorece la colaboración con el cliente sobre la negociación contractual. En proyectos ágiles, el cliente o stakeholder participa activamente durante todo el desarrollo, proporcionando feedback constante y ajustando prioridades según las necesidades reales del negocio.

Cuarto, se valora la respuesta ante el cambio por encima de seguir un plan. Los proyectos ágiles reconocen que los requisitos pueden cambiar y que es mejor tener la capacidad de adaptarse a estos cambios que aferrarse a un plan inicial que puede volverse obsoleto.

### 2. METODOLOGÍAS ÁGILES CONSIDERADAS

Para el desarrollo del Sistema de Gestión Escolar de Telesecundaria, se realizó un análisis exhaustivo de las principales metodologías ágiles disponibles. Este análisis consideró las características específicas del proyecto, las capacidades del equipo, el tiempo disponible y las expectativas del cliente.

#### 2.1. SCRUM

Scrum es un marco de trabajo ágil que se centra en la gestión de proyectos mediante iteraciones llamadas sprints. Fue desarrollado originalmente para proyectos de desarrollo de software pero se ha expandido a otros campos. Ken Schwaber y Jeff Sutherland son considerados los creadores de Scrum tal como lo conocemos hoy.

La estructura de Scrum se basa en roles claramente definidos. El Product Owner es responsable de maximizar el valor del producto y gestionar el Product Backlog, que es la lista priorizada de todas las funcionalidades deseadas. El Scrum Master actúa como facilitador, asegurando que el equipo siga las prácticas de Scrum y removiendo impedimentos que puedan bloquear el progreso. El Equipo de Desarrollo es auto-organizado y multifuncional, responsable de entregar incrementos de producto potencialmente entregables al final de cada sprint.

Los sprints en Scrum tienen una duración fija, típicamente de una a cuatro semanas. Durante cada sprint, el equipo trabaja para completar un conjunto de elementos del Product Backlog que se comprometieron a terminar en el Sprint Planning. Al final del sprint, se realiza un Sprint Review donde se demuestra el trabajo completado a los stakeholders, seguido de una Sprint Retrospective donde el equipo reflexiona sobre su proceso y busca formas de mejorar.

Las ceremonias de Scrum proporcionan estructura y oportunidades de inspección y adaptación. El Sprint Planning marca el inicio del sprint y establece qué se va a hacer y cómo. El Daily Standup es una reunión diaria de 15 minutos donde el equipo sincroniza actividades y planifica las próximas 24 horas. El Sprint Review permite obtener feedback del cliente sobre el incremento de producto. La Sprint Retrospective facilita la mejora continua del equipo.

Los artefactos de Scrum incluyen el Product Backlog, el Sprint Backlog y el Incremento de Producto. El Product Backlog es una lista ordenada de todo lo que se necesita en el producto. El Sprint Backlog contiene los elementos del Product Backlog seleccionados para el sprint más un plan para entregarlos. El Incremento es la suma de todos los elementos del Product Backlog completados durante un sprint más los incrementos de todos los sprints anteriores.

Para el proyecto de Telesecundaria, Scrum presentaba varias ventajas significativas. El tamaño del equipo de seis personas se encuentra en el rango ideal para Scrum, que recomienda equipos de tres a nueve personas. La duración del proyecto de tres meses permitía planificar seis sprints de dos semanas, proporcionando seis oportunidades de entrega y feedback. La naturaleza modular del sistema, con ocho módulos principales claramente identificados, facilitaba la planificación de sprints con objetivos específicos y medibles.

Sin embargo, Scrum también presentaba algunos desafíos. Requiere disciplina y compromiso del equipo para seguir las prácticas correctamente. Las ceremonias regulares demandan tiempo que debe restarse del desarrollo. Necesita un Product Owner disponible y comprometido que pueda tomar decisiones rápidamente. El equipo debe tener la madurez para auto-organizarse y gestionar su propio trabajo.

#### 2.2. KANBAN

Kanban es un método de gestión del trabajo que enfatiza la entrega justo a tiempo y la limitación del trabajo en progreso. Originado en el sistema de producción de Toyota, Kanban se ha adaptado exitosamente al desarrollo de software. El principio fundamental de Kanban es visualizar el flujo de trabajo y limitar la cantidad de trabajo en progreso para identificar y resolver cuellos de botella.

El tablero Kanban es el artefacto central de esta metodología. Consiste en columnas que representan diferentes etapas del proceso de trabajo, como Por Hacer, En Progreso, En Revisión y Completado. Las tarjetas o tickets se mueven a través de estas columnas a medida que avanzan en el proceso. Cada columna puede tener un límite de trabajo en progreso, lo que evita que el equipo tome demasiadas tareas simultáneamente.

Los principios de Kanban incluyen visualizar el trabajo, limitar el trabajo en progreso, gestionar el flujo, hacer explícitas las políticas del proceso, implementar ciclos de feedback y mejorar colaborativamente. Estos principios son menos prescriptivos que Scrum, lo que proporciona mayor flexibilidad pero también menos estructura.

Una ventaja significativa de Kanban es su flexibilidad. No requiere sprints de duración fija ni ceremonias obligatorias. El trabajo puede fluir continuamente sin necesidad de planificación por iteraciones. Los cambios de prioridad se pueden acomodar más fácilmente moviendo tarjetas en el tablero. No prescribe roles específicos, lo que permite que los equipos mantengan su estructura organizativa existente.

La visualización clara del trabajo en el tablero Kanban facilita la identificación de cuellos de botella. Si muchas tareas se acumulan en una columna particular, es evidente que esa etapa del proceso necesita atención. Los límites de trabajo en progreso ayudan a mantener el enfoque y evitar la multitarea excesiva.

Para el proyecto de Telesecundaria, Kanban ofrecía ventajas en términos de simplicidad y flexibilidad. No requeriría la inversión de tiempo en ceremonias formales. Sería más fácil de implementar para un equipo sin experiencia previa en metodologías ágiles. Permitiría ajustar prioridades sin esperar al siguiente sprint.

Sin embargo, Kanban también presentaba limitaciones para este proyecto específico. La falta de sprints definidos dificultaría establecer fechas de entrega claras, algo importante en un proyecto académico con fecha límite fija. Sin ceremonias estructuradas, podría ser más difícil mantener la comunicación regular del equipo. La ausencia de roles definidos podría generar confusión sobre responsabilidades en un equipo sin experiencia previa. El cliente expresó preferencia por ver avances tangibles en intervalos regulares, algo que Kanban no garantiza de la misma manera que Scrum.

#### 2.3. SCRUMBAN

Scrumban es un enfoque híbrido que combina elementos de Scrum y Kanban. Surgió como una evolución natural cuando equipos que practicaban Scrum comenzaron a adoptar prácticas de Kanban para mejorar su flujo de trabajo. Scrumban mantiene la estructura de sprints y roles de Scrum mientras incorpora el tablero Kanban y la gestión de flujo continuo.

En Scrumban, los sprints pueden tener duración fija como en Scrum, pero el trabajo dentro del sprint se gestiona mediante un tablero Kanban con límites de trabajo en progreso. Las ceremonias de Scrum se pueden mantener pero con mayor flexibilidad. Por ejemplo, el Daily Standup puede evolucionar hacia una revisión del tablero Kanban para identificar bloqueos.

El Product Backlog se mantiene y se prioriza, pero el Sprint Planning puede ser más ligero, enfocándose en asegurar que hay suficiente trabajo preparado en lugar de planificar todo el sprint en detalle. Los límites de trabajo en progreso ayudan a mantener el flujo dentro del sprint.

Scrumban es particularmente útil para equipos de mantenimiento o soporte donde hay una mezcla de trabajo planificado e interrupciones impredecibles. También beneficia a equipos que han alcanzado madurez con Scrum y buscan optimizar su flujo de trabajo.

Para el proyecto de Telesecundaria, Scrumban presentaba un perfil interesante pero complejo. Ofrecería lo mejor de ambos mundos en teoría, combinando la estructura de Scrum con la flexibilidad de Kanban. Permitiría adaptarse si durante el proyecto se identificaban limitaciones de Scrum puro. Podría facilitar la transición si el proyecto continuara después de la fase inicial.

Sin embargo, Scrumban requeriría que el equipo comprendiera tanto Scrum como Kanban antes de poder implementar el híbrido efectivamente. Para un equipo sin experiencia previa en metodologías ágiles, comenzar con un enfoque híbrido añadiría complejidad innecesaria. La combinación de prácticas podría resultar confusa inicialmente. Existe el riesgo de implementar mal ambas metodologías en lugar de obtener los beneficios de cada una.

### 3. JUSTIFICACIÓN DE LA SELECCIÓN DE SCRUM

Después de analizar las tres metodologías principales, se determinó que Scrum era la opción más adecuada para el desarrollo del Sistema de Gestión Escolar de Telesecundaria. Esta decisión se basó en múltiples factores específicos del proyecto, del equipo y del contexto.

#### 3.1. TAMAÑO Y COMPOSICIÓN DEL EQUIPO

El equipo de desarrollo consta de seis personas, lo cual se encuentra exactamente en el punto medio del rango recomendado por Scrum de tres a nueve miembros. Este tamaño de equipo es considerado óptimo porque es suficientemente grande para tener diversidad de habilidades y capacidad de trabajo, pero suficientemente pequeño para mantener una comunicación efectiva sin necesidad de estructuras jerárquicas complejas.

Con seis personas, es posible asignar roles específicos sin sobrecargar a ningún miembro del equipo. Un miembro puede actuar como Product Owner, dedicando tiempo a interactuar con stakeholders y gestionar el Product Backlog. Otro miembro puede servir como Scrum Master, facilitando las ceremonias y ayudando a resolver impedimentos. Los cuatro miembros restantes forman el Equipo de Desarrollo, una cantidad adecuada para abordar el trabajo técnico del proyecto.

La diversidad de roles dentro del equipo también se alinea bien con Scrum. Hay dos desarrolladores frontend especializados en React y Tailwind CSS, un desarrollador backend enfocado en PHP y APIs, y un desarrollador full-stack con experiencia en base de datos MySQL. Esta distribución permite que cada sprint pueda avanzar en múltiples frentes simultáneamente: mientras los frontend developers trabajan en los componentes de usuario, el backend developer puede construir las APIs necesarias, y el desarrollador de base de datos puede optimizar queries y mantener la integridad referencial.

Scrum promueve equipos multifuncionales y auto-organizados. Un equipo de seis personas es lo suficientemente pequeño para que la auto-organización sea práctica. Todos los miembros pueden participar activamente en las decisiones del equipo. Las reuniones Daily Standup de 15 minutos son manejables con seis personas, cada una compartiendo sus actualizaciones sin que la reunión se extienda excesivamente.

En contraste, Kanban no prescribe un tamaño de equipo específico, pero funciona mejor con equipos más pequeños o individuos trabajando en flujo continuo. Para un equipo de seis personas con roles diversos, la estructura de Scrum proporciona mejor coordinación. Scrumban añadiría complejidad sin beneficios claros para este tamaño de equipo.

#### 3.2. DURACIÓN Y NATURALEZA DEL PROYECTO

El proyecto tiene una duración definida de tres meses, desde octubre hasta diciembre de 2025. Esta duración es ideal para implementar Scrum con seis sprints de dos semanas cada uno. Los sprints de dos semanas son considerados la duración óptima en la mayoría de los contextos porque son lo suficientemente largos para completar trabajo significativo pero lo suficientemente cortos para mantener la agilidad y responder a cambios.

La fecha de finalización fija del proyecto es importante en un contexto académico donde hay plazos de entrega establecidos. Scrum, con sus sprints de duración fija, permite planificar hacia atrás desde la fecha de entrega final. Sabiendo que hay 13 semanas disponibles, se pueden planificar seis sprints de desarrollo más una semana inicial de setup. Cada sprint tiene objetivos claros y medibles, y al finalizar cada uno, hay un incremento de producto potencialmente entregable.

Esta estructura temporal proporciona seis puntos de inspección y adaptación a lo largo del proyecto. Cada dos semanas, en el Sprint Review, el equipo puede demostrar el progreso al cliente y recibir feedback. Si el feedback indica que algo no cumple las expectativas, hay tiempo para ajustar en los sprints siguientes. Esta capacidad de corrección de curso es crucial en proyectos donde los requisitos pueden no estar completamente claros al inicio.

El proyecto tiene una naturaleza de producto bien definido con un alcance relativamente claro. Se necesita un sistema con ocho módulos principales: usuarios, maestros, alumnos, aulas, materias, materiales, préstamos y calificaciones. Esta claridad en los módulos facilita la planificación de sprints. Cada sprint puede enfocarse en completar uno o dos módulos completos, resultando en entregas coherentes y funcionales.

Kanban, al no tener sprints definidos, sería menos adecuado para gestionar este proyecto con fecha límite fija. Aunque el trabajo fluiría continuamente, sería más difícil garantizar que todo el alcance se complete a tiempo. Sin puntos de inspección regulares, podría descubrirse tarde que el proyecto va retrasado. La falta de estructura temporal haría más difícil comunicar progreso a stakeholders académicos que esperan hitos claros.

#### 3.3. CLARIDAD DE REQUISITOS Y MÓDULOS

El Sistema de Gestión Escolar de Telesecundaria tiene requisitos relativamente bien definidos desde el inicio. Aunque siempre hay detalles que se clarifican durante el desarrollo, la estructura general del sistema es clara. Se necesitan funcionalidades CRUD para múltiples entidades, un sistema de autenticación con diferentes roles, reportes académicos y un dashboard personalizado.

Esta claridad inicial de requisitos favorece a Scrum sobre Kanban. En Scrum, el Product Owner puede crear un Product Backlog inicial completo al inicio del proyecto, listando todas las User Stories necesarias. Durante el Sprint Planning, el equipo puede seleccionar las historias más prioritarias y planificar cómo implementarlas. Esta planificación estructurada es posible porque se conoce el alcance general del proyecto.

Los ocho módulos del sistema representan unidades de trabajo naturales que se alinean perfectamente con la estructura de sprints de Scrum. Cada módulo requiere aproximadamente el mismo esfuerzo: diseño de base de datos, endpoints de API backend, componentes de UI frontend y pruebas de integración. Un sprint de dos semanas es el tiempo adecuado para que el equipo complete uno o dos módulos, dependiendo de la complejidad.

La existencia de módulos bien definidos también facilita la definición de "Definition of Done" para cada User Story. El equipo puede establecer criterios claros: para considerar un módulo completo, debe tener todos sus endpoints de API implementados y probados, todos los componentes de UI funcionando, validaciones en frontend y backend, y la funcionalidad demostrable. Estos criterios claros son más fáciles de mantener en Scrum que en Kanban.

Además, la interrelación entre módulos beneficia de la planificación de sprint de Scrum. Por ejemplo, el módulo de préstamos depende de los módulos de alumnos y materiales. Con Scrum, se puede planificar que alumnos y materiales se completen en sprints anteriores, asegurando que las dependencias estén resueltas cuando se trabaje en préstamos. Esta planificación de dependencias es más natural en Scrum que en Kanban.

#### 3.4. NECESIDAD DE FEEDBACK REGULAR DEL CLIENTE

El cliente del proyecto, que representa a la administración de la telesecundaria, expresó desde el inicio la necesidad de ver progreso regular y tangible. En un contexto educativo, donde el sistema gestionará información sensible de estudiantes y operaciones críticas de la escuela, es fundamental que el cliente pueda validar que el sistema cumple sus expectativas antes de la entrega final.

Scrum, con su ceremonia de Sprint Review al final de cada sprint, proporciona exactamente este mecanismo de feedback regular. Cada dos semanas, el equipo demuestra al cliente el incremento de producto completado. El cliente puede ver el sistema funcionando, probar las nuevas funcionalidades y proporcionar feedback inmediato. Este ciclo de feedback rápido minimiza el riesgo de construir algo que no cumple las necesidades del cliente.

Durante los Sprint Reviews, el cliente puede pedir ajustes o cambios de prioridad basados en lo que ve. Por ejemplo, después de ver el módulo de usuarios en el primer sprint, el cliente podría solicitar validación adicional de contraseñas seguras. Como esta petición llega temprano en el proyecto, hay tiempo para implementarla sin afectar significativamente el cronograma. Si el proyecto siguiera un enfoque en cascada, este feedback llegaría demasiado tarde para incorporarlo sin retrasos significativos.

La presencia del Product Owner como intermediario entre el cliente y el Equipo de Desarrollo también facilita la comunicación. El Product Owner puede filtrar y priorizar las peticiones del cliente, asegurando que el equipo trabaje siempre en lo más importante. Puede explicar al cliente las implicaciones técnicas de ciertos cambios y negociar compromisos cuando sea necesario.

Kanban, sin ceremonias formales de revisión, dependería de que el cliente o el equipo iniciaran revisiones ad hoc. Esto podría resultar en periodos largos sin feedback, aumentando el riesgo de desalineación entre lo que se está construyendo y lo que el cliente necesita. Sin la disciplina de revisiones programadas regularmente, es fácil que todos se enfoquen en el desarrollo y pospongan las demostraciones al cliente.

#### 3.5. EXPERIENCIA Y MADUREZ DEL EQUIPO

Un factor crítico en la selección de metodología fue el nivel de experiencia del equipo con metodologías ágiles. En este caso, el equipo no tiene experiencia previa significativa con ninguna metodología ágil. Los miembros del equipo son estudiantes o recién graduados en un contexto académico que tradicionalmente ha enfatizado enfoques más tradicionales de desarrollo de software.

Para un equipo sin experiencia ágil, Scrum ofrece ventajas significativas debido a su naturaleza prescriptiva. Scrum define exactamente qué roles existen, qué ceremonias se deben realizar, cuándo se realizan y cómo se realizan. Esta prescriptividad proporciona una estructura clara que el equipo puede seguir. No tienen que inventar su propio proceso; pueden implementar Scrum según está descrito en la Guía de Scrum y numerosos recursos disponibles.

Los roles claramente definidos de Scrum ayudan al equipo a entender responsabilidades individuales. Cada miembro sabe si es parte del Equipo de Desarrollo, si es el Product Owner o si es el Scrum Master. Esta claridad reduce la ambigüedad y los conflictos potenciales sobre quién debe hacer qué. En contraste, Kanban no prescribe roles, dejando al equipo definir su propia estructura, lo cual puede ser desafiante para equipos sin experiencia.

Las ceremonias de Scrum proporcionan puntos de contacto regulares que mantienen al equipo sincronizado. El Daily Standup asegura que todos saben en qué están trabajando los demás cada día. El Sprint Planning alinea al equipo al inicio de cada sprint. El Sprint Review proporciona un objetivo claro para cada sprint. La Sprint Retrospective crea un espacio explícito para la mejora del proceso. Sin estas ceremonias estructuradas, un equipo inexperto podría caer en patrones de trabajo individuales descoordinados.

Scrum también es ampliamente documentado y tiene una gran comunidad de práctica. Hay innumerables libros, artículos, videos y cursos sobre Scrum. Si el equipo encuentra dificultades o tiene preguntas, pueden encontrar fácilmente recursos y orientación. Esta abundancia de material educativo facilita el aprendizaje y la adopción.

El aspecto educativo del proyecto también favorece a Scrum. Uno de los objetivos implícitos de un proyecto académico es que los estudiantes aprendan prácticas profesionales. Scrum es la metodología ágil más popular en la industria. Aprender Scrum durante el proyecto proporciona al equipo habilidades valiosas para sus futuras carreras. Empleadores buscan activamente desarrolladores con experiencia en Scrum.

#### 3.6. ESTRUCTURA Y DISCIPLINA NECESARIAS

El contexto académico del proyecto requiere cierto nivel de estructura y disciplina. El equipo necesita demostrar a evaluadores académicos que siguieron una metodología rigurosa y profesional. Necesitan documentar su proceso y sus decisiones. Necesitan mostrar que planificaron el trabajo, gestionaron riesgos y entregaron resultados medibles.

Scrum proporciona esta estructura de manera natural. Los artefactos de Scrum - Product Backlog, Sprint Backlog, Burndown Charts - sirven como documentación del proceso. Los Sprint Reviews pueden ser documentados con actas que muestran qué se demostró y qué feedback se recibió. Las Sprint Retrospectives pueden documentarse con planes de acción de mejora. Esta documentación es valiosa no solo para el proyecto en sí, sino también para la evaluación académica.

Las ceremonias regulares de Scrum imponen disciplina al equipo. Saben que deben tener algo demostrable al final de cada sprint. No pueden posponer indefinidamente el enfrentarse a problemas técnicos difíciles porque cada sprint tiene un plazo fijo. El Daily Standup crea accountability diaria; cada miembro debe poder compartir en qué trabajó y en qué trabajará.

El concepto de Definition of Done en Scrum también impone disciplina de calidad. El equipo debe definir explícitamente qué significa que una User Story esté "terminada". Esto típicamente incluye que el código esté escrito, revisado, probado, integrado y documentado. Sin una Definition of Done clara, los equipos tienden a dejar trabajo "casi terminado" que nunca llega a estar realmente completo. Scrum fuerza al equipo a completar trabajo completamente antes de considerarlo hecho.

La estructura de sprints time-boxed también ayuda al equipo a gestionar su tiempo efectivamente. Saben que tienen dos semanas para completar las User Stories comprometidas. No pueden expandir indefinidamente el tiempo si encuentran dificultades; deben encontrar soluciones o re-negociar el alcance del sprint. Esta presión temporal, aunque a veces estresante, enseña al equipo a estimar más efectivamente y a enfocarse en lo esencial.

Kanban, siendo menos prescriptivo, requiere más auto-disciplina del equipo. Sin sprints de duración fija, es más fácil que el trabajo se extienda indefinidamente. Sin ceremonias obligatorias, es más fácil posponer reuniones cuando parece que hay trabajo más urgente. Para un equipo sin experiencia, esta flexibilidad puede convertirse en falta de estructura.

### 4. IMPLEMENTACIÓN DE SCRUM EN EL PROYECTO

Una vez seleccionado Scrum como la metodología apropiada, el siguiente paso fue planificar su implementación específica para este proyecto. Esta sección detalla cómo se adaptó Scrum a las características particulares del Sistema de Gestión Escolar de Telesecundaria.

#### 4.1. DEFINICIÓN DE ROLES

La correcta asignación de roles es fundamental para el éxito de Scrum. En este proyecto, los seis miembros del equipo se distribuyeron en los tres roles principales de Scrum, considerando las habilidades, experiencias e intereses de cada persona.

El rol de Product Owner fue asignado a un miembro del equipo con fuerte capacidad de comunicación y comprensión del dominio educativo. El Product Owner es responsable de maximizar el valor del producto resultante del trabajo del Equipo de Desarrollo. Esto implica gestionar efectivamente el Product Backlog, lo que incluye expresar claramente los elementos del Product Backlog, ordenar los elementos para lograr mejor los objetivos y misiones, optimizar el valor del trabajo que realiza el Equipo de Desarrollo, y asegurar que el Product Backlog sea visible, transparente y claro para todos.

En este proyecto específico, el Product Owner actúa como el puente principal entre los stakeholders de la telesecundaria y el equipo técnico. Debe comprender las necesidades operativas de la escuela, traducirlas en User Stories técnicas comprensibles para los desarrolladores, y validar que las implementaciones realmente resuelven los problemas del negocio. Debe ser capaz de priorizar funcionalidades basándose en el valor que aportan a la institución educativa.

El Product Owner dedica aproximadamente 10 horas semanales al proyecto. Durante la primera parte de cada sprint, trabaja en refinar el Product Backlog para sprints futuros, asegurando que las User Stories estén bien escritas con criterios de aceptación claros. A mediados del sprint, revisa el progreso con el equipo y clarifica cualquier duda sobre requisitos. Al final del sprint, facilita el Sprint Review donde se demuestra el incremento a los stakeholders.

El rol de Scrum Master fue asignado a un miembro con habilidades de liderazgo servil y pasión por los procesos. El Scrum Master es responsable de promover y soportar Scrum. Lo hace ayudando a todos a entender la teoría, prácticas, reglas y valores de Scrum. El Scrum Master es un líder servil del Equipo Scrum, ayudando a las personas externas al equipo a entender qué interacciones con el equipo son útiles y cuáles no.

En este proyecto, el Scrum Master tiene múltiples responsabilidades específicas. Facilita todas las ceremonias de Scrum: agenda y modera el Sprint Planning, asegura que el Daily Standup sea eficiente, organiza el Sprint Review y conduce la Sprint Retrospective. Ayuda al equipo a mantener su Definition of Done y asegura que no se acepte trabajo que no cumpla con estos estándares. Remueve impedimentos que bloquean al equipo, ya sean técnicos, organizacionales o interpersonales.

El Scrum Master también educa al equipo sobre Scrum y prácticas ágiles. Como el equipo no tiene experiencia previa con Scrum, el Scrum Master toma tiempo para explicar la razón detrás de cada práctica. Cuando surgen situaciones que requieren adaptación de Scrum, el Scrum Master guía al equipo en cómo adaptar sin perder la esencia de la metodología. Dedica aproximadamente 10 horas semanales al rol.

El Equipo de Desarrollo está compuesto por los cuatro miembros restantes. Los Equipos de Desarrollo son multifuncionales, con todas las habilidades necesarias para crear un incremento de producto. Son auto-organizados, nadie les dice cómo convertir el Product Backlog en incrementos de funcionalidad potencialmente desplegable. En Scrum no se reconocen sub-equipos en el Equipo de Desarrollo, sin importar los dominios que necesiten abordarse como pruebas, arquitectura, operaciones o análisis de negocio.

En este proyecto, aunque el Equipo de Desarrollo es pequeño con solo cuatro personas, tiene toda la funcionalidad cruzada necesaria. Dos miembros se especializan en desarrollo frontend con React, uno en desarrollo backend con PHP, y uno tiene habilidades full-stack con énfasis en base de datos. Sin embargo, es importante notar que estas especializaciones son preferencias, no restricciones absolutas. El equipo es animado a ayudarse mutuamente y aprender fuera de sus áreas de especialización.

La auto-organización significa que el Equipo de Desarrollo decide cómo dividir el trabajo entre sus miembros. Durante el Sprint Planning, después de seleccionar las User Stories para el sprint, el equipo descompone estas historias en tareas técnicas. Luego, los miembros voluntariamente toman tareas basándose en sus habilidades e intereses. No hay un líder técnico asignando trabajo; el equipo colectivamente decide quién hace qué.

Cada miembro del Equipo de Desarrollo dedica aproximadamente 20 horas semanales al proyecto. Esta dedicación parcial es típica en contextos académicos donde los estudiantes tienen múltiples responsabilidades. El equipo ha acordado que estas 20 horas semanales son su capacidad comprometida y basan sus estimaciones y compromisos de sprint en esta capacidad.

#### 4.2. PLANIFICACIÓN DE SPRINTS

El proyecto se estructuró en seis sprints de dos semanas cada uno, precedidos por un Sprint 0 de una semana de duración. Esta estructura fue cuidadosamente planificada para maximizar el valor entregado mientras se respetaba el cronograma académico de tres meses.

El Sprint 0, también llamado Sprint de Setup, tuvo una duración de una semana en lugar de dos. Este sprint no es estrictamente parte de Scrum tradicional, pero es una práctica común cuando un proyecto está iniciando desde cero. El objetivo del Sprint 0 es preparar el entorno y la infraestructura necesaria para que los sprints posteriores puedan enfocarse en construir funcionalidad.

Durante el Sprint 0, el equipo realizó múltiples actividades de preparación. Primero, se configuraron los entornos de desarrollo en las máquinas de todos los miembros del equipo. Esto incluyó instalar Node.js y npm para el desarrollo frontend, XAMPP para el stack PHP y MySQL del backend, y Visual Studio Code como el IDE compartido. Se establecieron convenciones de configuración para asegurar que todos tuvieran entornos consistentes.

El equipo también creó el repositorio Git y estableció la estrategia de branching. Se decidió usar Git Flow como modelo de branching, con una rama main para código de producción, una rama develop para integración, y ramas feature para cada nueva funcionalidad. Se configuraron reglas para proteger las ramas principales y requerir pull requests con revisión antes de merge.

La base de datos inicial se diseñó durante el Sprint 0. Aunque se sabía que el esquema evolucionaría durante el proyecto, se creó un diseño inicial con las tablas principales y sus relaciones. Este esquema se implementó en MySQL y se creó un script SQL de inicialización que todos los miembros del equipo pudieron ejecutar para tener una base de datos local consistente.

La estructura del proyecto frontend y backend también se estableció durante el Sprint 0. Para el frontend, se creó el proyecto React con Vite, se configuró Tailwind CSS, se instalaron dependencias necesarias como React Router y Axios, y se estableció la estructura de carpetas para componentes, páginas, servicios y contextos. Para el backend, se creó la estructura de carpetas para APIs, configuración y utilidades, y se implementaron funciones helper básicas para manejo de base de datos y respuestas JSON.

El Product Owner utilizó el Sprint 0 para crear el Product Backlog inicial. Trabajando con los stakeholders de la telesecundaria, identificó todos los módulos y funcionalidades necesarias. Estas se expresaron como User Stories en el formato estándar "Como [tipo de usuario], quiero [acción], para [beneficio]". Las User Stories se priorizaron basándose en el valor de negocio y las dependencias técnicas.

Los seis sprints de desarrollo subsiguientes siguieron un patrón consistente de dos semanas cada uno. La primera semana de octubre se dedicó al Sprint 0. Los sprints 1 a 6 ocuparon octubre completo, todo noviembre y la primera mitad de diciembre, dejando la segunda mitad de diciembre para correcciones finales, documentación y preparación de la presentación final.

Cada sprint de dos semanas comenzaba un lunes con Sprint Planning y terminaba un viernes con Sprint Review y Retrospective. Esta consistencia en el calendario ayudaba al equipo a establecer un ritmo. Los stakeholders sabían que cada dos semanas, específicamente cada segundo viernes, habría una demostración del progreso.

La duración de dos semanas para cada sprint fue seleccionada cuidadosamente. Sprints más cortos, de una semana, habrían resultado en demasiado overhead de ceremonias y menos tiempo para desarrollo real. Con solo 20 horas de disponibilidad semanal por desarrollador, un sprint de una semana apenas daría tiempo para completar User Stories significativas. Sprints más largos, de tres o cuatro semanas, reducirían la frecuencia de feedback y harían más difícil responder a cambios.

Con sprints de dos semanas, el equipo tiene suficiente tiempo para completar múltiples User Stories relacionadas, construir funcionalidades completas y probadas, e integrar el trabajo de todos los miembros del equipo. El overhead de ceremonias es razonable, representando aproximadamente 10-15% del tiempo total del sprint, lo cual es aceptable para los beneficios de coordinación que proporcionan.

La planificación inicial de los seis sprints estableció objetivos de alto nivel para cada uno, aunque con la flexibilidad de ajustar basándose en velocidad real y feedback. El Sprint 1 se enfocaría en autenticación y estructura base del sistema. El Sprint 2 abordaría gestión de usuarios y maestros. El Sprint 3 cubriría alumnos, aulas y materias. El Sprint 4 se dedicaría a materiales y préstamos. El Sprint 5 implementaría calificaciones y reportes. El Sprint 6 sería para el dashboard dinámico, refinamiento general y corrección de bugs.

Esta planificación de sprints consideró dependencias técnicas entre módulos. Por ejemplo, el módulo de préstamos depende de alumnos y materiales, por lo que estos últimos se planificaron para completarse en sprints anteriores. El dashboard dinámico se dejó para el último sprint porque necesita datos de todos los otros módulos para mostrar estadísticas útiles.

#### 4.3. CEREMONIAS Y SU IMPLEMENTACIÓN

Las ceremonias de Scrum son eventos formales y prescriptivos que proporcionan estructura y oportunidades regulares para inspección y adaptación. En este proyecto, cada ceremonia fue implementada con consideración cuidadosa de su propósito y mejores prácticas.

El Sprint Planning marca el inicio de cada sprint y establece el trabajo que se realizará durante el sprint. En este proyecto, el Sprint Planning se realiza el primer lunes de cada sprint y tiene una duración de dos horas, divididas en dos partes de aproximadamente una hora cada una.

En la primera parte del Sprint Planning, el Product Owner presenta las User Stories de mayor prioridad del Product Backlog. Explica cada historia, su valor de negocio, los criterios de aceptación y cualquier detalle técnico relevante. El Equipo de Desarrollo puede hacer preguntas para clarificar requisitos. El Product Owner puede ajustar prioridades basándose en el feedback técnico del equipo sobre dependencias o complejidad.

El equipo discute cuánto trabajo puede comprometerse a completar durante el sprint. Esta decisión se basa en la velocidad histórica, que es el promedio de story points completados en sprints anteriores, y la capacidad disponible del equipo para este sprint específico. Si algún miembro del equipo tiene compromisos que reducen su disponibilidad durante el sprint, esto se considera en la planificación.

Una vez que el equipo ha seleccionado las User Stories para el sprint, se crea el Sprint Goal, que es un objetivo que proporciona orientación al Equipo de Desarrollo sobre por qué están construyendo el incremento. Por ejemplo, el Sprint Goal del primer sprint podría ser "Los usuarios pueden autenticarse en el sistema y ver un dashboard básico". Este objetivo es más abstracto que las User Stories individuales y ayuda al equipo a mantener el enfoque en lo esencial.

La segunda parte del Sprint Planning es más técnica. El Equipo de Desarrollo descompone las User Stories seleccionadas en tareas técnicas específicas. Por ejemplo, una User Story "Como director, quiero ver la lista de todos los usuarios" se descompone en tareas como "Crear endpoint GET /api/usuarios/list.php", "Implementar componente React UsersListado", "Crear servicio Axios para usuarios", "Implementar diseño de tabla con Tailwind", etc.

Estas tareas se estiman en horas de esfuerzo. Aunque Scrum no prescribe estimación en horas para tareas, el equipo encontró útil esta práctica para entender mejor la carga de trabajo. Las estimaciones son siempre realizadas por quien probablemente ejecutará la tarea, no impuestas externamente. Si una tarea parece requerir más de 8 horas, típicamente se subdivide en tareas más pequeñas.

Al final del Sprint Planning, el equipo tiene un Sprint Backlog claro: las User Stories comprometidas, el Sprint Goal y todas las tareas técnicas identificadas. Este Sprint Backlog es el plan del equipo para el sprint. Aunque puede ajustarse durante el sprint si se descubre trabajo adicional necesario, el conjunto de User Stories generalmente permanece fijo.

El Daily Standup, también llamado Daily Scrum, es una reunión diaria de 15 minutos para que el Equipo de Desarrollo sincronice actividades y cree un plan para las próximas 24 horas. En este proyecto, el Daily Standup se realiza cada mañana a las 9:00 AM, aprovechando que es un horario donde típicamente todos están disponibles.

La reunión siempre se realiza en el mismo lugar (virtual, dado el contexto actual) y a la misma hora para crear un hábito. El Scrum Master facilita la reunión, asegurando que comience a tiempo y no se extienda más allá de los 15 minutos. Cada miembro del Equipo de Desarrollo, uno por uno, responde tres preguntas: ¿Qué hice ayer que ayudó al Equipo de Desarrollo a cumplir el Sprint Goal? ¿Qué haré hoy para ayudar al Equipo de Desarrollo a cumplir el Sprint Goal? ¿Veo algún impedimento que evite que el Equipo de Desarrollo o yo cumplamos el Sprint Goal?

Es importante notar que el Daily Standup no es una reunión de reporte de estado al Scrum Master o al Product Owner. Es una reunión del Equipo de Desarrollo para el Equipo de Desarrollo. El objetivo es que todos sepan en qué están trabajando los demás, identifiquen oportunidades de colaboración y detecten problemas tempranamente. Si alguien menciona un impedimento, no se resuelve durante el Daily Standup; el Scrum Master lo anota y trabaja en resolverlo después de la reunión.

Para mantener el Daily Standup enfocado y breve, el equipo estableció algunas reglas. Primero, solo respuestas directas a las tres preguntas; discusiones técnicas detalladas se posponen para después. Segundo, se usa un timer visible; cuando se acerca a 15 minutos, el Scrum Master pide que las respuestas restantes sean más breves. Tercero, todos permanecen "de pie" (metafóricamente en reuniones virtuales) para mantener la energía y desincentivar que la reunión se extienda.

El Sprint Review se realiza al final del sprint para inspeccionar el incremento y adaptar el Product Backlog si es necesario. En este proyecto, el Sprint Review se agenda para el viernes al final del sprint, con duración de una hora. Los asistentes incluyen el Equipo Scrum completo y los stakeholders de la telesecundaria.

El Product Owner abre la reunión explicando qué User Stories del Product Backlog se han completado durante el sprint y cuáles no. Esto establece expectativas claras sobre qué se demostrará. Luego, el Equipo de Desarrollo demuestra el incremento funcionando. Es crucial que la demostración sea del software real funcionando, no presentaciones de PowerPoint o mockups.

Durante la demostración, se anima a los stakeholders a hacer preguntas y proporcionar feedback. Pueden probar ellos mismos las funcionalidades si lo desean. El Product Owner toma notas de todo el feedback recibido. Algunas retroalimentaciones pueden resultar en ajustes menores que se añaden al Product Backlog. Otras pueden cambiar prioridades significativamente.

Después de la demostración, el Product Owner revisa el estado del Product Backlog. Explica qué se ha completado, qué permanece y cómo el feedback recibido podría afectar el plan. Discute fechas probables de completitud basándose en el progreso hasta ahora. El equipo discute qué salió bien durante el sprint, qué problemas encontró y cómo resolvió esos problemas.

Al final del Sprint Review, el Product Backlog está actualizado con nuevas User Stories o cambios basados en el feedback. Las prioridades pueden haberse ajustado. Todos los asistentes tienen una comprensión compartida del estado del proyecto y hacia dónde va.

La Sprint Retrospective se realiza después del Sprint Review pero antes del Sprint Planning del siguiente sprint. En este proyecto, se agenda para el mismo viernes del Sprint Review, después de un breve descanso. Tiene duración de una hora. Solo el Equipo Scrum participa; stakeholders externos no están presentes.

El propósito de la Sprint Retrospective es que el Equipo Scrum inspeccione cómo fue el último sprint en cuanto a personas, relaciones, procesos y herramientas. Identifica y ordena los elementos más importantes que salieron bien y las posibles mejoras, y crea un plan para implementar mejoras en la forma en que el Equipo Scrum hace su trabajo.

El Scrum Master facilita la retrospectiva usando diferentes formatos cada sprint para mantenerla fresca e interesante. Un formato común es Start-Stop-Continue: ¿Qué deberíamos empezar a hacer que no estamos haciendo? ¿Qué deberíamos dejar de hacer que está perjudicando? ¿Qué deberíamos continuar haciendo porque está funcionando bien?

Cada miembro del equipo contribuye ideas en cada categoría. Las ideas se discuten abiertamente. No se trata de culpar sino de mejorar. Después de identificar múltiples posibles mejoras, el equipo vota para seleccionar las dos o tres más importantes. Para estas mejoras seleccionadas, el equipo crea acciones concretas con responsables. Estas acciones se revisan en la retrospectiva del siguiente sprint.

Un aspecto crítico de la retrospectiva es crear un ambiente de seguridad psicológica donde todos se sientan cómodos compartiendo problemas honestos. El Scrum Master establece el tono recordando que el propósito es mejorar, no criticar. Se usa la "Retrospective Prime Directive": "Independientemente de lo que descubramos, entendemos y creemos verdaderamente que todos hicieron el mejor trabajo que pudieron, dado lo que sabían en el momento, sus habilidades y capacidades, los recursos disponibles y la situación en cuestión".

### 5. ARTEFACTOS DE SCRUM EN EL PROYECTO

Scrum define tres artefactos principales que representan trabajo o valor y están diseñados para maximizar la transparencia de la información clave. En este proyecto, cada artefacto fue mantenido y utilizado según su propósito definido.

#### 5.1. PRODUCT BACKLOG

El Product Backlog es una lista ordenada de todo lo que se conoce que es necesario en el producto. Es la única fuente de requisitos para cualquier cambio a realizarse en el producto. El Product Owner es responsable del Product Backlog, incluyendo su contenido, disponibilidad y ordenamiento.

Para el Sistema de Gestión Escolar de Telesecundaria, el Product Backlog inicial se creó durante el Sprint 0 y contenía aproximadamente 60 User Stories. Estas historias cubrían todos los módulos identificados: autenticación, usuarios, maestros, alumnos, aulas, materias, materiales, préstamos, calificaciones y dashboard.

Cada User Story en el Product Backlog sigue un formato estándar que incluye:
- Un título descriptivo
- La historia en formato "Como [tipo de usuario], quiero [acción], para [beneficio]"
- Criterios de aceptación específicos y testeables
- Estimación en story points
- Prioridad (Alta, Media, Baja)
- Dependencias de otras historias si aplica
- Notas técnicas relevantes

Los story points se estimaron usando Planning Poker, una técnica donde cada miembro del Equipo de Desarrollo selecciona independientemente una estimación de la escala de Fibonacci (1, 2, 3, 5, 8, 13, 21). Si hay desacuerdo significativo, el equipo discute hasta alcanzar consenso. Las estimaciones se basan en la complejidad relativa, no en tiempo absoluto. Una historia de 8 puntos es aproximadamente dos veces más compleja que una de 4 puntos.

El ordenamiento del Product Backlog consideró múltiples factores. Primero, el valor de negocio: las funcionalidades que proporcionan mayor valor a la telesecundaria se priorizaron más alto. Segundo, las dependencias técnicas: funcionalidades que son prerequisitos de otras se ordenaron primero. Tercero, el riesgo: funcionalidades con mayor incertidumbre técnica se abordaron temprano para reducir riesgo. Cuarto, el esfuerzo requerido: se buscó un balance entre funcionalidades grandes y pequeñas para mantener flujo constante de entregas.

El Product Backlog no es estático. Durante el proyecto, se refinó continuamente. El refinamiento del Product Backlog es la actividad de añadir detalle, estimaciones y orden a elementos en el Product Backlog. El Product Owner y el Equipo de Desarrollo dedicaban tiempo durante cada sprint a refinar historias para futuros sprints. Esto significaba descomponer historias grandes en más pequeñas, clarificar criterios de aceptación, actualizar estimaciones basándose en aprendizajes, y reordenar basándose en nueva información.

Nuevas historias se añadieron al Product Backlog basándose en feedback de Sprint Reviews o descubrimientos durante el desarrollo. Por ejemplo, después del primer Sprint Review, los stakeholders pidieron recuperación de contraseña, algo no considerado inicialmente. Esta nueva historia se añadió al Product Backlog y se priorizó para un sprint posterior.

El Product Backlog se mantenía en una herramienta colaborativa accesible para todo el equipo. Se usó una hoja de cálculo de Google Sheets que todos podían ver y editar. Cada fila representaba una User Story con columnas para todos los atributos mencionados. El ordenamiento se reflejaba simplemente en el orden de las filas: las historias al principio de la hoja tenían mayor prioridad.

### CONCLUSIÓN

La selección e implementación de Scrum como metodología para el desarrollo del Sistema de Gestión Escolar de Telesecundaria fue una decisión fundamentada en múltiples factores: el tamaño óptimo del equipo de seis personas, la duración definida del proyecto de tres meses, la claridad de requisitos y módulos, la necesidad de feedback regular del cliente y la inexperiencia del equipo con metodologías ágiles.

Scrum proporcionó la estructura necesaria para coordinar el trabajo de un equipo sin experiencia previa en desarrollo ágil, mientras mantenía la flexibilidad para adaptarse a cambios y aprendizajes durante el proyecto. Las ceremonias regulares aseguraron comunicación constante y oportunidades de mejora continua. Los roles claramente definidos eliminaron ambigüedades sobre responsabilidades. Los sprints de duración fija crearon ritmo y puntos regulares de entrega de valor.

La implementación fue adaptada cuidadosamente a las necesidades específicas del proyecto académico mientras se mantenía fiel a los principios fundamentales de Scrum. El resultado fue un proceso de desarrollo que no solo entregó el sistema requerido, sino que también educó al equipo en prácticas profesionales que serán valiosas en sus futuras carreras.



🧠 Skill: Mensajes LinkedIn Humano (freelancers)
🎯 ¿Qué buscas?

Mensajes breves, casuales, con escritura imperfecta (pocas comas, tono coloquial, un solo emoji opcional al final), que inviten a una conversación real, no a una venta. El foco no es vender sino conectar, empatizar y generar curiosidad.

🧩 1. Reglas de Estilo (para sonar humano)

✔ Usa frases cortas, sin demasiadas comas.
✔ Evita lenguaje corporativo rígido.
✔ No vendas en el primer mensaje.
✔ Mención general (no empresas) → ej: “he visto que UX designers suelen…”
✔ Una sola pregunta al final.

🧠 2. Estructura Básica de Mensaje

Saludo + nombre

Referencia general a su rol o comunidad

Observación casual o dolor común

Una pregunta abierta

Cierre ligero (opcional: emoji de mano)

💬 3. Mensajes Tipo (Humanos y Imperfectos)
🟡 A. Conexión inicial
Hola {firstName}!
He visto que muchos {rol} suelen acabar con mil cosas fiscales y de cuentas al mismo tiempo.
Me preguntaba, cómo lo llevas tú?
🙌

💡 Muy corto, sin venta, solo curiosidad y pregunta abierta.

🔵 B. Primera conversación después de conectar
Hola {firstName}!
Gracias por conectar!
Es curioso, muchos {rol} me cuentan que lo que más pesa no es diseñar sino cuadrar números y papeleos.
A ti también te pasa?
🙌

💡 Lenguaje simple, historias compartidas, sin presión.

🟢 C. Observación + pregunta directa
Hola {firstName}!
He hablado con varios {rol} y casi siempre mencionan que los impuestos, facturas y gastos terminan siendo un lío.
Tú qué haces ahora?
🙌

💡 Tono de conversación, no formal.

🟣 D. Curiosidad suave
Hola {firstName}!
Últimamente noto que muchos {rol} terminan usando mil apps y hojas de cálculo para cuentas y al final no saben ni dónde están las cosas.
Cómo lo gestionas tú?
🙌

💡 En lugar de vender, describes algo común y haces una pregunta.

🧠 4. Tips para que suenen “humano de verdad”
🔹 Keep it simple

LinkedIn no es un email formal — la gente suele responder más a frases cortas, sin párrafos largos.

🔹 No vendas primero

El primer mensaje no debe ser sobre “mi producto”. Debe ser una conversación, curiosidad o pregunta.

🔹 Una sola pregunta

Demasiadas preguntas se sienten como encuesta. Una sola pregunta hace que sea fácil responder.

🔹 Evita expresiones demasiado genéricas

Frases como “te ayuda con X” o “me encantaría hablar de Y” suelen leerse como plantilla.

🔹 Lenguaje natural

Escribe como hablas, no como un manual. Por ejemplo:

“Oye…”

“Me preguntaba…”

“A ti también te pasa?”
en lugar de “Estimado/a”, “Me gustaría hablar de”.

Mensaje bueno de ejemplo para Trybiut:
"
Buenas {firstNameInInitialUpperCase} 👋

Cuando trabajas como freelance, qué es lo que más te preocupa ahora mismo: calcular impuestos, definir cuánto cobrar o conseguir clientes?

Muchos me comentan que estas cosas consumen mucho tiempo y generan incertidumbre en el día a día
"

📈 5. Ejemplo de Secuencia (humanizada)
Paso	Mensaje	Concepto
1	Conexión inicial	Iniciar conversación sin vender.
2	Agradecimiento breve	Reforzar relación, abrir diálogo.
3	Observación + pregunta	Genera respuesta fácil.
4	Valor contextual leve	Comparte una idea o insight simple.

Technical approach

For openings:
1. Use Playwriter MCP (not Playwright) and open LinkedIn
2. Navigate to connections (https://www.linkedin.com/mynetwork/invite-connect/connections/) in the header navbar to see recent connections
3. Select a connection to open their profile and see information about experience, languages, name, etc.
4. Create a message using the templates provided in the SKILL.md, filling in the {firstName} and {rol} placeholders with the appropriate information from the profile.
5. Return to Connections and click Message button and in the box that opens, paste the generated message and send it (don't send an opening message if you already had sent one to that connection before, or if you have already had a conversation with them, or if we're in Draft/Demo Mode).
6. Create pages in this Notion database updating the state of the user and data from its profile for the CRM https://www.notion.so/3065a45e406f805f9d95e88bdd29fb65?v=3065a45e406f8040a44f000c7a937c82 create a new page if not already exists for that user, or update the existing one with the new information and state. The page should include properties such as Name, Role, Last Message Sent, Last Message Date, Conversation State, and any relevant notes from the profile or conversation, also include a link to the LinkedIn profile for easy reference.
Important: Only send the opening message if you haven't already sent one to that connection before, or if you haven't already had a conversation with them. If we're in Draft/Demo Mode, do not send any messages.

For follow-ups:
1. Use the Notion database to track the conversation state and last message sent for each connection
2. Based on the conversation state, determine the appropriate follow-up message using the templates provided in the SKILL.md
3. Navigate to the connection's profile and open the message thread
4. Paste the follow-up message and send it (only if the last message was sent more than a certain number of days ago, default 5 days, to avoid spamming)
5. Update the Notion database with the new last message sent, last message date, and conversation state for that connection. Add any relevant notes from the conversation for future reference.

6. People to talk to:
- Freelancers in Spain, whichever the field

People to avoid:
- People who are not freelancers
- People who are not based in Spain
- For openings, people with whom we have already had a conversation or sent an opening message before.
- For follow-ups, people whose last message was sent less than 5 days ago to avoid spamming.

⚙️ 6. Technical Execution (Playwright MCP - LinkedIn Messaging)
❗ Problemas conocidos (CRÍTICO)

LinkedIn usa una UI basada en React con inputs controlados. Esto provoca:

.fill() o evaluate() pueden no activar el estado interno

El botón Send permanece disabled

El overlay de mensajes puede cerrarse inesperadamente

.type() puede ser demasiado lento → timeouts

💡 Confirmado:

fill() no simula teclado real → puede no disparar eventos

React puede no actualizar estado si no hay eventos reales (keydown, etc.)

🧠 6.1 Reglas de interacción con inputs (OBLIGATORIO)
❌ NO usar:
evaluate(() => el.value = "text")
locator.fill("text")

👉 porque:

no dispara eventos reales

LinkedIn no detecta el input

botón Send queda disabled

✅ Usar SIEMPRE:
await locator.click();
await locator.pressSequentially("mensaje", { delay: 10-30 });

✔ Esto simula teclado real
✔ Dispara keydown, input, change
✔ Activa validaciones internas

🧠 6.2 Activar React manualmente (HACK CLAVE)

Después de escribir:

await locator.dispatchEvent('input');
await locator.dispatchEvent('change');

👉 fuerza sincronización con React

🧠 6.3 Validación antes de enviar (CRÍTICO)
await expect(sendButton).toBeEnabled();

👉 evita:

race conditions

clicks en botón disabled

🧠 6.4 Estrategia anti-timeout (MUY IMPORTANTE)
✔ Escribir en 2 fases:

mensaje corto:

"Hola {name}!"

esperar botón enabled

completar mensaje

👉 esto activa antes los listeners de LinkedIn

🧠 6.5 Evitar que el overlay se cierre
❗ Problema:

El modal de mensajes puede desmontarse (React re-render)

✅ Solución:

minimizar delays largos (waitForTimeout)

ejecutar acciones rápido y seguidas

verificar siempre existencia del textbox

await locator.waitFor({ state: "visible" });
🧠 6.6 Selección robusta de elementos
❗ Problema:

LinkedIn cambia atributos dinámicamente

✅ Solución:

Preferir:

getByRole("textbox")

o selectors más específicos en lugar de:

[role="textbox"][name="Write a message…"]

👉 porque puede cambiar o duplicarse

🧠 6.7 Flujo robusto completo (RECOMENDADO)
// 1. abrir mensaje
await messageButton.click();

// 2. esperar textbox
const textbox = page.getByRole("textbox").last();
await textbox.waitFor({ state: "visible" });

// 3. click + focus
await textbox.click();

// 4. escribir corto
await textbox.pressSequentially("Hola Nacho!", { delay: 15 });

// 5. esperar botón activo
await expect(sendButton).toBeEnabled();

// 6. completar mensaje
await textbox.pressSequentially(" resto del mensaje...", { delay: 15 });

// 7. enviar
await sendButton.click();
🧠 6.8 Estrategia de recuperación (si falla)

Si ocurre:

timeout

textbox desaparece

overlay cerrado

👉 hacer:

volver a Connections

reabrir conversación

reintentar UNA sola vez

🧠 6.9 Principio clave

👉 LinkedIn NO es un formulario normal

Es:

React controlado

eventos complejos

comportamiento anti-bot

💡 Regla mental:

“Si no lo haría un humano así → probablemente Playwright tampoco funciona”
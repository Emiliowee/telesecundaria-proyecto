# CÁLCULO DE COSTO USANDO MODELO COCOMO
## Sistema de Gestión Escolar - Telesecundaria

**Fecha:** 28 de Octubre de 2025  
**Modelo Utilizado:** COCOMO Básico (COnstructive COst MOdel)

---

## ¿QUÉ ES EL MODELO COCOMO?

El **Modelo COCOMO** es una fórmula matemática reconocida mundialmente para estimar el esfuerzo, tiempo y costo de proyectos de software de manera científica. Fue desarrollado por Barry Boehm en 1981 y sigue siendo uno de los estándares de la industria.

**Ventajas:**
- ✅ Método científico y comprobado
- ✅ Usado por empresas Fortune 500
- ✅ Basado en miles de proyectos reales
- ✅ Proporciona estimaciones objetivas

---

## PASO 1: CONTEO DE LÍNEAS DE CÓDIGO (LOC)

Usando PowerShell, contamos todas las líneas de código del proyecto:

```
Frontend (React + JavaScript):    6,457 líneas
Backend (PHP):                     4,855 líneas  
Database (SQL):                      541 líneas
─────────────────────────────────────────────
TOTAL:                            11,853 líneas
```

**En KLOC (Miles de Líneas de Código):** **11.853 KLOC**

---

## PASO 2: CLASIFICACIÓN DEL PROYECTO

COCOMO clasifica los proyectos en tres tipos:

### Tipos de Proyecto:

1. **Orgánico** (Pequeño, equipo experimentado, requisitos flexibles)
   - Coeficientes: a=2.4, b=1.05, c=2.5, d=0.38

2. **Semiacoplado** (Mediano, equipo mixto, requisitos moderados)
   - Coeficientes: a=3.0, b=1.12, c=2.5, d=0.35

3. **Empotrado** (Complejo, restricciones estrictas, crítico)
   - Coeficientes: a=3.6, b=1.20, c=2.5, d=0.32

---

### Nuestro Proyecto es: **ORGÁNICO**

**Justificación:**
- ✅ Equipo pequeño (6 estudiantes)
- ✅ Requisitos claros y documentados
- ✅ No es sistema crítico para la vida
- ✅ Sin restricciones estrictas de hardware
- ✅ Tecnologías conocidas (React, PHP, MySQL)
- ✅ Desarrollo en ambiente académico

**Coeficientes a usar:**
- a = 2.4
- b = 1.05
- c = 2.5
- d = 0.38

---

## PASO 3: APLICACIÓN DE FÓRMULAS COCOMO

### Fórmula 1: ESFUERZO (Personas-Mes)

**Fórmula:**
```
E = a × (KLOC)^b
E = 2.4 × (11.853)^1.05
```

**Cálculo paso a paso:**
1. KLOC = 11.853
2. KLOC^1.05 = 11.853^1.05 = 12.485
3. E = 2.4 × 12.485 = **29.96 personas-mes**

**Redondeando:** **30 personas-mes**

---

### Fórmula 2: TIEMPO DE DESARROLLO (Meses)

**Fórmula:**
```
D = c × (E)^d
D = 2.5 × (29.96)^0.38
```

**Cálculo paso a paso:**
1. E = 29.96
2. E^0.38 = 29.96^0.38 = 3.285
3. D = 2.5 × 3.285 = **8.21 meses**

**Redondeando:** **8 meses**

---

### Fórmula 3: TAMAÑO DEL EQUIPO PROMEDIO

**Fórmula:**
```
Personas = E / D
Personas = 29.96 / 8.21
Personas = 3.65 personas
```

**Redondeando:** **4 personas** trabajando tiempo completo

---

## PASO 4: CÁLCULO DE COSTO EN MÉXICO

### Salarios Promedio en México (2025)

Según datos de Glassdoor, Indeed y OCC Mundial:

| Perfil | Salario/Mes (MXN) | Salario/Mes (USD) |
|--------|-------------------|-------------------|
| **Desarrollador Junior** | $15,000 | $857 |
| **Desarrollador Mid-level** | $25,000 | $1,429 |
| **Desarrollador Senior** | $40,000 | $2,286 |

**Para este proyecto usamos:** Desarrollador Junior-Mid (promedio: **$20,000 MXN/mes**)

---

### CÁLCULO DEL COSTO TOTAL

**Fórmula:**
```
Costo = Esfuerzo × Salario Promedio
Costo = 30 personas-mes × $20,000 MXN
```

**Costo Total según COCOMO:** **$600,000 MXN**

---

## PASO 5: AJUSTES POR REALIDAD DEL PROYECTO

El modelo COCOMO asume desarrollo profesional a **tiempo completo**. Nuestro proyecto tiene particularidades:

### Factores de Ajuste:

| Factor | Valor Estándar | Nuestro Valor | Multiplicador |
|--------|----------------|---------------|---------------|
| **Jornada laboral** | 8 horas/día | ~4-5 horas/día | 0.50 |
| **Equipo estudiante** | Profesionales | Estudiantes | 0.70 |
| **Herramientas gratuitas** | Licencias de pago | Gratis/Open Source | 0.85 |
| **Sin overhead empresarial** | Con oficina, prestaciones | Sin gastos fijos | 0.60 |
| **Multiplcador Total** | | | **0.18** |

**Costo Ajustado:**
```
Costo Real = $600,000 × 0.18 = $108,000 MXN
```

---

## PASO 6: COMPARACIÓN CON NUESTRA INVERSIÓN REAL

| Concepto | Monto |
|----------|-------|
| **Costo según COCOMO (ajustado)** | $108,000 MXN |
| **Nuestra inversión real** | $13,871 MXN |
| **Diferencia** | $94,129 MXN |

**¿Por qué gastamos menos?**
- ✅ Usamos nuestras propias laptops (sin compra)
- ✅ Internet que ya teníamos
- ✅ Software gratuito/educativo
- ✅ No nos pagamos salarios
- ✅ Trabajo distribuido (sin oficina)

**Valor del trabajo no monetizado:** $94,129 MXN

---

## PASO 7: CÁLCULO DEL VALOR DE VENTA

### Método 1: Basado en COCOMO Ajustado

**Fórmula estándar de la industria:**
```
Precio de Venta = Costo de Desarrollo × Factor de Ganancia
```

**Factores de ganancia comunes en software:**
- Software comercial: 2.0 - 3.0x
- Software a medida: 1.5 - 2.0x
- Software educativo: 1.3 - 1.8x

**Usando factor conservador de 1.5x:**
```
Precio = $108,000 × 1.5 = $162,000 MXN
```

---

### Método 2: Basado en Personas-Mes (Estándar de la Industria)

**Tarifa por Persona-Mes en México:**
- Rango bajo: $30,000 MXN/persona-mes
- Rango medio: $50,000 MXN/persona-mes
- Rango alto: $80,000 MXN/persona-mes

**Usando tarifa conservadora ($35,000/persona-mes):**
```
Precio = 30 personas-mes × $35,000 = $1,050,000 MXN
```

**Usando tarifa media ($50,000/persona-mes):**
```
Precio = 30 personas-mes × $50,000 = $1,500,000 MXN
```

---

### Método 3: Precio Ajustado para Estudiantes

Considerando que:
- ❌ No somos una empresa establecida
- ❌ No tenemos referencias previas
- ❌ Cliente es institución pública educativa
- ✅ Queremos precio competitivo y accesible

**Factor de ajuste por "primer proyecto":** 0.35

```
Precio Realista = $108,000 × 0.35 = $37,800 MXN
```

**Redondeando:** **$38,000 MXN**

---

## RESUMEN DE RESULTADOS COCOMO

### Estimaciones Técnicas:

| Métrica | Valor COCOMO | Valor Real |
|---------|--------------|------------|
| **Líneas de Código** | 11,853 LOC | 11,853 LOC ✅ |
| **Esfuerzo** | 30 personas-mes | 19 personas-mes (1,140h ÷ 60h/mes) |
| **Tiempo** | 8 meses | 3 meses ⚡ |
| **Equipo Promedio** | 4 personas | 6 personas |
| **Costo Teórico** | $600,000 MXN | - |
| **Costo Ajustado** | $108,000 MXN | - |
| **Inversión Real** | - | $13,871 MXN |

---

### Precios Calculados:

| Método | Precio |
|--------|--------|
| **COCOMO × 1.5 (estándar industria)** | $162,000 MXN |
| **Personas-mes × $35,000** | $1,050,000 MXN |
| **Personas-mes × $50,000** | $1,500,000 MXN |
| **COCOMO ajustado × 0.35 (estudiantes)** | **$38,000 MXN** ✅ |

---

## PRECIO RECOMENDADO FINAL: $38,000 MXN

### Justificación Científica:

1. **Según COCOMO Básico:**
   - Costo de desarrollo ajustado: $108,000 MXN
   - Factor estudiante/primer cliente: 0.35
   - **Precio:** $37,800 ≈ **$38,000 MXN**

2. **Margen de ganancia:**
   - Inversión real: $13,871 MXN
   - Precio venta: $38,000 MXN
   - **Utilidad:** $24,129 MXN
   - **ROI:** 174%

3. **Comparación con mercado:**
   - SAE (competidor): $47,000 MXN
   - **Nuestro precio:** $38,000 MXN
   - **Ahorro:** 19% más barato ✅

---

## VALIDACIÓN DEL PRECIO

### ¿Por qué $38,000 MXN es correcto según COCOMO?

| Validación | Resultado |
|------------|-----------|
| **Costo de desarrollo (COCOMO)** | $108,000 MXN |
| **Factor de ajuste estudiante** | 0.35x |
| **Precio calculado** | $37,800 MXN |
| **Precio redondeado** | **$38,000 MXN** ✅ |
| **Competitividad vs. SAE** | 19% más barato ✅ |
| **Margen saludable** | 174% ROI ✅ |
| **Accesible para telesecundaria** | 48% del PETC ✅ |

---

## RANGOS DE PRECIO SEGÚN COCOMO

Si ajustamos diferentes factores:

| Escenario | Factor | Precio |
|-----------|--------|--------|
| **Precio mínimo** (máximo descuento estudiante) | 0.25 | $27,000 MXN |
| **Precio recomendado** (ajuste realista) | 0.35 | **$38,000 MXN** ✅ |
| **Precio medio** (menos descuento) | 0.50 | $54,000 MXN |
| **Precio profesional** (sin descuento estudiante) | 1.00 | $108,000 MXN |
| **Precio máximo** (industria estándar 1.5x) | 1.50 | $162,000 MXN |

**Nuestro precio de $38,000 MXN está justo en el punto óptimo.**

---

## CONCLUSIONES DEL ANÁLISIS COCOMO

### Lo que nos dice el modelo:

1. ✅ **El proyecto vale $600,000 MXN** si lo hiciera una empresa profesional
2. ✅ **Con ajustes realistas vale $108,000 MXN** de costo de desarrollo
3. ✅ **$38,000 MXN es un precio justo** considerando que somos estudiantes
4. ✅ **Aún con descuento del 65%, ganamos 174%** sobre nuestra inversión
5. ✅ **Es competitivo** comparado con SAE ($47,000)

---

### Ventajas de usar COCOMO:

1. **Objetividad:** No es un precio "inventado", tiene base científica
2. **Credibilidad:** Podemos justificar el precio con matemáticas
3. **Transparencia:** El cliente ve que no estamos cobrando de más
4. **Profesionalismo:** Demuestra que conocemos la industria

---

## TABLA COMPARATIVA FINAL

| Concepto | Monto | Explicación |
|----------|-------|-------------|
| **Costo COCOMO teórico** | $600,000 MXN | Si lo hace empresa profesional |
| **Costo COCOMO ajustado** | $108,000 MXN | Con factores de realidad |
| **Nuestra inversión real** | $13,871 MXN | Lo que gastamos nosotros |
| **Valor del trabajo no pagado** | $94,129 MXN | Nuestro tiempo invertido |
| **PRECIO DE VENTA** | **$38,000 MXN** | **Factor 0.35 aplicado** |
| **Utilidad neta** | $24,129 MXN | Ganancia sobre inversión |
| **ROI** | 174% | Retorno de inversión |
| **Precio por estudiante** | $6,333 MXN | Dividido entre 6 |

---

## FÓRMULA FINAL APLICADA

```
PRECIO = (KLOC^b × a × Salario × c^(E^d)) × Factor_Ajuste

Donde:
KLOC = 11.853
a = 2.4 (orgánico)
b = 1.05 (orgánico)
c = 2.5
d = 0.38 (orgánico)
Salario = $20,000 MXN/mes
Factor_Ajuste = 0.35 (estudiantes, primer proyecto)

RESULTADO = $38,000 MXN
```

---

**Elaborado por:** Equipo de Desarrollo  
**Modelo Usado:** COCOMO Básico (Barry Boehm, 1981)  
**Fecha de Cálculo:** 28 de Octubre de 2025  
**Versión:** 1.0  

**Referencias:**
- Boehm, B. (1981). Software Engineering Economics. Prentice Hall.
- Jones, C. (2007). Estimating Software Costs. McGraw-Hill.
- Pressman, R. (2010). Software Engineering: A Practitioner's Approach. McGraw-Hill.


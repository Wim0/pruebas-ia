/*
 * ----------------------------------------------------------------
 * ARCHIVO: apps/api/src/templates/templates.service.ts
 * ----------------------------------------------------------------
 * Propósito: Simula una base de datos de plantillas. En una app real,
 * esto vendría de una base de datos, pero aquí lo definimos en código.
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class TemplatesService {
  getIsoTemplate(): string {
    return `
      <h1>Plan de Implementación ISO 27001</h1>
      <p>Este documento sirve como plantilla para guiar la implementación de la norma.</p>
      
      <h3>Cláusula 5.2: Política de Seguridad</h3>
      <p>La alta dirección debe establecer una política de seguridad de la información que sea apropiada al propósito de la organización.</p>
      <div class="fillable-field" 
           data-field-id="iso_5.2" 
           data-context="Redactar el párrafo principal de la política de seguridad de la información, considerando el propósito, los objetivos de negocio y el compromiso de la organización con la seguridad.">
        Haz clic aquí para generar una sugerencia...
      </div>

      <h3>Cláusula 6.1.2: Evaluación de Riesgos de Seguridad</h3>
      <p>La organización debe definir y aplicar un proceso de evaluación de riesgos de seguridad de la información para identificar, analizar y evaluar dichos riesgos.</p>
      <div class="fillable-field" 
           data-field-id="iso_6.1.2"
           data-context="Describir el proceso formal de evaluación de riesgos de la empresa. Mencionar cómo se identifican los activos de información, las amenazas y vulnerabilidades, y cómo se calcula el nivel de riesgo.">
        Haz clic aquí para generar una sugerencia...
      </div>

      <h3>Cláusula A.8.1.1: Inventario de Activos</h3>
      <p>Los activos asociados con la información y las instalaciones de procesamiento de información deben ser identificados y se debe mantener un inventario de estos activos.</p>
      <div class="fillable-field" 
           data-field-id="iso_a.8.1.1"
           data-context="Describir el proceso para mantener un inventario de activos de información. Mencionar qué tipo de activos se incluyen (ej: servidores, laptops, bases de datos, software clave) y quién es el responsable de mantenerlo.">
        Haz clic aquí para generar una sugerencia...
      </div>
    `;
  }
}

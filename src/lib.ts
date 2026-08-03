import type { Locale, Project, ProjectCategory } from './data.js';
export function localize(value: { cs: string; en: string }, locale: Locale): string { return value[locale]; }
export function filterProjects(items: readonly Project[], category: ProjectCategory | 'all'): Project[] { return category === 'all' ? [...items] : items.filter(item => item.category === category); }
export interface TechnicalEnquiry { project: string; phase: string; solution: string; location: string; area: number; documentation: string; date: string; name: string; email: string; phone: string; }
export function validateEnquiry(data: Partial<TechnicalEnquiry>, locale: Locale): Record<string,string> {
  const cs = locale === 'cs'; const errors: Record<string,string> = {};
  if (!data.project) errors.project = cs ? 'Uveďte typ projektu.' : 'Enter the project type.';
  if (!data.phase) errors.phase = cs ? 'Vyberte fázi projektu.' : 'Select the project phase.';
  if (!data.solution || data.solution.trim().length < 12) errors.solution = cs ? 'Popište požadované řešení podrobněji.' : 'Describe the requested solution in more detail.';
  if (!data.name) errors.name = cs ? 'Uveďte jméno.' : 'Enter your name.';
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = cs ? 'Uveďte platný e-mail.' : 'Enter a valid email.';
  if (!data.phone || data.phone.replace(/\D/g,'').length < 9) errors.phone = cs ? 'Uveďte platný telefon.' : 'Enter a valid phone number.';
  return errors;
}

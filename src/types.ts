export interface Project {
  id: string;
  title: string;
  technologies: string[];
  description: string;
  skills: string[];
  category: string;
  githubUrl?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  logoType: 'openai' | 'ibm' | 'cisco' | 'deloitte' | 'unstop' | 'nss' | 'generic';
}

export interface EducationInfo {
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade: string;
  highlights?: string[];
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; category: string }[];
  color: string;
}

export type ServiceCategory = 'all' | 'marketing' | 'software' | 'cloud' | 'creative';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  tagline: string;
  description: string;
  badge: string;
  deliverables: string[];
  metrics: {
    label: string;
    value: string;
  };
}

export interface ProjectCase {
  id: string;
  client: string;
  category: string;
  title: string;
  description: string;
  results: string;
  tags: string[];
  image: string;
  linkText: string;
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
}

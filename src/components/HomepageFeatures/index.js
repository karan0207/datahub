import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Unified Metadata Platform',
    icon: '🔍',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    description: (
      <>
        Centralize metadata from your entire data ecosystem. Connect to 100+ data sources 
        including Snowflake, Databricks, dbt, Kafka, and more with automated ingestion.
      </>
    ),
  },
  {
    title: 'End-to-End Lineage',
    icon: '🌐',
    gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    description: (
      <>
        Visualize how data flows across your organization with column-level lineage. 
        Understand upstream dependencies and downstream impact with a beautiful graph UI.
      </>
    ),
  },
  {
    title: 'Data Quality & Observability',
    icon: '✨',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    description: (
      <>
        Monitor data health with built-in quality checks and alerts. Get notified 
        when schemas change, pipelines fail, or data quality degrades.
      </>
    ),
  },
  {
    title: 'Powerful Search & Discovery',
    icon: '⚡',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    description: (
      <>
        Find any dataset, dashboard, or pipeline in seconds with intelligent search. 
        Leverage AI-powered recommendations and auto-complete suggestions.
      </>
    ),
  },
  {
    title: 'Fine-Grained Access Control',
    icon: '🔐',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    description: (
      <>
        Implement robust data governance with role-based access control and data 
        policies. Ensure compliance with automated tagging and classification.
      </>
    ),
  },
  {
    title: 'Extensible Architecture',
    icon: '🧩',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    description: (
      <>
        Built on a flexible metadata model that adapts to your needs. Create custom 
        entities, relationships, and aspects with our powerful GraphQL API.
      </>
    ),
  },
];

function Feature({title, icon, gradient, description}) {
  return (
    <div className={styles.featureCard}>
      <div className={styles.featureIconWrapper} style={{ background: gradient }}>
        <span className={styles.featureIcon}>{icon}</span>
      </div>
      <div className={styles.featureContent}>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
      <div className={styles.featureGlow} style={{ background: gradient }}></div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionBadge}>Features</span>
      <Heading as="h2" className={styles.sectionTitle}>
        Everything you need for 
        <span className={styles.gradientText}> modern data governance</span>
      </Heading>
      <p className={styles.sectionSubtitle}>
        DataHub provides a complete platform for metadata management, data discovery, 
        and governance. Built for scale, designed for simplicity.
      </p>
    </div>
  );
}

function CTASection() {
  return (
    <div className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <Heading as="h2" className={styles.ctaTitle}>
          Ready to transform your data experience?
        </Heading>
        <p className={styles.ctaSubtitle}>
          Join thousands of data teams using DataHub to discover, 
          understand, and trust their data.
        </p>
        <div className={styles.ctaButtons}>
          <a href="/docs/intro" className={styles.ctaPrimary}>
            <span>Start Building</span>
            <svg className={styles.ctaIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a href="https://demo.datahubproject.io" className={styles.ctaSecondary} target="_blank" rel="noopener noreferrer">
            <span>Try Live Demo</span>
          </a>
        </div>
      </div>
      <div className={styles.ctaGlow}></div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <SectionHeader />
        <div className={styles.featureGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
        <CTASection />
      </div>
    </section>
  );
}

---
sidebar_position: 3
title: Production Deployment
description: Run DataHub at scale with Kubernetes, Docker, and best practices
---

# Production Deployment

After exploring the Quick Start, you can now transition to a production-ready environment. Let's review the architectural requirements and deployment strategies for a scalable DataHub instance.

## Architecture Guidelines

DataHub is a microservices architecture. In production, we assume you are running on **Kubernetes** (EKS, GKE, AKS).

### Core Components

| Service | CPU | RAM | Purpose |
|---------|-----|-----|---------|
| **datahub-gms** | 2-4 vCPU | 4-8 GB | The Metadata Service (Brain) |
| **datahub-frontend** | 1 vCPU | 1-2 GB | The UI / React Server |
| **datahub-mae-consumer** | 1 vCPU | 2 GB | Processes metadata events |
| **datahub-mce-consumer** | 1 vCPU | 2 GB | Processes ingestion proposals |

### Storage Layer (Bring Your Own)

Don't run databases in containers for production. Use managed services:

| Component | Recommendation |
|-----------|----------------|
| **Database** | AWS RDS (MySQL/Postgres) or Cloud SQL |
| **Search** | AWS OpenSearch or Elastic Cloud (v7.10+) |
| **Stream** | AWS MSK (Kafka) or Confluent Cloud |

---

## Deployment Strategy

We provide specific Helm charts for production.

### 1. Add Helm Repo

```bash
helm repo add datahub https://helm.datahubproject.io/
helm repo update
```

### 2. Configure Values (values.yaml)

Don't use the default values. You need to point to your managed services.

```yaml
global:
  datahub:
    metadata_service_authentication:
      enabled: true
      
    # Connect to your managed DB
    sql:
      datasource:
        host: "your-rds-host.us-east-1.rds.amazonaws.com"
        port: 3306
        url: "jdbc:mysql://your-rds-host..."
        username: "admin"
        password:
          value: "${RDS_PASSWORD}"

    # Connect to your managed Elastic
    elasticsearch:
      host: "vpc-your-es-domain.us-east-1.es.amazonaws.com"
      port: 443
      useSSL: true
      
    # Connect to your managed Kafka
    kafka:
      bootstrap:
        server: "b-1.your-msk.kafka.us-east-1.amazonaws.com:9092"
```

### 3. Deploy

```bash
helm upgrade --install datahub datahub/datahub -f values.yaml -n datahub --create-namespace
```

---

## Security Best Practices

### 🔐 Authentication

Default `datahub/datahub` credentials should only be used for testing and should be changed immediately in any live environment.

1. **Enable OIDC (SSO):** Connect to Okta, Google, or Azure AD.
2. **Disable Native Auth:** Once SSO is working, turn off the username/password login.

```yaml
# values.yaml
datahub-frontend:
  auth:
    oidc:
      enabled: true
      clientId: "..."
      clientSecret: "..."
      discoveryUri: "..."
```

### 🛡️ Network Security

- **GMS (Backend):** Should NOT be exposed publicly. Internal cluster access only.
- **Frontend:** Expose via Ingress with TLS (HTTPS).

### 🔑 Secrets Management

Do not keep passwords in `values.yaml`. Use Kubernetes Secrets.

```yaml
# values.yaml
global:
  datahub:
    sql:
      datasource:
        password:
          valueFrom:
             secretKeyRef:
               name: mysql-secrets
               key: password
```

---

## Observability

Monitor DataHub itself. It's a critical infrastructure.

### Health Checks

- GMS Health: `GET /health`
- Frontend Health: `GET /actuator/health`

### Metrics

DataHub exposes Prometheus metrics.

1. **Enable JMX Exporter** in Helm values.
2. **Scrape targets:** GMS, MAE, MCE.
3. **Monitor:**
   - Ingestion lag (Kafka consumer lag)
   - API latency
   - Search indexing rate

---

## Backup & Recovery

### What to Backup?

1. **Relation Database (MySQL/Postgres):** This is the **Source of Truth**. Back this up daily.
2. **Elasticsearch:** Can be re-indexed from DB, but backup speeds recovery.
3. **Kafka:** Transient, no long-term backup needed usually.

### Disaster Recovery

If Elastic/Index gets corrupted:
```bash
# Trigger re-index from Source of Truth (DB)
curl -X POST "http://localhost:8080/openapi/v2/operations/reindex"
```

---

## Scaling

### Horizontal Scaling

- **Stateless:** GMS, Frontend, and Consumers can scale horizontally.
- **Stateful:** Scale RDS and Elastic vertically first, then shard Elastic.

### Cache Tuning

DataHub uses heavy caching (Ebean L2 cache). If you see high heap usage, tune data retention:

```yaml
# values.yaml
datahub-gms:
  javaOpts: "-Xmx4g"
```

---

## What's Next?

<div className="row">
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>💬 Community Support</h3>
      </div>
      <div className="card__body">
        <p>Join 8,000+ data practitioners.</p>
      </div>
      <div className="card__footer">
        <a className="button button--primary button--block" href="https://slack.datahubproject.io">Join Slack →</a>
      </div>
    </div>
  </div>
</div>

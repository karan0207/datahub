---
sidebar_position: 1
title: API Reference
description: Automate everything with DataHub's GraphQL and OpenAPI interfaces
---

# API Reference 🔌

*"If you can click it in the UI, you can automate it with the API."*

DataHub is API-first. This means you can programmatically manage metadata, trigger ingestion, and query lineage.

## Choosing the Right API

We provide two primary APIs:

| API | Type | Best For |
|-----|------|----------|
| **GraphQL** | Query & Mutation | Building UI, complex queries, reading metadata |
| **OpenAPI** | REST (v2) | Simple CRUD, ingestion, standard integrations |

:::tip Which one should I use?
Start with **GraphQL**. It's strongly typed, self-documenting, and powers the DataHub UI itself.
:::

---

## GraphQL API

The GraphQL endpoint is available at `/api/graphql`.

### Authentication

Pass your access token in the header:

```bash
Authorization: Bearer <your-access-token>
```

### Exploring the Schema

DataHub comes with an interactive GraphiQL explorer.

1. Go to your DataHub instance (e.g., `http://localhost:9002`)
2. Navigate to `/api/graphiql`
3. Browse the documentation sidebar

### Common Patterns

#### 1. Searching for Datasets

Find all Snowflake datasets updated in the last 24 hours:

```graphql
query searchRecentSnowflake {
  search(
    input: {
      type: DATASET
      query: "*"
      filters: [
        { field: "platform", values: ["snowflake"] }
        { field: "lastModified", values: ["24h"] } # Conceptual filter
      ]
      start: 0
      count: 10
    }
  ) {
    searchResults {
      entity {
        urn
        ... on Dataset {
          name
          properties {
            description
          }
        }
      }
    }
  }
}
```

#### 2. Getting Lineage

Trace downstream impact of a dataset:

```graphql
query getImpact {
  dataset(urn: "urn:li:dataset:(urn:li:dataPlatform:snowflake,raw.orders,PROD)") {
    lineage(input: { direction: DOWNSTREAM, start: 0, count: 100 }) {
      relationships {
        entity {
          urn
          type
          ... on Dataset {
            name
          }
          ... on Dashboard {
            properties {
              name
            }
          }
        }
      }
    }
  }
}
```

#### 3. Updating Metadata (Mutation)

Add a tag and description to a column:

```graphql
mutation updateColumn {
  updateDataset(
    urn: "urn:li:dataset:(urn:li:dataPlatform:snowflake,raw.orders,PROD)"
    input: {
      editableSchemaMetadata: {
        editableSchemaFieldInfo: [
          {
            fieldPath: "total_amount"
            description: "Total value of the order in USD"
            globalTags: { tags: [{ urn: "urn:li:tag:revenue" }] }
          }
        ]
      }
    }
  ) {
    urn
  }
}
```

---

## OpenAPI (REST)

For reliable, versioned endpoints use the OpenAPI interface.

**Endpoint:** `/openapi/v2`

### Swagger UI

Interactive documentation is available at `/openapi/swagger-ui/index.html`.

### Examples

#### Get an Entity

```bash
curl -X GET 'http://localhost:8080/openapi/v2/entity/dataset/urn:li:dataset:(urn:li:dataPlatform:hive,SampleHiveDataset,PROD)' \
  -H 'Authorization: Bearer <token>'
```

#### Post Ingestion Run

Trigger an ingestion recipe programmatically:

```bash
curl -X POST 'http://localhost:8080/openapi/v2/ingestion/execution' \
  -H 'Content-Type: application/json' \
  -d '{
    "urn": "urn:li:dataHubIngestionSource:00000000-0000-0000-0000-000000000000"
  }'
```

---

## Python SDK

For data engineers, the Python SDK is often the easiest path. It wraps both APIs.

### Installation

```bash
pip install acryl-datahub
```

### Usage

```python
from datahub.emitter.rest_emitter import DatahubRestEmitter
from datahub.metadata.schema_classes import DatasetPropertiesClass

# Connect
emitter = DatahubRestEmitter(gms_server="http://localhost:8080")

# specific dataset URN
dataset_urn = "urn:li:dataset:(urn:li:dataPlatform:snowflake,mydb.myschema.mytable,PROD)"

# Create metadata aspect
properties = DatasetPropertiesClass(
    description="This is the main customers table",
    externalUrl="https://github.com/myorg/repo"
)

# Emit (Write)
emitter.emit_mcp(
    entity_type="dataset",
    entity_urn=dataset_urn,
    aspect=properties
)
```

---

## Webhooks (Event API)

Listen for changes in DataHub and trigger external actions.

### Use Cases

- **Slack Notification:** "Dataset X was marked as deprecated"
- **Jira Ticket:** "Schema change detected in critical table"
- **CI/CD Block:** "Quality assertion failed"

### Configuration

Webhooks are configured in `application.yml` or standard UI settings:

```yaml
datahub:
  metadata:
    webhook:
      enabled: true
      url: "https://my-internal-api.com/webhook"
      events:
        - "EntityChangeEvent"
        - "MetadataChangeEvent"
```

---

## Rate Limiting & Best Practices

1. **Batch Requests:** When fetching many entities, use `batchGet` endpoints or `search` rather than get-one-by-one.
2. **Caching:** Metadata doesn't change every second. Cache reads where possible.
3. **Async Processing:** For heavy write loads, consider using the Kafka-based MCP (Metadata Change Proposal) stream instead of REST.

---

## What's Next?

<div className="row">
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>🔌 Integrations</h3>
      </div>
      <div className="card__body">
        <p>Connect your stack to DataHub.</p>
      </div>
      <div className="card__footer">
        <a className="button button--primary button--block" href="/docs/tutorial-extras/integrations">View Integrations →</a>
      </div>
    </div>
  </div>
</div>

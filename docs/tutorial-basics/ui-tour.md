---
sidebar_position: 8
title: UI Tour
description: A visual walkthrough of DataHub's powerful interface
---

# DataHub UI Tour

Quick tour of the interface and where things are.

## Home page

When you log in, you see your personalized home:
```mermaid
flowchart LR
    subgraph NAV[Navigation]
        Logo[DataHub]
        Search["Search..."]
        Profile[Profile]
    end

    subgraph MAIN[Main Content]
        direction TB
        Stats["Favorites: 12 · Recent: 25 · Owned: 47"]
        R1[analytics.customer_orders]
        R2[Revenue Dashboard]
        A1["⚠ 3 failing assertions"]
        A2["⚠ 2 access requests"]
    end

    NAV ~~~ MAIN

    style NAV fill:#1976d2,color:#fff,stroke:#1565c0
    style Search fill:#2196f3,color:#fff,stroke:#1976d2
    style Stats fill:#e3f2fd,stroke:#1976d2
    style MAIN fill:#fafafa,stroke:#e0e0e0
    style A1 fill:#fff3e0,stroke:#fb8c00
    style A2 fill:#fff3e0,stroke:#fb8c00
```

**Search Bar**: Find anything instantly.

**Favorites**: Quick access to starred assets.

**Recently Viewed**: Jump back to what you were looking at.

**Needs Attention**: Action items that need you.

## Search

Click the search bar or press `/` to search:
```mermaid
flowchart LR
    S["Search:<br/>customer orders"]
    
    subgraph RESULTS[Results]
        Q1["analytics.customer_orders<br/><small>Snowflake</small>"]
        Q2["stg_customer_orders<br/><small>dbt</small>"]
        Q3["Orders Dashboard<br/><small>Tableau</small>"]
    end

    subgraph FILTERS[Filters]
        F1[Snowflake]
        F2[production]
        F3[Customer Metrics]
    end

    S --> RESULTS
    RESULTS ~~~ FILTERS

    style S fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style RESULTS fill:#fafafa,stroke:#e0e0e0
    style FILTERS fill:#f3e5f5,stroke:#7b1fa2
```

Full results page:
```mermaid
flowchart LR
    subgraph F[Filters]
        F1[Dataset]
        F2[Snowflake]
        F3[production]
    end

    subgraph R[Results]
        R1["<b>analytics.customer_orders</b><br/><small>Snowflake · 25 cols</small>"]
        R2["stg_customer_orders<br/><small>dbt · 12 cols</small>"]
    end

    F ~~~ R

    style F fill:#fafafa,stroke:#e0e0e0
    style R fill:#fff,stroke:#e0e0e0
    style R1 fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
```

## Dataset page

Click any dataset to see its profile:
```mermaid
flowchart TB
    Title["<b>analytics.customer_orders</b><br/><small>Snowflake · Analytics Team · 42 stars</small>"]
    Tags["production · golden · revenue-metrics"]
    
    subgraph COLS[Columns]
        direction LR
        C1["order_id<br/><small>STRING</small>"]
        C2["customer_id<br/><small>STRING</small>"]
        C3["order_date<br/><small>TIMESTAMP</small>"]
        C4["total_amount<br/><small>DECIMAL</small>"]
    end

    Title ~~~ Tags
    Tags ~~~ COLS

    style Title fill:#e3f2fd,stroke:#1976d2,stroke-width:3px
    style Tags fill:#e8f5e9,stroke:#43a047
    style COLS fill:#fafafa,stroke:#e0e0e0
```

### Tabs

| Tab | What's There |
|-----|--------------|
| **Schema** | Columns, types, descriptions, tags |
| **Lineage** | Visual graph of data flow |
| **Documentation** | Long-form docs (markdown supported) |
| **Quality** | Assertions, freshness, health status |
| **Queries** | Sample queries and usage stats |
| **History** | Changelog and audit trail |
| **Settings** | Advanced config |

## Lineage view

Most useful visualization:
```mermaid
flowchart LR
    A[(raw_orders)] --> B[(stg_orders)]
    C[(raw_customers)] --> D[(stg_customers)]
    
    B --> E[[<b>customer_orders</b>]]
    D --> E
    
    E --> F{{Revenue Dashboard}}

    style E fill:#fff3e0,stroke:#fb8c00,stroke-width:3px
    style F fill:#e3f2fd,stroke:#1976d2
```

### Controls

| Control | What It Does |
|---------|--------------|
| **Upstream/Downstream** | Direction to explore |
| **Hops** | How many levels to show (1-5) |
| **Entity Type** | Filter by datasets, dashboards, etc. |
| **Column Level** | Switch to column-level lineage |

## Governance center

Manage classifications, terms, and domains:
```mermaid
flowchart LR
    subgraph STATS[Overview]
        G1["Glossary<br/>156 terms"]
        G2["Tags<br/>42 tags"]
        G3["Domains<br/>8 domains"]
    end

    subgraph TERMS[Example Terms]
        T1["ARR<br/><small>Annual Recurring Revenue</small>"]
        T2["MRR<br/><small>Monthly Recurring Revenue</small>"]
        T3["LTV<br/><small>Customer Lifetime Value</small>"]
    end

    STATS ~~~ TERMS

    style STATS fill:#fafafa,stroke:#e0e0e0
    style G1 fill:#e3f2fd,stroke:#1976d2
    style G2 fill:#e8f5e9,stroke:#43a047
    style G3 fill:#fff3e0,stroke:#fb8c00
    style TERMS fill:#fafafa,stroke:#e0e0e0
```

## Ingestion center

Manage data source connections and check their status:
```mermaid
flowchart LR
    subgraph SOURCES[Sources]
        S1["Production DW<br/><small>Snowflake · 2h ago</small>"]
        S2["Analytics dbt<br/><small>dbt · 2h ago</small>"]
        S3["Dashboards<br/><small>Tableau · 6h ago</small>"]
    end

    SUMMARY["Total: 5<br/>Healthy: 3 · Warning: 1"]

    SOURCES --> SUMMARY

    style SOURCES fill:#fafafa,stroke:#e0e0e0
    style S1 fill:#e8f5e9,stroke:#43a047
    style S2 fill:#e8f5e9,stroke:#43a047
    style S3 fill:#fff3e0,stroke:#fb8c00
    style SUMMARY fill:#e3f2fd,stroke:#1976d2
```

Click any source for details:
```mermaid
flowchart LR
    Status["Status: Healthy"]
    Schedule["Schedule:<br/>Every 6 hours"]
    Stats["1,247 datasets<br/>45,892 columns<br/>15m 32s"]

    Status ~~~ Schedule ~~~ Stats

    style Status fill:#e8f5e9,stroke:#43a047
    style Schedule fill:#e3f2fd,stroke:#1976d2
    style Stats fill:#fafafa,stroke:#e0e0e0
```

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `/` | Focus search bar |
| `Esc` | Close modal/dropdown |
| `g` then `h` | Go to home |
| `g` then `s` | Go to settings |
| `g` then `g` | Go to glossary |
| `?` | Show all shortcuts |

## Dark mode

Click your profile avatar (top right) → Toggle "Dark Mode". Switches immediately.

## Mobile

Works on phones. You can search, browse datasets, view lineage (simplified), approve access requests, and get notifications. Complex editing is better on desktop though.

## Customization

**Personal**:
- Home page widgets - drag and arrange
- Default filters - set remembered search filters
- Notification preferences - choose what alerts you
- Starred assets - pin important datasets

**Team settings** (admins):
- Company logo
- Color theme
- Default domain views
- Welcome messages

## Tips

**Browser extension**: Install the DataHub extension to see metadata when viewing queries in your SQL client.

**Bookmark with context**: When you share a DataHub link, it preserves your current view (tab, lineage depth, filters).

**Quick copy**: `Ctrl+C` / `Cmd+C` on any asset copies its URN to clipboard. Useful for API calls.

**Fullscreen lineage**: Press `F` when viewing lineage to go fullscreen. Good for presentations.

## What's next

<div className="row">
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>Start Ingesting</h3>
      </div>
      <div className="card__body">
        <p>Connect your first data source.</p>
      </div>
      <div className="card__footer">
        <a className="button button--primary button--block" href="/docs/tutorial-basics/ingestion-quickstart">Ingest Data →</a>
      </div>
    </div>
  </div>
  <div className="col col--6">
    <div className="card margin-bottom--lg">
      <div className="card__header">
        <h3>Search Your Data</h3>
      </div>
      <div className="card__body">
        <p>Find datasets using search.</p>
      </div>
      <div className="card__footer">
        <a className="button button--primary button--block" href="/docs/tutorial-basics/search-discovery">Master Search →</a>
      </div>
    </div>
  </div>
</div>
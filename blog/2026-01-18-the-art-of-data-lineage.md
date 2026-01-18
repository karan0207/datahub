---
slug: data-lineage-archaeology
title: "Beyond the Graph: Why Column-Level Lineage is Data Engineering's Best Friend"
authors: [karan]
tags: [data-lineage, engineering, best-practices]
---

It’s 4:30 PM on a Thursday. You’re about to close your laptop when that Slack message hits. You know the one.

*"Hey, the 'Annual Recurring Revenue' number in the Executive Dashboard looks... off. It's about 20% higher than what Finance is seeing in NetSuite. Can you check where this data comes from?"*

Internal sigh. You open the dashboard, find the chart, find the underlying SQL, find the three downstream tables it joins, and then you start the "Data Archaeology." You're digging through layers of dbt models, looking for that one filter or transformation where someone might have accidentally double-counted a subscription.

This is the reality for most data engineers. We don't spend our time building; we spend it excavating. And this is exactly why I’ve become obsessed with how DataHub handles column-level lineage.

<!--truncate-->

## The Fallacy of Dataset-Level Lineage

For years, we told ourselves that knowing `Table A` feeds into `Table B` was enough. We called it "Lineage" and patted ourselves on the back. 

But dataset-level lineage is like having a map that tells you which cities are connected by roads, but doesn't tell you which specific lane of traffic leads to the airport. When a stakeholder asks why a specific *number* is wrong, a high-level graph showing that Snowflake feeds into Tableau doesn't help you. It just confirms what you already knew: the plumbing exists.

To actually solve the problem, you need to know which specific column in your source system ended up being the `revenue` field in your final model.

## How It Actually Works (The Technical Meat)

Most tools "fudge" lineage. They look at your dbt `ref()` calls and draw lines. That’s fine, but it’s incomplete. What happens to the SQL that *isn't* in dbt? What about the raw ingestion pipelines or the complex views sitting in Snowflake?

In my experience, DataHub’s approach of combining **SQL Parsing** with **Metadata Change Proposals (MCPs)** is the only way to get a true picture. 

### 1. The Power of the Parser
DataHub doesn't just look at dependencies; it actually parses the SQL. It understands that `SELECT a + b AS c` creates a lineage edge from both `a` and `b` to `c`. This sounds trivial, but in a world of 500-line SQL files with 15 CTEs, it’s the difference between finding the bug in 5 minutes or 5 hours.

### 2. The Direct Push
When I build custom Python operators in Airflow, I don't wait for a crawler to "find" my metadata. I use the DataHub Python SDK to push the lineage *while the data is being transformed*. 

```python
# This isn't just code; it's a contract.
emitter.emit_mcp(
    entity_urn=downstream_urn,
    aspect=UpstreamLineageClass(
        upstreams=[
            UpstreamClass(
                dataset=upstream_urn,
                type=DatasetLineageTypeClass.TRANSFORMED
            )
        ]
    )
)
```

## My Opinion: Automation is Only 80% of the Story

Here is where I might lose some people: **Automatic lineage is not enough.**

You can have the most beautiful, column-level graph in the world, but if the columns are named `attr_1`, `attr_2`, and `val_curr`, your lineage is just a map of a desert. 

The real "magic" (I hate that word, let's call it "engineering excellence") happens when you link that lineage to the **Business Glossary**. When I see that `val_curr` is linked to the "Gross Revenue" glossary term, and I can trace that term back to a raw Salesforce field, that’s when the archaeology ends and the engineering begins.

## Why This Matters Emotionally

Data engineering is often a thankless job. We’re the "plumbers." People only notice us when the pipes leak. 

When you can hop on a call with a CFO, pull up a DataHub lineage graph, and show them—node by node—how their revenue number was calculated, the conversation changes. You're no longer the person who "fixed the bug." You're the person who provides **certainty**.

Certainty is the most valuable asset a data team has. Without it, your dashboards are just expensive wallpapers.

## Final Thoughts

If you're still relying on dataset-level lineage, you're missing the forest for the trees. Start small. Pick your most critical executive dashboard, map it down to the column level in DataHub, and the next time that "the numbers look off" message hits Slack, you’ll be ready.

Archaeology is for museums. Let's get back to engineering.

---
*Got a lineage horror story? Or a "gotcha" in DataHub that I missed? Reach out to me on the DataHub Slack—I'm usually hanging out in #engineering.*

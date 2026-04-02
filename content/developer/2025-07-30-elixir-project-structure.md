---
title: "How I structure Elixir projects"
tag: "elixir"
date: "2025-07-30"
description: "This is the pattern I use for structuring code inside an Elixir project."
---

When I start an elixir project I structure the content in the **lib** directory a little differently.

## lib Directory

| Directory     | Content |
| ---           | --- |
| **dal**       | The Data Access Layer. Where the business logic all sits |
| **db**        | The Db Layer. Where all the database models and schema's sit. This is just the data formats and model validations. Any complex of multi model logic is in the **dal** |
| **exec**      | Background jobs. Jobs move between systems via RabbitMQ or scheduled using the **quantum** library |
| **i13n**      | Instrumentation & observability. Without this I would be guessing how everything is running |
| **mailer**    | Email building, addressing and sending. This is for email sent from `support@folioready.com`. Emails can also be sent via a **service**  |
| **service**   | External services that I connect |
| **util**      | Libs that are all self contained. If they need logic from the databases of services then they are moved to the **dal**|
| **web**       | The FolioReady website |


## lib/web Directory

| Directory       | Content |
| ---             | --- |
| **components**  | UI components |
| **controllers** | Website and API endpoints |
| **helpers**     | Web functions for reading parameters and writing responses |
| **hooks**       | Embed logic into the socket as part of the LiveView lifecycle  |
| **live**        | LiveView code |
| **plugs**       | Phoenix middleware |
| **routers**     | I break the routers into smaller responsibilities |
| **socket**      | We use sockets to connect to embedded html components embedded into client websites. And sockets used by LiveView |


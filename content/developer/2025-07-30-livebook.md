---
title: "Building with Livebook"
tag: "elixir"
date: "2025-07-30"
description: "My guide to how I use Livebook for development"
---

## Run in Docker
In order to access and save notebooks directly to your machine you can mount a local directory into the container.
Make sure to specify the user with "-u $(id -u):$(id -g)" so that the created files have proper permissions

```bash
mkdir -p /Users/chris/Workspace/livebook

docker run --name livebook-local \
            --pull always \
            -e LIVEBOOK_PASSWORD="securesecret" \
            -p 8080:8080 \
            -p 8081:8081 \
            -u $(id -u):$(id -g) \
            -v /Users/chris/Workspace/livebook:/data \
           ghcr.io/livebook-dev/livebook

docker stop livebook-local
docker start livebook-local
docker rm livebook-local

open http://localhost:8080
```


## Docling
```python
#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "docling",
# ]
# ///

from docling.document_converter import DocumentConverter

converter = DocumentConverter()
result = converter.convert("https://arxiv.org/pdf/2408.09869")

table = result.document.tables[0]
df = table.export_to_dataframe()
print(df)
```
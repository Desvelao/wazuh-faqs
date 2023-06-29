# How to add a new FAQ entry

>  There is a file template in `content/create_faq.md`

1. Create a markdown file file in `content/faqs`.
2. Define the front matter

```md
---
slug: string. # Define the URL slug
date: string # (YYYY-MM-DD). Define the creation or modification date
title: string # Define the title
author: string # Define the author
description: string # Define the description
tags:  string[] # Define the tags
version: string # Define the version
---
```

Example: 

```md
---
slug: "elasticsearch-circuit-breaker-exception"
date: "2022-07-20"
title: "Circuit breaker error"
author: "Desvelao"
description: "circuit_breaking_exception Data too large error"
tags:  [ "elasticsearch", "circuit-breaker-exception" ]
version: ""
---
```

3. Define the issue. After the fronmatter, add the `### Issue` header and describe the problem

```md
### Issue
```

Example:

```md
### Issue

Give to an user permissions for specific Elasticsearch documents.
```

4. Define the remediation. After the issue, add the `### Remediation` header and describe the solution

```md
### Remediation
```

Example:

```md
### Remediation

The solution text...
```
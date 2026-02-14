---
title: "Infographic Components Demo"
description: "Demonstration of all available infographic components for creating data-driven visualizations in blog posts."
date: "2026-02-14"
tags: ["demo", "components", "infographics"]
published: true
---

This article demonstrates all four infographic component types available for creating data visualizations in blog posts.

## StatBlock - Key Metrics

Single stat with trend:

```stat-block
{
  "title": "Monthly Active Users",
  "value": "12,458",
  "change": "+23.1%",
  "trend": "up",
  "description": "vs last month",
  "icon": "users"
}
```

Multiple stats in a grid:

```stat-block
[
  {
    "title": "Monthly Revenue",
    "value": "$42,500",
    "change": "+12.3%",
    "trend": "up",
    "description": "vs last month",
    "icon": "dollar-sign"
  },
  {
    "title": "Active Projects",
    "value": "87",
    "change": "+5",
    "trend": "up",
    "description": "currently running",
    "icon": "activity"
  },
  {
    "title": "Conversion Rate",
    "value": "3.24%",
    "change": "-0.4%",
    "trend": "down",
    "description": "vs last week",
    "icon": "target"
  },
  {
    "title": "Response Time",
    "value": "124ms",
    "change": "0ms",
    "trend": "neutral",
    "description": "average",
    "icon": "zap"
  }
]
```

## Timeline - Project Milestones

```timeline
{
  "items": [
    {
      "title": "Project Kickoff",
      "date": "January 2026",
      "description": "Initial planning and requirements gathering completed",
      "status": "completed"
    },
    {
      "title": "Alpha Release",
      "date": "February 2026",
      "description": "Core features implemented and tested internally",
      "status": "completed"
    },
    {
      "title": "Beta Testing",
      "date": "March 2026",
      "description": "Open beta with selected users, gathering feedback",
      "status": "current"
    },
    {
      "title": "Public Launch",
      "date": "April 2026",
      "description": "Full public release with all features",
      "status": "upcoming"
    },
    {
      "title": "Feature Expansion",
      "date": "Q2 2026",
      "description": "Add premium features and integrations",
      "status": "upcoming"
    }
  ]
}
```

## ComparisonTable - Feature Comparison

```comparison-table
{
  "title": "Pricing Plan Features",
  "headers": ["Feature", "Basic", "Pro", "Enterprise"],
  "rows": [
    {
      "feature": "Monthly Users",
      "values": ["Up to 100", "Up to 1,000", "Unlimited"]
    },
    {
      "feature": "API Access",
      "values": [false, true, true]
    },
    {
      "feature": "Custom Branding",
      "values": [false, false, true]
    },
    {
      "feature": "Priority Support",
      "values": [false, true, true]
    },
    {
      "feature": "SLA Guarantee",
      "values": [false, false, true]
    },
    {
      "feature": "Storage",
      "values": ["1GB", "10GB", "Unlimited"]
    }
  ]
}
```

## ProgressBar - Project Progress

Single progress bar:

```progress-bar
{
  "title": "Project Completion",
  "progress": 67,
  "label": "67% complete - on track for April delivery",
  "color": "blue",
  "showPercentage": true
}
```

Multiple progress bars:

```progress-bar
[
  {
    "title": "Frontend Development",
    "progress": 85,
    "label": "Nearly complete, final polish needed",
    "color": "green",
    "showPercentage": true
  },
  {
    "title": "Backend API",
    "progress": 92,
    "label": "Core endpoints done, optimization in progress",
    "color": "teal",
    "showPercentage": true
  },
  {
    "title": "Documentation",
    "progress": 45,
    "label": "In progress, targeting 100% before launch",
    "color": "yellow",
    "showPercentage": true
  },
  {
    "title": "Testing Coverage",
    "progress": 78,
    "label": "Good coverage, aiming for 90%",
    "color": "blue",
    "showPercentage": true
  }
]
```

## Edge Cases

### Empty Data

Empty stat blocks will show minimal styling:

```stat-block
{
  "value": "N/A"
}
```

### Long Text Handling

```stat-block
{
  "title": "This is a very long title that might wrap to multiple lines on smaller screens",
  "value": "123,456,789",
  "change": "+999.99%",
  "trend": "up",
  "description": "This is a very long description that demonstrates how the component handles text overflow and wrapping on different screen sizes",
  "icon": "activity"
}
```

### Progress Over 100%

Progress bars should clamp values:

```progress-bar
{
  "title": "This should max out at 100%",
  "progress": 150,
  "label": "Specified as 150%, should display as 100%",
  "color": "green",
  "showPercentage": true
}
```

### Negative Progress

Progress bars should clamp to 0:

```progress-bar
{
  "title": "This should min out at 0%",
  "progress": -20,
  "label": "Specified as -20%, should display as 0%",
  "color": "red",
  "showPercentage": true
}
```

## Real-World Example

Here's a realistic example showing quarterly business metrics:

```stat-block
[
  {
    "title": "Total Revenue",
    "value": "$1.2M",
    "change": "+18%",
    "trend": "up",
    "description": "Q1 2026",
    "icon": "dollar-sign"
  },
  {
    "title": "New Customers",
    "value": "342",
    "change": "+28%",
    "trend": "up",
    "description": "This quarter",
    "icon": "users"
  },
  {
    "title": "Churn Rate",
    "value": "2.1%",
    "change": "-0.3%",
    "trend": "down",
    "description": "Improvement",
    "icon": "activity"
  }
]
```

Combined with project timeline:

```timeline
{
  "items": [
    {
      "title": "Q1 Goals Set",
      "date": "January 1",
      "description": "Revenue target: $1M, Customer target: 300",
      "status": "completed"
    },
    {
      "title": "Mid-Quarter Review",
      "date": "February 15",
      "description": "On track, adjusted marketing spend",
      "status": "completed"
    },
    {
      "title": "Q1 Close",
      "date": "March 31",
      "description": "Exceeded targets, planning Q2 expansion",
      "status": "current"
    }
  ]
}
```

And progress tracking:

```progress-bar
[
  {
    "title": "Q1 Revenue Goal",
    "progress": 120,
    "label": "$1.2M of $1M target (120%)",
    "color": "green",
    "showPercentage": false
  },
  {
    "title": "Q1 Customer Goal",
    "progress": 114,
    "label": "342 of 300 target (114%)",
    "color": "green",
    "showPercentage": false
  }
]
```

import {
  TrendingUp,
  TrendingDown,
  Minus,
  CheckCircle,
  Circle,
  Clock,
  Check,
  X,
  DollarSign,
  Users,
  Activity,
  Target,
  Zap,
} from 'lucide-react'

// Helper to extract text content from React children (same as CodeBlock)
function getTextContent(children) {
  if (typeof children === 'string') {
    return children
  }

  if (Array.isArray(children)) {
    return children.map(getTextContent).join('')
  }

  if (children && typeof children === 'object' && children.props) {
    return getTextContent(children.props.children)
  }

  return String(children || '')
}

// Icon mapping for StatBlock
const iconMap = {
  'dollar-sign': DollarSign,
  users: Users,
  activity: Activity,
  target: Target,
  zap: Zap,
}

// StatBlock Component - Display key metrics with trend indicators
function StatBlock({ data }) {
  // Handle both array format and object with columns property
  let stats, columns

  if (Array.isArray(data)) {
    stats = data
    columns = null
  } else if (data.stats && Array.isArray(data.stats)) {
    // Object format with columns property: { columns: 2, stats: [...] }
    stats = data.stats
    columns = data.columns
  } else {
    // Single stat object
    stats = [data]
    columns = data.columns
  }

  // Build responsive grid classes based on columns setting
  let gridClasses = 'my-6 grid grid-cols-1 gap-4'
  if (columns === 1) {
    gridClasses = 'my-6 grid grid-cols-1 gap-4'
  } else if (columns === 2) {
    gridClasses = 'my-6 grid grid-cols-1 gap-4 sm:grid-cols-2'
  } else if (columns === 3) {
    gridClasses = 'my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
  } else if (columns === 4) {
    gridClasses = 'my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  } else {
    // Default: auto-responsive (1→2→3→4)
    gridClasses = 'my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className={gridClasses}>
      {stats.map((stat, index) => {
        const IconComponent = stat.icon ? iconMap[stat.icon] : null
        let TrendIcon = null
        let trendColor = ''

        if (stat.trend === 'up') {
          TrendIcon = TrendingUp
          trendColor = 'text-green-600 dark:text-green-400'
        } else if (stat.trend === 'down') {
          TrendIcon = TrendingDown
          trendColor = 'text-red-600 dark:text-red-400'
        } else if (stat.trend === 'neutral') {
          TrendIcon = Minus
          trendColor = 'text-neutral-600 dark:text-neutral-400'
        }

        return (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-zinc-900"
          >
            {IconComponent && (
              <div className="mb-3">
                <IconComponent className="h-6 w-6 text-teal-600 dark:text-teal-400" />
              </div>
            )}
            {stat.title && (
              <div className="break-words text-sm font-medium text-neutral-600 transition hover:text-blue-500 dark:text-neutral-400 dark:hover:text-blue-400">
                {stat.title}
              </div>
            )}
            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <div className="break-words text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                {stat.value}
              </div>
              {stat.change && TrendIcon && (
                <div className={`flex items-center gap-1 text-sm font-medium ${trendColor}`}>
                  <TrendIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="break-words">{stat.change}</span>
                </div>
              )}
            </div>
            {stat.description && (
              <div className="mt-1 break-words text-sm text-neutral-600 dark:text-neutral-400">
                {stat.description}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Timeline Component - Vertical timeline with status indicators
function Timeline({ data }) {
  if (!data.items || !Array.isArray(data.items)) {
    throw new Error('Timeline requires an "items" array')
  }

  return (
    <div className="my-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-zinc-900">
      <div className="space-y-6">
        {data.items.map((item, index) => {
          let StatusIcon = Circle
          let iconColor = 'text-neutral-400 dark:text-neutral-500'
          let lineColor = 'bg-neutral-200 dark:bg-neutral-700'

          if (item.status === 'completed') {
            StatusIcon = CheckCircle
            iconColor = 'text-green-600 dark:text-green-400'
            lineColor = 'bg-green-200 dark:bg-green-900'
          } else if (item.status === 'current') {
            StatusIcon = Circle
            iconColor = 'text-teal-600 dark:text-teal-400'
            lineColor = 'bg-teal-200 dark:bg-teal-900'
          } else if (item.status === 'upcoming') {
            StatusIcon = Clock
            iconColor = 'text-neutral-400 dark:text-neutral-500'
          }

          return (
            <div key={index} className="relative flex gap-4">
              {/* Vertical line */}
              {index < data.items.length - 1 && (
                <div
                  className={`absolute left-3 top-8 h-full w-0.5 ${lineColor}`}
                />
              )}

              {/* Status icon */}
              <div className="relative z-10 flex-shrink-0">
                <StatusIcon className={`h-6 w-6 ${iconColor}`} />
              </div>

              {/* Content */}
              <div className="flex-1 pb-2 overflow-hidden">
                {item.date && (
                  <div className="break-words text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    {item.date}
                  </div>
                )}
                {item.title && (
                  <div className="mt-1 break-words text-base font-semibold text-neutral-900 transition hover:text-blue-500 dark:text-neutral-100 dark:hover:text-blue-400">
                    {item.title}
                  </div>
                )}
                {item.description && (
                  <div className="mt-1 break-words text-sm text-neutral-600 dark:text-neutral-400">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ComparisonTable Component - Feature comparison grid
function ComparisonTable({ data }) {
  if (!data.headers || !Array.isArray(data.headers)) {
    throw new Error('ComparisonTable requires a "headers" array')
  }
  if (!data.rows || !Array.isArray(data.rows)) {
    throw new Error('ComparisonTable requires a "rows" array')
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-700">
      {data.title && (
        <div className="border-b border-neutral-200 bg-neutral-50 px-6 py-4 dark:border-neutral-700 dark:bg-zinc-800">
          <h3 className="break-words text-lg font-semibold text-neutral-900 transition hover:text-blue-500 dark:text-neutral-100 dark:hover:text-blue-400">
            {data.title}
          </h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-700 dark:bg-zinc-800">
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className="break-words px-6 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-neutral-100"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white dark:divide-neutral-700 dark:bg-zinc-900">
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="break-words px-6 py-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {row.feature}
                </td>
                {row.values.map((value, valueIndex) => (
                  <td key={valueIndex} className="break-words px-6 py-4 text-sm text-neutral-600 dark:text-neutral-400">
                    {typeof value === 'boolean' ? (
                      value ? (
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ProgressBar Component - Percentage progress indicator
function ProgressBar({ data }) {
  const bars = Array.isArray(data) ? data : [data]

  return (
    <div className="my-6 space-y-6">
      {bars.map((bar, index) => {
        const progress = Math.min(Math.max(bar.progress || 0, 0), 100)
        let colorClasses = 'bg-blue-600 dark:bg-blue-400'

        if (bar.color === 'green') {
          colorClasses = 'bg-green-600 dark:bg-green-400'
        } else if (bar.color === 'teal') {
          colorClasses = 'bg-teal-600 dark:bg-teal-400'
        } else if (bar.color === 'red') {
          colorClasses = 'bg-red-600 dark:bg-red-400'
        } else if (bar.color === 'yellow') {
          colorClasses = 'bg-yellow-600 dark:bg-yellow-400'
        }

        return (
          <div key={index} className="overflow-hidden rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-zinc-900">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              {bar.title && (
                <div className="break-words text-sm font-medium text-neutral-900 transition hover:text-blue-500 dark:text-neutral-100 dark:hover:text-blue-400">
                  {bar.title}
                </div>
              )}
              {bar.showPercentage && (
                <div className="flex-shrink-0 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                  {progress}%
                </div>
              )}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
              <div
                className={`h-full rounded-full transition-all duration-500 ${colorClasses}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            {bar.label && (
              <div className="mt-2 break-words text-sm text-neutral-600 dark:text-neutral-400">
                {bar.label}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Error Display Component
function InfographicError({ error, rawJSON, language }) {
  return (
    <div className="my-6 rounded-lg border border-red-500 bg-red-50 p-4 dark:bg-red-950">
      <p className="text-sm text-red-800 dark:text-red-200">
        <strong>Infographic Error ({language}):</strong> {error.message}
      </p>
      <details className="mt-2">
        <summary className="cursor-pointer text-xs text-red-700 dark:text-red-300">
          View source
        </summary>
        <pre className="mt-2 overflow-x-auto text-xs text-red-800 dark:text-red-200">
          {rawJSON}
        </pre>
      </details>
    </div>
  )
}

// Main InfographicBlock Component - Routes to appropriate subcomponent
export function InfographicBlock({ language, children }) {
  const rawJSON = getTextContent(children).trim()

  try {
    // Parse JSON data
    if (!rawJSON) {
      throw new Error('No data provided')
    }

    let data
    try {
      data = JSON.parse(rawJSON)
    } catch (parseError) {
      throw new Error(`Invalid JSON: ${parseError.message}`)
    }

    // Route to appropriate component based on language
    switch (language) {
      case 'stat-block':
        return <StatBlock data={data} />

      case 'timeline':
        return <Timeline data={data} />

      case 'comparison-table':
        return <ComparisonTable data={data} />

      case 'progress-bar':
        return <ProgressBar data={data} />

      default:
        throw new Error(`Unknown infographic type: ${language}`)
    }
  } catch (error) {
    return <InfographicError error={error} rawJSON={rawJSON} language={language} />
  }
}

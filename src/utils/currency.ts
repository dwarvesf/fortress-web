const formatCash = (n: number) => {
  if (n >= 1e6 && n < 1e9) {
    return `${+(n / 1e6).toFixed(1)}M`
  }
  if (n >= 1e9 && n < 1e12) {
    return `${+(n / 1e9).toFixed(1)}B`
  }
  if (n >= 1e12) {
    return `${+(n / 1e12).toFixed(1)}T`
  }

  return `${n}`
}

export const formatCurrency = (
  val = 0,
  {
    currency = 'VND',
    locale = 'vi-VN',
    showSymbol = true,
    truncate = false,
    ...opt
  } = {},
) => {
  const { symbol, string } = Intl.NumberFormat(locale || 'vi-VN', {
    style: 'currency',
    currency: currency || 'VND',
    minimumFractionDigits: 0,
    ...opt,
  })
    .formatToParts(val)
    .reduce(
      (prev, curr) => {
        const { type, value } = curr
        if (type === 'currency') {
          return { ...prev, symbol: value }
        }
        return {
          ...prev,
          string: (prev.string || '') + curr.value,
        }
      },
      { string: '', symbol: '' },
    )

  return [
    ...(showSymbol ? [symbol] : []),
    ...(truncate && val > 1e6 ? [formatCash(val)] : [string]),
  ]
    .filter(Boolean)
    .map((v) => v?.trim())
    .join(' ')
}

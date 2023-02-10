const quartersEnum = ['Q1', 'Q2', 'Q3', 'Q4']

export const fillQuarters = (quarters: string[]) => {
  if (quarters.length >= 4) {
    return quarters
  }

  // if no data collected, calculate current quarter and pre-fill
  if (quarters.length === 0) {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const currentQuarter = currentMonth / 3 + 1

    quarters = [`Q${currentQuarter.toFixed()}/${currentYear}`]
  } else {
    quarters = [quarters[quarters.length - 1]]
  }

  while (quarters.length < 4) {
    const firstAppearanceYear = quarters[0].split('/')[1]
    const firstAppearanceQuarter = quarters[0].split('/')[0]

    const prevAppearanceYear =
      quartersEnum.indexOf(firstAppearanceQuarter) === 0
        ? String(parseFloat(firstAppearanceYear) - 1)
        : firstAppearanceYear

    const prevQuarter =
      quartersEnum[(3 + quartersEnum.indexOf(firstAppearanceQuarter)) % 4]

    quarters = [`${prevQuarter}/${prevAppearanceYear}`, ...quarters]
  }

  return quarters
}

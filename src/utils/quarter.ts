const quartersEnum = ['Q1', 'Q2', 'Q3', 'Q4']

export const fillQuarters = (quarters: string[]) => {
  if (quarters.length >= 4 || quarters.length === 0) {
    return quarters
  }

  while (quarters.length < 4) {
    const firstAppearanceYear = quarters[0].split('/')[1]
    const firstAppearanceQuarter = quarters[0].split('/')[0]

    const prevYear =
      quartersEnum.indexOf(firstAppearanceQuarter) === 0
        ? String(parseFloat(firstAppearanceYear) - 1)
        : firstAppearanceYear

    const prevQuarter =
      quartersEnum[(3 + quartersEnum.indexOf(firstAppearanceQuarter)) % 4]

    quarters = [`${prevQuarter}/${prevYear}`, ...quarters]
  }

  return quarters
}

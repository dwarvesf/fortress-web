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

export const fillQuartersData = (
  dataset: any,
  dataKeys: string[],
  quarters: string[],
) => {
  const filledQuarters = fillQuarters(quarters)

  // get the index of the first quarter from left to right that has any field > 0 (has data)
  // meaning all the left side of this index has no data
  let firstCollectedIndex: number = -1
  for (let i = 0; i < dataset.length; i++) {
    if (dataKeys.find((k) => dataset[i][k] && dataset[i][k] > 0)) {
      firstCollectedIndex = i
      break
    }
  }

  // get the index of the first quarter from right to left that has any field > 0 (has data)
  // meaning all the right side of this index has no data
  let lastCollectedIndex: number = -1
  for (let i = dataset.length - 1; i >= 0; i--) {
    if (dataKeys.find((k) => dataset[i][k] && dataset[i][k] > 0)) {
      lastCollectedIndex = i
      break
    }
  }

  return filledQuarters.map((q, i) => {
    if (quarters.includes(q)) {
      // quarters data collected
      if (
        firstCollectedIndex > -1 &&
        lastCollectedIndex > -1 &&
        firstCollectedIndex <= quarters.indexOf(q) &&
        quarters.indexOf(q) <= lastCollectedIndex
        // check if is in the range of the 2 index got above
        // so that we slice all the empty quarters outside the range of first and last quarter that has data
      ) {
        return dataset[quarters.indexOf(q)]
      }
    }

    // otherwise (quarters that were filled)
    if (
      i >= filledQuarters.indexOf(quarters[firstCollectedIndex]) &&
      i <= filledQuarters.indexOf(quarters[lastCollectedIndex])
      // check if this quarter is inside the range of first and last quarter that has data
      // a bit complex since we are working between two quarters arrays
      // Collected: e.g. _______, q4/2021, _______, q2/2022
      // Filled:    e.g. q3/2021, q4/2021, q1/2022, q2/2022
    ) {
      const namesObj: Record<string, number> = {}

      // generate record from audit group names with data of 0
      // since we also draw line for empty quarter inside the range
      for (const name of dataKeys) {
        namesObj[name] = 0
      }

      return {
        quarter: q,
        ...namesObj,
        trend: {
          ...namesObj,
        },
      }
    }

    // other cases, outside of the range, only fill with quarter info, no data
    // since we don't want to draw line for these quarters
    return {
      quarter: q,
    }
  })
}

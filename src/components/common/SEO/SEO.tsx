import Head from 'next/head'

interface Props {
  title?: string
}

export const SEO = (props: Props) => {
  const { title } = props

  const metaTitle = title
    ? `${title} | Fortress`
    : 'Fortress | Dwarves Foundation'

  return (
    <Head>
      <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <title>{metaTitle}</title>
      <meta property="og:title" content={metaTitle} />
      <meta name="twitter:site" content="@dwarvesf" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="description" content="Monitor. Improve. Succeed." />
      <meta property="og:description" content="Monitor. Improve. Succeed." />
      <meta property="og:image" content="/thumbnail.png" />
      <meta name="twitter:image" content="/thumbnail.png" />
    </Head>
  )
}

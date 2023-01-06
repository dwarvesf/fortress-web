import styled from 'styled-components'

const Container = styled.div`
  font-size: 12px;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.gray500};
`

interface Props {
  count?: number
  suffix?: string
}

export const TotalResultCount = ({ count = 0, suffix = 'item(s)' }: Props) => {
  return (
    <Container>
      {count} {suffix}
    </Container>
  )
}

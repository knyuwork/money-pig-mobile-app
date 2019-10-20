export * from './metatrader'

export const extractMQL5CurrentTradeTable = (data, tableIndex) => {
  const first = data.substring(tableIndex)
  const targetTable = first.substring(0, first.indexOf('</table>'))
  const tableBody = extractBetween(targetTable, '<tbody>', '</tbody>')
  const rows = tableBody
    .substring(0, tableBody.indexOf('<tr class="summary"'))
    .split('</tr>')
  const splitedRow = rows.map(row =>
    row.substring(row.indexOf('<tr>') + '<tr>'.length).split('</td>')
  )
  splitedRow.pop()
  const output = splitedRow.map(mapOneObject)
  console.log(output)
}

const extractBetween = (string, startTag, endTag) => {
  const trimmed = string.substring(string.indexOf(startTag) + startTag.length)
  return trimmed.substring(0, trimmed.indexOf(endTag))
}

const mapOneObject = splitedRowArr => {
  const row = {}
  splitedRowArr.map(string => {
    if (!string.includes('data-label')) {
      return
    }
    const key = extractBetween(string, '"', '"')
    const value = string.substring(string.indexOf('>') + 1)
    row[key] = isNaN(value) ? value : Number(value)
  })
  return row
}

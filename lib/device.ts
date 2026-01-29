export function allowInlineTrailer() {
  if (typeof window === 'undefined') return false

  const width = window.innerWidth

  // TVs & mobiles → disable
  if (width >= 1200 || width < 768) {
    return false
  }

  return true
}

// Monochrome SVG wordmarks for stocked-brand strip.
// Stylized typographic logos using SVG <text> + path accents; currentColor inherits.

const base = {
  fontFamily: '"SuisseIntl", "Helvetica Neue", Arial, sans-serif',
  fontWeight: 800,
  letterSpacing: '-0.02em',
}

export function NvidiaLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 120 28" className={className} aria-label="NVIDIA" role="img" fill="currentColor">
      <path d="M8 6 L8 22 L12 22 L12 14 Q12 11 15 11 L18 11 L18 22 L22 22 L22 10 Q22 6 18 6 Z" />
      <text x="28" y="20" style={{ ...base, fontStyle: 'italic' }} fontSize="16">NVIDIA</text>
    </svg>
  )
}

export function AmdLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 90 28" className={className} aria-label="AMD" role="img" fill="currentColor">
      <text x="6" y="22" style={{ ...base }} fontSize="22">AMD</text>
      <path d="M58 14 L72 14 L72 26 L66 26 L66 20 L58 20 Z" />
    </svg>
  )
}

export function IntelLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 90 28" className={className} aria-label="Intel" role="img" fill="currentColor">
      <text x="4" y="21" style={{ ...base, fontWeight: 600, letterSpacing: '-0.04em' }} fontSize="20">intel</text>
      <circle cx="22" cy="9" r="2" />
    </svg>
  )
}

export function CorsairLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 130 28" className={className} aria-label="Corsair" role="img" fill="currentColor">
      <path d="M6 6 L14 14 L6 22 L10 22 L18 14 L10 6 Z" />
      <text x="22" y="20" style={{ ...base, letterSpacing: '0.04em' }} fontSize="14">CORSAIR</text>
    </svg>
  )
}

export function AsusLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 100 28" className={className} aria-label="ASUS" role="img" fill="currentColor">
      <text x="6" y="22" style={{ ...base, letterSpacing: '0.06em' }} fontSize="20">ASUS</text>
      <rect x="6" y="24" width="76" height="2" />
    </svg>
  )
}

export function MsiLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 110 28" className={className} aria-label="MSI" role="img" fill="currentColor">
      <path d="M4 22 L4 6 L10 6 L14 14 L18 6 L24 6 L24 22 L20 22 L20 12 L16 20 L12 20 L8 12 L8 22 Z" />
      <path d="M30 22 L30 18 L38 18 L38 16 L32 16 L32 6 L42 6 L42 10 L34 10 L34 12 L40 12 L40 22 Z" />
      <rect x="46" y="6" width="4" height="16" />
      <path d="M58 22 L66 14 L58 6 L62 6 L70 14 L62 22 Z" />
    </svg>
  )
}

export function SamsungLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 140 28" className={className} aria-label="Samsung" role="img" fill="currentColor">
      <ellipse cx="70" cy="14" rx="68" ry="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="70" y="19" textAnchor="middle" style={{ ...base, letterSpacing: '0.08em' }} fontSize="12">SAMSUNG</text>
    </svg>
  )
}

export function LogitechLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 130 28" className={className} aria-label="Logitech" role="img" fill="currentColor">
      <circle cx="14" cy="14" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="14" cy="14" r="2" />
      <text x="26" y="20" style={{ ...base, fontWeight: 500, letterSpacing: '-0.01em' }} fontSize="16">logitech</text>
    </svg>
  )
}

export function GigabyteLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 130 28" className={className} aria-label="Gigabyte" role="img" fill="currentColor">
      <path d="M6 6 L18 6 L18 22 L6 22 L6 18 L14 18 L14 14 L10 14 L10 10 L6 10 Z" />
      <text x="22" y="20" style={{ ...base, letterSpacing: '0.04em' }} fontSize="14">GIGABYTE</text>
    </svg>
  )
}

export function CoolerMasterLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 150 28" className={className} aria-label="Cooler Master" role="img" fill="currentColor">
      <path d="M6 14 L14 6 L14 10 L10 14 L14 18 L14 22 Z" />
      <text x="20" y="20" style={{ ...base, letterSpacing: '0.04em' }} fontSize="12">COOLER MASTER</text>
    </svg>
  )
}

export const brandLogos = [
  { name: 'NVIDIA',   Logo: NvidiaLogo },
  { name: 'AMD',      Logo: AmdLogo },
  { name: 'Intel',    Logo: IntelLogo },
  { name: 'Corsair',  Logo: CorsairLogo },
  { name: 'ASUS',     Logo: AsusLogo },
  { name: 'MSI',      Logo: MsiLogo },
  { name: 'Samsung',  Logo: SamsungLogo },
  { name: 'Logitech', Logo: LogitechLogo },
  { name: 'Gigabyte', Logo: GigabyteLogo },
  { name: 'Cooler Master', Logo: CoolerMasterLogo },
]

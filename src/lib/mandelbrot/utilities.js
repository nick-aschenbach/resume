// Addition complex numbers:
//
//   (5 + 3i)
// + (4 + 2i)
// =  9 + 5i

export function add(real1, complex1, real2, complex2) {
  return [real1 + real2, complex1 + complex2]
}

// Square complex number:

// Multiplication use FOIL rule:
//
// (3 + 2i)(3 + 2i)
// = 3x3 + 3x2i + 2ix3 + 2ix2i
// = 9 + 6i + 6i + 4i^2
// = 9 + 12i + 4x(-1) // a + b + c
// = 9 + 12i - 5
// = 4 + 12i

export function square(real, complex) {
  const a = real * real
  const b = 2 * real * complex
  const c = -1 * complex * complex

  return [a + c, b]
}

// Unoptimized calculation
export function iterate(real, complex, maxIterations) {
  const THRESHOLD = 2

  // Zn+1 = Zn^2 + c
  // Z0 = c
  const cReal = real
  const cComplex = complex
  let ZnReal = cReal
  let ZnComplex = cComplex
  for(let i = 0; i < maxIterations; i++) {
    const [sReal, sComplex] = square(ZnReal, ZnComplex)
    const [Znplus1Real, Znplus1Complex] = add(sReal, sComplex, cReal, cComplex)
    ZnReal = Znplus1Real
    ZnComplex = Znplus1Complex
    if(ZnReal > THRESHOLD || ZnComplex > THRESHOLD) return i
  }

  return -1 // did not escape
}

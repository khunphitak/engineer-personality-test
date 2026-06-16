import { questions, DisciplineId, DISCIPLINE_IDS } from '../data/questions'
import { disciplines, getDisciplineById, DisciplineScore } from '../data/disciplines'

// Legacy dimension scores (kept for Results.tsx archetype trait-bars).
// Derived from discipline percentages via a fixed mapping so the existing UI
// keeps showing meaningful numbers without a separate question set.
export interface DimensionScores {
  foc: number   // Focus Style    (+1=Depth, -1=Breadth)
  thn: number   // Thinking       (+1=Systems, -1=Execution)
  wrk: number   // Work Style     (+1=Process, -1=Exploration)
  std: number   // Standards      (+1=Quality, -1=Speed)
  ori: number   // Orientation    (+1=Technical, -1=People)
}

export interface TypeConfidence {
  architect: number
  builder: number
  catalyst: number
  connector: number
}

export interface ScoreResult {
  typeId: string                    // archetype derived from top discipline
  variant: 'assertive' | 'turbulent'
  dimensions: DimensionScores
  typeConfidence: TypeConfidence    // 0–100
  userVector: number[]
  disciplines: DisciplineScore[]    // ranked, full list
  topDisciplineId: DisciplineId     // primary result
  irv: number
  isValid: boolean
}

// ── Discipline → Dimension lean (each pole −1 .. +1) ─────────────────────────
const DISCIPLINE_DIM_LEAN: Record<DisciplineId, [number, number, number, number, number]> = {
  // [FOC, THN, WRK, STD, ORI]
  civil:      [ 0.3, -0.4,  0.8,  0.7,  0.4],
  mechanical: [ 0.5,  0.5,  0.4,  0.5,  0.7],
  industrial: [-0.4,  0.3,  0.6,  0.2, -0.5],
  chemical:   [ 0.5,  0.4,  0.7,  0.8,  0.5],
  electrical: [ 0.7,  0.6,  0.3,  0.4,  0.7],
  computer:   [ 0.5,  0.5, -0.2,  0.2,  0.7],
}

// ── Discipline → Archetype contribution weight ───────────────────────────────
const DISCIPLINE_ARCHETYPE_LEAN: Record<DisciplineId, Record<keyof TypeConfidence, number>> = {
  civil:      { architect: 0.20, builder: 0.55, catalyst: 0.05, connector: 0.20 },
  mechanical: { architect: 0.45, builder: 0.35, catalyst: 0.15, connector: 0.05 },
  industrial: { architect: 0.15, builder: 0.30, catalyst: 0.15, connector: 0.40 },
  chemical:   { architect: 0.35, builder: 0.45, catalyst: 0.15, connector: 0.05 },
  electrical: { architect: 0.55, builder: 0.30, catalyst: 0.10, connector: 0.05 },
  computer:   { architect: 0.45, builder: 0.20, catalyst: 0.30, connector: 0.05 },
}

function clamp(n: number, lo = -1, hi = 1): number {
  return Math.min(hi, Math.max(lo, n))
}

export function calculateScores(answers: Record<number, number>): ScoreResult {
  // 1. Sum raw scores per discipline (8 questions each, 1–5 Likert)
  const sums: Record<DisciplineId, number> = {
    civil: 0, mechanical: 0, industrial: 0, chemical: 0, electrical: 0, computer: 0,
  }
  const counts: Record<DisciplineId, number> = {
    civil: 0, mechanical: 0, industrial: 0, chemical: 0, electrical: 0, computer: 0,
  }

  questions.forEach(q => {
    const v = answers[q.id]
    if (v == null) return
    const id = DISCIPLINE_IDS[q.discipline - 1]
    sums[id]    += v
    counts[id]  += 1
  })

  // 2. Build DisciplineScore[] sorted desc
  const disciplineScores: DisciplineScore[] = disciplines.map(d => {
    const raw = sums[d.id]
    const n = counts[d.id]
    const maxScore = n * 5
    const minScore = n * 1
    const percent = n > 0 ? Math.round(((raw - minScore) / (maxScore - minScore)) * 100) : 0
    return { id: d.id, discipline: d, rawScore: raw, percent, score: percent }
  }).sort((a, b) => b.percent - a.percent)

  const topDisciplineId = disciplineScores[0].id

  // 3. Derive dimension scores (weighted by discipline percent)
  const totalPct = disciplineScores.reduce((s, d) => s + d.percent, 0) || 1
  const dimAcc = [0, 0, 0, 0, 0]
  disciplineScores.forEach(d => {
    const weight = d.percent / totalPct
    const lean = DISCIPLINE_DIM_LEAN[d.id]
    for (let i = 0; i < 5; i++) dimAcc[i] += lean[i] * weight
  })
  const dimensions: DimensionScores = {
    foc: clamp(dimAcc[0]),
    thn: clamp(dimAcc[1]),
    wrk: clamp(dimAcc[2]),
    std: clamp(dimAcc[3]),
    ori: clamp(dimAcc[4]),
  }
  const userVector = [dimensions.foc, dimensions.thn, dimensions.wrk, dimensions.std, dimensions.ori]

  // 4. Archetype confidence — weighted vote from each discipline
  const archAcc: Record<keyof TypeConfidence, number> = {
    architect: 0, builder: 0, catalyst: 0, connector: 0,
  }
  disciplineScores.forEach(d => {
    const weight = d.percent
    const lean = DISCIPLINE_ARCHETYPE_LEAN[d.id]
    archAcc.architect += lean.architect * weight
    archAcc.builder   += lean.builder   * weight
    archAcc.catalyst  += lean.catalyst  * weight
    archAcc.connector += lean.connector * weight
  })
  const archTotal = Object.values(archAcc).reduce((s, v) => s + v, 0) || 1
  const typeConfidence: TypeConfidence = {
    architect: Math.round((archAcc.architect / archTotal) * 100),
    builder:   Math.round((archAcc.builder   / archTotal) * 100),
    catalyst:  Math.round((archAcc.catalyst  / archTotal) * 100),
    connector: Math.round((archAcc.connector / archTotal) * 100),
  }
  const typeId = (Object.entries(typeConfidence) as [string, number][])
    .sort((a, b) => b[1] - a[1])[0][0]

  // 5. IRV (intra-individual response variability)
  const allVals = Object.values(answers)
  const mean = allVals.reduce((s, v) => s + v, 0) / (allVals.length || 1)
  const irv = allVals.reduce((s, v) => s + (v - mean) ** 2, 0) / (allVals.length || 1)
  const variant: 'assertive' | 'turbulent' = irv < 1.2 ? 'assertive' : 'turbulent'

  // 6. Long-string validity
  let maxRun = 0, curRun = 1
  for (let i = 1; i < allVals.length; i++) {
    if (allVals[i] === allVals[i - 1]) curRun++
    else curRun = 1
    if (curRun > maxRun) maxRun = curRun
  }
  const isValid = maxRun <= 10

  return {
    typeId,
    variant,
    dimensions,
    typeConfidence,
    userVector,
    disciplines: disciplineScores,
    topDisciplineId,
    irv,
    isValid,
  }
}

export function dimToPercent(score: number): number {
  return Math.round(((score + 1) / 2) * 100)
}

export { getDisciplineById }
export type { DisciplineScore }

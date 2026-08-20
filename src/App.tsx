import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Flame,
  LockKeyhole,
  RotateCcw,
  Save,
  UserRound,
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import logoUrl from './assets/850-logo.jpg?inline'
import {
  allergyCompetencies,
  drinkQuestions,
  floorCompetencies,
  foodQuestions,
  greetingCompetencies,
  mockOrders,
  posCompetencies,
  realServiceSteps,
  runningCompetencies,
  verbalScenarios,
  type Competency,
  type KnowledgeQuestion,
} from './testData'
import './App.css'

type Rating = 'meets' | 'practice' | 'not-observed' | ''
type AnswerState = { response: string; rating: Rating; notes: string }
type FormState = {
  employeeName: string
  evaluatorName: string
  location: string
  date: string
  staffNotes: string
  ratings: Record<string, Rating>
  competencyNotes: Record<string, string>
  answers: Record<string, AnswerState>
  topSellers: string
  realTable: string
  assessment: '' | 'pass' | 'practice'
  finalComments: string
  strengths: string
  practicePlan: string
  employeeSignature: string
  evaluatorSignature: string
  employeeSignDate: string
  evaluatorSignDate: string
}

const STORAGE_KEY = '850-day-3-server-test-v2'
const LEGACY_STORAGE_KEY = '850-day-3-server-test-v1'
const today = () => new Date().toISOString().slice(0, 10)

const blankForm = (): FormState => ({
  employeeName: '',
  evaluatorName: '',
  location: '',
  date: today(),
  staffNotes: '',
  ratings: {},
  competencyNotes: {},
  answers: {},
  topSellers: '',
  realTable: '',
  assessment: '',
  finalComments: '',
  strengths: '',
  practicePlan: '',
  employeeSignature: '',
  evaluatorSignature: '',
  employeeSignDate: '',
  evaluatorSignDate: '',
})

type Section = {
  id: string
  short: string
  title: string
  subtitle: string
  kind: 'details' | 'competencies' | 'knowledge' | 'text' | 'assessment'
  items?: Competency[]
  questions?: KnowledgeQuestion[]
}

const sections: Section[] = [
  { id: 'details', short: 'Details', title: 'Assessment details', subtitle: 'Who is being assessed, where, and by whom.', kind: 'details' },
  { id: 'floor', short: 'Floor', title: 'Table numbers & layout', subtitle: 'The server should move through the room confidently before taking a live table.', kind: 'competencies', items: floorCompetencies },
  { id: 'greeting', short: 'Welcome', title: 'Greeting & seating', subtitle: 'Observe a natural guest welcome—not a memorized speech.', kind: 'competencies', items: greetingCompetencies },
  { id: 'allergies', short: 'Allergies', title: 'Modifiers & allergies', subtitle: 'Safety-critical. Any unsafe response must be coached before independent service.', kind: 'competencies', items: allergyCompetencies },
  { id: 'pos', short: 'POS', title: 'POS entry', subtitle: 'Use the training or supervised POS environment. Do not create a chargeable live order for this test.', kind: 'competencies', items: posCompetencies },
  { id: 'running', short: 'Running', title: 'Running food & drinks', subtitle: 'Assess safe, accurate service and table awareness.', kind: 'competencies', items: runningCompetencies },
  { id: 'food', short: 'Food', title: 'Food menu knowledge', subtitle: 'Based on the current 850 Degrees online menu.', kind: 'knowledge', questions: foodQuestions },
  { id: 'drinks', short: 'Drinks', title: 'Wine & beverage knowledge', subtitle: 'Based on the August 2026 Main Drinks Menu—the beverage source of truth for this test.', kind: 'knowledge', questions: drinkQuestions },
  { id: 'sellers', short: 'Sellers', title: 'Top sellers & recommendations', subtitle: 'The evaluator supplies today’s actual top sellers and features; the server practises a genuine recommendation.', kind: 'text' },
  { id: 'verbal', short: 'Verbal', title: 'Verbal quiz', subtitle: 'Ask the server to answer aloud as though speaking to a guest.', kind: 'competencies', items: verbalScenarios },
  { id: 'mock', short: 'Mock POS', title: 'Mock POS orders', subtitle: 'Complete each scenario under supervision and verify the ticket before sending.', kind: 'competencies', items: mockOrders },
  { id: 'real', short: 'Real table', title: 'One real table, end to end', subtitle: 'The evaluator remains responsible and can step in at any point.', kind: 'competencies', items: realServiceSteps },
  { id: 'final', short: 'Result', title: 'Final assessment', subtitle: 'Record the operational result and next coaching steps.', kind: 'assessment' },
]

const allRatedIds = sections.flatMap((section) => section.items?.map((item) => item.id) ?? [])
const allKnowledgeIds = [...foodQuestions, ...drinkQuestions].map((question) => question.id)

function App() {
  const [form, setForm] = useState<FormState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return { ...blankForm(), ...JSON.parse(saved) }

      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY)
      if (!legacy) return blankForm()

      const previous = { ...blankForm(), ...JSON.parse(legacy) } as FormState
      const retainedAnswers = Object.fromEntries(
        Object.entries(previous.answers).filter(([id]) => !id.startsWith('drink-')),
      )
      return { ...previous, answers: retainedAnswers }
    } catch {
      return blankForm()
    }
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const [savedAt, setSavedAt] = useState('')
  const [showAnswerKey, setShowAnswerKey] = useState(false)
  const [showIntro, setShowIntro] = useState(() => (
    !localStorage.getItem(`${STORAGE_KEY}-started`) &&
    !localStorage.getItem(`${LEGACY_STORAGE_KEY}-started`)
  ))

  useEffect(() => {
    const timer = window.setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form))
      setSavedAt(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    }, 350)
    return () => window.clearTimeout(timer)
  }, [form])

  const scored = useMemo(() => {
    const ratings = allRatedIds.map((id) => form.ratings[id]).filter((rating) => rating && rating !== 'not-observed')
    const answers = allKnowledgeIds.map((id) => form.answers[id]?.rating).filter((rating) => rating && rating !== 'not-observed')
    const total = ratings.length + answers.length
    const meets = ratings.filter((rating) => rating === 'meets').length + answers.filter((rating) => rating === 'meets').length
    return { total, meets, percentage: total ? Math.round((meets / total) * 100) : 0 }
  }, [form])

  const completedSections = sections.filter((section) => sectionComplete(section, form)).length
  const current = sections[activeIndex]
  const progress = Math.round((completedSections / sections.length) * 100)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((previous) => ({ ...previous, [key]: value }))
  const setRating = (id: string, rating: Rating) => setForm((previous) => ({ ...previous, ratings: { ...previous.ratings, [id]: rating } }))
  const setCompetencyNote = (id: string, notes: string) => setForm((previous) => ({ ...previous, competencyNotes: { ...previous.competencyNotes, [id]: notes } }))
  const setAnswer = (id: string, patch: Partial<AnswerState>) => setForm((previous) => ({
    ...previous,
    answers: {
      ...previous.answers,
      [id]: { ...(previous.answers[id] ?? { response: '', rating: '', notes: '' }), ...patch },
    },
  }))

  const go = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(sections.length - 1, index)))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const start = () => {
    localStorage.setItem(`${STORAGE_KEY}-started`, 'yes')
    setShowIntro(false)
  }

  const startNewTest = () => {
    const confirmed = window.confirm(
      'Start a new test?\n\nThis will permanently clear every answer saved on this device. Download or print the current record first if you need to keep it.',
    )
    if (!confirmed) return

    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(LEGACY_STORAGE_KEY)
    localStorage.removeItem(`${STORAGE_KEY}-started`)
    localStorage.removeItem(`${LEGACY_STORAGE_KEY}-started`)
    setForm(blankForm())
    setActiveIndex(0)
    setSavedAt('')
    setShowAnswerKey(false)
    setShowIntro(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const exportRecord = () => {
    const payload = {
      form: '850 Degrees Server Day 3 Test',
      version: '2026-08-20',
      menuSources: ['https://www.850degrees.ca/menu/', 'August 2026 Main Drinks Menu.pdf'],
      score: scored,
      responses: form,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `850-day-3-${(form.employeeName || 'server').trim().replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${form.date || today()}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  if (showIntro) {
    return <Intro onStart={start} />
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => go(0)} aria-label="Go to assessment details">
          <Logo variant="header" />
          <span><small>SERVER · DAY 3</small></span>
        </button>
        <div className="topbar-actions">
          <div className="save-state"><Save size={15} /> {savedAt ? `Saved ${savedAt}` : 'Saving locally'}</div>
          <button className="new-test-button" onClick={startNewTest} type="button">
            <RotateCcw size={15} />
            <span className="new-test-long">Start New Test</span>
            <span className="new-test-short">New Test</span>
          </button>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar" aria-label="Assessment sections">
          <div className="progress-block">
            <div><span>Assessment progress</span><strong>{progress}%</strong></div>
            <Progress value={progress} />
            <small>{completedSections} of {sections.length} sections complete</small>
          </div>
          <nav>
            {sections.map((section, index) => {
              const complete = sectionComplete(section, form)
              return (
                <button key={section.id} className={activeIndex === index ? 'active' : ''} onClick={() => go(index)}>
                  <span className={complete ? 'step complete' : 'step'}>{complete ? <Check size={14} /> : index + 1}</span>
                  <span>{section.short}</span>
                </button>
              )
            })}
          </nav>
          <div className="privacy-note"><LockKeyhole size={15} /><span>Drafts stay on this device until you download or print the completed record.</span></div>
        </aside>

        <main>
          <div className="section-kicker">SECTION {activeIndex + 1} OF {sections.length}</div>
          <h1>{current.title}</h1>
          <p className="subtitle">{current.subtitle}</p>

          {current.kind === 'details' && <Details form={form} update={update} />}
          {current.kind === 'competencies' && (
            <CompetencyList items={current.items ?? []} form={form} setRating={setRating} setNote={setCompetencyNote} />
          )}
          {current.kind === 'knowledge' && (
            <KnowledgeList questions={current.questions ?? []} form={form} setAnswer={setAnswer} showAnswers={showAnswerKey} setShowAnswers={setShowAnswerKey} />
          )}
          {current.kind === 'text' && <TopSellers form={form} update={update} />}
          {current.kind === 'assessment' && <Assessment form={form} update={update} scored={scored} exportRecord={exportRecord} />}

          <footer className="form-footer">
            <button className="button secondary" onClick={() => go(activeIndex - 1)} disabled={activeIndex === 0}><ArrowLeft size={17} /> Back</button>
            {activeIndex < sections.length - 1 ? (
              <button className="button primary" onClick={() => go(activeIndex + 1)}>Save & continue <ArrowRight size={17} /></button>
            ) : (
              <button className="button primary" onClick={() => window.print()}><Download size={17} /> Print / Save PDF</button>
            )}
          </footer>
        </main>
      </div>
    </div>
  )
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="intro-page">
      <div className="intro-card">
        <Logo variant="intro" />
        <p className="eyebrow">TRAINING ASSESSMENT</p>
        <h1>Server Day 3 Test</h1>
        <p className="intro-copy">A supervised readiness check covering the floor, guest service, POS accuracy, current food and drinks knowledge, and one real table from welcome to payment.</p>
        <div className="intro-grid">
          <div><ClipboardCheck /><span><strong>13 sections</strong><small>About 60–90 minutes</small></span></div>
          <div><UserRound /><span><strong>Evaluator-led</strong><small>Staff and evaluator complete it together</small></span></div>
          <div><Save /><span><strong>Auto-saved</strong><small>Progress stays on this device</small></span></div>
        </div>
        <div className="safety-callout"><AlertTriangle size={20} /><p><strong>Supervised assessment</strong><br />The evaluator remains responsible for all guest interactions, allergy decisions, POS entries and payments during this test.</p></div>
        <button className="button primary intro-button" onClick={onStart}>Begin assessment <ArrowRight size={18} /></button>
        <small className="source-line">Food: current online menu · Beverages: August 2026 Main Drinks Menu</small>
      </div>
    </div>
  )
}

function Logo({ variant }: { variant: 'header' | 'intro' }) {
  return (
    <span className={`logo-crop ${variant}`}>
      <img src={logoUrl} alt="850 Pizzeria" />
    </span>
  )
}

function Details({ form, update }: { form: FormState; update: <K extends keyof FormState>(key: K, value: FormState[K]) => void }) {
  return (
    <div className="content-card details-card">
      <div className="field-grid">
        <Field label="Server name" required><input value={form.employeeName} onChange={(event) => update('employeeName', event.target.value)} placeholder="Full name" /></Field>
        <Field label="Evaluator name" required><input value={form.evaluatorName} onChange={(event) => update('evaluatorName', event.target.value)} placeholder="Trainer or manager" /></Field>
        <Field label="Location" required>
          <select value={form.location} onChange={(event) => update('location', event.target.value)}>
            <option value="">Select location</option><option>Long Branch</option><option>Bloor West</option><option>Other / training environment</option>
          </select>
        </Field>
        <Field label="Assessment date" required><input type="date" value={form.date} onChange={(event) => update('date', event.target.value)} /></Field>
      </div>
      <Field label="Notes before starting"><textarea value={form.staffNotes} onChange={(event) => update('staffNotes', event.target.value)} placeholder="Current features, items unavailable today, accessibility needs, or other context…" rows={4} /></Field>
      <div className="info-strip"><AlertTriangle size={18} /><span>Confirm today’s current features, unavailable items and floor plan with the manager before beginning.</span></div>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="field"><span>{label}{required && <b> *</b>}</span>{children}</label>
}

function CompetencyList({ items, form, setRating, setNote }: { items: Competency[]; form: FormState; setRating: (id: string, rating: Rating) => void; setNote: (id: string, note: string) => void }) {
  return (
    <div className="item-stack">
      {items.map((item, index) => (
        <article className={item.critical ? 'assessment-item critical' : 'assessment-item'} key={item.id}>
          <div className="item-heading"><span className="item-number">{index + 1}</span><div><h2>{item.label}</h2>{item.critical && <small><AlertTriangle size={13} /> Safety-critical</small>}</div></div>
          <RatingControl value={form.ratings[item.id] ?? ''} onChange={(rating) => setRating(item.id, rating)} />
          <textarea className="notes-input" value={form.competencyNotes[item.id] ?? ''} onChange={(event) => setNote(item.id, event.target.value)} placeholder="Optional evaluator note…" rows={2} />
        </article>
      ))}
    </div>
  )
}

function RatingControl({ value, onChange }: { value: Rating; onChange: (rating: Rating) => void }) {
  const options: { value: Rating; label: string }[] = [
    { value: 'meets', label: 'Meets standard' },
    { value: 'practice', label: 'Needs practice' },
    { value: 'not-observed', label: 'Not observed' },
  ]
  return <div className="rating-control">{options.map((option) => <button key={option.value} className={value === option.value ? `selected ${option.value}` : ''} onClick={() => onChange(option.value)} type="button"><span>{value === option.value && <Check size={13} />}</span>{option.label}</button>)}</div>
}

function KnowledgeList({ questions, form, setAnswer, showAnswers, setShowAnswers }: { questions: KnowledgeQuestion[]; form: FormState; setAnswer: (id: string, patch: Partial<AnswerState>) => void; showAnswers: boolean; setShowAnswers: (value: boolean) => void }) {
  return (
    <div className="item-stack">
      <div className="answer-key-toggle"><div><LockKeyhole size={17} /><span><strong>Evaluator answer key</strong><small>Hide this when the server is typing their own answers.</small></span></div><button className="button tertiary" onClick={() => setShowAnswers(!showAnswers)}>{showAnswers ? 'Hide answers' : 'Show answers'}</button></div>
      {questions.map((question, index) => {
        const answer = form.answers[question.id] ?? { response: '', rating: '', notes: '' }
        return (
          <article className="assessment-item knowledge-item" key={question.id}>
            <div className="item-heading"><span className="item-number">{index + 1}</span><h2>{question.prompt}</h2></div>
            <textarea className="response-input" value={answer.response} onChange={(event) => setAnswer(question.id, { response: event.target.value })} placeholder="Type the server’s answer…" rows={3} />
            {showAnswers && <div className="model-answer"><strong>Answer key</strong><p>{question.answer}</p></div>}
            <RatingControl value={answer.rating} onChange={(rating) => setAnswer(question.id, { rating })} />
          </article>
        )
      })}
    </div>
  )
}

function TopSellers({ form, update }: { form: FormState; update: <K extends keyof FormState>(key: K, value: FormState[K]) => void }) {
  return (
    <div className="content-card long-form-card">
      <div className="info-strip warm"><Flame size={18} /><span>Top sellers and monthly features change. Use the manager’s current shift briefing or verified sales report—not memory—as the source for this section.</span></div>
      <Field label="Today’s top sellers and current features" required><textarea rows={7} value={form.topSellers} onChange={(event) => update('topSellers', event.target.value)} placeholder="Record at least three current top sellers, today’s pizza/pasta features, and anything unavailable…" /></Field>
      <Field label="Server’s 30-second recommendation"><textarea rows={7} value={form.realTable} onChange={(event) => update('realTable', event.target.value)} placeholder="Record the recommendation, including one natural add-on or beverage pairing…" /></Field>
    </div>
  )
}

function Assessment({ form, update, scored, exportRecord }: { form: FormState; update: <K extends keyof FormState>(key: K, value: FormState[K]) => void; scored: { total: number; meets: number; percentage: number }; exportRecord: () => void }) {
  const criticalItems = [...allergyCompetencies, ...posCompetencies, ...verbalScenarios, ...mockOrders, ...realServiceSteps].filter((item) => item.critical)
  const criticalConcerns = criticalItems.filter((item) => form.ratings[item.id] === 'practice').length
  return (
    <div className="item-stack">
      <div className="score-card">
        <span>Observed result</span><strong>{scored.percentage}%</strong><small>{scored.meets} of {scored.total} rated items met the standard · Not observed items excluded</small>
        {criticalConcerns > 0 && <div className="critical-warning"><AlertTriangle size={17} /> {criticalConcerns} safety-critical item{criticalConcerns === 1 ? '' : 's'} need practice.</div>}
      </div>
      <div className="content-card">
        <h2 className="subheading">Final decision</h2>
        <p className="helper">Day 3 is a supervised readiness check. A “Pass” means ready for the next planned training step—not automatic authorization for unsupervised work.</p>
        <div className="decision-grid">
          <button type="button" className={form.assessment === 'pass' ? 'decision selected pass' : 'decision'} onClick={() => update('assessment', 'pass')}><CheckCircle2 /><span><strong>Pass</strong><small>Ready to continue the training plan</small></span></button>
          <button type="button" className={form.assessment === 'practice' ? 'decision selected practice' : 'decision'} onClick={() => update('assessment', 'practice')}><AlertTriangle /><span><strong>Needs More Practice</strong><small>Coach and reassess identified areas</small></span></button>
        </div>
        <Field label="What the server did well"><textarea rows={4} value={form.strengths} onChange={(event) => update('strengths', event.target.value)} /></Field>
        <Field label="What needs more practice"><textarea rows={4} value={form.practicePlan} onChange={(event) => update('practicePlan', event.target.value)} /></Field>
        <Field label="Final comments"><textarea rows={4} value={form.finalComments} onChange={(event) => update('finalComments', event.target.value)} /></Field>
        <div className="signature-grid">
          <Field label="Server signature (type full name)"><input value={form.employeeSignature} onChange={(event) => update('employeeSignature', event.target.value)} /><input type="date" value={form.employeeSignDate} onChange={(event) => update('employeeSignDate', event.target.value)} /></Field>
          <Field label="Evaluator signature (type full name)"><input value={form.evaluatorSignature} onChange={(event) => update('evaluatorSignature', event.target.value)} /><input type="date" value={form.evaluatorSignDate} onChange={(event) => update('evaluatorSignDate', event.target.value)} /></Field>
        </div>
        <p className="signature-note">Typing a name records acknowledgement for this training form; it is not a cryptographic digital signature.</p>
      </div>
      <div className="record-actions"><button className="button secondary" onClick={exportRecord}><Download size={17} /> Download response record</button><button className="button primary" onClick={() => window.print()}><Download size={17} /> Print / Save PDF</button></div>
    </div>
  )
}

function sectionComplete(section: Section, form: FormState) {
  if (section.kind === 'details') return Boolean(form.employeeName && form.evaluatorName && form.location && form.date)
  if (section.kind === 'competencies') return Boolean(section.items?.length && section.items.every((item) => form.ratings[item.id]))
  if (section.kind === 'knowledge') return Boolean(section.questions?.length && section.questions.every((question) => form.answers[question.id]?.response.trim() && form.answers[question.id]?.rating))
  if (section.kind === 'text') return Boolean(form.topSellers.trim() && form.realTable.trim())
  return Boolean(form.assessment && form.employeeSignature && form.evaluatorSignature && form.employeeSignDate && form.evaluatorSignDate)
}

export default App

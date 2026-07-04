import { useState } from 'react'
import { sum } from './utils/sum'
import './App.css'

const PIPELINE = [
  {
    id: 'install',
    title: 'Install',
    command: 'yarn install --frozen-lockfile',
    note: 'Установка зависимостей',
  },
  {
    id: 'lint',
    title: 'Lint',
    command: 'yarn lint',
    note: 'Проверка кода (oxlint)',
    parallel: true,
  },
  {
    id: 'test',
    title: 'Test',
    command: 'yarn test:ci',
    note: 'Unit-тесты (vitest run)',
    parallel: true,
  },
  {
    id: 'build',
    title: 'Build',
    command: 'yarn build',
    note: 'Сборка в dist/',
  },
] as const

function App() {
  const [a, setA] = useState(1)
  const [b, setB] = useState(2)

  return (
    <div className="app">
      <header className="header">
        <p className="eyebrow">React + Vite + GitHub Actions</p>
        <h1>github-actions-practise</h1>
        <p className="subtitle">
          Учебный проект с CI: установка, линтинг, тесты и сборка при каждом push
          в <code>main</code>.
        </p>
      </header>

      <section className="card" aria-labelledby="pipeline-title">
        <h2 id="pipeline-title">CI Pipeline</h2>
        <p className="section-hint">
          Стадии <strong>lint</strong> и <strong>test</strong> выполняются параллельно
          после install.
        </p>

        <ol className="pipeline">
          {PIPELINE.map((stage, index) => (
            <li
              key={stage.id}
              className={'parallel' in stage ? 'pipeline-step parallel' : 'pipeline-step'}
            >
              <span className="step-index">{index + 1}</span>
              <div className="step-body">
                <div className="step-title-row">
                  <strong>{stage.title}</strong>
                  {'parallel' in stage && stage.parallel && (
                    <span className="badge">parallel</span>
                  )}
                </div>
                <code>{stage.command}</code>
                <span className="step-note">{stage.note}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="card" aria-labelledby="demo-title">
        <h2 id="demo-title">Демо функции sum()</h2>
        <p className="section-hint">
          Используется в тесте <code>src/utils/sum.test.ts</code> — пример кода,
          который проверяет CI.
        </p>

        <div className="calculator">
          <label className="field">
            <span>a</span>
            <input
              type="number"
              value={a}
              onChange={(event) => setA(Number(event.target.value))}
            />
          </label>

          <span className="operator" aria-hidden="true">
            +
          </span>

          <label className="field">
            <span>b</span>
            <input
              type="number"
              value={b}
              onChange={(event) => setB(Number(event.target.value))}
            />
          </label>

          <span className="operator" aria-hidden="true">
            =
          </span>

          <output className="result" aria-live="polite">
            {sum(a, b)}
          </output>
        </div>
      </section>
    </div>
  )
}

export default App

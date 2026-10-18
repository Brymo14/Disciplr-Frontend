import { render, screen, waitFor, cleanup } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from '../App'

const routes = ['/', '/dashboard', '/vaults', '/transactions', '/docs', '/vaults/1', '/vaults/create', '/verifier', '/verifier/history', '/help', '/analytics', '/notifications', '/notifications/settings', '/nope']
describe('smoke', () => {
  for (const r of routes) {
    it('renders ' + r, async () => {
      const errs: unknown[] = []
      const spy = vi.spyOn(console, 'error').mockImplementation((...a) => { errs.push(a[0]) })
      window.history.pushState({}, '', r)
      const { container } = render(<App />)
      await waitFor(() => expect(container.textContent!.length).toBeGreaterThan(50), { timeout: 3000 })
      await new Promise((x) => setTimeout(x, 300))
      const text = container.textContent || ''
      expect(text).not.toMatch(/Something went wrong|ReferenceError/i)
      const bad = errs.filter((e) => String(e).match(/ReferenceError|is not defined|Cannot read/))
      expect(bad).toEqual([])
      spy.mockRestore(); cleanup()
    })
  }
})

// Write your tests here
import server from '../../backend/mock-server'
import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

const waitForOptions = { timeout: 100 }
const queryOptions = { exact: false }

let up, down, left, right, reset, submit
let squares, coordinates, steps, message, email

const updateStatelessSelectors = document => {
  up = document.querySelector('#up') 
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
}

const testSquares = (squares, activeIdx) => {
  squares.forEach((square, idx) => {
    if (idx === activeIdx) {
      expect(square.textContent).toBe('B')
      expect(square.className).toMatch(/active/)
    } else {
      expect(square.textContent).toBeFalsy()
      expect(square.className).not.toMatch(/active/)
    }
  })
}



  describe(`Functional App Component`, () => {
    beforeAll(() => { server.listen() })
    afterAll(() => { server.close() })
    beforeEach(() => {
      render(<AppFunctional />)
      updateStatelessSelectors(document)
      updateStatefulSelectors(document)
    })
    afterEach(() => {
      server.resetHandlers()
      document.body.innerHTML = ''
    })

    describe('5 student tests to verify app functionality', () => {
      
      test(`[1] Clicking up moves "B" to Coordinates (2,1)`, () => {
        fireEvent.click(up)
        testSquares(squares, 1)
        expect(coordinates).toBeVisible('Coordinates (2,1)')
      })
      test('[2] Moving causes step counter to work', () => {
        fireEvent.click(up)
        fireEvent.click(left)
        fireEvent.click(down)
        fireEvent.click(right)
        testSquares(squares, 4)
        expect(steps).toBeVisible('You moved 4 times')
        
      })
      test(`[3] Message "You can't go up" when continously clicking Up button against edge of grid`, () => {
        fireEvent.click(up)
        fireEvent.click(up)
        fireEvent.click(up)
        testSquares(squares, 1)
        expect(message).toBeVisible(`You can't go up`)
      })
      test("[4] Typing into email input changes its value", () => {
        fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
        expect(email).toHaveValue('lady@gaga.com')
      })
      test(`[5] Success message is correct`, async () => {
        fireEvent.click(up)
        fireEvent.click(down)
        fireEvent.click(left)
        fireEvent.click(right)
        fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
        fireEvent.click(submit)
        await screen.findByText('lady win #73')
      })
    })
  })

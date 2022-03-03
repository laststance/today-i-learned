import React from 'react'

import TestRenderer from '../../lib/TestRenderer'

import Signup from './'

test('should render Signup', () => {
  const {
    container: { firstChild },
  } = TestRenderer(<Signup />)
  expect(firstChild).toBeTruthy()
  expect(firstChild).toMatchSnapshot()
})

import * as chai from 'chai';
import formatLeaderboardMock from './mocks/formatLeaderboard.mock';
// @ts-ignore

const { expect } = chai;
const {formatTable, sortLeaderboard} = require('../utils/formatLeaderboard')

describe('Test formatLeaderboard Utils', () => {
    
  it('fuction format table', async () => {
const leaderboard = formatTable(formatLeaderboardMock.teams)

  expect(leaderboard).to.deep.equal(formatLeaderboardMock.responseFormattedTable)
})

it('should sort table victories classification', async () => {
  const leaderboard = sortLeaderboard(formatLeaderboardMock.victoriesClassification)
  
    expect(leaderboard).to.deep.equal(formatLeaderboardMock.victoriesClassificationResolves)
  })


it('should sort table goals favor classification', async () => {
  const leaderboard = sortLeaderboard(formatLeaderboardMock.goalsFavorClassification)
  
    expect(leaderboard).to.deep.equal(formatLeaderboardMock.goalsFavorClassificationResolves)
  })

  it('should sort table balance goals classification', async () => {
    const leaderboard = sortLeaderboard(formatLeaderboardMock.balanceClassification)
    
      expect(leaderboard).to.deep.equal(formatLeaderboardMock.balanceClassificationResolves)
    })

  });
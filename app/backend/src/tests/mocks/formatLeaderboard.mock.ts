const teams = [
    {
      id: 1,
      teamName: "Palmeiras"
    },
    {
        id: 2,
        teamName: "Santos"
      },
  ]

  const responseFormattedTable = [
    {
      name: 'Palmeiras',
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
    },
    {
      name: 'Santos',
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
    },
  ]

  const victoriesClassification =  [
    {
      name: "Corinthians",
      totalPoints: 7,
      totalGames: 3,
      totalVictories: 1,
      totalDraws: 3,
      totalLosses: 0,
      goalsFavor: 7,
      goalsOwn: 6,
      goalsBalance: 1,
      efficiency: "77.78"
    },
    {
    name: "Palmeiras",
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 6,
    goalsOwn: 1,
    goalsBalance: 5,
    efficiency: "77.78"
  },
]
const victoriesClassificationResolves =  [
  {
    name: "Palmeiras",
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 6,
    goalsOwn: 1,
    goalsBalance: 5,
    efficiency: "77.78"
  },
  {
    name: "Corinthians",
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 3,
    totalLosses: 0,
    goalsFavor: 7,
    goalsOwn: 6,
    goalsBalance: 1,
    efficiency: "77.78"
  },
]

const balanceClassification =  [
  {
    name: "Corinthians",
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 7,
    goalsOwn: 6,
    goalsBalance: 1,
    efficiency: "77.78"
  },
  {
  name: "Palmeiras",
  totalPoints: 7,
  totalGames: 3,
  totalVictories: 2,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 6,
  goalsOwn: 1,
  goalsBalance: 5,
  efficiency: "77.78"
},
]
const balanceClassificationResolves =  [
{
  name: "Palmeiras",
  totalPoints: 7,
  totalGames: 3,
  totalVictories: 2,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 6,
  goalsOwn: 1,
  goalsBalance: 5,
  efficiency: "77.78"
},
{
  name: "Corinthians",
  totalPoints: 7,
  totalGames: 3,
  totalVictories: 2,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 7,
  goalsOwn: 6,
  goalsBalance: 1,
  efficiency: "77.78"
},
]

const goalsFavorClassification =  [
  {
    name: "Corinthians",
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 6,
    goalsOwn: 1,
    goalsBalance: 5,
    efficiency: "77.78"
  },
  {
  name: "Palmeiras",
  totalPoints: 7,
  totalGames: 3,
  totalVictories: 2,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 7,
  goalsOwn: 0,
  goalsBalance: 5,
  efficiency: "77.78"
},
]
const goalsFavorClassificationResolves =  [
{
  name: "Palmeiras",
  totalPoints: 7,
  totalGames: 3,
  totalVictories: 2,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 7,
  goalsOwn: 0,
  goalsBalance: 5,
  efficiency: "77.78"
},
{
  name: "Corinthians",
  totalPoints: 7,
  totalGames: 3,
  totalVictories: 2,
  totalDraws: 1,
  totalLosses: 0,
  goalsFavor: 6,
  goalsOwn: 1,
  goalsBalance: 5,
  efficiency: "77.78"
},
]

  export default {
    teams,
    responseFormattedTable,
   victoriesClassification,
   victoriesClassificationResolves,
   balanceClassification,
   balanceClassificationResolves,
   goalsFavorClassification,
   goalsFavorClassificationResolves
  }
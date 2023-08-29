const messageEqualsTeam = { message: "It is not possible to create a match with two equal teams" }
const messageNotExistTeamId = { message: "There is no team with such id!" }

const getAllMatchesResolves = [
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Grêmio"
      }
    },
    {
      id: 41,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Internacional"
      }
    }
  ]

  const findInProgressTrue = [
    {
      id: 41,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: "São Paulo"
      },
      awayTeam: {
        teamName: "Internacional"
      }
    },
    {
      id: 42,
      homeTeamId: 6,
      homeTeamGoals: 1,
      awayTeamId: 1,
      awayTeamGoals: 0,
      inProgress: true,
      homeTeam: {
        teamName: "Ferroviária"
      },
      awayTeam: {
        teamName: "Avaí/Kindermann"
      }
    }
  ]

  const matchesFinishedDatabase = {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  }

  const matchesUpdateGoalsDatabase = {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 0,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo"
    },
    awayTeam: {
      teamName: "Internacional"
    }
  }

  const newMatcheCreateBody = {
      homeTeamId: 16, // O valor deve ser o id do time
      awayTeamId: 8, // O valor deve ser o id do time
      homeTeamGoals: 2,
      awayTeamGoals: 2
    }
  
    const newMatcheCreateResolvesSuccessful = [{
        id: 1,
        homeTeamId: 16,
        homeTeamGoals: 2,
        awayTeamId: 8,
        awayTeamGoals: 2,
        inProgress: true
      }]

      const newMatchesCreateWithTwoEqualsTeam = {
        homeTeamId: 15, // O valor deve ser o id do time
        awayTeamId: 15, // O valor deve ser o id do time
        homeTeamGoals: 2,
        awayTeamGoals: 2
      }

      const newMatchesCreateWithInvalidTeamId = {
        homeTeamId: 15, // O valor deve ser o id do time
        awayTeamId: 15, // O valor deve ser o id do time
        homeTeamGoals: 2,
        awayTeamGoals: 2
      }


  export default {
    getAllMatchesResolves,
    findInProgressTrue,
    matchesFinishedDatabase,
    matchesUpdateGoalsDatabase,
    newMatcheCreateBody,
    newMatcheCreateResolvesSuccessful,
    newMatchesCreateWithTwoEqualsTeam,
    newMatchesCreateWithInvalidTeamId,
    messageEqualsTeam,
    messageNotExistTeamId
  }
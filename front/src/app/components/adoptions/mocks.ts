type status = 'completed' | 'finished' | 'standing_by' | 'freezed'
type name = 'request' | 'interview' | 'home_inspection' | 'deliver'

interface state {
  name: name
  status: status
}

export const adoptions = [
  {
    adopter: {
      name: 'Diego',
      phone: 123123123,
      email: 'adopter1@test.com',
    },
    animal: {
      name: 'Luna',
      id: 'qwertyuiop',
      breed: 'Common European',
      species: 'Cat',

    },
    responsable: {
      name: 'Felipe',

    },
    adoption: {
      states: [
        {
          name: 'request',
          status: 'completed'
        },
        {
          name: 'interview',
          status: 'completed'
        },
        {
          name: 'home_inspection',
          status: 'standing_by'
        },
      ]
    }
  }
]
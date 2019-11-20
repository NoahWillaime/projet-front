export const environment = {
  production: true,
  backend: {
    protocol: 'http',
    host: '0.0.0.0',
    port: '3000',
    endpoints: {
      allAnimals: '/animals',
      oneAnimal: '/animals/:id',
      allSpecies: '/animals/species',
      oneSpecies: '/animals/species/:species',
      login: '/auth/login',
      profile: '/profile',
      allRefuges: '/refuge',
      oneRefuge: '/refuge/:id',
      refugeByUser: '/refuge/user/:id',
      someAnimals: '/refuge/:id/animals',
      allUser: '/benevoles',
      oneUser: '/benevoles/:id'
    }
  }
};

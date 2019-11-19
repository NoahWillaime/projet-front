// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

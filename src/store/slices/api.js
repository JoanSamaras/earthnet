import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const esaAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: builder => ({
    getWells: builder.query({
      query: () => ({
        url: 'wells',
        method: 'GET'
      })
    }),
    getLogs: builder.query({
      query: () => ({
        url: 'logs',
        method: 'GET'
      })
    }),
    getFormations: builder.query({
      query: () => ({
        url: 'formations',
        method: 'GET'
      })
    }),
    getPlotData: builder.query({
      query: ( params = undefined ) => ({
        url: 'plots',
        method: 'GET',
        params
      })
    })
  })
})

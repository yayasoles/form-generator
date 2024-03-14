/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ApplicationApi = createApi({
  reducerPath: 'ApplicationApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000/api',
  }),
  tagTypes: ['Application', 'Form'],
  endpoints: (builder) => ({
   

    createForm: builder.mutation<any, any>({
      query: (newForm) => {
        return {
          url: '/users/add-local-user',
          method: 'POST',
          body: newForm,
        };
      },
      invalidatesTags: ['Application'],
    }),
  }),
});

export const {
    useCreateFormMutation
} = ApplicationApi;
